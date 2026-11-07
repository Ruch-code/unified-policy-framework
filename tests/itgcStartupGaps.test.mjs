import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FRAMEWORK_GAPS, SHARED_THEMES } from '../src/data/itgcStartupGaps.js';

function pageGaps(file) {
  const s = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  const k = s.indexOf('startupGaps: [');
  let i = s.indexOf('[', k), d = 0, j = i;
  for (; j < s.length; j++) {
    const c = s[j];
    if (c === '"' || c === "'" || c === '`') { const q = c; j++; while (s[j] !== q) { if (s[j] === '\\') j++; j++; } continue; }
    if (c === '[') d++;
    if (c === ']' && !--d) break;
  }
  return new Function(`return ${s.slice(i, j + 1)}`)();
}

test('KB copy matches each framework page', () => {
  for (const f of FRAMEWORK_GAPS) assert.deepEqual(f.gaps, pageGaps(f.source), f.id);
});
test('shared themes point at real gaps, each used once', () => {
  const ids = new Map(FRAMEWORK_GAPS.map((f) => [f.id, f.gaps.length]));
  const seen = new Set();
  for (const t of SHARED_THEMES) for (const [id, i] of t.members) {
    assert.ok(i < ids.get(id), `${t.theme} ${id} ${i}`);
    assert.ok(!seen.has(`${id}:${i}`), `${id}:${i} twice`); seen.add(`${id}:${i}`);
  }
});
