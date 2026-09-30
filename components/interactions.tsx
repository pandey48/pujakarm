"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { cities } from "@/data/cities";
import { categories, pujas } from "@/data/pujas";
import { whatsappUrl } from "@/lib/constants";
import { PujaGrid } from "@/components/shared";

const normalizeSearchText = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const matchesSearch = (text: string, query: string) => {
  const searchable = normalizeSearchText(text);
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  return terms.every((term) => searchable.includes(term));
};

export function PujaExplorer({ initialQuery = "", initialCategory = "", initialType = "", initialCity = "" }: { initialQuery?: string; initialCategory?: string; initialType?: string; initialCity?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [type, setType] = useState(initialType);
  const [city, setCity] = useState(initialCity);
  const results = useMemo(() => pujas.filter((puja) => {
    const text = [puja.name, puja.slug, puja.shortDescription, puja.description, puja.category, puja.type, ...puja.cities, ...puja.benefits, ...puja.samagri].join(" ");
    const matchesType = !type || puja.type.toLowerCase().includes(type.toLowerCase());
    return matchesSearch(text, query) && (!category || puja.category === category) && matchesType && (!city || puja.cities.some((item) => item.toLowerCase() === city.toLowerCase()));
  }), [query, category, type, city]);

  return <><div className="explorer-category-chips" aria-label="Quick filter by puja category"><button type="button" aria-pressed={!category} className={!category ? "is-active" : ""} onClick={() => setCategory("")}>All Pujas</button>{categories.map((item) => <button type="button" key={item} aria-pressed={category === item} className={category === item ? "is-active" : ""} onClick={() => setCategory(category === item ? "" : item)}>{item}</button>)}</div><div className="explorer-toolbar"><label className="explorer-search"><Search size={17} /><span className="sr-only">Search pujas</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Puja, Deity or Occasion" /></label><label className="filter-select"><span className="sr-only">Filter by category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label className="filter-select"><span className="sr-only">Filter by format</span><select value={type} onChange={(event) => setType(event.target.value)}><option value="">At home or online</option><option value="home">At home</option><option value="online">Online</option></select></label><label className="filter-select"><span className="sr-only">Filter by city</span><select value={city} onChange={(event) => setCity(event.target.value)}><option value="">All enquiry locations</option>{cities.map((item) => <option key={item.id}>{item.name}</option>)}</select></label></div><p className="results-count" aria-live="polite">{results.length} puja listings · availability confirmed after enquiry</p>{results.length ? <PujaGrid items={results} /> : <div className="search-empty-state"><strong>No pujas matched those filters.</strong><span>Try another name, city or format.</span><button type="button" onClick={() => { setQuery(""); setCategory(""); setType(""); setCity(""); }}>Clear search and filters</button></div>}</>;
}

export function ContactForm() {
  function continueOnWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const message = `Namaste PujaPath, I have a question.\nName: ${values.get("name")}\nEmail: ${values.get("email")}\nTopic: ${values.get("topic")}\nMessage: ${values.get("message")}`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return <form className="form-grid" onSubmit={continueOnWhatsApp}><div className="form-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required /></div><div className="form-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required /></div><div className="form-field form-span"><label htmlFor="contact-topic">How can we help?</label><select id="contact-topic" name="topic"><option>Booking enquiry</option><option>Pandit registration</option><option>General question</option></select></div><div className="form-field form-span"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={5} required /></div><button className="button form-span" type="submit">Continue on WhatsApp</button><p className="form-note form-span">WhatsApp opens with your message. It is sent only after you review and tap Send.</p></form>;
}

export function PanditJoinForm() {
  function continueOnWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const message = `Namaste PujaPath, I am interested in Pandit registration.\nName: ${values.get("name")}\nPhone: ${values.get("phone")}\nEmail: ${values.get("email")}\nCity: ${values.get("city")}\nExperience: ${values.get("experience")}\nLanguages: ${values.get("languages")}\nPuja expertise: ${values.get("expertise")}`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return <form className="form-grid" onSubmit={continueOnWhatsApp}><div className="form-field"><label htmlFor="pandit-name">Full name</label><input id="pandit-name" name="name" autoComplete="name" required /></div><div className="form-field"><label htmlFor="pandit-phone">Phone</label><input id="pandit-phone" name="phone" type="tel" autoComplete="tel" required /></div><div className="form-field"><label htmlFor="pandit-email">Email</label><input id="pandit-email" name="email" type="email" required /></div><div className="form-field"><label htmlFor="pandit-city">City</label><select id="pandit-city" name="city" required defaultValue=""><option value="" disabled>Select city</option>{cities.map((city) => <option key={city.id}>{city.name}</option>)}</select></div><div className="form-field"><label htmlFor="pandit-experience">Years of experience</label><input id="pandit-experience" name="experience" type="number" min="0" required /></div><div className="form-field"><label htmlFor="pandit-languages">Languages</label><input id="pandit-languages" name="languages" placeholder="Hindi, Sanskrit, Telugu" required /></div><div className="form-field form-span"><label htmlFor="pandit-expertise">Puja expertise</label><input id="pandit-expertise" name="expertise" placeholder="Griha Pravesh, Havan, Vivah…" required /></div><button className="button form-span" type="submit">Continue on WhatsApp</button><p className="form-note form-span">This form does not save or upload registration details. WhatsApp opens with your message; send it only after review. Do not share identity documents here.</p></form>;
}
