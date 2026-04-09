"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import {
  scaleIn,
  staggerContainer,
  viewportConfig,
  titanEase,
} from "../../lib/animations";
import { cn } from "../../lib/cn";

const features = [
  "One-time purchase — lifetime access",
  "Works offline, no subscription required",
  "Windows + macOS + Android included",
  "Desktop app with refined UI for deep work",
  "Android app with full gamification and story mode",
  "Instant digital delivery after payment",
  "Built for long-term compounding",
];

export default function Pricing() {
  return (
    <Section id="pricing" className="relative overflow-hidden">
      <SectionHeading
        label="One price"
        title={
          <>
            One price.{" "}
            <span className="text-gradient-soft">Lifetime access.</span>
          </>
        }
        description="No subscriptions. No recurring charges. Pay once, own it forever across all your devices."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="relative z-10 mt-16 md:mt-20 max-w-md mx-auto"
      >
        <motion.div variants={scaleIn}>
          <div className="surface-card p-8 md:p-10 relative overflow-hidden">
            {/* Top champagne accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(201,185,154,0.7) 50%, transparent 100%)",
              }}
            />

            <div className="text-center">
              <p className="font-sans text-[14px] font-medium text-white/45">
                Titan Protocol
              </p>

              <div className="mt-5 flex items-baseline justify-center gap-3 flex-wrap">
                <span className="font-sans text-[64px] md:text-[72px] text-champagne tracking-[-0.04em] tabular-nums font-bold leading-none">
                  ₹149
                </span>
                <span className="font-sans text-2xl text-white/30 line-through tabular-nums">
                  ₹699
                </span>
              </div>

              <div className="mt-3 flex items-center justify-center">
                <span
                  className="font-sans text-[12px] font-medium text-titan-champagne border border-titan-champagne/40 bg-titan-champagne/10 px-3 py-1 rounded-pill"
                  style={{
                    boxShadow: "0 0 20px rgba(201, 185, 154, 0.18)",
                  }}
                >
                  79% off · launch price
                </span>
              </div>
            </div>

            {/* Feature list */}
            <ul className="mt-8 space-y-3.5">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-[14px] text-white/80"
                >
                  <span className="flex h-5 w-5 mt-0.5 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.04]">
                    <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Buy Now CTA */}
            <div className="mt-8 flex flex-col gap-2.5">
              <BuyNowButton />
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/checkout";
                }}
                className="inline-flex w-full items-center justify-center gap-2 h-14 px-8 rounded-pill font-sans font-medium text-[15px] border border-white/20 text-white bg-transparent hover:bg-white/[0.05] hover:border-white/40 transition-all duration-500"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            </div>

            <p className="mt-5 text-center font-sans text-[12px] text-white/40">
              One-time purchase · Instant delivery · Free updates
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

/**
 * Buy Now button with champagne hover state.
 * Default: white pill with black text. Hover: champagne gradient.
 * Routes to /checkout where Razorpay payment is initiated.
 */
function BuyNowButton() {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => router.push("/checkout")}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.5, ease: titanEase }}
      className={cn(
        "relative inline-flex w-full items-center justify-center gap-2 h-14 px-8 rounded-pill font-sans font-medium text-[15px] border transition-all duration-700 overflow-hidden",
      )}
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
      {hover && <Sparkles className="h-4 w-4" />}
      <span>Get Titan Protocol</span>
      <ArrowRight className="h-4 w-4" />
    </motion.button>
  );
}
