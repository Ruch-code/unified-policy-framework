import { Fragment, useState } from 'react';
import TemplateDownloadButton from '../templates/TemplateDownloadButton.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

// KPI and KRI library (Module M). Thresholds are suggested starting points, not standards.
const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';

// [type, name, definition, formula, data source, frequency, owner role, green, amber, red]
export const METRICS = [
  ['KPI', 'Security training completion', 'Staff who completed required training on time', 'Completed / assigned x 100', 'Training platform', 'Monthly', 'GRC lead', '95% or more', '85 to 94%', 'Below 85%'],
  ['KPI', 'Phishing report rate', 'Simulation emails reported by recipients', 'Reported / delivered x 100', 'Phishing simulation tool', 'Per campaign', 'Security awareness lead', '60% or more', '30 to 59%', 'Below 30%'],
  ['KRI', 'Phishing click rate', 'Simulation emails clicked', 'Clicked / delivered x 100', 'Phishing simulation tool', 'Per campaign', 'Security awareness lead', 'Below 5%', '5 to 10%', 'Above 10%'],
  ['KPI', 'Critical patches within SLA', 'Critical vulnerabilities fixed within the agreed days', 'Fixed in SLA / total critical x 100', 'Vulnerability scanner', 'Monthly', 'IT or platform lead', '95% or more', '85 to 94%', 'Below 85%'],
  ['KRI', 'Critical vulnerabilities past SLA', 'Open critical vulnerabilities older than the SLA', 'Count', 'Vulnerability scanner', 'Weekly', 'IT or platform lead', '0', '1 to 3', 'More than 3'],
  ['KPI', 'Access reviews completed on time', 'Scheduled access reviews completed by the due date', 'On time / scheduled x 100', 'Access review records', 'Quarterly', 'IT lead', '100%', '90 to 99%', 'Below 90%'],
  ['KRI', 'Leavers with access after deadline', 'Leavers whose access was removed late', 'Count in period', 'HR and identity provider', 'Monthly', 'IT lead', '0', '1 to 2', 'More than 2'],
  ['KRI', 'Privileged accounts without MFA', 'Admin accounts not protected by MFA', 'Count', 'Identity provider', 'Monthly', 'IT lead', '0', '1', 'More than 1'],
  ['KRI', 'Overdue audit findings', 'Audit findings past their agreed due date', 'Count', 'Findings tracker', 'Monthly', 'GRC lead', '0', '1 to 3', 'More than 3'],
  ['KRI', 'Critical vendors without a current review', 'Critical vendors whose last assessment is older than 12 months', 'Count', 'Vendor register', 'Quarterly', 'Vendor risk lead', '0', '1 to 2', 'More than 2'],
  ['KRI', 'Policies past review date', 'Policies not reviewed by their next review date', 'Count', 'Policy register', 'Monthly', 'GRC lead', '0', '1 to 2', 'More than 2'],
  ['KRI', 'Risk acceptances past expiry', 'Accepted risks whose acceptance has expired', 'Count', 'Risk register', 'Monthly', 'Risk owner', '0', '1', 'More than 1'],
  ['KRI', 'Risk treatment actions overdue', 'Treatment actions past due date', 'Count', 'Risk register', 'Monthly', 'Risk owner', '0', '1 to 3', 'More than 3'],
  ['KPI', 'Mean time to contain incidents', 'Average time from detection to containment', 'Sum of hours / incidents', 'Incident tickets', 'Quarterly', 'Security operations lead', 'Under 4 hours', '4 to 24 hours', 'Over 24 hours'],
  ['KPI', 'Backup restore tests passed', 'Restore tests that met RTO and RPO', 'Passed / run x 100', 'DR test records', 'Quarterly', 'IT lead', '100%', '90 to 99%', 'Below 90%'],
  ['KRI', 'Endpoints without encryption or EDR', 'Managed devices missing disk encryption or EDR', 'Count', 'MDM and EDR consoles', 'Weekly', 'IT lead', '0', '1 to 5', 'More than 5'],
];

export default function KpiKriLibrary() {
  const { user } = useAuth();
  const [q, setQ] = useState('');
  const [type, setType] = useState('All');
  const rows = METRICS.filter((m) => (type === 'All' || m[0] === type) && (!q || m.join(' ').toLowerCase().includes(q.toLowerCase())));
  return (
    <section id="kpi-kri" className={`border-t pt-8 ${LINE} scroll-mt-20`}>
      <h2 className={`text-2xl font-serif font-bold ${H}`}>KPI and KRI library</h2>
      <p className={`mt-3 max-w-3xl leading-relaxed ${TXT}`}>KPIs show whether the security programme is performing. KRIs warn that risk is rising before it turns into an incident. Pick a short set, name who publishes each one, and report trends to management. Thresholds below are suggested starting points; set your own from your risk appetite.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <label className="sr-only" htmlFor="kpi-q">Search metrics</label>
        <input id="kpi-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search metrics" className="ui-input rounded border px-2 py-1.5 text-sm w-56" />
        {['All', 'KPI', 'KRI'].map((t) => <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className="btn btn-secondary px-2.5 py-1.5 rounded text-sm">{t}</button>)}
        <span className={`self-center text-xs ${TXT}`}>{rows.length} of {METRICS.length}</span>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((m) => (
          <details key={m[1]} className={`rounded border ${LINE} p-3`}>
            <summary className={`cursor-pointer text-sm ${H}`}><span className="font-semibold">{m[1]}</span> <span className={`text-xs ${TXT}`}>({m[0]}, {m[5]})</span></summary>
            <dl className={`mt-2 grid grid-cols-[110px_1fr] gap-x-3 gap-y-1 text-sm ${TXT}`}>
              {[['Definition', m[2]], ['Formula', m[3]], ['Data source', m[4]], ['Owner role', m[6]], ['Green', m[7]], ['Amber', m[8]], ['Red', m[9]]].map(([k, v]) => <Fragment key={k}><dt className="font-medium">{k}</dt><dd>{v}</dd></Fragment>)}
            </dl>
          </details>
        ))}
      </div>
      <div className={`mt-4 rounded border ${LINE} p-3 text-sm`}>
        <p className={`font-semibold ${H} mb-1`}>Template</p>
        {user ? <div className="flex flex-wrap items-center justify-between gap-2"><span className={TXT}>KPI and KRI register with a monthly dashboard</span><TemplateDownloadButton template={{ name: 'KPI and KRI Register', file: 'kpi-kri-register.xlsx' }} compact /></div> : <p className={`text-xs ${TXT}`}>Log in to download the template.</p>}
      </div>
      <p className={`mt-3 text-xs ${TXT}`}>Source: common information security metrics practice; thresholds are illustrative. Last verified: 17 Nov 2026.</p>
    </section>
  );
}
