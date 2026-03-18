import Link from "next/link"
import { Download, Monitor, MonitorCog, ShieldCheck } from "lucide-react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DOWNLOAD_ACCESS_COOKIE, verifyDownloadAccessToken } from "@/lib/download-access"
import {
  TITAN_PRODUCT_NAME,
  TITAN_SUPPORT_NOTE,
  TITAN_TAGLINE,
} from "@/lib/titan"

const GITHUB_RELEASE_WINDOWS = "https://github.com/Arun-Sanjay/Titan-Protocol/releases/download/v0.1.0/TitanOS.Windows.exe"
const GITHUB_RELEASE_MAC = "https://github.com/Arun-Sanjay/Titan-Protocol/releases/download/v0.1.0/Titan.Protocol.Mac.dmg"

const installSteps = [
  {
    title: "Windows",
    body: "Download the Windows build, then run TitanOS.exe to get started.",
  },
  {
    title: "macOS",
    body: "Download the macOS build, then open TitanOS.dmg and move the app into Applications.",
  },
]

const downloadOptions = [
  {
    title: "Download for Windows",
    href: GITHUB_RELEASE_WINDOWS,
    icon: Monitor,
  },
  {
    title: "Download for macOS",
    href: GITHUB_RELEASE_MAC,
    icon: MonitorCog,
  },
]

export default async function DownloadPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(DOWNLOAD_ACCESS_COOKIE)?.value

  if (!verifyDownloadAccessToken(token)) {
    redirect("/checkout")
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050608] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,174,255,0.06),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.08),transparent_20%)]" />
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
            <Link href="/checkout">Back to Checkout</Link>
          </Button>
        </header>

        <section className="mx-auto mt-12 max-w-2xl">
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.72rem] font-medium tracking-[0.18em] text-white/58 uppercase">
              Download
            </div>
            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">
              Download {TITAN_PRODUCT_NAME}
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/62">
              Thank you for your purchase. Your access is ready.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/50">{TITAN_TAGLINE}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {downloadOptions.map(({ title, href, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="h-12 w-full rounded-full border border-white/12 bg-white px-6 text-black shadow-[0_18px_44px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] hover:bg-white/92"
                  >
                    <a href={href} download>
                      <span>{title}</span>
                      <Download className="size-4" />
                    </a>
                  </Button>

                  <div className="mt-4 flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                      <Icon className="size-4 text-white/78" />
                    </div>
                    <p className="text-sm leading-6 text-white/44">
                      Secure direct download for your purchased build.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {installSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                      <Monitor className="size-4 text-white/78" />
                    </div>
                    <p className="font-medium text-white">{step.title}</p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/54">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <ShieldCheck className="size-4 text-white/78" />
                </div>
                <div>
                  <p className="font-medium text-white">Need help?</p>
                  <p className="mt-2 text-sm leading-6 text-white/52">{TITAN_SUPPORT_NOTE}</p>
                </div>
              </div>
            </div>
        </section>
      </div>
    </main>
  )
}
