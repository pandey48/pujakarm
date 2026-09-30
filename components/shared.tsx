import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3, House, Languages, ShieldCheck, Sparkles, Video, Check, MapPin, Flame, HeartHandshake } from "lucide-react";
import type { City, Puja } from "@/lib/types";
import { SOCIAL_LINKS, whatsappUrl } from "@/lib/constants";

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
  return <article className="puja-card"><Link href={`/pujas/${puja.slug}`} className="puja-image-link" aria-label={`View details for ${puja.name}`}><Image src={puja.image} alt={`${puja.name} ceremony`} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw" className="cover-image" /><span className="image-tag">{puja.category}</span></Link><div className="puja-card-content"><h3><Link href={`/pujas/${puja.slug}`}>{puja.name}</Link></h3><p>{puja.shortDescription}</p><div className="puja-card-facts"><span><Clock3 size={13} />Duration: {puja.duration}</span><span className="puja-card-formats">{hasHome && <span><House size={13} />At Home</span>}{hasOnline && <span><Video size={13} />Online</span>}</span></div><div className="puja-card-actions"><a href={whatsappUrl(dakshinaMessage)} target="_blank" rel="noreferrer" className="button button-card button-dakshina"><span aria-hidden="true">◉</span> Dakshina on WhatsApp</a><Link href={`/booking?puja=${puja.slug}`} className="button button-card button-book-puja">Book Puja</Link></div></div></article>;
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
  const items = [[ShieldCheck, "Verified Pandits", "Profiles reviewed before joining"], [Sparkles, "Vedic Rituals", "Traditions treated with care"], [House, "Home & Online", "Choose how you participate"], [Check, "Easy Booking", "Clear details, one request"]] as const;
  return <div className="trust-row">{items.map(([Icon, title, detail]) => <div className="trust-item" key={title}><span className="trust-icon"><Icon size={21} strokeWidth={1.7} /></span><div><strong>{title}</strong><span>{detail}</span></div></div>)}</div>;
}

export function HowItWorks() {
  const steps = [[SearchGlyph, "Choose your puja", "Explore ceremonies and find the right fit."], [MapPin, "Share your details", "Tell us your city, date and preferences."], [Languages, "Meet your Pandit", "We coordinate the details with you."], [Sparkles, "Begin the ritual", "Join at home or online, with guidance."]] as const;
  return <div className="steps-grid">{steps.map(([Icon, title, detail], index) => <div className="step-item" key={title}><div className="step-number">0{index + 1}</div><span className="step-icon"><Icon size={22} strokeWidth={1.65} /></span><h3>{title}</h3><p>{detail}</p></div>)}</div>;
}

function SearchGlyph({ size = 20 }: { size?: number }) { return <MapPin size={size} strokeWidth={1.65} />; }

export function Footer() {
  const linkGroups = [
    { title: "Explore pujas", links: [["Griha Pravesh", "/pujas/griha-pravesh-puja"], ["Satyanarayan", "/pujas/satyanarayan-puja"], ["Rudrabhishek", "/pujas/rudrabhishek-puja"], ["Ganesh Puja", "/pujas/ganesh-puja"], ["Lakshmi Puja", "/pujas/lakshmi-puja"]] },
    { title: "PujaPath", links: [["About us", "/about"], ["Contact", "/contact"], ["Frequently asked", "/faq"], ["Join as Pandit", "/pandit/join"], ["Book a puja", "/booking"]] },
    { title: "Find us in", links: [["Hyderabad", "/cities/hyderabad"], ["Bengaluru", "/cities/bengaluru"], ["Mumbai", "/cities/mumbai"], ["Delhi", "/cities/delhi"], ["Pune", "/cities/pune"]] },
  ];
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Link href="/" className="brand"><span className="brand-mark">ॐ</span><span>Puja<span className="brand-accent">Path</span><small>RITUALS, WITH CARE</small></span></Link><p>Trusted Pandits. Authentic Pujas.<br />Right at Your Doorstep.</p><a className="footer-whatsapp" href={whatsappUrl("Namaste PujaPath, I would like to enquire.")} target="_blank" rel="noreferrer"><span className="whatsapp-symbol">◉</span> Chat with our team</a></div>{linkGroups.map((group) => <div className="footer-links" key={group.title}><h3>{group.title}</h3>{group.links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</div>)}<div className="footer-links"><h3>Stay connected</h3><Link href="/contact">Get in touch</Link><Link href="/faq">Booking FAQs</Link><Link href="/privacy">Privacy notice</Link><Link href="/terms">Terms of service</Link><div className="footer-socials">{SOCIAL_LINKS.map((social, index) => <a href={social.href} key={social.label} aria-label={social.label} target="_blank" rel="noreferrer"><span aria-hidden="true">{["◎", "f", "▶"][index]}</span></a>)}</div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PujaPath. Made with care.</span><span>Namaste <span className="footer-om">ॐ</span></span></div></footer>;
}

export function FAQList({ items }: { items: { question: string; answer: string }[] }) {
  return <div className="faq-list">{items.map((item) => <details className="faq-item" key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>;
}

export function FeatureBand() {
  return <section className="feature-band"><div className="feature-card feature-home"><span className="eyebrow">IN YOUR SPACE</span><House size={27} /><h3>Home puja, at your pace.</h3><p>Experienced Pandits perform the puja at your home.</p><Link href="/pujas?type=home" className="text-link">Book home puja <ArrowRight size={16} /></Link></div><div className="feature-card feature-online"><span className="eyebrow">WHEREVER YOU ARE</span><Video size={27} /><h3>Join the puja from anywhere.</h3><p>Take part in a guided ceremony over video.</p><Link href="/pujas?type=online" className="text-link">Book online puja <ArrowRight size={16} /></Link></div></section>;
}
