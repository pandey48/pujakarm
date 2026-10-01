import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/pujas", "/cities", "/pandit/join", "/about", "/contact", "/faq", "/privacy", "/terms", "/services/puja-samagri"];
  return [
    ...staticRoutes.map((route) => ({ url: `${SITE_URL}${route}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 })),
    ...pujas.map((puja) => ({ url: `${SITE_URL}/pujas/${puja.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...cities.map((city) => ({ url: `${SITE_URL}/cities/${city.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
