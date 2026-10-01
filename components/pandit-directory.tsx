"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Languages, MapPin, Star, UserRound } from "lucide-react";
import Link from "next/link";

type SampleProfile = {
  id: string;
  name: string;
  role: string;
  experience: number | null;
  rituals: string[];
  languages: string[];
  city: string;
  formats: string[];
};

const sampleProfiles: SampleProfile[] = [
  { id: "sample-01", name: "Pandit Profile 01", role: "Pandit", experience: null, rituals: ["Griha Pravesh", "Vastu Puja"], languages: [], city: "To be confirmed", formats: ["At Home", "Online"] },
  { id: "sample-02", name: "Pandit Profile 02", role: "Pandit", experience: null, rituals: ["Satyanarayan Puja", "Ganesh Puja"], languages: [], city: "To be confirmed", formats: ["At Home"] },
  { id: "sample-03", name: "Pandit Profile 03", role: "Pandit", experience: null, rituals: ["Rudrabhishek", "Mahamrityunjaya Havan"], languages: [], city: "To be confirmed", formats: ["Online"] },
  { id: "sample-04", name: "Astrologer Profile", role: "Astrologer", experience: null, rituals: ["Vedic astrology", "Kundli consultation"], languages: [], city: "To be confirmed", formats: ["Online"] },
  { id: "sample-05", name: "Shastri Profile", role: "Shastri", experience: null, rituals: ["Vedic path", "Sanskrit recitation"], languages: [], city: "To be confirmed", formats: ["At Home", "Online"] },
  { id: "sample-06", name: "Tithi & Nakshatra Profile", role: "Tithi & Nakshatra Specialist", experience: null, rituals: ["Tithi guidance", "Nakshatra consultation"], languages: [], city: "To be confirmed", formats: ["Online"] },
];

export function PanditDirectory() {
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("");
  const [ritual, setRitual] = useState("");
  const [experience, setExperience] = useState("");
  const [format, setFormat] = useState("");
  const profiles = useMemo(() => sampleProfiles.filter((person) =>
    (!city || person.city === city) && (!language || person.languages.includes(language)) &&
    (!ritual || person.rituals.some((item) => item.toLowerCase().includes(ritual.toLowerCase()))) &&
    (!experience || (person.experience !== null && person.experience >= Number(experience))) && (!format || person.formats.includes(format)),
  ), [city, language, ritual, experience, format]);

  return <>
    <div className="pp-pandit-filters" aria-label="Filter sample Pandit profiles">
      <label><span>City</span><select value={city} onChange={(event) => setCity(event.target.value)}><option value="">All locations</option><option>Hyderabad</option><option>Bengaluru</option><option>Online</option></select></label>
      <label><span>Language</span><select value={language} onChange={(event) => setLanguage(event.target.value)}><option value="">Any language</option><option>Hindi</option><option>Sanskrit</option><option>Telugu</option><option>English</option></select></label>
      <label><span>Puja type</span><select value={ritual} onChange={(event) => setRitual(event.target.value)}><option value="">All pujas</option><option>Ganesh</option><option>Griha</option><option>Satyanarayan</option><option>Shiva</option></select></label>
      <label><span>Experience</span><select value={experience} onChange={(event) => setExperience(event.target.value)}><option value="">Any experience</option><option value="5">5+ years</option><option value="10">10+ years</option></select></label>
      <label><span>Availability</span><select value={format} onChange={(event) => setFormat(event.target.value)}><option value="">Home or online</option><option>At Home</option><option>Online</option></select></label>
    </div>
    {profiles.length ? <div className="pp-pandit-grid">{profiles.map((person) => <article className="pp-pandit-card" key={person.id}>
      <div className="pp-pandit-avatar" aria-label="Profile photo to be added"><UserRound size={43} strokeWidth={1.25} /><span>Photo pending</span></div>
      <div className="pp-pandit-info"><span className="pp-demo-tag">{person.role} · Draft</span><h3>{person.name}</h3><p>{person.experience === null ? "Experience details to be added" : `${person.experience}+ years of experience`}</p><small>{person.rituals.join(" · ")}</small><div className="pp-languages"><Languages size={14} /> {person.languages.length ? person.languages.join(" · ") : "Languages to be added"}</div><div className="pp-languages"><MapPin size={14} /> {person.city} · {person.formats.join(" / ")}</div><div className="pp-profile-rating"><Star size={13} /> No customer rating provided</div><div className="pp-pandit-actions"><details className="pp-profile-details"><summary>View Profile</summary><p>Draft profile only. Name, photo, experience, languages, location and availability need confirmation before publication.</p></details><Link href={person.role === "Astrologer" ? "/booking?service=online-astrologer" : "/booking"}>{person.role === "Astrologer" ? "Enquire" : "Book Pandit"} <ArrowRight size={13} /></Link></div></div>
    </article>)}</div> : <div className="pp-no-profiles"><UserRound size={24} /><p>No sample profile matches these filters. Request availability for your puja and city instead.</p></div>}
    <p className="pp-demo-note">These sample profiles demonstrate directory filters only. They are not real Pandits and do not represent live availability or verified ratings. All requests are confirmed individually.</p>
  </>;
}
