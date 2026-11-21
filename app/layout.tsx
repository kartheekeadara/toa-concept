import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { PRESENTATION } from "@/lib/flags";

// Fraunces: warm, slightly soft old-style serif (variable, with optical sizing and a SOFT axis).
const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-serif",
});

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: PRESENTATION ? "Taste of Europe Gourmet Foods" : "Taste of Europe Gourmet Foods · Concept",
  description: PRESENTATION
    ? "European grocery and deli in Charlotte, NC."
    : "Concept homepage mockup. Not the official website.",
  // stays private either way: this is a pitch mockup, not the live site

  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F6F0E4" // cream,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
