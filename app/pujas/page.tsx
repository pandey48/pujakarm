import type { Metadata } from "next";
import { Breadcrumbs, SectionHeading } from "@/components/shared";
import { PujaExplorer } from "@/components/interactions";
import { BreadcrumbSchema } from "@/app/schema";

export const metadata: Metadata = { title: "Explore Pujas", description: "Explore home and online pujas and find a ritual for your family's occasion.", alternates: { canonical: "/pujas" } };

export default async function PujasPage({ searchParams }: PageProps<"/pujas">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const category = typeof params.category === "string" ? params.category : "";
  const type = typeof params.type === "string" ? params.type : "";
  const city = typeof params.city === "string" ? params.city : "";
  return <><BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Pujas", href: "/pujas" }]} /><section className="page-intro"><div className="content-wrap"><Breadcrumbs items={[{ label: "Pujas" }]} /><span className="eyebrow">Explore the ritual library</span><h1>Find a puja for your occasion</h1><p>Browse home and online pujas, compare ceremony details, and share the date and city that work for you.</p></div></section><section className="section"><div className="content-wrap"><SectionHeading title="All pujas" text="Search by name, category, format or service city." /><PujaExplorer initialQuery={query} initialCategory={category} initialType={type} initialCity={city} /></div></section></>;
}