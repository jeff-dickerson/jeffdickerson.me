
import { Code, Users, Zap, Search, Monitor, BarChart } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Technical Excellence",
    description: "Clean, maintainable code that scales with your business.",
  },
  {
    icon: Users,
    title: "User-Centered",
    description: "Features that delight users and solve real problems.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Quick iterations and rapid development cycles.",
  },
  {
    icon: Search,
    title: "Deep Analysis",
    description: "Thorough understanding of your business needs.",
  },
  {
    icon: Monitor,
    title: "Modern Stack",
    description: "Latest technologies and best practices.",
  },
  {
    icon: BarChart,
    title: "Data-Driven",
    description: "Decisions backed by metrics and analytics.",
  },
];

export const Features = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
          When companies implement AI initiatives to stay lean and fast,
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
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
