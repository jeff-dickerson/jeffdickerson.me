import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export const CaseStudyCard = ({ study }: CaseStudyCardProps) => {
  const { slug, title, cardOutcome, date, industry, tags, image, externalUrl } = study;

  const cardInner = (
    <div className="group bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 animate-fade-up h-full flex flex-col no-underline hover:no-underline">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-6">
        <span>{date}</span>
        <span>{industry}</span>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 flex items-start justify-between gap-3">
        <span>{title}</span>
        <ArrowUpRight className="w-5 h-5 mt-1 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
      </h3>
      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
        {cardOutcome}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white dark:bg-gray-900 rounded-full text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="aspect-[16/9] bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <img
          src={image}
          alt={`${title} — visual`}
          className="w-full h-full object-cover"
        />
      </div>
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
