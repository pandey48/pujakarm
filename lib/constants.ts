export const BRAND_NAME = "PujaPath";
export const SITE_URL = "https://pujapath.example";
export const WHATSAPP_NUMBER = "919999999999";
export const CONTACT_PHONE = "+91 98765 43210";
export const CONTACT_EMAIL = "namaste@pujapath.example";
export const SERVICE_AREAS = "Hyderabad, Bengaluru, Mumbai, Delhi and more";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}