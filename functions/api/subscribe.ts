// Cloudflare Pages Function — POST /api/subscribe
//
// Proxies newsletter signups to Paragraph's subscribers endpoint. This file
// is hand-typed on purpose; do NOT install @cloudflare/workers-types for it.
//
// Security requirements (the entire point of this Function existing):
// - The Paragraph API key is read ONLY from `env.PARAGRAPH_API_KEY`, a
//   Cloudflare Pages secret. Never `import.meta.env`, never `process.env`,
//   and never a `[vars]` entry in wrangler.toml — that would be plaintext
//   in git. Set it with `wrangler pages secret put PARAGRAPH_API_KEY` or via
//   the dashboard, for BOTH Production and Preview environments.
// - Upstream 401/403 (missing/invalid key) must never be distinguishable
//   from any other failure on the client side — both map to a generic
//   500 `server_misconfigured`. Real causes are only ever written with
//   console.error, server-side, never echoed in the response body.
// - `company` is a honeypot. If it arrives filled, we return 200 `{ok:true}`
//   WITHOUT calling upstream, so bots are silently dropped instead of
//   burning the shared Paragraph rate limit (100/window, one identity for
//   every visitor to the site).

import { subscribeSchema } from '../../src/lib/newsletter/schema';

interface Env {
  PARAGRAPH_API_KEY: string;
}

type Ctx = {
  request: Request;
  env: Env;
};

const PARAGRAPH_SUBSCRIBE_URL = 'https://public.api.paragraph.com/api/v1/subscribers';

type SubscribeError =
  | 'invalid_email'
  | 'rate_limited'
  | 'server_misconfigured'
  | 'upstream_unavailable'
  | 'method_not_allowed';

function jsonResponse(body: { success: boolean; error?: SubscribeError }, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ success: false, error: 'invalid_email' }, 400);
  }

  const parsed = subscribeSchema.safeParse(payload);
  if (!parsed.success) {
    return jsonResponse({ success: false, error: 'invalid_email' }, 400);
  }

  const { email, company } = parsed.data;

  // Honeypot tripped: pretend success, drop the request. Never spend the
  // shared upstream rate-limit budget on obvious bot traffic.
  if (company) {
    return jsonResponse({ success: true }, 200);
  }

  if (!env.PARAGRAPH_API_KEY) {
    console.error('subscribe: PARAGRAPH_API_KEY is not configured for this environment');
    return jsonResponse({ success: false, error: 'server_misconfigured' }, 500);
  }

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(PARAGRAPH_SUBSCRIBE_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.PARAGRAPH_API_KEY}`,
      },
      body: JSON.stringify({ email }),
    });
  } catch (err) {
    console.error('subscribe: upstream fetch threw', err);
    return jsonResponse({ success: false, error: 'upstream_unavailable' }, 502);
  }

  if (upstreamRes.ok) {
    return jsonResponse({ success: true }, 200);
  }

  // Never forward Paragraph's `msg` field to the browser — log it
  // server-side only, and return a curated, safe error code.
  let upstreamBody: unknown;
  try {
    upstreamBody = await upstreamRes.json();
  } catch {
    upstreamBody = undefined;
  }
  console.error('subscribe: upstream error', upstreamRes.status, upstreamBody);

  if (upstreamRes.status === 401 || upstreamRes.status === 403) {
    // A bad or missing key must be indistinguishable from any other server
    // failure to the client — never hint that the key itself is the problem.
    return jsonResponse({ success: false, error: 'server_misconfigured' }, 500);
  }
  if (upstreamRes.status === 400) {
    return jsonResponse({ success: false, error: 'invalid_email' }, 400);
  }
  if (upstreamRes.status === 429) {
    return jsonResponse({ success: false, error: 'rate_limited' }, 429);
  }
  return jsonResponse({ success: false, error: 'upstream_unavailable' }, 502);
};

// Any method other than POST — including GET, since there is nothing to
// read here — falls through to this catch-all.
export const onRequest = async (): Promise<Response> =>
  jsonResponse({ success: false, error: 'method_not_allowed' }, 405);
