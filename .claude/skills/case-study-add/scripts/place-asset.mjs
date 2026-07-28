#!/usr/bin/env node
/**
 * Copy an asset (architecture diagram, hero image) into
 * public/case-studies/<slug>-<type>.<ext>.
 *
 * Prints the resulting web path (suitable to drop straight into
 * caseStudies.ts) on success.
 *
 * Usage:
 *   node place-asset.mjs --source <path> --slug <slug> --type <type>
 *
 *   --type defaults to "architecture"
 *   --source must exist; --slug must be lowercase kebab-case
 *
 * Examples:
 *   node place-asset.mjs --source ~/Downloads/diagram.svg --slug crypto-trading --type architecture
 *   # → copies to public/case-studies/crypto-trading-architecture.svg
 *   # → prints: /case-studies/crypto-trading-architecture.svg
 */

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";

function findRepoRoot(start) {
  let dir = resolve(start);
  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, "package.json"))) return dir;
    dir = dirname(dir);
  }
  throw new Error("could not find repo root");
}

function parseArgs(argv) {
  const args = { source: null, slug: null, type: "architecture" };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--source") args.source = argv[++i];
    else if (a === "--slug") args.slug = argv[++i];
    else if (a === "--type") args.type = argv[++i];
  }
  return args;
}

const args = parseArgs(process.argv);

if (!args.source) { console.error("missing --source"); process.exit(1); }
if (!args.slug) { console.error("missing --slug"); process.exit(1); }
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(args.slug)) {
  console.error(`--slug must be lowercase kebab-case (got "${args.slug}")`);
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(args.type)) {
  console.error(`--type must be lowercase letters/digits/dashes (got "${args.type}")`);
  process.exit(1);
}

const source = resolve(args.source);
if (!existsSync(source)) {
  console.error(`source not found: ${source}`);
  process.exit(2);
}

const ext = extname(source).toLowerCase();
if (!ext) {
  console.error(`source has no extension: ${source}`);
  process.exit(3);
}

const repoRoot = findRepoRoot(process.cwd());
const destDir = join(repoRoot, "public", "case-studies");
mkdirSync(destDir, { recursive: true });

const destName = `${args.slug}-${args.type}${ext}`;
const destPath = join(destDir, destName);

copyFileSync(source, destPath);

// Web path used in the data module (forward slashes, leading /)
const webPath = `/case-studies/${destName}`;
console.log(`copied ${basename(source)} → ${destPath}`);
console.log(`web path: ${webPath}`);
