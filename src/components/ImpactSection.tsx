import { useState } from "react";

type SegmentKey = "enterprise" | "public-sector" | "operators";

export const ImpactSection = () => {
  const [activeSection, setActiveSection] = useState<SegmentKey>("enterprise");

  const steps = [
    {
      number: "1",
      title: "Discovery",
      description:
        "Goals & requirements. We pin down the goal, the constraints, and the capability you already have — that defines the strategy, not the other way around.",
      bgColor:
        "bg-white border border-gray-200 hover:border-primary hover:shadow-md dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primary",
      chipColor: "bg-primary/10 text-primary",
    },
    {
      number: "2",
      title: "Design",
      description:
        "Infrastructure, processes & data. We map the SOPs and put your data to work — agents where they earn their place, plain automation where that's the honest answer.",
      bgColor:
        "bg-white border border-gray-200 hover:border-primary hover:shadow-md dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primary",
      chipColor: "bg-primary/10 text-primary",
    },
    {
      number: "3",
      title: "Enablement",
      description:
        "Project enablement. We operationalize, test against real conditions — not a sanitized demo — and put the solution into production.",
      bgColor:
        "bg-white border border-gray-200 hover:border-primary hover:shadow-md dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primary",
      chipColor: "bg-primary/10 text-primary",
    },
    {
      number: "4",
      title: "Handoff",
      description:
        "You walk away with a working AI system your team owns — documented, tested, and runnable without me. And your people are more AI-native than when we started.",
      bgColor: "bg-primary border border-primary hover:opacity-90",
      chipColor: "bg-white/20 text-white",
    },
  ];

  const sectionContent: Record<SegmentKey, { title: string; description: string }> = {
    enterprise: {
      title:
        "You have an AI initiative on the roadmap, but not the in-house capacity to architect it right.",
      description:
        "I design and deliver the system end-to-end and align it to the outcome you're accountable for — so the work doesn't stall in the gap between strategy and production.",
    },
    "public-sector": {
      title:
        "You're modernizing under real constraints — compliance, legacy systems, public accountability — and need AI done without the usual risk.",
      description:
        "I help public-sector teams turn mission-critical goals into defensible AI strategy and architecture.",
    },
    operators: {
      title:
        "You and your people need to become AI-native — not buy another tool, but change how the work actually gets done.",
      description:
        "I design human-AI alignment across your workflows, systems, and decisions, so your operators and professionals work with AI by default instead of around it.",
    },
  };

  const segments: { key: SegmentKey; label: string }[] = [
    { key: "enterprise", label: "Enterprise" },
    { key: "public-sector", label: "Public Sector" },
    { key: "operators", label: "Operators" },
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-heading font-normal mb-8 md:mb-16 text-center animate-fade-up text-gray-900 dark:text-white">
          Where my work has the most impact.
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 mb-8 md:mb-16">
            <div
              className="md:col-span-4 flex flex-col gap-4 md:gap-6 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              {segments.map((seg) => (
                <button
                  key={seg.key}
                  onClick={() => setActiveSection(seg.key)}
                  className={`text-left text-3xl leading-tight font-heading font-semibold transition-all duration-200 px-4 py-2 rounded-lg ${
                    activeSection === seg.key
                      ? "text-primary bg-primary/10 border border-primary/30"
                      : "text-gray-400 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 dark:text-gray-500 dark:hover:text-primary"
                  }`}
                >
                  {seg.label}
                </button>
              ))}
            </div>
            <div className="md:col-span-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {sectionContent[activeSection].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                {sectionContent[activeSection].description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`${step.bgColor} p-6 rounded-xl shadow-sm animate-fade-up transition-all duration-300 cursor-pointer`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="mb-4">
                <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${step.chipColor}`}>
                  {step.number === "4" ? "Done" : `Step ${step.number}`}
                </span>
              </div>
              <h3
                className={`text-2xl font-bold mb-2 ${
                  step.number === "4" ? "text-white" : "text-gray-900 dark:text-white"
                }`}
              >
                {step.title}
              </h3>
              <p className={`text-sm ${step.number === "4" ? "text-white/80" : "text-gray-700 dark:text-gray-300"}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
