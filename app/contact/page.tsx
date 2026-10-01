import { MapPin, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs, WhatsAppButton } from "@/components/shared";
import { ContactForm } from "@/components/interactions";
import { CONTACT_PHONE, SERVICE_AREAS, whatsappUrl } from "@/lib/constants";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({ title: "Contact", description: "Contact the PujaPath team with booking and service questions.", path: "/contact" });

export default function ContactPage() {
  return <><section className="page-intro"><div className="content-wrap"><Breadcrumbs items={[{ label: "Contact" }]} /><span className="eyebrow">We’re here to help</span><h1>Let’s talk about your puja</h1><p>Questions about a ceremony, a booking request, or joining as a Pandit? Send your details to our team on WhatsApp.</p></div></section><section className="section"><div className="content-wrap"><div className="contact-grid"><div className="contact-info"><div className="contact-row"><span><Phone size={18} /></span><div><h3>Call our team</h3><a href={`tel:${CONTACT_PHONE.replaceAll(" ", "")}`}>{CONTACT_PHONE}</a></div></div><div className="contact-row"><span><MessageCircle size={18} /></span><div><h3>WhatsApp</h3><a href={whatsappUrl("Namaste PujaPath, I have a question.")} target="_blank" rel="noreferrer">Message our team</a></div></div><div className="contact-row"><span><MapPin size={18} /></span><div><h3>Service areas</h3><p>{SERVICE_AREAS}</p></div></div><WhatsAppButton message="Namaste PujaPath, I have a question." label="Chat on WhatsApp" /></div><div className="info-panel"><h2>Send us a message</h2><ContactForm /></div></div></div></section></>;
}
