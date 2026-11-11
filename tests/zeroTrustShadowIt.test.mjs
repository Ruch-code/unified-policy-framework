import test from 'node:test';
import assert from 'node:assert';
import * as D from '../src/data/zeroTrustShadowIt.js';
test('zero trust and shadow IT content is complete', () => {
  assert.ok(D.ZT_PRINCIPLES.length >= 6 && D.ZT_PRINCIPLES.every((r) => r.length === 4));
  assert.ok(D.SIT_SCENARIOS.length >= 5 && D.SIT_SCENARIOS.every((r) => r.length === 4));
  assert.ok(D.SIT_SCENARIOS.some((r) => /AI/.test(r[0])));
  assert.ok(D.ZT_SCENARIO.every((r) => r.length === 3));
});
