"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

const mobileContactNumber = "9243078181";
const internationalContactNumber = `+91${mobileContactNumber}`;
const bookingWhatsAppUrl = `https://wa.me/91${mobileContactNumber}?text=${encodeURIComponent("Namaste PujaPath, I would like to book a puja.")}`;

export function FixedBookingBar() {
  return <aside className="fixed-booking-bar is-visible" aria-label="Quick booking links">
    <Link className="fixed-booking-primary" href="/booking">Book a Puja <ArrowRight size={16} /></Link>
    <a className="fixed-booking-call" href={`tel:${internationalContactNumber}`} aria-label={`Call PujaPath at ${mobileContactNumber}`}>
      <Phone size={17} /><span>Call</span>
    </a>
    <a className="fixed-booking-whatsapp" href={bookingWhatsAppUrl} target="_blank" rel="noreferrer" aria-label={`Chat with PujaPath on WhatsApp at ${mobileContactNumber}`}>
      <MessageCircle size={18} /><span>WhatsApp</span><small>{mobileContactNumber}</small>
    </a>
  </aside>;
}
