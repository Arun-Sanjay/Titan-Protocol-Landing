import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        titan: {
          // Page background — pure black for the Protocol Black identity
          bg: "#000000",
          black: "#000000",
          // Frosted card background + border
          surface: "rgba(255, 255, 255, 0.03)",
          surfaceHover: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.06)",
          borderHover: "rgba(255, 255, 255, 0.12)",
          // Text scale
          text: "#FFFFFF",
          textMuted: "rgba(255, 255, 255, 0.6)",
          textTertiary: "rgba(255, 255, 255, 0.35)",
          // Accent (used very sparingly)
          accent: "#A6DAFF",
          // Champagne (kept for pricing badge only)
          champagne: "#C9B99A",
          // Engine colors — used ONLY on the Four Engines cards
          body: "#00FF88",
          mind: "#A78BFA",
          money: "#FBBF24",
          charisma: "#60A5FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        // Apple-style rounded — 16px for cards, full pills for buttons
        card: "16px",
        cardLg: "24px",
        pill: "9999px",
      },
      boxShadow: {
        // Soft, premium shadows — no harsh glow
        cardRest: "0 1px 2px rgba(0, 0, 0, 0.4)",
        cardHover:
          "0 24px 60px -16px rgba(0, 0, 0, 0.55), 0 8px 24px -12px rgba(0, 0, 0, 0.45)",
        button:
          "0 1px 2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        buttonHover:
          "0 16px 40px -12px rgba(255, 255, 255, 0.18), 0 4px 12px -4px rgba(255, 255, 255, 0.1)",
        device: "0 30px 80px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.35)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        blink: "blink 1.4s steps(1) infinite",
        floatY: "floatY 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
