import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Resolve canonical site URL: env var → fallback to vercel preview pattern.
// Set NEXT_PUBLIC_SITE_URL on your deploy (e.g. Vercel project settings) so
// OG / canonical URLs match the actual production domain.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://titanprotocol-os.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Titan Protocol — You weren't built to be average.",
    template: "%s | Titan Protocol",
  },
  description:
    "A 365-day gamified performance system that scores every day across four engines — Body, Mind, Money, and Charisma. Track missions, build streaks, rank up from Initiate to Titan. Available on Windows, macOS, and Android.",
  keywords: [
    "Titan Protocol",
    "Titan Protocol OS",
    "performance system",
    "productivity",
    "discipline",
    "XP",
    "missions",
    "self-optimization",
    "Windows macOS Android",
  ],
  authors: [{ name: "Titan Protocol" }],
  creator: "Titan Protocol",
  openGraph: {
    type: "website",
    title: "Titan Protocol — You weren't built to be average.",
    description:
      "A 365-day gamified performance system. Four engines — Body, Mind, Money, and Charisma. Available on Windows, macOS, and Android.",
    siteName: "Titan Protocol",
  },
  twitter: {
    card: "summary_large_image",
    title: "Titan Protocol",
    description: "You weren't built to be average.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${inter.variable}`}>
      <body className="bg-titan-bg text-white antialiased font-sans selection:bg-titan-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
