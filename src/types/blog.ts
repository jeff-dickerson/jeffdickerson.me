export interface Post {
  id: string; // `paragraph:${apiId}` | `local:${slug}` — avoids key collisions
  source: 'paragraph' | 'local';
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string; // DERIVED
  coverImageUrl?: string;
  publishedAt: number; // epoch MILLISECONDS (not ISO, not seconds)
  updatedAt?: number;
  tags: string[]; // DERIVED, normalized
  readingTime: number; // DERIVED, minutes
  author: { name: string; avatarUrl?: string; bio?: string };
  contentMarkdown: string;
  draft?: boolean; // local only
  canonicalUrl?: string; // paragraph.com permalink
}
