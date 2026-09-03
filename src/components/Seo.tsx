import { Helmet } from 'react-helmet-async';

// No SSR here — Helmet mutates the DOM after JS runs, so crawlers that don't
// execute JS (Twitter/LinkedIn/Slack/iMessage) still see index.html's generic
// OG tags on shared /blog/:slug links. This fixes tab titles and Google
// (which does execute JS). Per-bot rewriting is deferred (see plan Phase 6).
const SITE_NAME = 'Jeff Dickerson';
const SITE_URL = 'https://jeffdickerson.me';

interface SeoProps {
  title: string;
  description: string;
  path?: string; // e.g. '/blog' or `/blog/${slug}` — builds canonical + og:url
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string; // ISO 8601
  modifiedTime?: string;
  jsonLd?: Record<string, unknown>;
}

export const Seo = ({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  jsonLd,
}: SeoProps) => {
  const url = path ? `${SITE_URL}${path}` : undefined;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return (
    // defer={false}: Helmet's default commits tags via requestAnimationFrame,
    // which never fires in a tab that isn't actively compositing (backgrounded,
    // headless without a visible surface, some crawlers) — the tags would
    // silently never apply. A synchronous commit has no downside here.
    <Helmet defer={false}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};
