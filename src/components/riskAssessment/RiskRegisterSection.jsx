import { useEffect, useMemo, useState } from 'react';
import { Plus, Check, Trash2, Search, Download, X, Lock, AlertTriangle } from 'lucide-react';
import { downloadXlsx } from '../../utils/xlsxExport.js';
import { CONTROL_BY_ID } from '../../data/riskAssessment/controls';
import ResponsiveTable from '../ResponsiveTable';
import { SEED_REGISTER, COVERAGE_GAPS } from '../../data/riskAssessment/register';
import { LIBRARY, LIBRARY_CATEGORIES } from '../../data/riskAssessment/library';
import { bandFor, BANDS, LIKELIHOOD, IMPACT } from '../../data/riskAssessment/methodology';
import { score, BandBadge, loadUserRisks, saveUserRisks, sectionCls, h3Cls, leadCls, inputCls } from './riskUtils.jsx';

const pad = (n) => String(n).padStart(2, '0');

function toTableRow(r) {
  return {
    ...r,
    categoriesText: r.categories.join(', '),
    ciaText: r.cia.join(', '),
    inherentSort: pad(score(r.likelihood, r.impact)),
    residualSort: pad(score(r.residualLikelihood, r.residualImpact)),
    controlsText: r.controls.join(', '),
    statusText: r.recommended ? `${r.treatmentStatus} (Recommended addition)` : r.required ? `${r.treatmentStatus} (Required baseline)` : r.source === 'library' ? `${r.treatmentStatus} (Added from library)` : r.treatmentStatus,
  };
}

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
      r.controls.length, r.controls.join(', '), r.owner, r.approver, r.approvalStatus, r.identifiedDate, r.libraryId || '', r.required ? `Required: ${r.requiredBasis || ''}` : 'Optional'];
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
      headers: ['ID', 'Risk scenario', 'Category', 'CIA', 'Likelihood', 'Impact', 'Inherent score', 'Inherent rating', 'Treatment', 'Treatment status', 'Residual likelihood', 'Residual impact', 'Residual score', 'Residual rating', 'No. of controls', 'Linked controls', 'Owner', 'Approver', 'Approval status', 'Identified date', 'Library ref', 'Required baseline'],
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

  const [cat, setCat] = useState('all');
  const [band, setBand] = useState('all');
  const [approval, setApproval] = useState('all');
  const [q, setQ] = useState('');

  const all = useMemo(() => [...SEED_REGISTER, ...userRisks].map(toTableRow), [userRisks]);
  const categories = useMemo(() => [...new Set(all.flatMap((r) => r.categories))].sort(), [all]);

  const filtered = all.filter((r) => {
    if (cat !== 'all' && !r.categories.includes(cat)) return false;
    if (band !== 'all' && bandFor(score(r.likelihood, r.impact)).label !== band) return false;
    if (approval !== 'all' && r.approvalStatus !== approval) return false;
    if (q && !`${r.id} ${r.scenario} ${r.controlsText}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'scenario', header: 'Risk scenario', sortable: false },
    { key: 'categoriesText', header: 'Categories', sortable: true },
    { key: 'ciaText', header: 'CIA', sortable: false },
    { key: 'owner', header: 'Owner', sortable: true },
    { key: 'likelihood', header: 'Likelihood', sortable: true, align: 'center' },
    { key: 'impact', header: 'Impact', sortable: true, align: 'center' },
    { key: 'inherentSort', header: 'Inherent score', sortable: true, align: 'center', render: (v) => <BandBadge value={Number(v)} />, format: (v) => Number(v) },
    { key: 'treatment', header: 'Treatment', sortable: true },
    { key: 'statusText', header: 'Treatment status', sortable: true },
    { key: 'residualLikelihood', header: 'Residual likelihood', sortable: true, align: 'center' },
    { key: 'residualImpact', header: 'Residual impact', sortable: true, align: 'center' },
    { key: 'residualSort', header: 'Residual score', sortable: true, align: 'center', render: (v) => <BandBadge value={Number(v)} />, format: (v) => Number(v) },
    { key: 'approvalStatus', header: 'Approval status', sortable: true },
    { key: 'controlsText', header: 'Linked controls', sortable: false, render: (v, row) => (
      <span>
        {v || 'None yet'}
        {row.note && <span className="block mt-1 text-[11px] text-amber-700 dark:text-amber-300">{row.note}</span>}
      </span>
    ) },
    { key: 'approver', header: 'Approver', sortable: true },
    { key: 'identifiedDate', header: 'Identified', sortable: true },
    { key: 'lastReviewedDate', header: 'Last reviewed', sortable: true },
    { key: 'approvalDate', header: 'Approval date', sortable: true },
  ];

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
        <h3 className={h3Cls}>4. Sample risk register</h3>
        <p className={leadCls}>Example Co. register for a typical SaaS company. Inherent scores show the starting point; residual scores assume the treatment plan is fully implemented with evidence. Rows you add from the scenario library appear here, are saved in this browser only, and are included in the export.</p>

        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Register filters">
          <label className="relative">
            <span className="sr-only">Search register</span>
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" aria-hidden="true" />
            <input className={`${inputCls} pl-8 w-48`} placeholder="Search ID, scenario, control" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <select className={inputCls} value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category">
            <option value="all">All categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className={inputCls} value={band} onChange={(e) => setBand(e.target.value)} aria-label="Filter by inherent band">
            <option value="all">All inherent bands</option>
            {['Low', 'Medium', 'High', 'Critical'].map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select className={inputCls} value={approval} onChange={(e) => setApproval(e.target.value)} aria-label="Filter by approval status">
            <option value="all">All approval states</option>
            {['Approved', 'Pending approval', 'Not submitted', 'Rejected'].map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <span className="self-center text-xs text-navy-600 dark:text-text-dark-secondary">{filtered.length} of {all.length} risks</span>
        </div>

        <ResponsiveTable
          data={filtered}
          columns={columns}
          caption="Risk register with inherent and residual scores, treatment and approval status"
          filename="risk-register.csv"
          exportLabel="Export Risk Register"
          isDark={isDark}
          enableSort
          defaultSortKey="id"
          keyExtractor={(row) => row.id}
        />

        {userRisks.length > 0 && (
          <div className="mt-4 rounded-xl border border-surface-200 dark:border-surface-dark-200 p-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-sm font-semibold text-navy-900 dark:text-text-dark-primary">Your added risks ({userRisks.length})</h4>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => exportMyRegister(userRisks)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700">
                  <Download className="w-3.5 h-3.5" /> Export my register (Excel)
                </button>
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
