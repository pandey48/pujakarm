import "server-only";
import type { EnquirySubmission } from "@/lib/enquiry-types";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzgWM7r0QHx0ImZ0BtAGcLfuIlXdx9ROE94tXIM1WTx4BU9XgU_4PZcMi33O0XgY199zw/exec";

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
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Google Apps Script did not accept the submission.") throw error;
  }
}