import { useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import { CORE, SECTOR_ADDONS, TOPIC_ADDONS } from '../data/vendorQuestionnaires';
import { downloadXlsx } from '../utils/xlsxExport.js';

const RESPONSES = ['Yes', 'No', 'Partial', 'Not applicable'];
const ASSESS = ['Satisfactory', 'Needs follow-up', 'Finding raised', 'Not reviewed'];

function build({ version, sectorIds, topicIds }) {
  const core = version === 'lite' ? CORE.filter((q) => q.lite) : CORE;
  const sectors = SECTOR_ADDONS.filter((s) => sectorIds.includes(s.id));
  const topics = TOPIC_ADDONS.filter((t) => topicIds.includes(t.id));
  const all = [...core, ...sectors.flatMap((s) => s.questions), ...topics.flatMap((t) => t.questions)];
  return { all, sectors, topics, core };
}

export function download(sel) {
  const { all, sectors, topics } = build(sel);
  const label = [sel.version === 'lite' ? 'Lite' : 'Full', ...sectors.map((s) => s.name), ...topics.map((t) => t.name)].join(', ');
  const fileTag = [sel.version, ...sectors.map((s) => s.id), ...topics.map((t) => t.id)].join('-');
  downloadXlsx([
    {
      name: 'Instructions', title: `Vendor Security Questionnaire (${label})`,
      notes: [
        'For the vendor: answer every question, add a comment where the answer is No or Partial, and attach or link the evidence requested. Answers may be checked against your SOC 2, ISO or other reports.',
        'For the reviewer: validate high-risk answers against evidence, record your assessment, and raise a finding for any gap. Uploaded but not yet reviewed evidence is not complete.',
        'Lite is for lower-tier vendors; Full is for Tier 1 and Tier 2. Sector and topic sections are added on top of the core set.',
      ],
      headers: ['Section', 'Questions'],
      rows: [['Core', String(all.filter((q) => CORE.some((c) => c.id === q.id)).length)], ...sectors.map((s) => [s.name, String(s.questions.length)]), ...topics.map((t) => [t.name, String(t.questions.length)])],
    },
    {
      name: 'Questionnaire', title: 'Questions',
      headers: ['ID', 'Domain', 'Question', 'Evidence requested', 'Framework mapping', 'Vendor response', 'Vendor comment', 'Evidence link or file', 'Reviewer assessment', 'Reviewer notes', 'Follow-up date'],
      rows: all.map((q) => [q.id, q.domain, q.question, q.evidence, q.mapping, '', '', '', '', '', '']),
      validations: [{ col: 5, values: RESPONSES }, { col: 8, values: ASSESS }],
    },
    {
      name: 'Vendor Details', title: 'Vendor Details',
      headers: ['Field', 'Response'],
      rows: [['Vendor legal name', ''], ['Service provided', ''], ['Primary security contact (role and email)', ''], ['Data types processed', ''], ['Hosting provider and regions', ''], ['Completed by (role)', ''], ['Date completed', '']],
    },
  ], `vendor-questionnaire-${fileTag}`);
}

export default function VendorQuestionnaires() {
  const [version, setVersion] = useState('full');
  const [sectorIds, setSectorIds] = useState(['saas']);
  const [topicIds, setTopicIds] = useState([]);
  const toggle = (list, setList, id) => setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  const { all, core } = build({ version, sectorIds, topicIds });
  const chip = (on) => `px-3 py-1.5 rounded-full text-xs font-semibold border transition ${on ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-surface-dark-100 text-navy-700 dark:text-text-dark-secondary border-surface-300 dark:border-surface-dark-300'}`;

  return (
    <div id="panel-questionnaires" role="tabpanel" aria-labelledby="vtab-questionnaires" className="space-y-6">
      <div className="rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-surface-dark-100 p-5">
        <div className="flex items-start gap-3 mb-4">
          <FileSpreadsheet className="w-6 h-6 text-emerald-600 shrink-0" aria-hidden="true" />
          <div>
            <h3 className="text-lg font-bold text-navy-900 dark:text-text-dark-primary">Build a vendor questionnaire</h3>
            <p className="text-sm text-navy-600 dark:text-text-dark-secondary">A core set every vendor answers, plus sector and topic sections. Each question lists the evidence to request and its framework mapping. Download as Excel with response and reviewer dropdowns.</p>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide text-navy-500 dark:text-text-dark-muted mb-1.5">Version</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <button type="button" className={chip(version === 'lite')} onClick={() => setVersion('lite')}>Lite: Tier 3 and 4 ({CORE.filter((q) => q.lite).length} core questions)</button>
          <button type="button" className={chip(version === 'full')} onClick={() => setVersion('full')}>Full: Tier 1 and 2 ({CORE.length} core questions)</button>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide text-navy-500 dark:text-text-dark-muted mb-1.5">Sector or industry (pick any)</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {SECTOR_ADDONS.map((s) => (
            <button key={s.id} type="button" title={s.description} aria-pressed={sectorIds.includes(s.id)} className={chip(sectorIds.includes(s.id))} onClick={() => toggle(sectorIds, setSectorIds, s.id)}>
              {s.name} (+{s.questions.length})
            </button>
          ))}
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide text-navy-500 dark:text-text-dark-muted mb-1.5">Topics</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {TOPIC_ADDONS.map((t) => (
            <button key={t.id} type="button" title={t.description} aria-pressed={topicIds.includes(t.id)} className={chip(topicIds.includes(t.id))} onClick={() => toggle(topicIds, setTopicIds, t.id)}>
              {t.name} (+{t.questions.length})
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => download({ version, sectorIds, topicIds })} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700">
            <Download className="w-4 h-4" /> Download questionnaire (.xlsx)
          </button>
          <span className="text-sm text-navy-600 dark:text-text-dark-secondary">{all.length} questions: {core.length} core + {all.length - core.length} sector and topic</span>
        </div>
      </div>

      <div className="rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-surface-dark-100 p-5">
        <h4 className="font-bold text-navy-900 dark:text-text-dark-primary mb-2">Preview</h4>
        <ol className="space-y-2 max-h-[480px] overflow-y-auto pr-2">
          {all.map((q) => (
            <li key={q.id} className="text-sm text-navy-700 dark:text-text-dark-secondary">
              <span className="font-mono text-xs text-indigo-600 dark:text-indigo-300 mr-2">{q.id}</span>
              <span className="text-xs font-semibold mr-2">{q.domain}</span>
              {q.question}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
