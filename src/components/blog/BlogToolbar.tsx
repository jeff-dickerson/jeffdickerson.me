import { BlogSearch } from './BlogSearch';
import { TagFilter, type TagFilterOption } from './TagFilter';
import { TOOLBAR_REVEAL_THRESHOLD } from '@/lib/blog/constants';

interface BlogToolbarProps {
  totalCount: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  tags: TagFilterOption[];
  selectedTag: string | null;
  onSelectTag: (slug: string | null) => void;
}

// Real plumbing, progressively revealed — hidden until there's enough
// content that search/filter are actually useful.
export const BlogToolbar = ({
  totalCount,
  searchValue,
  onSearchChange,
  tags,
  selectedTag,
  onSelectTag,
}: BlogToolbarProps) => {
  if (totalCount < TOOLBAR_REVEAL_THRESHOLD) return null;

  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <TagFilter tags={tags} selected={selectedTag} onSelect={onSelectTag} />
      <BlogSearch value={searchValue} onChange={onSearchChange} />
    </div>
  );
};
