"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";
import { submitWebsiteEnquiry } from "@/components/enquiry-client";
import { whatsappUrl } from "@/lib/constants";

export function BookingForm({ presetPuja = "", presetRequirement = "", presetLocation = "", presetDate = "", presetFormat = "" }: { presetPuja?: string; presetRequirement?: string; presetLocation?: string; presetDate?: string; presetFormat?: string }) {
  const selectedPuja = pujas.find((puja) => puja.slug === presetPuja);
  const initialPuja = selectedPuja?.name || (presetPuja === "online-astrologer" ? "Online Astrologer Consultant" : "");
  const [pujaChoice, setPujaChoice] = useState(initialPuja);
  const [otherPuja, setOtherPuja] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submitLock = useRef(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedWhatsAppMessage, setSubmittedWhatsAppMessage] = useState("");
  const preferredDateInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const localDate = new Date();
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    if (preferredDateInput.current) preferredDateInput.current.min = localDate.toISOString().slice(0, 10);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current) return;
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const selectedPujaName = String(form.get("puja") || "").trim();
    const pujaName = selectedPujaName.toLowerCase() === "other"
      ? String(form.get("otherPuja") || "").trim()
      : selectedPujaName;
    const phone = String(form.get("phone") || "");
    const format = String(form.get("format") || "");
    const language = String(form.get("language") || "");
    const additionalMessage = String(form.get("message") || "").trim();
    const message = [
      format ? `Preferred format: ${format}` : "",
      language ? `Language preference: ${language}` : "",
      additionalMessage,
    ].filter(Boolean).join("\n");
    const name = String(form.get("name") || "").trim();
    submitLock.current = true;
    setSubmitting(true);
    setErrorMessage("");
    try {
      await submitWebsiteEnquiry(`booking:${presetPuja || "general"}`, {
        type: "lead",
        name,
        phone,
        whatsapp: phone,
        puja: pujaName,
        location: String(form.get("location") || ""),
        preferredDate: String(form.get("preferredDate") || ""),
        message,
      });
      formElement.reset();
      setPujaChoice("");
      setOtherPuja("");
      setSubmittedWhatsAppMessage(`Namaste PujaPath, I have submitted an enquiry for ${pujaName}. My phone number is ${phone}. ${message}`);
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not submit your enquiry. Please try again.");
    } finally {
      submitLock.current = false;
      setSubmitting(false);
    }
  }

  const currentPuja = pujas.find((puja) => puja.name.toLowerCase() === pujaChoice.trim().toLowerCase());
  const supportsHome = currentPuja?.type === "Home" || currentPuja?.type === "Home & Online";
  const supportsOnline = currentPuja?.type === "Online" || currentPuja?.type === "Home & Online";

  if (submitted) return <div className="submit-modal-backdrop">
    <section className="submit-success-modal" role="alertdialog" aria-modal="true" aria-labelledby="submit-success-title" aria-describedby="submit-success-description">
      <span className="submit-success-icon"><CheckCircle2 size={30} /></span>
      <h2 id="submit-success-title">Jay Shree Ram 🙏</h2>
      <p id="submit-success-description">Thank you. Your puja enquiry has been received. Our team will contact you to discuss Pandit availability and the details you shared.</p>
      <a className="button" href={whatsappUrl(submittedWhatsAppMessage)} target="_blank" rel="noreferrer">Continue on WhatsApp</a>
      <Link className="button" href="/" autoFocus>Back to home <ArrowRight size={17} /></Link>
    </section>
  </div>;

  return <form className="form-grid booking-form" onSubmit={submit} aria-busy={submitting}>
    <div className="booking-form-heading form-span"><span>1. Puja details</span><p>Tell us what you need and where you would like the puja.</p></div>
    <div className="form-field"><label htmlFor="booking-puja">Search or choose a puja/service *</label><input id="booking-puja" name="puja" list="booking-puja-options" value={pujaChoice} onChange={(event) => setPujaChoice(event.target.value)} autoComplete="off" placeholder="Type to search pujas or services" maxLength={120} required /><datalist id="booking-puja-options">{pujas.map((puja) => <option key={puja.id} value={puja.name} />)}{presetPuja === "online-astrologer" && <option value="Online Astrologer Consultant" />}<option value="Other" /></datalist></div>
    {pujaChoice.trim().toLowerCase() === "other" && <div className="form-field"><label htmlFor="booking-other-puja">Please specify *</label><input id="booking-other-puja" name="otherPuja" value={otherPuja} onChange={(event) => setOtherPuja(event.target.value)} maxLength={120} required /></div>}
    <div className="form-field"><label htmlFor="booking-location">City and locality *</label><input id="booking-location" name="location" list="booking-location-options" autoComplete="address-level2" placeholder="For example, Madhapur, Hyderabad" defaultValue={presetLocation} maxLength={2000} required /><datalist id="booking-location-options">{cities.map((city) => <option key={city.id} value={city.name} />)}{cities.flatMap((city) => city.areas.map((area) => <option key={`${city.id}-${area}`} value={`${area}, ${city.name}`} />))}</datalist><small>Start typing a city or area, or add a different location.</small></div>
    <div className="form-field"><label htmlFor="booking-date">Preferred date <span className="booking-optional">(optional)</span></label><input ref={preferredDateInput} id="booking-date" name="preferredDate" type="date" defaultValue={presetDate} /><small>Past dates can’t be selected. Availability is confirmed by the team.</small></div>
    <div className="form-field"><label htmlFor="booking-format">Preferred format <span className="booking-optional">(optional)</span></label><select id="booking-format" name="format" defaultValue={(presetFormat === "At Home" && supportsHome) || (presetFormat === "Online" && supportsOnline) ? presetFormat : ""}><option value="">Discuss with the team</option>{supportsHome && <option value="At Home">At Home</option>}{supportsOnline && <option value="Online">Online</option>}</select><small>Format options reflect the selected puja listing. The team confirms arrangements.</small></div>
    <div className="form-field"><label htmlFor="booking-language">Preferred language <span className="booking-optional">(optional)</span></label><select id="booking-language" name="language" defaultValue=""><option value="">No preference</option><option>Hindi</option><option>Sanskrit</option><option>English</option><option>Marathi</option><option>Gujarati</option><option>Other</option></select></div>
    <div className="booking-form-heading form-span"><span>2. Your contact details</span><p>We’ll use these details to follow up about your enquiry.</p></div>
    <div className="form-field"><label htmlFor="booking-name">Full name *</label><input id="booking-name" name="name" autoComplete="name" placeholder="Your name" maxLength={120} required /></div>
    <div className="form-field"><label htmlFor="booking-phone">Mobile number *</label><input id="booking-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="(?:[0-9+]|\(|\)| |-){8,18}" placeholder="+91 98765 43210" maxLength={24} aria-describedby="booking-phone-help" required /><small id="booking-phone-help">Include your country code if you’re outside India.</small></div>
    <div className="form-field form-span"><label htmlFor="booking-message">Anything else we should know? <span className="booking-optional">(optional)</span></label><textarea id="booking-message" name="message" rows={4} maxLength={1600} defaultValue={presetRequirement} placeholder="Share your preferred tradition, timing or preparation questions" /><small>Up to 1,600 characters.</small></div>
    <button className="button form-span" type="submit" disabled={submitting}>{submitting ? "Submitting your enquiry..." : "Submit enquiry"} <ArrowRight size={17} /></button>
    {errorMessage && <p className="form-error form-span" role="alert">{errorMessage}</p>}
    <p className="form-note form-span">Your request is not a confirmed booking. Our team will contact you to discuss availability.</p>
    <p className="form-note form-span"><Link href="/privacy">Read how enquiry information is handled.</Link></p>
  </form>;
}
