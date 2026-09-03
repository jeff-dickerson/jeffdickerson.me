import { useEffect, useRef, type RefObject } from 'react';

interface UseIntersectionObserverOptions {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  rootMargin = '200px',
}: UseIntersectionObserverOptions): RefObject<HTMLDivElement> {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return;
    const node = targetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect();
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [onIntersect, enabled, rootMargin]);

  return targetRef;
}
