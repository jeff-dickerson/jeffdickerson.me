#!/usr/bin/env node
/**
 * Insert or update a CaseStudy entry in src/data/caseStudies.ts.
 *
 * Reads a brief JSON, emits a TypeScript object literal, and writes it
 * into the caseStudies array (before the closing `];`).
 *
 * Default (insert) mode: refuses if a study with the same slug exists.
 * --update mode: if the slug exists, replaces that entry's object literal
 *   in place (skeleton-fill — the common path once a slug is scaffolded).
 *   If the slug does NOT exist under --update, falls back to insert.
 *
 * Usage:
 *   node insert-entry.mjs <path-to-brief.json> [--file <path>] [--update]
 *   cat brief.json | node insert-entry.mjs - [--file <path>] [--update]
 *
 * Default --file: src/data/caseStudies.ts (relative to repo root, detected
 * by walking up from process.cwd() until package.json is found).
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

function findRepoRoot(start) {
  let dir = resolve(start);
  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, "package.json"))) return dir;
    dir = dirname(dir);
  }
  throw new Error("could not find repo root (no package.json walking up from cwd)");
}

function parseArgs(argv) {
  const args = { input: null, file: null, update: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--file") args.file = argv[++i];
    else if (a === "--update") args.update = true;
    else if (!args.input) args.input = a;
  }
  return args;
}

// Find the [start, end) character range of the object literal for `slug`
// within the caseStudies array body. Returns null if not found.
// Brace-matching from the entry's opening `{`.
function findEntryRange(src, slug, arrayStart, arrayEnd) {
  const slugRe = new RegExp(`slug:\\s*["']${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`);
  const m = slugRe.exec(src.slice(arrayStart, arrayEnd));
  if (!m) return null;
  const slugIdx = arrayStart + m.index;

  // Walk backwards to the opening `{` of this entry.
  let open = slugIdx;
  while (open > arrayStart && src[open] !== "{") open--;
  if (src[open] !== "{") return null;

  // Walk forward with brace depth to the matching `}`.
  let depth = 0;
  let i = open;
  for (; i < arrayEnd; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) return null;
  let end = i + 1; // include closing brace
  // Swallow a trailing comma if present.
  if (src[end] === ",") end++;
  return { open, end };
}

function readBrief(input) {
  if (!input) throw new Error("usage: insert-entry.mjs <path|-> [--file caseStudies.ts]");
  const raw = input === "-" ? readFileSync(0, "utf8") : readFileSync(input, "utf8");
  return JSON.parse(raw);
}

// Indent a multi-line string by `n` spaces (preserving blank lines).
function indent(str, n) {
  const pad = " ".repeat(n);
  return str.split("\n").map((l) => (l.length ? pad + l : l)).join("\n");
}

// Render a string literal with double quotes, escaping " and \.
function s(v) {
  return `"${String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

// Render a string[] as a multi-line TS array.
function arr(items, depth) {
  if (!items.length) return "[]";
  const pad = " ".repeat(depth);
  return ["[", ...items.map((x) => pad + "  " + s(x) + ","), pad + "]"].join("\n");
}

// Render a paragraph (long string) — single-line for now; the formatter will rewrap.
function p(v) { return s(v); }

function renderEntry(brief) {
  const lines = [];
  lines.push("  {");
  lines.push(`    slug: ${s(brief.slug)},`);
  lines.push(`    title: ${s(brief.title)},`);
  lines.push(`    heroTitle: ${s(brief.heroTitle)},`);
  lines.push(`    heroSubtitle:`);
  lines.push(`      ${p(brief.heroSubtitle)},`);
  lines.push(`    cardOutcome:`);
  lines.push(`      ${p(brief.cardOutcome)},`);
  lines.push(`    date: ${s(brief.date)},`);
  if (brief.client) lines.push(`    client: ${s(brief.client)},`);
  lines.push(`    industry: ${s(brief.industry)},`);
  lines.push(`    engagement: ${s(brief.engagement)},`);
  lines.push(`    tags: ${arr(brief.tags, 4)},`);
  lines.push(`    image: ${s(brief.image)},`);

  if (brief.externalUrl) {
    lines.push(`    externalUrl: ${s(brief.externalUrl)},`);
  }

  if (brief.impact && brief.impact.length) {
    lines.push(`    impact: [`);
    for (const m of brief.impact) {
      lines.push(`      {`);
      lines.push(`        value: ${s(m.value)},`);
      lines.push(`        label: ${s(m.label)},`);
      lines.push(`        status: ${s(m.status)},`);
      lines.push(`      },`);
    }
    lines.push(`    ],`);
  }

  if (brief.challenge && brief.challenge.length) {
    lines.push(`    challenge: [`);
    for (const para of brief.challenge) lines.push(`      ${p(para)},`);
    lines.push(`    ],`);
  }

  if (brief.approach && brief.approach.length) {
    lines.push(`    approach: [`);
    for (const para of brief.approach) lines.push(`      ${p(para)},`);
    lines.push(`    ],`);
  }

  if (brief.architecture) {
    lines.push(`    architecture: {`);
    if (brief.architecture.diagram) lines.push(`      diagram: ${s(brief.architecture.diagram)},`);
    if (brief.architecture.caption) lines.push(`      caption:`);
    if (brief.architecture.caption) lines.push(`        ${p(brief.architecture.caption)},`);
    lines.push(`    },`);
  }

  if (brief.technicalHighlights && brief.technicalHighlights.length) {
    lines.push(`    technicalHighlights: [`);
    for (const h of brief.technicalHighlights) {
      lines.push(`      {`);
      lines.push(`        title: ${s(h.title)},`);
      lines.push(`        description:`);
      lines.push(`          ${p(h.description)},`);
      lines.push(`      },`);
    }
    lines.push(`    ],`);
  }

  if (brief.delivered && brief.delivered.length) {
    lines.push(`    delivered: ${arr(brief.delivered, 4)},`);
  }
  if (brief.capabilities && brief.capabilities.length) {
    lines.push(`    capabilities: ${arr(brief.capabilities, 4)},`);
  }
  if (brief.stack && brief.stack.length) {
    lines.push(`    stack: ${arr(brief.stack, 4)},`);
  }

  lines.push("  },");
  return lines.join("\n");
}

const args = parseArgs(process.argv);
const brief = readBrief(args.input);

const repoRoot = findRepoRoot(process.cwd());
const filePath = args.file
  ? resolve(args.file)
  : join(repoRoot, "src", "data", "caseStudies.ts");

if (!existsSync(filePath)) {
  console.error(`file not found: ${filePath}`);
  process.exit(2);
}

const src = readFileSync(filePath, "utf8");

// Locate the caseStudies array bounds.
const arrayOpen = src.indexOf("export const caseStudies");
if (arrayOpen === -1) {
  console.error("could not find `export const caseStudies` in target file");
  process.exit(4);
}
const closingIdx = src.indexOf("];", arrayOpen);
if (closingIdx === -1) {
  console.error("could not find closing `];` of caseStudies array");
  process.exit(5);
}

const entryText = renderEntry(brief);
const existing = findEntryRange(src, brief.slug, arrayOpen, closingIdx);

if (existing) {
  if (!args.update) {
    console.error(`slug "${brief.slug}" already exists in ${filePath} — pass --update to replace it, or use a new slug`);
    process.exit(3);
  }
  // Replace the existing entry's object literal in place.
  // `existing.open` points at the entry's `{` (leading indent stays in `before`);
  // `existing.end` is just past the entry's `},` (trailing comma swallowed).
  // renderEntry() emits "  {...\n  }," — strip its leading indent since `before`
  // already carries it.
  const replacement = entryText.replace(/^\s+/, "");
  const before = src.slice(0, existing.open);
  const after = src.slice(existing.end);
  const out = before + replacement + after;
  writeFileSync(filePath, out, "utf8");
  console.log(`updated "${brief.slug}" in ${filePath}`);
  console.log(`note: run your formatter (prettier / biome) to clean up paragraph wrapping`);
} else {
  // Insert before the closing `];`.
  const before = src.slice(0, closingIdx);
  const after = src.slice(closingIdx);
  const out = before + entryText + "\n" + after;
  writeFileSync(filePath, out, "utf8");
  console.log(`inserted "${brief.slug}" into ${filePath}`);
  console.log(`note: run your formatter (prettier / biome) to clean up paragraph wrapping`);
}
