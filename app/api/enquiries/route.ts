import { createEnquiry } from "@/lib/enquiry-store";
import { notifyWhatsAppOfEnquiry } from "@/lib/whatsapp-notification";

export const runtime = "nodejs";

const asText = (value: unknown) => typeof value === "string" ? value.trim() : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Please check the enquiry details and try again." }, { status: 400 });
  }

  const name = asText(body.name);
  const phone = asText(body.phone);
  const email = asText(body.email);
  const puja = asText(body.puja);
  const pujaDate = asText(body.pujaDate);
  const preferredTime = asText(body.preferredTime);
  const city = asText(body.city);
  const location = asText(body.location);
  const bookingType = asText(body.bookingType);
  const languagePreference = asText(body.languagePreference);
  const traditionPreference = asText(body.traditionPreference);
  const gotra = asText(body.gotra);
  const additionalRequirement = asText(body.additionalRequirement);

  const parsedPujaDate = new Date(`${pujaDate}T00:00:00.000Z`);
  if (!name || name.length > 120 || phone.replace(/\D/g, "").length < 8 || phone.length > 24 || !puja || !/^\d{4}-\d{2}-\d{2}$/.test(pujaDate) || Number.isNaN(parsedPujaDate.getTime()) || parsedPujaDate.toISOString().slice(0, 10) !== pujaDate || !city || !["At Home", "Online"].includes(bookingType)) {
    return Response.json({ error: "Fill in your name, valid mobile number, puja, date, city and puja format." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if ([email, puja, city, location, languagePreference, traditionPreference, gotra, additionalRequirement].some((value) => value.length > 500)) {
    return Response.json({ error: "One or more fields are too long." }, { status: 400 });
  }

  try {
    const enquiry = await createEnquiry({ name, phone, email, puja, pujaDate, preferredTime, city, location, bookingType: bookingType as "At Home" | "Online", languagePreference, traditionPreference, gotra, additionalRequirement });
    const notification = await notifyWhatsAppOfEnquiry(enquiry);
    if (notification !== "sent") console.warn("WhatsApp enquiry notification status:", notification);
    return Response.json({ id: enquiry.id, createdAt: enquiry.createdAt }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "We could not save your enquiry right now. Please try again or contact our team." }, { status: 500 });
  }
}
