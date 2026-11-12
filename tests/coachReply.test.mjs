import test from 'node:test';
import assert from 'node:assert';
import { parseCoachReply } from '../src/utils/coachReply.js';
test('coach reply is split into labelled parts', () => {
  const p = parseCoachReply('Score: 6/10\nWhat worked: Clear structure.\nWhat to improve: Add evidence.\nWhat to say instead: I would start by...\nsecond line\nNext question: How do you scope a SOC 2?');
  assert.deepEqual(p.map((x) => x.label), ['Score', 'What worked', 'What to improve', 'What to say instead', 'Next question']);
  assert.ok(p[3].body.includes('second line'));
  assert.equal(parseCoachReply('Hello. Tell me about yourself.')[0].label, '');
});
