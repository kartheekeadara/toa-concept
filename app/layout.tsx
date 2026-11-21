import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { PRESENTATION } from "@/lib/flags";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-clay",
  display: "swap",
});

export const metadata: Metadata = {
  title: PRESENTATION ? "Taste of Europe Gourmet Foods" : "Taste of Europe Gourmet Foods · Concept",
  description: PRESENTATION
    ? "European grocery and deli in Charlotte, NC."
    : "Concept homepage mockup. Not the official website.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={onest.variable}>
      <body className={`${onest.className} min-h-screen bg-clay-paper text-[18px] text-clay-ink antialiased`}>
        <style>{`.font-display { font-family: var(--font-clay), system-ui, sans-serif; }`}</style>
        {children}
      </body>
    </html>
  );
}