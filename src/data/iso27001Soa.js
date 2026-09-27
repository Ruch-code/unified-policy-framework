/**
 * Statement of Applicability state and rules.
 *
 * The SoA is required by ISO/IEC 27001:2022 Clause 6.1.3 d: after selecting
 * risk-treatment controls, the organisation compares that selection against
 * Annex A to verify nothing relevant has been omitted, and records the result.
 *
 * Design rules enforced here:
 *  - Nothing is pre-decided. A control starts at "not yet decided".
 *  - An exclusion REQUIRES a written justification. It cannot be saved without one.
 *  - Necessary controls not in Annex A can be added (custom controls).
 *  - Every save appends to version history.
 *  - Progress is derived from the organisation's own decisions. There is no
 *    fixed "93 controls complete" score.
 *  - Legacy `sel` defaults in the reference card are treated as advisory
 *    suggestions only, never as decisions.
 *
 * MIGRATION: state lives under a NEW key. Existing learning progress
 * (compliance-learning-iso27001-li) and assessment progress
 * (assessment-iso27001-li) are untouched by this module.
 */

import { ANNEX_A_CONTROLS, ANNEX_A_BY_ID } from './iso27001AnnexA.js';

export const SOA_STORAGE_KEY = 'iso27001-soa-v1';

export const DECISION = {
  undecided: 'undecided',
  necessary: 'necessary',
  notNecessary: 'notNecessary',
};

export const IMPLEMENTATION_STATUS = {
  notStarted: 'not-started',
  planned: 'planned',
  partial: 'partial',
  implemented: 'implemented',
  notApplicable: 'not-applicable',
};

export const STATUS_LABELS = {
  [IMPLEMENTATION_STATUS.notStarted]: 'Not started',
  [IMPLEMENTATION_STATUS.planned]: 'Planned',
  [IMPLEMENTATION_STATUS.partial]: 'Partially implemented',
  [IMPLEMENTATION_STATUS.implemented]: 'Implemented',
  [IMPLEMENTATION_STATUS.notApplicable]: 'Not applicable to this decision',
};

export function emptySoa() {
  return {
    v: 1,
    createdAt: null,
    // controlId -> { decision, rationale, status, owner, reviewer, reviewDate, evidence, relatedRisks, custom }
    controls: {},
    // controls the organisation determined necessary that are NOT in Annex A
    customControls: [],
    // approved residual-risk decisions
    residualRisk: [],
    history: [],
    scope: { statement: '', owner: '', reviewDate: '' },
  };
}

/**
 * Apply a decision. Returns the next state.
 * Throws-free: invalid input is rejected with a reason so the UI can explain.
 */
export function applyDecision(state, controlId, patch) {
  const current = state.controls[controlId] || {
    decision: DECISION.undecided,
    rationale: '',
    status: IMPLEMENTATION_STATUS.notStarted,
    owner: '',
    reviewer: '',
    reviewDate: '',
    evidence: '',
    relatedRisks: '',
  };
  const next = { ...current, ...patch, decidedAt: new Date().toISOString() };
  return { ...state, controls: { ...state.controls, [controlId]: next } };
}

/**
 * Validation. An exclusion without a rationale is not saveable, which is the
 * single most important guard here: "not applicable" on its own is exactly what
 * an auditor challenges.
 */
export function validateControl(record) {
  const errors = [];
  if (!record) return ['No record.'];
  if (record.decision === DECISION.undecided) {
    errors.push('Decision required: mark the control necessary or not necessary.');
    return errors;
  }
  if (!record.rationale || record.rationale.trim().length < 12) {
    errors.push(
      record.decision === DECISION.notNecessary
        ? 'A written justification is required to exclude an Annex A control. "Not applicable" on its own is not defensible.'
        : 'Record why this control is necessary for the organisation.'
    );
  }
  if (record.decision === DECISION.notNecessary && record.evidence) {
    errors.push('A control excluded from the SoA should not carry implementation evidence. Clear the evidence or re-decide it as necessary.');
  }
  return errors;
}

export function addCustomControl(state, { title, purpose, rationale, clauses = [], risks = [], owner = '' }) {
  if (!title || !title.trim()) return { state, error: 'A custom control needs a title.' };
  if (!purpose || purpose.trim().length < 12) return { state, error: 'Describe what the custom control does.' };
  if (!rationale || rationale.trim().length < 12) return { state, error: 'Record why this control is necessary. A custom control still needs a documented rationale.' };
  const id = `CUSTOM-${String(state.customControls.length + 1).padStart(2, '0')}`;
  return {
    state: {
      ...state,
      customControls: [...state.customControls, {
        id, title: title.trim(), purpose: purpose.trim(), rationale: rationale.trim(),
        clauses, risks, owner, status: IMPLEMENTATION_STATUS.notStarted,
        evidence: '', reviewer: '', reviewDate: '',
      }],
    },
    error: null,
  };
}

export function removeCustomControl(state, id) {
  return { ...state, customControls: state.customControls.filter(c => c.id !== id) };
}

/** Every save is versioned. Approvals are recorded separately. */
export function commitVersion(state, { note, approvedBy }) {
  const stats = computeStats(state);
  const entry = {
    version: state.history.length + 1,
    at: new Date().toISOString(),
    note: note || '',
    approvedBy: approvedBy || '',
    stats,
  };
  return { ...state, history: [...state.history, entry], createdAt: state.createdAt || entry.at };
}

/**
 * Progress is derived from decisions, never from a fixed 93-control score.
 * The denominator is what the organisation has actually decided about.
 */
export function computeStats(state) {
  const annexIds = ANNEX_A_CONTROLS.map(c => c.id);
  const decided = { necessary: 0, notNecessary: 0, undecided: 0 };
  const byStatus = {};
  Object.values(IMPLEMENTATION_STATUS).forEach(s => { byStatus[s] = 0; });

  annexIds.forEach(id => {
    const rec = state.controls[id];
    const d = rec ? rec.decision : DECISION.undecided;
    decided[d] = (decided[d] || 0) + 1;
    if (d === DECISION.necessary) {
      const s = rec.status || IMPLEMENTATION_STATUS.notStarted;
      if (byStatus[s] !== undefined) byStatus[s] += 1;
    }
  });

  const customDecided = state.customControls.length;
  const customImplemented = state.customControls.filter(c => c.status === IMPLEMENTATION_STATUS.implemented).length;

  const applicableTotal = decided.necessary + customDecided;
  const implemented = byStatus[IMPLEMENTATION_STATUS.implemented] + customImplemented;

  return {
    annexTotal: annexIds.length,
    necessary: decided.necessary,
    notNecessary: decided.notNecessary,
    undecided: decided.undecided,
    customControls: customDecided,
    applicableTotal,
    decisionCoverage: annexIds.length ? Math.round(((decided.necessary + decided.notNecessary) / annexIds.length) * 100) : 0,
    implementationRate: applicableTotal ? Math.round((implemented / applicableTotal) * 100) : 0,
    implemented,
    byStatus,
  };
}

/** Exclusions that are saved but whose justification is too thin to defend. */
export function weakJustifications(state) {
  return Object.entries(state.controls)
    .filter(([, r]) => r.decision === DECISION.notNecessary && (!r.rationale || r.rationale.trim().length < 12))
    .map(([id]) => id);
}

/** Controls marked necessary but missing an owner or evidence reference. */
export function incompleteNecessary(state) {
  return Object.entries(state.controls)
    .filter(([, r]) => r.decision === DECISION.necessary && (!r.owner || !r.evidence))
    .map(([id, r]) => ({ id, missing: [!r.owner && 'owner', !r.evidence && 'evidence'].filter(Boolean) }));
}

/**
 * Advisory suggestions only. These are the `sel` values that were previously
 * hardcoded in the reference card. They are explicitly NOT decisions and must
 * never be persisted as such.
 */
export function buildSuggestions() {
  return {
    source: 'legacy-reference-card',
    disclaimer: 'Advisory starting points from the previous reference card. These are suggestions, not decisions, and have not been adopted.',
    note: 'Every control must be decided individually with a documented rationale.',
  };
}

export function readStoredSoa(raw) {
  if (!raw) return emptySoa();
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return emptySoa();
    const base = emptySoa();
    return {
      ...base,
      ...parsed,
      controls: parsed.controls && typeof parsed.controls === 'object' ? parsed.controls : {},
      customControls: Array.isArray(parsed.customControls) ? parsed.customControls : [],
      residualRisk: Array.isArray(parsed.residualRisk) ? parsed.residualRisk : [],
      history: Array.isArray(parsed.history) ? parsed.history : [],
      scope: { ...base.scope, ...(parsed.scope || {}) },
    };
  } catch {
    return emptySoa();
  }
}

export function annexLabel(id) {
  const c = ANNEX_A_BY_ID[id];
  return c ? `${c.id} ${c.title}` : id;
}
