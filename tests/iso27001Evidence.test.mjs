import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const D = JSON.parse(readFileSync(new URL('../src/data/iso27001-evidence.json', import.meta.url)));
const A = D.items.filter((i) => i.type === 'Annex A control');

test('all 93 Annex A controls and clauses 4.1 to 10.2 are present once', () => {
  assert.equal(A.length, 93);
  assert.equal(new Set(D.items.map((i) => i.id)).size, D.items.length);
  for (const [p, n] of [['A.5.', 37], ['A.6.', 8], ['A.7.', 14], ['A.8.', 34]]) assert.equal(A.filter((i) => i.id.startsWith(p)).length, n, p);
  for (const id of ['4.1', '4.4', '5.3', '6.1.2', '6.3', '7.5', '8.3', '9.2', '9.3', '10.2']) assert.ok(D.items.some((i) => i.id === id), id);
});

test('every item is complete and uses allowed values', () => {
  const TYPES = ['Policy', 'Procedure', 'Record', 'Automated test', 'Screenshot/Config', 'Report', 'Contract', 'Training'];
  for (const i of D.items) {
    assert.ok(D.categories.includes(i.category), i.id);
    assert.ok(i.title && i.requirement_summary && i.auditor_sampling && i.evidence.length, i.id);
    assert.ok(['Once', 'Annual', 'Quarterly', 'Ongoing', 'Per event'].includes(i.frequency), i.id);
    assert.ok(i.evidence_types.every((t) => TYPES.includes(t)), i.id);
  }
  assert.equal(D.categories.length, 11); assert.equal(D.category_slugs.length, 11); assert.equal(D.la_sampling.length, 11);
});

test('physical controls are inherited except the ones tested on devices', () => {
  const p = A.filter((i) => i.id.startsWith('A.7.'));
  assert.equal(p.filter((i) => i.inherited).length, 12);
  assert.ok(!D.items.find((i) => i.id === 'A.7.7').inherited);
});

test('no em dashes and no brand names', () => {
  const s = JSON.stringify(D);
  assert.ok(!s.includes('—'));
  assert.ok(!/\b(AWS|Azure|GCP|Vanta|Drata|GitHub|GitLab|Okta|Jira|Slack|Google|Microsoft|Zoom|Salesforce)\b/.test(s));
});
