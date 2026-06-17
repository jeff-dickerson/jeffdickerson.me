import { ArrowUpRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-4 animate-fade-up">
            If this is your problem
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            I take on a small number of these a year.
          </h2>
          <p className="text-lg text-gray-300 mb-8 animate-fade-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
            If you're staring at a migration, a model decision, or an AI system design where the cost
            of getting it wrong is real — send a short note describing the situation. I'll tell you
            whether or not it's a fit.
          </p>
          <a
            href="https://cal.com/jeffdickerson/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors animate-fade-up no-underline hover:no-underline font-medium"
            style={{ animationDelay: "0.3s" }}
          >
            Book a call
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
