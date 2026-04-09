"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import PhoneMockup from "../ui/PhoneMockup";
import DashboardScreen from "../mockups/DashboardScreen";
import MissionScreen from "../mockups/MissionScreen";
import RankScreen from "../mockups/RankScreen";
import ArchetypeScreen from "../mockups/ArchetypeScreen";
import ProtocolScreen from "../mockups/ProtocolScreen";
import { fadeUp, staggerContainer, titanEase } from "../../lib/animations";

const steps = [
  {
    num: "01",
    title: "Select your identity",
    body: "Eight archetypes — Titan, Athlete, Scholar, Hustler, Showman, Warrior, Founder, Charmer. Each one calibrates the scoring system to match your ambition. Choose the one that fits how you want to build your year.",
  },
  {
    num: "02",
    title: "Run the daily protocol",
    body: "Morning Protocol sets your intention for the day. Track missions, log habits, and build momentum. Evening Protocol reveals your Titan Score — a single number that measures how well you executed. Every day is scored. No days off.",
  },
  {
    num: "03",
    title: "Ascend the ranks",
    body: "Eight tiers — Initiate, Operative, Agent, Specialist, Commander, Vanguard, Sentinel, Titan. Your rank reflects your consistency and average score over time. The system doesn't lie. You either show up or you don't.",
  },
];

// Mobile-only caption deck — same content as desktop steps, plus an "OS"
// intro state shown while the dashboard mockup is on screen.
const mobileSteps = [
  {
    label: "TITAN OS",
    title: "Your performance OS.",
    body: "Four engines — Body, Mind, Money, Charisma. One Titan Score that captures every day across them all.",
  },
  {
    label: "STEP 01",
    title: "Select your identity",
    body: "Eight archetypes calibrate the scoring system to match the kind of year you're trying to build.",
  },
  {
    label: "STEP 02",
    title: "Run the daily protocol",
    body: "Morning sets your intention. Evening reveals your Titan Score. Every day is scored — no days off.",
  },
  {
    label: "STEP 03",
    title: "Ascend the ranks",
    body: "Eight tiers from Initiate to Titan. Your rank reflects consistency and average score over time.",
  },
];

export default function HeroProcessFlow() {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  // Mobile sticky scroll
  const mobileRef = useRef<HTMLDivElement>(null);
  const [mobileActive, setMobileActive] = useState(0);

  const [activeScreen, setActiveScreen] = useState(0);

  // === Scroll-driven side phone motion ===
  // Single useScroll over the master container drives all 5 motion values.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // === Mobile sticky scroll progress ===
  // Drives the screen swap + caption swap on mobile/tablet only.
  // The container is 480vh tall so scrollable distance ≈ 380vh, giving ~95vh
  // per state. A normal mobile fling can't blow through all 4 states at once.
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = mobileProgress.on("change", (latest) => {
      // Clean quartile splits — each state owns exactly 25% of the runway.
      let next = 0;
      if (latest >= 0.75) next = 3;
      else if (latest >= 0.5) next = 2;
      else if (latest >= 0.25) next = 1;
      setMobileActive((current) => (current === next ? current : next));
    });
    return unsubscribe;
  }, [mobileProgress]);

  // === Hero animation ===
  // All 3 phones start same size, side-by-side (with slight overlap).
  // On scroll, the SIDE phones translate UP off the top of the viewport
  // and fade out. The CENTER phone shifts slightly DOWN and stays sticky.
  // No convergence, no sideways slide.

  // Side phone vertical exit — translate up off-screen.
  // Timing is matched to the new tightened layout: phones start leaving right
  // as the hero text ends (~0.18 of progress) and finish leaving right as
  // step 1 text reaches the viewport center (~0.34 of progress).
  const sideY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.34],
    ["0vh", "0vh", "-110vh"],
  );
  const sideOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.32],
    [1, 1, 0],
  );

  // Center phone subtle downward shift
  const centerY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.34],
    ["0vh", "0vh", "4vh"],
  );

  // === IntersectionObserver — drives the screen swap inside the center phone ===
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Spacer sentinel — when the 120vh spacer is in view, we're in hero/dashboard state
    if (spacerRef.current) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveScreen(0);
        },
        { threshold: 0.3 },
      );
      obs.observe(spacerRef.current);
      observers.push(obs);
    }

    // Step observers
    [step1Ref, step2Ref, step3Ref].forEach((ref, i) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveScreen(i + 1);
        },
        { threshold: 0.4, rootMargin: "-20% 0px -20% 0px" },
      );
      obs.observe(ref.current);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative w-full lg:min-h-[440vh]"
    >
      {/* === HERO TEXT — normal flow at top === */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 container-narrow flex flex-col items-center text-center pt-40 md:pt-44 pb-16 will-change-transform"
      >
        <motion.p
          variants={fadeUp}
          className="font-sans text-[14px] font-medium text-white/45"
          style={{ letterSpacing: "0.05em" }}
        >
          Performance. Redefined.
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-6 heading-display text-white text-balance text-[44px] xs:text-[52px] md:text-[64px] lg:text-[76px] max-w-4xl"
        >
          You weren&apos;t built to be{" "}
          <span className="text-gradient-soft">average.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-2xl text-[17px] md:text-[19px] leading-[1.7] text-white/60 text-balance"
        >
          A 365-day gamified performance system that scores every day across
          four engines — Body, Mind, Money, and Charisma. Track missions,
          build streaks, rank up from Initiate to Titan. Available on Windows,
          macOS, and Android.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col xs:flex-row items-center justify-center gap-3"
        >
          <Button
            variant="primary"
            size="lg"
            iconRight={<ArrowRight className="h-4 w-4" />}
            onClick={() => router.push("/checkout")}
          >
            Get Titan Protocol
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            See how it works
          </Button>
        </motion.div>
      </motion.div>

      {/* === PHONE ZONE (desktop only) === */}
      <div
        id="how-it-works"
        className="relative hidden lg:block"
        style={{ minHeight: "340vh" }}
      >
        {/* === STICKY PHONE CONTAINER ===
         * Holds 3 phones, each in its own absolute inset-0 flex-center wrapper
         * so the motion.div translates from a properly centered base position.
         */}
        <div
          className="sticky z-10 pointer-events-none"
          style={{ top: "15vh", height: "70vh" }}
        >
          {/* === LEFT SIDE PHONE ===
           * Same size as the center phone (268px). Statically offset to the
           * LEFT with a slight overlap, tilted -8°. On scroll: translate UP
           * off the top of the viewport + fade out.
           */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              style={{
                x: "-85%",
                y: sideY,
                opacity: sideOpacity,
                rotate: -8,
              }}
              className="will-change-transform"
            >
              <div className="w-[268px]">
                <PhoneMockup tilt={0} float={false}>
                  <MissionScreen />
                </PhoneMockup>
              </div>
            </motion.div>
          </div>

          {/* === RIGHT SIDE PHONE — mirror of left === */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              style={{
                x: "85%",
                y: sideY,
                opacity: sideOpacity,
                rotate: 8,
              }}
              className="will-change-transform"
            >
              <div className="w-[268px]">
                <PhoneMockup tilt={0} float={false}>
                  <RankScreen />
                </PhoneMockup>
              </div>
            </motion.div>
          </div>

          {/* === CENTER PHONE ===
           * z-10 so it sits ABOVE the side phones during the slight overlap
           * in the hero state. Subtle downward shift while side phones fly up.
           */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              style={{ y: centerY }}
              className="w-[268px] will-change-transform"
            >
              <PhoneMockup>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 will-change-transform"
                  >
                    {activeScreen === 0 && <DashboardScreen />}
                    {activeScreen === 1 && <ArchetypeScreen />}
                    {activeScreen === 2 && <ProtocolScreen />}
                    {activeScreen === 3 && <RankScreen />}
                  </motion.div>
                </AnimatePresence>
              </PhoneMockup>
            </motion.div>
          </div>
        </div>

        {/* === SCROLLING CONTENT — siblings of the sticky container ===
         * Pulled UP via negative top margin equal to the sticky's natural slot
         * (70vh) so the spacer + steps overlay the sticky's natural position.
         */}
        <div
          className="relative z-20"
          style={{ marginTop: "-70vh" }}
        >
          {/* Small spacer — short buffer between hero text and step 1.
           * Doubles as the heroSentinel for resetting activeScreen to 0
           * when the user scrolls back up. */}
          <div ref={spacerRef} style={{ height: "30vh" }} aria-hidden />

          {/* Step 1 — text LEFT.
           * Visibility is driven by `activeScreen` so the text reveal is
           * synced to the phone screen swap (both fire from the same
           * IntersectionObserver). 0.1s delay so the text feels like a
           * response to the screen change rather than racing it.
           */}
          <div
            ref={step1Ref}
            className="relative min-h-[80vh] flex items-center pointer-events-none"
          >
            <div className="container-titan w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={
                  activeScreen === 1
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.6,
                  ease: titanEase,
                  delay: activeScreen === 1 ? 0.1 : 0,
                }}
                className="max-w-[360px] pointer-events-auto will-change-transform"
              >
                <StepText step={steps[0]} staticContent />
              </motion.div>
            </div>
          </div>

          {/* Step 2 — text RIGHT (synced to activeScreen === 2) */}
          <div
            ref={step2Ref}
            className="relative min-h-[80vh] flex items-center pointer-events-none"
          >
            <div className="container-titan w-full flex justify-end">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={
                  activeScreen === 2
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.6,
                  ease: titanEase,
                  delay: activeScreen === 2 ? 0.1 : 0,
                }}
                className="max-w-[360px] pointer-events-auto will-change-transform"
              >
                <StepText step={steps[1]} staticContent />
              </motion.div>
            </div>
          </div>

          {/* Step 3 — text LEFT (synced to activeScreen === 3) */}
          <div
            ref={step3Ref}
            className="relative min-h-[80vh] flex items-center pointer-events-none"
          >
            <div className="container-titan w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={
                  activeScreen === 3
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.6,
                  ease: titanEase,
                  delay: activeScreen === 3 ? 0.1 : 0,
                }}
                className="max-w-[360px] pointer-events-auto will-change-transform"
              >
                <StepText step={steps[2]} staticContent />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* === MOBILE / TABLET — sticky single phone with synced screen + caption swap ===
       *
       * Design notes (mobile-specific, do NOT mirror desktop):
       *   - 480vh container → ≈380vh of scrollable runway → ~95vh per state.
       *     A typical mobile fling (~150vh) advances ~1 state, never the
       *     whole sequence in one swipe.
       *   - AnimatePresence WITHOUT mode="wait" → exit + enter overlap, so
       *     rapid scroll doesn't queue up a stop-and-go animation chain.
       *   - All transitions use absolute-positioned children inside fixed-
       *     height parents, so cross-fading layers never cause layout jumps.
       *   - Sticky element is pointer-events-none so the user can scroll the
       *     page anywhere on the phone area without intercepting touches.
       */}
      <div
        ref={mobileRef}
        className="lg:hidden relative"
        style={{ minHeight: "480vh" }}
      >
        <div className="sticky top-20 flex flex-col items-center pt-2 pointer-events-none">
          {/* Single phone — screens crossfade via AnimatePresence */}
          <div className="relative w-[180px] xs:w-[195px] sm:w-[215px] will-change-transform">
            <PhoneMockup>
              <AnimatePresence>
                <motion.div
                  key={mobileActive}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0 will-change-transform"
                >
                  {mobileActive === 0 && <DashboardScreen device="phone" />}
                  {mobileActive === 1 && <ArchetypeScreen />}
                  {mobileActive === 2 && <ProtocolScreen />}
                  {mobileActive === 3 && <RankScreen />}
                </motion.div>
              </AnimatePresence>
            </PhoneMockup>
          </div>

          {/* Caption — slides in from the right, exits to the left */}
          <div className="relative mt-7 h-[180px] w-full overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={mobileActive}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6, ease: titanEase }}
                className="absolute inset-x-6 text-center will-change-transform"
              >
                <p
                  className="font-sans text-[12px] font-semibold text-white/45"
                  style={{ letterSpacing: "0.08em" }}
                >
                  {mobileSteps[mobileActive].label}
                </p>
                <h2 className="mt-3 heading-section text-white text-[24px] xs:text-[28px]">
                  {mobileSteps[mobileActive].title}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.6] text-white/60">
                  {mobileSteps[mobileActive].body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

interface StepTextProps {
  step: (typeof steps)[number];
  centered?: boolean;
  /**
   * When true, the component renders without its own whileInView animation.
   * Use this when the parent already drives opacity/y via scroll-tied motion
   * values (e.g. step 1 which must hide until the side phones have exited).
   */
  staticContent?: boolean;
}

function StepText({ step, centered = false, staticContent = false }: StepTextProps) {
  const inner = (
    <>
      <p
        className="font-sans text-[13px] font-semibold text-white/45"
        style={{ letterSpacing: "0.08em" }}
      >
        STEP {step.num}
      </p>
      <h2 className="mt-4 heading-section text-white text-[32px] md:text-[40px] lg:text-[44px]">
        {step.title}
      </h2>
      <p className="mt-5 text-[16px] leading-[1.7] text-white/60">{step.body}</p>
    </>
  );

  if (staticContent) {
    return (
      <div className={`max-w-md ${centered ? "mx-auto" : ""}`}>{inner}</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: titanEase }}
      className={`will-change-transform max-w-md ${centered ? "mx-auto" : ""}`}
    >
      {inner}
    </motion.div>
  );
}
