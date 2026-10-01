import { randomUUID } from "node:crypto";
import { buildEnquiry, getEnquiry, saveEnquiry } from "@/lib/enquiry-store";
import type { EnquirySubmission } from "@/lib/enquiry-types";
import { submitToGoogleAppsScript } from "@/lib/google-apps-script";
import { notifyWhatsAppOfEnquiry } from "@/lib/whatsapp-notification";

export const runtime = "nodejs";

const asText = (value: unknown) => typeof value === "string" ? value.trim() : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid request body");
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Please check the enquiry details and try again." }, { status: 400 });
  }

  const name = asText(body.name);
  const phone = asText(body.phone);
  const whatsapp = asText(body.whatsapp);
  let payload: EnquirySubmission;
  let enquiryDetails: {
    puja: string; pujaDate: string; city: string; location: string; panditName: string;
    additionalRequirement: string; enquiryType: string; message: string; source: string;
  };

  if (body.type === "lead") {
    const puja = asText(body.puja);
    const location = asText(body.location);
    const preferredDate = asText(body.preferredDate);
    const message = asText(body.message);
    const parsedDate = preferredDate ? new Date(`${preferredDate}T00:00:00.000Z`) : null;
    if (!name || name.length > 120 || !phone || phone.length > 24 || phone.replace(/\D/g, "").length < 8 || !puja || !location || (preferredDate && (!parsedDate || Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== preferredDate))) {
      return Response.json({ error: "Please enter your name, a valid phone number, puja or service, and location." }, { status: 400 });
    }
    if ([whatsapp, puja, location, preferredDate, message].some((value) => value.length > 2000)) {
      return Response.json({ error: "One or more fields are too long." }, { status: 400 });
    }
    payload = { type: "lead", name, phone, whatsapp, puja, location, preferredDate, message };
    enquiryDetails = { puja, pujaDate: preferredDate, city: "", location, panditName: "", additionalRequirement: message, enquiryType: "Book Puja", message, source: "Website Lead Form" };
  } else if (body.type === "pandit") {
    const city = asText(body.city);
    const state = asText(body.state);
    const experience = asText(body.experience);
    const specialization = asText(body.specialization);
    const languages = asText(body.languages);
    const availability = asText(body.availability);
    const address = asText(body.address);
    if (!name || name.length > 120 || !phone || phone.length > 24 || phone.replace(/\D/g, "").length < 8 || !city || !state || !specialization) {
      return Response.json({ error: "Please complete your name, phone, city, state, and specialization." }, { status: 400 });
    }
    if ((experience && !/^\d+(\.\d+)?$/.test(experience)) || [whatsapp, city, state, experience, specialization, languages, availability, address].some((value) => value.length > 2000)) {
      return Response.json({ error: "Please check the registration details and try again." }, { status: 400 });
    }
    payload = { type: "pandit", name, phone, whatsapp, city, state, experience, specialization, languages, availability, address, idProofType: "", idProofNumber: "" };
    const message = [`City: ${city}`, `State: ${state}`, `Experience: ${experience || "Not provided"} years`, `Specialization: ${specialization}`, `Languages: ${languages || "Not provided"}`, `Availability: ${availability || "Not provided"}`, `Address: ${address || "Not provided"}`].join("\n");
    enquiryDetails = { puja: specialization, pujaDate: "", city, location: address, panditName: name, additionalRequirement: message, enquiryType: "Pandit Registration", message, source: "Pandit Registration Form" };
  } else {
    return Response.json({ error: "Please check the submission type and try again." }, { status: 400 });
  }

  const requestId = request.headers.get("Idempotency-Key")?.trim() || randomUUID();
  if (requestId.length > 200 || !/^[A-Za-z0-9._:-]+$/.test(requestId)) {
    return Response.json({ error: "Please refresh the form and try again." }, { status: 400 });
  }

  const enquiry = buildEnquiry({
    name, phone, whatsapp,
    puja: enquiryDetails.puja, panditName: enquiryDetails.panditName, pujaDate: enquiryDetails.pujaDate,
    preferredTime: "", city: enquiryDetails.city, location: enquiryDetails.location, bookingType: "",
    languagePreference: "", traditionPreference: "", gotra: "", additionalRequirement: enquiryDetails.additionalRequirement,
    enquiryType: enquiryDetails.enquiryType, message: enquiryDetails.message, source: enquiryDetails.source,
  }, requestId);
  const existing = await getEnquiry(enquiry.id).catch(() => null);
  if (existing) return Response.json({ id: existing.id, createdAt: existing.createdAt, duplicate: true }, { headers: { "Cache-Control": "no-store" } });

  try {
    await submitToGoogleAppsScript(payload);
  } catch (error) {
    console.error("Google Apps Script submission failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "We could not submit your details right now. Please try again." }, { status: 502 });
  }

  try {
    await saveEnquiry(enquiry);
  } catch (error) {
    console.error("Enquiry backup storage failed:", error instanceof Error ? error.message : "Unknown error");
  }

  {
    const notification = await notifyWhatsAppOfEnquiry(enquiry);
    if (notification !== "sent") console.warn("WhatsApp enquiry notification status:", notification);
  }

  return Response.json({
    id: enquiry.id,
    createdAt: enquiry.createdAt,
    message: payload.type === "lead"
      ? "Thank you! Your enquiry has been submitted successfully. We will contact you soon."
      : "Thank you! Your registration has been submitted successfully. We will review your details and contact you soon.",
  }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
