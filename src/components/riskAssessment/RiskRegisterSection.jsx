import { useEffect, useState } from 'react';
import { Plus, Check, Trash2, Search, Download, X, Lock, AlertTriangle } from 'lucide-react';
import { downloadXlsx } from '../../utils/xlsxExport.js';
import { CONTROL_BY_ID } from '../../data/riskAssessment/controls';
import { SEED_REGISTER, COVERAGE_GAPS } from '../../data/riskAssessment/register';
import { LIBRARY, LIBRARY_CATEGORIES } from '../../data/riskAssessment/library';
import { bandFor, BANDS, LIKELIHOOD, IMPACT } from '../../data/riskAssessment/methodology';
import { score, BandBadge, loadUserRisks, saveUserRisks, sectionCls, h3Cls, leadCls, inputCls } from './riskUtils.jsx';

function libraryToRisk(item, n) {
  const today = new Date().toISOString().slice(0, 10);
  return {
    id: `U-${n}`,
    scenario: item.scenario,
    categories: [item.category],
    cia: item.cia,
    owner: 'Risk Owner',
    approver: 'Approver',
    likelihood: item.likelihood,
    impact: item.impact,
    treatment: 'Mitigate',
    treatmentStatus: 'Identified',
    residualLikelihood: 1,
    residualImpact: Math.min(item.impact, 2),
    approvalStatus: 'Not submitted',
    controls: item.controls || [],
    identifiedDate: today,
    lastReviewedDate: today,
    approvalDate: '',
    source: 'library',
    libraryId: item.id,
    ...(item.required ? { required: true, requiredBasis: item.required.basis } : {}),
  };
}

// Required baseline risks are always present in the user's register.
function ensureRequired(rows) {
  const have = new Set(rows.map((r) => r.libraryId));
  let n = rows.reduce((m, r) => Math.max(m, Number(String(r.id).replace('U-', '')) || 0), 0);
  const missing = LIBRARY.filter((it) => it.required && !have.has(it.id)).map((it) => libraryToRisk(it, ++n));
  const marked = rows.map((r) => {
    const it = LIBRARY.find((x) => x.id === r.libraryId);
    return it && it.required ? { ...r, required: true, requiredBasis: it.required.basis } : r;
  });
  return [...missing, ...marked];
}

export function exportMyRegister(rows) {
  const today = new Date().toISOString().slice(0, 10);
  const riskRows = rows.map((r) => {
    const inh = score(r.likelihood, r.impact);
    const res = score(r.residualLikelihood, r.residualImpact);
    return [r.id, r.scenario, r.categories.join(', '), r.cia.join(', '), r.likelihood, r.impact, inh, bandFor(inh).label,
      r.treatment, r.treatmentStatus, r.residualLikelihood, r.residualImpact, res, bandFor(res).label,
      r.controls.length, r.controls.join(', '), r.owner, r.approver, r.approvalStatus, r.approvalDate || '', r.identifiedDate, r.lastReviewedDate || '', r.libraryId || (r.source === 'seed' ? 'Sample' : ''), r.required ? `Required: ${r.requiredBasis || ''}` : r.recommended ? 'Recommended addition' : 'Optional', r.note || ''];
  });
  const controlRows = rows.flatMap((r) => (r.controls.length ? r.controls : ['']).map((id) => {
    const c = CONTROL_BY_ID[id];
    return [r.id, r.scenario, bandFor(score(r.likelihood, r.impact)).label, id || 'None linked yet', c ? c.name : '', c ? c.description : '',
      c ? c.soc2.join(', ') : '', c && c.otherMappings ? c.otherMappings.join('; ') : '', c ? c.tests.join('; ') : '', c ? c.evidence.join('; ') : '', '', ''];
  }));
  downloadXlsx([
    {
      name: 'My Risk Register', title: `My Risk Register (exported ${today})`,
      notes: ['Score = likelihood x impact. Bands: 1 to 4 Low, 5 to 9 Medium, 10 to 16 High, 17 to 25 Critical. Residual assumes the linked controls are fully implemented with evidence.'],
      headers: ['ID', 'Risk scenario', 'Category', 'CIA', 'Likelihood', 'Impact', 'Inherent score', 'Inherent rating', 'Treatment', 'Treatment status', 'Residual likelihood', 'Residual impact', 'Residual score', 'Residual rating', 'No. of controls', 'Linked controls', 'Owner', 'Approver', 'Approval status', 'Approval date', 'Identified date', 'Last reviewed date', 'Source', 'Required baseline', 'Notes'],
      rows: riskRows,
      validations: [{ col: 4, values: ['1', '2', '3', '4', '5'] }, { col: 5, values: ['1', '2', '3', '4', '5'] }, { col: 10, values: ['1', '2', '3', '4', '5'] }, { col: 11, values: ['1', '2', '3', '4', '5'] },
        { col: 8, values: ['Mitigate', 'Transfer', 'Avoid', 'Accept'] }, { col: 18, values: ['Not submitted', 'Pending approval', 'Approved', 'Rejected'] }],
    },
    {
      name: 'Risk Controls', title: 'Controls, Tests and Evidence per Risk',
      notes: ['One row per risk and control. Use Status to track evidence; uploaded but not yet reviewed is not complete.'],
      headers: ['Risk ID', 'Risk scenario', 'Inherent rating', 'Control ID', 'Control', 'Description', 'SOC 2', 'Other mappings', 'Tests', 'Evidence required', 'Status', 'Evidence location'],
      rows: controlRows,
      validations: [{ col: 10, values: ['Not started', 'File uploaded, to review', 'Reviewed and accepted', 'Needs rework'] }],
    },
    {
      name: 'Rating Scale', title: 'Rating Scale',
      headers: ['Scale', 'Value', 'Label', 'Definition'],
      rows: [...LIKELIHOOD.map((x) => ['Likelihood', x.value, x.label, x.definition]), ...IMPACT.map((x) => ['Impact', x.value, x.label, x.definition]), ...BANDS.map((b) => ['Rating', `${b.min} to ${b.max}`, b.label, b.action])],
    },
  ], 'my-risk-register');
}

export default function RiskRegisterSection({ isDark = false }) {
  const [userRisks, setUserRisks] = useState(() => ensureRequired(typeof window === 'undefined' ? [] : loadUserRisks()));
  const [notice, setNotice] = useState(null);
  useEffect(() => { saveUserRisks(userRisks); }, [userRisks]);

  const [includeSamples, setIncludeSamples] = useState(false);

  const added = new Set(userRisks.map((r) => r.libraryId));
  const removeLibraryItem = (libId) => setUserRisks((prev) => prev.filter((r) => r.libraryId !== libId));
  const showRequired = (libId) => {
    const item = LIBRARY.find((x) => x.id === libId);
    if (item && item.required) setNotice({ id: libId, scenario: item.scenario, ...item.required });
  };
  const addFromLibrary = (item) => {
    if (added.has(item.id)) {
      if (item.required) { showRequired(item.id); return; }
      removeLibraryItem(item.id); return;
    }
    setUserRisks((prev) => {
      const next = prev.reduce((m, r) => Math.max(m, Number(String(r.id).replace('U-', '')) || 0), 0) + 1;
      return [...prev, libraryToRisk(item, next)];
    });
  };
  const removeUser = (id) => {
    const r = userRisks.find((x) => x.id === id);
    if (r && r.required) { showRequired(r.libraryId); return; }
    setUserRisks((prev) => prev.filter((x) => x.id !== id));
  };
  const clearUser = () => {
    const kept = userRisks.filter((r) => r.required).length;
    setUserRisks((prev) => prev.filter((r) => r.required));
    if (kept) setNotice({ id: 'all', scenario: `${kept} required baseline risks were kept`, basis: 'SOC 2, ISO/IEC 27001 and applicable privacy laws', why: 'Optional risks were removed. Required baseline risks stay in the register.' });
  };

  // Library filters
  const [libCat, setLibCat] = useState('all');
  const [libQ, setLibQ] = useState('');
  const libItems = LIBRARY.filter((it) => (libCat === 'all' || it.category === libCat)
    && (!libQ || `${it.scenario} ${it.category}`.toLowerCase().includes(libQ.toLowerCase())));

  return (
    <>
      {notice && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4" role="alertdialog" aria-modal="true" aria-labelledby="req-title" onClick={() => setNotice(null)}>
          <div className="max-w-md w-full rounded-2xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" aria-hidden="true" />
              <div>
                <h4 id="req-title" className="font-bold text-navy-900 dark:text-text-dark-primary">This risk is a required baseline</h4>
                <p className="text-sm text-navy-700 dark:text-text-dark-secondary mt-1">{notice.scenario}</p>
                <p className="text-sm mt-3 text-navy-800 dark:text-text-dark-primary"><strong>Required by:</strong> {notice.basis}</p>
                <p className="text-sm mt-1 text-navy-700 dark:text-text-dark-secondary">{notice.why}</p>
                <p className="text-xs mt-3 text-navy-600 dark:text-text-dark-secondary">It stays in your register. Score it for your environment. If it genuinely does not apply, record the justification and get Approver sign-off rather than removing it.</p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="button" autoFocus onClick={() => setNotice(null)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700">Understood</button>
            </div>
          </div>
        </div>
      )}
      <section id="ra-register" className={sectionCls}>
        <h3 className={h3Cls}>4. My risk register</h3>
        <p className={leadCls}>Your register starts with the required baseline risks. Add more from the scenario library below. Rows are saved in this browser only. The Excel export carries every field: inherent and residual scores and ratings, treatment and status, owner, approver, approval status and dates, notes, and every linked control with its tests and evidence.</p>


        {(
          <div className="mt-4 rounded-xl border border-surface-200 dark:border-surface-dark-200 p-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-sm font-semibold text-navy-900 dark:text-text-dark-primary">Risks in my register ({userRisks.length})</h4>
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => exportMyRegister(includeSamples ? [...SEED_REGISTER, ...userRisks] : userRisks)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700">
                  <Download className="w-3.5 h-3.5" /> Export my register (Excel)
                </button>
                <label className="inline-flex items-center gap-1.5 text-xs text-navy-700 dark:text-text-dark-secondary cursor-pointer">
                  <input type="checkbox" checked={includeSamples} onChange={(e) => setIncludeSamples(e.target.checked)} />
                  Include sample risks R-1 to R-16
                </label>
                <button type="button" onClick={clearUser} className="text-xs text-red-700 dark:text-red-300 hover:underline">Remove optional</button>
              </div>
            </div>
            <ul className="space-y-1">
              {userRisks.map((r) => (
                <li key={r.id} className="flex items-start gap-2 text-xs text-navy-700 dark:text-text-dark-secondary">
                  <span className="font-mono shrink-0">{r.id}</span>
                  <span className="flex-1">{r.scenario}</span>
                  <span className="shrink-0 hidden sm:inline text-[11px]">{r.controls.length} controls</span>
                  <span className="shrink-0"><BandBadge value={score(r.likelihood, r.impact)} /></span>
                  {r.required
                    ? <button type="button" onClick={() => removeUser(r.id)} aria-label={`${r.id} is required`} title="Required baseline, cannot be removed" className="shrink-0 text-amber-600 dark:text-amber-300"><Lock className="w-3.5 h-3.5" /></button>
                    : <button type="button" onClick={() => removeUser(r.id)} aria-label={`Remove ${r.id}`} title="Remove from my register" className="shrink-0 text-red-600 dark:text-red-300 hover:opacity-80"><Trash2 className="w-3.5 h-3.5" /></button>}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
          <h4 className="font-semibold text-sm text-amber-900 dark:text-amber-200 mb-1">Coverage gaps</h4>
          <ul className="list-disc pl-5 space-y-1 text-xs text-amber-900 dark:text-amber-200">
            {COVERAGE_GAPS.map((g) => <li key={g}>{g}</li>)}
          </ul>
        </div>
      </section>

      <section id="ra-library" className={sectionCls}>
        <h3 className={h3Cls}>5. Risk scenario library</h3>
        <p className={leadCls}>{LIBRARY.length} generic scenarios across {LIBRARY_CATEGORIES.length} categories. Use "Add to my register" to copy a scenario into the register above with suggested scores and controls, then adjust it to your environment. Risks marked Required baseline are added automatically and cannot be removed, because the frameworks and laws listed on them expect every organisation to assess them.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <label className="relative">
            <span className="sr-only">Search scenarios</span>
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" aria-hidden="true" />
            <input className={`${inputCls} pl-8 w-56`} placeholder="Search scenarios" value={libQ} onChange={(e) => setLibQ(e.target.value)} />
          </label>
          <select className={inputCls} value={libCat} onChange={(e) => setLibCat(e.target.value)} aria-label="Filter scenarios by category">
            <option value="all">All categories</option>
            {LIBRARY_CATEGORIES.map((c) => <option key={c} value={c}>{c} ({LIBRARY.filter((x) => x.category === c).length})</option>)}
          </select>
          <span className="self-center text-xs text-navy-600 dark:text-text-dark-secondary">{libItems.length} shown</span>
        </div>
        <ul className="grid gap-2 md:grid-cols-2">
          {libItems.map((it) => {
            const isAdded = added.has(it.id);
            return (
              <li key={it.id} className="rounded-xl border border-surface-200 dark:border-surface-dark-200 p-3 flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-mono text-gray-500 dark:text-text-dark-muted shrink-0 mt-0.5">{it.id}</span>
                  <p className="text-sm text-navy-900 dark:text-text-dark-primary flex-1">{it.scenario}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-navy-600 dark:text-text-dark-secondary">
                  <span className="grc-pill">{it.category}</span>
                  <span>CIA: {it.cia.join(', ')}</span>
                  <span>L{it.likelihood} x I{it.impact}</span>
                  <BandBadge value={score(it.likelihood, it.impact)} />
                  {it.required && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 font-semibold" title={it.required.basis}>
                      <Lock className="w-3 h-3" aria-hidden="true" /> Required baseline
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => addFromLibrary(it)}
                    aria-pressed={isAdded}
                    title={isAdded ? 'Click to remove from your register' : 'Add to your register'}
                    className={it.required && isAdded ? 'ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200' : `group ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${isAdded ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-800 dark:hover:text-red-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                  >
                    {isAdded && it.required
                      ? <><Lock className="w-3.5 h-3.5" /> Required</>
                      : isAdded
                      ? <><Check className="w-3.5 h-3.5 group-hover:hidden" /><X className="w-3.5 h-3.5 hidden group-hover:inline" /> <span className="group-hover:hidden">Added</span><span className="hidden group-hover:inline">Remove</span></>
                      : <><Plus className="w-3.5 h-3.5" /> Add to my register</>}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
