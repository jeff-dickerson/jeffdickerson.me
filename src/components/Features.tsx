import { Workflow, Database, GraduationCap, Boxes, Gauge, Network } from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Agentic workflows",
    description:
      "You need AI agents that actually execute work — task automation, value capture, and data-intelligence pipelines that hold up in production.",
  },
  {
    icon: Database,
    title: "Proprietary-data systems",
    description:
      "You want to put your own data and domain expertise to work — LLM systems that orchestrate process around what only your organization knows.",
  },
  {
    icon: GraduationCap,
    title: "GenAI literacy",
    description:
      "Your team needs to get fluent in AI — the practical kind — to stay competitive in a labor market that's repricing fast.",
  },
  {
    icon: Boxes,
    title: "AI + tokenization",
    description:
      "You're pairing AI with blockchain tokenization and need someone who can architect across both without hand-waving.",
  },
  {
    icon: Gauge,
    title: "Modernization",
    description:
      "You're modernizing a digital-transformation effort to accelerate growth or capture share, and the AI layer has to be done right.",
  },
  {
    icon: Network,
    title: "Unified data infrastructure",
    description:
      "You need the plumbing — a unified infrastructure that connects your data to your AI initiatives instead of stranding it in silos.",
  },
];

export const Features = () => {
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4 animate-fade-up text-gray-900 dark:text-white">
          Where I come in.
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          When organizations move on AI, strategic integration and data quality decide whether it
          ships or stalls. These are the shapes of problem I take on.
        </p>
        <div className="grid grid-cols-1 justify-items-start gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-12 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-start space-x-4 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className="w-7 h-7 text-gray-900 dark:text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
