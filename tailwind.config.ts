import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        ink: { DEFAULT: "#141414", muted: "#6B6B6B" },
        line: "#E8E8E8",
        "brand-red": { DEFAULT: "#EC1D24", deep: "#C8161D" },
        clay: {
          paper: "#FAF7F2",
          ink: "#1C1917",
          muted: "#6B645C",
          line: "#E7E0D6",
          section: "#F0EBE3",
          dark: "#141210",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
        media: "0px",
      },
      maxWidth: {
        page: "1080px",
        clay: "100%",
      },
      fontSize: {
        "hero-clay": ["clamp(2.5rem,7vw,6rem)", { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "500" }],
        "statement-clay": ["clamp(1.25rem,2.5vw,1.75rem)", { lineHeight: "1.45", letterSpacing: "-0.02em" }],
      },
      keyframes: {
        slowzoom: { from: { transform: "scale(1)" }, to: { transform: "scale(1.08)" } },
      },
      animation: {
        slowzoom: "slowzoom 22s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;