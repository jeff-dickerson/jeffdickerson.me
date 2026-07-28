#!/usr/bin/env node
/**
 * Validate a case-study brief JSON against the CaseStudy type contract.
 *
 * Usage:
 *   node validate-brief.mjs <path-to-brief.json>
 *   cat brief.json | node validate-brief.mjs -
 *
 * Exits 0 if valid, 1 with a list of errors if not.
 * Print "OK" on success; one error per line on failure.
 */

import { readFileSync } from "node:fs";

const VALID_STATUS = new Set(["Delivered", "Modeled", "Projected", "In production"]);

const REQUIRED_FIELDS = ["slug", "title", "heroTitle", "heroSubtitle", "cardOutcome", "date", "industry", "engagement", "tags", "image"];
const OPTIONAL_FIELDS = ["client", "impact", "challenge", "approach", "architecture", "technicalHighlights", "delivered", "capabilities", "stack", "externalUrl"];

const errors = [];
const err = (msg) => errors.push(msg);

function readInput() {
  const arg = process.argv[2];
  if (!arg) {
    err("usage: validate-brief.mjs <path|-> ");
    return null;
  }
  try {
    const raw = arg === "-" ? readFileSync(0, "utf8") : readFileSync(arg, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    err(`could not read/parse input: ${e.message}`);
    return null;
  }
}

function isString(v) { return typeof v === "string" && v.length > 0; }
function isStringArray(v) { return Array.isArray(v) && v.every(isString); }

function validateMetric(m, idx) {
  if (!m || typeof m !== "object") return err(`impact[${idx}]: must be object`);
  if (!isString(m.value)) err(`impact[${idx}].value: required string`);
  if (!isString(m.label)) err(`impact[${idx}].label: required string`);
  if (!isString(m.status)) err(`impact[${idx}].status: required string`);
  else if (!VALID_STATUS.has(m.status)) err(`impact[${idx}].status: must be one of ${[...VALID_STATUS].join(", ")} (got "${m.status}")`);
}

function validateTechHighlight(h, idx) {
  if (!h || typeof h !== "object") return err(`technicalHighlights[${idx}]: must be object`);
  if (!isString(h.title)) err(`technicalHighlights[${idx}].title: required string`);
  if (!isString(h.description)) err(`technicalHighlights[${idx}].description: required string`);
}

function validateArchitecture(a) {
  if (typeof a !== "object" || a === null) return err("architecture: must be object");
  if (a.diagram !== undefined && !isString(a.diagram)) err("architecture.diagram: must be string if present");
  if (a.caption !== undefined && !isString(a.caption)) err("architecture.caption: must be string if present");
}

function validate(brief) {
  if (!brief || typeof brief !== "object" || Array.isArray(brief)) {
    return err("brief must be a JSON object");
  }

  // Required fields
  for (const f of REQUIRED_FIELDS) {
    if (brief[f] === undefined) err(`${f}: required field missing`);
  }

  // Slug format: lowercase kebab-case
  if (brief.slug !== undefined) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(brief.slug)) {
      err(`slug: must be lowercase kebab-case (got "${brief.slug}")`);
    }
  }

  // tags must be string[]
  if (brief.tags !== undefined && !isStringArray(brief.tags)) err("tags: must be string[]");

  // External URL studies are allowed to skip the heavy content
  const isExternal = isString(brief.externalUrl);

  if (brief.impact !== undefined) {
    if (!Array.isArray(brief.impact)) err("impact: must be array");
    else brief.impact.forEach(validateMetric);
  }

  if (brief.challenge !== undefined && !isStringArray(brief.challenge)) err("challenge: must be string[]");
  if (brief.approach !== undefined && !isStringArray(brief.approach)) err("approach: must be string[]");
  if (brief.delivered !== undefined && !isStringArray(brief.delivered)) err("delivered: must be string[]");
  if (brief.capabilities !== undefined && !isStringArray(brief.capabilities)) err("capabilities: must be string[]");
  if (brief.stack !== undefined && !isStringArray(brief.stack)) err("stack: must be string[]");

  if (brief.technicalHighlights !== undefined) {
    if (!Array.isArray(brief.technicalHighlights)) err("technicalHighlights: must be array");
    else brief.technicalHighlights.forEach(validateTechHighlight);
  }

  if (brief.architecture !== undefined) validateArchitecture(brief.architecture);

  // Unknown fields warning
  const allKnown = new Set([...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]);
  for (const k of Object.keys(brief)) {
    if (!allKnown.has(k)) err(`unknown field: "${k}" (typo? not in CaseStudy type)`);
  }

  // Sanity: if not external and no impact, warn (not error)
  if (!isExternal && (!brief.impact || brief.impact.length === 0)) {
    err(`(warn) no impact metrics — page will render but section will be empty`);
  }
}

const brief = readInput();
if (brief !== null) validate(brief);

if (errors.length === 0) {
  console.log("OK");
  process.exit(0);
}

// Warnings vs hard errors: warnings prefixed with "(warn)"
const hard = errors.filter((e) => !e.startsWith("(warn)"));
errors.forEach((e) => console.log(e));
process.exit(hard.length === 0 ? 0 : 1);
