// Hand-rolled `---` frontmatter parser for local blog markdown. Deliberately
// not gray-matter (needs Node's Buffer, throws in a browser Vite build) —
// see src/lib/localPosts.ts for the full rationale. Supports scalars, quoted
// strings, inline arrays (`[a, b]`) and block `-` arrays.

export interface FrontmatterResult {
  data: Record<string, unknown>;
  content: string;
}

const FRONTMATTER_BLOCK = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseScalar(raw: string): unknown {
  const value = raw.trim();
  if (value === '') return '';
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseInlineArray(raw: string): unknown[] {
  const inner = raw.trim().slice(1, -1).trim();
  if (!inner) return [];
  return inner.split(',').map((item) => parseScalar(item));
}

export function parseFrontmatter(raw: string): FrontmatterResult {
  const match = raw.match(FRONTMATTER_BLOCK);
  if (!match) return { data: {}, content: raw };

  const content = raw.slice(match[0].length);
  const data: Record<string, unknown> = {};

  let listKey: string | null = null;
  let list: unknown[] | null = null;
  const flushList = () => {
    if (listKey && list) data[listKey] = list;
    listKey = null;
    list = null;
  };

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;

    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && listKey) {
      list = list ?? [];
      list.push(parseScalar(listItem[1]));
      continue;
    }

    flushList();

    const kv = line.match(/^([^:]+):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1].trim();
    const rest = kv[2];

    if (rest.trim() === '') {
      listKey = key; // may be followed by a `-` block array
      continue;
    }
    if (rest.trim().startsWith('[') && rest.trim().endsWith(']')) {
      data[key] = parseInlineArray(rest);
      continue;
    }
    data[key] = parseScalar(rest);
  }
  flushList();

  return { data, content };
}
