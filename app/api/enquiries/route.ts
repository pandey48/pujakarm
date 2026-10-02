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

  if (body.type === "pandit") {
    const name = asText(body.name);
    const phone = asText(body.phone);
    const whatsapp = asText(body.whatsapp);
    const city = asText(body.city);
    const state = asText(body.state);
    const language = asText(body.language);
    const services = asText(body.services);
    const experience = asText(body.experience);
    const isValidMobile = (value: string) => /^(?:\+?91[ -]?)?[6-9]\d{9}$/.test(value);
    const experienceYears = Number(experience);

    if (!name || name.length > 120 || !isValidMobile(phone) || !isValidMobile(whatsapp) || !city || !state || !language || !services || !experience) {
      return Response.json({ error: "Please complete all required fields and enter valid Indian mobile numbers." }, { status: 400 });
    }
    if (city.length > 120 || state.length > 80 || language.length > 500 || services.length > 1000 || !/^\d+(?:\.\d{1,2})?$/.test(experience) || !Number.isFinite(experienceYears) || experienceYears > 80) {
      return Response.json({ error: "Please check the registration details and try again." }, { status: 400 });
    }

    try {
      await submitToGoogleAppsScript({ type: "pandit", name, phone, whatsapp, city, state, language, services, experience });
    } catch (error) {
      console.error("Google Apps Script Pandit registration failed:", error instanceof Error ? error.message : "Unknown error");
      return Response.json({ error: "We could not save your registration right now. Please try again shortly." }, { status: 503, headers: { "Cache-Control": "no-store" } });
    }

    return Response.json({ message: "Thank you! Your registration has been submitted successfully. We will review your details and contact you soon." }, { status: 201, headers: { "Cache-Control": "no-store" } });
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
  let savedEnquiry = await getEnquiry(enquiry.id).catch((error) => {
    console.warn("Enquiry backup lookup failed:", error instanceof Error ? error.message : "Unknown error");
    return null;
  });
  const isNewEnquiry = !savedEnquiry;
  if (!savedEnquiry) {
    try {
      const saved = await saveEnquiry(enquiry);
      savedEnquiry = saved.enquiry;
    } catch (error) {
      console.error("Enquiry backup storage failed:", error instanceof Error ? error.message : "Unknown error");
    }
  }

  let sheetsSynced = true;
  try {
    await submitToGoogleAppsScript(payload);
  } catch (error) {
    console.error("Google Apps Script submission failed:", error instanceof Error ? error.message : "Unknown error");
    sheetsSynced = false;
  }

  if (!savedEnquiry && !sheetsSynced) {
    return Response.json({ error: "We could not save your enquiry right now. Please try again." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }

  if (isNewEnquiry) {
    const notification = await notifyWhatsAppOfEnquiry(savedEnquiry || enquiry);
    if (notification !== "sent") console.warn("WhatsApp enquiry notification status:", notification);
  }

  return Response.json({
    ...(savedEnquiry ? { id: savedEnquiry.id, createdAt: savedEnquiry.createdAt } : {}),
    sheetsSynced,
    message: payload.type === "lead"
      ? "Thank you! Your enquiry has been submitted successfully. We will contact you soon."
      : "Thank you! Your registration has been submitted successfully. We will review your details and contact you soon.",
  }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
