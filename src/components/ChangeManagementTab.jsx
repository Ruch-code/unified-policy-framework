import { useState } from 'react';
import { GitPullRequest, ChevronDown, Layers, Gauge, ShieldCheck, ShieldAlert, ClipboardCheck, BarChart3, Users, ArrowRight, Info } from 'lucide-react';
import { SDLC_STAGES, CHANGE_TYPES, VELOCITY, SCENARIOS, KPIS, MAPPING, EVIDENCE } from '../data/changeManagement.js';

const RISK_CLS = {
  Low: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  Medium: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  High: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800',
};
const riskCls = r => RISK_CLS[r.startsWith('High') ? 'High' : r.startsWith('Low') ? 'Low' : 'Medium'];

function Card({ id, Icon, title, children }) {
  return (
    <div id={id} className="bg-white rounded-2xl border border-gray-200 dark:border-slate-700 p-5 scroll-mt-24">
      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
        <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 flex items-center justify-center"><Icon className="w-4 h-4" /></span>
        {title}
      </h4>
      {children}
    </div>
  );
}

export default function ChangeManagementTab({ onOpenTab }) {
  const [stage, setStage] = useState('request');
  const [type, setType] = useState('normal');
  const [sc, setSc] = useState(0);
  const st = SDLC_STAGES.find(s => s.id === stage);
  const ct = CHANGE_TYPES.find(c => c.id === type);
  const li = x => <li key={x} className="flex gap-2"><span>-</span><span>{x}</span></li>;
  const jump = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-indigo-200 dark:border-indigo-800 p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
          <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 flex items-center justify-center"><GitPullRequest className="w-4 h-4" /></span>
          Change Management, End to End
        </h3>
        <p className="text-sm text-gray-600 dark:text-slate-300 max-w-3xl">
          From a business requirement to a change running safely in production, with the controls and evidence auditors expect at each step, how to classify changes, and what to do when the team ships too fast for every change to be reviewed.
        </p>
        <div className="flex flex-wrap gap-2 mt-3 text-xs">
          {[['cm-sdlc', 'SDLC flow'], ['cm-types', 'Change types'], ['cm-velocity', 'High-volume teams'], ['cm-evidence', 'Audit evidence']].map(([id, l]) => (
            <button key={id} type="button" onClick={() => jump(id)} className="px-2.5 py-1 rounded-full border font-semibold bg-white text-gray-700 border-gray-200 hover:border-indigo-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600">{l}</button>
          ))}
          {onOpenTab && (
            <button type="button" onClick={() => onOpenTab('cicd')} className="px-2.5 py-1 rounded-full border font-semibold bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800">
              Pipeline controls: CI/CD tab <ArrowRight className="inline w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <Card id="cm-sdlc" Icon={GitPullRequest} title="The SDLC flow: from requirement to production">
        <ol className="flex flex-wrap items-center gap-1.5 mb-4" aria-label="SDLC stages">
          {SDLC_STAGES.map((s, i) => (
            <li key={s.id} className="flex items-center gap-1.5">
              <button type="button" onClick={() => setStage(s.id)} aria-pressed={stage === s.id}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${stage === s.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
                {i + 1}. {s.name}
              </button>
              {i < SDLC_STAGES.length - 1 && <span className="text-gray-400 dark:text-slate-500 text-xs">-&gt;</span>}
            </li>
          ))}
        </ol>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg p-3 bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700">
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300 mb-1">What happens</p>
            <p className="text-gray-700 dark:text-slate-200">{st.what}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-2"><span className="font-semibold">Who:</span> {st.who}</p>
          </div>
          <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300 mb-1">Controls</p>
            <ul className="space-y-1 text-gray-700 dark:text-slate-200">{st.controls.map(li)}</ul>
          </div>
          <div className="rounded-lg p-3 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300 mb-1">Evidence</p>
            <p className="text-gray-700 dark:text-slate-200">{st.evidence}</p>
          </div>
        </div>
      </Card>

      <Card id="cm-types" Icon={Layers} title="Types of change and how each is handled">
        <div className="flex flex-wrap gap-2 mb-3" role="tablist" aria-label="Change types">
          {CHANGE_TYPES.map(c => (
            <button key={c.id} type="button" role="tab" aria-selected={type === c.id} onClick={() => setType(c.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${type === c.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
              {c.name}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 mb-4" role="tabpanel">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <p className="font-bold text-gray-900 dark:text-white">{ct.name}</p>
            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${riskCls(ct.risk)}`}>Risk: {ct.risk}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-slate-200 mb-3"><span className="font-semibold">Examples:</span> {ct.examples}</p>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {[['Approval', ct.approval], ['Testing', ct.testing], ['Peer review', ct.review], ['Documentation', ct.docs]].map(([k, v]) => (
              <div key={k} className="rounded-lg p-2.5 bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">{k}</p>
                <p className="text-gray-700 dark:text-slate-200">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm rounded-lg p-2.5 bg-amber-50 border border-amber-200 text-gray-700 dark:bg-amber-900/30 dark:border-amber-800 dark:text-slate-200"><span className="font-semibold text-amber-800 dark:text-amber-300">Watch out: </span>{ct.watch}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="text-left text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-slate-400 pb-2">All types at a glance</caption>
            <thead><tr className="text-left text-[11px] uppercase tracking-wide text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-700">
              <th className="p-2">Type</th><th className="p-2">Risk</th><th className="p-2">Approval</th><th className="p-2">Peer review</th>
            </tr></thead>
            <tbody>
              {CHANGE_TYPES.map(c => (
                <tr key={c.id} className="align-top border-b border-gray-100 dark:border-slate-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50" onClick={() => setType(c.id)}>
                  <td className="p-2 font-semibold text-gray-900 dark:text-white">{c.name}</td>
                  <td className="p-2"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${riskCls(c.risk)}`}>{c.risk}</span></td>
                  <td className="p-2 text-gray-700 dark:text-slate-200">{c.approval}</td>
                  <td className="p-2 text-gray-700 dark:text-slate-200">{c.review}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card id="cm-velocity" Icon={Gauge} title="High-volume teams: when peer review cannot keep up">
        <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 max-w-3xl">{VELOCITY.intro}</p>
        <div className="grid lg:grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> First, make review sustainable (preventive)</p>
            <div className="space-y-2">
              {VELOCITY.preventive.map(p => (
                <div key={p.t} className="rounded-lg p-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800 text-sm">
                  <p className="font-semibold text-gray-900 dark:text-white">{p.t}</p>
                  <p className="text-gray-700 dark:text-slate-200">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5" /> Then, where review is skipped (compensating)</p>
            <div className="space-y-2">
              {VELOCITY.compensating.map(p => (
                <div key={p.t} className="rounded-lg p-3 bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800 text-sm">
                  <p className="font-semibold text-gray-900 dark:text-white">{p.t}</p>
                  <p className="text-gray-700 dark:text-slate-200">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mb-5">
          <div className="rounded-xl p-4 border border-gray-200 dark:border-slate-700">
            <p className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-indigo-600 dark:text-indigo-300" /> Very small teams</p>
            <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1">{VELOCITY.smallTeam.map(li)}</ul>
          </div>
          <div className="rounded-xl p-4 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
            <p className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><ClipboardCheck className="w-4 h-4 text-blue-700 dark:text-blue-300" /> How auditors judge compensating controls</p>
            <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1">{VELOCITY.auditor.map(li)}</ul>
          </div>
        </div>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Scenarios</p>
        <div className="flex flex-wrap gap-2 mb-3" role="tablist" aria-label="Scenarios">
          {SCENARIOS.map((s, i) => (
            <button key={s.t} type="button" role="tab" aria-selected={sc === i} onClick={() => setSc(i)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition text-left ${sc === i ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
              {s.t}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 text-sm" role="tabpanel">
          <p className="text-gray-700 dark:text-slate-200 mb-2"><span className="font-semibold">Situation:</span> {SCENARIOS[sc].s}</p>
          <ul className="space-y-1 text-gray-700 dark:text-slate-200">{SCENARIOS[sc].a.map(li)}</ul>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card id="cm-kpis" Icon={BarChart3} title="Metrics to watch">
          <div className="space-y-2 text-sm">
            {KPIS.map(k => (
              <div key={k.k}><p className="font-semibold text-gray-900 dark:text-white">{k.k}</p><p className="text-gray-700 dark:text-slate-200">{k.v}</p></div>
            ))}
          </div>
        </Card>
        <Card id="cm-mapping" Icon={Layers} title="Framework mapping">
          <div className="space-y-2 text-sm">
            {MAPPING.map(m => (
              <div key={m.f}><p className="font-semibold text-gray-900 dark:text-white">{m.f}</p><p className="text-gray-700 dark:text-slate-200">{m.c}</p></div>
            ))}
          </div>
        </Card>
      </div>

      <Card id="cm-evidence" Icon={ClipboardCheck} title="Audit evidence checklist">
        <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1.5">{EVIDENCE.map(li)}</ul>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-3 flex gap-1.5"><Info className="w-3.5 h-3.5 shrink-0 mt-0.5" /> Common findings in this area, such as skipped reviews, hotfixes without retrospective approval and untested changes, are covered in Audit and Rebuttals.</p>
      </Card>
    </div>
  );
}
