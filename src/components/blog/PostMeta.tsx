import { cn } from '@/lib/utils';
import { formatPostDate } from '@/lib/blog/derive';
import type { Post } from '@/types/blog';

interface PostMetaProps {
  post: Post;
  className?: string;
}

export const PostMeta = ({ post, className }: PostMetaProps) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground', className)}>
      <span>{formatPostDate(post.publishedAt)}</span>
      <span aria-hidden="true">·</span>
      <span>{post.readingTime} min read</span>
    </div>
  );
};
