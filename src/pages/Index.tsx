import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CombiningSection } from "@/components/CombiningSection";
import { ImpactSection } from "@/components/ImpactSection";
import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <Hero />
      <About />
      <Features />
      <CombiningSection />
      <ImpactSection />
      <CTA />
      <Footer />
      <ThemeToggle />
    </div>
  );
};

export default Index;