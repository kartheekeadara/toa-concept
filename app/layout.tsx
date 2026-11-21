import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { PRESENTATION } from "@/lib/flags";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
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
