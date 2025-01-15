import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading mb-8">About</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Hi, I'm Jeff!</h2>
              <p className="text-gray-600 mb-6">
                I'm an AI architect, which is just a fancy way of saying I build smart tools and systems that solve real-world problems using artificial intelligence. I'm the founder of Kontrak IQ, an enterprise contract data management platform powered by a vertical AI Agent. My expertise sits at the intersection of systems and software development.
              </p>
              <p className="text-gray-600 mb-6">
                I focus on making AI less intimidating and more meaningful. Whether it's designing products, creating strategies, or just sharing insights, my goal is to bridge the gap between humans and advanced tech in a way that feels purposeful.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">What I Do</h2>
              <p className="text-gray-600 mb-6">
                I love experimenting with and contributing to blockchain and crypto projects, having led a native build and published empirical research on several ecosystems. I'm passionate about how technology shapes our lives and use my expertise to help organizations of all sizes harness AI to make smarter decisions, streamline workflows, and discover untapped opportunities.
              </p>
              <p className="text-gray-600">
                Every two weeks, I publish G-Factor, where I dive into ideas about intelligence—how we think, how machines think, and how the two intersect. I believe technology should work for us—not the other way around. And I'm here to help make that happen.
              </p>
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