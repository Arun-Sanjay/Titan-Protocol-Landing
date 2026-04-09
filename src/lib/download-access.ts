import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * HMAC-signed cookie that gates the /download page after a verified payment.
 * Token format: `<paymentId>.<expiresAt>.<base64url-hmac-sha256>`
 * The cookie is HttpOnly so JS can't read it; the server verifies on each request.
 */
export const DOWNLOAD_ACCESS_COOKIE = "titan_download_access";
const DOWNLOAD_ACCESS_TTL_SECONDS = 60 * 60; // 1 hour

function getSessionSecret() {
  const secret =
    process.env.DOWNLOAD_SESSION_SECRET || process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    throw new Error("Missing DOWNLOAD_SESSION_SECRET or RAZORPAY_KEY_SECRET.");
  }

  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

export function createDownloadAccessToken(paymentId: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + DOWNLOAD_ACCESS_TTL_SECONDS;
  const payload = `${paymentId}.${expiresAt}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifyDownloadAccessToken(token?: string | null) {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length < 3) return false;

  const signature = parts.pop();
  const expiresAt = parts.pop();
  const paymentId = parts.join(".");

  if (!signature || !expiresAt || !paymentId) return false;

  const expiresAtNumber = Number(expiresAt);
  if (
    !Number.isFinite(expiresAtNumber) ||
    expiresAtNumber < Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  const payload = `${paymentId}.${expiresAt}`;
  const expectedSignature = sign(payload);

  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (provided.length !== expected.length) return false;

  return timingSafeEqual(provided, expected);
}
