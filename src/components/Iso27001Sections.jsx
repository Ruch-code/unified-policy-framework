import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ClauseGuide from './ClauseGuide.jsx';
import AnnexACatalog from './AnnexACatalog.jsx';
import Iso27001SoaWorkspace from './Iso27001SoaWorkspace.jsx';
import CrossFrameworkSeparation from './CrossFrameworkSeparation.jsx';
import { ISO_SOURCES, CLIMATE_AMENDMENT } from '../data/iso27001.js';
import { ANNEX_A_CONTROLS } from '../data/iso27001AnnexA.js';
import { GENERIC_ASSESSMENT } from '../data/assessments.js';
import {
  SOA_STORAGE_KEY, emptySoa, readStoredSoa, applyDecision,
  addCustomControl, removeCustomControl, commitVersion, computeStats,
} from '../data/iso27001Soa.js';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'clauses', label: 'Clauses 4–10' },
  { id: 'annexA', label: `Annex A (${ANNEX_A_CONTROLS.length})` },
  { id: 'soa', label: 'Statement of Applicability' },
  { id: 'other', label: 'Other frameworks' },
];

/**
 * ISO/IEC 27001:2022 reference workspace mounted into the LI page.
 *
 * Storage note: this uses its own key (`iso27001-soa-v1`) and never touches
 * `compliance-learning-iso27001-li`, so existing learning progress — including
 * task keys such as `w1-0` — is preserved.
 */
export default function Iso27001Sections({ basePath = '/iso/27001/li' }) {
  const [tab, setTab] = useState('overview');
  const [soa, setSoa] = useState(emptySoa);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    try {
      setSoa(readStoredSoa(localStorage.getItem(SOA_STORAGE_KEY)));
    } catch {
      setSoa(emptySoa());
    }
    setLoaded(true);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(SOA_STORAGE_KEY, JSON.stringify(soa));
    } catch {
      /* storage unavailable — the workspace still works for this session */
    }
  }, [soa, loaded]);

  const stats = useMemo(() => computeStats(soa), [soa]);

  const patchControl = useCallback((id, patch) => {
    setSoa(prev => {
      if (id === '__scope__') return { ...prev, scope: { ...prev.scope, ...(patch.scope || {}) } };
      if (id.startsWith('__custom__:')) {
        const cid = id.slice('__custom__:'.length);
        return {
          ...prev,
          customControls: prev.customControls.map(c => (c.id === cid ? { ...c, ...patch } : c)),
        };
      }
      return applyDecision(prev, id, patch);
    });
  }, []);

  const addCustom = useCallback((draft) => {
    let result = { state: null, error: 'Unable to add control.' };
    setSoa(prev => {
      result = addCustomControl(prev, draft);
      return result.state || prev;
    });
    return result;
  }, []);

  const removeCustom = useCallback((id) => {
    setSoa(prev => removeCustomControl(prev, id));
  }, []);

  const commit = useCallback(({ note, approvedBy }) => {
    setSoa(prev => commitVersion(prev, { note, approvedBy }));
  }, []);

  return (
    <div className="mb-8 space-y-4" id="iso27001-reference">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">ISO/IEC 27001:2022 Reference Workspace</h2>
          <p className="mt-1 text-sm text-slate-600">
            The clauses that are requirements, the {ANNEX_A_CONTROLS.length} reference controls you
            choose from, and the Statement of Applicability where you record those decisions.
          </p>
        </div>

        <div role="tablist" aria-label="ISO/IEC 27001:2022 sections" className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
          {TABS.map(t => (
            <button
              key={t.id}
              role="tab"
              id={`iso-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`iso-panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium ${
                tab === t.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div id={`iso-panel-${tab}`} role="tabpanel" aria-labelledby={`iso-tab-${tab}`} className="pt-5">
          {tab === 'overview' && <Overview stats={stats} soa={soa} basePath={basePath} />}
          {tab === 'clauses' && <ClauseGuide />}
          {tab === 'annexA' && <AnnexACatalog soaState={soa} onDecide={patchControl} />}
          {tab === 'soa' && (
            <Iso27001SoaWorkspace
              soaState={soa}
              onPatchControl={patchControl}
              onAddCustom={addCustom}
              onRemoveCustom={removeCustom}
              onCommit={commit}
            />
          )}
          {tab === 'other' && <CrossFrameworkSeparation items={GENERIC_ASSESSMENT} />}
        </div>
      </div>
    </div>
  );
}

function Overview({ stats, soa, basePath }) {
  const { standard, amendment, guidance, certification, soaGuidance } = ISO_SOURCES;
  const decided = stats.necessary + stats.notNecessary;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-900">What is and is not a requirement</h3>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <dt className="rounded bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-800">Clauses 4–10</dt>
            <dd className="text-slate-700">Requirements. Conformity is judged against these.</dd>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <dt className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">Annex A</dt>
            <dd className="text-slate-700">
              {ANNEX_A_CONTROLS.length} <strong>reference controls</strong>. You select from these
              based on risk; you are not required to implement all of them.
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <dt className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">Certification</dt>
            <dd className="text-slate-700">
              ISO does not certify organisations. An independent certification body does, and it
              defines its own audit process. Certification covers your ISMS scope, and is not a
              guarantee that a breach will never happen.
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-900">Your Statement of Applicability so far</h3>
        <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { l: 'Decisions recorded', v: `${decided}/${stats.annexTotal}` },
            { l: 'Necessary', v: stats.necessary },
            { l: 'Excluded with reason', v: stats.notNecessary },
            { l: 'Undecided', v: stats.undecided },
          ].map(s => (
            <div key={s.l} className="rounded-lg border border-slate-200 p-3">
              <dt className="text-xs text-slate-600">{s.l}</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums text-slate-900">{s.v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-slate-600">
          {decided === 0
            ? 'Nothing decided yet, which is the correct starting point. Each of the '
            : `${decided} of ${stats.annexTotal} reference controls decided. `}
          controls you exclude needs a written justification — that record is the audit evidence.
        </p>
        {soa.history.length > 0 && (
          <p className="mt-2 text-xs text-slate-500">
            Latest version {soa.history[soa.history.length - 1].version}
            {soa.history[soa.history.length - 1].approvedBy
              ? `, approved by ${soa.history[soa.history.length - 1].approvedBy}`
              : ''}.
          </p>
        )}
        <Link
          to={`${basePath}/assess`}
          className="mt-3 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Open the capability assessment
        </Link>
      </section>

      <section className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
        <h3 className="text-sm font-semibold text-emerald-900">Climate amendment</h3>
        <p className="mt-1 text-sm text-emerald-900">
          {CLIMATE_AMENDMENT.clause41.requirement}{' '}
          <span className="text-emerald-800">
            The amendment applies to Clauses 4.1 and 4.2 only, and it requires a documented
            determination rather than a particular answer.
          </span>
        </p>
        <a href={amendment.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-medium text-emerald-900 underline hover:text-emerald-700">
          {amendment.title}
        </a>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-slate-900">Sources</h3>
        <p className="mt-1 text-xs text-slate-600">
          Summaries in this workspace are original plain-language paraphrases. No standard text is
          reproduced. Check them against your licensed copy before relying on them.
        </p>
        <ul className="mt-3 space-y-2">
          {[
            { s: standard, role: 'Normative requirements, Clauses 4–10 and Annex A identifiers' },
            { s: amendment, role: 'Climate change determination, Clauses 4.1 and 4.2' },
            { s: guidance, role: 'Implementation guidance behind the Annex A reference controls' },
            { s: certification, role: 'How certification actually works' },
            { s: soaGuidance, role: 'Non-normative audit guidance on the Statement of Applicability' },
          ].map(({ s, role }) => (
            <li key={s.id} className="rounded-lg border border-slate-200 bg-white p-3">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-700 underline hover:text-indigo-900">
                {s.title}
              </a>
              <p className="mt-0.5 text-xs text-slate-600">{role}</p>
              <p className="mt-0.5 text-[0.7rem] text-slate-500">
                {s.version} · last reviewed {s.lastReviewed}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
