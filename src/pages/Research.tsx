import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Users, Download } from "lucide-react";
import { useState } from "react";

const categories = [
  "All Categories",
  "Engineering",
  "Future of Work",
  "Systems",
  "Machine Learning",
  "Generative AI",
  "Crypto/Blockchain",
  "Deep Learning",
  "LLM",
  "AI Agents",
  "Privacy/Security"
];

const Research = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  // Theory section data (Academic Papers style)
  const theoryPapers = [
    {
      title: "Intelligent Threats: Security and Vulnerabilities of LLMS and AI AGents in the Enterprise",
      category: "Privacy/Security",
      link: "#",
      description: "Comprehensive analysis of securities challenges of GenAI, including SOTA tech like MCP and A2A."
    },
    {
      title: "Experience Report: An Empirical Study of PHP Security Mechanism Usage",
      category: "Privacy/Security",
      link: "#",
      description: "Large-scale study of PHP security practices in real-world applications."
    },
    {
      title: "Knowledge Constrained Adaptive Agent - Background and Analysis",
      category: "AI Agents",
      link: "#",
      description: "Cutting edge Research on Agents that leverage epistemology, composability and security."

    },
    {
      title: "Advanced Neural Network Architectures for Computer Vision",
      category: "Deep Learning",
      link: "#",
      description: "Research on next-generation CNN architectures for image recognition tasks."
    },
    {
      title: "Large Language Model Fine-tuning for Domain-Specific Applications",
      category: "LLM",
      link: "#",
      description: "Techniques for adapting pre-trained language models to specialized domains."
    },
    {
      title: "Multi-Agent Reinforcement Learning in Distributed Systems",
      category: "AI Agents",
      link: "#",
      description: "Coordination strategies for autonomous agents in complex environments."
    }
  ];

  // Experiments section data (Team style with cards)
  const experiments = [
    {
      name: "AI-Powered Contract Analysis",
      role: "Machine Learning Experiment",
      description: "Developing NLP models for automated contract clause extraction, risk assessment and value capture.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=400&fit=crop",
      status: "production-grade",
      technologies: ["Python", "Transformers", "TensorFlow"]
    },
    {
      name: "Autonomous Network Engineering",
      role: "System Tool Development",
      description: "Natural language commands for system admin & networking agent support tool for IT operations.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop",
      status: "production-grade",
      technologies: ["OpenAI API", "Python", "Cisco pyATS-genie"]
    },
    {
      name: "Federated Learning Framework",
      role: "Distributed AI Research",
      description: "Implementing privacy-preserving machine learning across decentralized networks.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop",
      status: "concept",
      technologies: ["PyTorch", "Differential Privacy", "Nvidia Transformers"]
    },
    {
      name: "Insurtech Agents",
      role: "Agentic Model Innovation",
      description: "Multi-agent orchestration pipeline for actuarial risk modeling, underwriting and claims processing.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop",
      status: "concept",
      technologies: ["Scikit-learn", "vLLM + K8s", "Apache Kafka"]
    }
  ];

  const filteredPapers = selectedCategory === "All Categories"
    ? theoryPapers
    : theoryPapers.filter(paper => paper.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-heading mb-8">Research</h1>

          {/* Theory Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Theory</h2>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download All
              </Button>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
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
                <div key={index} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-medium">{paper.category}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary cursor-pointer">
                        {paper.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {paper.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary hover:text-primary/80">
                      <ExternalLink className="w-4 h-4" />
                      View
                    </Button>
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
                <span className="text-sm">See Active Concepts & Ideas</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {experiments.map((experiment, index) => (
                <div key={index} className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-border">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={experiment.image}
                      alt={experiment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground text-sm">
                        {experiment.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        experiment.status === 'production-grade'
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                          : 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                      }`}>
                        {experiment.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs mb-3">
                      {experiment.role}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {experiment.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {experiment.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
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