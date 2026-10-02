import { Breadcrumbs, SectionHeading } from "@/components/shared";
import { PujaExplorer } from "@/components/interactions";
import { BreadcrumbSchema } from "@/app/schema";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({ title: "Book Online Pujas & Rituals", description: "Explore Hindu puja services for home or online rituals. Search by occasion, city, or puja type, then request details and availability from PujaPath.", path: "/pujas" });

export default async function PujasPage({ searchParams }: PageProps<"/pujas">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const category = typeof params.category === "string" ? params.category : "";
  const type = typeof params.type === "string" ? params.type : "";
  const city = typeof params.city === "string" ? params.city : "";
  const popular = params.popular === "1";
  return <><BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Puja Services", href: "/pujas" }]} /><section className="page-intro"><div className="content-wrap"><Breadcrumbs items={[{ label: "Puja Services" }]} /><span className="eyebrow">Rituals, with care</span><h1>Explore Puja Services</h1><p>Choose a Puja for your home, family, festival or special occasion.</p></div></section><section className="section"><div className="content-wrap"><SectionHeading title="Find the right puja" text="Search by puja name, category, format or service location." /><PujaExplorer initialQuery={query} initialCategory={category} initialType={type} initialCity={city} initialPopular={popular} /></div></section></>;
}
