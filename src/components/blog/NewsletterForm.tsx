import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { subscribeSchema, type SubscribeInput } from '@/lib/newsletter/schema';

interface SubscribeResponse {
  success: boolean;
  error?: string;
}

const ERROR_COPY: Record<string, string> = {
  invalid_email: 'That email address looks invalid — double-check it and try again.',
  rate_limited: "We're getting a lot of signups right now — try again in a minute.",
  server_misconfigured: "Something's misconfigured on our end. Please try again shortly.",
  upstream_unavailable: 'Our newsletter provider is unavailable right now. Please try again shortly.',
};

const DEFAULT_ERROR = 'Something went wrong. Please try again.';

// Newsletter signup for The G Factor — Humans learning AI in the Digital
// Economy, by Jeff Dickerson. Posts to the Cloudflare Pages Function at
// /api/subscribe, which holds the Paragraph API key server-side; nothing
// in this component ever sees the secret.
export const NewsletterForm = () => {
  const [subscribed, setSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeInput>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: '', company: '' },
  });

  const onSubmit = async (values: SubscribeInput) => {
    let res: Response;
    try {
      res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
    } catch {
      toast.error('Could not subscribe', {
        description: 'Check your connection and try again.',
      });
      return;
    }

    // Plain `npm run dev` (Vite, :8081) doesn't serve functions/, so
    // /api/subscribe 404s in local dev. That's expected, not an error.
    if (import.meta.env.DEV && res.status === 404) {
      toast.message("Newsletter signup isn't available in local dev", {
        description: 'Run `npm run dev:cf` to test it against the Pages Function locally.',
      });
      return;
    }

    const data = (await res.json().catch(() => null)) as SubscribeResponse | null;

    if (res.ok && data?.success) {
      setSubscribed(true);
      reset();
      toast.success("You're subscribed", {
        description: 'Look out for the next issue of The G Factor.',
      });
      return;
    }

    toast.error('Could not subscribe', {
      description: (data?.error && ERROR_COPY[data.error]) || DEFAULT_ERROR,
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="mx-auto max-w-xl text-center">
        <Mail className="mx-auto mb-3 h-6 w-6 text-primary" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-foreground">Subscribe to The G Factor</h2>
        <p className="mt-2 text-muted-foreground">
          Humans learning AI in the digital economy — new essays from Jeff Dickerson,
          straight to your inbox.
        </p>

        {subscribed ? (
          <p className="mt-6 text-sm font-medium text-foreground" role="status">
            You're on the list. Thanks for subscribing.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-6 flex flex-col items-start gap-3 sm:flex-row"
          >
            <div className="w-full flex-1 text-left">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
                {...register('email')}
              />
              {errors.email && (
                <p id="newsletter-email-error" className="mt-1.5 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Honeypot. Genuinely hidden from sighted users and screen
                readers alike: aria-hidden, unfocusable, and moved off-screen
                with absolute positioning rather than display:none, which
                some browsers skip when autofilling forms. */}
            <div
              aria-hidden="true"
              className="absolute h-px w-px overflow-hidden"
              style={{ clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)' }}
            >
              <label htmlFor="newsletter-company">Company</label>
              <input
                id="newsletter-company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register('company')}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full shrink-0 sm:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
