"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { cities } from "@/data/cities";
import { categories, popularPujaIds, pujas } from "@/data/pujas";
import { PujaGrid } from "@/components/shared";
import { submitWebsiteEnquiry } from "@/components/enquiry-client";
import { BookingForm } from "@/components/booking-form";

const normalizeSearchText = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const matchesSearch = (text: string, query: string) => {
  const searchable = normalizeSearchText(text);
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  return terms.every((term) => searchable.includes(term));
};

export function PujaExplorer({ initialQuery = "", initialCategory = "", initialType = "", initialCity = "", initialPopular = false }: { initialQuery?: string; initialCategory?: string; initialType?: string; initialCity?: string; initialPopular?: boolean }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [type, setType] = useState(initialType);
  const [city, setCity] = useState(initialCity);
  const [popular, setPopular] = useState(initialPopular);
  const results = useMemo(() => pujas.filter((puja) => {
    const text = [puja.name, puja.slug, puja.shortDescription, puja.description, puja.category, puja.type, ...puja.cities, ...puja.benefits, ...puja.samagri].join(" ");
    const matchesType = !type || puja.type.toLowerCase().includes(type.toLowerCase());
    return matchesSearch(text, query) && (!popular || popularPujaIds.includes(puja.id)) && (!category || puja.category === category) && matchesType && (!city || puja.cities.some((item) => item.toLowerCase() === city.toLowerCase()));
  }), [query, category, type, city, popular]);

  return <><div className="explorer-category-chips" aria-label="Quick filter by puja category"><button type="button" aria-pressed={!category && !popular} className={!category && !popular ? "is-active" : ""} onClick={() => { setCategory(""); setPopular(false); }}>All</button><button type="button" aria-pressed={popular} className={popular ? "is-active" : ""} onClick={() => { setPopular(!popular); setCategory(""); }}>Popular</button>{categories.map((item) => <button type="button" key={item} aria-pressed={category === item} className={category === item ? "is-active" : ""} onClick={() => { setCategory(category === item ? "" : item); setPopular(false); }}>{item}</button>)}</div><div className="explorer-toolbar"><label className="explorer-search"><Search size={17} /><span className="sr-only">Search pujas</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Puja..." /></label><label className="filter-select"><span className="sr-only">Filter by booking type</span><select value={type} onChange={(event) => setType(event.target.value)}><option value="">All booking types</option><option value="home">Home Puja</option><option value="online">Online</option></select></label><label className="filter-select"><span className="sr-only">Filter by city</span><select value={city} onChange={(event) => setCity(event.target.value)}><option value="">All locations</option>{cities.map((item) => <option key={item.id}>{item.name}</option>)}</select></label></div><p className="results-count" aria-live="polite">{results.length} puja services · availability confirmed after enquiry</p>{results.length ? <PujaGrid items={results} /> : <div className="search-empty-state"><strong>No pujas matched those filters.</strong><span>Try another name, city or format.</span><button type="button" onClick={() => { setQuery(""); setCategory(""); setType(""); setCity(""); setPopular(false); }}>Clear search and filters</button></div>}</>;
}

export function PujaQuestionForm({ pujaName }: { pujaName: string }) {
  const selectedPuja = pujas.find((puja) => puja.name === pujaName);
  return <BookingForm presetPuja={selectedPuja?.slug || ""} />;
}

export function ContactForm() {
  return <BookingForm />;
}

export function PanditJoinForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [cityChoice, setCityChoice] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const submitLock = useRef(false);
  const languages = ["Hindi", "Sanskrit", "English", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Gujarati", "Bengali", "Punjabi", "Odia", "Assamese", "Other"];
  const services = ["Ganesh Puja", "Satyanarayan Puja", "Griha Pravesh Puja", "Rudrabhishek", "Havan", "Wedding / Vivah Puja", "Navgraha Shanti", "Shraddha / Pitru Puja", "Vastu Puja", "Other"];
  const states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current) return;
    const values = new FormData(event.currentTarget);
    const formElement = event.currentTarget;
    const language = values.getAll("language").map(String).join(", ");
    const serviceNames = values.getAll("services").map(String).join(", ");
    const cityValue = String(values.get("city") || "").trim();
    const city = cityValue === "Other" ? String(values.get("otherCity") || "").trim() : cityValue;
    const name = String(values.get("name") || "").trim();
    const phone = String(values.get("phone") || "").trim();
    if (!name) {
      setError("Enter your name.");
      return;
    }
    if (!language || !serviceNames) {
      setError("Select at least one language and one puja or service.");
      return;
    }
    if (!city) {
      setError("Select or enter your city.");
      return;
    }
    if (!/^(?:\+?91[\- ]?)?[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    submitLock.current = true;
    setPending(true);
    setError("");
    try {
      await submitWebsiteEnquiry("pandit-registration", {
        type: "pandit",
        name,
        phone,
        whatsapp: phone,
        city,
        state: String(values.get("state") || ""),
        experience: String(values.get("experience") || ""),
        language,
        services: serviceNames,
      });
      formElement.reset();
      setCityChoice("");
      setSelectedServices([]);
      setSavedMessage("Thank you! Your registration has been submitted successfully. We will review your details and contact you soon.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We could not submit your enquiry. Please try again.");
    } finally {
      submitLock.current = false;
      setPending(false);
    }
  }

  if (savedMessage) return <div className="inline-success" role="status"><strong>Jai Shree Ram 🙏</strong><span>{savedMessage}</span></div>;

  return <form className="form-grid pandit-registration-form" onSubmit={submit}>
    <div className="form-field"><label htmlFor="pandit-name">Pandit Name *</label><input id="pandit-name" name="name" autoComplete="name" maxLength={120} required /></div>
    <div className="form-field"><label htmlFor="pandit-phone">Mobile / WhatsApp Number *</label><input id="pandit-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" pattern="(?:\+?91[\- ]?)?[6-9][0-9]{9}" maxLength={16} placeholder="+91 9876543210" required /></div>
    <div className="form-field"><label htmlFor="pandit-city">City *</label><select id="pandit-city" name="city" value={cityChoice} onChange={(event) => setCityChoice(event.target.value)} required><option value="" disabled>Select your city</option>{cities.map((city) => <option key={city.id} value={city.name}>{city.name}</option>)}<option value="Other">Other</option></select></div>
    {cityChoice === "Other" && <div className="form-field"><label htmlFor="pandit-other-city">Enter your city *</label><input id="pandit-other-city" name="otherCity" autoComplete="address-level2" maxLength={120} required /></div>}
    <div className="form-field"><label htmlFor="pandit-state">State *</label><select id="pandit-state" name="state" defaultValue="" required><option value="" disabled>Select a state</option>{states.map((state) => <option key={state}>{state}</option>)}</select></div>
    <div className="form-field"><label htmlFor="pandit-experience">Experience (years) *</label><input id="pandit-experience" name="experience" type="number" min="0" max="80" step="0.5" required /></div>
    <fieldset className="form-field form-span registration-choice-group"><legend>Language * <span>Select all that apply</span></legend><details className="registration-dropdown"><summary>Choose languages</summary><div className="registration-dropdown-options">{languages.map((language) => <label key={language}><input type="checkbox" name="language" value={language} /><span>{language}</span></label>)}</div></details></fieldset>
    <fieldset className="form-field form-span registration-choice-group"><legend>Puja / Services * <span>Select all that apply</span></legend><details className="registration-dropdown"><summary><span>{selectedServices.length ? `${selectedServices.length} selected` : "Choose pujas or services"}</span></summary><div className="registration-dropdown-options">{services.map((service) => <label key={service}><input type="checkbox" name="services" value={service} checked={selectedServices.includes(service)} onChange={(event) => setSelectedServices((current) => event.target.checked ? [...current, service] : current.filter((item) => item !== service))} /><span>{service}</span></label>)}</div></details></fieldset>
    <button className="button form-span" type="submit" disabled={pending}>{pending ? "Submitting Registration..." : "Submit registration"}</button>
    {error && <p className="form-error form-span" role="alert">{error}</p>}
  </form>;
}
