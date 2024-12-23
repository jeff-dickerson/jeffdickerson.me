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
          When companies try to stay lean and fast,
          <br />
          pure technical acumen isn't enough.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};