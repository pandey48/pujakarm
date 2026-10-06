import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, CalendarCheck, Heart, ShieldCheck, UsersRound } from "lucide-react";
import { OrganizationSchema, WebsiteSchema } from "@/app/schema";
import { HeroDiscovery } from "@/components/hero-discovery";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { MantraRotator } from "@/components/mantra-rotator";
import { HomeCatalog } from "@/components/home-catalog";
import { MantraCard } from "@/components/mantra-card";
import { AstrologersAcharyas } from "@/components/astrologers-acharyas";
import { SamagriGuide } from "@/components/samagri-guide";
import { ServicesSection } from "@/components/services-section";
import { CityCard, FAQList, HowItWorks } from "@/components/shared";
import { cities } from "@/data/cities";
import { faqs } from "@/data/faqs";
import { featuredMantras } from "@/data/mantras";
import { pujas } from "@/data/pujas";
import { whatsappUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pandit Booking, Puja at Home & Online Puja",
  description: "Explore Hindu puja services, request a Pandit for a puja at home or online, choose your city and share your preferences. PujaPath confirms availability before booking.",
  keywords: ["book online puja", "online puja services", "book a Pandit", "Pandit for puja", "Hindu puja booking", "home puja", "online rituals"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pandit Booking, Puja at Home & Online Puja | PujaPath",
    description: "Explore Hindu pujas and request a Pandit for an at-home or online ritual. Availability is confirmed before booking.",
    siteName: "PujaPath",
    type: "website",
    url: "/",
    images: ["/opengraph-image"],
  },
};

export default function HomePage() {
  return <>
    <OrganizationSchema />
    <WebsiteSchema />
    <section className="pp-search-hero" aria-labelledby="hero-title">
      <div className="pp-search-hero-frame">
        <HeroBackdrop src="https://images.unsplash.com/photo-1700765020008-7fd77c847f8a" />
        <div className="pp-search-hero-content">
          <div className="pp-hero-topline"><span className="pp-hero-badge">Puja enquiries with personal coordination</span></div>
          <h1 id="hero-title">Book a Pandit for Puja<br /><em>at Home or Online</em></h1>
          <p>Choose a puja, city, and preferred format. Enquire with PujaPath and we will follow up to discuss a suitable Pandit and availability.</p>
          <HeroDiscovery />
          <div className="pp-hero-assurance"><span><BadgeCheck size={14} /> Share ritual preferences</span><span><BadgeCheck size={14} /> Ask about samagri</span><span><BadgeCheck size={14} /> Confirm availability first</span></div>
          <Link className="pp-hero-consultation" href="/booking" aria-label="Request a Pandit for your puja"><span>Request a Pandit</span><ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
        <MantraRotator />
      </div>
    </section>

    <section className="pp-stats" aria-label="PujaPath offerings"><div><strong>{pujas.length}</strong><span>Puja listings</span></div><div><strong>At Home</strong><span>Available on selected rituals</span></div><div><strong>Online</strong><span>Available on selected rituals</span></div><div><strong>Pandit enquiry</strong><span>Share your preferences</span></div></section>

    <HomeCatalog items={pujas} />

    <ServicesSection />

    <SamagriGuide items={pujas.slice(0, 12)} />

    <section className="pp-how" id="how-it-works"><div className="pp-wrap"><div className="pp-section-heading"><div><span className="pp-kicker">Clear and personal</span><h2>Book Your Puja in 4 Simple Steps</h2><p>Share what you need and our team will help confirm the details.</p></div></div><HowItWorks /></div></section>

    <section className="pp-city-section"><div className="pp-wrap"><div className="pp-section-heading"><div><span className="pp-kicker">Locality and format</span><h2>Book a Pandit Near You</h2><p>Choose a city to send an enquiry. Service availability is confirmed individually before booking.</p></div><Link className="pp-view" href="/cities">View location guides <ArrowRight size={16} /></Link></div><div className="pp-city-grid">{cities.slice(0, 8).map((city) => <CityCard city={city} key={city.id} />)}<Link href="/pujas?type=online" className="pp-online-city"><span>Online Puja</span><small>Ask about joining a ritual online</small><ArrowRight size={16} /></Link></div><p className="pp-demo-note">Location cards are enquiry options, not a live availability calendar.</p><Link className="pp-view" href="/cities/mumbai">Explore PujaPath Mumbai services <ArrowRight size={16} /></Link></div></section>

    <AstrologersAcharyas />

    <section className="pp-guides"><div className="pp-wrap"><div className="pp-section-heading"><div><span className="pp-kicker">Plan with clarity</span><h2>Popular Puja Guides</h2><p>Practical advice for choosing a ritual and preparing an enquiry.</p></div><Link className="pp-view" href="/guides">All guides <ArrowRight size={16} /></Link></div><Link className="pp-guide-feature" href="/guides/how-to-book-a-pandit-for-puja-at-home"><span className="pp-guide-feature-label">Booking advice · 4 min read</span><strong>How to Book a Pandit for Puja at Home</strong><span>Learn which details to share and what to confirm before you book.<ArrowRight size={16} /></span></Link></div></section>

    <section className="pp-mantras" id="mantras"><div className="pp-wrap"><div className="pp-section-heading"><div><span className="pp-kicker">Read and understand</span><h2>Vedic Mantras</h2><p>Listen, read and understand ancient Sanskrit chants.</p></div></div><div className="pp-mantra-grid">{featuredMantras.map((mantra) => <MantraCard mantra={mantra} key={mantra.name} />)}</div><div className="pp-live-puja-videos"><div className="pp-live-puja-heading"><span className="pp-kicker">Puja in practice</span><h3>Live Puja Videos</h3><p>Watch moments from puja ceremonies and see traditional rituals in practice.</p></div><div className="pp-live-puja-grid"><figure className="pp-live-puja-card"><video controls playsInline preload="none" width="478" height="850" aria-label="Watch live puja ceremony video 1"><source src="/video/live-puja-1.mp4" type="video/mp4" />Your browser does not support video playback.</video><figcaption>Puja ceremony 01</figcaption></figure><figure className="pp-live-puja-card"><video controls playsInline preload="none" width="478" height="850" aria-label="Watch live puja ceremony video 2"><source src="/video/live-puja-2.mp4" type="video/mp4" />Your browser does not support video playback.</video><figcaption>Puja ceremony 02</figcaption></figure></div></div>
    <section className="pp-process-note"><span className="pp-kicker">What to expect</span><h2>Your enquiry starts a conversation</h2><p>Share the puja, city, preferred date and any family preferences. PujaPath will follow up to discuss the Pandit, format, samagri and availability before you decide. Submitting a request does not confirm a booking.</p><Link className="pp-view" href="/booking">Start a puja enquiry <ArrowRight size={16} /></Link></section></div></section>

    <section className="pp-why"><div className="pp-wrap pp-why-inner"><div className="pp-why-copy"><span className="pp-kicker">A clearer way to enquire</span><h2>Traditional Rituals.<br />Simple Booking.</h2><p>Know what details to share before you request a puja.</p></div><div className="pp-benefits"><article><span><UsersRound size={21} /></span><div><strong>Pandit preferences</strong><small>Share experience, language and ritual needs</small></div></article><article><span><CalendarCheck size={21} /></span><div><strong>Clear process</strong><small>Request a date and get availability confirmed</small></div></article><article><span><ShieldCheck size={21} /></span><div><strong>Home or online</strong><small>Choose the format that suits your family</small></div></article><article><span><BadgeCheck size={21} /></span><div><strong>Personal guidance</strong><small>Ask us which ritual may fit your occasion</small></div></article></div><div className="pp-why-image"><Image src="https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=800&q=85" alt="Traditional puja offerings with flowers and a brass kalash" fill sizes="(max-width: 720px) 90vw, 28vw" className="cover-image" /></div></div></section>

    <section className="pp-faq"><div className="pp-wrap pp-faq-inner"><div><span className="pp-kicker">Need a little clarity?</span><h2>Frequently Asked Questions</h2><p>Learn what to expect when you send a puja enquiry.</p><Link className="pp-view" href="/faq">More FAQs <ArrowRight size={16} /></Link></div><FAQList items={faqs.slice(0, 7)} /></div></section>

    <section className="pp-final-cta"><div className="pp-wrap pp-cta-inner"><span className="pp-kicker">Need help choosing?</span><h2>Not Sure Which Puja You Need?</h2><p>Tell us your occasion and our team can help you find a suitable ritual.</p><div><a className="pp-cta-primary" href={whatsappUrl("Namaste, I need help choosing a puja.")} target="_blank" rel="noreferrer"><Heart size={16} /> Talk to Us</a><Link className="pp-cta-secondary" href="/pujas">Explore Pujas</Link></div></div></section>
  </>;
}
