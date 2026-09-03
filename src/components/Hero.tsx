import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5 animate-fade-up">
            AI Architect · Strategy
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-foreground mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            AI architecture for work that can't afford to get it wrong.
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            I design and deliver enterprise AI systems — agentic workflows, domain-specialized
            model training, and the specifications that hold them together — for regulated,
            high-stakes environments. Founder of Kontrak IQ.
          </p>
          <div
            className="flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="https://cal.com/jeffdickerson/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium no-underline hover:no-underline hover:bg-primary/90 transition-colors"
            >
              Book a call
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium no-underline hover:no-underline hover:border-foreground transition-colors"
            >
              See case studies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
