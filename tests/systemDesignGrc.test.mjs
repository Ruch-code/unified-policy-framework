import test from 'node:test';
import assert from 'node:assert/strict';
import { SD_CATEGORIES, SD_ROWS, SD_QUESTIONS } from '../src/data/systemDesignGrc.js';
test('all 53 concepts, each fully filled and in a known category', () => {
  assert.equal(SD_ROWS.length, 53);
  assert.equal(new Set(SD_ROWS.map((r) => r[1])).size, 53);
  for (const r of SD_ROWS) { assert.equal(r.length, 6, r[1]); r.forEach((c) => assert.ok(c && c.trim(), r[1])); assert.ok(SD_CATEGORIES.includes(r[0]), r[1]); }
  assert.deepEqual(SD_QUESTIONS.map(([c]) => c), SD_CATEGORIES);
});
test('no em dashes', () => assert.ok(!JSON.stringify([SD_ROWS, SD_QUESTIONS]).includes('—')));
