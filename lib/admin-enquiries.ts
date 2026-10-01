import "server-only";
import { getEnquiry, listEnquiries, type PujaEnquiry } from "@/lib/enquiry-store";

export async function listAdminEnquiries() {
  try {
    return await listEnquiries();
  } catch (error) {
    console.error("Local enquiry backup could not be read:", error instanceof Error ? error.message : "Unknown error");
    return [] as PujaEnquiry[];
  }
}

export async function getAdminEnquiry(id: string) {
  try {
    const local = await getEnquiry(id);
    if (local) return local;
  } catch (error) {
    console.error("Local enquiry lookup failed:", error instanceof Error ? error.message : "Unknown error");
  }
  return null;
}
