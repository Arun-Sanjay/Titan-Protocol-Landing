"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import {
  fadeUp,
  staggerContainer,
  viewportConfig,
} from "../../lib/animations";

const testimonials = [
  {
    quote:
      "I've tried every productivity app on the market. Titan Protocol is the first one that made discipline feel like a video game without being childish about it.",
    name: "Arjun M.",
    role: "Founder",
    initials: "AM",
  },
  {
    quote:
      "47-day streak and counting. The decay penalty is brutal but it's exactly what I needed. Titan Protocol doesn't let you negotiate with yourself.",
    name: "Priya R.",
    role: "Senior engineer",
    initials: "PR",
  },
  {
    quote:
      "The rank system is the right kind of obsession. I went from never finishing weekly goals to closing 12 missions a week. Currently chasing Vanguard.",
    name: "Karan S.",
    role: "PhD candidate",
    initials: "KS",
  },
  {
    quote:
      "The Morning Protocol is the best part. Five minutes that completely changes how I show up to the rest of the day. It's become non-negotiable.",
    name: "Meera T.",
    role: "Product designer",
    initials: "MT",
  },
  {
    quote:
      "The four-engine system is genius. It made me realize I was neglecting Charisma entirely. Two months in and my whole life feels more balanced.",
    name: "Rohit B.",
    role: "Marketing director",
    initials: "RB",
  },
  {
    quote:
      "Clean. Premium. Zero distractions. This is what every productivity app should look like. The voice line cinematics are an unexpected delight.",
    name: "Ananya K.",
    role: "Designer",
    initials: "AK",
  },
];

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        label="Early signals"
        title={
          <>
            What beta operators{" "}
            <span className="text-gradient-soft">are saying.</span>
          </>
        }
        description="Real feedback from the first wave running the protocol."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
        className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
      >
        {testimonials.map((t) => (
          <motion.div key={t.name} variants={fadeUp}>
            <div className="surface-card p-8 h-full flex flex-col">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-white/85 text-white/85"
                  />
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-[1.7] text-white/80 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-7 pt-6 border-t border-white/8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-sans text-[12px] text-white font-medium">
                  {t.initials}
                </div>
                <div>
                  <p className="font-sans text-[14px] text-white font-medium">
                    {t.name}
                  </p>
                  <p className="font-sans text-[12px] text-white/45 mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
