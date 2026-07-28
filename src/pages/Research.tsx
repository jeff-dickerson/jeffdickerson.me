import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Users } from "lucide-react";
import { useState } from "react";

const categories = ["All Categories", "Privacy/Security", "AI Agents"];

const Research = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  // Theory section — peer-style write-ups. Links are filled in as papers are published;
  // the View affordance only renders when a real link exists.
  const theoryPapers = [
    {
      title: "Intelligent Threats: Security and Vulnerabilities of LLMs and AI Agents in the Enterprise",
      category: "Privacy/Security",
      link: "#",
      description:
        "Comprehensive analysis of the security challenges of GenAI, including state-of-the-art protocols like MCP and A2A.",
    },
    {
      title: "Experience Report: An Empirical Study of PHP Security Mechanism Usage",
      category: "Privacy/Security",
      link: "#",
      description: "Large-scale study of PHP security practices in real-world applications.",
    },
    {
      title: "Knowledge Constrained Adaptive Agent — Background and Analysis",
      category: "AI Agents",
      link: "#",
      description:
        "Research on agents that leverage epistemology, composability, and security as first-class constraints.",
    },
  ];

  // Experiments — active concepts and builds. Text-and-badge cards; no stock imagery.
  const experiments = [
    {
      name: "AI-Powered Contract Analysis",
      role: "Machine Learning Experiment",
      description:
        "NLP models for automated contract clause extraction, risk assessment, and value capture.",
      status: "production-grade",
      technologies: ["Python", "Transformers", "TensorFlow"],
    },
    {
      name: "Autonomous Network Engineering",
      role: "System Tool Development",
      description:
        "Natural-language commands for a system-admin and networking agent that supports IT operations.",
      status: "production-grade",
      technologies: ["OpenAI API", "Python", "Cisco pyATS-genie"],
    },
    {
      name: "Federated Learning Framework",
      role: "Distributed AI Research",
      description: "Privacy-preserving machine learning across decentralized networks.",
      status: "concept",
      technologies: ["PyTorch", "Differential Privacy", "Nvidia Transformers"],
    },
    {
      name: "Insurtech Agents",
      role: "Agentic Model Innovation",
      description:
        "Multi-agent orchestration pipeline for actuarial risk modeling, underwriting, and claims processing.",
      status: "concept",
      technologies: ["Scikit-learn", "vLLM + K8s", "Apache Kafka"],
    },
  ];

  const filteredPapers =
    selectedCategory === "All Categories"
      ? theoryPapers
      : theoryPapers.filter((paper) => paper.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Research
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">
            Theory and experiments.
          </h1>

          {/* Theory Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Theory</h2>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredPapers.map((paper, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow bg-card"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground font-medium">{paper.category}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {paper.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{paper.description}</p>
                    </div>
                    {paper.link !== "#" && (
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:opacity-80 text-sm font-medium no-underline flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experiments Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Experiments</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm">Active concepts &amp; ideas</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {experiments.map((experiment, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {experiment.role}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                        experiment.status === "production-grade"
                          ? "bg-green-500/10 text-green-700 dark:text-green-400"
                          : "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                      }`}
                    >
                      {experiment.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {experiment.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                    {experiment.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {experiment.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Research;
