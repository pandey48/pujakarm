import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowDown, ArrowRight, BadgeCheck, CalendarCheck, Heart, ShieldCheck, UsersRound } from "lucide-react";
import { OrganizationSchema, WebsiteSchema } from "@/app/schema";
import { HeroDiscovery } from "@/components/hero-discovery";
import { DeferredHeroVideo } from "@/components/deferred-hero-video";
import { MantraRotator } from "@/components/mantra-rotator";
import { HomeCatalog } from "@/components/home-catalog";
import { MantraCard } from "@/components/mantra-card";
import { SampleReviews } from "@/components/sample-reviews";
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
  title: "Book Online Puja & Find Pandits | PujaPath",
  description: "Book online puja services or find a Pandit for rituals at home. Explore Hindu pujas, choose your city, and send a request to confirm availability with PujaPath.",
  keywords: ["book online puja", "online puja services", "book a Pandit", "Pandit for puja", "Hindu puja booking", "home puja", "online rituals"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Book Online Puja & Find Pandits | PujaPath",
    description: "Explore Hindu pujas, find a Pandit for your city, and request at-home or online ritual services.",
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
        <DeferredHeroVideo src="/video/herobg.mp4" poster="https://images.unsplash.com/photo-1700765020008-7fd77c847f8a?auto=format&fit=crop&w=1800&q=85" />
        <div className="pp-search-hero-content"><div className="pp-hero-topline"><span className="pp-hero-badge">Authentic Vedic Rituals <i /> Pandit Enquiries</span></div><h1 id="hero-title">Book Puja Online with<br /><em>Trusted Pandits</em></h1><p>Find the right puja, experienced Pandit and suitable time for your family — at home or online.</p><HeroDiscovery /><div className="pp-hero-assurance"><span><BadgeCheck size={14} /> Share ritual preferences</span><span><BadgeCheck size={14} /> Ask about samagri</span><span><BadgeCheck size={14} /> Confirm availability first</span></div><Link className="pp-hero-consultation" href="#astrologers-acharyas"><span>Click Me - Get Free Puja Consultation</span><ArrowDown size={15} aria-hidden="true" /></Link></div>
        <MantraRotator />
      </div>
    </section>

    <section className="pp-stats" aria-label="PujaPath offerings"><div><strong>{pujas.length}</strong><span>Puja listings</span></div><div><strong>At Home</strong><span>Available on selected rituals</span></div><div><strong>Online</strong><span>Available on selected rituals</span></div><div><strong>Pandit enquiry</strong><span>Share your preferences</span></div></section>

    <HomeCatalog items={pujas} />

    <ServicesSection />

    <SamagriGuide items={pujas.slice(0, 12)} />

    <section className="pp-how" id="how-it-works"><div className="pp-wrap"><div className="pp-section-heading"><div><span className="pp-kicker">Clear and personal</span><h2>Book Your Puja in 4 Simple Steps</h2><p>Share what you need and our team will help confirm the details.</p></div></div><HowItWorks /></div></section>

    <section className="pp-city-section"><div className="pp-wrap"><div className="pp-section-heading"><div><span className="pp-kicker">Locality and format</span><h2>Book a Pandit Near You</h2><p>Choose a city to send an enquiry. Service availability is confirmed individually before booking.</p></div><Link className="pp-view" href="/cities">View location guides <ArrowRight size={16} /></Link></div><div className="pp-city-grid">{cities.slice(0, 8).map((city) => <CityCard city={city} key={city.id} />)}<Link href="/pujas?type=online" className="pp-online-city"><span>Online Puja</span><small>Ask about joining a ritual online</small><ArrowRight size={16} /></Link></div><p className="pp-demo-note">Location cards are enquiry options, not a live availability calendar.</p></div></section>

    <AstrologersAcharyas />

    <section className="pp-mantras" id="mantras"><div className="pp-wrap"><div className="pp-section-heading"><div><span className="pp-kicker">Read and understand</span><h2>Vedic Mantras</h2><p>Listen, read and understand ancient Sanskrit chants.</p></div></div><div className="pp-mantra-grid">{featuredMantras.map((mantra) => <MantraCard mantra={mantra} key={mantra.name} />)}</div><div className="pp-live-puja-videos"><div className="pp-live-puja-heading"><span className="pp-kicker">Puja in practice</span><h3>Live Puja Videos</h3><p>Watch moments from puja ceremonies and see traditional rituals in practice.</p></div><div className="pp-live-puja-grid"><figure className="pp-live-puja-card"><video controls playsInline preload="none" width="478" height="850" aria-label="Watch live puja ceremony video 1"><source src="/video/live-puja-1.mp4" type="video/mp4" />Your browser does not support video playback.</video><figcaption>Puja ceremony · 01</figcaption></figure><figure className="pp-live-puja-card"><video controls playsInline preload="none" width="478" height="850" aria-label="Watch live puja ceremony video 2"><source src="/video/live-puja-2.mp4" type="video/mp4" />Your browser does not support video playback.</video><figcaption>Puja ceremony · 02</figcaption></figure></div></div><SampleReviews /></div></section>

    <section className="pp-why"><div className="pp-wrap pp-why-inner"><div className="pp-why-copy"><span className="pp-kicker">A clearer way to enquire</span><h2>Traditional Rituals.<br />Simple Booking.</h2><p>Know what details to share before you request a puja.</p></div><div className="pp-benefits"><article><span><UsersRound size={21} /></span><div><strong>Pandit preferences</strong><small>Share experience, language and ritual needs</small></div></article><article><span><CalendarCheck size={21} /></span><div><strong>Clear process</strong><small>Request a date and get availability confirmed</small></div></article><article><span><ShieldCheck size={21} /></span><div><strong>Home or online</strong><small>Choose the format that suits your family</small></div></article><article><span><BadgeCheck size={21} /></span><div><strong>Personal guidance</strong><small>Ask us which ritual may fit your occasion</small></div></article></div><div className="pp-why-image"><Image src="https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=800&q=85" alt="Traditional puja offerings with flowers and a brass kalash" fill sizes="(max-width: 720px) 90vw, 28vw" className="cover-image" /></div></div></section>

    <section className="pp-faq"><div className="pp-wrap pp-faq-inner"><div><span className="pp-kicker">Need a little clarity?</span><h2>Frequently Asked Questions</h2><p>Learn what to expect when you send a puja enquiry.</p><Link className="pp-view" href="/faq">More FAQs <ArrowRight size={16} /></Link></div><FAQList items={faqs.slice(0, 7)} /></div></section>

    <section className="pp-final-cta"><div className="pp-wrap pp-cta-inner"><span className="pp-kicker">Need help choosing?</span><h2>Not Sure Which Puja You Need?</h2><p>Tell us your occasion and our team can help you find a suitable ritual.</p><div><a className="pp-cta-primary" href={whatsappUrl("Namaste, I need help choosing a puja.")} target="_blank" rel="noreferrer"><Heart size={16} /> Talk to Us</a><Link className="pp-cta-secondary" href="/pujas">Explore Pujas</Link></div></div></section>
  </>;
}
