import { useEffect, useMemo, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { BlogHero } from "@/components/blog/BlogHero";
import { PostGrid } from "@/components/blog/PostGrid";
import { BlogToolbar } from "@/components/blog/BlogToolbar";
import { InfiniteScrollSentinel } from "@/components/blog/InfiniteScrollSentinel";
import { EmptyState } from "@/components/blog/EmptyState";
import { BlogNotice } from "@/components/blog/BlogNotice";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import type { TagFilterOption } from "@/components/blog/TagFilter";
import { usePosts } from "@/hooks/usePosts";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { tagSlug } from "@/lib/blog/normalize";
import { trackCategoryFilter, trackEvent } from "@/lib/analytics";
import { Loader2 } from "lucide-react";

const Blog = () => {
  const {
    posts,
    totalCount,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebouncedValue(searchValue, 250);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [noticeDismissed, setNoticeDismissed] = useState(false);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      trackEvent("blog_search", { query: debouncedSearch.trim() });
    }
  }, [debouncedSearch]);

  const availableTags = useMemo<TagFilterOption[]>(() => {
    const bySlug = new Map<string, string>();
    for (const post of posts) {
      for (const tag of post.tags) {
        const slug = tagSlug(tag);
        if (slug && !bySlug.has(slug)) bySlug.set(slug, tag);
      }
    }
    return Array.from(bySlug.entries()).map(([slug, label]) => ({ slug, label }));
  }, [posts]);

  const isFiltering = selectedTag !== null || debouncedSearch.trim() !== "";

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (selectedTag) {
      result = result.filter((post) => post.tags.some((tag) => tagSlug(tag) === selectedTag));
    }

    const query = debouncedSearch.trim().toLowerCase();
    if (query) {
      const tokens = query.split(/\s+/).filter(Boolean);
      result = result.filter((post) => {
        const haystack = [post.title, post.subtitle ?? "", post.excerpt, post.tags.join(" ")]
          .join(" ")
          .toLowerCase();
        return tokens.every((token) => haystack.includes(token));
      });
    }

    return result;
  }, [posts, selectedTag, debouncedSearch]);

  const heroPost = !isFiltering ? filteredPosts[0] : undefined;
  const gridPosts = heroPost ? filteredPosts.slice(1) : filteredPosts;

  const showInitialSkeleton = isPending && posts.length === 0;
  const showEmptyState = !showInitialSkeleton && filteredPosts.length === 0;

  const handleSelectTag = (slug: string | null) => {
    setSelectedTag(slug);
    if (slug) {
      const label = availableTags.find((tag) => tag.slug === slug)?.label ?? slug;
      trackCategoryFilter(label);
    }
  };

  const handleLoadMore = () => {
    if (!isFetchingNextPage) fetchNextPage();
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="The G Factor"
        description="Notes on humans learning AI in the digital economy."
        path="/blog"
      />
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-4 animate-fade-up text-4xl font-bold md:text-5xl">
            The G Factor
          </h1>
          <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
            Notes on humans learning AI in the digital economy.
          </p>

          {isError && !noticeDismissed && (
            <BlogNotice
              message={
                error instanceof Error
                  ? `Live posts couldn't be loaded (${error.message}) — showing local articles.`
                  : "Live posts couldn't be loaded — showing local articles."
              }
              onDismiss={() => setNoticeDismissed(true)}
            />
          )}

          <BlogToolbar
            totalCount={totalCount}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            tags={availableTags}
            selectedTag={selectedTag}
            onSelectTag={handleSelectTag}
          />

          {showInitialSkeleton ? (
            <PostGrid posts={[]} isLoading skeletonCount={6} />
          ) : showEmptyState ? (
            <EmptyState
              title={isFiltering ? "No matching posts" : "No posts yet"}
              description={
                isFiltering
                  ? "Try a different search term or clear the filters."
                  : "Check back soon — new articles are on the way."
              }
            />
          ) : (
            <>
              {heroPost && <BlogHero post={heroPost} />}
              <PostGrid posts={gridPosts} />
            </>
          )}

          {hasNextPage && (
            <div className="mt-10 flex flex-col items-center gap-4">
              <Button onClick={handleLoadMore} disabled={isFetchingNextPage} variant="outline">
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load more"
                )}
              </Button>
              <InfiniteScrollSentinel onIntersect={handleLoadMore} enabled={hasNextPage} />
            </div>
          )}

          <div className="mt-16">
            <NewsletterForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
