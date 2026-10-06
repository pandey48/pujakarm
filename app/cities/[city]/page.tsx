import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, FAQList, PujaGrid, SectionHeading } from "@/components/shared";
import { BookingForm } from "@/components/booking-form";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/app/schema";
import { mumbaiSeoPages } from "@/data/mumbai-seo";

const mumbaiFaqs = [
  { question: "How can I enquire about a Pandit in Mumbai?", answer: "Choose a puja and submit your preferred date, Mumbai locality and contact details. PujaPath will follow up to discuss whether a suitable Pandit and format can be arranged." },
  { question: "Can I request a puja at home in Mumbai?", answer: "You can request an at-home puja for your locality. The team checks the specific ceremony, date and location before confirming availability." },
  { question: "Can I join a puja online from Mumbai?", answer: "Some listed pujas support online participation. Open the puja details and enquire so the team can confirm whether that format is available for your request." },
  { question: "Which areas of Mumbai are served?", answer: "You can share your exact locality, including areas such as Andheri, Borivali, Powai, Dadar, Thane or Navi Mumbai. These examples are enquiry locations, not a guarantee of service coverage." },
];

export function generateStaticParams() { return cities.map((city) => ({ city: city.slug })); }
export async function generateMetadata({ params }: PageProps<"/cities/[city]">): Promise<Metadata> {
  const { city: slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  if (!city) return { title: "City not found" };
  const isMumbai = city.slug === "mumbai";
  const title = isMumbai ? "Pandit in Mumbai | Puja at Home & Online Puja" : `Puja Enquiry in ${city.name}`;
  const description = isMumbai
    ? "Enquire about a Pandit in Mumbai for puja at home or online. Share your ceremony, preferred date and locality; PujaPath will confirm options with you."
    : `Browse puja information for ${city.name} and send an enquiry. Availability is confirmed individually.`;
  return { title, description, alternates: { canonical: `/cities/${city.slug}` }, openGraph: { title: isMumbai ? `${title} | PujaPath` : title, description, siteName: "PujaPath", type: "website", url: `/cities/${city.slug}`, images: ["/opengraph-image"] }, twitter: { card: "summary_large_image", title: isMumbai ? `${title} | PujaPath` : title, description, images: ["/opengraph-image"] } };
}

export default async function CityDetailPage({ params }: PageProps<"/cities/[city]">) {
  const { city: slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  if (!city) notFound();
  const cityPujas = city.popularPujas.map((name) => pujas.find((puja) => puja.name === name)).filter((puja) => puja !== undefined);
  const isMumbai = city.slug === "mumbai";
  return <>{isMumbai && <><ServiceSchema city="Mumbai" /><FaqSchema items={mumbaiFaqs} /></>}<BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: city.name, href: `/cities/${city.slug}` }]} /><section className="page-intro"><div className="content-wrap"><Breadcrumbs items={[{ label: "Cities", href: "/cities" }, { label: city.name }]} /><span className="eyebrow">PujaPath location enquiry</span><div className="city-hero"><div><h1>{isMumbai ? "Pandit Booking & Puja at Home in Mumbai" : `Ask About a Puja in ${city.name}`}</h1><p>{isMumbai ? "Enquire about a Pandit in Mumbai for a puja at home or online. Share your ceremony, preferred date and locality; the team will discuss options and confirm availability before you decide." : "Browse rituals and send a request for your preferred date and locality. The city guide is not a live availability calendar; the team will confirm options individually."}</p></div><div className="city-hero-stat"><strong>Enquiry location</strong><span>Availability checked after you contact us</span></div></div></div></section>{isMumbai && <section className="section section-tint"><div className="content-wrap"><SectionHeading eyebrow="Mumbai puja enquiries" title="Choose the kind of help you need" text="These guides explain the enquiry process for different services. A request does not guarantee a Pandit, date or location." /><div className="mumbai-seo-grid">{mumbaiSeoPages.filter((page) => ["pandit-booking-mumbai", "puja-at-home-mumbai", "online-puja-mumbai"].includes(page.slug)).map((page) => <Link className="mumbai-seo-card" href={`/${page.slug}`} key={page.slug}><span>{page.h1}</span><ArrowRight size={16} /><p>{page.intro}</p></Link>)}</div></div></section>}<section className="section"><div className="content-wrap"><SectionHeading eyebrow="Rituals to enquire about" title={`Popular Pujas in ${city.name}`} text="Choose a ceremony to see details and send an availability request." /><PujaGrid items={cityPujas} /></div></section><section className="section section-tint"><div className="content-wrap"><SectionHeading eyebrow="Locality examples" title={`Where in ${city.name}?`} text="These are example localities for the enquiry form, not confirmed service zones. Add your exact area when you request a booking." /><div className="area-pills">{city.areas.map((area) => <span key={area}>{area}</span>)}</div></div></section>{isMumbai && <section className="section"><div className="content-wrap"><SectionHeading eyebrow="The enquiry process" title="How booking works" /><HowBookingWorks /><SectionHeading eyebrow="Common questions" title="Mumbai puja enquiries" /><FAQList items={mumbaiFaqs} /><p><Link href="/mumbai" className="text-link">Browse Mumbai puja guides <ArrowRight size={16} /></Link></p></div></section>}<section className="section"><div className="content-wrap"><div className="contact-grid"><div><span className="eyebrow">Start with a request</span><h2 className="story-copy h2">Ask about your puja in {city.name}</h2><p>Let us know your ceremony and preferred date. We will follow up about location and Pandit availability before confirming anything.</p><Link href="/booking" className="text-link">Open enquiry form <ArrowRight size={16} /></Link>{city.slug === "mumbai" && <Link href="/mumbai" className="text-link">Explore Mumbai puja guides <ArrowRight size={16} /></Link>}</div><div className="form-shell"><BookingForm /></div></div></div></section></>;
}

function HowBookingWorks() {
  return <ol className="mumbai-booking-steps"><li><strong>Choose your puja</strong><span>Review the ritual details and formats listed for that puja.</span></li><li><strong>Share date and locality</strong><span>Send your preferred date, Mumbai area and contact details.</span></li><li><strong>Discuss arrangements</strong><span>The team follows up about Pandit, format, samagri and availability.</span></li><li><strong>Confirm after discussion</strong><span>Your enquiry is not a booking until details are agreed with you.</span></li></ol>;
}
