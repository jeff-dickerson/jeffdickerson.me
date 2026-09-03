import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "@/data/caseStudies";
import { CaseStudyCover } from "@/components/case-studies/CaseStudyCover";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export const CaseStudyCard = ({ study }: CaseStudyCardProps) => {
  const { slug, title, cardOutcome, date, industry, tags, cover, externalUrl } = study;

  const cardInner = (
    <div className="group bg-muted rounded-2xl p-8 hover:bg-muted/70 transition-all duration-300 animate-fade-up h-full flex flex-col no-underline hover:no-underline">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
        <span>{date}</span>
        <span>{industry}</span>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 flex items-start justify-between gap-3">
        <span>{title}</span>
        <ArrowUpRight className="w-5 h-5 mt-1 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
      </h3>
      <p className="text-base text-muted-foreground leading-relaxed mb-6 flex-grow">
        {cardOutcome}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-background rounded-full text-xs text-muted-foreground border border-border"
          >
            {tag}
          </span>
        ))}
      </div>
      <CaseStudyCover variant={cover} />
    </div>
  );

  if (externalUrl) {
    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline hover:no-underline focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
      >
        {cardInner}
      </a>
    );
  }

  return (
    <Link
      to={`/case-studies/${slug}`}
      className="block no-underline hover:no-underline focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
    >
      {cardInner}
    </Link>
  );
};
