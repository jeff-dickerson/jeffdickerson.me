import { calculateReadingTime } from './derive';
import type { Post } from '@/types/blog';
import type { ParagraphPost } from '@/lib/paragraph';
import type { LocalPostFrontmatter } from '@/lib/localPosts';

const EXCERPT_MAX_LENGTH = 160;
const DEFAULT_AUTHOR_NAME = 'Jeff Dickerson';
const PARAGRAPH_PUBLICATION_SLUG = '@gfactor';

// The Paragraph API's TypeScript-documented contract says `publishedAt` is
// an epoch-ms number, but the live response actually serializes it (and
// updatedAt) as a numeric STRING (e.g. "1741582800000"). `new Date("...")`
// on a plain digit string is not reliably parsed as a timestamp across
// engines, so this coerces defensively instead of trusting the declared type.
function toEpochMs(value: unknown): number | undefined {
  const num = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(num) ? num : undefined;
}

// Lowercase, non-alphanumerics -> `-`. Used to dedupe tags so "#agi" and
// "AGI" collapse to the same pill (keeping whichever casing appeared first).
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeTags(rawTags: (string | null | undefined)[] | undefined): string[] {
  if (!rawTags?.length) return [];
  const bySlug = new Map<string, string>();
  for (const raw of rawTags) {
    if (!raw) continue;
    const trimmed = raw.trim().replace(/^#/, '').replace(/\s+/g, ' ').trim();
    if (!trimmed) continue;
    const slug = tagSlug(trimmed);
    if (!slug || bySlug.has(slug)) continue;
    bySlug.set(slug, trimmed);
  }
  return Array.from(bySlug.values());
}

// Rough markdown -> plain text for excerpts. Doesn't need to be a full
// parser, just needs to not leave syntax noise in the truncated preview.
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function deriveExcerpt(subtitle: string | undefined, markdown: string): string {
  if (subtitle?.trim()) return subtitle.trim();

  const plain = stripMarkdown(markdown || '');
  if (plain.length <= EXCERPT_MAX_LENGTH) return plain;

  const truncated = plain.slice(0, EXCERPT_MAX_LENGTH);
  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : EXCERPT_MAX_LENGTH)}…`;
}

export function normalizeParagraphPost(post: ParagraphPost): Post {
  const markdown = post.markdown ?? '';
  const author = post.authors?.[0];

  return {
    id: `paragraph:${post.id}`,
    source: 'paragraph',
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    excerpt: deriveExcerpt(post.subtitle, markdown),
    coverImageUrl: post.imageUrl || undefined,
    // Falls back to "now" rather than NaN — an unparsable date must never
    // reach date-fns' format(), which throws on an Invalid Date.
    publishedAt: toEpochMs(post.publishedAt) ?? Date.now(),
    updatedAt: toEpochMs(post.updatedAt),
    tags: normalizeTags(post.categories),
    // Run on markdown, never staticHtml — tags inflate word count ~40%.
    readingTime: calculateReadingTime(markdown),
    author: {
      name: author?.name || DEFAULT_AUTHOR_NAME,
      avatarUrl: author?.imageUrl,
      bio: author?.bio,
    },
    contentMarkdown: markdown,
    canonicalUrl: `https://paragraph.com/${PARAGRAPH_PUBLICATION_SLUG}/${post.slug}`,
  };
}

export function normalizeLocalPost(
  slug: string,
  frontmatter: LocalPostFrontmatter,
  content: string
): Post {
  return {
    id: `local:${slug}`,
    source: 'local',
    slug,
    title: frontmatter.title,
    subtitle: frontmatter.subtitle,
    excerpt: deriveExcerpt(frontmatter.subtitle, content),
    coverImageUrl: frontmatter.coverImage,
    publishedAt: frontmatter.publishedAt,
    tags: normalizeTags(frontmatter.tags),
    readingTime: calculateReadingTime(content),
    author: {
      name: frontmatter.authorName || DEFAULT_AUTHOR_NAME,
    },
    contentMarkdown: content,
    draft: frontmatter.draft,
  };
}
