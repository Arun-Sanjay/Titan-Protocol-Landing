import { readFile } from "node:fs/promises"
import path from "node:path"

import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import {
  DOWNLOAD_ACCESS_COOKIE,
  getPrivateTitanDownloadPath,
  verifyDownloadAccessToken,
} from "@/lib/download-access"

type RouteContext = {
  params: Promise<{
    platform: string
  }>
}

function getDownloadHeaders(filePath: string) {
  const fileName = path.basename(filePath)
  const isMacDmg = fileName.toLowerCase().endsWith(".dmg")
  const isWindowsExe = fileName.toLowerCase().endsWith(".exe")

  return {
    "Content-Type": isMacDmg
      ? "application/x-apple-diskimage"
      : isWindowsExe
        ? "application/vnd.microsoft.portable-executable"
        : "application/octet-stream",
    "Content-Disposition": `attachment; filename="${fileName}"`,
    "Cache-Control": "private, no-store, no-cache, must-revalidate",
  }
}

export async function GET(request: Request, context: RouteContext) {
  const { platform } = await context.params
  const normalizedPlatform = platform === "windows" || platform === "macos" ? platform : null

  if (!normalizedPlatform) {
    return NextResponse.redirect(new URL("/download", request.url))
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(DOWNLOAD_ACCESS_COOKIE)?.value

  if (!verifyDownloadAccessToken(token)) {
    return NextResponse.redirect(new URL("/checkout", request.url))
  }

  const filePath = getPrivateTitanDownloadPath(normalizedPlatform)
  const fileBuffer = await readFile(filePath)

  return new NextResponse(fileBuffer, {
    headers: getDownloadHeaders(filePath),
  })
}
