import { PostCard } from './PostCard';
import { PostCardSkeleton } from './PostCardSkeleton';
import type { Post } from '@/types/blog';

interface PostGridProps {
  posts: Post[];
  isLoading?: boolean;
  skeletonCount?: number;
}

// No fixed pixel widths — the old cards were w-[704px] h-[280px] and
// overflowed mobile. This is a responsive grid that reflows at every width.
export const PostGrid = ({ posts, isLoading = false, skeletonCount = 6 }: PostGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
