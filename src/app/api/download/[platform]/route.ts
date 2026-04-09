import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  DOWNLOAD_ACCESS_COOKIE,
  verifyDownloadAccessToken,
} from "../../../../lib/download-access";

export const runtime = "nodejs";

type Platform = "windows" | "macos";

const FILE_FOR_PLATFORM: Record<Platform, string> = {
  windows: "TitanOS.exe",
  macos: "TitanOS.dmg",
};

function contentTypeFor(filename: string) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".dmg")) return "application/x-apple-diskimage";
  if (lower.endsWith(".exe")) return "application/vnd.microsoft.portable-executable";
  return "application/octet-stream";
}

interface RouteContext {
  params: { platform: string };
}

/**
 * Gated installer stream. Verifies the HttpOnly download cookie set by the
 * Razorpay verify route, then reads the file from `private/downloads/` and
 * returns it with `Content-Disposition: attachment` so the browser downloads
 * it instead of navigating.
 */
export async function GET(_request: Request, { params }: RouteContext) {
  const platform = params.platform as Platform;

  if (platform !== "windows" && platform !== "macos") {
    return NextResponse.json({ error: "Unknown platform." }, { status: 400 });
  }

  // Cookie gate
  const cookieStore = await cookies();
  const token = cookieStore.get(DOWNLOAD_ACCESS_COOKIE)?.value;

  if (!verifyDownloadAccessToken(token)) {
    return NextResponse.redirect(new URL("/checkout", _request.url));
  }

  const filename = FILE_FOR_PLATFORM[platform];
  const filePath = path.join(process.cwd(), "private", "downloads", filename);

  let fileBuffer: Buffer;
  try {
    fileBuffer = await readFile(filePath);
  } catch {
    return NextResponse.json(
      { error: `Installer not found: ${filename}` },
      { status: 404 },
    );
  }

  // Wrap in Uint8Array — Node Buffer isn't directly assignable to BodyInit in
  // Next 14's typings, but Uint8Array (its parent) is a valid Web stream body.
  return new NextResponse(new Uint8Array(fileBuffer), {
    headers: {
      "Content-Type": contentTypeFor(filename),
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(fileBuffer.length),
      "Cache-Control": "private, no-store, no-cache, must-revalidate",
    },
  });
}
