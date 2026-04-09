import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Apple, ArrowLeft, Download, Monitor, Smartphone, ShieldCheck } from "lucide-react";

import {
  DOWNLOAD_ACCESS_COOKIE,
  verifyDownloadAccessToken,
} from "../../lib/download-access";
import {
  TITAN_DOWNLOAD_ANDROID,
  TITAN_DOWNLOAD_MAC,
  TITAN_DOWNLOAD_WINDOWS,
  TITAN_PRODUCT_NAME,
  TITAN_SUPPORT_NOTE,
  TITAN_TAGLINE,
} from "../../lib/titan";

export const metadata = {
  title: "Download",
  description:
    "Download Titan Protocol OS for Windows, macOS, and Android.",
};

interface DownloadOption {
  title: string;
  subtitle: string;
  href: string;
  Icon: typeof Monitor;
}

const downloadOptions: DownloadOption[] = [
  {
    title: "Download for Windows",
    subtitle: ".exe installer · 64-bit",
    href: TITAN_DOWNLOAD_WINDOWS,
    Icon: Monitor,
  },
  {
    title: "Download for macOS",
    subtitle: ".dmg · Apple Silicon + Intel",
    href: TITAN_DOWNLOAD_MAC,
    Icon: Apple,
  },
  {
    title: "Download for Android",
    subtitle: ".apk · Android 10+",
    href: TITAN_DOWNLOAD_ANDROID,
    Icon: Smartphone,
  },
];

export default async function DownloadPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(DOWNLOAD_ACCESS_COOKIE)?.value;

  // Page is gated — invalid/missing cookie bounces back to /checkout.
  if (!verifyDownloadAccessToken(token)) {
    redirect("/checkout");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_82%_14%,rgba(255,255,255,0.07),transparent_22%),radial-gradient(circle_at_top,rgba(166,218,255,0.06),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-20 pt-6 sm:px-8 lg:px-12">
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
            Home
          </Link>
        </header>

        <section className="mx-auto mt-12 max-w-3xl text-center">
          <div className="inline-flex rounded-pill border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[0.72rem] font-medium tracking-[0.18em] text-white/65 uppercase">
            Payment verified
          </div>

          <h1 className="heading-display mt-6 text-white text-balance text-[40px] md:text-[56px] lg:text-[64px]">
            Welcome to{" "}
            <span className="text-gradient-soft">Titan Protocol.</span>
          </h1>

          <p className="mt-5 text-[16px] md:text-[17px] leading-[1.7] text-white/60">
            Thank you for your purchase. Pick your platform below to download
            the build.
          </p>
          <p className="mt-2 text-sm text-white/40">{TITAN_TAGLINE}</p>
        </section>

        {/* Download buttons — Win / Mac / Android */}
        <section className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
          {downloadOptions.map(({ title, subtitle, href, Icon }) => {
            const disabled = !href;
            return (
              <div key={title} className="surface-card p-5 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                    <Icon className="size-5 text-white/85" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-medium text-white">{title}</p>
                    <p className="text-xs text-white/45">{subtitle}</p>
                  </div>
                </div>

                {disabled ? (
                  <div className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] text-sm text-white/40">
                    Coming soon
                  </div>
                ) : (
                  <a
                    href={href}
                    download
                    className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-pill border border-white bg-white px-6 text-sm font-medium text-black shadow-[0_18px_44px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] transition-all hover:bg-white/95"
                  >
                    <Download className="size-4" />
                    Download
                  </a>
                )}
              </div>
            );
          })}
        </section>

        {/* Support card */}
        <section className="mx-auto mt-10 max-w-3xl">
          <div className="surface-card p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                <ShieldCheck className="size-5 text-white/78" />
              </div>
              <div>
                <p className="font-medium text-white">Need help?</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  {TITAN_SUPPORT_NOTE}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
