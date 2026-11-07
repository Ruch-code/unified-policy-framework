import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const D = JSON.parse(readFileSync(new URL('../src/data/controlDomains.json', import.meta.url)));
const lum = (h) => { const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255); return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
test('catalogue has 431 controls across 31 domains', () => {
  assert.equal(D.controls.length, 431);
  assert.equal(new Set(D.controls.map((c) => c.domain)).size, 31);
  assert.equal(new Set(D.controls.map((c) => c.id)).size, 431);
  const codes = new Set(D.domains.map((d) => d.code));
  D.controls.forEach((c) => { assert.ok(codes.has(c.domain), c.id); assert.equal(c.id.split('-')[0], c.domain); });
});
test('framework totals', () => {
  const n = (f) => D.controls.filter((c) => c.framework === f).length;
  assert.deepEqual([n('SOC 2'), n('HIPAA'), n('ISO 27001'), n('ISO 42001'), n('Cross-framework')], [99, 135, 123, 70, 4]);
});
test('every pill meets WCAG AA in both themes', () => {
  for (const d of D.domains) for (const t of ['light', 'dark']) assert.ok(cr(d.colors[t].bg, d.colors[t].fg) >= 4.5, `${d.code} ${t}`);
});
test('no em dashes', () => assert.ok(!JSON.stringify(D).includes('—')));
