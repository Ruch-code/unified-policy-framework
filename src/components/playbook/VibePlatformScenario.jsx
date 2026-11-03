import { Link } from 'react-router-dom';
import { VIBE_TITLE, VIBE_ROLES, VIBE_FLOWS, VIBE_VENDOR, VIBE_PRIVACY, VIBE_PLATFORM, VIBE_EVIDENCE } from '../../data/vibePlatformScenario.js';

const TH = 'text-left p-2 font-semibold text-gray-900 dark:text-white';
const TD = 'p-2 text-gray-700 dark:text-slate-300 align-top';
const Ul = ({ items }) => <ul className="text-sm space-y-1 text-gray-700 dark:text-slate-300">{items.map(x => <li key={x} className="flex gap-2"><span aria-hidden="true">-</span><span>{x}</span></li>)}</ul>;

/** Full worked scenario. jurisdiction: 'gdpr', 'dpdpa' or 'both'. */
export default function VibePlatformScenario({ jurisdiction = 'both' }) {
  const showG = jurisdiction !== 'dpdpa';
  const showD = jurisdiction !== 'gdpr';
  return (
    <section id="vibe-platform-operator" className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 sm:p-6 my-8 scroll-mt-24">
      <span className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-200 dark:border-violet-800 mb-2">Platform operator view</span>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Worked scenario: {VIBE_TITLE}</h2>
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 max-w-3xl">For the company that runs the platform. Guidance for employees using such tools stays in the vibe-coded apps section on the home page. Roles depend on the facts of each activity; confirm with counsel.</p>

      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Role map per activity</h3>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 mb-5" tabIndex={0} role="region" aria-label="Role map">
        <table className="w-full text-sm min-w-[860px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>{['Activity', 'GDPR role', 'DPDPA role', 'Note'].map(h => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
          <tbody>{VIBE_ROLES.map(r => <tr key={r[0]} className="border-t border-gray-200 dark:border-slate-700"><th scope="row" className={`${TD} font-semibold text-gray-900 dark:text-white`}>{r[0]}</th><td className={TD}>{r[1]}</td><td className={TD}>{r[2]}</td><td className={TD}>{r[3]}</td></tr>)}</tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data flows</h3>
          <ul className="text-sm space-y-1 text-gray-700 dark:text-slate-300">{VIBE_FLOWS.map(([k, v]) => <li key={k}><span className="font-semibold text-gray-900 dark:text-white">{k}: </span>{v}</li>)}</ul></div>
        <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">Model provider controls</h3><Ul items={VIBE_VENDOR} /></div>
        {showG && <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy controls: GDPR</h3><Ul items={VIBE_PRIVACY.gdpr} /></div>}
        {showD && <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy controls: DPDPA</h3><Ul items={VIBE_PRIVACY.dpdpa} /></div>}
        <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">Platform controls</h3><Ul items={VIBE_PLATFORM} /></div>
        <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">Evidence an auditor would request</h3><Ul items={VIBE_EVIDENCE} /></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-slate-400 mt-4">Not legal advice. See also <Link className="underline" to="/gdpr#gdpr-dpdpa-comparison">GDPR and DPDPA compared</Link>.</p>
    </section>
  );
}

/** Compact linked card for other modules (vibe-coded apps block, ISO 42001, Vendor Risk). */
export function VibePlatformLink({ className = '' }) {
  return (
    <div className={`rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/60 dark:bg-violet-900/20 p-4 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-wide text-violet-800 dark:text-violet-200">Platform operator view</span>
      <p className="font-semibold text-gray-900 dark:text-white mt-1">{VIBE_TITLE}</p>
      <p className="text-sm text-gray-700 dark:text-slate-300 mt-1">Role map, data flows, model provider controls, GDPR and DPDPA privacy controls, platform controls and audit evidence for the company that runs the platform.</p>
      <div className="flex flex-wrap gap-3 mt-2 text-sm">
        <Link className="underline text-violet-700 dark:text-violet-300" to="/gdpr#vibe-platform-operator">Open on the GDPR playbook</Link>
        <Link className="underline text-violet-700 dark:text-violet-300" to="/dpdpa#vibe-platform-operator">Open on the DPDPA playbook</Link>
      </div>
    </div>
  );
}
