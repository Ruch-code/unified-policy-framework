import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, Server, FileText, Wrench, Clock, Download, ExternalLink, AlertTriangle, Info, Shield } from 'lucide-react';
import { GENERIC_ASSESSMENT, PRIVACY_ASSESSMENT_EXTRA, HIPAA_ASSESSMENT, NON_HIPAA_PRIVACY_ITEMS } from '../data/assessments.js';
import { buildCitation, classifyRoles, ROLE_OPTIONS } from '../data/hipaaDomain.js';
import { GEN_ISO_CLASSIFICATION, isCrossFrameworkItem, GEN_CROSS_FRAMEWORK_IDS } from '../data/iso27001Classification.js';
import { ISO_CATEGORIES, ISO_SOURCES } from '../data/iso27001.js';

const STORAGE_PREFIX = 'assessment-';

const MANDATE_STYLES = {
  required: 'bg-rose-50 text-rose-700 border-rose-200',
  addressable: 'bg-amber-50 text-amber-800 border-amber-200',
  mixed: 'bg-violet-50 text-violet-700 border-violet-200',
  guidance: 'bg-slate-100 text-slate-600 border-slate-200',
};

const MANDATE_LABELS = {
  required: 'Required',
  addressable: 'Addressable',
  mixed: 'Mixed range',
  guidance: 'Not required',
};

const ROLE_SHORTS = ROLE_OPTIONS.reduce((acc, r) => ({ ...acc, [r.id]: r.short }), {});

// Every HIPAA item carries the citation and role classification derived from
// the same source the curriculum uses, so the two can never drift apart.
const HIPAA_ITEMS = HIPAA_ASSESSMENT.map(it => {
  const role = classifyRoles(it.control, it.cfr);
  return { ...it, citation: { ...buildCitation(it.cfr), roles: it.roles || role.roles, roleNote: role.note } };
});

// The 22 generic ITGC items stay in the HIPAA assessment. Their IDs are stable
// and learners already hold progress against them, so dropping them would
// silently reset that work. They are the environment baseline; the HIPAA items
// above are the regulatory layer. Where a generic control overlaps a HIPAA
// requirement, the HIPAA item carries the citation and the baseline item stays
// unlabelled so nothing reads as a federal mandate.
const ISO_CAT_STYLES = {
  clause: 'bg-rose-50 text-rose-700 border-rose-200',
  annexA: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  practice: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  otherFramework: 'bg-amber-50 text-amber-800 border-amber-200',
  unverified: 'bg-slate-100 text-slate-700 border-slate-300',
};

const ANNEX_A_TOTAL = 93;

const BASELINE_ITEMS = GENERIC_ASSESSMENT.map(it => ({ ...it, layer: 'baseline' }));
const HIPAA_LAYER_ITEMS = HIPAA_ITEMS.map(it => ({ ...it, layer: 'hipaa' }));

export default function AssessmentPage({ framework }) {
  const isHipaa = framework.roleAware === true;
  // ISO/IEC 27001 needs its own treatment: every item must be labelled as a clause
  // requirement, an Annex A reference control, a recommended practice, or material from
  // another law entirely. Gated on id so no other framework changes behaviour.
  const isIso = framework.id === 'iso27001-li';
  // HIPAA used to receive the generic GDPR-flavoured privacy items. They are not
  // HIPAA requirements, so they are no longer appended here.
  const isPrivacy = !isHipaa && /privacy|gdpr|dpdpa|ccpa|coppa|27701|lgpd|pdpa|pipl|hitrust/i.test(framework.name);
  const base = framework.assessment && framework.assessment.length
    ? framework.assessment
    : (isHipaa ? BASELINE_ITEMS : GENERIC_ASSESSMENT);
  const items = isHipaa
    ? base.concat(HIPAA_LAYER_ITEMS)
    : base.concat(isPrivacy ? PRIVACY_ASSESSMENT_EXTRA : []);
  const isoClassification = (it) => (isIso ? GEN_ISO_CLASSIFICATION[it.id] : null);
  // Displayed control text: a few items carried frequencies that read as ISO
  // mandates. For ISO only, the misleading cadence is moved into a note. The
  // original wording is never deleted, and the item ID is unchanged.
  const controlText = (it) => {
    const c = isoClassification(it);
    if (!c || !c.replaceTitle) return it.control;
    return c.replaceTitle;
  };
  const [filter, setFilter] = useState('All');
  const [showOtherFrameworks, setShowOtherFrameworks] = useState(false);
  const [done, setDone] = useState({});
  const storageKey = `${STORAGE_PREFIX}${framework.id}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setDone(JSON.parse(saved));
    } catch (e) { console.error(e); }
  }, [storageKey]);

  const toggle = (id) => {
    setDone(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = true;
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  // Non-ISO material (GDPR deadlines, HIPAA artefacts, ASV cadence) is pulled out
  // of the main ISO list and shown in its own section. Nothing is deleted.
  const otherFrameworkItems = useMemo(
    () => (isIso ? items.filter(it => isCrossFrameworkItem(it.id)) : []),
    [isIso, items]
  );
  const mainItems = useMemo(
    () => (isIso ? items.filter(it => !isCrossFrameworkItem(it.id)) : items),
    [isIso, items]
  );

  const categorized = useMemo(() => {
    const categories = {};
    mainItems.forEach(it => {
      const cat = it.itgc || 'General';
      (categories[cat] = categories[cat] || []).push(it);
    });
    return categories;
  }, [mainItems]);

  const filtered = filter === 'All' ? mainItems : mainItems.filter(it => it.category === filter);
  const doneCount = items.filter(it => done[it.id]).length;
  const itCount = items.filter(it => it.category === 'IT').length;
  const nonItCount = items.filter(it => it.category === 'Non-IT').length;
  const hybridCount = items.filter(it => it.category === 'Hybrid').length;
  const itDone = items.filter(it => it.category === 'IT' && done[it.id]).length;
  const nonItDone = items.filter(it => it.category === 'Non-IT' && done[it.id]).length;
  const totalEstHours = items.reduce((s, it) => s + (it.hours || it.estHours || 0), 0);

  const reset = () => {
    if (window.confirm('Reset this assessment?')) {
      localStorage.removeItem(storageKey);
      setDone({});
    }
  };

  const exportText = () => {
    const lines = items.map(it => {
      const parts = [`[${done[it.id] ? 'X' : ' '}] [${it.category}] ${it.control}`];
      if (it.citation) {
        if (it.citation.sections.length) parts.push(`CFR: ${it.citation.sections.join('; ')}`);
        parts.push(`Status: ${MANDATE_LABELS[it.citation.status] || it.citation.status}`);
        if (it.citation.source) parts.push(`Source: ${it.citation.source.url}`);
      }
      const iso = isoClassification(it);
      if (iso) {
        parts.push(`ISO: ${ISO_CATEGORIES[iso.primary].label}`);
        if (iso.clause.length) parts.push(`Clause: ${iso.clause.join(', ')}`);
        if (iso.annexA.length) parts.push(`Annex A refs: ${iso.annexA.join(', ')}`);
        if (iso.contaminants.length) parts.push(`Not ISO: ${iso.contaminants.join('; ')}`);
      }
      parts.push(`Tool: ${it.tool}`);
      return parts.join(' — ');
    });
    const header = [
      `${framework.name} — Environment Assessment`,
      new Date().toDateString(),
      '',
    ];
    // The planning-estimate caveat is HIPAA specific. Attaching it to PCI-DSS or
    // SOC 2 exports would imply a federal time budget that does not exist there.
    if (isHipaa) {
      header.push('Effort figures are internal planning estimates, not HIPAA requirements.');
      header.push('GEN-* items are the environment baseline. HIPAA-* items carry the citations.');
      header.push('');
    }
    if (isIso) {
      header.push('ISO/IEC 27001:2022 labelling — read before relying on this list.');
      header.push('Clauses 4-10 are requirements. The 93 Annex A controls are reference controls');
      header.push('you select from based on risk; you are not required to implement all of them.');
      header.push('Items labelled "Other" come from different laws and frameworks and are NOT ISO requirements.');
      header.push('Effort figures are internal planning estimates. ISO states no time budget.');
      header.push('');
    }
    return [...header, ...lines].join('\n');
  };

  const download = () => {
    const blob = new Blob([exportText()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${framework.id}-assessment.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filterBtn = (label) => (
    <button
      onClick={() => setFilter(label)}
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
        filter === label ? 'bg-[#1e293b] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
      }`}
    >
      {label === 'All' ? 'All' : label}
      <span className="ml-1.5 text-xs opacity-70">
        {label === 'All' ? `${items.length}` : label === 'IT' ? itCount : label === 'Non-IT' ? nonItCount : hybridCount}
      </span>
    </button>
  );

  const catPill = (cat) => {
    const map = {
      'Access Management': 'bg-blue-50 text-blue-700 border-blue-200',
      'Change Management': 'bg-purple-50 text-purple-700 border-purple-200',
      'IT Operations': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Program / System Development': 'bg-amber-50 text-amber-700 border-amber-200',
      'Data Privacy / Governance': 'bg-rose-50 text-rose-700 border-rose-200',
      'Business Continuity & Incident': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'General / Cross-Cutting': 'bg-slate-100 text-slate-700 border-slate-200',
    };
    return map[cat] || map['General / Cross-Cutting'];
  };

  const typeIcon = (category) => category === 'IT'
    ? <Server className="w-4 h-4" />
    : category === 'Hybrid' ? <Wrench className="w-4 h-4" /> : <FileText className="w-4 h-4" />;

  return (
    <div className="container px-4 py-8">
      <Link to={`${framework.basePath || '/'}`} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to {framework.name}
      </Link>

      <div className="flex items-center gap-3 mb-1">
        {framework.flag && <span className="text-3xl">{framework.flag}</span>}
        <h1 className="text-3xl font-bold text-gray-900">{framework.name}</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6 max-w-3xl">
        Client environment assessment — tick off the controls already in place to see what's covered vs. what's missing,
        with recommended tools per scenario. Controls are split into <strong>IT</strong> (technical), <strong>Non-IT</strong> (governance/policy) and <strong>Hybrid</strong>.
      </p>

      {isIso && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 mb-4 max-w-3xl">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-800 leading-relaxed">
              <p className="font-semibold mb-1">Read this list as an environment baseline, not as ISO requirements.</p>
              <p>
                All {items.length} <span className="font-mono">GEN-*</span> items are retained with their
                IDs unchanged, so every tick you already hold still counts. Each one is now labelled with what
                it actually is: an <strong>ISO clause requirement</strong>, an{' '}
                <strong>Annex A reference control</strong>, a <strong>recommended practice</strong>, or
                material from <strong>another framework</strong>. ISO/IEC 27001:2022 requires Clauses 4-10;
                the {ANNEX_A_TOTAL} Annex A controls are reference controls you select from based on risk, not
                a list you must tick off.
              </p>
              <p className="mt-1">
                The hour figures are internal planning estimates. ISO states no time budget for any of this
                work, and no auditor will ask why you took longer.
              </p>
            </div>
          </div>
        </div>
      )}

      {isHipaa && (
        <>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4 max-w-3xl">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>About the hours.</strong> The effort figures below are internal planning estimates for sizing this work. HIPAA sets no time budget for any of it, and no reviewer will ask you why you took longer. The binding requirements are the controls themselves, not the time spent.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 mb-4 max-w-3xl">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800 leading-relaxed">
                <p className="font-semibold mb-1">This list was recalculated — your progress was kept.</p>
                <p>
                  {NON_HIPAA_PRIVACY_ITEMS.length} items that were previously listed here are removed:{' '}
                  <span className="font-mono">{NON_HIPAA_PRIVACY_ITEMS.map(i => i.id).join(', ')}</span>. They cover ROPA, DPIA, lawful basis, SCCs and data-subject requests —{' '}
                  <strong>GDPR and UK concepts, not HIPAA requirements</strong>. Counting them as HIPAA controls overstated the obligation. They still live on the privacy frameworks where they belong.
                </p>
                <p className="mt-1">
                  All {GENERIC_ASSESSMENT.length} <span className="font-mono">GEN-*</span> items are retained with their IDs unchanged, so every tick you already hold still counts.{' '}
                  {HIPAA_LAYER_ITEMS.length} cited HIPAA items were added on top as the regulatory layer. The{' '}
                  <span className="font-mono">GEN-*</span> items are your environment baseline; the{' '}
                  <span className="font-mono">HIPAA-*</span> items carry the citations. Where the two overlap — encryption, access control, audit logging, backups — both stay, because the baseline item asks whether the control exists and the HIPAA item asks whether the regulation requires it.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Summary bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="text-3xl font-bold text-gray-900">{doneCount}<span className="text-lg text-gray-400">/{items.length}</span></div>
          <div className="text-xs text-gray-500 mt-1">Controls in place</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="text-3xl font-bold text-emerald-600">{itDone}<span className="text-lg text-gray-400">/{itCount}</span></div>
          <div className="text-xs text-gray-500 mt-1">IT controls</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="text-3xl font-bold text-purple-600">{nonItDone}<span className="text-lg text-gray-400">/{nonItCount}</span></div>
          <div className="text-xs text-gray-500 mt-1">Non-IT controls</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="text-3xl font-bold text-amber-600">~{totalEstHours}</div>
          <div className="text-xs text-gray-500 mt-1">Est. effort (h)</div>
        </div>      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {filterBtn('All')}
        {filterBtn('IT')}
        {filterBtn('Non-IT')}
        {itCount > 0 && filterBtn('Hybrid')}
        <div className="ml-auto flex gap-2">
          <button onClick={download} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 bg-white px-3 py-2 rounded-xl">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={reset} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 px-3 py-2">
            Reset
          </button>
        </div>
      </div>

      {/* ITGC category groups */}
      {Object.entries(categorized).map(([cat, list]) => {
        const visible = list.filter(it => filter === 'All' || it.category === filter);
        if (visible.length === 0) return null;
        return (
          <div key={cat} className="mb-6">
            <h3 className={`inline-block text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border mb-3 ${catPill(cat)}`}>
              {cat}
            </h3>
            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
              {visible.map(it => {
                const isDone = done[it.id];
                return (
                  <div key={it.id} className={`flex items-start gap-4 px-5 py-4 ${isDone ? 'bg-emerald-50/40' : ''}`}>
                    <button onClick={() => toggle(it.id)} className="mt-0.5 shrink-0">
                      {isDone ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                          it.category === 'IT' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          it.category === 'Hybrid' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-purple-50 text-purple-700 border-purple-200'
                        }`}>
                          {typeIcon(it.category)} {it.category}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">{it.id}</span>
                        {isoClassification(it) && (
                          <span
                            title={ISO_CATEGORIES[isoClassification(it).primary].desc}
                            className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${ISO_CAT_STYLES[isoClassification(it).primary]}`}
                          >
                            {ISO_CATEGORIES[isoClassification(it).primary].short}
                          </span>
                        )}
                        {it.citation && it.citation.status !== 'none' && (
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${MANDATE_STYLES[it.citation.status]}`}>
                            {MANDATE_LABELS[it.citation.status]}
                          </span>
                        )}
                      </div>
                      <p className={`font-medium mt-1 ${isDone ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{controlText(it)}</p>
                      {isoClassification(it)?.replaceTitle && (
                        <p className="text-[11px] text-amber-700 mt-1">
                          Original wording: &ldquo;{it.control}&rdquo; &mdash; the frequency is not an ISO requirement.
                        </p>
                      )}
                      {isoClassification(it) && (
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{isoClassification(it).basis}</p>
                      )}
                      {isoClassification(it)?.annexA?.length > 0 && (
                        <p className="text-[11px] text-indigo-700 mt-1">
                          Annex A reference controls: <span className="font-mono">{isoClassification(it).annexA.join(', ')}</span>
                        </p>
                      )}
                      {isoClassification(it)?.clause?.length > 0 && (
                        <p className="text-[11px] text-rose-700 mt-1">
                          ISO clause requirement: <span className="font-mono">Clause {isoClassification(it).clause.join(', ')}</span>
                        </p>
                      )}
                      {isoClassification(it)?.practiceCaveat && (
                        <p className="text-[11px] text-slate-500 mt-1 italic">{isoClassification(it).practiceCaveat}</p>
                      )}
                      {it.scenario && <p className="text-xs text-gray-400 mt-1 italic">Scenario: {it.scenario}</p>}
                      {it.citation && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {it.citation.sections.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {it.citation.sections.join(' ; ')}
                            </span>
                          )}
                          {it.citation.source && (
                            <a
                              href={it.citation.source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline"
                            >
                              {it.citation.source.label} <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {Array.isArray(it.citation.roles) && it.citation.roles.length > 0 && it.citation.roles.length < 4 && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                              <Shield className="w-3 h-3" />
                              {it.citation.roles.map(r => ROLE_SHORTS[r]).join(', ')}
                            </span>
                          )}
                        </div>
                      )}
                      {it.citation && it.citation.status === 'addressable' && (
                        <p className="text-[11px] text-amber-700 mt-1.5 flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-px" />
                          <span>Addressable is not optional. §164.306(d) requires a documented assessment, and if you choose not to implement it, the decision and your alternative safeguard must be written down.</span>
                        </p>
                      )}
                      {it.citation && it.citation.roleNote && (
                        <p className="text-[11px] text-gray-500 mt-1.5">{it.citation.roleNote}</p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 text-gray-500"><Wrench className="w-3.5 h-3.5 text-indigo-500" /> Tools: <span className="font-medium text-gray-700">{it.tool}</span></span>
                        {it.password && (
                          <span className="inline-flex items-center gap-1 text-gray-500">🔑 <span className="font-medium text-gray-700">{it.password}</span></span>
                        )}
                        {it.hours && (
                          <span className="inline-flex items-center gap-1 text-gray-400 ml-auto"><Clock className="w-3.5 h-3.5" /> ~{it.hours}h</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Non-ISO material, kept out of the ISO list but not deleted */}
      {isIso && otherFrameworkItems.length > 0 && (
        <div className="mt-10">
          <button
            type="button"
            onClick={() => setShowOtherFrameworks(v => !v)}
            aria-expanded={showOtherFrameworks}
            className="w-full flex items-start gap-3 text-left p-4 rounded-2xl border border-amber-300 bg-amber-50 hover:bg-amber-100/70 transition"
          >
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <span className="flex-1">
              <span className="block text-sm font-semibold text-amber-900">
                {otherFrameworkItems.length} items that are NOT ISO/IEC 27001 requirements
              </span>
              <span className="block text-xs text-amber-800 mt-0.5">
                Held separately so a GDPR deadline, a HIPAA artefact or a PCI scanning cadence is never read
                as an ISO obligation. These are still worth doing &mdash; and your existing progress on them
                is intact.
              </span>
            </span>
            <span className="shrink-0 text-xs font-medium text-amber-800 mt-1">{showOtherFrameworks ? '−' : '+'}</span>
          </button>

          {showOtherFrameworks && (
            <div className="mt-4 space-y-3">
              {otherFrameworkItems.map(it => {
                const iso = GEN_ISO_CLASSIFICATION[it.id];
                const isDone = done[it.id];
                return (
                  <div key={it.id} className={`p-4 rounded-2xl border border-amber-200 bg-white ${isDone ? 'bg-emerald-50/40' : ''}`}>
                    <div className="flex items-start gap-4">
                      <button onClick={() => toggle(it.id)} className="mt-0.5 shrink-0" aria-label={`Mark ${controlText(it)} as done`}>
                        {isDone ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-400 font-mono">{it.id}</span>
                          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-200">
                            {ISO_CATEGORIES[iso.primary].short}
                          </span>
                        </div>
                        <p className={`font-medium mt-1 text-sm ${isDone ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{controlText(it)}</p>
                        <ul className="mt-2 space-y-1">
                          {iso.contaminants.map((c, i) => (
                            <li key={i} className="text-[11px] text-amber-800 bg-amber-50 rounded px-2 py-1">{c}</li>
                          ))}
                        </ul>
                        <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{iso.basis}</p>
                        {iso.annexA.length > 0 && (
                          <p className="text-[11px] text-indigo-700 mt-1">
                            Genuine ISO connection via Annex A reference controls: <span className="font-mono">{iso.annexA.join(', ')}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-slate-500">
                Source: <a href={ISO_SOURCES.standard.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">{ISO_SOURCES.standard.version}</a>.
                ISO/IEC 27001:2022 defines no notification deadlines, consent mechanics or regulator-specific forms.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
