import { Link } from "react-router-dom";

export const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        {/* Flex container for two-column layout on lg, stacked on mobile */}
        {/* Image appears above text on mobile due to DOM order */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-x-12 lg:gap-x-16 gap-y-10">
          
          {/* Image Column (Order changed for visual layout on lg screens) */}
          <div className="w-full lg:w-5/12 lg:order-2 flex-shrink-0 animate-fade-up text-center lg:text-left" style={{ animationDelay: "0.2s" }}>
            <img
              src="/jeff-portrait.jpg" // Make sure this image is in your public folder
              alt="Jeff Dickerson"
              className="rounded-2xl shadow-lg w-64 h-64 sm:w-80 sm:h-80 lg:w-full max-w-xs sm:max-w-sm md:max-w-md object-cover mx-auto"
            />
          </div>

          {/* Text Column (Order changed for visual layout on lg screens) */}
          <div className="w-full lg:w-7/12 lg:order-1 animate-fade-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading mb-2 text-gray-900 dark:text-gray-100">
              Hi, I'm Jeff!
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans italic text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
              autodidact, systems builder, researcher
            </h3>
            <div className="space-y-5 text-gray-700 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
              <p>
                I'm an AI architect. I design and build systems that solve real problems with AI — enterprise platforms, agentic workflows, and the specifications that hold them together. I founded Kontrak IQ, an AI-native contract data management platform, and I run Polygent Labs, where I research, consult, and build AI products. My work sits at the intersection of systems and software.
              </p>
              <p>
                I also write g-Factor, on intelligence — how we think, how machines think, and where the two meet. The throughline: technology should work for us, not the other way around.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-8 inline-block px-8 py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-full hover:opacity-90 transition-opacity text-base sm:text-lg font-medium no-underline hover:no-underline"
            >
              More about me
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};