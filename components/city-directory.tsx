"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CityCard } from "@/components/shared";
import { searchCities } from "@/lib/city-search";
import type { City } from "@/lib/types";

export function CityDirectory({ cities }: { cities: City[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCities(cities, query), [cities, query]);

  return <>
    <label className="city-directory-search">
      <Search size={18} aria-hidden="true" />
      <span className="sr-only">Search cities, localities, regions or pujas</span>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search city, locality or puja"
        autoComplete="off"
      />
    </label>
    <p className="city-directory-count" aria-live="polite">
      {results.length ? `${results.length} ${results.length === 1 ? "city" : "cities"} to explore` : "No matching city found"}
    </p>
    {results.length ? <div className="city-directory-grid">
      {results.map((city) => <article className="city-directory-card" key={city.id}>
        <CityCard city={city} />
        <p>{city.description}</p>
        {city.areas.length > 0 && <span className="city-directory-localities">Locality examples: {city.areas.slice(0, 3).join(", ")}</span>}
      </article>)}
    </div> : <p className="city-directory-empty">Try a nearby area, alternate city name, region or puja name.</p>}
  </>;
}
