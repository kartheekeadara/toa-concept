import ReviewMode from "@/components/ReviewMode";
import ClayHeader from "@/components/clay/ClayHeader";
import ClayFooter from "@/components/clay/ClayFooter";
import ClayStickyBar from "@/components/clay/ClayStickyBar";
import CounterPanels from "@/components/clay/CounterPanels";
import FromHome from "@/components/clay/FromHome";
import GoodToKnow from "@/components/clay/GoodToKnow";
import HeroCounter from "@/components/clay/HeroCounter";
import SeasonSection from "@/components/clay/SeasonSection";
import ShopSection from "@/components/clay/ShopSection";
import Statement from "@/components/clay/Statement";
import SmoothScroll from "@/components/clay/SmoothScroll";

export default function Home() {
  return (
    <>
      <ReviewMode />
      <SmoothScroll>
        <ClayHeader />
        <main id="top">
          <HeroCounter />
          <Statement />
          <CounterPanels />
          <SeasonSection />
          <FromHome />
          <ShopSection />
          <GoodToKnow />
        </main>
        <ClayFooter />
        <ClayStickyBar />
      </SmoothScroll>
    </>
  );
}