import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Content = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 animate-fade-up">Content</h1>
          <p className="text-lg text-gray-600 mb-16 animate-fade-up">
            Learn with me. I regularly share my learnings on how to build interactive features with a product-first mindset.
          </p>
          {/* Content will be added here */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Content;