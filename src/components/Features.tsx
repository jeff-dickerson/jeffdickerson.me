import { Code, Users, Zap, Search, Monitor, BarChart } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Technical Excellence",
    description: "You need AI Agents to enhance productivity in task execution, value capture, or data intelligence strategies.",
  },
  {
    icon: Users,
    title: "Human-Centered",
    description: "You wish to use LLM/AI to optimize your process orchestration leveraging proprietary data and domain expertise.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "You need to become GenAI literate to upskill for a competitive digital labor market.",
  },
  {
    icon: Search,
    title: "Deep Analysis",
    description: "You seek to pair AI with blockchain tokenization to get things done in digital environments.",
  },
  {
    icon: Monitor,
    title: "Modern Stack",
    description: "You wish to modernize your digital transformation to accelerate growth or capture market share.",
  },
  {
    icon: BarChart,
    title: "Data-Driven",
    description: "You need a unified infrastructure to connect your data to your AI initiatives.",
  },
];

export const Features = () => {
  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
          When companies implement AI initiatives,
          <br />
          strategic integration and data quality is key.
        </h2>
        <div className="grid grid-cols-1 justify-items-center gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-16 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-start space-x-4 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
