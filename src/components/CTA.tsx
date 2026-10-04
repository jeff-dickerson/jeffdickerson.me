import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Deliberately fixed dark palette — this full-bleed band should stay dark
// in both themes (with an inverse light button), not flip with the
// design tokens like the rest of the site.
export const CTA = () => {
  return (
    <section className="py-20 bg-neutral-950 text-neutral-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-400 mb-4 animate-fade-up">
            If this is your problem
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            I take on a small number of these a year.
          </h2>
          <p className="text-lg text-neutral-300 mb-8 animate-fade-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
            If you're staring at a migration, a model decision, or an AI system design where the cost
            of getting it wrong is real — send a short note describing the situation. I'll tell you
            whether or not it's a fit.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-neutral-50 text-neutral-950 hover:bg-neutral-200 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a href="https://cal.com/jeffdickerson/15min" target="_blank" rel="noopener noreferrer">
              Book a call
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
