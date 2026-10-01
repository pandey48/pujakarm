"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { pujas } from "@/data/pujas";
import { submitWebsiteEnquiry } from "@/components/enquiry-client";
import { whatsappUrl } from "@/lib/constants";

export function BookingForm({ presetPuja = "", presetRequirement = "" }: { presetPuja?: string; presetRequirement?: string }) {
  const selectedPuja = pujas.find((puja) => puja.slug === presetPuja);
  const [submitting, setSubmitting] = useState(false);
  const submitLock = useRef(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedWhatsAppMessage, setSubmittedWhatsAppMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current) return;
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const slug = String(form.get("puja") || "");
    const pujaName = pujas.find((puja) => puja.slug === slug)?.name || (slug === "online-astrologer" ? "Online Astrologer Consultant" : slug);
    const phone = String(form.get("phone") || "");
    const message = String(form.get("message") || "");
    submitLock.current = true;
    setSubmitting(true);
    setErrorMessage("");
    try {
      await submitWebsiteEnquiry(`booking:${presetPuja || "general"}`, {
        type: "lead",
        name: String(form.get("name") || ""),
        phone,
        whatsapp: String(form.get("whatsapp") || ""),
        puja: pujaName,
        location: String(form.get("location") || ""),
        preferredDate: String(form.get("preferredDate") || ""),
        message,
      });
      formElement.reset();
      setSubmittedWhatsAppMessage(`Namaste PujaPath, I have submitted an enquiry for ${pujaName}. My phone number is ${phone}. ${message}`);
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not submit your enquiry. Please try again.");
    } finally {
      submitLock.current = false;
      setSubmitting(false);
    }
  }

  if (submitted) return <div className="submit-modal-backdrop">
    <section className="submit-success-modal" role="alertdialog" aria-modal="true" aria-labelledby="submit-success-title" aria-describedby="submit-success-description">
      <span className="submit-success-icon"><CheckCircle2 size={30} /></span>
      <h2 id="submit-success-title">Jay Shree Ram 🙏</h2>
      <p id="submit-success-description">Thank you! Your enquiry has been submitted successfully. We will contact you soon.</p>
      <a className="button" href={whatsappUrl(submittedWhatsAppMessage)} target="_blank" rel="noreferrer">Continue on WhatsApp</a>
      <Link className="button" href="/" autoFocus>Back to home <ArrowRight size={17} /></Link>
    </section>
  </div>;

  return <form className="form-grid" onSubmit={submit}>
    <div className="form-field"><label htmlFor="booking-name">Full name *</label><input id="booking-name" name="name" autoComplete="name" placeholder="Your name" maxLength={120} required /></div>
    <div className="form-field"><label htmlFor="booking-phone">Mobile number *</label><input id="booking-phone" name="phone" type="tel" autoComplete="tel" pattern="[0-9+() -]{8,18}" placeholder="+91 98765 43210" required /></div>
    <div className="form-field"><label htmlFor="booking-whatsapp">WhatsApp number</label><input id="booking-whatsapp" name="whatsapp" type="tel" autoComplete="tel" placeholder="If different from your phone" /></div>
    <div className="form-field"><label htmlFor="booking-puja">Puja or service *</label><select id="booking-puja" name="puja" defaultValue={selectedPuja?.slug || (presetPuja === "online-astrologer" ? presetPuja : "")} required><option value="" disabled>Choose a puja or service</option>{pujas.map((puja) => <option key={puja.id} value={puja.slug}>{puja.name}</option>)}{presetPuja === "online-astrologer" && <option value="online-astrologer">Online Astrologer Consultant</option>}</select></div>
    <div className="form-field"><label htmlFor="booking-location">Location *</label><input id="booking-location" name="location" autoComplete="address-level2" placeholder="Area, city or locality" required /></div>
    <div className="form-field"><label htmlFor="booking-date">Preferred date</label><input id="booking-date" name="preferredDate" type="date" /></div>
    <div className="form-field form-span"><label htmlFor="booking-message">Message</label><textarea id="booking-message" name="message" rows={4} maxLength={2000} defaultValue={presetRequirement} placeholder="Share any details that will help us assist you" /></div>
    <button className="button form-span" type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit enquiry"} <ArrowRight size={17} /></button>
    {errorMessage && <p className="form-error form-span" role="alert">{errorMessage}</p>}
    <p className="form-note form-span">Your request is not a confirmed booking. Our team will contact you to discuss availability.</p>
    <p className="form-note form-span"><Link href="/privacy">Read how enquiry information is handled.</Link></p>
  </form>;
}
