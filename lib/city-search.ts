import type { City } from "@/lib/types";

function normalizeCitySearchText(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function searchCities(cities: City[], query: string) {
  const terms = normalizeCitySearchText(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return cities;

  return cities.filter((city) => {
    const searchable = normalizeCitySearchText([
      city.name,
      city.slug,
      city.region || "",
      ...(city.aliases || []),
      ...city.areas,
      ...city.popularPujas,
    ].join(" "));
    return terms.every((term) => searchable.includes(term));
  });
}
