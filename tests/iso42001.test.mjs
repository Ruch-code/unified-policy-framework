import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CONTROLS, POLICIES, TEMPLATES, COUNTS, ITGC_MAPPING } from '../src/data/iso42001.js';

test('has 32 clauses and 38 Annex A controls with unique IDs', () => {
  assert.deepEqual([COUNTS.clauses, COUNTS.annex], [32, 38]);
  assert.equal(new Set(CONTROLS.map((k) => k.id)).size, 70);
});
test('every record is complete and its links resolve', () => {
  const slugs = new Set([...POLICIES, ...TEMPLATES].map((t) => t.slug));
  for (const k of CONTROLS) {
    assert.ok(k.implementationGuidance.length >= 2 && k.implementationGuidance.length <= 5, k.id);
    assert.ok(k.evidence.length && k.commonGaps.length && k.auditorQuestions.length && k.relatedPolicies.length, k.id);
    for (const s of [...k.relatedPolicies, ...k.relatedTemplates]) assert.ok(slugs.has(s), `${k.id} ${s}`);
  }
});
test('every template and policy has a built file and ITGC maps resolve', () => {
  for (const t of TEMPLATES) assert.ok(fs.existsSync(new URL(`../netlify/template-files/${t.slug}.${t.format}`, import.meta.url)), t.slug);
  for (const p of POLICIES) assert.ok(fs.existsSync(new URL(`../netlify/template-files/${p.slug}.docx`, import.meta.url)), p.slug);
  for (const ids of Object.values(ITGC_MAPPING)) for (const id of ids) assert.ok(CONTROLS.some((k) => k.id === id), id);
});
test('no em dashes in the data', () => {
  assert.ok(!fs.readFileSync(new URL('../src/data/iso42001.js', import.meta.url), 'utf8').includes('—'));
});

test('library links resolve and files exist', async () => {
  const { LIBRARY } = await import('../src/data/iso42001Library.js');
  for (const d of LIBRARY) {
    for (const id of d.mappedControls) assert.ok(CONTROLS.some((k) => k.id === id), `${d.id} ${id}`);
    assert.ok(fs.existsSync(new URL(`../netlify/template-files/${d.filePath}`, import.meta.url)), d.filePath);
  }
});
