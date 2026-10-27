import { useState } from 'react';
import { ChevronDown, ChevronRight, Download, ShieldAlert } from 'lucide-react';
import { AUDIT_PHASES, AUDIT_TESTS, AUDIT_SEVERITY, AUDIT_REPORT_OUTLINE } from '../../data/aiAssurance';
import { downloadXlsx } from '../../utils/xlsxExport.js';

export function downloadAuditWorkbook() {
  downloadXlsx([
    {
      name: 'Instructions', title: 'AI Security Audit Workbook: Example Co.',
      notes: ['Work through the phases in order. Record every test with its evidence. A finding is closed only after a successful retest.', 'Severity and remediation SLAs are on the Severity sheet. Accepted findings go to the risk register with Approver sign-off.'],
      headers: ['Phase', 'Goal', 'Activities', 'Outputs'],
      rows: AUDIT_PHASES.map((p) => [p.phase, p.goal, p.activities.join('; '), p.outputs.join('; ')]),
    },
    {
      name: 'Test Plan', title: 'AI Security Test Plan and Results',
      headers: ['Test ID', 'Area', 'Test', 'Method', 'Pass criteria', 'OWASP LLM (2025)', 'MITRE ATLAS', 'Framework mappings', 'Evidence to collect', 'In scope (Y/N)', 'Result', 'Evidence location', 'Finding ID', 'Tester', 'Date'],
      rows: AUDIT_TESTS.map((t) => [t.id, t.area, t.test, t.method, t.passCriteria, t.owasp, t.atlas, t.mappings.join('; '), t.evidence.join('; '), '', '', '', '', '', '']),
      validations: [{ col: 9, values: ['Y', 'N'] }, { col: 10, values: ['Pass', 'Fail', 'Partial', 'Not tested'] }],
    },
    {
      name: 'Findings', title: 'Findings Register',
      headers: ['Finding ID', 'Test ID', 'Severity', 'Description', 'Impact', 'Recommendation', 'Owner', 'Due date', 'Status', 'Retest date', 'Retest result', 'Accepted by (if accepted)'],
      rows: Array.from({ length: 25 }, () => []),
      validations: [{ col: 2, values: AUDIT_SEVERITY.map((s) => s.level) }, { col: 8, values: ['Open', 'In progress', 'Fixed, awaiting retest', 'Closed', 'Risk accepted'] }],
    },
    { name: 'Severity', title: 'Severity and Remediation SLA', headers: ['Severity', 'Meaning', 'Remediation SLA'], rows: AUDIT_SEVERITY.map((s) => [s.level, s.meaning, s.sla]) },
    { name: 'Report Outline', title: 'Audit Report Outline', headers: ['#', 'Section'], rows: AUDIT_REPORT_OUTLINE.map((s, i) => [i + 1, s]) },
  ], 'ai-security-audit-workbook');
}

export default function AiSecurityAudit() {
  const [open, setOpen] = useState(null);
  const [area, setArea] = useState('all');
  const areas = [...new Set(AUDIT_TESTS.map((t) => t.area))];
  const tests = AUDIT_TESTS.filter((t) => area === 'all' || t.area === area);

  return (
    <section id="ai-security-audit" className="scroll-mt-24 rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-5 md:p-8 mb-10">
      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-5">
        <div className="flex-1">
          <h2 className="grc-section-title mb-2"><ShieldAlert className="w-6 h-6 text-rose-600" /> Security audit of AI systems, end to end</h2>
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary max-w-3xl">
            Six phases from scoping to report, and a 15-test catalogue mapped to the OWASP Top 10 for LLM Applications (2025), MITRE ATLAS, ISO 42001 Annex A, the EU AI Act, NIST AI RMF and SOC 2. Run it before releasing a medium or high risk AI system and at least annually.
          </p>
        </div>
        <button type="button" onClick={downloadAuditWorkbook} className="inline-flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-lg bg-rose-600 text-white text-sm font-bold hover:bg-rose-700">
          <Download className="w-4 h-4" /> Audit workbook (.xlsx)
        </button>
      </div>

      <ol className="grid gap-3 md:grid-cols-3 mb-6">
        {AUDIT_PHASES.map((p) => (
          <li key={p.phase} className="rounded-xl border border-surface-200 dark:border-surface-dark-200 bg-surface-50 dark:bg-slate-900/80 p-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-text-dark-primary">{p.phase}</h3>
            <p className="text-xs text-gray-600 dark:text-text-dark-secondary mt-1 italic">{p.goal}</p>
            <ul className="list-disc pl-4 mt-2 space-y-0.5 text-xs text-gray-700 dark:text-text-dark-secondary">{p.activities.map((a) => <li key={a}>{a}</li>)}</ul>
            <p className="text-[11px] mt-2 text-emerald-700 dark:text-emerald-300"><strong>Outputs:</strong> {p.outputs.join(', ')}</p>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <h3 className="font-bold text-base text-gray-900 dark:text-text-dark-primary mr-2">Test catalogue</h3>
        <select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filter tests by area" className="px-3 py-1.5 rounded-lg text-sm border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-800 text-gray-900 dark:text-text-dark-primary">
          <option value="all">All areas</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      <ul className="space-y-2 mb-6">
        {tests.map((t) => {
          const isOpen = open === t.id;
          return (
            <li key={t.id} className="rounded-xl border border-surface-200 dark:border-surface-dark-200">
              <button type="button" onClick={() => setOpen(isOpen ? null : t.id)} aria-expanded={isOpen} className="w-full flex items-start gap-2 p-3 text-left hover:bg-surface-50 dark:hover:bg-slate-800/60">
                {isOpen ? <ChevronDown className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" /> : <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" />}
                <span className="font-mono text-xs shrink-0 w-14 text-rose-700 dark:text-rose-300">{t.id}</span>
                <span className="flex-1 text-sm text-gray-900 dark:text-text-dark-primary">{t.test}</span>
                <span className="hidden sm:inline text-[11px] text-gray-500 dark:text-text-dark-muted shrink-0">{t.owasp}</span>
              </button>
              {isOpen && (
                <div className="px-3 pb-3 grid gap-3 md:grid-cols-3 text-xs text-gray-700 dark:text-text-dark-secondary">
                  <div><p className="font-semibold text-gray-900 dark:text-text-dark-primary mb-1">How to test</p><p>{t.method}</p><p className="mt-2"><strong>Pass when:</strong> {t.passCriteria}</p></div>
                  <div><p className="font-semibold text-gray-900 dark:text-text-dark-primary mb-1">Mappings</p><p><strong>OWASP:</strong> {t.owasp}</p><p><strong>ATLAS:</strong> {t.atlas}</p><p>{t.mappings.join('; ')}</p></div>
                  <div><p className="font-semibold text-gray-900 dark:text-text-dark-primary mb-1">Evidence</p><ul className="list-disc pl-4">{t.evidence.map((e) => <li key={e}>{e}</li>)}</ul></div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-text-dark-primary mb-2">Finding severity</h3>
          <ul className="space-y-1.5 text-xs text-gray-700 dark:text-text-dark-secondary">
            {AUDIT_SEVERITY.map((s) => <li key={s.level}><strong>{s.level}:</strong> {s.meaning} <span className="text-rose-700 dark:text-rose-300">{s.sla}.</span></li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-text-dark-primary mb-2">Report outline</h3>
          <ol className="list-decimal pl-5 space-y-0.5 text-xs text-gray-700 dark:text-text-dark-secondary">{AUDIT_REPORT_OUTLINE.map((s) => <li key={s}>{s}</li>)}</ol>
        </div>
      </div>
    </section>
  );
}
