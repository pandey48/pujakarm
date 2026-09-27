import { whatsappUrl } from "@/lib/constants";

export function createBookingMessage(values: {
  name?: string;
  puja?: string;
  city?: string;
  date?: string;
  time?: string;
}) {
  return whatsappUrl(
    `Namaste PujaPath, I would like to book ${values.puja || "a puja"}.\nName: ${values.name || ""}\nCity: ${values.city || ""}\nPreferred Date: ${values.date || ""}\nPreferred Time: ${values.time || ""}`,
  );
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}