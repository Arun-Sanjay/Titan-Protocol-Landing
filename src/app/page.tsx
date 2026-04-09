"use client";

import dynamic from "next/dynamic";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollBackground from "../components/effects/ScrollBackground";
import HeroProcessFlow from "../components/sections/HeroProcessFlow";
import Stats from "../components/sections/Stats";
import PhoneShowcase from "../components/sections/PhoneShowcase";
import Features from "../components/sections/Features";
import AppShowcase from "../components/sections/AppShowcase";
import Benefits from "../components/sections/Benefits";
import LogoStrip from "../components/sections/LogoStrip";
import Testimonials from "../components/sections/Testimonials";
import Pricing from "../components/sections/Pricing";
import CTA from "../components/sections/CTA";

// Below-fold sections — code-split out of the initial bundle.
const Comparison = dynamic(() => import("../components/sections/Comparison"), {
  ssr: false,
  loading: () => <div className="min-h-[600px]" />,
});

const FAQ = dynamic(() => import("../components/sections/FAQ"), {
  ssr: false,
  loading: () => <div className="min-h-[600px]" />,
});

export default function HomePage() {
  return (
    <>
      {/* Global scroll-driven background — pure black + drifting orbs + section accents */}
      <ScrollBackground />

      <main className="relative z-10 min-h-screen text-white">
        <Navbar />

        {/* === HERO + PROCESS combined into a single sticky-phone scroll flow === */}
        <HeroProcessFlow />

        <Stats />
        <PhoneShowcase />
        <Features />
        <AppShowcase />
        <Benefits />
        <LogoStrip />
        <Testimonials />
        <Pricing />
        <Comparison />
        <FAQ />
        <CTA />

        <Footer />
      </main>
    </>
  );
}
