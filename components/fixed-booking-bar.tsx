"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Grid2X2, House, MessageCircle, Phone } from "lucide-react";
import { CONTACT_PHONE, whatsappUrl } from "@/lib/constants";

const bookingWhatsAppUrl = whatsappUrl("Namaste PujaPath, I would like to book a puja.");

export function FixedBookingBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const homeHero = document.querySelector(".home-hero");
      const shouldShow = homeHero
        ? homeHero.getBoundingClientRect().bottom <= 0
        : window.scrollY > 180;
      setIsVisible(shouldShow);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [pathname]);

  return <aside className={`fixed-booking-bar${isVisible ? " is-visible" : ""}`} aria-label="Quick booking links">
    <Link className="fixed-booking-item" href="/" aria-label="Home">
      <House size={18} /><span>Home</span>
    </Link>
    <Link className="fixed-booking-item" href="/pujas" aria-label="Browse pujas">
      <Grid2X2 size={18} /><span>Pujas</span>
    </Link>
    <Link className="fixed-booking-item fixed-booking-primary" href="/booking" aria-label="Book a puja">
      <CalendarDays size={18} /><span>Book</span>
    </Link>
    <a className="fixed-booking-item fixed-booking-whatsapp" href={bookingWhatsAppUrl} target="_blank" rel="noreferrer" aria-label={`Chat with PujaPath on WhatsApp at ${CONTACT_PHONE}`}>
      <MessageCircle size={18} /><span>WhatsApp</span>
    </a>
    <a className="fixed-booking-item fixed-booking-call" href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} aria-label={`Call PujaPath at ${CONTACT_PHONE}`}>
      <Phone size={17} /><span>Call</span>
    </a>
  </aside>;
}
