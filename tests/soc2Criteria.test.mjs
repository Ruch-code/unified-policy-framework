import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CONTROLS, MATRIX_SECTIONS, SOC2_TASK_CRITERIA, CONTROL_TASKS, sectionIds, sectionInScope, controlInScope, groupLevel } from '../src/data/soc2Criteria.js';

const unique = (f) => new Set(MATRIX_SECTIONS.filter((s) => sectionInScope(s.key, f)).flatMap(sectionIds).filter((id) => controlInScope(id, f))).size;
test('filters give 75 and 99 unique controls', () => { assert.equal(unique('type1'), 75); assert.equal(unique('type2'), 99); assert.equal(Object.keys(CONTROLS).length, 99); });
test('section counts match', () => {
  const want = { CC1: 13, CC2: 15, CC3: 6, CC4: 3, CC5: 11, CC6: 35, CC7: 13, CC8: 6, CC9: 6, SD: 1, C1: 7, P1: 4, P2: 5, P3: 5, P4: 6, P5: 4, P6: 12, P7: 3, P8: 7 };
  for (const [k, n] of Object.entries(want)) assert.equal(sectionIds(MATRIX_SECTIONS.find((s) => s.key === k)).length, n, k);
});
test('every task is grouped once, with none unmapped', () => {
  [54, 25, 34, 25].forEach((n, l) => {
    assert.equal(SOC2_TASK_CRITERIA[l].length, n);
    const g = groupLevel(l, n);
    const seen = g.flatMap((s) => s.subs.flatMap(([, x]) => x.map((t) => t.i))).sort((a, b) => a - b);
    assert.deepEqual(seen, [...Array(n).keys()]);
    assert.ok(!g.some((s) => s.key === 'Unmapped'));
  });
});
test('task links are in range and no banned text', () => {
  const size = [54, 25, 34, 25];
  for (const refs of Object.values(CONTROL_TASKS)) for (const r of refs) { const [l, i] = r.split('.').map(Number); assert.ok(i < size[l - 1], r); }
  const t = fs.readFileSync(new URL('../src/data/soc2Criteria.js', import.meta.url), 'utf8');
  assert.ok(!/vanta|—/i.test(t));
});
