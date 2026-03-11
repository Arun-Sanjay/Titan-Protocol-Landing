import { createHmac, timingSafeEqual } from "node:crypto"

import { NextResponse } from "next/server"

import {
  createDownloadAccessToken,
  DOWNLOAD_ACCESS_COOKIE,
} from "@/lib/download-access"

function getRazorpaySecret() {
  const secret = process.env.RAZORPAY_KEY_SECRET || "U1XZhqsS0U0nn2K1Dge8rfJB"

  if (!secret) {
    throw new Error(
      "Missing RAZORPAY_KEY_SECRET. Razorpay callback verification requires your Razorpay secret."
    )
  }

  return secret
}

type CallbackParams = {
  paymentId: string | null
  orderId: string | null
  paymentLinkId: string | null
  paymentLinkReferenceId: string
  paymentLinkStatus: string | null
  signature: string | null
}

async function readParams(request: Request): Promise<CallbackParams> {
  if (request.method === "POST") {
    const formData = await request.formData()

    return {
      paymentId: formData.get("razorpay_payment_id")?.toString() ?? null,
      orderId: formData.get("razorpay_order_id")?.toString() ?? null,
      paymentLinkId: formData.get("razorpay_payment_link_id")?.toString() ?? null,
      paymentLinkReferenceId:
        formData.get("razorpay_payment_link_reference_id")?.toString() ?? "",
      paymentLinkStatus: formData.get("razorpay_payment_link_status")?.toString() ?? null,
      signature: formData.get("razorpay_signature")?.toString() ?? null,
    }
  }

  const { searchParams } = new URL(request.url)

  return {
    paymentId: searchParams.get("razorpay_payment_id"),
    orderId: searchParams.get("razorpay_order_id"),
    paymentLinkId: searchParams.get("razorpay_payment_link_id"),
    paymentLinkReferenceId: searchParams.get("razorpay_payment_link_reference_id") || "",
    paymentLinkStatus: searchParams.get("razorpay_payment_link_status"),
    signature: searchParams.get("razorpay_signature"),
  }
}

function signaturesMatch(signature: string, payload: string) {
  const expectedSignature = createHmac("sha256", getRazorpaySecret())
    .update(payload)
    .digest("hex")

  const provided = Buffer.from(signature)
  const expected = Buffer.from(expectedSignature)

  return provided.length === expected.length && timingSafeEqual(provided, expected)
}

async function handleCallback(request: Request) {
  const {
    paymentId,
    orderId,
    paymentLinkId,
    paymentLinkReferenceId,
    paymentLinkStatus,
    signature,
  } = await readParams(request)

  if (!paymentId || !signature) {
    return NextResponse.redirect(new URL("/checkout?payment=missing", request.url))
  }

  let isVerified = false

  if (orderId) {
    isVerified = signaturesMatch(signature, `${orderId}|${paymentId}`)
  } else if (paymentLinkId && paymentLinkStatus) {
    isVerified =
      paymentLinkStatus === "paid" &&
      signaturesMatch(
        signature,
        `${paymentLinkId}|${paymentLinkReferenceId}|${paymentLinkStatus}|${paymentId}`
      )
  }

  if (!isVerified) {
    return NextResponse.redirect(new URL("/checkout?payment=invalid", request.url))
  }

  const response = NextResponse.redirect(new URL("/download", request.url))

  response.cookies.set({
    name: DOWNLOAD_ACCESS_COOKIE,
    value: createDownloadAccessToken(paymentId),
    httpOnly: true,
    maxAge: 60 * 60,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  return response
}

export async function GET(request: Request) {
  return handleCallback(request)
}

export async function POST(request: Request) {
  return handleCallback(request)
}
