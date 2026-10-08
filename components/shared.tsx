import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3, House, Languages, ShieldCheck, Sparkles, Video, Check, MapPin, Flame, HeartHandshake } from "lucide-react";
import type { City, Puja } from "@/lib/types";
import { SOCIAL_LINKS, whatsappUrl } from "@/lib/constants";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";

export function SectionHeading({ eyebrow, title, text, link }: { eyebrow?: string; title: string; text?: string; link?: { label: string; href: string } }) {
  return <div className="section-heading"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{text && <p>{text}</p>}</div>{link && <Link className="text-link heading-link" href={link.href}>{link.label}<ArrowRight size={16} /></Link>}</div>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="breadcrumbs"><Link href="/">Home</Link>{items.map((item, index) => <span key={`${item.label}-${index}`}><span className="crumb-divider">/</span>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}

export function WhatsAppButton({ message, label = "Book on WhatsApp", className = "" }: { message: string; label?: string; className?: string }) {
  return <a className={`button button-outline ${className}`} href={whatsappUrl(message)} target="_blank" rel="noreferrer"><span className="whatsapp-symbol">◉</span>{label}</a>;
}

export function PujaCard({ puja }: { puja: Puja }) {
  const hasHome = puja.type === "Home" || puja.type === "Home & Online";
  const hasOnline = puja.type === "Online" || puja.type === "Home & Online";
  const dakshinaMessage = `Namaste PujaPath, please share the dakshina details for ${puja.name}.`;
  return <article className="puja-card">
    <Link href={`/pujas/${puja.slug}`} className="puja-image-link" aria-label={`View details for ${puja.name}`}>
      <Image src={puja.image} alt={`${puja.name} puja ceremony`} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw" className="cover-image" />
      <span className="puja-card-badges">{puja.isPopular && <span className="puja-popular-badge"><span aria-hidden="true">★</span> Popular</span>}<span className="image-tag">{puja.category}</span></span>
    </Link>
    <div className="puja-card-content">
      <h3><Link href={`/pujas/${puja.slug}`}>{puja.name}</Link></h3>
      <p>{puja.shortDescription}</p>
      <div className="puja-card-facts"><span><Clock3 size={15} />{puja.duration}</span><span className="puja-card-formats">{hasHome && <span><House size={15} />Home Puja</span>}{hasOnline && <span><Video size={15} />Online</span>}</span></div>
      <div className="puja-card-actions"><Link href={`/pujas/${puja.slug}`} className="button button-outline button-card puja-view-details">View details</Link><Link href={`/booking?puja=${puja.slug}`} className="button button-card button-book-puja">Book now <ArrowRight size={15} /></Link></div>
      <a href={whatsappUrl(dakshinaMessage)} target="_blank" rel="noreferrer" className="puja-card-dakshina">Dakshina on WhatsApp <ArrowUpRight size={14} aria-hidden="true" /></a>
    </div>
  </article>;
}

export function PujaGrid({ items }: { items: Puja[] }) {
  if (!items.length) return <div className="empty-state"><span className="empty-icon"><Sparkles size={22} /></span><h3>No puja found</h3><p>Try another search or choose a different category.</p></div>;
  return <div className="puja-grid">{items.map((puja) => <PujaCard key={puja.id} puja={puja} />)}</div>;
}

const categoryIcons = [House, HeartHandshake, Flame, Sparkles, Sparkles, Sparkles, Sparkles, ShieldCheck, HeartHandshake, Sparkles];
export function CategoryGrid({ categories }: { categories: string[] }) {
  return <div className="category-grid">{categories.map((category, index) => { const Icon = categoryIcons[index % categoryIcons.length]; return <Link href={`/pujas?category=${encodeURIComponent(category)}`} className="category-item" key={category}><span className="category-icon"><Icon size={20} strokeWidth={1.7} /></span><span>{category}</span><ArrowUpRight className="category-arrow" size={16} /></Link>; })}</div>;
}

export function CityCard({ city }: { city: City }) {
  return <Link href={`/cities/${city.slug}`} className="city-card"><MapPin size={16} /><span>{city.name}</span><ArrowUpRight size={15} className="city-arrow" /></Link>;
}

export function TrustSection() {
  const items = [[ShieldCheck, "Pandit enquiries", "Discuss preferences and availability"], [Sparkles, "Vedic Rituals", "Traditions treated with care"], [House, "Home & Online", "Choose how you participate"], [Check, "Easy Booking", "Clear details, one request"]] as const;
  return <div className="trust-row">{items.map(([Icon, title, detail]) => <div className="trust-item" key={title}><span className="trust-icon"><Icon size={21} strokeWidth={1.7} /></span><div><strong>{title}</strong><span>{detail}</span></div></div>)}</div>;
}

export function HowItWorks() {
  const steps = [[SearchGlyph, "Choose your puja", "Explore ceremonies and find the right fit."], [MapPin, "Share your details", "Tell us your city, date and preferences."], [Languages, "Meet your Pandit", "We coordinate the details with you."], [Sparkles, "Begin the ritual", "Join at home or online, with guidance."]] as const;
  return <div className="steps-grid">{steps.map(([Icon, title, detail], index) => <div className="step-item" key={title}><div className="step-number">0{index + 1}</div><span className="step-icon"><Icon size={22} strokeWidth={1.65} /></span><h3>{title}</h3><p>{detail}</p></div>)}</div>;
}

function SearchGlyph({ size = 20 }: { size?: number }) { return <MapPin size={size} strokeWidth={1.65} />; }

export function Footer() {
  const popularPujas = pujas.filter((puja) => puja.isPopular).slice(0, 8);
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand">
        <Link href="/" className="brand"><span className="brand-mark">ॐ</span><span>Puja<span className="brand-accent">Path</span><small>RITUALS, WITH CARE</small></span></Link>
        <p>Find a Pandit for traditional puja at home or online. Explore ceremonies, share your preferences and request availability with the PujaPath team.</p>
        <a className="footer-whatsapp" href={whatsappUrl("Namaste PujaPath, I would like to enquire.")} target="_blank" rel="noreferrer"><span className="whatsapp-symbol">◉</span> Chat with our team</a>
      </div>
      <nav className="footer-links footer-puja-links" aria-label="Popular puja services">
        <h3>Popular puja services</h3>
        {popularPujas.map((puja) => <Link href={`/pujas/${puja.slug}`} key={puja.id}>{puja.name}</Link>)}
        <Link className="footer-more-link" href="/pujas">Explore all pujas <ArrowRight size={13} /></Link>
      </nav>
      <nav className="footer-links footer-city-links" aria-label="Puja services by city">
        <h3>Find a Pandit by city</h3>
        {cities.map((city) => <Link href={`/cities/${city.slug}`} key={city.id}>Puja services in {city.name}</Link>)}
        <Link className="footer-more-link" href="/cities">View all cities <ArrowRight size={13} /></Link>
      </nav>
      <nav className="footer-links footer-request-links" aria-label="Puja booking and support">
        <h3>Request a Pandit</h3>
        <Link className="footer-request-link" href="/booking">Request a Pandit for your puja</Link>
        <Link href="/pujas?type=home">Book a puja at home</Link>
        <Link href="/pujas?type=online">Enquire about online puja</Link>
        <Link href="/pandit/join">Join PujaPath as a Pandit</Link>
        <Link href="/guides">Puja booking guides</Link>
        <Link href="/faq">Frequently asked questions</Link>
        <Link href="/about">About PujaPath</Link>
        <Link href="/contact">Contact our team</Link>
        <Link href="/privacy">Privacy notice</Link>
        <Link href="/terms">Terms of service</Link>
        <div className="footer-socials">{SOCIAL_LINKS.map((social, index) => <a href={social.href} key={social.label} aria-label={social.label} target="_blank" rel="noreferrer"><span aria-hidden="true">{["◎", "f", "▶"][index]}</span></a>)}</div>
      </nav>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} PujaPath. Puja and Pandit enquiries for home and online ceremonies across India.</span>
      <span>Namaste <span className="footer-om">ॐ</span></span>
    </div>
  </footer>;
}

export function FAQList({ items }: { items: { question: string; answer: string }[] }) {
  return <div className="faq-list">{items.map((item) => <details className="faq-item" key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>;
}

export function FeatureBand() {
  return <section className="feature-band"><div className="feature-card feature-home"><span className="eyebrow">IN YOUR SPACE</span><House size={27} /><h3>Home puja, at your pace.</h3><p>Request a Pandit for a home puja and confirm the arrangements before booking.</p><Link href="/pujas?type=home" className="text-link">Book home puja <ArrowRight size={16} /></Link></div><div className="feature-card feature-online"><span className="eyebrow">WHEREVER YOU ARE</span><Video size={27} /><h3>Join the puja from anywhere.</h3><p>Take part in a guided ceremony over video.</p><Link href="/pujas?type=online" className="text-link">Book online puja <ArrowRight size={16} /></Link></div></section>;
}
