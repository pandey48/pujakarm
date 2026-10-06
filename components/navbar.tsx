"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight, Flame, Home, Menu, MessageCircle, MapPin, Search, Video, X } from "lucide-react";
import { categories, pujas } from "@/data/pujas";
import { cities } from "@/data/cities";
import { whatsappUrl } from "@/lib/constants";

const navigation = [
  ["Online Puja", "/pujas?type=online"], ["Puja at Home", "/pujas?type=home"], ["Cities", "/cities"], ["Guides", "/guides"], ["For Pandits", "/pandit/join"], ["About", "/about"],
];
const featuredPujas = ["griha-pravesh-puja", "satyanarayan-puja", "rudrabhishek-puja", "ganesh-puja"].map((slug) => pujas.find((puja) => puja.slug === slug)).filter((puja) => puja !== undefined);

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="site-header" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}>
    <div className="nav-wrap">
      <Link href="/" className="brand" aria-label="PujaPath home"><span className="brand-mark">ॐ</span><span>Puja<span className="brand-accent">Path</span><small>RITUALS, WITH CARE</small></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation"><div className="nav-mega"><Link href="/pujas" className="nav-mega-trigger">Pujas <ArrowDown size={13} /></Link><div className="nav-mega-panel"><div className="nav-mega-categories"><span className="nav-mega-label">Browse by ritual</span><div>{categories.map((category) => <Link key={category} href={`/pujas?category=${encodeURIComponent(category)}`}><Flame size={15} />{category}<ArrowRight size={13} /></Link>)}</div><Link className="nav-mega-all" href="/pujas">Explore all pujas <ArrowRight size={14} /></Link></div><div className="nav-mega-side"><span className="nav-mega-label">Quick paths</span><Link href="/pujas?type=home"><Home size={16} /><span><strong>At home</strong><small>Invite a Pandit to perform your ritual</small></span></Link><Link href="/pujas?type=online"><Video size={16} /><span><strong>Online puja</strong><small>Join selected ceremonies remotely</small></span></Link><span className="nav-mega-label nav-mega-city-label">Popular cities</span><div className="nav-mega-cities">{cities.slice(0,4).map((city) => <Link key={city.id} href={`/cities/${city.slug}`}><MapPin size={13} />{city.name}</Link>)}</div><span className="nav-mega-label nav-mega-city-label">Popular pujas</span>{featuredPujas.slice(0,3).map((puja) => <Link className="nav-mega-popular" key={puja.id} href={`/pujas/${puja.slug}`}>{puja.name}</Link>)}</div></div></div>{navigation.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav>
      <div className="nav-actions"><Link href="/#home-search" className="nav-search" aria-label="Search for a puja"><Search size={18} /></Link><Link href="/cities" className="nav-city" aria-label="Select a city"><MapPin size={15} /> Select City</Link><a className="nav-whatsapp" href={whatsappUrl("Namaste PujaPath, I would like to enquire about a puja.")} target="_blank" rel="noreferrer" aria-label="Message PujaPath on WhatsApp"><MessageCircle size={17} /></a><Link href="/booking" className="button button-small">Book a Puja <span aria-hidden="true">↗</span></Link><button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/" onClick={() => setOpen(false)}>Home</Link><Link href="/pujas" onClick={() => setOpen(false)}>Pujas</Link>{navigation.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/booking" onClick={() => setOpen(false)}>Book a Puja</Link></nav>}
  </header>;
}
