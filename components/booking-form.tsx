"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";

export function BookingForm({ presetPuja = "", presetRequirement = "" }: { presetPuja?: string; presetRequirement?: string }) {
  const selectedPuja = pujas.find((puja) => puja.slug === presetPuja);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = new FormData(event.currentTarget);
    const slug = String(form.get("puja") || "");
    const pujaName = pujas.find((puja) => puja.slug === slug)?.name || slug;
    const language = String(form.get("languagePreference") || "");
    const tradition = String(form.get("traditionPreference") || "");
    setSubmitting(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          puja: pujaName,
          pujaDate: form.get("pujaDate"),
          preferredTime: form.get("preferredTime"),
          city: form.get("city"),
          location: form.get("location"),
          bookingType: form.get("bookingType"),
          languagePreference: language,
          traditionPreference: tradition,
          gotra: form.get("gotra"),
          additionalRequirement: form.get("additionalRequirement"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not submit your enquiry. Please try again.");
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not submit your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) return <div className="submit-modal-backdrop">
    <section className="submit-success-modal" role="alertdialog" aria-modal="true" aria-labelledby="submit-success-title" aria-describedby="submit-success-description">
      <span className="submit-success-icon"><CheckCircle2 size={30} /></span>
      <h2 id="submit-success-title">Jay Shree Ram 🙏</h2>
      <p id="submit-success-description">Your enquiry was submitted successfully.</p>
      <Link className="button" href="/" autoFocus>Back to home <ArrowRight size={17} /></Link>
    </section>
  </div>;

  return <form className="form-grid" onSubmit={submit}>
    <div className="form-field"><label htmlFor="booking-name">Full name *</label><input id="booking-name" name="name" autoComplete="name" placeholder="Your name" maxLength={120} required /></div>
    <div className="form-field"><label htmlFor="booking-phone">Mobile number *</label><input id="booking-phone" name="phone" type="tel" autoComplete="tel" pattern="[0-9+() -]{8,18}" placeholder="+91 98765 43210" required /></div>
    <div className="form-field"><label htmlFor="booking-email">Email <span className="optional">Optional</span></label><input id="booking-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" /></div>
    <div className="form-field"><label htmlFor="booking-puja">Puja *</label><select id="booking-puja" name="puja" defaultValue={selectedPuja?.slug || ""} required><option value="" disabled>Choose a puja</option>{pujas.map((puja) => <option key={puja.id} value={puja.slug}>{puja.name}</option>)}</select></div>
    <div className="form-field"><label htmlFor="booking-date">Preferred date *</label><div className="field-with-icon"><input id="booking-date" name="pujaDate" type="date" required /><CalendarDays size={17} /></div></div>
    <div className="form-field"><label htmlFor="booking-time">Preferred time</label><select id="booking-time" name="preferredTime" defaultValue=""><option value="">Any suitable time</option><option>Early morning</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></div>
    <div className="form-field"><label htmlFor="booking-city">City *</label><select id="booking-city" name="city" defaultValue="" required><option value="" disabled>Select a city</option>{cities.map((city) => <option key={city.id}>{city.name}</option>)}<option>Other city</option></select></div>
    <div className="form-field"><label htmlFor="booking-location">Location</label><input id="booking-location" name="location" autoComplete="address-level2" placeholder="Area or locality" /></div>
    <fieldset className="form-field form-span"><legend>Booking type *</legend><div className="choice-row"><label><input type="radio" name="bookingType" value="At Home" defaultChecked /> At home</label><label><input type="radio" name="bookingType" value="Online" /> Online</label></div></fieldset>
    <div className="form-field"><label htmlFor="booking-language">Language preference</label><input id="booking-language" name="languagePreference" placeholder="Hindi, Sanskrit, Telugu…" /></div>
    <div className="form-field"><label htmlFor="booking-tradition">Family tradition preference</label><select id="booking-tradition" name="traditionPreference" defaultValue=""><option value="">Any tradition</option><option>North Indian</option><option>South Indian</option><option>Bengali</option><option>Gujarati</option><option>Marathi</option><option>Odia</option><option>Other or not sure</option></select></div>
    <div className="form-field"><label htmlFor="booking-gotra">Gotra <span className="optional">Optional</span></label><input id="booking-gotra" name="gotra" placeholder="If known" /></div>
    <div className="form-field form-span"><label htmlFor="booking-requirements">Additional requirements</label><textarea id="booking-requirements" name="additionalRequirement" rows={4} maxLength={700} defaultValue={presetRequirement} placeholder="Family tradition, samagri questions or other details" /></div>
    <button className="button form-span" type="submit" disabled={submitting}>{submitting ? "Submitting your enquiry…" : "Submit enquiry"} <ArrowRight size={17} /></button>
    {errorMessage && <p className="form-error form-span" role="alert">{errorMessage}</p>}
    <p className="form-note form-span">Your enquiry will be saved and sent to our team. Your booking is not confirmed until availability is agreed.</p>
    <p className="form-note form-span"><Link href="/privacy">Read how enquiry information is handled.</Link></p>
  </form>;
}
