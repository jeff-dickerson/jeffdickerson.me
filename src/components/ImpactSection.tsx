
import { useState } from "react";

export const ImpactSection = () => {
  const [activeSection, setActiveSection] = useState("enterprise");

  const steps = [
    { number: "1", title: "Together, we identify major opportunities for your product." },
    { number: "2", title: "We agree upon to turn your product into a new chapter." },
    { number: "3", title: "Once committed, I start coding, exploring and polishing." },
    { number: "4", title: "We gather additional user feedback and keep improving." }
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
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm animate-fade-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">
                {step.number}
              </div>
              <p className="font-medium text-sm md:text-base">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
