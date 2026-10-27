import { Download, FileText, ClipboardCheck } from 'lucide-react';
import { downloadXlsx, downloadBlob } from '../../utils/xlsxExport.js';
import { SEED_REGISTER } from '../../data/riskAssessment/register';
import { CONTROLS } from '../../data/riskAssessment/controls';
import { LIBRARY_CATEGORIES } from '../../data/riskAssessment/library';
import { LIKELIHOOD, IMPACT, BANDS, APPETITE, TREATMENTS, WORKFLOW } from '../../data/riskAssessment/methodology';
import { REPORT_OUTLINE_MD } from '../../data/riskAssessment/report';
import { score, sectionCls, h3Cls, leadCls } from './riskUtils.jsx';

const REGISTER_HEADERS = ['ID', 'Risk scenario', 'Categories', 'CIA', 'Owner', 'Likelihood', 'Impact', 'Inherent score', 'Treatment', 'Treatment status', 'Residual likelihood', 'Residual impact', 'Residual score', 'Approval status', 'Linked controls', 'Approver', 'Identified date', 'Last reviewed date', 'Approval date', 'Notes'];

export function downloadRegisterTemplate() {
  const seedRows = SEED_REGISTER.map((r) => [
    r.id, r.scenario, r.categories.join(', '), r.cia.join(', '), r.owner, r.likelihood, r.impact, score(r.likelihood, r.impact),
    r.treatment, r.treatmentStatus, r.residualLikelihood, r.residualImpact, score(r.residualLikelihood, r.residualImpact),
    r.approvalStatus, r.controls.join(', '), r.approver, r.identifiedDate, r.lastReviewedDate, r.approvalDate,
    [r.recommended ? 'Recommended addition' : '', r.note || ''].filter(Boolean).join('. '),
  ]);
  const blanks = Array.from({ length: 30 }, () => []);
  const scale = ['1', '2', '3', '4', '5'];
  downloadXlsx([
    {
      name: 'Instructions',
      title: 'Risk Register Template: Example Co.',
      notes: [
        'One row per risk. Score inherent likelihood and impact for the current state, and residual likelihood and impact for when the treatment plan is fully implemented. Score = likelihood x impact.',
        'Columns with dropdowns: Likelihood, Impact, Treatment, Treatment status, Residual likelihood, Residual impact and Approval status. Inherent and residual score cells can use a formula such as =F5*G5.',
        `Risk appetite: ${APPETITE.statement} ${APPETITE.rule}`,
        'Review the whole register at least annually and within 30 days of a material change. Include at least one fraud scenario (SOC 2 CC3.3).',
      ],
      headers: ['Sheet', 'Purpose'],
      rows: [['Register', 'Your risk register, seeded with 16 sample risks you can edit or delete'], ['Rubric', 'Likelihood and impact definitions and score bands'], ['Lists', 'Allowed values for categories, treatments and workflow states']],
    },
    {
      name: 'Register', title: 'Risk Register', headers: REGISTER_HEADERS, rows: [...seedRows, ...blanks],
      validations: [
        { col: 5, values: scale }, { col: 6, values: scale }, { col: 10, values: scale }, { col: 11, values: scale },
        { col: 8, values: TREATMENTS.map((t) => t.option) },
        { col: 9, values: WORKFLOW.map((w) => w.state) },
        { col: 13, values: ['Not submitted', 'Pending approval', 'Approved', 'Rejected'] },
      ],
    },
    {
      name: 'Rubric', title: 'Scoring Rubric',
      headers: ['Scale', 'Value', 'Label', 'Definition'],
      rows: [
        ...LIKELIHOOD.map((x) => ['Likelihood', x.value, x.label, x.definition]),
        ...IMPACT.map((x) => ['Impact', x.value, x.label, x.definition]),
        ...BANDS.map((b) => ['Band', `${b.min} to ${b.max}`, b.label, b.action]),
      ],
    },
    {
      name: 'Lists', title: 'Allowed Values',
      headers: ['Categories', 'Treatment options', 'Workflow states', 'CIA'],
      rows: Array.from({ length: Math.max(LIBRARY_CATEGORIES.length, WORKFLOW.length) }, (_, n) => [
        LIBRARY_CATEGORIES[n] || '', TREATMENTS[n]?.option || '', WORKFLOW[n]?.state || '', ['Confidentiality', 'Integrity', 'Availability'][n] || '',
      ]),
    },
  ], 'risk-register-template');
}

export function downloadReportOutline() {
  downloadBlob(new Blob([REPORT_OUTLINE_MD], { type: 'text/markdown;charset=utf-8' }), 'risk-assessment-report-outline.md');
}

export function downloadEvidenceChecklist() {
  const rows = CONTROLS.flatMap((c) => c.evidence.map((e, n) => [c.id, n === 0 ? c.name : '', n === 0 ? c.soc2.join(', ') : '', n === 0 ? c.tests.join('; ') : '', e, '', '', '']));
  downloadXlsx([{
    name: 'Evidence Checklist',
    title: 'Auditor Evidence Checklist by Control',
    notes: ['Mark each evidence item when it is uploaded, then again when it has been reviewed. Uploaded but not yet reviewed is not complete.'],
    headers: ['Control ID', 'Control', 'SOC 2', 'Tests', 'Evidence required', 'Status', 'Location / link', 'Reviewed by and date'],
    rows,
    validations: [{ col: 5, values: ['Not started', 'File uploaded, to review', 'Reviewed and accepted', 'Needs rework'] }],
  }], 'risk-control-evidence-checklist');
}

const ITEMS = [
  { icon: Download, title: 'Risk register template (.xlsx)', desc: 'Register columns from Section 4 with dropdowns, the 16 sample risks, a rubric sheet and allowed values.', action: downloadRegisterTemplate, cta: 'Download template' },
  { icon: FileText, title: 'Risk assessment report outline (.md)', desc: 'Scope, methodology, participants by role, heatmap, top risks, treatment plans, accepted risks with sign-off and next review date.', action: downloadReportOutline, cta: 'Download outline' },
  { icon: ClipboardCheck, title: 'Auditor evidence checklist (.xlsx)', desc: 'Every control from Section 6 with its tests and each evidence item to collect and review.', action: downloadEvidenceChecklist, cta: 'Download checklist' },
];

export default function RiskDownloads() {
  return (
    <section id="ra-downloads" className={sectionCls}>
      <h3 className={h3Cls}>8. Downloadables</h3>
      <p className={leadCls}>Generic templates with placeholder roles. Adapt them to your organisation before use.</p>
      <div className="grid gap-3 md:grid-cols-3">
        {ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className="rounded-xl border border-surface-200 dark:border-surface-dark-200 p-4 flex flex-col">
              <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-300 mb-2" aria-hidden="true" />
              <h4 className="font-semibold text-sm text-navy-900 dark:text-text-dark-primary">{it.title}</h4>
              <p className="text-xs text-navy-600 dark:text-text-dark-secondary mt-1 flex-1">{it.desc}</p>
              <button type="button" onClick={it.action} className="mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700">
                <Download className="w-3.5 h-3.5" /> {it.cta}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
