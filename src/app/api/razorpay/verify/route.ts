import { createHmac, timingSafeEqual } from "node:crypto"

import { NextResponse } from "next/server"

import {
  createDownloadAccessToken,
  DOWNLOAD_ACCESS_COOKIE,
} from "@/lib/download-access"

function getRazorpaySecret() {
  return process.env.RAZORPAY_KEY_SECRET || "U1XZhqsS0U0nn2K1Dge8rfJB"
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    razorpay_payment_id?: string
    razorpay_order_id?: string
    razorpay_signature?: string
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return NextResponse.json(
      { error: "Missing payment parameters." },
      { status: 400 }
    )
  }

  // Razorpay signature = HMAC-SHA256(order_id + "|" + payment_id, secret)
  const expectedSignature = createHmac("sha256", getRazorpaySecret())
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex")

  const provided = Buffer.from(razorpay_signature)
  const expected = Buffer.from(expectedSignature)

  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return NextResponse.json(
      { error: "Invalid payment signature." },
      { status: 400 }
    )
  }

  // Signature verified. Set download access cookie.
  const response = NextResponse.json({ ok: true })

  response.cookies.set({
    name: DOWNLOAD_ACCESS_COOKIE,
    value: createDownloadAccessToken(razorpay_payment_id),
    httpOnly: true,
    maxAge: 60 * 60,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  return response
}
