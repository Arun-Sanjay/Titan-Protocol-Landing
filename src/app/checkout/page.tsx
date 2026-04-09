import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";

import PaymentButton from "../../components/payment/PaymentButton";
import {
  TITAN_LAUNCH_NOTE,
  TITAN_LICENSE,
  TITAN_PRICE,
  TITAN_PRODUCT_NAME,
  TITAN_REGULAR_PRICE,
  TITAN_TAGLINE,
  TITAN_TRUST_LINE,
  TITAN_VERSION,
} from "../../lib/titan";

export const metadata = {
  title: "Checkout",
  description: "Secure checkout for Titan Protocol OS via Razorpay.",
};

const includedItems = [
  "Lifetime access — one-time purchase",
  "Windows + macOS + Android builds",
  "Instant digital delivery",
  "Free updates for v1.x",
];

const productSummary: { label: string; value: string }[] = [
  { label: "Price", value: TITAN_PRICE },
  { label: "Offer", value: "Launch price" },
  { label: "Version", value: TITAN_VERSION },
  { label: "Delivery", value: "Instant download" },
  { label: "License", value: TITAN_LICENSE },
];

export default function CheckoutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Subtle radial atmosphere */}
      <div className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_82%_14%,rgba(255,255,255,0.07),transparent_22%),radial-gradient(circle_at_top,rgba(166,218,255,0.06),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="flex items-center justify-between py-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-[0.72rem] tracking-[0.24em] text-white/70 uppercase sm:gap-3"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:size-10">
              T
            </span>
            <span className="hidden sm:inline">{TITAN_PRODUCT_NAME}</span>
          </Link>

          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-pill border border-white/10 bg-white/[0.03] px-4 text-sm text-white/85 hover:bg-white/[0.06] hover:text-white transition-all sm:h-11 sm:px-5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to landing
          </Link>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start">
          {/* Left column — included copy */}
          <div className="max-w-3xl lg:col-start-1 lg:row-start-1">
            <p className="text-sm leading-6 text-white/56">{TITAN_TRUST_LINE}</p>

            <div className="surface-card mt-6 p-5 sm:p-6">
              <p className="text-[0.72rem] font-medium tracking-[0.18em] text-white/40 uppercase">
                Included in your purchase
              </p>
              <div className="mt-5 space-y-4">
                {includedItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                      <Check className="size-4 text-white/80" />
                    </div>
                    <p className="text-sm leading-6 text-white/65">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card mt-5 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <ShieldCheck className="size-5 text-white/78" />
                </div>
                <div>
                  <p className="font-medium text-white">Official checkout</p>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Your purchase is processed securely. Access to your
                    Windows, macOS, and Android downloads is unlocked the
                    instant payment is verified.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — payment card */}
          <div className="space-y-5 lg:col-start-2 lg:row-start-1">
            <div className="surface-card p-5 sm:p-6">
              <h1 className="heading-section text-2xl text-white sm:text-3xl">
                {TITAN_PRODUCT_NAME}
              </h1>
              <p className="mt-2 text-sm leading-6 text-white/60">
                {TITAN_TAGLINE}
              </p>

              <div className="mt-5 rounded-[14px] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-champagne text-4xl font-bold tabular-nums tracking-[-0.04em]">
                      {TITAN_PRICE}
                    </p>
                    <p className="mt-2 text-sm text-white/55">
                      {TITAN_LAUNCH_NOTE}
                    </p>
                  </div>
                  <p className="pb-1 text-sm text-white/35 line-through tabular-nums">
                    {TITAN_REGULAR_PRICE}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {productSummary.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-white/8 pb-3 text-sm last:border-b-0 last:pb-0"
                  >
                    <span className="text-white/48">{label}</span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <PaymentButton label="Pay securely with Razorpay" />
              </div>

              <p className="mt-4 text-center text-[11px] tracking-[0.14em] text-white/40 uppercase">
                Secure checkout · Razorpay
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
