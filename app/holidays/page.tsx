import type { Metadata } from "next";
import ReviewMode from "@/components/ReviewMode";
import ClayHeader from "@/components/clay/ClayHeader";
import ClayFooter from "@/components/clay/ClayFooter";
import ClayStickyBar from "@/components/clay/ClayStickyBar";
import SmoothScroll from "@/components/clay/SmoothScroll";
import GiftsHero from "@/components/holidays/GiftsHero";
import GiftGallery from "@/components/holidays/GiftGallery";
import HolidayTimeline from "@/components/holidays/HolidayTimeline";
import OrderAhead from "@/components/holidays/OrderAhead";

export const metadata: Metadata = {
  title: "Holiday gifts and hours · Taste of Europe",
  description: "European holiday gifts in Charlotte: boxed chocolates, Toruń gingerbread, sweets by the pound and wine, plus Christmas and Orthodox Christmas hours.",
};

export default function HolidaysPage() {
  return (
    <>
      <ReviewMode />
      <SmoothScroll>
        <ClayHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          <GiftsHero />
          <GiftGallery />
          <HolidayTimeline />
          <OrderAhead />
        </main>
        {/* The timeline already lists holiday hours, so the footer skips its copy. */}
        <ClayFooter showHolidayHours={false} />
        <ClayStickyBar />
      </SmoothScroll>
    </>
  );
}
