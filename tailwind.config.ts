import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // warm off-white page background
        cream: { DEFAULT: "#F6F0E4", deep: "#EDE4D3" },
        // Sampled from public/photos/real/logo.png (python3 -I scripts/logo-colors.py).
        // DEFAULT is the logo red: white on it is 4.40:1, so it fails AA at body size.
        // `deep` is a slightly darker red for any background that carries text (white 5.85:1)
        // and for small red text on cream (5.16:1). `tint` is the soft holiday panel.
        "brand-red": { DEFAULT: "#EC1D24", deep: "#C8161D", tint: "#FBE9E6" },
        // Logo charcoal. Body text, ticker, sticky bar, footer.
        "brand-ink": { DEFAULT: "#3A3A3A", soft: "#5F5A55" },
        stone: "#B9A992",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        slowzoom: { "0%": { transform: "scale(1)" }, "100%": { transform: "scale(1.1)" } },
        pop: { "0%": { opacity: "0", transform: "scale(0.85)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        slowzoom: "slowzoom 24s ease-out forwards",
        pop: "pop 260ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
        marquee: "marquee 45s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
