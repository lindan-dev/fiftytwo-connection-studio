import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyTrack from "@/components/WhyTrack";
import Features from "@/components/Features";
import TherapyCallout from "@/components/TherapyCallout";
import CalendarPreview from "@/components/CalendarPreview";
import Testimonials from "@/components/Testimonials";
import BetaSignup from "@/components/BetaSignup";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <WhyTrack />
      <Features />
      <TherapyCallout />
      <CalendarPreview />
      <Testimonials />
      <BetaSignup />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
