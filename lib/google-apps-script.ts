import "server-only";
import type { EnquirySubmission } from "@/lib/enquiry-types";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwGI08ctHoiSYF0Yd7G2T6rhQ8Pcw5JIh6qld6v0fddMxc-vWqzsh5o3hrlEQz6FQJBeA/exec";

export async function submitToGoogleAppsScript(payload: EnquirySubmission) {
  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  const responseText = await response.text();
  if (!response.ok || responseText.trimStart().startsWith("<!DOCTYPE html")) {
    throw new Error("Google Apps Script did not accept the submission.");
  }

  try {
    const result: unknown = JSON.parse(responseText);
    if (result && typeof result === "object") {
      const data = result as { success?: unknown; status?: unknown; error?: unknown };
      if (data.success === false || data.status === "error" || typeof data.error === "string") {
        throw new Error("Google Apps Script did not accept the submission.");
      }
      if (payload.type === "pandit" && data.success !== true) {
        throw new Error("Google Apps Script did not confirm the registration.");
      }
    } else if (payload.type === "pandit") {
      throw new Error("Google Apps Script did not confirm the registration.");
    }
  } catch (error) {
    if (payload.type === "pandit" || (error instanceof Error && error.message === "Google Apps Script did not accept the submission.")) throw error;
  }
}