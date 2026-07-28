import { z } from 'zod';

// Shared between the client form (src/components/blog/NewsletterForm.tsx)
// and the Cloudflare Pages Function (functions/api/subscribe.ts). The
// Function imports this via a relative path — the `@/` alias does not
// resolve inside functions/ (Pages builds it with esbuild, which knows
// nothing about the Vite alias).
export const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  // Honeypot: real visitors never see this field. Deliberately unconstrained
  // here (no `.max(0)`) — a bot filling it in must still pass *schema*
  // validation so the Function's own `if (company)` check is what decides
  // to silently drop it with a 200. If this field itself failed validation,
  // a filled honeypot would 400 instead of being swallowed, defeating the
  // point of not tipping bots off.
  company: z.string().optional(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
