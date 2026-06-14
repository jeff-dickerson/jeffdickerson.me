# jeffdickerson.me

Personal portfolio / consulting site for Jeff Dickerson — positioning: **AI architect & strategy leader**. React 18 + TypeScript + Vite, Tailwind + shadcn/ui, React Router, dark mode via next-themes. Deploys to Cloudflare Pages from `main`. Dev server: `npm run dev` on port 8081.

> ⚠️ This repo lives under a **OneDrive** folder. Vite's file watcher intermittently misses changes here, so the dev server can serve stale code after an edit. If a change isn't reflected after a reload, **restart the dev server** (it then reads fresh from disk). Moving the repo outside OneDrive would remove the problem.

## Design system

Apply these consistently. They were established in a site-wide design pass (visual hierarchy, contrast, balance, consistency, simplify, feedback).

**Typography**
- One-font system: **Inter** for both body (`font-sans`) and headings (`font-heading`), via Google Fonts in `index.html`.
- Global rule in `src/index.css` applies `font-heading font-semibold tracking-tight` to all `h1–h6`. Large display headings add `font-bold` to override to 700.
- Eyebrow label pattern: `text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400`.

**Color — neutral-dominant, accent used deliberately**
- The palette is mostly neutral (near-black / white / gray). Color appears with intention, NOT sprayed on every element. Reference feel: konstantin.digital.
- One blue accent = theme `--primary` (light `221 83% 53%` / dark `217 91% 60%`), `--primary-foreground` white, `--ring` matches. **Never hardcode `blue-*`** — route through `primary`.
- Reserve the accent for: **interactive/stateful** elements (hover, active tab/nav, focus rings), text links, and a few **deliberate highlights** (e.g. the ImpactSection process accents + ✓ checkmarks).
- Keep accent OFF static decorative elements — section/feature icons, taglines, role headings, category labels are **neutral** (`text-gray-900 dark:text-white` or muted `text-gray-500 dark:text-gray-400`). This is what keeps the palette balanced rather than tacky.
- Primary CTA buttons stay **monochrome** for hierarchy (accent is for interaction cues, not the loudest element).
- Semantic status colors are exempt and intentional: metric chips (emerald `Delivered` / amber `Modeled` / gray `Projected` / sky `In production`), experiment status (green/blue).

**Components**
- Primary button (pill): `px-6 py-3 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 transition-opacity font-medium no-underline hover:no-underline`. Add `inline-flex items-center gap-2` + an `ArrowUpRight` icon for the main CTA.
- Secondary button: same shape, `border border-gray-300 dark:border-gray-700` instead of fill.
- Content card: `rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700`.
- Every interactive element needs a hover state + `transition-*` (feedback). Internal nav uses router `<Link>`, not `<a href>`.

**Layout**
- Major sections: vertical rhythm `py-20` (page top `pt-32` to clear the fixed nav). Container via `container mx-auto px-6`.
- Case-study detail sections share one width: `max-w-5xl mx-auto`, with prose blocks constrained to `max-w-3xl` so headings align to a single left edge.

**Dark mode**
- Every component must have `dark:` variants. Never ship hardcoded `bg-white`/`text-gray-*` without a dark counterpart (this was a recurring bug).

## Voice

**Operator-honest**: specific, dry, confident. Avoid B2B marketing-speak ("leverage", "robust", "transform", "tailwinds"). Concrete nouns and verbs. Don't advertise a cadence or claim a result that isn't real.

- Metric honesty: label everything `Delivered` / `Modeled` / `Projected` / `In production`. Conservative when ambiguous.
- Contact email: `jeffery.dickerson@protonmail.com`. Links: LinkedIn `/in/jefferydickerson`, GitHub `jeff-dickerson`.

## Content data lives in modules

- `src/data/caseStudies.ts` — single source of truth for case studies (`/case-studies/:slug`). To add/edit, use the **`case-study-add` skill** (`.claude/skills/case-study-add/`): scripts handle validate/insert/place-asset/list; AI handles voice + metric labeling.
- `src/data/blogPosts.ts` — blog posts (currently placeholder; see g-Factor migration in memory).
