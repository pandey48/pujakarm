"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { mantras } from "@/data/mantras";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";
import { getLocationSearchResults } from "@/lib/location-seo";

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
  const [locationQuery, setLocationQuery] = useState("");
  const [city, setCity] = useState("");
  const [format, setFormat] = useState("");
  const [focused, setFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
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
  const locationSuggestions = useMemo(() => getLocationSearchResults(locationQuery, cities).slice(0, 6), [locationQuery]);

  function search(item?: SearchItem) {
    const matchedItem = item || suggestions[0];
    const clean = item?.searchTerm || item?.name || query.trim() || matchedItem?.searchTerm || matchedItem?.name || "";
    if ((item?.route || matchedItem?.route) === "mantras") router.push("/#mantras");
    else if ((item?.route || matchedItem?.route) === "pandit-registration") router.push("/pandit/join");
    else {
      const params = new URLSearchParams();
      if (matchedItem?.category) params.set("category", matchedItem.category);
      else if (clean) params.set("q", clean);
      if (city) params.set("city", city);
      if (format) params.set("type", format);
      const queryString = params.toString();
      router.push(queryString ? `/pujas?${queryString}` : "/pujas");
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locationQuery.trim()) {
      const matchedItem = suggestions[0];
      const selectedPuja = pujas.find((puja) => normalizeSearchText(puja.name) === normalizeSearchText(query)) ||
        (matchedItem?.type === "Puja" ? pujas.find((puja) => puja.name === matchedItem.name) : undefined);
      const params = new URLSearchParams();
      if (selectedPuja) params.set("puja", selectedPuja.slug);
      params.set("location", locationQuery.trim());
      if (format) params.set("format", format === "home" ? "At Home" : "Online");
      if (!selectedPuja && query.trim()) {
        const ritualDetails = query.trim().slice(0, 120);
        const formatPreference = format ? `Preferred format: ${format === "home" ? "At Home" : "Online"}` : "";
        params.set("requirement", [ritualDetails, formatPreference].filter(Boolean).join("\n"));
      }
      router.push(`/booking?${params.toString()}`);
      return;
    }
    search();
  }

  function selectLocation(result: (typeof locationSuggestions)[number]) {
    const cityName = result.cityName;
    setCity(cityName);
    setLocationQuery(result.kind === "area" ? `${result.name}, ${cityName}` : cityName);
    setLocationFocused(false);
  }

  return (
    <div className="pp-search-wrap pp-home-discovery">
      <form className="home-finder-form" onSubmit={submit} role="search">
        <div className="home-form-field home-puja-field">
          <label htmlFor="home-search">Puja or ritual</label>
          <div className="home-form-input-wrap">
            <Search size={18} aria-hidden="true" />
            <input id="home-search" role="combobox" value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => window.setTimeout(() => setFocused(false), 120)} placeholder={placeholderPuja ? `Search ${placeholderPuja} or another puja` : "Search a puja or occasion"} autoComplete="off" aria-autocomplete="list" aria-haspopup="listbox" aria-controls="home-search-results" aria-expanded={focused && Boolean(query.trim())} />
          </div>
          {focused && query.trim() && <div className="home-combobox-results" id="home-search-results" role="listbox" aria-label="Matching pujas and searches">
            {suggestions.length > 0 ? suggestions.map((item) => <button key={`${item.type}-${item.name}`} type="button" role="option" aria-selected="false" onMouseDown={(event) => event.preventDefault()} onClick={() => { setQuery(item.searchTerm || item.name); setFocused(false); }}><span>{item.name}</span><small>{item.type}</small><ArrowRight size={15} aria-hidden="true" /></button>) : <p>No matching puja. You can still send this as an enquiry.</p>}
          </div>}
        </div>

        <div className="home-finder-secondary-fields">
          <div className="home-form-field home-location-field">
            <label htmlFor="home-location">City or locality</label>
            <div className="home-form-input-wrap">
              <MapPin size={17} aria-hidden="true" />
              <input id="home-location" role="combobox" value={locationQuery} onChange={(event) => { setLocationQuery(event.target.value); setCity(""); }} onFocus={() => setLocationFocused(true)} onBlur={() => window.setTimeout(() => setLocationFocused(false), 120)} onKeyDown={(event) => { if (event.key === "Enter" && locationSuggestions[0]) { event.preventDefault(); selectLocation(locationSuggestions[0]); } if (event.key === "Escape") setLocationFocused(false); }} placeholder="Search city or locality" autoComplete="off" aria-autocomplete="list" aria-haspopup="listbox" aria-controls="home-location-results" aria-expanded={locationFocused && Boolean(locationQuery.trim())} />
            </div>
            {locationFocused && locationQuery.trim() && <div className="home-combobox-results" id="home-location-results" role="listbox" aria-label="Matching cities and localities">
              {locationSuggestions.length > 0 ? locationSuggestions.map((result) => <button key={result.id} type="button" role="option" aria-selected="false" onMouseDown={(event) => event.preventDefault()} onClick={() => selectLocation(result)}><span>{result.kind === "area" ? `${result.name}, ${result.cityName}` : result.cityName}</span><small>{result.kind === "area" ? "Locality enquiry" : "City enquiry"}</small><ArrowRight size={15} aria-hidden="true" /></button>) : <p>Enter your city or locality for your enquiry.</p>}
            </div>}
          </div>

          <fieldset className="home-format-field">
            <legend>Format</legend>
            <div className="home-format-options">
              {[["", "Any"], ["home", "At home"], ["online", "Online"]].map(([value, label]) => (
                <label className="home-format-option" key={value || "any"}>
                  <input
                    className="sr-only"
                    type="radio"
                    name="home-format"
                    value={value}
                    checked={format === value}
                    onChange={(event) => setFormat(event.target.value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <button className="home-finder-submit" type="submit">Find My Puja <ArrowRight size={17} aria-hidden="true" /></button>
        <p className="home-finder-note">Enquiries only. Our team confirms availability before booking.</p>
      </form>
    </div>
  );
}
