#!/usr/bin/env node
/**
 * List the current case studies and their completeness state.
 *
 * For each entry in src/data/caseStudies.ts, report:
 *   slug · status · what it has
 *
 * Status:
 *   external — has externalUrl, doesn't render a detail page
 *   full     — has impact + challenge + approach (renders full detail)
 *   skeleton — minimal fields only (detail page renders placeholder)
 *
 * Usage:
 *   node list-cases.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

function findRepoRoot(start) {
  let dir = resolve(start);
  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, "package.json"))) return dir;
    dir = dirname(dir);
  }
  throw new Error("could not find repo root");
}

const repoRoot = findRepoRoot(process.cwd());
const filePath = join(repoRoot, "src", "data", "caseStudies.ts");
const src = readFileSync(filePath, "utf8");

// Crude but effective: split on `{` blocks that start with `slug:` line
// and detect which optional fields appear in each block.
// We work between the `[` and matching `];` of the caseStudies array.

const arrayOpen = src.indexOf("export const caseStudies");
const arrayStart = src.indexOf("[", arrayOpen);
const arrayEnd = src.indexOf("];", arrayStart);
const body = src.slice(arrayStart + 1, arrayEnd);

// Split into per-entry blocks. Each entry begins with `{` at the start of a line.
// We track brace depth to find matching closes.
const entries = [];
let depth = 0;
let buf = "";
let inEntry = false;
for (let i = 0; i < body.length; i++) {
  const ch = body[i];
  if (!inEntry) {
    if (ch === "{") { inEntry = true; depth = 1; buf = "{"; }
    continue;
  }
  buf += ch;
  if (ch === "{") depth++;
  else if (ch === "}") {
    depth--;
    if (depth === 0) {
      entries.push(buf);
      inEntry = false;
      buf = "";
    }
  }
}

function field(entry, name) {
  // Match `name: "..."` or `name: [` at start of a property line.
  const re = new RegExp(`\\b${name}\\s*:`);
  return re.test(entry);
}

function slug(entry) {
  const m = entry.match(/slug:\s*["']([^"']+)["']/);
  return m ? m[1] : "(no-slug)";
}

const rows = entries.map((e) => {
  const s = slug(e);
  const hasExternal = field(e, "externalUrl");
  const hasImpact = field(e, "impact");
  const hasChallenge = field(e, "challenge");
  const hasApproach = field(e, "approach");
  const hasArch = field(e, "architecture");
  const hasTech = field(e, "technicalHighlights");

  let status;
  if (hasExternal) status = "external";
  else if (hasImpact && hasChallenge && hasApproach) status = "full";
  else status = "skeleton";

  const flags = [
    hasImpact ? "impact" : null,
    hasChallenge ? "challenge" : null,
    hasApproach ? "approach" : null,
    hasArch ? "arch" : null,
    hasTech ? "tech" : null,
  ].filter(Boolean);

  return { slug: s, status, has: flags.join(", ") || "—" };
});

// Print as a small table.
const maxSlug = Math.max(...rows.map((r) => r.slug.length), 4);
const maxStatus = Math.max(...rows.map((r) => r.status.length), 6);

console.log(
  "slug".padEnd(maxSlug) + "  " +
  "status".padEnd(maxStatus) + "  " +
  "has"
);
console.log("-".repeat(maxSlug + maxStatus + 20));
for (const r of rows) {
  console.log(
    r.slug.padEnd(maxSlug) + "  " +
    r.status.padEnd(maxStatus) + "  " +
    r.has
  );
}
console.log(`\n${rows.length} case studies in ${filePath}`);
