import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  Activity,
  BarChart3,
  Brain,
  Check,
  CircleDollarSign,
  LayoutDashboard,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react"

import { DashboardShowcaseMockup } from "@/components/landing/mockups"
import { SectionHeading } from "@/components/landing/section-heading"
import { CheckoutLinkButton } from "@/components/checkout-link-button"
import { Button } from "@/components/ui/button"
import { ProductImageGallery } from "@/components/product/product-image-gallery"
import { ProductBuyBox } from "@/components/product/product-buy-box"

const pillars: Array<{
  title: string
  description: string
  detail: string
  icon: LucideIcon
}> = [
  {
    title: "Body",
    description: "Train physical consistency with clear inputs, streak logic, and measurable recovery.",
    detail: "Performance, sleep, training, weight, and movement in one controlled system.",
    icon: Activity,
  },
  {
    title: "Mind",
    description: "Structure thinking with focused routines, review cycles, and deliberate reflection.",
    detail: "Clarity replaces drift when planning, journaling, and execution live in one place.",
    icon: Brain,
  },
  {
    title: "Money",
    description: "Track financial behavior with discipline, not guesswork or fragmented spreadsheets.",
    detail: "Income, savings, investment habits, and capital goals stay visible every day.",
    icon: CircleDollarSign,
  },
]

const differentiators: Array<{
  title: string
  description: string
  icon: LucideIcon
}> = [
  {
    title: "One operating layer",
    description: "Titan Protocol OS replaces scattered notes, habit apps, finance tabs, and fragmented dashboards with one system.",
    icon: Target,
  },
  {
    title: "Built for consistency",
    description: "Structured cycles, clean tracking, and review rituals turn progress into a repeatable process instead of a mood.",
    icon: ShieldCheck,
  },
  {
    title: "Offline and owned",
    description: "No subscription dependency. No cloud-first lock-in. One purchase for a product that stays under your control.",
    icon: TrendingUp,
  },
]

const showcasePoints = [
  "See consistency across Body, Mind, and Money in one disciplined view.",
  "Run structured cycles with clean timelines, scorecards, and checkpoints.",
  "Read momentum instantly through analytics designed for action, not distraction.",
]

const offerPoints = [
  "One-time purchase",
  "Works offline",
  "Available for Windows and macOS",
  "Built for long-term compounding",
]

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#050608] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,174,255,0.05),transparent_30%),radial-gradient(circle_at_22%_26%,rgba(255,255,255,0.06),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.08),transparent_20%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute left-1/2 top-28 h-96 w-96 -translate-x-1/2 rounded-full bg-[rgba(148,174,255,0.04)] blur-[180px]" />

      <div className="relative">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-5 sm:px-8 lg:px-12 lg:py-8">
          <Link
            href="#top"
            className="flex shrink-0 items-center gap-2 text-[0.72rem] tracking-[0.24em] text-white/68 uppercase sm:gap-3"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-sm font-semibold tracking-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:size-10">
              T
            </span>
            <span className="hidden sm:inline">Titan Protocol OS</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.68rem] font-medium tracking-[0.16em] text-white/52 uppercase md:inline-flex">
              Windows + macOS
            </span>
            <CheckoutLinkButton className="h-10 px-4 text-sm shadow-[0_12px_36px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] sm:h-11 sm:px-5" />
          </div>
        </header>

        <section
          id="top"
          className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:gap-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14 lg:px-12 lg:py-16"
        >
          <ProductImageGallery />
          <ProductBuyBox />
        </section>

        <section className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:inset-x-8 lg:inset-x-12" />
          <SectionHeading
            eyebrow="System"
            title="Replace motivation with operating logic."
            description="Titan Protocol OS is designed for people who want a serious structure for progress. It removes noise, centralizes signal, and gives discipline a place to live."
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:gap-6">
            {pillars.map(({ title, description, detail, icon: Icon }) => (
              <article
                key={title}
                data-gsap="feature-card"
                className="group rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-12 text-[1.9rem] font-semibold tracking-[-0.05em] text-white">
                  {title}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/62">{description}</p>
                <p className="mt-7 border-t border-white/8 pt-6 text-sm leading-6 text-white/42">
                  {detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="how-it-works"
          className="relative mx-auto grid w-full max-w-7xl gap-14 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.8fr)] lg:px-12 lg:py-36"
        >
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:inset-x-8 lg:inset-x-12" />
          <div data-gsap="dashboard-visual">
            <DashboardShowcaseMockup />
          </div>

          <div data-gsap="dashboard-copy" className="flex flex-col justify-center lg:pl-4">
            <SectionHeading
              eyebrow="Dashboard"
              title="A clear interface for compounding performance."
              description="The dashboard is built to show what matters quickly: momentum, consistency, review cycles, and the decisions that move your baseline higher."
            />

            <div className="mt-12 space-y-4">
              {showcasePoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.02] p-4 sm:p-5"
                >
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                    <Check className="size-4 text-white/88" />
                  </div>
                  <p className="text-sm leading-6 text-white/60 sm:text-base">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
                <LayoutDashboard className="size-5 text-white/78" />
                <p className="mt-5 text-[0.72rem] uppercase tracking-[0.18em] text-white/38">Analytics</p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.045em] text-white">
                  Clean visibility without clutter
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
                <BarChart3 className="size-5 text-white/78" />
                <p className="mt-5 text-[0.72rem] uppercase tracking-[0.18em] text-white/38">Cycles</p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.045em] text-white">
                  Structured cadence for long-term growth
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:inset-x-8 lg:inset-x-12" />
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Why Titan Protocol"
                title="Not another stack of disconnected productivity tools."
                description="Titan Protocol OS is opinionated software for high-performance people who want one disciplined environment instead of ten loosely connected apps."
              />
            </div>

            <div className="grid gap-5">
              {differentiators.map(({ title, description, icon: Icon }) => (
                <article
                  key={title}
                  data-gsap="difference-card"
                  className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 backdrop-blur sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                      <Icon className="size-5 text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-[1.45rem] font-semibold tracking-[-0.045em] text-white">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58 sm:text-base">
                        {description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:inset-x-8 lg:inset-x-12" />
          <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-5 shadow-[0_36px_120px_rgba(0,0,0,0.46)] backdrop-blur sm:rounded-[2.8rem] sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.72rem] font-medium tracking-[0.18em] text-white/54 uppercase">
                  Launch Offer
                </div>
                <h2 className="mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                  Own the system once. Use it for the long run.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                  Titan Protocol OS is sold as a one-time purchase for people who want durable
                  software, offline control, and a serious environment for self-management.
                </p>

                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                  {offerPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-black/20 px-4 py-4"
                    >
                      <Check className="size-4 text-white/80" />
                      <span className="text-sm text-white/62 sm:text-base">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                data-gsap="pricing-card"
                className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.3),rgba(255,255,255,0.03))] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/40">Titan Protocol OS</p>
                <div className="mt-6">
                  <p className="text-5xl font-semibold tracking-[-0.06em] text-white">
                    ₹149
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/58">Launch Price</p>
                  <p className="mt-2 text-sm text-white/38">Regular Price: ₹699</p>
                </div>

                <div className="mt-8 rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm leading-6 text-white/58">
                    Includes the core Titan workspace, discipline dashboard, tracking cycles, and
                    future product refinements under the launch offer.
                  </p>
                </div>

                <CheckoutLinkButton className="mt-8 w-full shadow-[0_18px_40px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]" />

                <p className="mt-4 text-center text-xs tracking-[0.12em] text-white/40 uppercase">
                  Windows and macOS
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-5xl px-4 pb-20 pt-10 text-center sm:px-8 sm:pb-28 lg:pb-36">
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:inset-x-8" />
          <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-12 shadow-[0_28px_120px_rgba(0,0,0,0.35)] backdrop-blur sm:rounded-[2.8rem] sm:px-10 sm:py-16 lg:px-14 lg:py-24">
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/38">Titan Protocol OS</p>
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-[4.2rem]">
              Build a system that keeps working when motivation does not.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/58">
              Install a disciplined operating environment for Body, Mind, and Money, then let
              progress compound.
            </p>

            <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CheckoutLinkButton />
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-white/10 bg-white/[0.03] px-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-white/[0.06]"
              >
                <Link href="#how-it-works">Review the Interface</Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex w-full max-w-7xl flex-col gap-4 border-t border-white/8 px-4 py-8 text-sm text-white/34 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>Titan Protocol OS</p>
          <div className="flex items-center gap-4">
            <span>Install Discipline.</span>
            <span className="text-white/18">/</span>
            <span>Windows + macOS</span>
          </div>
        </footer>
      </div>
    </main>
  )
}
