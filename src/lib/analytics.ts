/**
 * Analytics Integration
 * Supports Plausible (privacy-focused) and Google Analytics
 */

const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN || 'jeffdickerson.me';
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Track page view
export function trackPageView(url: string, title?: string) {
  // Plausible
  if (window.plausible) {
    window.plausible('pageview', {
      props: {
        url,
        title: title || document.title,
      },
    });
  }

  // Google Analytics
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  }
}

// Track custom event
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>
) {
  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: properties });
  }

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }
}

// Track blog post view
export function trackBlogPostView(postSlug: string, postTitle: string) {
  trackEvent('blog_post_view', {
    post_slug: postSlug,
    post_title: postTitle,
  });
}

// Track category filter
export function trackCategoryFilter(category: string) {
  trackEvent('category_filter', {
    category,
  });
}

// Track outbound link
export function trackOutboundLink(url: string, label?: string) {
  trackEvent('outbound_link', {
    url,
    label: label || url,
  });
}

// TypeScript declarations
declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, unknown> }
    ) => void;
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
