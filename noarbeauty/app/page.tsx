import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import MediaBadges from "@/components/landing/MediaBadges";
import WhyGlowUp from "@/components/landing/WhyGlowUp";
import NewWay from "@/components/landing/NewWay";
import HowItWorks from "@/components/landing/HowItWorks";
import AestheticTests from "@/components/landing/AestheticTests";
import SampleReport from "@/components/landing/SampleReport";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MediaBadges />
        <WhyGlowUp />
        <NewWay />
        <HowItWorks />
        <AestheticTests />
        <SampleReport />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
