import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";

export type EnquiryStatus = "New" | "Contacted" | "Quoted" | "Confirmed" | "Completed" | "Cancelled";

export type PujaEnquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  puja: string;
  pujaDate: string;
  preferredTime: string;
  city: string;
  location: string;
  bookingType: "At Home" | "Online";
  languagePreference: string;
  traditionPreference: string;
  gotra: string;
  additionalRequirement: string;
  status: EnquiryStatus;
  notes: string[];
  createdAt: string;
  updatedAt: string;
};

const dataDirectory = process.env.PUJAPATH_DATA_DIR || join(process.cwd(), ".data");
const enquiriesFile = join(dataDirectory, "enquiries.json");
let writeQueue: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<PujaEnquiry[]> {
  try {
    const raw = await readFile(enquiriesFile, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed as PujaEnquiry[] : [];
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

export type NewEnquiry = Omit<PujaEnquiry, "id" | "status" | "notes" | "createdAt" | "updatedAt">;

export async function createEnquiry(input: NewEnquiry) {
  return serializeWrite(async () => {
    const all = await readAll();
    const createdAt = new Date().toISOString();
    const dateStamp = createdAt.slice(0, 10).replaceAll("-", "");
    const prefix = `PUJA-${dateStamp}-`;
    const lastNumber = all.reduce((max, item) => item.id.startsWith(prefix) ? Math.max(max, Number(item.id.slice(prefix.length)) || 0) : max, 0);
    const enquiry: PujaEnquiry = { ...input, id: `${prefix}${String(lastNumber + 1).padStart(3, "0")}`, status: "New", notes: [], createdAt, updatedAt: createdAt };
    await writeAll([...all, enquiry]);
    return enquiry;
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
