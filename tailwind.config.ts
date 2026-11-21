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
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
        photo: "4px",
        btn: "4px",
      },
      maxWidth: {
        page: "1080px",
      },
    },
  },
  plugins: [],
} satisfies Config;