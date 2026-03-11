import Link from "next/link"
import {
  Check,
  Laptop,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { PaymentButton } from "@/components/payment-button"
import { SoftwarePreviewPanel } from "@/components/software-preview-panel"
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
  { label: "Version", value: TITAN_VERSION },
  { label: "Delivery", value: "Instant download" },
  { label: "License", value: TITAN_LICENSE },
]

const supportedPlatforms = [
  {
    title: "Windows",
    detail: "Install and run locally with a dedicated desktop build.",
    icon: Laptop,
  },
  {
    title: "macOS",
    detail: "Built for a premium desktop workflow with offline access.",
    icon: Sparkles,
  },
]

export default function CheckoutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050608] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,174,255,0.07),transparent_28%),radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_80%_14%,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between py-2">
          <Link
            href="/"
            className="flex items-center gap-3 text-[0.72rem] tracking-[0.24em] text-white/68 uppercase"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              T
            </span>
            <span>{TITAN_PRODUCT_NAME}</span>
          </Link>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 rounded-full border-white/10 bg-white/[0.03] px-5 text-white hover:bg-white/[0.06]"
          >
            <Link href="/">Back to Landing</Link>
          </Button>
        </header>

        <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_420px] lg:items-start">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.72rem] font-medium tracking-[0.18em] text-white/58 uppercase">
              Checkout
            </div>

            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl lg:text-[5.25rem]">
              {TITAN_PRODUCT_NAME}
            </h1>
            <p className="mt-5 text-xl leading-8 text-white/68 sm:text-2xl">{TITAN_TAGLINE}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/56">
              Complete your purchase, then continue to the download page for instant access to
              Titan Protocol OS.
            </p>

            <div className="mt-10 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 sm:p-8">
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <p className="text-5xl font-semibold tracking-[-0.06em] text-white">
                    {TITAN_PRICE}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/62">{TITAN_LAUNCH_NOTE}</p>
                </div>
                <p className="pb-1 text-base text-white/34 line-through">{TITAN_REGULAR_PRICE}</p>
              </div>

              <p className="mt-6 text-sm leading-6 text-white/56">{TITAN_TRUST_LINE}</p>
              <p className="mt-3 text-sm leading-6 text-white/40">
                Pay securely via Razorpay Checkout. Your payment is verified instantly
                before download access is granted.
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
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

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[0.72rem] font-medium tracking-[0.18em] text-white/40 uppercase">
                  Supported platforms
                </p>
                <div className="mt-5 space-y-4">
                  {supportedPlatforms.map(({ title, detail, icon: Icon }) => (
                    <div key={title} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                          <Icon className="size-4 text-white/80" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{title}</p>
                          <p className="mt-1 text-sm leading-6 text-white/50">{detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <SoftwarePreviewPanel />

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
              <p className="text-[0.72rem] font-medium tracking-[0.18em] text-white/40 uppercase">
                Product summary
              </p>

              <div className="mt-5 space-y-4">
                {productSummary.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-white/8 pb-4 text-sm last:border-b-0 last:pb-0"
                  >
                    <span className="text-white/48">{label}</span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>

              <PaymentButton className="mt-8 w-full" label="Pay Now" />
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <ShieldCheck className="size-5 text-white/78" />
                </div>
                <div>
                  <p className="font-medium text-white">Instant access after payment</p>
                  <p className="mt-2 text-sm leading-6 text-white/52">
                    Once Razorpay confirms payment, redirect the user to `/download` so they can
                    access the build immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
