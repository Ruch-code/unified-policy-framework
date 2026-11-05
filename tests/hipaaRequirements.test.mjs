import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CATEGORIES, HIPAA_REQUIREMENTS as R } from '../src/data/hipaaRequirements.js';

test('25 categories in four areas, unique slugs and names', () => {
  assert.equal(CATEGORIES.length, 25);
  assert.equal(new Set(R.map((r) => r.slug)).size, R.length);
  assert.equal(new Set(R.map((r) => `${r.ruleArea}|${r.category}|${r.name}`)).size, R.length);
  assert.ok(R.every((r) => /^[a-z-]+$/.test(r.slug)));
});
test('R and A only on the Security Rule, and fields are complete', () => {
  for (const r of R) { if (r.ruleArea !== 'Security Rule') assert.equal(r.specification, 'Not applicable'); assert.ok(r.testSteps.length >= 3 && r.commonGaps.length >= 2); }
});
test('templates exist, no citations or banned text', () => {
  const slugs = new Set(JSON.parse(fs.readFileSync(new URL('../src/data/templates.json', import.meta.url))).categories.flatMap((c) => c.templates.map((t) => t.slug)));
  for (const r of R) for (const t of r.templates) assert.ok(slugs.has(t), t);
  const t = fs.readFileSync(new URL('../src/data/hipaaRequirements.js', import.meta.url), 'utf8');
  assert.ok(!/vanta|—|16[04]\.\d{3}|CFR/i.test(t));
});
