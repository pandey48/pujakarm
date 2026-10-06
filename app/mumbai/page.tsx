import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { BreadcrumbSchema, FaqSchema } from "@/app/schema";
import { Breadcrumbs } from "@/components/shared";
import { mumbaiSeoPages } from "@/data/mumbai-seo";
import { cities } from "@/data/cities";

const city = cities.find((item) => item.slug === "mumbai")!;
const faqs = [
  { question: "How do I book a Pandit in Mumbai?", answer: "Choose a puja guide or use the enquiry form to share your ceremony, preferred date, locality and contact details. PujaPath will follow up to discuss availability." },
  { question: "Does PujaPath confirm every Mumbai locality?", answer: "No. Locality names shown here are examples to help describe your request, not confirmed service zones. The team checks each locality and date individually." },
  { question: "Can I request a puja online from Mumbai?", answer: "Some puja listings include an online format. Check the individual listing and ask PujaPath to confirm whether the format and date can be arranged." },
];

export const metadata: Metadata = {
  title: "Mumbai Puja Guides & Services",
  description: "Compare PujaPath guides for Pandit booking, puja at home, online puja and individual ceremonies in Mumbai before sending an enquiry.",
  alternates: { canonical: "/mumbai" },
  openGraph: { title: "Mumbai Puja Guides & Services | PujaPath", description: "Compare PujaPath guides for Pandit booking, puja at home, online puja and individual ceremonies in Mumbai.", siteName: "PujaPath", type: "website", url: "/mumbai", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Mumbai Puja Guides & Services | PujaPath", description: "Compare PujaPath guides for Pandit booking, puja at home, online puja and individual ceremonies in Mumbai.", images: ["/opengraph-image"] },
};

export default function MumbaiLandingPage() {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Mumbai guides", href: "/mumbai" }];
  return <>
    <BreadcrumbSchema items={breadcrumbs} />
    <FaqSchema items={faqs} />
    <section className="page-intro mumbai-seo-hero"><div className="content-wrap"><Breadcrumbs items={[{ label: "Mumbai guides" }]} /><span className="eyebrow">Explore Mumbai services</span><h1>Mumbai Puja &amp; Booking Guides</h1><p>Compare PujaPath’s Mumbai guides for Pandit enquiries, puja at home, online participation and individual ceremonies. Each guide explains what to share and what the team needs to confirm.</p><div className="mumbai-seo-actions"><Link className="button" href="/cities/mumbai">Mumbai enquiry page <ArrowRight size={16} /></Link><Link className="text-link" href="/booking">Send an enquiry</Link></div></div></section>
    <section className="section"><div className="content-wrap"><div className="section-heading"><div><span className="eyebrow">Find the right guide</span><h2>Mumbai puja and booking guides</h2><p>Read about a ceremony or service before sending an enquiry.</p></div></div><div className="mumbai-seo-grid">{mumbaiSeoPages.map((page) => <Link className="mumbai-seo-card" key={page.slug} href={`/${page.slug}`}><span>{page.h1}</span><ArrowRight size={17} /><p>{page.description}</p></Link>)}</div></div></section>
    <section className="section section-tint"><div className="content-wrap mumbai-localities"><div><span className="eyebrow">Locality details help</span><h2>Include your Mumbai area in the request</h2><p>The existing Mumbai enquiry guide lists these areas as examples to help you describe where the puja would take place. They are not a promise of service coverage; PujaPath checks each request individually.</p><div className="mumbai-area-list">{city.areas.map((area) => <span key={area}><MapPin size={14} />{area}</span>)}</div><p className="mumbai-area-note">For areas not listed, enter your exact locality in the booking form.</p></div><Link className="button" href="/booking">Ask about availability <ArrowRight size={16} /></Link></div></section>
    <section className="section"><div className="content-wrap mumbai-booking-steps"><div><span className="eyebrow">A clear enquiry process</span><h2>How booking works</h2></div><ol><li><strong>Choose a service</strong><span>Browse a puja guide or describe your occasion.</span></li><li><strong>Share your preferences</strong><span>Include your date, locality, format and language needs.</span></li><li><strong>Confirm details</strong><span>Discuss availability, preparation and arrangements before booking.</span></li></ol></div></section>
    <section className="section section-tint"><div className="content-wrap"><h2>Frequently asked questions</h2><div className="mumbai-faq-grid">{faqs.map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div></div></section>
  </>;
}
