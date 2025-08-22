import { motion } from "framer-motion";
import { Check } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="block animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Writing code,
            </span>
            <span className="block animate-fade-up" style={{ animationDelay: "0.4s" }}>
              thinking productivity.
            </span>
          </h1>
          <p className="text-xl text-gray-600 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            Front load your production tools for success and execution<br />
            using AI. For engineers, startups and Scale-ups.
          </p>
          <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <a 
              href="https://cal.com/jeffdickerson/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors inline-block text-center"
            >
              Book Free Call
            </a>
            <div className="flex justify-center space-x-8 mt-6">
              <div className="flex items-center space-x-2">
                <Check className="text-primary" />
                <span>20min call</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="text-primary" />
                <span>Get product feedback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};