import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface DemoEmbedProps {
  src: string;
  title: string;
  // Height held while the demo loads, so the page doesn't jump.
  initialHeight?: number;
}

// A self-contained demo page from /public, framed in the reading column.
// The demo posts its own content height (see the end of the demo's script),
// so the frame grows with it and never shows an inner scrollbar.
export const DemoEmbed = ({ src, title, initialHeight = 640 }: DemoEmbedProps) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(initialHeight);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== frameRef.current?.contentWindow) return;
      const { type, height: next } = (event.data ?? {}) as { type?: string; height?: number };
      if (type === "preflight-demo-height" && typeof next === "number" && next > 0) {
        setHeight(next);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-muted">
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ height }}
        className="relative block w-full border-0"
      />
    </div>
  );
};
