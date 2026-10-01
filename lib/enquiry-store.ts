import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ENQUIRY_STATUSES, type EnquiryStatus } from "@/lib/enquiry-types";
export { ENQUIRY_STATUSES } from "@/lib/enquiry-types";
export type { EnquiryStatus } from "@/lib/enquiry-types";

export type PujaEnquiry = {
  id: string;
  requestId?: string;
  name: string;
  phone: string;
  whatsapp: string;
  puja: string;
  panditName: string;
  pujaDate: string;
  preferredTime: string;
  city: string;
  location: string;
  bookingType: "At Home" | "Online" | "";
  languagePreference: string;
  traditionPreference: string;
  gotra: string;
  additionalRequirement: string;
  enquiryType: string;
  message: string;
  source: string;
  status: EnquiryStatus;
  notes: string[];
  createdAt: string;
  updatedAt: string;
};

const dataDirectory = process.env.PUJAPATH_DATA_DIR || join(process.cwd(), ".data");
const enquiriesFile = join(dataDirectory, "enquiries.json");
let writeQueue: Promise<unknown> = Promise.resolve();

function normalizeStatus(status: unknown): EnquiryStatus {
  if (ENQUIRY_STATUSES.includes(status as EnquiryStatus)) return status as EnquiryStatus;
  if (status === "Quoted" || status === "Confirmed") return status === "Confirmed" ? "Booked" : "Follow-up";
  if (status === "Cancelled") return "Not Interested";
  return "New";
}

async function readAll(): Promise<PujaEnquiry[]> {
  try {
    const raw = await readFile(enquiriesFile, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((value) => {
      const item = value as Record<string, unknown>;
      const text = (key: string) => typeof item[key] === "string" ? item[key] as string : "";
      return {
        id: text("id"), requestId: text("requestId") || undefined, name: text("name"), phone: text("phone"), whatsapp: text("whatsapp"),
        puja: text("puja"), panditName: text("panditName"), pujaDate: text("pujaDate"), preferredTime: text("preferredTime"), city: text("city"),
        location: text("location"), bookingType: ["At Home", "Online"].includes(text("bookingType")) ? text("bookingType") as "At Home" | "Online" : "",
        languagePreference: text("languagePreference"), traditionPreference: text("traditionPreference"), gotra: text("gotra"),
        additionalRequirement: text("additionalRequirement"), enquiryType: text("enquiryType") || "Book Puja",
        message: text("message") || text("additionalRequirement"), source: text("source") || "Website", status: normalizeStatus(item.status),
        notes: Array.isArray(item.notes) ? item.notes.filter((note): note is string => typeof note === "string") : [],
        createdAt: text("createdAt"), updatedAt: text("updatedAt"),
      } satisfies PujaEnquiry;
    }) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeAll(records: PujaEnquiry[]) {
  await mkdir(dataDirectory, { recursive: true, mode: 0o700 });
  const temporary = `${enquiriesFile}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporary, JSON.stringify(records, null, 2), { encoding: "utf8", mode: 0o600 });
  await rename(temporary, enquiriesFile);
}

function serializeWrite<T>(job: () => Promise<T>): Promise<T> {
  const task = writeQueue.then(job, job);
  writeQueue = task.then(() => undefined, () => undefined);
  return task;
}

export async function listEnquiries() {
  return (await readAll()).sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function getEnquiry(id: string) {
  return (await readAll()).find((item) => item.id === id) ?? null;
}

export type NewEnquiry = Omit<PujaEnquiry, "id" | "status" | "notes" | "createdAt" | "updatedAt" | "requestId">;

export function buildEnquiry(input: NewEnquiry, requestId: string): PujaEnquiry {
  const createdAt = new Date().toISOString();
  const suffix = createHash("sha256").update(requestId).digest("hex").slice(0, 16).toUpperCase();
  return { ...input, id: `PUJA-${suffix}`, requestId, status: "New", notes: [], createdAt, updatedAt: createdAt };
}

export async function saveEnquiry(enquiry: PujaEnquiry): Promise<{ enquiry: PujaEnquiry; duplicate: boolean }> {
  return serializeWrite(async () => {
    const all = await readAll();
    const existing = all.find((item) => item.id === enquiry.id || (item.requestId && item.requestId === enquiry.requestId));
    if (existing) return { enquiry: existing, duplicate: true };
    await writeAll([...all, enquiry]);
    return { enquiry, duplicate: false };
  });
}

export async function updateEnquiry(id: string, update: { status?: EnquiryStatus; note?: string }) {
  return serializeWrite(async () => {
    const all = await readAll();
    const index = all.findIndex((item) => item.id === id);
    if (index < 0) return null;
    const current = all[index];
    const note = update.note?.trim();
    const updated: PujaEnquiry = {
      ...current,
      ...(update.status ? { status: update.status } : {}),
      ...(note ? { notes: [...current.notes, `${new Date().toISOString()} — ${note}`] } : {}),
      updatedAt: new Date().toISOString(),
    };
    all[index] = updated;
    await writeAll(all);
    return updated;
  });
}
