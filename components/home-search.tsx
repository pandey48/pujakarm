"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { mantras } from "@/data/mantras";
import { pujas } from "@/data/pujas";

type SearchItem = { name: string; type: "Puja" | "Category" | "Pandit" | "Mantra" | "Occasion"; keywords: string[]; route: "catalog" | "mantras" | "pandit-registration"; searchTerm?: string; category?: string };

const normalizeSearchText = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
function searchScore(item: SearchItem, query: string) {
  const normalizedQuery = normalizeSearchText(query);
  const normalizedName = normalizeSearchText(item.name);
  const searchable = normalizeSearchText([item.name, ...item.keywords].join(" "));
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  if (!normalizedQuery || !terms.every((term) => searchable.includes(term))) return Number.POSITIVE_INFINITY;
  if (normalizedName === normalizedQuery) return 0;
  if (normalizedName.startsWith(normalizedQuery)) return 1;
  if (searchable.includes(normalizedQuery)) return 2;
  return 3;
}

const occasionItems: SearchItem[] = [
  { name: "New home / housewarming", type: "Occasion", keywords: ["griha", "housewarming", "new home", "move", "home entry"], route: "catalog", searchTerm: "Griha Pravesh" },
  { name: "Wedding ceremony", type: "Occasion", keywords: ["wedding", "marriage", "vivah"], route: "catalog", searchTerm: "Vivah Puja" },
];

const searchItems: SearchItem[] = [
  ...pujas.map((puja) => ({ name: puja.name, type: "Puja" as const, keywords: [puja.category, puja.slug, puja.shortDescription, puja.type, ...puja.benefits, ...puja.samagri, ...(puja.id === "vastu" ? ["griha", "housewarming", "new home"] : [])], route: "catalog" as const })),
  ...[...new Set(pujas.map((puja) => puja.category))].map((category) => ({ name: category, type: "Category" as const, keywords: [category, category.replaceAll("&", "and")], route: "catalog" as const, category })),
  ...mantras.map((mantra) => ({ name: mantra.name, type: "Mantra" as const, keywords: [mantra.name, ...mantra.keywords], route: "mantras" as const })),
  ...occasionItems,
  { name: "Pandit Registration", type: "Pandit", keywords: ["pandit", "priest", "register pandit"], route: "pandit-registration" },
];

export function HomeSearch({ placeholderPuja = "" }: { placeholderPuja?: string }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return searchItems
      .map((item, index) => ({ item, index, score: searchScore(item, query) }))
      .filter((entry) => Number.isFinite(entry.score))
      .sort((left, right) => left.score - right.score || left.index - right.index)
      .filter((entry, index, all) => all.findIndex((other) => other.item.name === entry.item.name) === index)
      .slice(0, 6)
      .map((entry) => entry.item);
  }, [query]);
  function search(item?: SearchItem) {
    const matchedItem = item || suggestions[0];
    const clean = item?.searchTerm || item?.name || query.trim() || matchedItem?.searchTerm || matchedItem?.name || "";
    const params = new URLSearchParams();
    if (matchedItem?.category) params.set("category", matchedItem.category);
    else if (clean) params.set("q", clean);
    if ((item?.route || matchedItem?.route) === "mantras") router.push("/#mantras");
    else if ((item?.route || matchedItem?.route) === "pandit-registration") router.push("/pandit/join");
    else router.push(clean ? `/pujas?${params.toString()}` : "/pujas");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    search();
  }

  return (
    <div className="pp-search-wrap">
      <form className="pp-search" onSubmit={submit} role="search">
        <Search size={19} aria-hidden="true" />
        <label className="sr-only" htmlFor="home-search">Search Puja, Deity, Occasion or Mantra</label>
        <input id="home-search" value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => window.setTimeout(() => setFocused(false), 120)} placeholder={placeholderPuja ? `Search ${placeholderPuja}...` : "Search Puja, Deity, Occasion or Mantra..."} autoComplete="off" aria-autocomplete="list" aria-controls="home-search-results" aria-expanded={focused && Boolean(query.trim())} />
        <button type="submit" aria-label="Search pujas"><Search size={18} /><span>Search Pujas</span></button>
      </form>
      {focused && query.trim() && <div className="pp-search-results pp-home-search-results" id="home-search-results" role="listbox" aria-label="Matching pujas and searches">
        {suggestions.length > 0 && <>
          <div className="pp-home-search-heading">Suggestions <span>{suggestions.length} matches</span></div>
          {suggestions.map((item) => <button key={`${item.type}-${item.name}`} type="button" role="option" aria-selected="false" onMouseDown={(event) => event.preventDefault()} onClick={() => { setQuery(item.name); setFocused(false); search(item); }}><span className="pp-home-search-icon"><Search size={15} /></span><span className="pp-home-search-name">{item.name}</span><small>{item.type}</small><ArrowRight size={15} /></button>)}
        </>}
        <button className="pp-home-search-all" type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => { setFocused(false); search(); }}><span>View all pujas for “{query.trim()}”</span><ArrowRight size={15} /></button>
      </div>}
    </div>
  );
}
