import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { REQUIREMENT_CATEGORIES as C } from '../src/data/iso27001Categories/index.js';

const all = C.flatMap((c) => c.items);
const slugs = new Set(JSON.parse(fs.readFileSync(new URL('../src/data/templates.json', import.meta.url))).categories.flatMap((c) => c.templates.map((t) => t.slug)));
test('123 unique items with expected counts', () => {
  assert.equal(all.length, 123);
  assert.equal(new Set(all.map((i) => i.id)).size, 123);
  assert.deepEqual(C.map((c) => c.items.length), [4, 3, 5, 7, 3, 6, 2, 37, 8, 14, 34]);
});
test('every card is complete and templates exist', () => {
  for (const i of all) {
    assert.ok(i.control && i.how && i.check.length >= 3 && i.evidence.length && i.nonconformity.statement, i.id);
    assert.ok(i.check.filter((s) => s.startsWith('Interview')).length >= 2, i.id);
    for (const t of i.templates) assert.ok(slugs.has(t), `${i.id} ${t}`);
    if (i.id.startsWith('A.')) assert.ok(i.soa?.verdict, i.id);
    if (i.soa && i.soa.verdict !== 'Selected') assert.ok(i.soa.rationale, i.id);
  }
});
test('no em dashes', () => {
  for (const f of fs.readdirSync(new URL('../src/data/iso27001Categories/', import.meta.url))) assert.ok(!fs.readFileSync(new URL(`../src/data/iso27001Categories/${f}`, import.meta.url), 'utf8').includes('—'), f);
});
