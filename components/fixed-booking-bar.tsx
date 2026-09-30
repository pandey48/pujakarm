"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { CONTACT_PHONE, whatsappUrl } from "@/lib/constants";

export function FixedBookingBar() {
  return <aside className="fixed-booking-bar is-visible" aria-label="Quick booking links">
    <Link className="fixed-booking-primary" href="/booking">Book a Puja <ArrowRight size={16} /></Link>
    <a className="fixed-booking-call" href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} aria-label="Call PujaPath at 7389368597">
      <Phone size={17} /><span>Call</span>
    </a>
    <a className="fixed-booking-whatsapp" href={whatsappUrl("Namaste PujaPath, I would like to book a puja.")} target="_blank" rel="noreferrer" aria-label="Chat with PujaPath on WhatsApp at 7389368597">
      <MessageCircle size={18} /><span>WhatsApp</span><small>7389368597</small>
    </a>
  </aside>;
}
