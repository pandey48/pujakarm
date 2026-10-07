import { locations, slugify } from "@/data/locations";
import { locationServices } from "@/data/location-services";

const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export function getCityLocation(citySlug) {
  const normalizedSlug = slugify(citySlug);
  return locations.find((city) => city.slug === normalizedSlug) || null;
}

export function getAreaLocation(city, areaSlug) {
  if (!city) return null;
  const normalizedSlug = slugify(areaSlug);
  return city.areas.find((area) => area.slug === normalizedSlug) || null;
}

export function getAreaFeaturedService(city, area) {
  if (!city || !area || !city.services.length) return null;
  const serviceSlug = city.areaServices[area.slug] ||
    city.services[city.areas.findIndex((item) => item.slug === area.slug) % city.services.length];
  return locationServices.find((service) => service.slug === serviceSlug) || null;
}

export function resolveLocationPage(citySlug, segments = []) {
  const city = getCityLocation(citySlug);
  if (!city || segments.length > 2) return null;
  if (!segments.length) return { kind: "city", city };

  const area = getAreaLocation(city, segments[0]);
  if (!area) return null;
  if (segments.length === 1) {
    return { kind: "area", city, area, featuredService: getAreaFeaturedService(city, area) };
  }

  const featuredService = getAreaFeaturedService(city, area);
  if (!featuredService || featuredService.slug !== slugify(segments[1])) return null;
  return { kind: "service", city, area, service: featuredService };
}

export function getSeoLocationParams() {
  return locations.flatMap((city) => [
    { city: city.slug, segments: [] },
    ...city.areas.flatMap((area) => {
      const service = getAreaFeaturedService(city, area);
      return [
        { city: city.slug, segments: [area.slug] },
        ...(service ? [{ city: city.slug, segments: [area.slug, service.slug] }] : []),
      ];
    }),
  ]);
}

export function getSeoLocationUrls() {
  return locations.flatMap((city) => [
    `/puja/${city.slug}`,
    ...city.areas.flatMap((area) => {
      const service = getAreaFeaturedService(city, area);
      return [
        `/puja/${city.slug}/${area.slug}`,
        ...(service ? [`/puja/${city.slug}/${area.slug}/${service.slug}`] : []),
      ];
    }),
  ]);
}

export function getLocationSearchResults(query, existingCities = []) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  const results = [];
  for (const city of locations) {
    const citySearchable = normalize([city.name, city.slug, city.region].join(" "));
    const cityMatches = terms.every((term) => citySearchable.includes(term));
    if (cityMatches) {
      results.push({
        id: city.slug,
        kind: "city",
        name: city.name,
        cityName: city.name,
        slug: city.slug,
        href: `/puja/${city.slug}`,
        popularPujas: city.services
          .map((serviceSlug) => locationServices.find((service) => service.slug === serviceSlug)?.name)
          .filter(Boolean),
        rank: 0,
      });
    }

    for (const area of city.areas) {
      const areaSearchable = normalize(`${area.name} ${city.name}`);
      const areaMatches = terms.every((term) => areaSearchable.includes(term));
      const areaTermMatches = terms.some((term) => normalize(area.name).includes(term));
      if (areaMatches && areaTermMatches) {
        results.push({
          id: `${city.slug}-${area.slug}`,
          kind: "area",
          name: area.name,
          cityName: city.name,
          slug: area.slug,
          citySlug: city.slug,
          href: `/puja/${city.slug}/${area.slug}`,
          popularPujas: city.services
            .map((serviceSlug) => locationServices.find((service) => service.slug === serviceSlug)?.name)
            .filter(Boolean),
          rank: 1,
        });
      }
    }
  }

  for (const city of existingCities) {
    const searchable = normalize([
      city.name,
      city.slug,
      city.region || "",
      ...(city.aliases || []),
      ...city.popularPujas,
    ].join(" "));
    const exists = results.some((result) => result.slug === city.slug && result.kind === "city");
    if (!exists && terms.every((term) => searchable.includes(term))) {
      results.push({
        id: city.id,
        kind: "city",
        name: city.name,
        cityName: city.name,
        slug: city.slug,
        href: `/cities/${city.slug}`,
        popularPujas: city.popularPujas,
        rank: normalize(city.name) === normalize(query) ? 0 : 2,
      });
    }
  }

  return results.sort((left, right) => left.rank - right.rank || left.name.localeCompare(right.name));
}

export { slugify };
