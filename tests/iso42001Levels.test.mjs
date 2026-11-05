import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { LEVEL_CONTROLS as L } from '../src/data/iso42001Levels.js';

test('70 unique records and required counts', () => {
  assert.equal(new Set(L.map((k) => k.id)).size, 70);
  const c = (f) => L.filter(f).length;
  assert.equal(c((k) => k.type === 'Clause'), 32); assert.equal(c((k) => k.type === 'Annex A'), 38);
  for (const [lv, n] of Object.entries({ C4: 4, C5: 3, C6: 6, C7: 7, C8: 4, C9: 6, C10: 2 })) assert.equal(c((k) => k.type === 'Clause' && k.level === lv), n, lv);
  for (const [d, n] of Object.entries({ 'A.2': 3, 'A.3': 2, 'A.4': 5, 'A.5': 4, 'A.6': 9, 'A.7': 5, 'A.8': 4, 'A.9': 3, 'A.10': 3 })) assert.equal(c((k) => k.domain.startsWith(`${d} `)), n, d);
});
test('fields are complete and links resolve', () => {
  const ids = new Set(L.map((k) => k.id));
  for (const k of L) {
    assert.ok(k.testSteps.length >= 3 && k.testSteps.length <= 5, k.id);
    assert.ok(k.commonGaps.length >= 2 && k.commonGaps.length <= 3 && k.evidence.length, k.id);
    for (const r of k.relatedControls) assert.ok(ids.has(r), r);
  }
  for (const id of ['6.1.3', '6.1.4', '8.2', '8.3', '8.4']) assert.ok(L.find((k) => k.id === id).relatedControls.length);
});
test('no banned text', () => { for (const f of ['../src/data/iso42001Levels.js', '../src/components/iso42001/Iso42001Levels.jsx']) assert.ok(!/vanta|—/i.test(fs.readFileSync(new URL(f, import.meta.url), 'utf8'))); });
