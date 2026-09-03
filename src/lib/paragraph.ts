// Client for the public Paragraph API. No React here — pure fetch functions.
// Verified live: base is `https://public.api.paragraph.com/api`, both the
// publication lookup and the posts list are public (no auth, CORS open).
// The per-slug post endpoint (`/posts/{postSlug}`) returns HTTP 500 and must
// never be used — always fetch the list and match the slug client-side.

const API_BASE = 'https://public.api.paragraph.com/api';
const PUBLICATION_SLUG = '@gfactor';

// Confirmed live against the real API — 3 posts, newest Mar 2025.
const DEFAULT_PUBLICATION_ID = 'x9TeBpEpRSoF8cgHR01y';
const PUBLICATION_ID: string =
  import.meta.env.VITE_PARAGRAPH_PUBLICATION_ID || DEFAULT_PUBLICATION_ID;

export interface ParagraphAuthor {
  id?: string;
  name?: string;
  imageUrl?: string;
  bio?: string;
}

export interface ParagraphPost {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  // Documented as an epoch-ms number, but the live API actually serializes
  // this (and updatedAt) as a numeric string — normalize.ts coerces it.
  publishedAt: number | string;
  updatedAt?: number | string;
  imageUrl?: string;
  categories?: string[]; // freeform, messy — e.g. "#agi"
  staticHtml?: string;
  json?: unknown;
  markdown?: string;
  authors?: ParagraphAuthor[];
}

export interface ParagraphPagination {
  cursor?: string | null;
  hasMore: boolean;
  total: number;
}

export interface ParagraphPostsResponse {
  items: ParagraphPost[];
  pagination: ParagraphPagination;
}

export interface ParagraphPublication {
  id: string;
  slug: string;
  name?: string;
  [key: string]: unknown;
}

async function fetchParagraph<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`Paragraph API error ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export function getPublication(): Promise<ParagraphPublication> {
  return fetchParagraph<ParagraphPublication>(
    `/v1/publications/slug/${encodeURIComponent(PUBLICATION_SLUG)}`
  );
}

export interface GetPostsParams {
  limit?: number; // 1..100
  cursor?: string;
  includeContent?: boolean;
}

export function getPosts(params: GetPostsParams = {}): Promise<ParagraphPostsResponse> {
  const search = new URLSearchParams();
  search.set('limit', String(params.limit ?? 12));
  if (params.cursor) search.set('cursor', params.cursor);
  search.set('includeContent', String(params.includeContent ?? true));

  return fetchParagraph<ParagraphPostsResponse>(
    `/v1/publications/${PUBLICATION_ID}/posts?${search.toString()}`
  );
}
