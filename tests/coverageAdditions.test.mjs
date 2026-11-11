import test from 'node:test';
import assert from 'node:assert/strict';
import * as A from '../src/data/accessSod.js';
import * as O from '../src/data/otherFrameworksTools.js';
import * as S from '../src/data/soxAuditProcess.js';
const tables = { LEAST_PRIVILEGE: A.LEAST_PRIVILEGE, APP_SCOPING_RULES: A.APP_SCOPING_RULES, APP_REQUIREMENTS: A.APP_REQUIREMENTS, SOD_STRATEGIES: A.SOD_STRATEGIES, OTHER_FRAMEWORKS: O.OTHER_FRAMEWORKS, GRC_TOOLS: O.GRC_TOOLS, SOX_COMPARE: S.SOX_COMPARE, COSO_PRINCIPLES: S.COSO_PRINCIPLES, ITGC_VS_ITAC: S.ITGC_VS_ITAC };
test('every row is complete with a consistent column count', () => {
  for (const [name, rows] of Object.entries(tables)) {
    const w = rows[0].length;
    rows.forEach((r) => { assert.equal(r.length, w, `${name}: ${r[0]}`); r.forEach((c) => assert.ok(String(c).trim(), `${name}: ${r[0]}`)); });
  }
  assert.equal(S.COSO_PRINCIPLES.length, 17);
});
test('requested items are all covered', () => {
  const text = (JSON.stringify(tables) + A.AS_INTRO).toLowerCase();
  for (const t of ['coso', 'nist cybersecurity framework', 'iso/iec 27002', 'isae 3402', 'hitrust', 'crbf', 'solvency', 'hyperproof', 'veza', 'scrut', 'auditboard', 'workiva', 'servicenow', 'jira', 'confluence', 'kanban', 'least privilege', 'segregation of duties', 'application controls']) assert.ok(text.includes(t), t);
});
test('no em dashes', () => assert.ok(!JSON.stringify(tables).includes('—')));
