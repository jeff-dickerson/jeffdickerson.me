# Deployment

This site deploys to Cloudflare Pages. This doc covers the build config and,
critically, how to set the one secret the newsletter signup depends on.

## Build

Cloudflare Pages builds from this repo directly (dashboard-connected build,
not `wrangler.toml`'s `[build]` block, which is legacy Pages config and
mostly inert on a dashboard-managed project):

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** pinned via `.nvmrc` / `wrangler.toml`'s `NODE_VERSION`

`public/_routes.json` and `public/_redirects` are copied into `dist/` by
Vite automatically (anything in `public/` is copied as-is) and control
Pages' routing:

- `_routes.json` scopes the Functions router to `/api/*` only, so every
  hashed JS/CSS asset is served as a static file instead of round-tripping
  through a Worker invocation.
- `_redirects` sends everything else to `/index.html` with a `200`, which is
  the SPA fallback that makes client-side routes like `/blog/some-post`
  work on a hard refresh.

## The newsletter Function

`functions/api/subscribe.ts` is a Cloudflare Pages Function that proxies
newsletter signups to Paragraph. It needs exactly one secret:
`PARAGRAPH_API_KEY`. The Function never reads it from `import.meta.env` or
`process.env` and it is never written into `wrangler.toml` — any of those
would ship the key in plaintext in the git repo. It only ever comes from
`env.PARAGRAPH_API_KEY`, which Cloudflare injects at request time from a
secret you configure out-of-band.

### 1. Generate a Paragraph API key

Go to [paragraph.com/settings/publication/#developer](https://paragraph.com/settings/publication/#developer)
and generate an API key for the g-Factor publication (`@gfactor`). Copy it
somewhere safe — Paragraph will not show it again.

### 2. Set it as a Cloudflare Pages secret

Either through the dashboard or the CLI. **Do this for both Production and
Preview environments** — Pages environments don't share secrets, and a
Preview deploy (e.g. a PR) with the key unset will have every subscribe
attempt fail with a generic `500 server_misconfigured`.

**Dashboard:**

1. Cloudflare dashboard → Pages → this project → **Settings** → **Environment variables**
2. Add variable `PARAGRAPH_API_KEY`, paste the key, and mark it **Encrypt**
   (this stores it as a secret, not a plaintext env var — it will not be
   visible again after saving)
3. Repeat for both the **Production** and **Preview** environment tabs
4. Redeploy (secrets only apply to builds/deploys created after they're set)

**CLI (`wrangler`, installed as a devDependency — run via `npx`):**

```bash
npx wrangler pages secret put PARAGRAPH_API_KEY --project-name <your-pages-project-name>
```

This prompts for the value and sets it for Production. Cloudflare's CLI
support for per-environment Preview secrets varies by wrangler version; if
`--env preview` isn't accepted, use the dashboard for the Preview side.

### 3. Local development

`npm run dev` (plain Vite, port 8081) does **not** serve `functions/` — Vite
has no concept of Pages Functions, so `/api/subscribe` 404s under it. The
`NewsletterForm` component detects this (`import.meta.env.DEV && res.status
=== 404`) and shows a "not available in local dev" message instead of a
scary error toast.

To actually exercise the Function locally, run it under `wrangler`:

```bash
npm run dev:cf
```

This runs `wrangler pages dev --proxy 8081 -- npm run dev`, which starts
Vite, proxies its output through Miniflare, and serves `functions/` on top.

Local secrets go in a `.dev.vars` file at the repo root (already gitignored,
never commit it):

```
PARAGRAPH_API_KEY=your-real-or-test-key-here
```

Without a `.dev.vars` file (or with an invalid key), `/api/subscribe` will
correctly return `500 server_misconfigured` — the same response a visitor
would see if the Cloudflare secret were missing or wrong, with the real
cause logged server-side only (never in the response body).
