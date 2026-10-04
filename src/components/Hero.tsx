import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <Button asChild size="lg">
              <a href="https://cal.com/jeffdickerson/15min" target="_blank" rel="noopener noreferrer">
                Book a call
                <ArrowUpRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/case-studies">See case studies</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
