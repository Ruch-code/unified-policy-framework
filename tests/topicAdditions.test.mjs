import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as T from '../src/data/topicExtras.js';
import * as A from '../src/data/aiVendorExtras.js';
import { hipaaControls, HIPAA_CATEGORIES, HIPAA_BA_CE_COMPARE } from '../src/data/hipaaControlSet.js';

const tables = [T.CHANGE_EXAMPLES, T.VULN_RELEASE, T.MICROSERVICES, T.CLOUD_MODELS, T.DPA_CHECKS, T.DPA_TEAMS, T.BAA_COVERAGE, T.SOC_COMPARE, T.INDIA_US_SCENARIOS, T.CRYPTO_COMPARE,
  A.AI_SUPPLY_CHAIN, A.AI_BLIND_SPOTS, A.AI_TPRM_COMPARE, A.AI_GATES, A.AI_TIERING, A.AI_EVIDENCE, A.AI_CLAUSES, A.AI_RACI, A.AI_LADDER, A.AI_REDTEAM, A.AI_PLAN, A.AGENT_FRAMEWORKS];

test('every reference row has one value per column', () => {
  for (const t of tables) for (const r of t.rows) assert.equal(r.length, t.columns.length, `${t.columns[0]}: ${r[0]}`);
});

test('no em dashes in the added copy', () => {
  assert.ok(!JSON.stringify([T, A, hipaaControls, HIPAA_BA_CE_COMPARE]).includes('—'));
});

test('HIPAA control set: 50 controls split into common, BA and CE-only', () => {
  assert.equal(hipaaControls.length, 50);
  assert.equal(hipaaControls.filter((c) => c.appliesTo.length === 2).length, 26);
  assert.equal(hipaaControls.filter((c) => c.appliesTo.join() === 'BA').length, 7);
  assert.equal(hipaaControls.filter((c) => c.appliesTo.join() === 'CE').length, 17);
  for (const c of hipaaControls) {
    assert.match(c.id, /^HIPAA-[A-Z]{2}-\d{2}$/);
    assert.ok(HIPAA_CATEGORIES.includes(c.category), c.id);
    assert.ok(c.evidence.length > 0 && c.citation && c.description, c.id);
  }
  assert.equal(new Set(hipaaControls.map((c) => c.id)).size, 50);
});

test('change examples cover hotfix and cosmetic, encryption covers TLS 1.3 and AES-256', () => {
  const kinds = T.CHANGE_EXAMPLES.rows.map((r) => r[0]).join(' ');
  assert.match(kinds, /Hotfix/); assert.match(kinds, /Cosmetic/);
  assert.match(T.CRYPTO_COMPARE.tls, /TLS 1\.3/); assert.match(T.CRYPTO_COMPARE.aes, /AES-256/);
  assert.ok(T.CRYPTO_COMPARE.tlsFlow.length >= 4 && T.CRYPTO_COMPARE.envelopeFlow.length >= 4);
});
