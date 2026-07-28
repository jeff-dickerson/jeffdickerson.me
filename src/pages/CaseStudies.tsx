import { Navigation } from "@/components/Navigation";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Kontrak IQ",
      description: "An integrated contract data management system powered by AI.",
      date: "JUL 2023 - TODAY",
      tags: ["Founding Engineer", "Cloud SaaS", "Orchestration", "Enterprise", "Data-driven", "Multi-agent"],
      image: "/lovable-uploads/d1e4ceee-3e2d-4e8c-8af3-6d2750e146e0.png"
    },
    {
      title: "vLM",
      description: "Contract corpus for vision and NLP.",
      date: "Dec 2024 - TODAY",
      tags: ["AI Architect", "Vision LLM", "Multimodal", "Web Inference", "Accumulative Learning"],
      image: "/lovable-uploads/d1e4ceee-3e2d-4e8c-8af3-6d2750e146e0.png"
    },
    {
      title: "Aegis Vault",
      description: "A self-managed investment fund .",
      date: "May 2025 - June 2025",
      tags: ["AI Engineer", "Blockchain Development", "DeFi App", "Cross-chain Integration", "On-chain Analytics"],
      image: "/lovable-uploads/d1e4ceee-3e2d-4e8c-8af3-6d2750e146e0.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 animate-fade-up">Case Studies</h1>
          <p className="text-lg text-muted-foreground mb-16 animate-fade-up">
            A small collection of freelance and open-source projects I worked on.
            Learn more about how my favorite projects look like.
          </p>

          <div className="flex flex-wrap gap-8">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.title} {...study} />
            ))}
          </div>
        </div>
      </main>
      <CTA />
      <Footer />
    </div>
  );
};

export default CaseStudies;