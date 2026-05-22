import { Navigation } from "@/components/Navigation";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { caseStudies } from "@/data/caseStudies";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-4 animate-fade-up">
            Selected work
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Case Studies.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
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
      <ThemeToggle />
    </div>
  );
};

export default CaseStudies;
