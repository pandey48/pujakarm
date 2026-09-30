export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/pujapath/" },
  { label: "Facebook", href: "https://www.facebook.com/pujapath/" },
  { label: "YouTube", href: "https://www.youtube.com/@pujapath" },
];
export const BRAND_NAME = "PujaPath";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.poojapath.com").replace(/\/+$/, "");
export const WHATSAPP_NUMBER = "917389368597";
export const CONTACT_PHONE = "+91 7389368597";
export const CONTACT_EMAIL = "namaste@pujapath.example";
export const SERVICE_AREAS = "Hyderabad, Bengaluru, Mumbai, Delhi and more";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
