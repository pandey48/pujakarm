import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, PujaGrid, SectionHeading } from "@/components/shared";
import { BookingForm } from "@/components/booking-form";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";
import { BreadcrumbSchema } from "@/app/schema";

export function generateStaticParams() { return cities.map((city) => ({ city: city.slug })); }
export async function generateMetadata({ params }: PageProps<"/cities/[city]">): Promise<Metadata> {
  const { city: slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  if (!city) return { title: "City not found" };
  const description = `Browse puja information for ${city.name} and send an enquiry. Availability is confirmed individually.`;
  return { title: `Puja Enquiry in ${city.name}`, description, alternates: { canonical: `/cities/${city.slug}` }, openGraph: { title: `Puja enquiry in ${city.name} | PujaPath`, description, siteName: "PujaPath", type: "website", url: `/cities/${city.slug}`, images: ["/opengraph-image"] } };
}

export default async function CityDetailPage({ params }: PageProps<"/cities/[city]">) {
  const { city: slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  if (!city) notFound();
  const cityPujas = city.popularPujas.map((name) => pujas.find((puja) => puja.name === name)).filter((puja) => puja !== undefined);
  return <><BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: city.name, href: `/cities/${city.slug}` }]} /><section className="page-intro"><div className="content-wrap"><Breadcrumbs items={[{ label: "Cities", href: "/cities" }, { label: city.name }]} /><span className="eyebrow">PujaPath location enquiry</span><div className="city-hero"><div><h1>Ask About a Puja in {city.name}</h1><p>Browse rituals and send a request for your preferred date and locality. The city guide is not a live availability calendar; the team will confirm options individually.</p></div><div className="city-hero-stat"><strong>Enquiry location</strong><span>Availability checked after you contact us</span></div></div></div></section><section className="section"><div className="content-wrap"><SectionHeading eyebrow="Rituals to enquire about" title={`Pujas for ${city.name}`} text="Choose a ceremony to see details and send an availability request." /><PujaGrid items={cityPujas} /></div></section><section className="section section-tint"><div className="content-wrap"><SectionHeading eyebrow="Locality examples" title={`Where in ${city.name}?`} text="These are example localities for the enquiry form, not confirmed service zones. Add your exact area when you request a booking." /><div className="area-pills">{city.areas.map((area) => <span key={area}>{area}</span>)}</div></div></section><section className="section"><div className="content-wrap"><div className="contact-grid"><div><span className="eyebrow">Start with a request</span><h2 className="story-copy h2">Ask about your puja in {city.name}</h2><p>Let us know your ceremony and preferred date. We will follow up about location and Pandit availability before confirming anything.</p><Link href="/booking" className="text-link">Open enquiry form <ArrowRight size={16} /></Link></div><div className="form-shell"><BookingForm /></div></div></div></section></>;
}
