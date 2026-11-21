import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PRESENTATION } from "@/lib/flags";

/** Inter: Cyrillic verified for country native names in Carry section. */
const sans = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: PRESENTATION ? "Taste of Europe Gourmet Foods" : "Taste of Europe Gourmet Foods · Concept",
  description: PRESENTATION
    ? "European grocery and deli in Charlotte, NC."
    : "Concept homepage mockup. Not the official website.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}