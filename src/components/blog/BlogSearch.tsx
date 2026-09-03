import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const BlogSearch = ({ value, onChange }: BlogSearchProps) => {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search articles..."
        className="pl-9"
        aria-label="Search articles"
      />
    </div>
  );
};
