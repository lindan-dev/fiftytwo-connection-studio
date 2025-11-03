import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import TherapyCallout from "@/components/TherapyCallout";
import CalendarPreview from "@/components/CalendarPreview";
import Testimonials from "@/components/Testimonials";
import BetaSignup from "@/components/BetaSignup";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Features />
      <TherapyCallout />
      <CalendarPreview />
      <Testimonials />
      <BetaSignup />
      <FAQ />
      <FinalCTA />
    </main>
  );
};

export default Index;
