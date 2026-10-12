import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import { OrganizationSchema, WebsiteSchema } from "@/app/schema";
import { HeroDiscovery } from "@/components/hero-discovery";
import { RotatingPujaName } from "@/components/rotating-puja-name";
import { HomeCatalog } from "@/components/home-catalog";
import { MantraCard } from "@/components/mantra-card";
import { AstrologersAcharyas } from "@/components/astrologers-acharyas";
import { SamagriGuide } from "@/components/samagri-guide";
import { ServicesSection } from "@/components/services-section";
import { CategoryGrid, CityCard, FAQList, HowItWorks, TrustSection } from "@/components/shared";
import { cities } from "@/data/cities";
import { categories } from "@/data/pujas";
import { faqs } from "@/data/faqs";
import { featuredMantras } from "@/data/mantras";
import { pujas } from "@/data/pujas";
import { whatsappUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pandit Booking Online | Puja at Home & Online Puja",
  description: "Find a Pandit for puja at home or enquire about online puja. Explore ritual details, samagri guidance and dakshina before you decide.",
  keywords: ["book online puja", "online puja services", "book a Pandit", "Pandit for puja", "Hindu puja booking", "home puja", "online rituals"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pandit Booking Online | Puja at Home & Online Puja | PujaPath",
    description: "Find a Pandit for puja at home or enquire about online puja. Explore ritual details, samagri guidance and dakshina before you decide.",
    siteName: "PujaPath",
    type: "website",
    url: "/",
    images: ["/opengraph-image"],
  },
};

const heroPuja = pujas.find((puja) => puja.slug === "griha-pravesh-puja")!;
const popularSearchSlugs = ["griha-pravesh-puja", "satyanarayan-puja", "rudrabhishek-puja", "ganesh-puja"];
const popularSearchPujas = popularSearchSlugs
  .map((slug) => pujas.find((puja) => puja.slug === slug))
  .filter((puja) => puja !== undefined);
const featuredCitySlugs = ["mumbai", "bengaluru", "hyderabad", "ahmedabad", "pune", "bhopal", "indore", "varanasi", "prayagraj"];
const featuredCities = featuredCitySlugs.map((slug) => cities.find((city) => city.slug === slug)).filter((city) => city !== undefined);
const homeFaqs = [
  faqs[0],
  faqs[1],
  faqs[2],
  faqs[3],
  faqs[4],
  faqs[5],
  { question: "How is availability confirmed?", answer: "Share your preferred date and location in an enquiry. The PujaPath team will check availability and discuss arrangements with you; sending a request does not confirm a booking." },
];

export default function HomePage() {
  return <>
    <OrganizationSchema />
    <WebsiteSchema />
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-shell home-hero-grid">
          <div className="home-hero-copy">
            <span className="home-eyebrow"><span aria-hidden="true">ॐ</span> PujaPath · Rituals, with care</span>
            <h1 id="home-hero-title"><span className="home-hero-heading-prefix">Find the Right Pandit for</span><RotatingPujaName names={popularSearchPujas.map((puja) => puja.name)} /></h1>
            <p>Request a Pandit for puja at home or enquire about online rituals. Explore puja details, samagri guidance and dakshina before you decide.</p>
            <div className="home-search-panel"><HeroDiscovery /></div>
            <nav className="home-popular-searches" aria-label="Popular puja searches">
              <span>Popular searches</span>
              {popularSearchPujas.map((puja) => <Link href={`/pujas/${puja.slug}`} key={puja.id}>{puja.name}</Link>)}
            </nav>
            <div className="home-hero-actions">
              <a className="home-whatsapp-link" href={whatsappUrl("Namaste PujaPath, I would like help choosing a puja and checking availability.")} target="_blank" rel="noreferrer"><MessageCircle size={16} aria-hidden="true" /> Need help choosing? Ask us on WhatsApp</a>
            </div>
          </div>
          <div className="home-hero-image">
            <Image src={heroPuja.image} alt="Traditional puja preparations for a Griha Pravesh ceremony" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 40vw, 46vw" className="cover-image" />
          </div>
        </div>
      </section>

      <section className="home-trust" aria-label="What to expect from PujaPath"><div className="home-shell"><TrustSection /></div></section>

      <HomeCatalog items={pujas} />

      <section className="home-how" id="how-it-works" aria-labelledby="home-how-title">
        <div className="home-shell"><div className="home-section-heading"><div><span className="home-section-kicker">A clear enquiry process</span><h2 id="home-how-title">How Booking Works</h2><p>An enquiry is the start of a conversation, not a confirmed booking.</p></div></div><HowItWorks /></div>
      </section>

      <section className="home-categories" aria-labelledby="home-categories-title">
        <div className="home-shell">
          <div className="home-section-heading"><div><span className="home-section-kicker">Browse by tradition</span><h2 id="home-categories-title">Find a Puja by Category</h2><p>Explore ceremonies by occasion and ritual type.</p></div><Link href="/pujas" className="home-text-link">All pujas <ArrowRight size={15} /></Link></div>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      <ServicesSection />

      <section className="home-cities" aria-labelledby="home-cities-title">
        <div className="home-shell">
          <div className="home-section-heading"><div><span className="home-section-kicker">Explore by location</span><h2 id="home-cities-title">Puja Enquiries by City</h2><p>Choose a city guide and share your preferred locality. Service availability is confirmed individually.</p></div><Link href="/cities" className="home-text-link">Explore all cities <ArrowRight size={15} /></Link></div>
          <div className="home-city-grid">{featuredCities.map((city) => <CityCard city={city} key={city.id} />)}</div>
        </div>
      </section>

      <AstrologersAcharyas />

      <SamagriGuide items={pujas.slice(0, 12)} />

      <section className="home-guides" aria-labelledby="home-guides-title">
        <div className="home-shell">
          <div className="home-section-heading"><div><span className="home-section-kicker">Plan with clarity</span><h2 id="home-guides-title">Puja Guides and Advice</h2><p>Practical guidance for choosing a ritual and preparing your enquiry.</p></div><Link href="/guides" className="home-text-link">All guides <ArrowRight size={15} /></Link></div>
          <Link className="home-guide-card" href="/guides/how-to-book-a-pandit-for-puja-at-home"><span>Booking advice · 4 min read</span><strong>How to Book a Pandit for Puja at Home</strong><small>Learn which details to share and what to confirm before you book.</small><ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="home-mantras" id="mantras" aria-labelledby="home-mantras-title">
        <div className="home-shell"><div className="home-section-heading"><div><span className="home-section-kicker">Read and reflect</span><h2 id="home-mantras-title">Mantras to Explore</h2><p>Short Sanskrit excerpts and meanings from the PujaPath collection.</p></div></div><div className="home-mantra-grid">{featuredMantras.map((mantra) => <MantraCard mantra={mantra} key={mantra.name} />)}</div></div>
      </section>

      <section className="home-faq" aria-labelledby="home-faq-title">
        <div className="home-shell home-faq-layout"><div><span className="home-section-kicker">Good to know</span><h2 id="home-faq-title">Frequently Asked Questions</h2><p>What to expect when you send a puja enquiry.</p><Link href="/faq" className="home-text-link">More FAQs <ArrowRight size={15} /></Link></div><FAQList items={homeFaqs} /></div>
      </section>

      <section className="home-final-cta" aria-labelledby="home-final-title">
        <div className="home-shell home-final-inner"><div><span className="home-section-kicker">Personal guidance, one step at a time</span><h2 id="home-final-title">Planning a Puja? Let’s Help You Get Started</h2><p>Tell us the occasion, city, preferred date, and ritual requirements. Our team will help you understand the next steps.</p></div><div className="home-final-actions"><a href={whatsappUrl("Namaste PujaPath, I would like to enquire about a puja. I can share my occasion, city and preferred date.")} target="_blank" rel="noreferrer" className="home-final-whatsapp"><MessageCircle size={17} aria-hidden="true" /> Enquire on WhatsApp</a><Link href="/pujas" className="home-final-pujas">Explore All Pujas <ArrowRight size={16} aria-hidden="true" /></Link></div></div>
      </section>
    </div>
  </>;
}
