/**
 * Titan Protocol product + payment configuration.
 * Ported from the original landing repo so the checkout flow stays identical.
 */
export const TITAN_PRODUCT_NAME = "Titan Protocol OS";
export const TITAN_TAGLINE = "A personal operating system for discipline.";
export const TITAN_PRICE = "₹149";
export const TITAN_PRICE_PAISE = 14900;
export const TITAN_REGULAR_PRICE = "₹699";
export const TITAN_LAUNCH_NOTE = "Launch price";
export const TITAN_TRUST_LINE =
  "One-time purchase · Instant download · Windows + macOS + Android";

/** Razorpay public key id (exposed to the browser). Set in .env.local. */
export const TITAN_RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

export const TITAN_VERSION = "v1.0.0";
export const TITAN_LICENSE = "Single-user";
export const TITAN_DISCOUNT_PERCENT = "79%";

export const TITAN_SUPPORT_NOTE =
  "If you need help accessing your build, contact Titan Protocol support.";

/**
 * Download URLs surfaced on /download once payment is verified.
 * Windows + macOS are served by the gated /api/download/[platform] route which
 * streams the file from `private/downloads/` after verifying the HttpOnly
 * download cookie. Drop new builds in `private/downloads/` (TitanOS.exe /
 * TitanOS.dmg) and they ship automatically.
 *
 * Replace TITAN_DOWNLOAD_ANDROID with the actual APK / Play Store link once
 * the Android build is published.
 */
export const TITAN_DOWNLOAD_WINDOWS = "/api/download/windows";
export const TITAN_DOWNLOAD_MAC = "/api/download/macos";
export const TITAN_DOWNLOAD_ANDROID = ""; // TODO: paste Android APK / Play Store URL
