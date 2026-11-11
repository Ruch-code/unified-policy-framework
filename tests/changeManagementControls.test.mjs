import test from 'node:test';
import assert from 'node:assert';
import * as CM from '../src/data/changeManagementControls.js';
test('change management data is complete', () => {
  for (const [rows, cols] of [[CM.ENVIRONMENTS, CM.ENV_COLUMNS], [CM.SEPARATION_CONTROLS, CM.SEPARATION_COLUMNS], [CM.STAGES, CM.STAGE_COLUMNS], [CM.WORKED_EXAMPLE, CM.WORKED_COLUMNS], [CM.AUDITOR_SAMPLING, CM.SAMPLING_COLUMNS]])
    rows.forEach((r) => assert.equal(r.length, cols.length, r[0]));
  const envs = CM.ENVIRONMENTS.map((r) => r[0]).join(' ');
  for (const e of ['Staging', 'Pre-production', 'Development', 'Test / QA', 'Production', 'Local']) assert.ok(envs.includes(e), e);
  assert.ok(CM.STAGES.some((r) => /QA/.test(r[2])));
  assert.ok(!JSON.stringify(CM).includes('—'));
});
