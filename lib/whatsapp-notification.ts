import type { PujaEnquiry } from "@/lib/enquiry-store";
import { WHATSAPP_NUMBER } from "@/lib/constants";

type NotificationResult = "sent" | "not_configured" | "failed";

export async function notifyWhatsAppOfEnquiry(enquiry: PujaEnquiry): Promise<NotificationResult> {
  const { WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_TEMPLATE_NAME, WHATSAPP_GRAPH_API_VERSION } = process.env;
  const notifyTo = process.env.WHATSAPP_NOTIFY_TO || WHATSAPP_NUMBER;
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_TEMPLATE_NAME || !WHATSAPP_GRAPH_API_VERSION) {
    return "not_configured";
  }

  const details = [
    `Enquiry: ${enquiry.id}`,
    `Name: ${enquiry.name}`,
    `Mobile: ${enquiry.phone}`,
    `Email: ${enquiry.email || "Not provided"}`,
    `Puja: ${enquiry.puja}`,
    `Date: ${enquiry.pujaDate}`,
    `Time: ${enquiry.preferredTime || "Any suitable time"}`,
    `City: ${enquiry.city}`,
    `Area: ${enquiry.location || "Not provided"}`,
    `Format: ${enquiry.bookingType}`,
    `Language: ${enquiry.languagePreference || "No preference"}`,
    `Tradition: ${enquiry.traditionPreference || "Any tradition"}`,
    `Gotra: ${enquiry.gotra || "Not provided"}`,
    `Requirements: ${enquiry.additionalRequirement || "None"}`,
  ].join("\n").slice(0, 1024);

  try {
    const recipient = notifyTo.replace(/\D/g, "");
    const apiVersion = WHATSAPP_GRAPH_API_VERSION.toLowerCase().startsWith("v") ? WHATSAPP_GRAPH_API_VERSION : `v${WHATSAPP_GRAPH_API_VERSION}`;
    const response = await fetch(`https://graph.facebook.com/${apiVersion}/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: "template",
        template: {
          name: WHATSAPP_TEMPLATE_NAME,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en" },
          components: [{ type: "body", parameters: [{ type: "text", text: details }] }],
        },
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("WhatsApp enquiry notification failed with status", response.status);
      return "failed";
    }
    return "sent";
  } catch {
    console.error("WhatsApp enquiry notification request failed.");
    return "failed";
  }
}
