import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface CaseStudyCardProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
}

export const CaseStudyCard = ({ title, description, date, tags, image }: CaseStudyCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
        group bg-muted rounded-2xl p-8 hover:bg-muted/70
        transition-all duration-300 animate-fade-up cursor-pointer
        ${isExpanded ? 'w-full' : 'w-[48%] mx-auto'}
      `}
    >
      <div className={`
        grid gap-8
        ${isExpanded ? 'md:grid-cols-2' : 'grid-cols-1'}
      `}>
        <div className="space-y-4">
          <span className="text-sm text-muted-foreground">{date}</span>
          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
            {title}
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </h3>
          <p className={`
            text-muted-foreground transition-all duration-300
            ${isExpanded ? 'block' : 'line-clamp-2'}
          `}>
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-background rounded-full text-sm text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={`
          relative transition-all duration-300
          ${isExpanded ? 'h-[300px]' : 'h-[150px]'}
        `}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};