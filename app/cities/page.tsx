import type { Metadata } from "next";
import { Breadcrumbs, CityCard, SectionHeading } from "@/components/shared";
import { cities } from "@/data/cities";
import { BreadcrumbSchema } from "@/app/schema";

export const metadata: Metadata = { title: "Puja Enquiries by City", description: "Choose a city to request a puja and ask the PujaPath team to confirm availability.", alternates: { canonical: "/cities" } };

export default function CitiesPage() {
  return <><BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }]} /><section className="page-intro"><div className="content-wrap"><Breadcrumbs items={[{ label: "Cities" }]} /><span className="eyebrow">Choose a location for your enquiry</span><h1>Ask About a Puja Near You</h1><p>Choose a city to send a request. The list is not a live service-availability calendar; the team confirms options individually.</p></div></section><section className="section"><div className="content-wrap"><SectionHeading title="Cities for puja enquiries" text="Share your city and preferred ritual. Availability is confirmed before a booking." /><div className="city-grid">{cities.map((city) => <CityCard city={city} key={city.id} />)}</div></div></section></>;
}
