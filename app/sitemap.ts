import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";
import { mumbaiSeoSlugs } from "@/data/mumbai-seo";
import { guides } from "@/data/guides";
import { getSeoLocationUrls } from "@/lib/location-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/pujas", "/services", "/cities", "/mumbai", "/guides", "/about", "/contact", "/faq", "/privacy", "/terms", "/services/puja-samagri"];
  const entries = [
    ...staticRoutes.map((route) => ({ url: `${SITE_URL}${route}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 })),
    ...pujas.filter((puja) => puja.isIndexable !== false).map((puja) => ({ url: `${SITE_URL}/pujas/${puja.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...cities.filter((city) => city.cityGuideIndexable !== false).map((city) => ({ url: `${SITE_URL}/cities/${city.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...getSeoLocationUrls().map((route) => ({ url: `${SITE_URL}${route}`, changeFrequency: "monthly" as const, priority: route.split("/").length === 3 ? 0.65 : 0.55 })),
    ...mumbaiSeoSlugs.map((slug) => ({ url: `${SITE_URL}/${slug}`, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...guides.map((guide) => ({ url: `${SITE_URL}/guides/${guide.slug}`, changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
  return [...new Map(entries.map((entry) => [entry.url, entry])).values()];
}
