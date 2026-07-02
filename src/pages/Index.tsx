import Hero from "@/components/Hero";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import InlineCTA from "@/components/InlineCTA";
import WhyTrack from "@/components/WhyTrack";
import Features from "@/components/Features";
import TherapyCallout from "@/components/TherapyCallout";
import CalendarPreview from "@/components/CalendarPreview";
import Testimonials from "@/components/Testimonials";
import GetStarted from "@/components/GetStarted";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <HowItWorks />
      <InlineCTA label="Try it with your partner ❤️" reassurance="Free during beta. No credit card." />
      <WhyTrack />
      <Features />
      <TherapyCallout />
      <CalendarPreview />
      <Testimonials />
      <InlineCTA label="Get early access 🎉" reassurance="Only you and your partner can see this." />
      <GetStarted />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
