import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { PostContent } from "@/components/blog/PostContent";
import { PostMeta } from "@/components/blog/PostMeta";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { usePost } from "@/hooks/usePost";
import { usePosts } from "@/hooks/usePosts";
import { trackBlogPostView } from "@/lib/analytics";

const FALLBACK_COVER = "/placeholder.svg";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, isLoading } = usePost(slug);
  // Same merged/sorted list usePost() itself reads — react-query dedupes
  // this against that hook's own query, so this costs no extra request.
  const { posts } = usePosts();

  const { prevPost, nextPost } = useMemo(() => {
    if (!post) return { prevPost: undefined, nextPost: undefined };
    const index = posts.findIndex((p) => p.slug === post.slug);
    if (index === -1) return { prevPost: undefined, nextPost: undefined };
    return {
      prevPost: index > 0 ? posts[index - 1] : undefined,
      nextPost: index < posts.length - 1 ? posts[index + 1] : undefined,
    };
  }, [posts, post]);

  useEffect(() => {
    if (post) trackBlogPostView(post.slug, post.title);
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 pt-32 pb-20">
          <div className="mx-auto max-w-[704px] space-y-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Seo title="Post not found" description="The article you're looking for doesn't exist or has been removed." />
        <Navigation />
        <main className="container mx-auto px-6 pt-32 pb-20">
          <div className="mx-auto max-w-[704px] py-20 text-center">
            <h1 className="mb-4 text-4xl font-bold">Post not found</h1>
            <p className="mb-8 text-muted-foreground">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const publishedIso = new Date(post.publishedAt).toISOString();
  const modifiedIso = post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl,
    datePublished: publishedIso,
    dateModified: modifiedIso ?? publishedIso,
    author: { "@type": "Person", name: post.author.name },
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.coverImageUrl}
        type="article"
        publishedTime={publishedIso}
        modifiedTime={modifiedIso}
        jsonLd={jsonLd}
      />
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="mx-auto max-w-[704px]">
          {post.draft && (
            <div className="mb-8 rounded-lg border border-yellow-400/50 bg-yellow-100 p-4 dark:bg-yellow-900/30">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Preview mode: this is a draft post
              </p>
            </div>
          )}

          <Button variant="ghost" asChild className="mb-8 -ml-3 text-muted-foreground">
            <Link to="/blog">
              <ChevronLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>
          {post.subtitle && <p className="mb-6 text-lg text-muted-foreground">{post.subtitle}</p>}

          <div className="mb-8 flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.author.avatarUrl || FALLBACK_COVER} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{post.author.name}</p>
              <PostMeta post={post} />
            </div>
            {post.canonicalUrl && (
              <a
                href={post.canonicalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
              >
                Read on Paragraph
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {post.coverImageUrl && (
            <img
              src={post.coverImageUrl}
              alt={post.title}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_COVER;
              }}
              className="mb-8 h-[400px] w-full rounded-2xl object-cover"
            />
          )}

          <div className="prose prose-lg max-w-none">
            <PostContent markdown={post.contentMarkdown} />
          </div>

          {post.tags.length > 0 && (
            <div className="mb-8 mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {(prevPost || nextPost) && (
            <div className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="group flex flex-col gap-1 rounded-lg border border-border p-4 no-underline text-foreground transition-colors hover:border-primary"
                >
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ChevronLeft className="h-3 w-3" />
                    Previous
                  </span>
                  <span className="font-medium group-hover:text-primary">{prevPost.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextPost && (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="group flex flex-col gap-1 rounded-lg border border-border p-4 text-right no-underline text-foreground transition-colors hover:border-primary sm:col-start-2"
                >
                  <span className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                    Next
                    <ChevronRight className="h-3 w-3" />
                  </span>
                  <span className="font-medium group-hover:text-primary">{nextPost.title}</span>
                </Link>
              )}
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

export default BlogPost;
