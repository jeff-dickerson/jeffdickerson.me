import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogNoticeProps {
  message: string;
  onDismiss?: () => void;
}

// Inline, dismissible — never a full-page takeover. The old Blog.tsx
// replaced the entire page with an error on API failure, which is why
// /blog was a dead end; local posts must still render underneath this.
export const BlogNotice = ({ message, onDismiss }: BlogNoticeProps) => {
  return (
    <div className="mb-8 flex items-start gap-3 rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="flex-1">{message}</p>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0"
          onClick={onDismiss}
          aria-label="Dismiss notice"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
