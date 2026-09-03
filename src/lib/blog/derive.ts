// formatPostDate takes epoch milliseconds, not an ISO string (its previous,
// now-deleted home took a date string).
import { format } from 'date-fns';

const DEFAULT_WORDS_PER_MINUTE = 200;

export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = DEFAULT_WORDS_PER_MINUTE
): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

// This app has no error boundary around the blog UI, so a bad date must
// never reach date-fns' format() — it throws RangeError('Invalid time
// value') on an Invalid Date, which unmounts the whole page.
export function formatPostDate(publishedAt: number): string {
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return '';
  return format(date, 'MMMM d, yyyy');
}
