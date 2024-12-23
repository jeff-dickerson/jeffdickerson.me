import { Navigation } from "@/components/Navigation";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Lazy",
      description: "A capture tool for knowledge.",
      date: "JUL 2023 - TODAY",
      tags: ["Founding Engineer", "Tool/Editor", "ChatGPT", "Productivity", "Docs", "Artificial Intelligence"],
      image: "/lovable-uploads/d1e4ceee-3e2d-4e8c-8af3-6d2750e146e0.png"
    },
    {
      title: "dskrpt",
      description: "Digital scripts for lectures.",
      date: "AUG 2023 - TODAY",
      tags: ["Product Engineer", "Tool/Editor", "Web App", "Collaboration", "Education"],
      image: "/lovable-uploads/d1e4ceee-3e2d-4e8c-8af3-6d2750e146e0.png"
    },
    {
      title: "vykee",
      description: "A new way of user onboarding.",
      date: "SEP 2023 - OCT 2023",
      tags: ["Product Engineer", "Web Development", "Web App", "B2B SaaS", "User Activation"],
      image: "/lovable-uploads/d1e4ceee-3e2d-4e8c-8af3-6d2750e146e0.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 animate-fade-up">Case Studies</h1>
          <p className="text-lg text-gray-600 mb-16 animate-fade-up">
            A small collection of freelance and open-source projects I worked on.
            Learn more about how my favorite projects look like.
          </p>

          <div className="space-y-8">
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