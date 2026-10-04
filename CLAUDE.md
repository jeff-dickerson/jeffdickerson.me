# jeffdickerson.me

Personal portfolio / consulting site for Jeff Dickerson — positioning: **AI architect & strategy leader**. React 18 + TypeScript + Vite, Tailwind + shadcn/ui, React Router, dark mode via next-themes. Deploys to Cloudflare Pages from `main`. Dev server: `npm run dev` on port 8081.

> ⚠️ This repo lives under a **OneDrive** folder. Vite's file watcher intermittently misses changes here, so the dev server can serve stale code after an edit. If a change isn't reflected after a reload, **restart the dev server** (it then reads fresh from disk). Moving the repo outside OneDrive would remove the problem.

## Design system

Apply these consistently. They were established in a site-wide design pass (visual hierarchy, contrast, balance, consistency, simplify, feedback).

**Typography**
- One-font system: **Inter** for both body (`font-sans`) and headings (`font-heading`), via Google Fonts in `index.html`.
- Global rule in `src/index.css` applies `font-heading font-semibold tracking-tight` to all `h1–h6`. Large display headings add `font-bold` to override to 700.
- Eyebrow label pattern: `text-xs uppercase tracking-[0.18em] text-muted-foreground`.
- Section headings: `text-3xl md:text-4xl font-bold`. Page `h1`: `text-4xl md:text-5xl font-bold`. Only the home hero goes larger.

**Color — neutral-dominant, accent used deliberately**
- The palette is mostly neutral (near-black / white / gray). Color appears with intention, NOT sprayed on every element. Reference feel: konstantin.digital.
- One blue accent = theme `--primary` (light `221 83% 53%` / dark `217 91% 60%`), `--primary-foreground` white, `--ring` matches. **Never hardcode `blue-*`** — route through `primary`.
- Reserve the accent for: **interactive/stateful** elements (hover, active tab/nav, focus rings), text links, and a few **deliberate highlights** (e.g. the ImpactSection process accents + ✓ checkmarks).
- Keep accent OFF static decorative elements — section/feature icons, taglines, role headings, category labels are **neutral** (`text-gray-900 dark:text-white` or muted `text-gray-500 dark:text-gray-400`). This is what keeps the palette balanced rather than tacky.
- Primary CTA buttons stay **monochrome** for hierarchy (accent is for interaction cues, not the loudest element).
- Semantic status colors are exempt and intentional: metric chips (emerald `Delivered` / amber `Modeled` / gray `Projected` / sky `In production`), experiment status (green/blue).

**Components**
- Buttons: always the shared `Button` (`src/components/ui/button.tsx`), never a hand-rolled pill. It is a pill in every variant. Primary = default variant (monochrome `bg-foreground text-background`); secondary = `variant="outline"`. Three heights only: `sm` 36px, default 40px (nav, forms, in-page actions), `lg` 48px (section CTAs). Links use `<Button asChild>`. Add an `ArrowUpRight` icon for the main CTA.
- One verb per action: the booking CTA is always "Book a call".
- One primary button per screen; everything else is outline or a text link.
- Content card: `rounded-2xl bg-card border border-border` (or `bg-muted` on a plain section). Hover styles only on cards that are actually clickable.
- Icons sit on a solid circle: `flex h-11 w-11 items-center justify-center rounded-full bg-muted` with a `h-5 w-5` neutral icon.
- Long strings: clamp titles and excerpts (`line-clamp-*` / `truncate`) so real data can't break a card.
- Filters: don't add one for a list that fits on a screen; cap visible chips (blog shows 5 + "More").
- Every interactive element needs a hover state + `transition-*` (feedback). Internal nav uses router `<Link>`, not `<a href>`.

**Layout**
- Major sections: vertical rhythm `py-20` (page top `pt-32` to clear the fixed nav). Container via `container mx-auto px-6`.
- Case-study detail sections share one width: `max-w-5xl mx-auto`, with prose blocks constrained to `max-w-3xl` so headings align to a single left edge.

**Dark mode**
- Use the theme tokens (`bg-background`, `bg-muted`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`) so both themes come for free. Never ship hardcoded `bg-white`/`text-gray-*` without a `dark:` counterpart (this was a recurring bug).

## Voice

**Operator-honest**: specific, dry, confident. Avoid B2B marketing-speak ("leverage", "robust", "transform", "tailwinds"). Concrete nouns and verbs. Don't advertise a cadence or claim a result that isn't real.

- Metric honesty: label everything `Delivered` / `Modeled` / `Projected` / `In production`. Conservative when ambiguous.
- Contact email: `jeffery.dickerson@protonmail.com`. Links: LinkedIn `/in/jefferydickerson`, GitHub `jeff-dickerson`.

## Content data lives in modules

- `src/data/caseStudies.ts` — single source of truth for case studies (`/case-studies/:slug`). To add/edit, use the **`case-study-add` skill** (`.claude/skills/case-study-add/`): scripts handle validate/insert/place-asset/list; AI handles voice + metric labeling.
- `src/data/blogPosts.ts` — blog posts (currently placeholder; see g-Factor migration in memory).
