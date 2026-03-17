import { NextResponse } from "next/server"

import {
  TITAN_PRICE_PAISE,
  TITAN_PRODUCT_NAME,
  TITAN_RAZORPAY_KEY_ID,
} from "@/lib/titan"

function getRazorpaySecret() {
  const secret = process.env.RAZORPAY_KEY_SECRET

  if (!secret) {
    throw new Error("Missing RAZORPAY_KEY_SECRET.")
  }

  return secret
}

function getRazorpayKeyId() {
  if (!TITAN_RAZORPAY_KEY_ID) {
    throw new Error("Missing NEXT_PUBLIC_RAZORPAY_KEY_ID.")
  }

  return TITAN_RAZORPAY_KEY_ID
}

export async function POST() {
  try {
    const auth = Buffer.from(`${getRazorpayKeyId()}:${getRazorpaySecret()}`).toString("base64")

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: TITAN_PRICE_PAISE,
        currency: "INR",
        receipt: `titan_${Date.now()}`,
        notes: {
          product: TITAN_PRODUCT_NAME,
        },
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      const errorData = (await response.json().catch(() => null)) as
        | { error?: { description?: string } }
        | null

      return NextResponse.json(
        {
          error:
            errorData?.error?.description || "Unable to create Razorpay order.",
        },
        { status: response.status }
      )
    }

    const order = await response.json()

    return NextResponse.json({
      id: order.id as string,
      amount: order.amount as number,
      currency: order.currency as string,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to create Razorpay order.",
      },
      { status: 500 }
    )
  }
}
