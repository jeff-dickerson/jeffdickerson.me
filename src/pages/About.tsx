import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight } from "lucide-react";

const businesses = [
  {
    name: "Kontrak IQ",
    role: "Founder",
    description:
      "An AI-native enterprise contract data management platform, powered by a vertical AI agent. Turns contract documents into structured, queryable data for teams that can't afford to miss what's in the fine print.",
    url: "https://kontrakiq.com",
  },
  {
    name: "Polygent Labs",
    role: "Principal",
    description:
      "Where I research, consult, and build AI products. Engagements range from system architecture and model strategy to hands-on builds — for organizations putting AI into work that matters.",
    url: "https://polygentlabs.com",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-4">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900 dark:text-white">
            AI architect, systems builder, researcher.
          </h1>

          <div className="grid grid-cols-1 gap-12">
            {/* Portrait — real photos to be expanded later */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 max-w-md">
              <img
                src="/jeff-portrait.jpg"
                alt="Jeff Dickerson"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Bio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Who I am</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    I'm an AI architect. I design and build the systems that turn AI from a demo into
                    something an organization can actually run — enterprise platforms, agentic
                    workflows, domain-specialized model training, and the specifications that hold
                    them together.
                  </p>
                  <p>
                    My work sits at the intersection of systems and software, and I'm most useful
                    where the cost of getting it wrong is real: regulated industries, high-stakes
                    migrations, and AI initiatives that have to survive contact with production.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What I do</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    I help organizations of every size put AI to work — to make sharper decisions,
                    streamline workflows, and find opportunities they couldn't see before. I've also
                    led a native blockchain build and published empirical research across several
                    ecosystems.
                  </p>
                  <p>
                    I write{" "}
                    <a
                      href="https://paragraph.com/@gfactor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-4 hover:no-underline"
                    >
                      g-Factor
                    </a>
                    , on intelligence — how we think, how machines think, and where the two meet. The
                    throughline: technology should work for us, not the other way around.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Businesses */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">My businesses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {businesses.map((b) => (
                  <a
                    key={b.name}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors no-underline hover:no-underline block"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{b.name}</h3>
                      <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                      {b.role}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {b.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
};

export default About;
