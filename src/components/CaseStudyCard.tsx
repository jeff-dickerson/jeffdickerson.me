import { ArrowUpRight } from "lucide-react";

interface CaseStudyCardProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
}

export const CaseStudyCard = ({ title, description, date, tags, image }: CaseStudyCardProps) => {
  return (
    <div className="group bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300 animate-fade-up">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <span className="text-sm text-gray-500">{date}</span>
          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
            {title}
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </h3>
          <p className="text-gray-600">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white rounded-full text-sm text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="relative h-[200px] md:h-auto">
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