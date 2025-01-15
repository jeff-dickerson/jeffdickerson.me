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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <img
              src="/lovable-uploads/be3876d3-c20b-4d60-a7dc-69c53cb1f62a.png"
              alt="About section inspiration"
              className="rounded-lg shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold mb-4">How do you think about technology futures?</h2>
              <p className="text-gray-600 mb-6">
                I work with organizations across sectors and industries to help them get better at research, strategy and consulting for clients, including healthy, data-aware helping people understand their questions to ask.
              </p>
              <p className="text-gray-600">
                I write and speak about what I'm seeing. I'm trying to understand, publish a weekly newsletter and give presentations putting together these ideas.
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