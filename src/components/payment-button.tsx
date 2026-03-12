"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import { TITAN_RAZORPAY_PAYMENT_BUTTON_ID } from "@/lib/titan"

type PaymentButtonProps = {
  className?: string
  label?: string
}

export function PaymentButton({ className }: PaymentButtonProps) {
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    const form = formRef.current

    if (!form) {
      return
    }

    form.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/payment-button.js"
    script.async = true
    script.setAttribute("data-payment_button_id", TITAN_RAZORPAY_PAYMENT_BUTTON_ID)

    form.appendChild(script)

    return () => {
      form.innerHTML = ""
    }
  }, [])

  return (
    <div
      className={cn(
        "inline-flex max-w-full items-center justify-center rounded-[1.8rem] bg-transparent",
        className
      )}
    >
      <div className="origin-center scale-[1.18] transform">
        <form ref={formRef} className="flex min-h-12 items-center justify-center" />
      </div>
    </div>
  )
}
