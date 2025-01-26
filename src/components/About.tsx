export const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl font-bold mb-6">Hi, I'm Jeff!</h2>
            <p className="text-gray-600 mb-6">
              I'm an AI architect, which is just a fancy way of saying I build smart tools and systems that solve real-world problems using artificial intelligence. I'm the founder of Kontrak IQ, an enterprise contract data management platform powered by a vertical AI Agent. My expertise sits at the intersection of systems and software development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-6">
                  I focus on making AI less intimidating and more meaningful. Whether it's designing products, creating strategies, or just sharing insights, my goal is to bridge the gap between humans and advanced tech in a way that feels purposeful.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">What I Do</h3>
                <p className="text-gray-600 mb-6">
                  I love experimenting with and contributing to blockchain and crypto projects, having led a native build and published empirical research on several ecosystems. I'm passionate about how technology shapes our lives and use my expertise to help organizations of all sizes harness AI to make smarter decisions, streamline workflows, and discover untapped opportunities.
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Every two weeks, I publish G-Factor, where I dive into ideas about intelligence—how we think, how machines think, and how the two intersect. I believe technology should work for us—not the other way around. And I'm here to help make that happen.
            </p>
            <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Learn More
            </button>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"
              alt="Working on laptop"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};