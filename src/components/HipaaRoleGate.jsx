import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  Shield, UserCheck, AlertTriangle, CheckCircle2, HelpCircle,
  ChevronDown, ChevronRight, RotateCcw, ExternalLink, Users, Bot, Info,
} from 'lucide-react';
import {
  ROLE_OPTIONS, ROLE_STORAGE_KEY, FLOW_STORAGE_KEY,
  SCOPE_ACTIVITIES, PHI_FLOW_QUESTIONS, FLOW_ANSWERS, BAA_ANSWERS,
  roleLabel, roleShort, HHS_SOURCES,
} from '../data/hipaaDomain.js';

const HipaaRoleContext = createContext(null);

export function useHipaaRole() {
  return useContext(HipaaRoleContext);
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save HIPAA scope:', e);
  }
}

const EMPTY_SCOPE = {
  v: 1,
  roleId: null,
  current: [],
  planned: [],
  reviewer: { name: '', date: '', notes: '', confirmed: false },
  confirmedAt: null,
};

const EMPTY_FLOWS = { v: 1, answers: {}, vendors: [] };

// A question with no stored answer is unresolved, exactly like one explicitly
// left on "unknown". Counting only the literal string meant a fresh user, whose
// answers object is empty, saw a clean bill of health.
const answerOf = (answers, id) => (answers || {})[id] || 'unknown';
const isUnresolved = (answers, id) => answerOf(answers, id) === 'unknown';

const VENDOR_RELATIONSHIPS = [
  { id: 'covered-entity', label: 'Covered entity (they are our customer)' },
  { id: 'ba', label: 'Business associate (we are their BA)' },
  { id: 'subcontractor', label: 'Subcontractor to a BA (down the chain)' },
  { id: 'cloud-ai', label: 'Cloud / AI vendor that may touch PHI' },
  { id: 'other', label: 'Other' },
];

const TOUCHES_PHI = [
  { id: 'yes', label: 'Yes — creates, receives, maintains or transmits PHI' },
  { id: 'no', label: 'No — no PHI expected' },
  { id: 'unknown', label: 'Needs confirmation' },
];

function Chip({ tone = 'slate', children }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700/40 dark:text-slate-200 dark:border-slate-600',
    blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-800',
    amber: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-800',
    red: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-200 dark:border-rose-800',
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${tones[tone]}`}>
      {children}
    </span>
  );
}

function SectionTitle({ icon: Icon, children, sub }) {
  return (
    <div className="flex items-start gap-3 mb-3">
      {Icon && (
        <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4" />
        </span>
      )}
      <div className="min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white">{children}</h3>
        {sub && <p className="text-xs text-gray-500 dark:text-slate-300 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stage 1 — role and scope
// ---------------------------------------------------------------------------

function RoleStep({ draft, setDraft }) {
  const toggle = (field, id) => {
    setDraft(prev => {
      const list = prev[field] || [];
      return {
        ...prev,
        [field]: list.includes(id) ? list.filter(x => x !== id) : [...list, id],
      };
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle icon={Shield} sub="Determines which obligations below actually apply to you. This is a determination you make, not one the app makes for you.">
          1. Your HIPAA role
        </SectionTitle>
        <div className="grid sm:grid-cols-2 gap-3">
          {ROLE_OPTIONS.map(r => {
            const selected = draft.roleId === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setDraft(prev => ({ ...prev, roleId: selected ? null : r.id, confirmed: false }))}
                className={`text-left p-4 rounded-xl border transition ${
                  selected
                    ? 'border-slate-800 dark:border-slate-200 bg-slate-50 dark:bg-slate-700/40 ring-2 ring-slate-800 dark:ring-slate-200'
                    : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800/40 hover:border-slate-400'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${selected ? 'border-slate-800 dark:border-slate-100' : 'border-gray-300 dark:border-slate-500'}`}>
                    {selected && <span className="w-2 h-2 rounded-full bg-slate-800 dark:bg-slate-100" />}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{r.label}</p>
                    <p className="text-xs text-gray-600 dark:text-slate-300 mt-1">{r.blurb}</p>
                    <a
                      href={r.citeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-blue-600 dark:text-blue-300 hover:underline"
                    >
                      {r.cite} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {draft.roleId && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600">
            {(() => {
              const r = ROLE_OPTIONS.find(x => x.id === draft.roleId);
              if (!r) return null;
              return (
                <>
                  {r.duties && r.duties.length > 0 && (
                    <ul className="space-y-1.5 text-sm text-gray-700 dark:text-slate-200">
                      {r.duties.map(d => (
                        <li key={d} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {r.notYourDuty && r.notYourDuty.length > 0 && (
                    <ul className="space-y-1.5 text-sm text-gray-700 dark:text-slate-200 mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                      {r.notYourDuty.map(d => (
                        <li key={d} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <SectionTitle sub="What you actually do today. Be accurate — this drives applicability, not marketing.">
            Current operations
          </SectionTitle>
          <div className="space-y-2">
            {SCOPE_ACTIVITIES.map(a => (
              <label key={a.id} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/30 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-slate-700 focus:ring-slate-500"
                  checked={(draft.current || []).includes(a.id)}
                  onChange={() => toggle('current', a.id)}
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">{a.label}</span>
                  <span className="block text-xs text-gray-500 dark:text-slate-300">{a.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle sub="What is coming. Planned scope is in scope from the day you start, not the day it ships.">
            Planned operations
          </SectionTitle>
          <div className="space-y-2">
            {SCOPE_ACTIVITIES.map(a => (
              <label key={a.id} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/30 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-slate-700 focus:ring-slate-500"
                  checked={(draft.planned || []).includes(a.id)}
                  onChange={() => toggle('planned', a.id)}
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">{a.label}</span>
                  <span className="block text-xs text-gray-500 dark:text-slate-300">{a.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <SectionTitle icon={UserCheck} sub="A named person signs off. An unconfirmed determination is not a determination.">
          Human reviewer record
        </SectionTitle>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Reviewer name or role</span>
            <input
              type="text"
              value={draft.reviewer.name}
              onChange={(e) => setDraft(prev => ({ ...prev, reviewer: { ...prev.reviewer, name: e.target.value }, confirmed: false }))}
              placeholder="e.g. Privacy Officer, outside counsel"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 outline-none"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Date of determination</span>
            <input
              type="date"
              value={draft.reviewer.date}
              onChange={(e) => setDraft(prev => ({ ...prev, reviewer: { ...prev.reviewer, date: e.target.value }, confirmed: false }))}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 outline-none"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Reasoning and evidence</span>
            <textarea
              rows={3}
              value={draft.reviewer.notes}
              onChange={(e) => setDraft(prev => ({ ...prev, reviewer: { ...prev.reviewer, notes: e.target.value }, confirmed: false }))}
              placeholder="Why this role? What contract, function or facts support it? Where is the evidence filed?"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 outline-none"
            />
          </label>
        </div>
        <label className="mt-3 flex items-start gap-2.5 p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 rounded border-amber-400 text-amber-600 focus:ring-amber-500"
            checked={!!draft.reviewer.confirmed}
            onChange={(e) => setDraft(prev => ({ ...prev, reviewer: { ...prev.reviewer, confirmed: e.target.checked } }))}
          />
          <span className="text-sm text-gray-700 dark:text-amber-100">
            A named human has reviewed and confirmed this determination. Until this is checked, the role stays provisional and no task below is treated as a settled obligation.
          </span>
        </label>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stage 2 — AI / communications PHI flows
// ---------------------------------------------------------------------------

function FlowsStep({ flows, setFlows, roleId }) {
  const setAnswer = (id, value) => {
    setFlows(prev => ({ ...prev, answers: { ...(prev.answers || {}), [id]: value } }));
  };

  const grouped = PHI_FLOW_QUESTIONS.reduce((acc, q) => {
    (acc[q.group] = acc[q.group] || []).push(q);
    return acc;
  }, {});

  const unresolvedCount = PHI_FLOW_QUESTIONS.filter(q => isUnresolved(flows.answers, q.id)).length;
  const unresolvedVendors = (flows.vendors || []).filter(v => v.baa === 'unknown' || v.touchesPhi === 'unknown').length;

  const addVendor = () => {
    setFlows(prev => ({
      ...prev,
      vendors: [...(prev.vendors || []), {
        id: `v${Date.now()}${Math.random().toString(36).slice(2, 7)}`,
        name: '',
        relationship: 'unknown',
        touchesPhi: 'unknown',
        baa: 'unknown',
        note: '',
      }],
    }));
  };

  const updateVendor = (id, patch) => {
    setFlows(prev => ({
      ...prev,
      vendors: (prev.vendors || []).map(v => (v.id === id ? { ...v, ...patch } : v)),
    }));
  };

  const removeVendor = (id) => {
    setFlows(prev => ({ ...prev, vendors: (prev.vendors || []).filter(v => v.id !== id) }));
  };

  const baaDef = roleId === 'ce' || roleId === 'dual'
    ? 'If they touch PHI on your behalf, you need a BAA before you share. The BAA has to bind their own subprocessors too.'
    : 'If they touch PHI for you, the BAA is between you and the covered entity chain above you — confirm which contract actually binds this vendor.';

  return (
    <div className="space-y-6">
      {(unresolvedCount > 0 || unresolvedVendors > 0) && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                {unresolvedCount} of {PHI_FLOW_QUESTIONS.length} questions still need confirmation
                {unresolvedVendors > 0 && `, and ${unresolvedVendors} vendor${unresolvedVendors === 1 ? '' : 's'} are unresolved`}
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">
                These default to unresolved on purpose. An unanswered question is not a &ldquo;no&rdquo; — treat it as an open item in your risk analysis until a human closes it.
              </p>
            </div>
          </div>
        </div>
      )}

      {Object.entries(grouped).map(([group, questions]) => (
        <div key={group}>
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            {group === 'AI model calls' ? <Bot className="w-4 h-4" /> : <Users className="w-4 h-4" />}
            {group}
          </h4>
          <div className="space-y-2.5">
            {questions.map(q => {
              const answer = answerOf(flows.answers, q.id);
              return (
                <div key={q.id} className={`p-3.5 rounded-xl border ${answer === 'unknown' ? 'border-amber-200 dark:border-amber-800' : 'border-gray-200 dark:border-slate-600'}`}>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{q.label}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-300 mt-1">{q.why}</p>
                  <p className="text-[11px] text-gray-400 dark:text-slate-400 mt-1">{q.cite}</p>
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {FLOW_ANSWERS.map(a => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setAnswer(q.id, a.id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
                          answer === a.id
                            ? a.id === 'yes'
                              ? 'bg-rose-600 text-white border-rose-600'
                              : a.id === 'no'
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-amber-500 text-white border-amber-500'
                            : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border-gray-300 dark:border-slate-500 hover:border-slate-400'
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">BAA and subcontractor chain</h4>
          <button
            type="button"
            onClick={addVendor}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 hover:opacity-85 transition"
          >
            Add vendor
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-slate-300 mb-3">{baaDef}</p>
        <a
          href={HHS_SOURCES.baContracts.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-300 hover:underline mb-3"
        >
          {HHS_SOURCES.baContracts.label} <ExternalLink className="w-3 h-3" />
        </a>

        {(flows.vendors || []).length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-slate-300 p-4 rounded-xl border border-dashed border-gray-300 dark:border-slate-600">
            No vendors recorded. Add every tool that can create, receive, maintain or transmit PHI — including the ones you have not classified yet.
          </p>
        ) : (
          <div className="space-y-3">
            {flows.vendors.map(v => (
              <div key={v.id} className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-600">
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="block sm:col-span-2">
                    <span className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Vendor / tool</span>
                    <input
                      type="text"
                      value={v.name}
                      onChange={(e) => updateVendor(v.id, { name: e.target.value })}
                      placeholder="e.g. Hosted LLM provider, ticketing SaaS, SMS gateway"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Relationship</span>
                    <select
                      value={v.relationship}
                      onChange={(e) => updateVendor(v.id, { relationship: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 outline-none"
                    >
                      <option value="unknown">Needs confirmation</option>
                      {VENDOR_RELATIONSHIPS.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Does it touch PHI?</span>
                    <select
                      value={v.touchesPhi}
                      onChange={(e) => updateVendor(v.id, { touchesPhi: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 outline-none"
                    >
                      {TOUCHES_PHI.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">BAA status</span>
                    <select
                      value={v.baa}
                      onChange={(e) => updateVendor(v.id, { baa: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 outline-none"
                    >
                      {BAA_ANSWERS.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Note</span>
                    <input
                      type="text"
                      value={v.note}
                      onChange={(e) => updateVendor(v.id, { note: e.target.value })}
                      placeholder="Contract ref, gap, next step"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 outline-none"
                    />
                  </label>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => removeVendor(v.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-300 hover:underline"
                  >
                    <RotateCcw className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------

export function HipaaRoleProvider({ children }) {
  const [scope, setScope] = useState(EMPTY_SCOPE);
  const [flows, setFlows] = useState(EMPTY_FLOWS);
  const [hydrated, setHydrated] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const s = readJSON(ROLE_STORAGE_KEY, EMPTY_SCOPE);
    const restored = {
      ...EMPTY_SCOPE,
      ...s,
      reviewer: { ...EMPTY_SCOPE.reviewer, ...(s.reviewer || {}) },
    };
    setScope(restored);
    setFlows({ ...EMPTY_FLOWS, ...readJSON(FLOW_STORAGE_KEY, EMPTY_FLOWS) });
    // With no recorded role the intake has to open by itself, otherwise the
    // curriculum is reachable with no determination at all.
    setEditing(!restored.roleId);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeJSON(ROLE_STORAGE_KEY, scope);
  }, [scope, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeJSON(FLOW_STORAGE_KEY, flows);
  }, [flows, hydrated]);

  const value = useMemo(() => {
    const confirmed = !!scope.roleId && !!scope.reviewer.confirmed;
    const role = scope.roleId;
    return {
      role,
      roleId: role,
      roleLabel: roleLabel(role),
      roleShort: roleShort(role),
      confirmed,
      scope,
      flows,
      editing,
      setEditing,
      setScope,
      setFlows,
      roleApplies: (tags) => {
        if (!confirmed) return null;
        if (!Array.isArray(tags) || tags.length === 0) return null;
        if (role === 'uncertain' || role === 'none') return null;
        return tags.includes(role);
      },
      reset: () => {
        setScope(EMPTY_SCOPE);
        setFlows(EMPTY_FLOWS);
        setEditing(true);
      },
    };
  }, [scope, flows, editing, hydrated]);

  return <HipaaRoleContext.Provider value={value}>{children}</HipaaRoleContext.Provider>;
}

export function HipaaRoleChip() {
  const ctx = useHipaaRole();
  if (!ctx || !ctx.role) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-600">
      <Shield className="w-4 h-4 text-slate-700 dark:text-slate-200 shrink-0" />
      <span className="text-sm text-gray-700 dark:text-slate-200">
        Scoped as <strong>{ctx.roleLabel}</strong>
        {ctx.confirmed ? '' : ' — provisional, not human-confirmed'}
      </span>
      {ctx.confirmed ? (
        <Chip tone="green"><CheckCircle2 className="w-3 h-3" /> Confirmed by {ctx.scope.reviewer.name || 'reviewer'}</Chip>
      ) : (
        <Chip tone="amber"><AlertTriangle className="w-3 h-3" /> Needs sign-off</Chip>
      )}
      <button
        type="button"
        onClick={() => ctx.setEditing(true)}
        className="ml-auto inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-500 text-gray-700 dark:text-slate-200 hover:border-slate-400 transition"
      >
        Change scope
      </button>
    </div>
  );
}

export function HipaaScopeIntake({ onDone }) {
  const ctx = useHipaaRole();
  if (!ctx) return null;
  const { scope, setScope, flows, setFlows, confirmed, roleId, setEditing } = ctx;
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(true);

  // Deliberately no `!roleId` guard. This panel is where the role is chosen, so
  // hiding it until a role already exists made the first visit unreachable.
  if (!open) return null;

  const canProceed = !!roleId;
  const unresolved = PHI_FLOW_QUESTIONS.filter(q => isUnresolved(flows.answers, q.id)).length;

  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-gray-200 dark:border-slate-600 p-5 sm:p-6 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="w-9 h-9 rounded-xl bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Set your HIPAA scope</h2>
          <p className="text-sm text-gray-600 dark:text-slate-300">
            Most HIPAA obligations only bind you if you hold a specific role. Tell us yours and we will mark what applies — nothing is removed, and your progress is untouched.
          </p>
        </div>
        {roleId && (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-slate-300 hover:text-gray-700 dark:hover:text-slate-100 shrink-0"
          >
            Later <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 mb-5">
        {[['1', 'Role & scope'], ['2', 'PHI flows & BAAs']].map(([n, label], i) => {
          const idx = i + 1;
          const active = step === idx;
          return (
            <div key={n} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(idx)}
                className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
                  active
                    ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800 dark:border-slate-200'
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border-gray-300 dark:border-slate-500'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/20 flex items-center justify-center text-[10px]">{n}</span>
                {label}
              </button>
              {i === 0 && <span className="text-gray-300 dark:text-slate-600">→</span>}
            </div>
          );
        })}
      </div>

      {step === 1
        ? <RoleStep draft={scope} setDraft={setScope} />
        : <FlowsStep flows={flows} setFlows={setFlows} roleId={roleId} />}

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-600 flex flex-wrap items-center gap-3">
        {step === 1 ? (
          <button
            type="button"
            disabled={!canProceed}
            onClick={() => setStep(2)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Continue to PHI flows <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm border border-gray-300 dark:border-slate-500 text-gray-700 dark:text-slate-200 hover:border-slate-400 transition"
          >
            <ChevronDown className="w-4 h-4 rotate-90" /> Back to role
          </button>
        )}

        <button
          type="button"
          disabled={!confirmed}
          onClick={() => { setOpen(false); if (onDone) onDone(); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm bg-emerald-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <CheckCircle2 className="w-4 h-4" />
          {confirmed ? 'Start the playbook' : 'Confirm the determination above to continue'}
        </button>

        {step === 2 && roleId && (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs font-semibold text-gray-500 dark:text-slate-300 hover:text-gray-700 dark:hover:text-slate-100"
          >
            Skip for now — {unresolved} questions stay unresolved
          </button>
        )}

        <p className="text-[11px] text-gray-400 dark:text-slate-500 sm:ml-auto flex items-start gap-1.5 max-w-xs">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          Scope and flows are stored in this browser only. They are not a legal determination and HHS does not review them.
        </p>
      </div>
    </div>
  );
}

export function HipaaRoleGate({ children }) {
  const ctx = useHipaaRole();
  if (!ctx) return children;
  return (
    <>
      <HipaaRoleChip />
      {ctx.editing && <HipaaScopeIntake />}
      {children}
    </>
  );
}

export function HipaaBadge({ task, compact }) {
  const ctx = useHipaaRole();
  const citation = task && task.citation;
  if (!ctx || !ctx.confirmed || !citation) return null;
  const applies = ctx.roleApplies(citation.roles);
  if (applies === null) return null;

  if (!compact) {
    return (
      <div className="mt-2.5 ml-1 flex flex-wrap items-center gap-2">
        {citation.roles.map(r => {
          const opt = ROLE_OPTIONS.find(o => o.id === r);
          return <Chip key={r} tone={applies ? 'blue' : 'slate'}>{opt ? opt.short : r}</Chip>;
        })}
      </div>
    );
  }
  return null;
}

export function UnresolvedFlowsBanner() {
  const ctx = useHipaaRole();
  if (!ctx) return null;
  const unresolved = PHI_FLOW_QUESTIONS.filter(q => isUnresolved(ctx.flows.answers, q.id));
  if (unresolved.length === 0) return null;
  return (
    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6">
      <div className="flex items-start gap-2">
        <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
            {unresolved.length} PHI flow question{unresolved.length === 1 ? '' : 's'} still unresolved
          </p>
          <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">
            Unanswered is not &ldquo;no&rdquo;. Until a human closes these, treat them as open risk-analysis items.
          </p>
          <button
            type="button"
            onClick={() => ctx.setEditing(true)}
            className="mt-2 text-xs font-semibold text-amber-800 dark:text-amber-100 hover:underline"
          >
            Review flows
          </button>
        </div>
      </div>
    </div>
  );
}
