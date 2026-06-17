---
name: case-study-add
description: Add a new case study to the jeffdickerson.me portfolio. Use when the user provides a brief for a new case study, asks to add a case, or wants to flesh out an existing skeleton entry (e.g., "add a case study for X", "write up the Crypto Trading case", "fill in the Quant Skills page"). Handles the structured data entry, asset placement, and bespoke-component decisions while delegating mechanical work to scripts in this skill folder.
---

# case-study-add

Turn a brief (markdown/prose or structured) into a working case study on the site. This skill enforces the design contract and voice while letting scripts handle the mechanical parts.

## Design contract (non-negotiable)

These are decided. Don't relitigate per-case:

- **Type contract**: `CaseStudy` in `src/data/caseStudies.ts` is the source of truth.
- **Metric status taxonomy**: `Delivered` / `Modeled` / `Projected` / `In production`. Never overstate. If a number isn't realized yet, it's `Modeled` or `Projected`.
- **Voice**: operator-honest — specific, dry, confident. Not B2B marketing-speak. Avoid words like "leverage", "robust", "transform". Use concrete nouns and verbs.
- **Layout**: every section frame is `max-w-5xl mx-auto`. Prose blocks inside use `max-w-3xl`. Headings align to one left edge.
- **Section order** (skip what doesn't apply): Hero → Impact → Challenge → Approach → (bespoke parallelism component) → Architecture → Technical highlights → Delivered → (bespoke projected-outcomes component) → Capabilities + Stack → CTA.
- **`**bold**` markdown convention**: use for emphasis in challenge/approach paragraphs; the page renders this via `renderWithBold`.
- **Contact email**: `jeffery.dickerson@protonmail.com`.

## Workflow

Steps marked **[script]** run a deterministic script — no token cost, same result every time. Steps marked **[you]** require AI judgment.

### 1. [script] Survey current state

```bash
node .claude/skills/case-study-add/scripts/list-cases.mjs
```

Shows existing slugs, status (full / skeleton / external), and which sections each one has. Use this to:
- Confirm the slug you're about to add doesn't collide.
- See whether this case is brand-new or you're filling in an existing skeleton.

### 2. [you] Parse the brief into structured data

The user gives you a brief in prose (like the LSC ECM markdown). Convert it to a JSON object matching the `CaseStudy` type. Save to a tmp file (e.g., `/tmp/brief-<slug>.json`).

**Slug**: use judgment. "Lone Star College ECM" → `lsc-ecm`. "Natural-Language Crypto Trading" → `crypto-trading`. Acronym-aware, lowercase kebab-case.

**Voice review**: as you write `heroTitle`, `heroSubtitle`, `cardOutcome`, challenge paragraphs, approach paragraphs — apply the operator-honest rule. If the brief sounds like marketing, rewrite. Suggested ladder:
- Bad: "We transformed their workflow into a modern, scalable platform."
- Good: "Cut a 26-week migration plan to 15 weeks by putting seven AI agents in the serial-work slots humans usually sit blocked in."

**Metric labeling**: every metric needs a status. Don't guess — ask if the brief is unclear ("was this 26→15 weeks realized or modeled?"). Default to the more conservative label.

**`image`**: until the user provides a real one, use the placeholder constant from the data module:
```ts
image: PLACEHOLDER_IMAGE
```
(or `"/lovable-uploads/d1e4ceee-3e2d-4e8c-8af3-6d2750e146e0.png"` literally — but prefer the constant by referencing it in your brief; the script writes the literal).

### 3. [script] Validate the structured brief

```bash
node .claude/skills/case-study-add/scripts/validate-brief.mjs /tmp/brief-<slug>.json
```

Catches: missing required fields, wrong types, invalid status enum, bad slug format, unknown fields. Exits 0 with `OK` or 1 with line-per-error.

Fix any errors before proceeding. Warnings (prefixed `(warn)`) are OK to proceed past with judgment.

### 4. [script] Place architecture diagram / hero image (if provided)

If the user gave you a file path for a diagram or image:

```bash
node .claude/skills/case-study-add/scripts/place-asset.mjs \
  --source <path-the-user-gave-you> \
  --slug <slug> \
  --type architecture
```

Prints the web path (e.g., `/case-studies/crypto-trading-architecture.svg`). Set this as `architecture.diagram` in the brief and re-validate.

For multiple assets, run once per type (`--type hero`, `--type screenshot`, etc.).

### 5. [script] Insert or update the entry in `caseStudies.ts`

**New case (slug doesn't exist yet):**
```bash
node .claude/skills/case-study-add/scripts/insert-entry.mjs /tmp/brief-<slug>.json
```
Adds a properly-formatted entry before the closing `];` of the array. Refuses if the slug collides.

**Filling in a skeleton (slug already exists — the common path):**
```bash
node .claude/skills/case-study-add/scripts/insert-entry.mjs /tmp/brief-<slug>.json --update
```
Brace-matches the existing entry's object literal and replaces it in place. (Without `--update`, an existing slug is refused so you don't clobber a case by accident.)

After either, run your formatter (Prettier / Biome) if the project has one — the script emits readable but not necessarily perfectly-wrapped TS for long paragraphs. Then run `tsc --noEmit` to confirm the data module still type-checks.

### 6. [you] Decide bespoke components

Most cases don't need bespoke components. **Only build one if:**
- The case study has a unique visual that materially changes how it reads (workstream matrix, multi-axis metrics dashboard).
- The information density can't be captured in the standard sections.

If yes: sandbox HTML → React conversion is its own skill (`sandbox-html-to-react`). Drop the component in `src/components/case-studies/`.

If no: skip step 7.

### 7. [you] Wire bespoke components into `CaseStudyDetail.tsx`

Conditional placement. Pattern (copy from LSC):

```tsx
{study.slug === "<slug>" && (
  <section className="container mx-auto px-6 mb-20">
    <div className={SECTION_WIDTH}>
      <SectionHeading eyebrow="<eyebrow>" title="<title>" />
      <p className={`${PROSE_WIDTH} text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed`}>
        <intro copy>
      </p>
      <YourComponent />
    </div>
  </section>
)}
```

Place it in the section order defined in the design contract.

### 8. [script] Verify with browser preview

Hand off to `case-study-verify` skill (not yet built — for now, run manually):
- Start dev server, navigate to `/case-studies/<slug>`.
- Check console for errors.
- Screenshot desktop hero + each new section.
- Resize to mobile, screenshot the same sections.
- Confirm: no horizontal scroll except intentional (matrix), section headings align, no placeholder bleed, no overflow on metrics.

## What this skill explicitly does NOT do

- **Doesn't generate architecture diagrams.** User makes those.
- **Doesn't write the brief.** User provides; you parse.
- **Doesn't pick metric statuses for ambiguous claims.** Asks the user.
- **Doesn't decide card order on the index page.** That's a separate decision.
- **Doesn't commit.** User commits when they're ready.

## File layout reference

```
.claude/skills/case-study-add/
├── SKILL.md                   ← this file
└── scripts/
    ├── list-cases.mjs         ← step 1
    ├── validate-brief.mjs     ← step 3
    ├── place-asset.mjs        ← step 4
    └── insert-entry.mjs       ← step 5
```

## Brief JSON shape (reference)

```json
{
  "slug": "kebab-case",
  "title": "Short display title",
  "heroTitle": "Long hero headline",
  "heroSubtitle": "Subhead paragraph",
  "cardOutcome": "One-line outcome shown on the index card",
  "date": "2025",
  "client": "(optional) client name and context",
  "industry": "Vertical",
  "engagement": "Engagement shape",
  "tags": ["AI Architect", "..."],
  "image": "/lovable-uploads/d1e4ceee-3e2d-4e8c-8af3-6d2750e146e0.png",
  "externalUrl": "(optional) — present means this is a product link, no detail page rendered",
  "impact": [{"value": "26 → 15 weeks", "label": "...", "status": "Modeled"}],
  "challenge": ["Paragraph 1", "Paragraph 2 with **bold** emphasis"],
  "approach": ["**Decision 1.** Body.", "**Decision 2.** Body."],
  "architecture": {"diagram": "/case-studies/<slug>-architecture.svg", "caption": "..."},
  "technicalHighlights": [{"title": "Subsystem name", "description": "What it does"}],
  "delivered": ["Artifact 1", "Artifact 2"],
  "capabilities": ["Capability 1"],
  "stack": ["Tool 1"]
}
```
