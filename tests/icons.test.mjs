import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const layer = readFileSync(join(root, 'ui/icons.jsx'), 'utf8');
const exported = new Set([...layer.matchAll(/export const (\w+)/g)].map((m) => m[1]));

test('every icon a component imports exists in the icon layer', () => {
  const missing = [];
  for (const f of walk(root).filter((p) => /\.(jsx?|tsx?)$/.test(p))) {
    for (const m of readFileSync(f, 'utf8').matchAll(/import\s*\{([^}]*)\}\s*from\s*['"]lucide-react['"]/g)) {
      for (const raw of m[1].split(',')) { const n = raw.trim().split(/\s+as\s+/)[0]; if (n && !exported.has(n)) missing.push(`${n} in ${f.replace(root, '')}`); }
    }
  }
  assert.deepEqual(missing, [], 'Add these names to src/ui/icons.jsx');
});

test('design rules: no emojis, em dashes, gradients or glass blur in source', () => {
  const bad = [];
  for (const f of walk(root).filter((p) => /\.(jsx?|tsx?|css)$/.test(p))) {
    const s = readFileSync(f, 'utf8');
    if (/[\u{1F300}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}]/u.test(s)) bad.push(`emoji: ${f.replace(root, '')}`);
    if (s.includes('—')) bad.push(`em dash: ${f.replace(root, '')}`);
    if (/bg-gradient-to-/.test(s)) bad.push(`gradient: ${f.replace(root, '')}`);
    if (/backdrop-blur/.test(s)) bad.push(`glass: ${f.replace(root, '')}`);
  }
  assert.deepEqual(bad, []);
});
