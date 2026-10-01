import { isAdminAuthenticated } from "@/lib/admin-auth";
import { ENQUIRY_STATUSES, getEnquiry, updateEnquiry, type EnquiryStatus } from "@/lib/enquiry-store";
import { getAdminEnquiry } from "@/lib/admin-enquiries";

export const runtime = "nodejs";

export async function GET(_request: Request, context: RouteContext<"/api/admin/enquiries/[id]">) {
  if (!await isAdminAuthenticated()) return Response.json({ error: "Sign in to view enquiries." }, { status: 401 });
  const { id } = await context.params;
  const enquiry = await getAdminEnquiry(id);
  if (!enquiry) return Response.json({ error: "Enquiry not found." }, { status: 404 });
  return Response.json({ enquiry }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: Request, context: RouteContext<"/api/admin/enquiries/[id]">) {
  if (!await isAdminAuthenticated()) return Response.json({ error: "Sign in to update enquiries." }, { status: 401 });
  const { id } = await context.params;
  let body: { status?: unknown; note?: unknown };
  try {
    body = await request.json() as { status?: unknown; note?: unknown };
  } catch {
    return Response.json({ error: "Invalid update." }, { status: 400 });
  }
  const status = typeof body.status === "string" && ENQUIRY_STATUSES.includes(body.status as EnquiryStatus) ? body.status as EnquiryStatus : undefined;
  const note = typeof body.note === "string" ? body.note.trim() : "";
  if (!status && !note) return Response.json({ error: "Choose a status or enter a note." }, { status: 400 });
  if (note.length > 2000) return Response.json({ error: "Notes must be shorter than 2,000 characters." }, { status: 400 });
  let localEnquiry = null;
  try {
    localEnquiry = await updateEnquiry(id, { status, note });
  } catch (error) {
    console.error("Local enquiry update failed:", error instanceof Error ? error.message : "Unknown error");
  }
  if (!localEnquiry && note) return Response.json({ error: "Internal notes could not be saved. Please try again." }, { status: 500 });

  if (!localEnquiry) {
    const existing = await getEnquiry(id).catch(() => null);
    if (!existing) return Response.json({ error: "Enquiry not found or could not be updated." }, { status: 404 });
  }
  return Response.json({ enquiry: localEnquiry || { id, status } }, { headers: { "Cache-Control": "no-store" } });
}
