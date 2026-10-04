import { Link } from "react-router-dom";

interface Offer {
  tier: string;
  rate?: string;
  description: string;
}

const Card = ({ role, offers }: { role: string; offers: Offer[] }) => (
  <div className="h-full rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-lg">
    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
      You primarily need a
    </p>
    <h3 className="text-3xl font-bold mb-8 text-foreground">{role}</h3>
    <div className="divide-y divide-border">
      {offers.map((offer) => (
        <div key={offer.tier} className="py-5 first:pt-0 last:pb-0">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <p className="text-sm font-semibold text-foreground">{offer.tier}</p>
            {offer.rate && (
              <p className="text-sm tabular-nums text-muted-foreground whitespace-nowrap">
                {offer.rate}
              </p>
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed">{offer.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export const CombiningSection = () => {
  return (
    <section className="py-20 bg-muted">
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
            role="Senior AI Architect"
            offers={[
              {
                tier: "Market-value work",
                description:
                  "I'll turn your AI requirements into a buildable plan — delivering architecture diagrams, technical specifications, implementation priorities, and documented decisions for your engineering team.",
              },
              {
                tier: "High-impact work",
                rate: "$165–$225/hr",
                description:
                  "I will design and lead your end-to-end AI architecture — the workflows, data and platform integrations, security controls, LLMOps, evaluation standards, and operating artifacts your team can actually run.",
              },
            ]}
          />
          <Card
            role="Solutions Engineer / AI Engineer"
            offers={[
              {
                tier: "Market-value work",
                description:
                  "I'll build and integrate AI workflows within your existing architecture — delivering working code, a tested prototype or feature, setup documentation, and a handoff your team can use.",
              },
              {
                tier: "High-impact work",
                rate: "$135–$185/hr",
                description:
                  "I will take your AI use case from discovery through production — designing the solution, building the integrations, defining quality tests and success measures, and handing over a system your team can monitor and maintain.",
              },
            ]}
          />
        </div>

        <div className="text-center mt-10 animate-fade-up">
          <Link
            to="/case-studies"
            className="text-sm font-medium text-muted-foreground hover:text-primary underline-offset-4 transition-colors"
          >
            See how this has played out →
          </Link>
        </div>
      </div>
    </section>
  );
};
