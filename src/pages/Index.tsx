import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CombiningSection } from "@/components/CombiningSection";
import { ImpactSection } from "@/components/ImpactSection";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <About />
      <Features />
      <CombiningSection />
      <ImpactSection />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;