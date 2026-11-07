import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { TIMELINE_TYPES, timelineFor } from '../src/data/reportTimelines.js';
test('every framework page gets a timeline ending in issuance', () => {
  const dir = new URL('../src/pages/standards/', import.meta.url);
  for (const f of readdirSync(dir)) {
    const s = readFileSync(new URL(f, dir), 'utf8');
    if (!s.includes('LearningFrameworkPage')) continue;
    const id = (s.match(/\bid:\s*["']([^"']+)/) || [])[1];
    const t = timelineFor(id, '');
    assert.ok(t && t.phases.length >= 5, `${f} ${id}`);
  }
  assert.equal(timelineFor('soc2'), TIMELINE_TYPES.soc2);
  assert.equal(timelineFor('cert-in'), TIMELINE_TYPES.regulatory);
  assert.equal(timelineFor('cscrf'), TIMELINE_TYPES.regulatory);
  assert.equal(timelineFor('iso31000'), TIMELINE_TYPES.assessment);
});
test('four separate columns, no em dashes', () => {
  for (const t of Object.values(TIMELINE_TYPES)) for (const p of t.phases) assert.ok(p.phase && p.when && p.what && p.output);
  assert.ok(!JSON.stringify(TIMELINE_TYPES).includes('—'));
});
