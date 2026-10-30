import { useState } from 'react';
import data from '../../data/ccThreatModel.json';
import CcDownloads from './CcDownloads.jsx';

const TH = 'px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800';
const TD = 'px-3 py-2 align-top text-gray-700 dark:text-gray-300';
const TABS = ['Primers', 'STRIDE vs LINDDUN', 'Threat domains', 'Templates'];

function Primer({ title, sub, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm min-w-[820px]">
        <caption className="text-left p-3 font-bold text-gray-900 dark:text-white">{title} <span className="font-normal text-gray-500 dark:text-gray-400">{sub}</span></caption>
        <thead><tr>{['Letter', 'Threat', 'Meaning', 'Everyday example', 'In our contact centre'].map(h => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">{rows.map(([l, n, m, e, c]) => <tr key={n}><td className={TD + ' font-bold text-violet-700 dark:text-violet-300'}>{l}</td><td className={TD + ' font-semibold text-gray-900 dark:text-white'}>{n}</td><td className={TD}>{m}</td><td className={TD}>{e}</td><td className={TD + ' text-teal-700 dark:text-teal-300'}>{c}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export default function ContactCenterThreatModel() {
  const [tab, setTab] = useState('Primers');
  const [open, setOpen] = useState('D1');
  return (
    <section id="contact-center-threat-model" className="mt-8 scroll-mt-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact-centre threat model: STRIDE, LINDDUN and tabletop exercises</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">A generic, cloud-hosted, AI-assisted contact centre: telephony edge (SBC to cloud SBC to calling platform), conversational AI bot with CRM, containerised Web API, data lake and BI, observability and a hub-and-spoke network. Placeholders in [SQUARE_BRACKETS] are for your organisation's values.</p>
      <div role="tablist" className="flex flex-wrap gap-2 mb-4">{TABS.map(t => <button key={t} role="tab" type="button" aria-selected={tab === t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${tab === t ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'}`}>{t}</button>)}</div>

      {tab === 'Primers' && <div className="space-y-4">
        <Primer title="STRIDE" sub="Security: can someone break or abuse the system?" rows={data.stride} />
        <Primer title="LINDDUN" sub="Privacy: even if it works as designed, does it harm the people in the data?" rows={data.linddun} />
      </div>}

      {tab === 'STRIDE vs LINDDUN' && <div className="space-y-3">
        <p className="text-sm text-gray-700 dark:text-gray-300">Security fixes can create privacy harms. Each row shows the trade-off and a balancing control.</p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700"><table className="w-full text-sm min-w-[820px]">
          <thead><tr>{['Security control', 'STRIDE benefit', 'LINDDUN harm', 'Balancing control'].map(h => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">{data.tension.map(r => <tr key={r[0]}><td className={TD + ' font-semibold text-gray-900 dark:text-white'}>{r[0]}</td><td className={TD}>{r[1]}</td><td className={TD + ' text-rose-700 dark:text-rose-300'}>{r[2]}</td><td className={TD + ' text-teal-700 dark:text-teal-300'}>{r[3]}</td></tr>)}</tbody>
        </table></div>
      </div>}

      {tab === 'Threat domains' && <div className="space-y-2">
        {data.domains.map(d => {
          const isOpen = open === d.id;
          return (
            <div key={d.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : d.id)} className="w-full flex items-center justify-between gap-3 p-3 text-left">
                <span className="font-semibold text-gray-900 dark:text-white"><span className="text-violet-700 dark:text-violet-300 mr-2">{d.id}</span>{d.name}</span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">STRIDE: {d.stride} | LINDDUN: {d.linddun}</span>
              </button>
              {isOpen && <div className="px-4 pb-4 grid md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="md:col-span-2"><p>{d.plain}</p><p className="mt-1 text-teal-700 dark:text-teal-300"><span className="font-semibold">Everyday analogy:</span> {d.analogy}</p></div>
                <div className="md:col-span-2 rounded-lg bg-rose-50 dark:bg-rose-900/20 p-3"><span className="font-semibold text-rose-800 dark:text-rose-200">Scenario:</span> {d.narrative}</div>
                <div><p className="font-semibold text-gray-900 dark:text-white mb-1">Top mitigations</p><ol className="list-decimal pl-5 space-y-1">{d.mit.map(m => <li key={m}>{m}</li>)}</ol></div>
                <div><p className="font-semibold text-gray-900 dark:text-white mb-1">Detection signals</p><ul className="list-disc pl-5 space-y-1">{d.det.map(m => <li key={m}>{m}</li>)}</ul></div>
                <div><span className="font-semibold text-gray-900 dark:text-white">Business impact:</span> {d.impact}</div>
                <div><span className="font-semibold text-gray-900 dark:text-white">STRIDE vs LINDDUN tension:</span> {d.tension}</div>
                <div className="md:col-span-2 text-xs text-gray-500 dark:text-gray-400">Cross-references: TTX-{d.id}-01, RISK-{d.id}-01 onwards, MAP-{d.id}-01 in the templates.</div>
              </div>}
            </div>
          );
        })}
      </div>}

      {tab === 'Templates' && <div>
        <CcDownloads groups={['ttx']} title="Tabletop exercises" />
        <CcDownloads groups={['risk']} title="Risk matrices" />
        <CcDownloads groups={['mapping']} title="Framework mapping" />
        <p className="text-xs text-gray-500 dark:text-gray-400">Access review, vendor governance and interview templates are also in the Access Governance, Vendor Risk and Interview Prep tabs.</p>
      </div>}
    </section>
  );
}
