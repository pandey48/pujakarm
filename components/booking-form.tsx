"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { bookingCities, findBookingCity, preferredLanguages } from "@/data/cities";
import { pujas } from "@/data/pujas";
import { submitWebsiteEnquiry } from "@/components/enquiry-client";
import { whatsappUrl } from "@/lib/constants";

export function BookingForm({ presetPuja = "", presetRequirement = "", presetLocation = "", presetDate = "", presetFormat = "", idPrefix = "booking" }: { presetPuja?: string; presetRequirement?: string; presetLocation?: string; presetDate?: string; presetFormat?: string; idPrefix?: string }) {
  const locationParts = presetLocation.split(",").map((part) => part.trim()).filter(Boolean);
  const presetCity = [...locationParts].reverse().find((part) => findBookingCity(part)) || "";
  const initialCity = presetCity || (locationParts.length === 1 ? locationParts[0] : "");
  const initialArea = presetCity
    ? locationParts.filter((part) => part.toLowerCase() !== presetCity.toLowerCase()).join(", ")
    : locationParts.length > 1
      ? locationParts.slice(0, -1).join(", ")
      : "";
  const initialCityData = findBookingCity(initialCity);
  const initialAreaOption = initialCityData?.areas.find((area) => area.toLowerCase() === initialArea.toLowerCase()) || "";
  const selectedPuja = pujas.find((puja) => puja.slug === presetPuja);
  const initialPuja = selectedPuja?.name || (presetPuja === "online-astrologer" ? "Online Astrologer Consultant" : "");
  const [pujaChoice, setPujaChoice] = useState(initialPuja);
  const [otherPuja, setOtherPuja] = useState("");
  const [city, setCity] = useState(initialCity);
  const [areaChoice, setAreaChoice] = useState(initialAreaOption || (initialArea ? "Other Area" : ""));
  const [otherArea, setOtherArea] = useState(initialAreaOption ? "" : initialArea);
  const [language, setLanguage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submitLock = useRef(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedWhatsAppMessage, setSubmittedWhatsAppMessage] = useState("");
  const preferredDateInput = useRef<HTMLInputElement>(null);
  const languageInput = useRef<HTMLInputElement>(null);
  const fieldId = (name: string) => `${idPrefix}-${name}`;
  const listId = (name: string) => `${idPrefix}-${name}-options`;

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
    const cityName = findBookingCity(String(form.get("city") || ""))?.name || String(form.get("city") || "").trim();
    const areaSelection = String(form.get("area") || "");
    const areaName = areaSelection === "Other Area"
      ? String(form.get("otherArea") || "").trim()
      : areaSelection.trim();
    const format = String(form.get("format") || "");
    const preferredLanguage = String(form.get("language") || "").trim();
    const normalizedLanguage = preferredLanguages.find((item) => item.toLowerCase() === preferredLanguage.toLowerCase()) || "";
    if (preferredLanguage && !normalizedLanguage) {
      languageInput.current?.setCustomValidity("Choose a language from the suggested options.");
      languageInput.current?.reportValidity();
      return;
    }
    languageInput.current?.setCustomValidity("");
    const additionalMessage = String(form.get("message") || "").trim();
    const message = [
      format ? `Preferred format: ${format}` : "",
      normalizedLanguage ? `Language preference: ${normalizedLanguage}` : "",
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
        city: cityName,
        area: areaName,
        preferredLanguage: normalizedLanguage,
        location: [areaName, cityName].filter(Boolean).join(", "),
        preferredDate: String(form.get("preferredDate") || ""),
        message,
      });
      formElement.reset();
      setPujaChoice("");
      setOtherPuja("");
      setCity("");
      setAreaChoice("");
      setOtherArea("");
      setLanguage("");
      setSubmittedWhatsAppMessage([
        "Namaste PujaPath, I would like to enquire about a puja.",
        `Puja/Service: ${pujaName}`,
        `City: ${cityName}`,
        `Area/Locality: ${areaName}`,
        `Preferred language: ${normalizedLanguage || "No preference"}`,
        `Mobile: ${phone}`,
        "",
        "This is an enquiry only; the booking is not confirmed.",
        additionalMessage ? `Other details: ${additionalMessage}` : "",
      ].filter(Boolean).join("\n"));
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
  const selectedCity = findBookingCity(city);
  const preferredLanguageOptions = selectedCity?.serviceAvailability === "verified" && selectedCity.supportedLanguages?.length
    ? preferredLanguages.filter((item) => selectedCity.supportedLanguages?.some((language) => language.toLowerCase() === item.toLowerCase()))
    : preferredLanguages;

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
    <div className="form-field"><label htmlFor={fieldId("puja")}>Search or choose a puja/service *</label><input id={fieldId("puja")} name="puja" list={listId("puja")} value={pujaChoice} onChange={(event) => setPujaChoice(event.target.value)} autoComplete="off" placeholder="Type to search pujas or services" maxLength={120} required /><datalist id={listId("puja")}>{pujas.map((puja) => <option key={puja.id} value={puja.name} />)}{presetPuja === "online-astrologer" && <option value="Online Astrologer Consultant" />}<option value="Other" /></datalist></div>
    {pujaChoice.trim().toLowerCase() === "other" && <div className="form-field"><label htmlFor={fieldId("other-puja")}>Please specify *</label><input id={fieldId("other-puja")} name="otherPuja" value={otherPuja} onChange={(event) => setOtherPuja(event.target.value)} maxLength={120} required /></div>}
    <div className="form-field"><label htmlFor={fieldId("city")}>City *</label><input id={fieldId("city")} name="city" list={listId("city")} autoComplete="address-level2" placeholder="Search or enter a city" value={city} onChange={(event) => { setCity(event.target.value); setAreaChoice(""); setOtherArea(""); }} maxLength={120} required /><datalist id={listId("city")}>{bookingCities.map((item) => <option key={item.name} value={item.name} />)}</datalist><small>Choose a suggestion or enter another city. Suggestions do not indicate service availability.</small></div>
    {selectedCity ? <div className="form-field"><label htmlFor={fieldId("area")}>Area / locality *</label><select id={fieldId("area")} name="area" value={areaChoice} onChange={(event) => { setAreaChoice(event.target.value); if (event.target.value !== "Other Area") setOtherArea(""); }} required><option value="">Choose an area</option>{selectedCity.areas.map((area) => <option key={area} value={area}>{area}</option>)}<option value="Other Area">Other Area</option></select>{areaChoice === "Other Area" && <input aria-label="Enter your area or locality" name="otherArea" value={otherArea} onChange={(event) => setOtherArea(event.target.value)} placeholder="Enter your area or locality" maxLength={120} required />}<small>Localities are enquiry options only; the team will confirm availability.</small></div> : <div className="form-field"><label htmlFor={fieldId("area")}>Area / locality *</label><input id={fieldId("area")} name="area" autoComplete="address-level3" placeholder={city.trim() ? "Enter your area or locality" : "Choose or enter a city first"} value={otherArea} onChange={(event) => setOtherArea(event.target.value)} maxLength={120} required disabled={!city.trim()} /><small>Enter the area for your city. The team will confirm availability.</small></div>}
    <div className="form-field"><label htmlFor={fieldId("date")}>Preferred date <span className="booking-optional">(optional)</span></label><input ref={preferredDateInput} id={fieldId("date")} name="preferredDate" type="date" defaultValue={presetDate} /><small>Past dates can’t be selected. Availability is confirmed by the team.</small></div>
    <div className="form-field"><label htmlFor={fieldId("format")}>Preferred format <span className="booking-optional">(optional)</span></label><select id={fieldId("format")} name="format" defaultValue={(presetFormat === "At Home" && supportsHome) || (presetFormat === "Online" && supportsOnline) ? presetFormat : ""}><option value="">Discuss with the team</option>{supportsHome && <option value="At Home">At Home</option>}{supportsOnline && <option value="Online">Online</option>}</select><small>Format options reflect the selected puja listing. The team confirms arrangements.</small></div>
    <div className="form-field"><label htmlFor={fieldId("language")}>Preferred language <span className="booking-optional">(optional)</span></label><input ref={languageInput} id={fieldId("language")} name="language" list={listId("language")} autoComplete="off" placeholder="Search or choose a language" value={language} onChange={(event) => { setLanguage(event.target.value); languageInput.current?.setCustomValidity(""); }} maxLength={40} /><datalist id={listId("language")}>{preferredLanguageOptions.map((item) => <option key={item} value={item} />)}</datalist><small>Language preference is recorded for your enquiry; availability is confirmed by the team.</small></div>
    <div className="booking-form-heading form-span"><span>2. Your contact details</span><p>We’ll use these details to follow up about your enquiry.</p></div>
    <div className="form-field"><label htmlFor={fieldId("name")}>Full name *</label><input id={fieldId("name")} name="name" autoComplete="name" placeholder="Your name" maxLength={120} required /></div>
    <div className="form-field"><label htmlFor={fieldId("phone")}>Mobile number *</label><input id={fieldId("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="(?:[0-9+]|\(|\)| |-){8,18}" placeholder="+91 98765 43210" maxLength={24} aria-describedby={fieldId("phone-help")} required /><small id={fieldId("phone-help")}>Include your country code if you’re outside India.</small></div>
    <div className="form-field form-span"><label htmlFor={fieldId("message")}>Anything else we should know? <span className="booking-optional">(optional)</span></label><textarea id={fieldId("message")} name="message" rows={4} maxLength={1600} defaultValue={presetRequirement} placeholder="Share your preferred tradition, timing or preparation questions" /><small>Up to 1,600 characters.</small></div>
    <button className="button form-span" type="submit" disabled={submitting}>{submitting ? "Submitting your enquiry..." : "Submit enquiry"} <ArrowRight size={17} /></button>
    {errorMessage && <p className="form-error form-span" role="alert">{errorMessage}</p>}
    <p className="form-note form-span">Your request is not a confirmed booking. Our team will contact you to discuss availability.</p>
    <p className="form-note form-span"><Link href="/privacy">Read how enquiry information is handled.</Link></p>
  </form>;
}
