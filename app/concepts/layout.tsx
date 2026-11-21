import { Onest } from "next/font/google";
import type { Metadata } from "next";
import SmoothScroll from "@/components/clay/SmoothScroll";
import ClayHeader from "@/components/clay/ClayHeader";
import ConceptReviewNav from "@/components/clay/ConceptReviewNav";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-clay",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hero concepts — Taste of Europe",
  description: "Clay-style hero directions for review (draft).",
  robots: { index: false, follow: false },
};

export default function ConceptsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${onest.variable} ${onest.className} min-h-screen bg-clay-paper text-[18px] text-clay-ink antialiased`}>
      <style>{`.font-display { font-family: var(--font-clay), system-ui, sans-serif; }`}</style>
      <SmoothScroll>
        <ClayHeader />
        <main>{children}</main>
        <ConceptReviewNav />
      </SmoothScroll>
    </div>
  );
}