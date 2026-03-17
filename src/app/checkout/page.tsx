import Link from "next/link"
import {
  Check,
  ShieldCheck,
} from "lucide-react"

import { PaymentButton } from "@/components/payment-button"
import { Button } from "@/components/ui/button"
import {
  TITAN_LAUNCH_NOTE,
  TITAN_LICENSE,
  TITAN_PRICE,
  TITAN_PRODUCT_NAME,
  TITAN_REGULAR_PRICE,
  TITAN_TAGLINE,
  TITAN_TRUST_LINE,
  TITAN_VERSION,
} from "@/lib/titan"

const includedItems = [
  "Lifetime access",
  "Windows + macOS build",
  "Instant digital delivery",
  "Clean local-first experience",
]

const productSummary = [
  { label: "Price", value: TITAN_PRICE },
  { label: "Offer", value: "Launch price" },
  { label: "Version", value: TITAN_VERSION },
  { label: "Delivery", value: "Instant download" },
  { label: "License", value: TITAN_LICENSE },
]

export default function CheckoutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050608] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,174,255,0.07),transparent_28%),radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_80%_14%,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between py-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-[0.72rem] tracking-[0.24em] text-white/68 uppercase sm:gap-3"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:size-10">
              T
            </span>
            <span className="hidden sm:inline">{TITAN_PRODUCT_NAME}</span>
          </Link>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-10 rounded-full border-white/10 bg-white/[0.03] px-4 text-sm text-white hover:bg-white/[0.06] sm:h-11 sm:px-5"
          >
            <Link href="/">Back to Landing</Link>
          </Button>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          {/* Payment card — shown first on mobile, right column on desktop */}
          <div className="space-y-5 lg:col-start-2 lg:row-start-1">
            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 sm:rounded-[2rem] sm:p-6">
              <h1 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                {TITAN_PRODUCT_NAME}
              </h1>
              <p className="mt-2 text-sm leading-6 text-white/58">{TITAN_TAGLINE}</p>

              <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-4xl font-semibold tracking-[-0.05em] text-white">
                      {TITAN_PRICE}
                    </p>
                    <p className="mt-2 text-sm text-white/58">{TITAN_LAUNCH_NOTE}</p>
                  </div>
                  <p className="pb-1 text-sm text-white/34 line-through">{TITAN_REGULAR_PRICE}</p>
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

              <div className="mt-6 flex justify-center">
                <PaymentButton />
              </div>

              <p className="mt-4 text-center text-xs tracking-[0.12em] text-white/36 uppercase">
                Secure checkout via Razorpay
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[2rem] sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <ShieldCheck className="size-5 text-white/78" />
                </div>
                <div>
                  <p className="font-medium text-white">Official checkout</p>
                  <p className="mt-2 text-sm leading-6 text-white/52">
                    Your purchase is processed securely, then access is unlocked immediately for
                    your Windows and macOS downloads.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details — below payment on mobile, left column on desktop */}
          <div className="max-w-3xl lg:col-start-1 lg:row-start-1">
            <p className="text-sm leading-6 text-white/56">
              {TITAN_TRUST_LINE}
            </p>

            <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[2rem] sm:p-6">
              <p className="text-[0.72rem] font-medium tracking-[0.18em] text-white/40 uppercase">
                Included in your purchase
              </p>
              <div className="mt-5 space-y-4">
                {includedItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                      <Check className="size-4 text-white/80" />
                    </div>
                    <p className="text-sm leading-6 text-white/62">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
