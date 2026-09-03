import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ITGC_DOMAINS, domainsFor } from '../data/itgcMatrix';
import { GENERIC_ASSESSMENT } from '../data/assessments';

const DOMAIN_COLORS = {
  'Access Management': '#6366f1',
  'Change Management': '#0ea5e9',
  'IT Operations': '#f59e0b',
  'Program / System Development': '#10b981',
  'Data Privacy / Governance': '#ec4899',
  'Business Continuity & Incident': '#ef4444',
  'General / Cross-Cutting': '#8b5cf6',
};

export default function RegionControlMap({ frameworks }) {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [minimized, setMinimized] = useState(false);

  const names = useMemo(() => frameworks.map(f => f.name), [frameworks]);

  // For each domain, which frameworks require it.
  const domainCoverage = useMemo(() => {
    return ITGC_DOMAINS.map(domain => ({
      domain,
      frameworks: names.filter(n => domainsFor(n).has(domain)),
    }));
  }, [names]);

  const sharedAll = useMemo(() => domainCoverage.filter(d => d.frameworks.length === names.length).map(d => d.domain), [domainCoverage, names]);
  const sharedSome = useMemo(() => domainCoverage.filter(d => d.frameworks.length > 0 && d.frameworks.length < names.length), [domainCoverage, names]);
  const absent = useMemo(() => domainCoverage.filter(d => d.frameworks.length === 0).map(d => d.domain), [domainCoverage]);

  const selectedControls = useMemo(() => {
    if (!selectedDomain) return [];
    return GENERIC_ASSESSMENT.filter(g => g.itgc === selectedDomain);
  }, [selectedDomain]);

  return (
    <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <div>
          <h4 className="text-sm font-bold text-[#1e293b] flex items-center gap-2">
            🧩 Control Reuse Map
            <span className="text-[11px] font-medium text-gray-400">control once → satisfies many</span>
          </h4>
        </div>
        <span className="text-[11px] text-gray-400 hidden sm:inline">{names.length} frameworks · {ITGC_DOMAINS.length} ITGC domains</span>
        <button
          onClick={() => setMinimized(!minimized)}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-expanded={!minimized}
        >
          {minimized ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          {minimized ? 'Expand' : 'Minimize'}
        </button>
      </div>

      {!minimized && (
      <>
      {/* Shared baseline ribbon */}
      {sharedAll.length > 0 && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide mb-1.5">
            ✅ Unified baseline — shared by all {names.length} frameworks
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sharedAll.map(d => (
              <button key={d} onClick={() => setSelectedDomain(selectedDomain === d ? null : d)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition"
                style={{
                  background: selectedDomain === d ? DOMAIN_COLORS[d] : '#ffffff',
                  color: selectedDomain === d ? '#fff' : '#065f46',
                  borderColor: DOMAIN_COLORS[d],
                }}>
                <span className="w-2 h-2 rounded-full" style={{ background: DOMAIN_COLORS[d] }} />
                {d}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlap matrix */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="text-left text-gray-500 font-semibold p-2 sticky left-0 bg-white">ITGC Control Domain</th>
              {names.map(n => (
                <th key={n} className="text-center font-semibold p-2 min-w-[64px]">
                  <span className="whitespace-nowrap">{n}</span>
                </th>
              ))}
              <th className="text-center font-semibold text-gray-500 p-2">Shared?</th>
            </tr>
          </thead>
          <tbody>
            {domainCoverage.map(({ domain, frameworks: cov }) => {
              const isActive = selectedDomain === domain;
              const isSharedAll = cov.length === names.length;
              return (
                <tr key={domain} onClick={() => setSelectedDomain(isActive ? null : domain)}
                  className={`cursor-pointer border-t border-gray-100 ${isActive ? 'bg-indigo-50' : 'hover:bg-gray-50'} transition-colors`}>
                  <td className="p-2 sticky left-0 bg-inherit">
                    <span className="inline-flex items-center gap-1.5 font-medium text-gray-700">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: DOMAIN_COLORS[domain] }} />
                      {domain}
                    </span>
                  </td>
                  {names.map(n => (
                    <td key={n} className="text-center p-2">
                      <span className={`inline-block w-4 h-4 rounded ${cov.includes(n) ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                    </td>
                  ))}
                  <td className="text-center p-2">
                    {cov.length === 0 ? (
                      <span className="text-gray-300">—</span>
                    ) : isSharedAll ? (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-semibold">All</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-semibold whitespace-nowrap">{cov.length}/{names.length}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Clicked-domain details */}
      {selectedDomain && (
        <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: DOMAIN_COLORS[selectedDomain] }} />
              <h5 className="font-bold text-gray-900 text-sm">{selectedDomain}</h5>
            </div>
            <div className="flex flex-wrap gap-1">
              {domainCoverage.find(d => d.domain === selectedDomain).frameworks.map(f => {
                const fr = frameworks.find(x => x.name === f);
                return fr ? (
                  <Link key={f} to={fr.path} className="px-2 py-0.5 bg-white text-indigo-700 text-[11px] font-semibold rounded-md border border-indigo-200 hover:bg-indigo-100">
                    {f}
                  </Link>
                ) : (
                  <span key={f} className="px-2 py-0.5 bg-white text-gray-600 text-[11px] font-semibold rounded-md border border-gray-200">{f}</span>
                );
              })}
            </div>
          </div>
          {selectedControls.length > 0 ? (
            <ul className="space-y-1.5">
              {selectedControls.map(c => (
                <li key={c.id} className="flex items-start gap-2 text-xs text-gray-700">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <div>
                    <span className="font-medium">{c.control}</span>
                    <div className="text-gray-500"><span className="text-indigo-500">Tools:</span> {c.tool}</div>
                  </div>
                  <span className="ml-auto shrink-0 text-[10px] text-gray-400 whitespace-nowrap">{c.hours}h / {c.category}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-500">No mapped tool recommendations for this domain.</p>
          )}
        </div>
      )}

      {sharedSome.length > 0 && (
        <p className="mt-3 text-[11px] text-gray-400">
          🔗 Partially shared ({names.length ? 'some frameworks' : ''}):{' '}
          {sharedSome.map(d => d.domain).join(', ')} — click a row to see who shares it and the recommended tools.
        </p>
      )}
      </>
      )}
    </div>
  );
}
