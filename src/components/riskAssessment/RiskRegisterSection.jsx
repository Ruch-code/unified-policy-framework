import { useEffect, useMemo, useState } from 'react';
import { Plus, Check, Trash2, Search } from 'lucide-react';
import ResponsiveTable from '../ResponsiveTable';
import { SEED_REGISTER, COVERAGE_GAPS } from '../../data/riskAssessment/register';
import { LIBRARY, LIBRARY_CATEGORIES } from '../../data/riskAssessment/library';
import { bandFor } from '../../data/riskAssessment/methodology';
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
    statusText: r.recommended ? `${r.treatmentStatus} (Recommended addition)` : r.source === 'library' ? `${r.treatmentStatus} (Added from library)` : r.treatmentStatus,
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
  };
}

export default function RiskRegisterSection({ isDark = false }) {
  const [userRisks, setUserRisks] = useState(() => (typeof window === 'undefined' ? [] : loadUserRisks()));
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
  const addFromLibrary = (item) => {
    if (added.has(item.id)) return;
    setUserRisks((prev) => {
      const next = prev.reduce((m, r) => Math.max(m, Number(String(r.id).replace('U-', '')) || 0), 0) + 1;
      return [...prev, libraryToRisk(item, next)];
    });
  };
  const removeUser = (id) => setUserRisks((prev) => prev.filter((r) => r.id !== id));
  const clearUser = () => setUserRisks([]);

  // Library filters
  const [libCat, setLibCat] = useState('all');
  const [libQ, setLibQ] = useState('');
  const libItems = LIBRARY.filter((it) => (libCat === 'all' || it.category === libCat)
    && (!libQ || `${it.scenario} ${it.category}`.toLowerCase().includes(libQ.toLowerCase())));

  return (
    <>
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
              <button type="button" onClick={clearUser} className="text-xs text-red-700 dark:text-red-300 hover:underline">Remove all</button>
            </div>
            <ul className="space-y-1">
              {userRisks.map((r) => (
                <li key={r.id} className="flex items-start gap-2 text-xs text-navy-700 dark:text-text-dark-secondary">
                  <span className="font-mono shrink-0">{r.id}</span>
                  <span className="flex-1">{r.scenario}</span>
                  <button type="button" onClick={() => removeUser(r.id)} aria-label={`Remove ${r.id}`} className="shrink-0 text-red-600 dark:text-red-300 hover:opacity-80"><Trash2 className="w-3.5 h-3.5" /></button>
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
        <p className={leadCls}>{LIBRARY.length} generic scenarios across {LIBRARY_CATEGORIES.length} categories. Use "Add to my register" to copy a scenario into the register above with suggested scores and controls, then adjust it to your environment.</p>
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
                  <button
                    type="button"
                    onClick={() => addFromLibrary(it)}
                    disabled={isAdded}
                    className={`ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${isAdded ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                  >
                    {isAdded ? <><Check className="w-3.5 h-3.5" /> Added</> : <><Plus className="w-3.5 h-3.5" /> Add to my register</>}
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
