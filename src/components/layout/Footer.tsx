"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Youtube } from "lucide-react";
import TitanLogo from "../ui/TitanLogo";
import { fadeIn, viewportConfig } from "../../lib/animations";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Manifesto", href: "#" },
      { label: "Press kit", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Refunds", href: "#" },
    ],
  },
];

const socials = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Github, href: "#", label: "GitHub" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="relative bg-titan-bg pt-24 md:pt-32 pb-16"
    >
      <div className="container-titan">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2 md:col-span-2">
            <TitanLogo />
            <p className="mt-6 max-w-xs text-[14px] leading-[1.7] text-white/55">
              The personal operating system for discipline. Turn execution into
              XP and consistency into compounding power.
            </p>
            <div className="mt-7 flex items-center gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/55 hover:text-white hover:border-white/25 transition-all duration-700"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="font-sans text-[13px] font-semibold text-white/55">
                {col.title}
              </p>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-white/70 hover:text-white transition-colors duration-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[13px] text-white/40">
            © 2026 Titan Protocol. Built with discipline.
          </p>
          <p className="font-sans text-[13px] text-white/40">
            All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
