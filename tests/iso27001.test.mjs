/**
 * ISO/IEC 27001:2022 acceptance tests.
 *
 * These cover the data and rule layers only (no React), so they run under
 * `node --test` with no new dependencies.
 *
 * Run: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import {
  ANNEX_A_CONTROLS, ANNEX_A_THEMES, ANNEX_A_BY_ID, ANNEX_A_TOTAL,
} from '../src/data/iso27001AnnexA.js';
import {
  ISO_CLAUSES, ISO_CLAUSES_FLAT, ISO_CLAUSE_BY_ID, ISO_CATEGORIES,
  ISO_SOURCES, CLIMATE_AMENDMENT, ANNEX_A_BY_CLAUSE, searchAnnexA,
} from '../src/data/iso27001.js';
import {
  GEN_ISO_CLASSIFICATION, GEN_CROSS_FRAMEWORK_IDS, isCrossFrameworkItem,
} from '../src/data/iso27001Classification.js';
import {
  DECISION, IMPLEMENTATION_STATUS, emptySoa, applyDecision, validateControl,
  addCustomControl, removeCustomControl, commitVersion, computeStats,
  weakJustifications, incompleteNecessary, readStoredSoa, SOA_STORAGE_KEY,
} from '../src/data/iso27001Soa.js';

// ---------------------------------------------------------------- Annex A

test('Annex A has exactly 93 reference controls', () => {
  assert.equal(ANNEX_A_CONTROLS.length, 93);
  assert.equal(ANNEX_A_TOTAL, 93);
});

test('Annex A theme counts are 37 / 8 / 14 / 34', () => {
  const expected = { 'A.5': 37, 'A.6': 8, 'A.7': 14, 'A.8': 34 };
  for (const [theme, count] of Object.entries(expected)) {
    assert.equal(ANNEX_A_CONTROLS.filter(c => c.theme === theme).length, count, theme);
  }
  assert.equal(ANNEX_A_THEMES.length, 4);
  for (const t of ANNEX_A_THEMES) assert.equal(t.count, expected[t.id], t.id);
});

test('Annex A IDs are unique and contiguous within each theme', () => {
  const ids = ANNEX_A_CONTROLS.map(c => c.id);
  assert.equal(ids.length, new Set(ids).size, 'duplicate control IDs');
  for (const t of ANNEX_A_THEMES) {
    const nums = ANNEX_A_CONTROLS.filter(c => c.theme === t.id).map(c => Number(c.id.split('.')[2]));
    assert.deepEqual(nums, Array.from({ length: t.count }, (_, i) => i + 1), `${t.id} not contiguous`);
  }
});

test('every Annex A control is marked a reference control, not a requirement', () => {
  for (const c of ANNEX_A_CONTROLS) {
    assert.equal(c.nature, 'reference-control', c.id);
    assert.equal(c.provenance, 'original-paraphrase', c.id);
    assert.ok(c.title && c.purpose, `${c.id} missing content`);
  }
});

test('every Annex A control references at least one real clause', () => {
  for (const c of ANNEX_A_CONTROLS) {
    assert.ok(c.clauses.length > 0, `${c.id} has no clause reference`);
    for (const cl of c.clauses) {
      assert.ok(ISO_CLAUSE_BY_ID[cl], `${c.id} references unknown clause ${cl}`);
    }
  }
});

test('ANNEX_A_BY_ID index is complete', () => {
  assert.equal(Object.keys(ANNEX_A_BY_ID).length, 93);
  assert.ok(ANNEX_A_BY_ID['A.8.5']);
  assert.ok(ANNEX_A_BY_ID['A.5.37']);
});

test('Annex A search matches id, title and purpose', () => {
  assert.ok(searchAnnexA('A.8.5').some(c => c.id === 'A.8.5'));
  assert.ok(searchAnnexA('cryptograph').length > 0);
  assert.equal(searchAnnexA('zzzznotacontrol').length, 0);
  assert.equal(searchAnnexA('', { theme: 'A.6' }).length, 8);
  assert.equal(searchAnnexA('', { theme: 'A.5' }).length, 37);
});

// --------------------------------------------------------------- Clauses

test('Clauses 4-10 are present exactly once', () => {
  const ids = ISO_CLAUSES.map(c => c.id);
  assert.deepEqual(ids, ['4', '5', '6', '7', '8', '9', '10']);
  assert.equal(new Set(ids).size, ids.length);
});

test('every clause and subclause has a summary', () => {
  for (const c of ISO_CLAUSES) {
    assert.ok(c.summary, `clause ${c.id} missing summary`);
    for (const s of c.subclauses) assert.ok(s.summary, `${c.id}.${s.id} missing summary`);
  }
});

test('Clause 6.1.3 d is present — the Statement of Applicability hook', () => {
  const soa = ISO_CLAUSES_FLAT.find(c => c.id === '6.1.3');
  assert.ok(soa, '6.1.3 missing');
  assert.match(soa.summary, /statement of applicability|SoA/i);
  assert.match(soa.summary, /Annex A/i);
});

test('risk assessment and treatment are covered in both Clause 6 and Clause 8', () => {
  assert.ok(ISO_CLAUSE_BY_ID['6.1.2'], '6.1.2 missing');
  assert.ok(ISO_CLAUSE_BY_ID['6.1.3'], '6.1.3 missing');
  assert.ok(ISO_CLAUSE_BY_ID['8.2'], '8.2 missing');
  assert.ok(ISO_CLAUSE_BY_ID['8.3'], '8.3 missing');
  assert.ok(ISO_CLAUSE_BY_ID['7.5'], 'documented information missing');
  assert.ok(ISO_CLAUSE_BY_ID['9.2'], 'internal audit missing');
  assert.ok(ISO_CLAUSE_BY_ID['10.2'], 'nonconformity/corrective action missing');
});

test('ANNEX_A_BY_CLAUSE index resolves to real control IDs', () => {
  const ids = Object.values(ANNEX_A_BY_CLAUSE).flat();
  assert.ok(ids.length > 0);
  for (const id of ids) assert.ok(ANNEX_A_BY_ID[id], `dangling ${id}`);
});

// ----------------------------------------------------- Climate amendment

test('climate amendment applies only to Clauses 4.1 and 4.2', () => {
  assert.deepEqual(CLIMATE_AMENDMENT.appliesTo, ['4.1', '4.2']);
  assert.ok(ISO_CLAUSE_BY_ID['4.1'].climate, '4.1 not flagged');
  assert.ok(ISO_CLAUSE_BY_ID['4.2'].climate, '4.2 not flagged');
  for (const c of ISO_CLAUSES_FLAT) {
    if (!['4.1', '4.2'].includes(c.id)) assert.ok(!c.climate, `${c.id} must not be climate-flagged`);
  }
});

test('climate amendment requires a determination, not a particular answer', () => {
  assert.match(CLIMATE_AMENDMENT.clause41.requirement, /shall determine whether climate change is a relevant issue/i);
  assert.ok(CLIMATE_AMENDMENT.clause41.guidance.length > 0);
  assert.ok(CLIMATE_AMENDMENT.clause42.guidance.length > 0);
  const all = CLIMATE_AMENDMENT.clause41.guidance.join(' ').toLowerCase();
  assert.ok(all.includes('not relevant'), 'must state that not-relevant is a valid outcome');
});

// ------------------------------------------------------------ Categories

test('the five content categories are defined', () => {
  assert.deepEqual(
    Object.keys(ISO_CATEGORIES).sort(),
    ['annexA', 'clause', 'otherFramework', 'practice', 'unverified']
  );
  for (const c of Object.values(ISO_CATEGORIES)) assert.ok(c.label && c.desc);
});

// ------------------------------------------------- Assessment classification

test('all 22 GEN items are classified, and none are invented', () => {
  const src = fs.readFileSync(new URL('../src/data/assessments.js', import.meta.url), 'utf8');
  const ids = [...new Set([...src.matchAll(/id: '(GEN-\d+)'/g)].map(m => m[1]))];
  assert.equal(ids.length, 22);
  for (const id of ids) assert.ok(GEN_ISO_CLASSIFICATION[id], `${id} unclassified`);
  for (const id of Object.keys(GEN_ISO_CLASSIFICATION)) assert.ok(ids.includes(id), `${id} does not exist`);
});

test('every classification uses a known category and has a written basis', () => {
  for (const [id, c] of Object.entries(GEN_ISO_CLASSIFICATION)) {
    assert.ok(ISO_CATEGORIES[c.primary], `${id} has unknown primary ${c.primary}`);
    assert.ok(c.basis && c.basis.length > 30, `${id} basis is too thin`);
  }
});

test('every Annex A reference in a classification exists', () => {
  for (const [id, c] of Object.entries(GEN_ISO_CLASSIFICATION)) {
    for (const ref of c.annexA) assert.ok(ANNEX_A_BY_ID[ref], `${id} -> ${ref} missing`);
    for (const cl of c.clause) assert.ok(ISO_CLAUSE_BY_ID[cl], `${id} -> clause ${cl} missing`);
  }
});

test('generic security practices are not labelled clause requirements', () => {
  // MFA, access-review cadence, ASV scanning and algorithm choice are all
  // reference-control implementations. None is a normative clause of 27001,
  // so none may claim to be.
  for (const id of ['GEN-01', 'GEN-05', 'GEN-10', 'GEN-11']) {
    const c = GEN_ISO_CLASSIFICATION[id];
    assert.notEqual(c.primary, 'clause', `${id} must not be a clause requirement`);
    assert.deepEqual(c.clause, [], `${id} must not cite a clause as a mandate`);
  }
});

test('genuine obligations are recognised, not over-corrected into "just practice"', () => {
  // Over-correcting is as wrong as over-claiming. These two really do rest on
  // normative clauses, so they must be labelled as requirements.
  assert.equal(GEN_ISO_CLASSIFICATION['GEN-08'].primary, 'clause');
  assert.equal(GEN_ISO_CLASSIFICATION['GEN-22'].primary, 'clause');
  // Clause 7.3 obliges awareness; it does not dictate a platform or cadence.
  const g22 = GEN_ISO_CLASSIFICATION['GEN-22'];
  assert.match(g22.note, /cadence/i);
  assert.match(g22.practiceCaveat, /not ISO requirements/i);
});

test('GEN-08 is correctly identified as a genuine requirement', () => {
  const c = GEN_ISO_CLASSIFICATION['GEN-08'];
  assert.equal(c.primary, 'clause');
  assert.ok(c.clause.length > 0);
});

test('GDPR / HIPAA / PCI material is quarantined as cross-framework', () => {
  for (const id of ['GEN-14', 'GEN-16', 'GEN-17', 'GEN-18', 'GEN-20']) {
    assert.ok(isCrossFrameworkItem(id), `${id} should be cross-framework`);
    assert.ok(GEN_ISO_CLASSIFICATION[id].contaminants.length > 0, `${id} needs an explicit contaminant list`);
  }
  // The non-ISO deadlines are named, not hidden.
  const joined = Object.values(GEN_ISO_CLASSIFICATION).flatMap(c => c.contaminants).join(' | ');
  assert.match(joined, /GDPR/);
  assert.match(joined, /HIPAA/);
  assert.match(joined, /CERT-In/);
  assert.match(joined, /PCI/);
});

test('GEN-18 is primarily other-framework, not an ISO control', () => {
  assert.equal(GEN_ISO_CLASSIFICATION['GEN-18'].primary, 'otherFramework');
});

test('cadence-bearing items carry a practice caveat', () => {
  for (const id of ['GEN-05', 'GEN-10', 'GEN-12', 'GEN-21', 'GEN-22']) {
    const c = GEN_ISO_CLASSIFICATION[id];
    assert.ok(c.practiceCaveat, `${id} must state its cadence is organisation-defined`);
  }
  assert.match(GEN_ISO_CLASSIFICATION['GEN-05'].practiceCaveat, /no frequency|not required/i);
});

test('misleading titles are corrected but the original is preserved in data', () => {
  for (const id of ['GEN-05', 'GEN-22']) {
    assert.ok(GEN_ISO_CLASSIFICATION[id].replaceTitle, `${id} needs a corrected title`);
  }
  // The replacement must drop the hardcoded frequency.
  assert.ok(!/quarterly|annual/i.test(GEN_ISO_CLASSIFICATION['GEN-05'].replaceTitle));
  assert.ok(!/quarterly|annual/i.test(GEN_ISO_CLASSIFICATION['GEN-22'].replaceTitle));
});

test('isCrossFrameworkItem rejects non-string keys', () => {
  // Array#filter passes the element, not the key. A bare object must not
  // silently resolve to "not cross-framework", which would empty the section.
  const item = { id: 'GEN-18', title: 'x' };
  assert.equal(isCrossFrameworkItem(item), false);
  assert.equal(isCrossFrameworkItem(undefined), false);
  assert.equal(isCrossFrameworkItem(null), false);
  assert.equal(isCrossFrameworkItem('GEN-18'), true);
  // The pattern the component actually uses.
  const quarantined = ['GEN-01', 'GEN-10', 'GEN-18', 'GEN-20']
    .filter(it => isCrossFrameworkItem(it));
  assert.deepEqual(quarantined, ['GEN-10', 'GEN-18', 'GEN-20']);
});

test('cross-framework list is derived, not hardcoded', () => {
  const expected = Object.keys(GEN_ISO_CLASSIFICATION).filter(isCrossFrameworkItem).sort();
  assert.deepEqual([...GEN_CROSS_FRAMEWORK_IDS].sort(), expected);
});

// ------------------------------------------------------------- SoA rules

test('a fresh SoA decides nothing', () => {
  const s = computeStats(emptySoa());
  assert.equal(s.necessary, 0);
  assert.equal(s.notNecessary, 0);
  assert.equal(s.undecided, 93);
  assert.equal(s.annexTotal, 93);
});

test('an exclusion without a justification is invalid', () => {
  const s = applyDecision(emptySoa(), 'A.5.1', { decision: DECISION.notNecessary, rationale: '' });
  const errs = validateControl(s.controls['A.5.1']);
  assert.ok(errs.length > 0, 'must reject a bare exclusion');
  assert.match(errs[0], /justification/i);
});

test('a thin exclusion is invalid but a real one is accepted', () => {
  let s = applyDecision(emptySoa(), 'A.5.1', { decision: DECISION.notNecessary, rationale: 'n/a' });
  assert.ok(validateControl(s.controls['A.5.1']).length > 0);
  s = applyDecision(s, 'A.5.1', { rationale: 'Out of ISMS scope; no confidential information processed here.' });
  assert.equal(validateControl(s.controls['A.5.1']).length, 0);
});

test('an undecided control cannot validate', () => {
  assert.ok(validateControl({ decision: DECISION.undecided, rationale: '' }).length > 0);
});

test('an excluded control cannot carry implementation evidence', () => {
  const s = applyDecision(emptySoa(), 'A.5.1', {
    decision: DECISION.notNecessary,
    rationale: 'Out of scope, no confidential information processed.',
    evidence: 'policy.pdf',
  });
  assert.match(validateControl(s.controls['A.5.1'])[0], /evidence/i);
});

test('necessary controls are counted and drive the implementation denominator', () => {
  let s = applyDecision(emptySoa(), 'A.8.5', {
    decision: DECISION.necessary, rationale: 'Remote admin access risk.', owner: 'IT',
    evidence: 'IAM export', status: IMPLEMENTATION_STATUS.implemented,
  });
  s = applyDecision(s, 'A.5.1', { decision: DECISION.notNecessary, rationale: 'Out of scope entirely here.' });
  const st = computeStats(s);
  assert.equal(st.necessary, 1);
  assert.equal(st.notNecessary, 1);
  assert.equal(st.undecided, 91);
  assert.equal(st.applicableTotal, 1);
  assert.equal(st.implementationRate, 100);
  assert.equal(st.decisionCoverage, 2);
});

test('excluding everything is a valid end state, not a failure state', () => {
  let s = emptySoa();
  for (const c of ANNEX_A_CONTROLS) {
    s = applyDecision(s, c.id, { decision: DECISION.notNecessary, rationale: 'Documented and reviewed as out of scope.' });
  }
  const st = computeStats(s);
  assert.equal(st.undecided, 0);
  assert.equal(st.decisionCoverage, 100);
  assert.equal(st.applicableTotal, 0);
  assert.equal(st.implementationRate, 0, 'nothing applicable means no implementation rate');
});

test('progress is derived from decisions, not a fixed 93-control score', () => {
  const st = computeStats(emptySoa());
  assert.equal(st.annexTotal, 93);
  assert.equal(st.decisionCoverage, 0, 'no decisions means no decision coverage');
  assert.equal(st.implementationRate, 0, 'no decisions means no implementation claim');
  assert.equal(st.applicableTotal, 0, 'nothing is applicable until you decide it is');
});

test('custom controls need a title, purpose and rationale', () => {
  assert.ok(addCustomControl(emptySoa(), { title: '', purpose: 'x', rationale: 'y' }).error);
  assert.ok(addCustomControl(emptySoa(), { title: 'X', purpose: '', rationale: 'y' }).error);
  assert.ok(addCustomControl(emptySoa(), { title: 'X', purpose: 'does a thing', rationale: '' }).error);
  const ok = addCustomControl(emptySoa(), {
    title: 'Hardware key custody', purpose: 'Log of who holds admin hardware keys',
    rationale: 'Not covered by a single Annex A control.',
  });
  assert.equal(ok.error, null);
  assert.equal(ok.state.customControls[0].id, 'CUSTOM-01');
});

test('custom controls add to the applicable denominator', () => {
  const { state } = addCustomControl(emptySoa(), {
    title: 'K', purpose: 'Custody log for hardware keys', rationale: 'Gap in Annex A coverage.',
  });
  assert.equal(computeStats(state).customControls, 1);
  assert.equal(computeStats(state).applicableTotal, 1);
});

test('custom controls can be removed', () => {
  const { state } = addCustomControl(emptySoa(), {
    title: 'K', purpose: 'Custody log for hardware keys', rationale: 'Gap in Annex A coverage.',
  });
  assert.equal(removeCustomControl(state, 'CUSTOM-01').customControls.length, 0);
});

test('weak justifications are detectable', () => {
  const s = applyDecision(emptySoa(), 'A.5.2', { decision: DECISION.notNecessary, rationale: 'no' });
  assert.ok(weakJustifications(s).includes('A.5.2'));
});

test('necessary controls missing owner or evidence are flagged', () => {
  const s = applyDecision(emptySoa(), 'A.8.5', { decision: DECISION.necessary, rationale: 'Risk driven.' });
  const gaps = incompleteNecessary(s);
  assert.equal(gaps.length, 1);
  assert.ok(gaps[0].missing.includes('owner'));
  assert.ok(gaps[0].missing.includes('evidence'));
});

test('every save creates a version with stats and approver', () => {
  let s = applyDecision(emptySoa(), 'A.8.5', { decision: DECISION.necessary, rationale: 'Risk driven.' });
  s = commitVersion(s, { note: 'Annual review', approvedBy: 'CISO' });
  assert.equal(s.history.length, 1);
  assert.equal(s.history[0].version, 1);
  assert.equal(s.history[0].approvedBy, 'CISO');
  assert.equal(s.history[0].stats.necessary, 1);
  s = commitVersion(s, { note: 'Second review' });
  assert.equal(s.history.length, 2);
  assert.equal(s.history[1].version, 2);
  assert.ok(s.createdAt, 'createdAt must be set');
});

// ------------------------------------------------------------ Persistence

test('SoA uses its own storage key and never the learning or assessment keys', () => {
  assert.equal(SOA_STORAGE_KEY, 'iso27001-soa-v1');
  assert.notEqual(SOA_STORAGE_KEY, 'compliance-learning-iso27001-li');
  assert.notEqual(SOA_STORAGE_KEY, 'assessment-iso27001-li');
  assert.notEqual(SOA_STORAGE_KEY, 'compliance-learning-iso27001-la');
});

test('SoA round-trips through storage', () => {
  let s = applyDecision(emptySoa(), 'A.8.5', { decision: DECISION.necessary, rationale: 'Risk driven.', status: IMPLEMENTATION_STATUS.partial });
  s = commitVersion(s, { note: 'v1' });
  const back = readStoredSoa(JSON.stringify(s));
  assert.equal(back.controls['A.8.5'].decision, DECISION.necessary);
  assert.equal(back.controls['A.8.5'].status, IMPLEMENTATION_STATUS.partial);
  assert.equal(back.history.length, 1);
});

test('corrupt or missing storage degrades to a clean empty SoA', () => {
  assert.equal(readStoredSoa(null).undecided, undefined);
  assert.equal(readStoredSoa('{not json').history.length, 0);
  assert.equal(readStoredSoa('"a string"').customControls.length, 0);
  const partial = readStoredSoa(JSON.stringify({ controls: { 'A.5.1': { decision: 'necessary' } } }));
  assert.equal(partial.customControls.length, 0);
  assert.equal(partial.history.length, 0);
  assert.equal(partial.controls['A.5.1'].decision, 'necessary');
});

// ------------------------------------------------------------- Sources

test('every source has a version and a last-reviewed date', () => {
  for (const s of Object.values(ISO_SOURCES)) {
    assert.ok(s.url.startsWith('https://'), `${s.id} needs a url`);
    assert.ok(s.version, `${s.id} needs a version`);
    assert.match(s.lastReviewed, /^\d{4}-\d{2}-\d{2}$/, `${s.id} needs a lastReviewed date`);
    assert.ok(s.note, `${s.id} needs a note`);
  }
});

test('the amendment source is the climate amendment', () => {
  assert.match(ISO_SOURCES.amendment.url, /88435/);
  assert.equal(CLIMATE_AMENDMENT.source.id, ISO_SOURCES.amendment.id);
});

test('no substantial ISO text is embedded — everything is a paraphrase', () => {
  assert.equal(ANNEX_A_CONTROLS[0].provenance, 'original-paraphrase');
  const purpose = ANNEX_A_CONTROLS[0].purpose.toLowerCase();
  // A verbatim control statement would reproduce long ISO phrasing verbatim.
  assert.ok(!purpose.includes('the organization shall'), 'verbatim standard text detected');
  for (const c of ANNEX_A_CONTROLS) {
    assert.ok(c.purpose.length < 400, `${c.id} purpose is too long — may contain standard text`);
  }
});
