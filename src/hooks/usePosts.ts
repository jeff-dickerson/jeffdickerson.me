import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getPosts } from '@/lib/paragraph';
import { normalizeParagraphPost } from '@/lib/blog/normalize';
import { localPosts } from '@/lib/localPosts';
import { blogKeys } from '@/lib/blog/queryKeys';
import { PAGE_SIZE } from '@/lib/blog/constants';
import type { Post } from '@/types/blog';

export function isDraftVisible(post: Post): boolean {
  if (!post.draft) return true;
  if (import.meta.env.DEV) return true;
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('preview') === '1';
}

export function usePosts() {
  const query = useInfiniteQuery({
    queryKey: blogKeys.postsInfinite(),
    queryFn: ({ pageParam }) =>
      getPosts({ limit: PAGE_SIZE, cursor: pageParam as string | undefined, includeContent: true }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.cursor ?? undefined : undefined,
  });

  // Local posts are a complete synchronous set — never paginated by the API
  // cursor, and rendered even when the Paragraph fetch is failing.
  const visibleLocalPosts = useMemo(() => localPosts.filter(isDraftVisible), []);

  const posts = useMemo(() => {
    const remote = (query.data?.pages ?? [])
      .flatMap((page) => page.items)
      .map(normalizeParagraphPost);

    // Remote wins on slug collision.
    const bySlug = new Map<string, Post>();
    for (const post of remote) bySlug.set(post.slug, post);
    for (const post of visibleLocalPosts) {
      if (!bySlug.has(post.slug)) bySlug.set(post.slug, post);
    }

    return Array.from(bySlug.values()).sort((a, b) => b.publishedAt - a.publishedAt);
  }, [query.data, visibleLocalPosts]);

  const remoteTotal = query.data?.pages?.[0]?.pagination.total ?? 0;
  const totalCount = remoteTotal + visibleLocalPosts.length;

  return {
    ...query,
    posts,
    totalCount,
  };
}
