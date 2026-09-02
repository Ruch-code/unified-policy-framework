import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, Server, FileText, Wrench, Clock, Download } from 'lucide-react';
import { GENERIC_ASSESSMENT, PRIVACY_ASSESSMENT_EXTRA } from '../data/assessments';

const STORAGE_PREFIX = 'assessment-';

export default function AssessmentPage({ framework }) {
  const isPrivacy = /privacy|gdpr|dpdpa|ccpa|coppa|27701|lgpd|pdpa|pipl|hitrust|hipaa/i.test(framework.name);
  const items = (framework.assessment && framework.assessment.length ? framework.assessment : GENERIC_ASSESSMENT)
    .concat(isPrivacy ? PRIVACY_ASSESSMENT_EXTRA : []);
  const [filter, setFilter] = useState('All');
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

  const categorized = useMemo(() => {
    const categories = {};
    items.forEach(it => {
      const cat = it.itgc || 'General';
      (categories[cat] = categories[cat] || []).push(it);
    });
    return categories;
  }, [items]);

  const filtered = filter === 'All' ? items : items.filter(it => it.category === filter);
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
    const lines = items.map(it => `[${done[it.id] ? 'X' : ' '}] [${it.category}] ${it.control} — Tool: ${it.tool}`);
    return `${framework.name} — Environment Assessment\n${new Date().toDateString()}\n\n${lines.join('\n')}`;
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
        </div>
      </div>

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
                      </div>
                      <p className={`font-medium mt-1 ${isDone ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{it.control}</p>
                      {it.scenario && <p className="text-xs text-gray-400 mt-1 italic">Scenario: {it.scenario}</p>}
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
    </div>
  );
}
