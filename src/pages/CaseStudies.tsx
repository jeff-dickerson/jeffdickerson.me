import { Navigation } from "@/components/Navigation";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Footer } from "@/components/Footer";
import { caseStudies } from "@/data/caseStudies";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4 animate-fade-up">
            Selected work
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Case Studies.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            AI architecture, strategy, and systems — delivered turnkey for teams that can't afford to get it wrong.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
