import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listEnquiries } from "@/lib/enquiry-store";

export const runtime = "nodejs";

export async function GET() {
  if (!await isAdminAuthenticated()) return Response.json({ error: "Sign in to view enquiries." }, { status: 401 });
  return Response.json({ enquiries: await listEnquiries() }, { headers: { "Cache-Control": "no-store" } });
}
