import { useEffect, useMemo, useState } from 'react';
import { getPosts } from '@/lib/paragraph';
import { normalizeParagraphPost } from '@/lib/blog/normalize';
import { localPosts } from '@/lib/localPosts';
import { usePosts, isDraftVisible } from './usePosts';
import type { Post } from '@/types/blog';

const DEEP_LINK_FETCH_LIMIT = 100;

// Checks, in order: local frontmatter (synchronous, survives an API
// outage, gated by the same draft-visibility rule as the index page), the
// merged list from usePosts() (shares its query — react-query dedupes
// concurrent calls to the same key, so a sibling usePosts() call on the same
// page, e.g. for prev/next, costs zero extra requests), and finally a
// one-shot fetch for deep links that land past the first page.
export function usePost(slug: string | undefined) {
  const { posts, isPending, isFetching } = usePosts();
  const [fallbackPost, setFallbackPost] = useState<Post | null>(null);
  const [isFetchingFallback, setIsFetchingFallback] = useState(false);

  const localPost = useMemo(() => {
    const found = localPosts.find((post) => post.slug === slug);
    return found && isDraftVisible(found) ? found : undefined;
  }, [slug]);

  const listPost = useMemo(() => posts.find((post) => post.slug === slug), [posts, slug]);

  useEffect(() => {
    setFallbackPost(null);
    // Wait for the shared list to settle before assuming the post is
    // genuinely missing beyond it — avoids firing a redundant fetch while
    // usePosts()'s own request for the same data is already in flight.
    if (!slug || localPost || listPost || isPending || isFetching) return;

    let cancelled = false;
    setIsFetchingFallback(true);

    getPosts({ limit: DEEP_LINK_FETCH_LIMIT, includeContent: true })
      .then((response) => {
        if (cancelled) return;
        const match = response.items.find((item) => item.slug === slug);
        setFallbackPost(match ? normalizeParagraphPost(match) : null);
      })
      .catch(() => {
        if (!cancelled) setFallbackPost(null);
      })
      .finally(() => {
        if (!cancelled) setIsFetchingFallback(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, localPost, listPost, isPending, isFetching]);

  const post = localPost ?? listPost ?? fallbackPost ?? undefined;
  const isLoading = !post && (isPending || isFetchingFallback);

  return { post, isLoading };
}
