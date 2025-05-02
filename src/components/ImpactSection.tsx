
import { useState } from "react";

export const ImpactSection = () => {
  const [activeSection, setActiveSection] = useState("enterprise");

  const steps = [
    { 
      number: "1", 
      title: "Goals & Requirements", 
      description: "We identify your goals, objectives and technology capabilities. Next, we define requirements which determines our strategy to enablement.",
      bgColor: "bg-white", 
      chipColor: "bg-primary/20 text-primary"
    },
    { 
      number: "2", 
      title: "Infrastructure, Processes & Data", 
      description: "Based on Reqs, we gather SOPs then leverage data for intelligence and best outcomes. Agents are great, but sometimes automation does the job!",
      bgColor: "bg-white",
      chipColor: "bg-primary/20 text-primary"
    },
    { 
      number: "3", 
      title: "Project Enablement", 
      description: "Once we operationalize, then we test performance and put the solutions into production.",
      bgColor: "bg-white",
      chipColor: "bg-primary/20 text-primary"
    },
    { 
      number: "4", 
      title: "Done", 
      description: "You now possess a skills and competences library/database to help you with your strategic workforce planning efforts. Employees can now also keep a track of their skills development, goals and skill-gaps.",
      bgColor: "bg-[#7F00FF]",
      chipColor: "bg-white/20 text-white"
    }
  ];

  const sectionContent = {
    enterprise: {
      title: "AI agents and intelligent automation has brought tailwinds for industries. You have in scope an AI initiative for growth but have resource constraints?",
      description: "In the early days, shipping fast and collecting feedback is key. I help you in executing your vision — without any managerial hassle."
    },
    scaleups: {
      title: "You have validated your core product or service. Now, you want to boost market value or increase productivity but lack the AI expertise?",
      description: "AI Engineering sits at the intersection of Machine Learning research and software implementation. I help you create AI strategies to improve workflows and outputs that better serve a market or your stakeholders."
    },
    engineers: {
      title: "Looking to augment your engineering team with senior expertise?",
      description: "Whether you need help with architecture decisions or implementing complex features, I bring the technical expertise to help your team succeed."
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-heading font-normal mb-8 md:mb-16 text-center animate-fade-up">Where my work has the most impact.</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 mb-8 md:mb-16">
            <div className="md:col-span-4 flex flex-col gap-4 md:gap-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <button 
                onClick={() => setActiveSection("enterprise")}
                className={`text-left text-[36px] leading-tight font-heading font-normal transition-all duration-200 px-4 py-2 ${
                  activeSection === "enterprise" 
                    ? "text-primary" 
                    : "text-gray-400 hover:text-primary/80"
                }`}
              >
                Enterprise
              </button>
              <button 
                onClick={() => setActiveSection("scaleups")}
                className={`text-left text-[36px] leading-tight font-heading font-normal transition-all duration-200 px-4 py-2 ${
                  activeSection === "scaleups" 
                    ? "text-primary" 
                    : "text-gray-400 hover:text-primary/80"
                }`}
              >
                Scale-ups
              </button>
              <button 
                onClick={() => setActiveSection("engineers")}
                className={`text-left text-[36px] leading-tight font-heading font-normal transition-all duration-200 px-4 py-2 ${
                  activeSection === "engineers" 
                    ? "text-primary" 
                    : "text-gray-400 hover:text-primary/80"
                }`}
              >
                Engineers
              </button>
            </div>
            <div className="md:col-span-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                {sectionContent[activeSection].title}
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                {sectionContent[activeSection].description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`${step.bgColor} p-6 rounded-xl shadow-sm animate-fade-up`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="mb-4">
                <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${step.chipColor}`}>
                  {step.number === "4" ? "Done" : `Step ${step.number}`}
                </span>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${step.number === "4" ? "text-white" : "text-gray-900"}`}>{step.title}</h3>
              <p className={`text-sm ${step.number === "4" ? "text-white/80" : "text-gray-700"}`}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
