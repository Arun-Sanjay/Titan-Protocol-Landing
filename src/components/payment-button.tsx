"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TITAN_RAZORPAY_KEY_ID } from "@/lib/titan"

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void
    }
  }
}

type PaymentButtonProps = {
  className?: string
  label?: string
}

let razorpayScriptPromise: Promise<boolean> | null = null

function loadRazorpayScript() {
  if (typeof window === "undefined") {
    return Promise.resolve(false)
  }

  if (window.Razorpay) {
    return Promise.resolve(true)
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise
  }

  razorpayScriptPromise = new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

  return razorpayScriptPromise
}

export function PaymentButton({
  className,
  label = "Pay Now",
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleClick() {
    setError("")
    setIsLoading(true)

    try {
      const scriptLoaded = await loadRazorpayScript()

      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay Checkout.")
      }

      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Unable to initialize payment.")
      }

      const order = (await response.json()) as {
        amount: number
        currency: string
        id: string
      }

      const razorpay = new window.Razorpay({
        key: TITAN_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Titan Protocol OS",
        description: "A personal operating system for discipline.",
        order_id: order.id,
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) => {
          // Payment succeeded on Razorpay's side. Verify on our backend.
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            if (!verifyRes.ok) {
              const data = await verifyRes.json().catch(() => ({}))
              throw new Error(
                (data as { error?: string }).error || "Payment verification failed."
              )
            }

            // Cookie is set by the verify endpoint. Navigate to download.
            router.push("/download")
          } catch (err) {
            setError(err instanceof Error ? err.message : "Verification failed.")
            setIsLoading(false)
          }
        },
        theme: {
          color: "#f5f5f5",
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
          },
        },
      })

      razorpay.open()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start payment.")
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button
        type="button"
        size="lg"
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          "h-12 rounded-full border border-white/12 bg-white px-6 text-black shadow-[0_18px_44px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] hover:bg-white/92 disabled:opacity-70",
          className
        )}
      >
        <span>{isLoading ? "Loading Checkout..." : label}</span>
        <ArrowRight className="size-4" />
      </Button>

      {error ? <p className="mt-3 text-sm text-white/46">{error}</p> : null}
    </div>
  )
}
