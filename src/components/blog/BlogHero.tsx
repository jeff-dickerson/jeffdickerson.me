import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { PostMeta } from './PostMeta';
import type { Post } from '@/types/blog';

const FALLBACK_COVER = '/placeholder.svg';

interface BlogHeroProps {
  post: Post;
}

export const BlogHero = ({ post }: BlogHeroProps) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group mb-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card no-underline text-foreground md:grid-cols-2"
    >
      <AspectRatio ratio={16 / 9}>
        <img
          src={post.coverImageUrl || FALLBACK_COVER}
          alt={post.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_COVER;
          }}
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
        <Badge variant="secondary" className="w-fit">
          Latest
        </Badge>
        <h2 className="text-3xl font-bold leading-tight transition-colors group-hover:text-primary md:text-4xl">
          {post.title}
        </h2>
        <p className="text-muted-foreground">{post.excerpt}</p>
        <PostMeta post={post} />
      </div>
    </Link>
  );
};
