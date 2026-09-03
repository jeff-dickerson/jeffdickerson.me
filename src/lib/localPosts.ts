// Local markdown drafts, bundled at build time via a raw glob import.
//
// Why not gray-matter: it depends on Node's `Buffer` and throws at runtime in
// a browser Vite build without a polyfill.
// Why not @mdx-js/rollup: it needs two extra deps plus a provider, and would
// create a *second* rendering pipeline (MDX for local posts, ReactMarkdown
// for remote Paragraph posts) — local and remote would render with different
// typography. One pipeline is the point.
// Why not public/: that needs a runtime fetch plus a hand-maintained index.
import { z } from 'zod';
import { parseFrontmatter } from './frontmatter';
import { normalizeLocalPost } from './blog/normalize';
import type { Post } from '@/types/blog';

const frontmatterSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  publishedAt: z.union([z.string(), z.number()]),
  tags: z.array(z.string()).optional().default([]),
  coverImage: z.string().optional(),
  draft: z.boolean().optional(),
  authorName: z.string().optional(),
});

export interface LocalPostFrontmatter {
  title: string;
  subtitle?: string;
  publishedAt: number; // epoch ms, converted from the frontmatter's date string
  tags: string[];
  coverImage?: string;
  draft?: boolean;
  authorName?: string;
}

function toEpochMs(value: string | number): number {
  if (typeof value === 'number') return value;
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? Date.now() : parsed;
}

// Must live under src/ for the glob to bundle — content in public/ would
// need a separate runtime fetch.
const rawModules = import.meta.glob('/src/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function loadLocalPosts(): Post[] {
  const posts: Post[] = [];

  for (const [path, raw] of Object.entries(rawModules)) {
    const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? path;
    const { data, content } = parseFrontmatter(raw);
    const result = frontmatterSchema.safeParse(data);

    if (!result.success) {
      const message = `Invalid frontmatter in ${path}: ${result.error.message}`;
      if (import.meta.env.DEV) throw new Error(message);
      console.error(message);
      continue;
    }

    const parsed = result.data;
    const frontmatter: LocalPostFrontmatter = {
      title: parsed.title,
      subtitle: parsed.subtitle,
      publishedAt: toEpochMs(parsed.publishedAt),
      tags: parsed.tags,
      coverImage: parsed.coverImage,
      draft: parsed.draft,
      authorName: parsed.authorName,
    };

    posts.push(normalizeLocalPost(slug, frontmatter, content.trim()));
  }

  return posts;
}

export const localPosts: Post[] = loadLocalPosts();
