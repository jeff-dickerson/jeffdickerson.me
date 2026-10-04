import type { ReactNode } from 'react';
import { FileText } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({
  title = 'No posts yet',
  description = 'Check back soon — new articles are on the way.',
  action,
}: EmptyStateProps) => (
  <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
    <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-muted">
      <FileText className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
    </span>
    <p className="text-lg font-medium text-foreground">{title}</p>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);
