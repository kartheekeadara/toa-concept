import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import Hero from "@/components/Hero";
import Carry from "@/components/Carry";
import VisitSection from "@/components/VisitSection";
import ReviewMode from "@/components/ReviewMode";

export default function Home() {
  return (
    <>
      <ReviewMode />
      <Nav />
      <main id="top">
        <StickyBar />
        <Hero />
        <Carry />
        <VisitSection />
      </main>
      <Footer />
    </>
  );
}