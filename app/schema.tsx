import { SITE_URL, BRAND_NAME, SOCIAL_LINKS } from "@/lib/constants";
import type { Puja } from "@/lib/types";

export function OrganizationSchema() {
  const data = { "@context": "https://schema.org", "@type": "Organization", name: BRAND_NAME, url: SITE_URL, sameAs: SOCIAL_LINKS.map((link) => link.href), description: "Explore Hindu pujas, find Pandits, and request at-home or online ritual services." };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: SITE_URL,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/pujas?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function ServiceSchema({ puja, city }: { puja?: Puja; city?: string }) {
  const data = { "@context": "https://schema.org", "@type": "Service", name: puja ? `${puja.name} with PujaPath` : `Puja services in ${city}`, provider: { "@type": "Organization", name: BRAND_NAME, url: SITE_URL }, areaServed: city || "India", description: puja?.shortDescription || `Home and online puja coordination in ${city}.` };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function BreadcrumbSchema({ items }: { items: { label: string; href: string }[] }) {
  const data = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: `${SITE_URL}${item.href}` })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
