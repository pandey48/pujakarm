"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { CONTACT_PHONE, whatsappUrl } from "@/lib/constants";

const bookingWhatsAppUrl = whatsappUrl("Namaste PujaPath, I would like to book a puja.");

export function FixedBookingBar() {
  return <aside className="fixed-booking-bar is-visible" aria-label="Quick booking links">
    <Link className="fixed-booking-primary" href="/booking">Book a Puja <ArrowRight size={16} /></Link>
    <a className="fixed-booking-call" href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} aria-label={`Call PujaPath at ${CONTACT_PHONE}`}>
      <Phone size={17} /><span>Call</span>
    </a>
    <a className="fixed-booking-whatsapp" href={bookingWhatsAppUrl} target="_blank" rel="noreferrer" aria-label={`Chat with PujaPath on WhatsApp at ${CONTACT_PHONE}`}>
      <MessageCircle size={18} /><span>WhatsApp</span><small>{CONTACT_PHONE}</small>
    </a>
  </aside>;
}
