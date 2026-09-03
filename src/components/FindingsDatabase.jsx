import { useMemo, useState } from 'react';
import { ClipboardList, ChevronDown, TrendingUp, FileWarning, ShieldCheck, AlertTriangle, Search } from 'lucide-react';
import { HITRUST_COMMON_FINDINGS, FINDINGS_DOMAINS, FINDING_SCORING, domLabel } from '../data/findings';

const SEVERITY_COLORS = {
  High: 'bg-red-100 text-red-700 border-red-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export default function FindingsDatabase({ color }) {
  const [domainFilter, setDomainFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    return HITRUST_COMMON_FINDINGS.filter(f =>
      (domainFilter === 'all' || f.domain === domainFilter) &&
      (severityFilter === 'all' || f.severity === severityFilter)
    );
  }, [domainFilter, severityFilter]);

  const countBySeverity = (sev) => HITRUST_COMMON_FINDINGS.filter(f => f.severity === sev).length;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
      {/* Header */}
      <div className="flex items-start gap-3 mb-2">
        <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0"><ClipboardList className="w-4 h-4" /></span>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Common Findings Database</h2>
          <p className="text-gray-500 text-sm max-w-2xl">
            The <strong>top {HITRUST_COMMON_FINDINGS.length} most common HITRUST assessment findings</strong> across{' '}
            {FINDINGS_DOMAINS.length} domains — with root-cause analysis, recurring evidence deficiencies, and prevention strategies to help you reach certification.
          </p>
        </div>
      </div>

      {/* Scoring explainer */}
      <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
          <AlertTriangle className="w-4 h-4 text-amber-600" /> How findings are scored & how they impact certification
        </div>
        <p className="text-sm text-gray-600 mt-1">{FINDING_SCORING.impact}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {FINDING_SCORING.severity.map(s => (
            <span key={s} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${SEVERITY_COLORS[s]}`}>{s}</span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setDomainFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${domainFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All domains
          </button>
          {FINDINGS_DOMAINS.map(d => (
            <button
              key={d.id}
              onClick={() => setDomainFilter(domainFilter === d.id ? 'all' : d.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${domainFilter === d.id ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              style={domainFilter === d.id ? { background: d.color } : {}}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setSeverityFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${severityFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All severities
          </button>
          {['High', 'Medium', 'Low'].map(s => (
            <button
              key={s}
              onClick={() => setSeverityFilter(severityFilter === s ? 'all' : s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${severityFilter === s ? 'text-white border-transparent' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              style={severityFilter === s ? { background: SEVERITY_COLORS[s].includes('red') ? '#ef4444' : SEVERITY_COLORS[s].includes('amber') ? '#f59e0b' : '#10b981' } : {}}
            >
              {s} ({countBySeverity(s)})
            </button>
          ))}
        </div>
      </div>

      {domainFilter === 'all' && severityFilter === 'all' && (
        <p className="mt-3 text-[11px] text-gray-400 flex items-center gap-1"><Search className="w-3 h-3" /> {HITRUST_COMMON_FINDINGS.length} findings loaded — expand one to see root cause, evidence gaps, and prevention.</p>
      )}

      {/* Findings list */}
      <div className="mt-5 space-y-3">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500 py-4 text-center bg-gray-50 rounded-xl">No findings match the current filters.</p>
        )}
        {filtered.map((f, idx) => {
          const dom = FINDINGS_DOMAINS.find(d => d.id === f.domain);
          const open = openId === idx;
          return (
            <div key={idx} className="border rounded-xl overflow-hidden" style={{ borderColor: dom.color + '44' }}>
              <button
                onClick={() => setOpenId(open ? null : idx)}
                className="w-full flex items-start gap-3 p-4 text-left bg-white hover:bg-gray-50 transition"
              >
                <span className="shrink-0 w-8 h-8 rounded-lg text-white text-xs font-bold flex items-center justify-center" style={{ background: dom.color }}>
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide" style={{ background: dom.color + '18', color: dom.color }}>
                      {dom.ref} · {dom.label}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${SEVERITY_COLORS[f.severity]}`}>{f.severity}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">{f.maturity}</span>
                    <span className="text-[10px] text-gray-400 italic">{f.frequency}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mt-1.5 flex items-center justify-between gap-2">
                    {f.title}
                    <ChevronDown className={`w-4 h-4 shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </h4>
                </div>
              </button>
              {open && (
                <div className="p-4 pt-0 grid md:grid-cols-3 gap-3 bg-white">
                  <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wide"><TrendingUp className="w-3.5 h-3.5" /> Root cause</span>
                    <p className="text-sm text-gray-700 mt-1">{f.rootCause}</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 border border-amber-100 p-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wide"><FileWarning className="w-3.5 h-3.5" /> Evidence deficiency</span>
                    <p className="text-sm text-gray-700 mt-1">{f.evidenceDeficiency}</p>
                  </div>
                  <div className="rounded-lg bg-green-50 border border-green-100 p-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 uppercase tracking-wide"><ShieldCheck className="w-3.5 h-3.5" /> Prevention</span>
                    <p className="text-sm text-gray-700 mt-1">{f.prevent}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
