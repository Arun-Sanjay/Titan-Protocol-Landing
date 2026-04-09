"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import {
  titanEase,
  fadeUp,
  staggerContainer,
  viewportConfig,
} from "../../lib/animations";

const items = [
  {
    q: "What is Titan Protocol?",
    a: "A gamified 365-day personal performance system. It tracks your daily execution across four engines — Body, Mind, Money, and Charisma — scores every day, and ranks you from Initiate to Titan based on your consistency.",
  },
  {
    q: "What platforms is it available on?",
    a: "Windows, macOS, and Android. The desktop version features a refined UI optimized for deep work and planning. The Android version includes the full gamified experience with story mode, cinematics, and voice-acted narrative beats.",
  },
  {
    q: "Is it a subscription?",
    a: "No. Titan Protocol is a one-time purchase at ₹149. You get lifetime access across all platforms with no recurring fees.",
  },
  {
    q: "How does the scoring system work?",
    a: "Every day, the protocol calculates your Titan Score based on completed missions, habits, and engine activity. Your score determines your daily rank grade (D through SS) and contributes to your overall rank progression across eight tiers.",
  },
  {
    q: "Can I use it for free?",
    a: "The onboarding experience is free. After you complete your first task, the full system unlocks with a one-time payment.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <SectionHeading
        label="Common questions"
        title={
          <>
            <span className="text-gradient-soft">Questions.</span>
          </>
        }
        description="The answers people ask before running the protocol."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
        className="mt-16 md:mt-20 max-w-3xl mx-auto"
      >
        <div className="surface-card p-2 md:p-3" style={{ padding: 0 }}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`${
                  i !== items.length - 1 ? "border-b border-white/6" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-7 px-6 md:px-8 text-left group"
                >
                  <span
                    className={`font-sans text-[16px] md:text-[17px] font-medium transition-colors duration-700 ${
                      isOpen
                        ? "text-white"
                        : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: titanEase }}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-white/55 group-hover:text-white group-hover:border-white/30 transition-colors duration-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.55, ease: titanEase },
                          opacity: { duration: 0.4, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.45, ease: titanEase },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-[15px] leading-[1.75] pb-6 px-6 md:px-8 pr-12 text-white/60">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}
