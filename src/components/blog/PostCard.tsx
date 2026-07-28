import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { PostMeta } from './PostMeta';
import type { Post } from '@/types/blog';

const FALLBACK_COVER = '/placeholder.svg';

interface PostCardProps {
  post: Post;
}

// A real <Link>, not a click-handler div — keyboard focus, middle-click, and
// crawlable hrefs all come for free. `no-underline text-foreground` override
// src/index.css's global `a { text-primary }` / `a:hover { underline }`,
// which would otherwise underline the whole card on hover.
export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={`/blog/${post.slug}`} className="group block h-full no-underline text-foreground">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-lg">
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
        <CardContent className="flex flex-1 flex-col gap-3 p-5">
          <PostMeta post={post} />
          <h3 className="text-xl font-bold leading-snug transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
          {post.tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
