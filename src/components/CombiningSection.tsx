import { Link } from "react-router-dom";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const Card = ({
  role,
  points,
}: {
  role: string;
  points: string[];
}) => (
  <BackgroundGradient className="rounded-[22px] bg-card h-full">
    <div className="w-full h-full p-8 sm:p-10 rounded-[20px] flex flex-col">
      <p className="text-sm text-muted-foreground mb-1">You primarily need an</p>
      <h3 className="text-2xl font-bold mb-6 text-foreground">{role}</h3>
      <ul className="space-y-4 flex-1">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-muted-foreground">
            <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <a
        href="https://cal.com/jeffdickerson/15min"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors inline-block text-center self-start font-medium no-underline hover:no-underline"
      >
        Schedule a call
      </a>
    </div>
  </BackgroundGradient>
);

export const CombiningSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-5 animate-fade-up text-foreground">
          Two ways I plug in.
        </h2>
        <p
          className="text-lg text-center text-muted-foreground mb-14 max-w-2xl mx-auto animate-fade-up leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          Most engagements need one of these more than the other. Tell me which problem you're
          staring at and I'll tell you which one you actually need.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          <Card
            role="AI Architect"
            points={[
              "I design end-to-end AI systems — the workflows, the specs, the MLOps, and the artifacts your team can actually run.",
              "I align the initiative to the outcome, so the build maps to a result you can defend.",
            ]}
          />
          <Card
            role="AI Engineer"
            points={[
              "I build the system — scalable models and pipelines tuned to your objectives, not a demo.",
              "I shorten time-to-value with a tight path from chosen proof-of-concept to production.",
            ]}
          />
        </div>

        <div className="text-center mt-10 animate-fade-up">
          <Link
            to="/case-studies"
            className="text-sm font-medium text-muted-foreground hover:text-primary underline-offset-4"
          >
            See how this has played out →
          </Link>
        </div>
      </div>
    </section>
  );
};
