"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, House, MapPin, Search, Video } from "lucide-react";
import { cities } from "@/data/cities";
import { getLocationSearchResults } from "@/lib/location-seo";

export function CityLanguageBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const results = useMemo(() => getLocationSearchResults(query, cities).slice(0, 6), [query]);

  function openLocation(href: string) {
    setQuery("");
    router.push(href);
  }

  return <>
    <div className="city-language-bar">
      <div className="city-language-inner">
        <div className="city-bar-search">
          <label htmlFor="navbar-city-search"><MapPin size={17} aria-hidden="true" /><span>Find your city</span></label>
          <div className="city-bar-input-wrap">
            <Search size={16} aria-hidden="true" />
            <input
              id="navbar-city-search"
              type="search"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={Boolean(query.trim() && results.length)}
              aria-controls="navbar-city-results"
              autoComplete="off"
              placeholder="Search city or locality"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && results[0]) {
                  event.preventDefault();
                  openLocation(results[0].href);
                }
                if (event.key === "Escape") setQuery("");
              }}
            />
            {query.trim() && <div className="city-bar-results" id="navbar-city-results" role="listbox" aria-label="Matching cities">
              {results.length ? results.map((city) => <button
                type="button"
                role="option"
                aria-selected="false"
                key={city.id}
                onClick={() => openLocation(city.href)}
              >
                <span>
                  <strong>{city.kind === "area" ? `${city.name}, ${city.cityName}` : city.name}</strong>
                  <small>{city.popularPujas.slice(0, 2).join(" · ")}</small>
                </span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>) : <p>No matching city or area. Try a nearby locality or alternate name.</p>}
            </div>}
          </div>
          <Link className="city-bar-directory" href="/cities">All cities</Link>
        </div>
        <nav className="city-bar-formats" aria-label="Choose puja format">
          <Link className="city-bar-format-link" href="/pujas?type=home" aria-label="Browse at-home pujas">
            <House size={16} aria-hidden="true" /><span>At home</span>
          </Link>
          <Link className="city-bar-format-link" href="/pujas?type=online" aria-label="Browse online pujas">
            <Video size={16} aria-hidden="true" /><span>Online</span>
          </Link>
        </nav>
      </div>
    </div>
  </>;
}
