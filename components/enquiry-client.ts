import type { EnquirySubmission } from "@/lib/enquiry-types";

export type EnquiryResponse = { id?: string; message?: string; error?: string; sheetsSynced?: boolean };

function sessionKey(scope: string) {
  return `pujakarm-enquiry:${scope}`;
}

export function getEnquiryRequestId(scope: string) {
  const key = sessionKey(scope);
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
  } catch {
    // Continue with an in-memory request ID when session storage is unavailable.
  }
  const requestId = crypto.randomUUID();
  try { sessionStorage.setItem(key, requestId); } catch { /* Storage may be disabled by the browser. */ }
  return requestId;
}

export function clearEnquiryRequestId(scope: string) {
  try { sessionStorage.removeItem(sessionKey(scope)); } catch { /* Nothing to clear when storage is unavailable. */ }
}

export async function submitWebsiteEnquiry(scope: string, payload: EnquirySubmission) {
  const response = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": getEnquiryRequestId(scope) },
    body: JSON.stringify(payload),
  });
  const result = await response.json() as EnquiryResponse;
  if (!response.ok) throw new Error(result.error || "We could not submit your enquiry. Please try again.");
  clearEnquiryRequestId(scope);
  return result;
}
