"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CityCard } from "@/components/shared";
import { searchCities } from "@/lib/city-search";
import type { City } from "@/lib/types";

export function CityDirectory({ cities }: { cities: City[] }) {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All regions");
  const regions = useMemo(
    () => [...new Set(cities.map((city) => city.region).filter((region): region is string => Boolean(region)))].sort(),
    [cities],
  );
  const results = useMemo(
    () => searchCities(cities, query).filter((city) => selectedRegion === "All regions" || city.region === selectedRegion),
    [cities, query, selectedRegion],
  );

  return <>
    <div className="city-directory-tools">
      <label className="city-directory-search">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Search cities, localities, regions or pujas</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search city, locality or puja"
          autoComplete="off"
          aria-controls="city-directory-results"
        />
      </label>
      <nav className="city-region-filters" aria-label="Filter city guides by region">
        {["All regions", ...regions].map((region) => {
          const count = region === "All regions" ? cities.length : cities.filter((city) => city.region === region).length;
          return <button
            type="button"
            className={selectedRegion === region ? "is-active" : ""}
            aria-pressed={selectedRegion === region}
            onClick={() => setSelectedRegion(region)}
            key={region}
          >
            <span>{region}</span><small>{count}</small>
          </button>;
        })}
      </nav>
    </div>
    <p className="city-directory-count" aria-live="polite">
      {results.length ? `Showing ${results.length} of ${cities.length} city locations` : "No matching city found"}
    </p>
    {results.length ? <div className="city-directory-grid" id="city-directory-results">
      {results.map((city) => <article className="city-directory-card" key={city.id}>
        <div className="city-directory-meta">
          {city.region && <span>{city.region}</span>}
          {city.cityGuideIndexable === false && <span className="city-directory-enquiry-only">Enquiry location</span>}
        </div>
        <CityCard city={city} />
        <p>{city.description}</p>
        {city.areas.length > 0 && <div className="city-directory-localities" aria-label={`Example localities in ${city.name}`}>
          <span className="city-directory-localities-label">Locality examples</span>
          <div>{city.areas.slice(0, 4).map((area) => <span key={area}>{area}</span>)}
            {city.areas.length > 4 && <span className="city-directory-more-areas">+{city.areas.length - 4} more</span>}
          </div>
        </div>}
        {city.aliases?.length ? <span className="city-directory-aliases">Also known as {city.aliases.join(", ")}</span> : null}
      </article>)}
    </div> : <p className="city-directory-empty" id="city-directory-results">Try a nearby area, alternate city name, region or puja name.</p>}
  </>;
}
