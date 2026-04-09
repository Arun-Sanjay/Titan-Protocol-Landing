"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import TitanLogo from "../ui/TitanLogo";
import Button from "../ui/Button";
import { cn } from "../../lib/cn";
import { titanEase } from "../../lib/animations";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Floating pill navbar */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: titanEase, delay: 0.2 }}
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-5"
      >
        <div
          className={cn(
            "flex items-center gap-2 transition-all duration-700 ease-out",
            "rounded-pill px-3 py-2 md:pl-5 md:pr-3",
            scrolled
              ? "bg-black/60 backdrop-blur-2xl border border-white/8"
              : "bg-white/[0.02] backdrop-blur-md border border-white/6",
          )}
        >
          <a
            href="#top"
            className="flex items-center pr-3 md:pr-5"
            aria-label="Titan Protocol home"
          >
            <TitanLogo />
          </a>

          <nav
            className="hidden md:flex items-center gap-1 border-l border-white/8 pl-3"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-pill font-sans text-[14px] font-medium text-white/65 hover:text-white hover:bg-white/[0.05] transition-all duration-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 ml-2">
            <Button
              size="sm"
              variant="primary"
              iconRight={<ArrowRight className="h-3.5 w-3.5" />}
              onClick={() => router.push("/checkout")}
            >
              Get started
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full border border-white/12 text-white"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: titanEase }}
              className="fixed top-0 right-0 bottom-0 w-[300px] z-50 bg-titan-bg border-l border-white/8 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between h-16 px-5 border-b border-white/8">
                <TitanLogo showFull={false} />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-white/12 text-white"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex flex-col p-5 gap-1" aria-label="Mobile primary">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      duration: 0.5,
                      ease: titanEase,
                    }}
                    className="font-sans text-[16px] font-medium text-white/85 hover:text-white py-4 border-b border-white/6"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto p-5 border-t border-white/8">
                <Button
                  fullWidth
                  variant="primary"
                  size="md"
                  iconRight={<ArrowRight className="h-3.5 w-3.5" />}
                  onClick={() => {
                    setMobileOpen(false);
                    router.push("/checkout");
                  }}
                >
                  Get Titan Protocol
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
