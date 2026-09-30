import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "pujapath-admin-session";
const SESSION_DURATION = 8 * 60 * 60 * 1000;

function sessionSecret() {
  return process.env.PUJAPATH_SESSION_SECRET || "";
}

export function adminIsConfigured() {
  return Boolean(process.env.PUJAPATH_ADMIN_PASSWORD && sessionSecret().length >= 32);
}

export function checkAdminPassword(password: string) {
  const configured = process.env.PUJAPATH_ADMIN_PASSWORD || "";
  if (!adminIsConfigured() || !configured) return false;
  const expected = createHash("sha256").update(configured).digest();
  const actual = createHash("sha256").update(password).digest();
  return timingSafeEqual(expected, actual);
}

export function createAdminSession() {
  const expiresAt = Date.now() + SESSION_DURATION;
  const payload = String(expiresAt);
  const signature = createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  return { value: `${payload}.${signature}`, maxAge: Math.floor(SESSION_DURATION / 1000) };
}

export function isValidAdminSession(value: string | undefined) {
  if (!value || !adminIsConfigured()) return false;
  const [payload, signature] = value.split(".");
  const expiresAt = Number(payload);
  if (!payload || !signature || !Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  const expected = createHmac("sha256", sessionSecret()).update(payload).digest();
  let actual: Buffer;
  try {
    actual = Buffer.from(signature, "base64url");
  } catch {
    return false;
  }
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(ADMIN_COOKIE)?.value);
}
