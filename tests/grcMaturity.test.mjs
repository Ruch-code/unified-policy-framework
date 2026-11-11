import test from 'node:test';
import assert from 'node:assert';
import * as M from '../src/data/grcMaturity.js';
test('maturity model content is complete', () => {
  assert.equal(M.LEVELS.length, 3);
  for (const l of M.LEVELS) { assert.ok(l.headline && l.overview); assert.ok(l.pains.length >= 4); assert.ok(l.services.length >= 4); }
  assert.ok(M.JUMP.shifts.length >= 4);
  assert.ok(M.COMPARISON.every((r) => r.length === 4));
  assert.ok(!JSON.stringify(M).includes('—'));
});
