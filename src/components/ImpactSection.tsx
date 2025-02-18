
import { useState } from "react";

export const ImpactSection = () => {
  const [activeSection, setActiveSection] = useState("startups");

  const steps = [
    { number: "1", title: "Together, we identify major opportunities for your product." },
    { number: "2", title: "We agree upon to turn your product into a new chapter." },
    { number: "3", title: "Once committed, I start coding, exploring and polishing." },
    { number: "4", title: "We gather additional user feedback and keep improving." }
  ];

  const sectionContent = {
    startups: {
      title: "You see a market opportunity. Now you are in the midst of building the product and staffing a team?",
      description: "In the early days, shipping fast and collecting feedback is key. I help you in executing your vision — without any managerial hassle."
    },
    scaleups: {
      title: "You already validated your core product. Now it is time to listen for user feedback and scale?",
      description: "The more mature your product gets, the more important becomes product discovery. I help you in shipping the right features, built with attention to detail."
    },
    engineers: {
      title: "Looking to augment your engineering team with senior expertise?",
      description: "Whether you need help with architecture decisions or implementing complex features, I bring the technical expertise to help your team succeed."
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-bold mb-16 text-center animate-fade-up">Where my work has the most impact.</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4 flex flex-col gap-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <button 
                onClick={() => setActiveSection("startups")}
                className={`text-left text-2xl font-bold transition-all duration-200 px-4 py-2 ${
                  activeSection === "startups" 
                    ? "text-primary" 
                    : "text-gray-400 hover:text-primary/80"
                }`}
              >
                Startups
              </button>
              <button 
                onClick={() => setActiveSection("scaleups")}
                className={`text-left text-2xl font-bold transition-all duration-200 px-4 py-2 ${
                  activeSection === "scaleups" 
                    ? "text-primary" 
                    : "text-gray-400 hover:text-primary/80"
                }`}
              >
                Scale-ups
              </button>
              <button 
                onClick={() => setActiveSection("engineers")}
                className={`text-left text-2xl font-bold transition-all duration-200 px-4 py-2 ${
                  activeSection === "engineers" 
                    ? "text-primary" 
                    : "text-gray-400 hover:text-primary/80"
                }`}
              >
                Engineers
              </button>
            </div>
            <div className="md:col-span-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-2xl font-bold mb-4">
                {sectionContent[activeSection].title}
              </h3>
              <p className="text-gray-600">
                {sectionContent[activeSection].description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="bg-white p-6 rounded-xl shadow-sm animate-fade-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">
                {step.number}
              </div>
              <p className="font-medium">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
