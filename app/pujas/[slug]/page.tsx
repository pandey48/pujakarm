import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock3, House, Languages, ShieldCheck, Users, Video } from "lucide-react";
import { Breadcrumbs, FAQList, PujaGrid, SectionHeading, WhatsAppButton } from "@/components/shared";
import { pujas } from "@/data/pujas";
import { BookingForm } from "@/components/booking-form";
import { BreadcrumbSchema, ServiceSchema } from "@/app/schema";

export function generateStaticParams() { return pujas.map((puja) => ({ slug: puja.slug })); }

export async function generateMetadata({ params }: PageProps<"/pujas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const puja = pujas.find((item) => item.slug === slug);
  if (!puja) return { title: "Puja not found" };
  return { title: puja.name, description: puja.shortDescription, alternates: { canonical: `/pujas/${puja.slug}` }, openGraph: { title: `${puja.name} | PujaPath`, description: puja.shortDescription, siteName: "PujaPath", type: "website", url: `/pujas/${puja.slug}`, images: ["/opengraph-image"] } };
}

export default async function PujaDetailPage({ params }: PageProps<"/pujas/[slug]">) {
  const { slug } = await params;
  const puja = pujas.find((item) => item.slug === slug);
  if (!puja) notFound();
  const related = pujas.filter((item) => item.id !== puja.id && item.category === puja.category).slice(0, 4);
  const relatedPujas = related.length ? related : pujas.filter((item) => item.id !== puja.id).slice(0, 4);
  const hasHome = puja.type === "Home" || puja.type === "Home & Online";
  const hasOnline = puja.type === "Online" || puja.type === "Home & Online";
  const message = `Namaste PujaPath, I would like to enquire about ${puja.name}.\nCity: \nPreferred date: \nPreferred time: `;

  return <><ServiceSchema puja={puja} /><BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Pujas", href: "/pujas" }, { label: puja.name, href: `/pujas/${puja.slug}` }]} /><section className="section"><div className="content-wrap"><Breadcrumbs items={[{ label: "Pujas", href: "/pujas" }, { label: puja.name }]} /><div className="detail-layout"><article className="detail-main">
    <div className="detail-hero-image"><Image src={puja.image} alt={`${puja.name} ritual`} fill priority sizes="(max-width: 800px) 100vw, 65vw" className="cover-image" /></div><span className="eyebrow" style={{ marginTop: 23 }}>{puja.category}</span><h1>{puja.name}</h1><p className="detail-summary">{puja.description}</p>
    <div className="detail-facts"><span><Clock3 size={15} />{puja.duration}</span><span><Users size={15} />{puja.panditCount}</span><span><Languages size={15} />Language by request</span></div><div className="puja-formats detail-formats">{hasHome && <span><House size={13} />At Home</span>}{hasOnline && <span><Video size={13} />Online</span>}</div>
    <section className="detail-section"><h2>About this puja</h2><p>{puja.description} Before confirming, we’ll discuss your preferred tradition, language, ceremony date and family customs.</p></section>
    <section className="detail-section"><h2>What is included</h2><p>The Pandit’s ritual service and preparation guidance are discussed for your specific puja. Samagri, travel and other arrangements can vary by location; the team will confirm details before you decide.</p></section>
    <section className="detail-section"><h2>How the puja happens</h2><ol className="detail-steps"><li>Share your preferred date, city and family tradition.</li><li>Ask about the ritual sequence, language and preparation.</li><li>The team checks Pandit and format availability with you.</li><li>After you confirm, the ceremony is performed at home or online where available.</li></ol></section>
    <section className="detail-section"><h2>Who can enquire</h2><p>Families planning this ritual can send an enquiry with a preferred date and location. A booking is confirmed only after the team checks availability and agrees the ceremony details with you.</p></section>
    <section className="detail-section"><h2>Samagri & preparation</h2><p>These are common items to discuss with the Pandit. The final list depends on your family tradition and what is arranged for your location.</p><ul className="check-list">{puja.samagri.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></section>
    <section className="detail-section"><h2>Location and availability</h2><p>Share your city and locality in the enquiry. City choices are request options, not live service coverage; the team confirms availability individually.</p><p className="detail-city-list">{puja.cities.join(" · ")}</p></section>
    <section className="detail-section"><h2>Common questions</h2><FAQList items={puja.faqs} /></section>
    </article><aside className="detail-aside"><h2>Enquire about this puja</h2><p>Share a preferred date and city. Your request is not a confirmed booking.</p><BookingForm presetPuja={puja.slug} /><WhatsAppButton message={message} label="Ask on WhatsApp" className="detail-whatsapp" /><div className="detail-aside-note"><ShieldCheck size={16} />Availability and arrangements are confirmed with you before booking.</div></aside></div>
    <div className="section-tight"><SectionHeading eyebrow="Continue exploring" title="Related pujas" link={{ label: "All pujas", href: "/pujas" }} /><PujaGrid items={relatedPujas} /></div></div></section></>;
}
