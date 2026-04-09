"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Section from "../ui/Section";
import Button from "../ui/Button";
import PhoneMockup from "../ui/PhoneMockup";
import DashboardScreen from "../mockups/DashboardScreen";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportConfig,
} from "../../lib/animations";

/**
 * Wow moment section — large centered phone, bold headline, single CTA.
 * Soft gradient blob behind the phone.
 */
export default function PhoneShowcase() {
  const router = useRouter();
  return (
    <Section className="relative overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="heading-section text-white text-balance text-[40px] md:text-[56px] lg:text-[68px] max-w-4xl mx-auto"
        >
          Built to make consistency{" "}
          <span className="text-gradient-soft">unavoidable.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-xl text-[17px] md:text-[19px] leading-[1.7] text-white/60 text-balance"
        >
          The protocol learns your patterns. Streaks compound. Decay penalties
          bite. The system holds you accountable so you don&apos;t have to.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <Button
            variant="primary"
            size="lg"
            iconRight={<ArrowRight className="h-4 w-4" />}
            onClick={() => router.push("/checkout")}
          >
            Begin the protocol
          </Button>
        </motion.div>

        {/* Big phone */}
        <motion.div
          variants={scaleIn}
          className="relative mt-20 md:mt-24 w-[280px] xs:w-[320px] md:w-[360px] lg:w-[400px] will-change-transform"
        >
          <PhoneMockup>
            <DashboardScreen device="phone" />
          </PhoneMockup>
        </motion.div>
      </motion.div>
    </Section>
  );
}
