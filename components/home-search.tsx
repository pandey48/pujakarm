"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, MapPin, MonitorPlay, Search } from "lucide-react";
import { cities } from "@/data/cities";
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
  const [city, setCity] = useState("");
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
    const clean = item?.searchTerm || matchedItem?.searchTerm || item?.name || matchedItem?.name || query.trim();
    const params = new URLSearchParams();
    if (matchedItem?.category) params.set("category", matchedItem.category);
    else if (clean) params.set("q", clean);
    if (city && city !== "Online") params.set("city", city);
    if (city === "Online") params.set("type", "online");
    if ((item?.route || matchedItem?.route) === "mantras") router.push("/#mantras");
    else if ((item?.route || matchedItem?.route) === "pandit-registration") router.push("/pandit/join");
    else router.push(clean || city ? `/pujas?${params.toString()}` : "/pujas");
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
        <input id="home-search" value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => window.setTimeout(() => setFocused(false), 120)} placeholder={placeholderPuja ? `Search ${placeholderPuja}...` : "Search Puja, Deity, Occasion or Mantra..."} autoComplete="off" />
        <button type="submit" aria-label="Search"><Search size={18} /></button>
      </form>
      {focused && suggestions.length > 0 && <div className="pp-search-results" role="listbox" aria-label="Search suggestions">{suggestions.map((item) => <button key={`${item.type}-${item.name}`} type="button" role="option" aria-selected={false} onMouseDown={(event) => event.preventDefault()} onClick={() => search(item)}><Search size={14} /><span>{item.name}</span><small>{item.type}</small><ArrowRight size={14} /></button>)}</div>}
      {focused && query.trim() && suggestions.length === 0 && <div className="pp-search-results"><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => router.push(`/pujas?q=${encodeURIComponent(query.trim())}`)}><Search size={14} /><span>Search all pujas for “{query.trim()}”</span><ArrowRight size={14} /></button></div>}
      <div className="pp-search-context">
        <details className="pp-city-picker">
          <summary aria-label="Choose location"><MapPin size={17} /><span className="pp-location-text"><small>Location</small><strong>{city || "Select a city"}</strong></span><ChevronDown size={14} /></summary>
          <div className="pp-city-options" role="listbox" aria-label="Choose a city">
            {cities.map((item) => <button type="button" role="option" aria-selected={city === item.name} key={item.id} onClick={(event) => { setCity(item.name); event.currentTarget.closest("details")?.removeAttribute("open"); }}><MapPin size={13} />{item.name}</button>)}
            <button type="button" role="option" aria-selected={city === "Online"} onClick={(event) => { setCity("Online"); event.currentTarget.closest("details")?.removeAttribute("open"); }}><MonitorPlay size={13} />Online</button>
          </div>
        </details>
        <span className="pp-search-formats"><small>Available formats</small><span>At Home</span><i>·</i><span>Online</span></span>
      </div>
    </div>
  );
}
