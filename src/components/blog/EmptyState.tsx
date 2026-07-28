interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = 'No posts yet',
  description = 'Check back soon — new articles are on the way.',
}: EmptyStateProps) => (
  <div className="rounded-xl border border-dashed border-border py-20 text-center">
    <p className="text-lg font-medium text-foreground">{title}</p>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
  </div>
);
