import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

const FALLBACK_COVER = '/placeholder.svg';

// Paragraph's `staticHtml` is never rendered here — it would need
// rehype-raw (new dep) or dangerouslySetInnerHTML (XSS surface on
// third-party content), and either way wouldn't inherit prose typography
// the same as local posts. `contentMarkdown` is the one pipeline for both
// sources.
const components: Components = {
  a: ({ href, children, ...props }) => (
    <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }) => (
    <img
      src={typeof src === 'string' ? src : FALLBACK_COVER}
      alt={alt ?? ''}
      loading="lazy"
      decoding="async"
      className="rounded-lg"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = FALLBACK_COVER;
      }}
      {...props}
    />
  ),
};

interface PostContentProps {
  markdown: string;
}

export const PostContent = ({ markdown }: PostContentProps) => (
  <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
);
