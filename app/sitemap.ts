import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";
import { mumbaiSeoSlugs } from "@/data/mumbai-seo";
import { guides } from "@/data/guides";
import { getSeoLocationUrls } from "@/lib/location-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/pujas", "/cities", "/mumbai", "/guides", "/about", "/contact", "/faq", "/privacy", "/terms", "/services/puja-samagri"];
  return [
    ...staticRoutes.map((route) => ({ url: `${SITE_URL}${route}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 })),
    ...pujas.map((puja) => ({ url: `${SITE_URL}/pujas/${puja.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...cities.map((city) => ({ url: `${SITE_URL}/cities/${city.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...getSeoLocationUrls().map((route) => ({ url: `${SITE_URL}${route}`, changeFrequency: "monthly" as const, priority: route.split("/").length === 3 ? 0.65 : 0.55 })),
    ...mumbaiSeoSlugs.map((slug) => ({ url: `${SITE_URL}/${slug}`, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...guides.map((guide) => ({ url: `${SITE_URL}/guides/${guide.slug}`, changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
}
