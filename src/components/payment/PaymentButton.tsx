"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { TITAN_RAZORPAY_KEY_ID, TITAN_PRODUCT_NAME, TITAN_TAGLINE } from "../../lib/titan";
import { titanEase } from "../../lib/animations";
import { cn } from "../../lib/cn";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

let razorpayScriptPromise: Promise<boolean> | null = null;

function loadRazorpayScript() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

interface PaymentButtonProps {
  className?: string;
  label?: string;
}

/**
 * Champagne-on-hover pay button. Same flow as the original landing build:
 *   1. Load checkout.razorpay.com script
 *   2. POST /api/razorpay/order to mint a Razorpay order
 *   3. Open the Razorpay modal with order_id
 *   4. On `handler` callback, POST /api/razorpay/verify to confirm signature
 *   5. On verify success, navigate to /download (cookie gates the page)
 */
export default function PaymentButton({
  className,
  label = "Pay Now",
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hover, setHover] = useState(false);

  async function handleClick() {
    setError("");
    setIsLoading(true);

    try {
      if (!TITAN_RAZORPAY_KEY_ID) {
        throw new Error("Missing Razorpay key. Add NEXT_PUBLIC_RAZORPAY_KEY_ID to .env.local.");
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay Checkout.");
      }

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!orderRes.ok) {
        const data = await orderRes.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error || "Unable to initialize payment.",
        );
      }

      const order = (await orderRes.json()) as {
        amount: number;
        currency: string;
        id: string;
      };

      const razorpay = new window.Razorpay({
        key: TITAN_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: TITAN_PRODUCT_NAME,
        description: TITAN_TAGLINE,
        order_id: order.id,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) {
              const data = await verifyRes.json().catch(() => ({}));
              throw new Error(
                (data as { error?: string }).error || "Payment verification failed.",
              );
            }

            window.location.href = "/download";
          } catch (err) {
            setError(err instanceof Error ? err.message : "Verification failed.");
            setIsLoading(false);
          }
        },
        theme: { color: "#f5f5f5" },
        modal: {
          ondismiss: () => setIsLoading(false),
        },
      });

      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start payment.");
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <motion.button
        type="button"
        onClick={handleClick}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.5, ease: titanEase }}
        disabled={isLoading}
        className="relative inline-flex w-full items-center justify-center gap-2 h-14 px-8 rounded-pill font-sans font-medium text-[15px] border transition-all duration-700 overflow-hidden disabled:opacity-70"
        style={{
          background: hover
            ? "linear-gradient(135deg, #e8d8b8 0%, #c9b99a 50%, #b8a888 100%)"
            : "#ffffff",
          color: hover ? "#1a1407" : "#000000",
          borderColor: hover ? "rgba(201,185,154,0.6)" : "#ffffff",
          boxShadow: hover
            ? "0 16px 40px -12px rgba(201,185,154,0.55), 0 0 0 1px rgba(201,185,154,0.3)"
            : "0 1px 2px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {hover && !isLoading && <Sparkles className="h-4 w-4" />}
        <span>{isLoading ? "Loading checkout…" : label}</span>
        {!isLoading && <ArrowRight className="h-4 w-4" />}
      </motion.button>

      {error ? (
        <p className="mt-3 text-center text-[13px] text-red-300/80">{error}</p>
      ) : null}
    </div>
  );
}
