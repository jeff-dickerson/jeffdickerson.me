import { Badge } from '@/components/ui/badge';

export interface TagFilterOption {
  slug: string;
  label: string;
}

interface TagFilterProps {
  tags: TagFilterOption[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}

export const TagFilter = ({ tags, selected, onSelect }: TagFilterProps) => {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selected === null ? 'default' : 'outline'}
        className="cursor-pointer"
        onClick={() => onSelect(null)}
      >
        All
      </Badge>
      {tags.map((tag) => (
        <Badge
          key={tag.slug}
          variant={selected === tag.slug ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => onSelect(selected === tag.slug ? null : tag.slug)}
        >
          {tag.label}
        </Badge>
      ))}
    </div>
  );
};
