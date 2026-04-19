import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "zia_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const s = process.env.ADMIN_SECRET;
  if (!s || s.length < 16) {
    throw new Error("ADMIN_SECRET env var must be set to a string of at least 16 chars.");
  }
  return s;
}

export function getAdminPassword(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) throw new Error("ADMIN_PASSWORD env var must be set.");
  return p;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function issueSessionToken(): string {
  const issuedAt = Date.now().toString(36);
  const payload = `v1.${issuedAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [version, issuedAt, mac] = parts;
  if (version !== "v1") return false;

  const expected = sign(`${version}.${issuedAt}`);
  const expectedBuf = Buffer.from(expected, "hex");
  const macBuf = Buffer.from(mac, "hex");
  if (expectedBuf.length !== macBuf.length) return false;
  if (!timingSafeEqual(expectedBuf, macBuf)) return false;

  const issuedMs = parseInt(issuedAt, 36);
  if (!Number.isFinite(issuedMs)) return false;
  const ageSec = (Date.now() - issuedMs) / 1000;
  if (ageSec < 0 || ageSec > MAX_AGE_SECONDS) return false;

  return true;
}

export const sessionCookie = {
  name: COOKIE_NAME,
  maxAge: MAX_AGE_SECONDS,
};

export function passwordsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
