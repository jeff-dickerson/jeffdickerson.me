import { ChevronDown } from 'lucide-react';
import { badgeVariants } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface TagFilterOption {
  slug: string;
  label: string;
}

interface TagFilterProps {
  tags: TagFilterOption[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}

const VISIBLE_TAGS = 5;

const chipClass = (active: boolean) =>
  cn(
    badgeVariants({ variant: active ? 'default' : 'outline' }),
    'max-w-[12rem] cursor-pointer',
    !active && 'hover:border-foreground',
  );

// `tags` arrives most-used first. Only the top few get a chip; the long
// tail lives in the "More" menu so the toolbar stays on one row.
export const TagFilter = ({ tags, selected, onSelect }: TagFilterProps) => {
  if (tags.length === 0) return null;

  const visible = tags.slice(0, VISIBLE_TAGS);
  const overflow = tags.slice(VISIBLE_TAGS);
  const selectedOverflow = overflow.find((tag) => tag.slug === selected);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        aria-pressed={selected === null}
        className={chipClass(selected === null)}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {visible.map((tag) => (
        <button
          key={tag.slug}
          type="button"
          aria-pressed={selected === tag.slug}
          className={chipClass(selected === tag.slug)}
          onClick={() => onSelect(selected === tag.slug ? null : tag.slug)}
        >
          <span className="truncate">{tag.label}</span>
        </button>
      ))}
      {overflow.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(chipClass(!!selectedOverflow), 'gap-1')}>
            <span className="truncate">{selectedOverflow ? selectedOverflow.label : 'More'}</span>
            <ChevronDown className="h-3 w-3 shrink-0" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
            <DropdownMenuRadioGroup
              value={selectedOverflow?.slug ?? ''}
              onValueChange={(slug) => onSelect(slug === selected ? null : slug)}
            >
              {overflow.map((tag) => (
                <DropdownMenuRadioItem key={tag.slug} value={tag.slug}>
                  {tag.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
