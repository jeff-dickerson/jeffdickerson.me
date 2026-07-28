import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface InfiniteScrollSentinelProps {
  onIntersect: () => void;
  enabled?: boolean;
}

// The real control is the "Load more" Button next to this — this sentinel
// just triggers it automatically, covering mouse-wheel scrollers while the
// button still covers keyboard users and browsers without IntersectionObserver.
export const InfiniteScrollSentinel = ({ onIntersect, enabled = true }: InfiniteScrollSentinelProps) => {
  const ref = useIntersectionObserver({ onIntersect, enabled });
  return <div ref={ref} aria-hidden="true" className="h-1 w-full" />;
};
