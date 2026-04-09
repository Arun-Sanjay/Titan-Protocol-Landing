"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";
import { fadeUp, staggerContainer, viewportConfig } from "../../lib/animations";

const stats = [
  { target: 1000, suffix: "+", label: "Missions Completed", decimals: 0 },
  { target: 20, suffix: "+", label: "Beta Operators", decimals: 0 },
  { target: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
];

export default function Stats() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
      className="relative py-24 md:py-32"
    >
      <div className="container-narrow relative z-10">
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-y-0 md:gap-x-8"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col items-center justify-center gap-3 text-center"
            >
              <AnimatedCounter
                target={s.target}
                suffix={s.suffix}
                decimals={s.decimals}
                className="text-[56px] md:text-[64px] lg:text-[72px] text-white font-bold tracking-[-0.03em]"
              />
              <p className="font-sans text-[14px] md:text-[15px] font-medium text-white/45">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
