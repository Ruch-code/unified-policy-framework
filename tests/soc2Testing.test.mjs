import test from 'node:test';
import assert from 'node:assert/strict';
import { CONTROL_TESTS, TEST_TYPES, RESULT_NOTE } from '../src/data/soc2Testing.js';
import { CONTROLS } from '../src/data/soc2Criteria.js';
const names = TEST_TYPES.map(([t]) => t);
test('every control has both columns', () => {
  assert.equal(Object.keys(CONTROL_TESTS).length, Object.keys(CONTROLS).length);
  for (const id of Object.keys(CONTROLS)) { const t = CONTROL_TESTS[id]; assert.ok(t?.how && t?.clean && t.types.length, id); t.types.forEach((x) => assert.ok(names.includes(x), id)); }
});
test('no em dashes or client names', () => {
  const all = JSON.stringify([CONTROL_TESTS, TEST_TYPES, RESULT_NOTE]);
  assert.ok(!all.includes('—'));
  for (const w of ['OneRoom', 'Prescient', 'Vanta']) assert.ok(!all.includes(w), w);
});
