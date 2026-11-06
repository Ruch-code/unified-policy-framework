import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CROSSWALK, CROSSWALK_LEVEL, HOURS, toTask } from '../src/data/hipaaSoc2Crosswalk.js';
const slugs = new Set(JSON.parse(readFileSync(new URL('../src/data/templates.json', import.meta.url))).categories.flatMap((c) => c.templates.map((t) => t.slug)));
test('counts and hours per group', () => {
  const g = {}; CROSSWALK.forEach((r) => { g[r.group] = (g[r.group] || 0) + 1; assert.equal(r.hours, HOURS[r.group]); });
  assert.deepEqual(g, { full: 32, partial: 6, soc2: 5, carveout: 2, hipaa: 11 });
  assert.equal(CROSSWALK_LEVEL.days.flatMap((d) => d.tasks).length, 56);
});
test('every row is complete and uses existing templates', () => {
  for (const r of CROSSWALK) {
    const c = r.card;
    assert.ok(r.table.control && r.table.auditorTest && r.table.gap && c.control && c.how && c.exception, r.id);
    assert.ok(c.check.length >= 1 && c.interview.length >= 2 && c.evidence.length >= 1, r.id);
    c.evidence.forEach(([t]) => assert.ok(t === 'S' || t === 'R', r.id));
    r.templates.forEach((s) => assert.ok(slugs.has(s), `${r.id} ${s}`));
    assert.ok(r.group === 'soc2' ? r.mandate === 'guidance' : r.cfr.length > 0, r.id);
    assert.ok(toTask(r).citationOverride.sections[0].length > 0);
  }
});
test('no em dashes or source names', () => {
  const all = JSON.stringify(CROSSWALK);
  assert.ok(!all.includes('—'));
  for (const w of ['OneRoom', 'Prescient', 'Vanta', 'AWS', 'Okta', 'GitHub', 'Checkr']) assert.ok(!all.includes(w), w);
});
