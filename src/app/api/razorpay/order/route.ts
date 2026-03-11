import { NextResponse } from "next/server"

import {
  TITAN_PRICE_PAISE,
  TITAN_PRODUCT_NAME,
  TITAN_RAZORPAY_KEY_ID,
} from "@/lib/titan"

function getRazorpaySecret() {
  return process.env.RAZORPAY_KEY_SECRET || "U1XZhqsS0U0nn2K1Dge8rfJB"
}

export async function POST() {
  const auth = Buffer.from(`${TITAN_RAZORPAY_KEY_ID}:${getRazorpaySecret()}`).toString("base64")

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
    return NextResponse.json({ error: "Unable to create Razorpay order." }, { status: 500 })
  }

  const order = await response.json()

  return NextResponse.json({
    id: order.id as string,
    amount: order.amount as number,
    currency: order.currency as string,
  })
}
