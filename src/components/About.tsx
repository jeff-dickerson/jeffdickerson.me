export const About = () => {
  return (
    <section id="about" className="pt-36 pb-20 bg-gray-50 dark:bg-slate-800">
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
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans italic text-primary mb-6 sm:mb-8">
              autodidact, reimagineer and researcher
            </h3>
            <div className="space-y-5 text-gray-700 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
              <p>
                I'm an AI architect, which is just a fancy way of saying I build smart tools and systems that solve real-world problems using artificial intelligence. I'm the founder of Kontrak IQ, an enterprise contract data management platform powered by a vertical AI Agent. My expertise sits at the intersection of systems and software development.
              </p>
              <p>
                Every two weeks, I publish G-Factor, where I dive into ideas about intelligence—how we think, how machines think, and how the two intersect. I believe technology should work for us—not the other way around. And I'm here to help make that happen.
              </p>
            </div>
            <button className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 dark:bg-primary dark:text-primary-foreground dark:hover:bg-opacity-80 transition-colors text-base sm:text-lg font-medium">
              Learn More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};