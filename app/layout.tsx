import type { Metadata, Viewport } from "next";
import { Noto_Serif_Display, Noto_Serif_Georgian, Onest } from "next/font/google";
import "./globals.css";
import { PRESENTATION } from "@/lib/flags";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-clay",
  display: "swap",
});

const serif = Noto_Serif_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-serif",
  display: "swap",
});

// Georgian glyphs (საქართველო) in the same serif voice.
const georgian = Noto_Serif_Georgian({
  subsets: ["georgian"],
  weight: ["300", "400"],
  variable: "--font-georgian",
  display: "swap",
});

export const metadata: Metadata = {
  title: PRESENTATION ? "Taste of Europe Gourmet Foods" : "Taste of Europe Gourmet Foods · Concept",
  description: PRESENTATION
    ? "European grocery and deli on Providence Rd in Charlotte, NC. Deli counter, sweets by the pound and pantry staples from Ukraine, Poland, Georgia and more."
    : "Concept homepage mockup. Not the official website.",
  // Concept only: keep it out of search until it's on the store's real domain.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Taste of Europe Gourmet Foods",
    description: "European grocery and deli on Providence Rd, Charlotte.",
    images: [{ url: "/photos/real-edited/storefront-2-crop.jpg", width: 1260, height: 1100 }],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F2EC",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${onest.variable} ${serif.variable} ${georgian.variable}`}>
      <body className={`${onest.className} min-h-screen bg-clay-paper text-[18px] text-clay-ink antialiased`}>
        <a
          href="#main"
          className="sr-only z-[100] rounded-pill bg-clay-ink px-5 py-3 text-[15px] text-clay-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}