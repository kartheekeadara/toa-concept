import ReviewMode from "@/components/ReviewMode";
import StoreSchema from "@/components/StoreSchema";
import ClayHeader from "@/components/clay/ClayHeader";
import ClayFooter from "@/components/clay/ClayFooter";
import ClayStickyBar from "@/components/clay/ClayStickyBar";
import FromHome from "@/components/clay/FromHome";
import GoodToKnow from "@/components/clay/GoodToKnow";
import HeroCounter from "@/components/clay/HeroCounter";
import SeasonSection from "@/components/clay/SeasonSection";
import SmoothScroll from "@/components/clay/SmoothScroll";
import WhatsInside from "@/components/clay/WhatsInside";

export default function Home() {
  return (
    <>
      <StoreSchema />
      <ReviewMode />
      <SmoothScroll>
        <ClayHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          <span id="top" />
          <HeroCounter />
          <SeasonSection />
          <WhatsInside />
          <FromHome />
          <GoodToKnow />
        </main>
        <ClayFooter />
        <ClayStickyBar />
      </SmoothScroll>
    </>
  );
}