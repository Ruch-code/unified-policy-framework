import { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { downloadTemplateDocx } from '../../utils/templateDocx.js';

/** Word download button. Generates the .docx in the browser on click. */
export default function TemplateDownloadButton({ template, compact = false }) {
  const [busy, setBusy] = useState(false);
  const onClick = async () => {
    if (busy) return;
    setBusy(true);
    try { await downloadTemplateDocx(template); }
    catch (e) { console.error('Template download failed', e); }
    finally { setBusy(false); }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      aria-label={`Download ${template.name} as Word document`}
      title="Download .docx"
      className={`inline-flex items-center justify-center gap-1.5 shrink-0 rounded-lg font-semibold transition-colors
        bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-60
        focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
        ${compact ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'}`}
    >
      {busy ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <FileText className="w-4 h-4" aria-hidden="true" />}
      <span>Download .docx</span>
    </button>
  );
}

export const FW_CHIPS = [
  { id: 'ALL', label: 'All' },
  { id: 'SOC2', label: 'SOC 2' },
  { id: 'ISO27001', label: 'ISO 27001' },
  { id: 'HIPAA', label: 'HIPAA' },
  { id: 'GDPR', label: 'GDPR' },
];

const BADGE = {
  SOC2: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
  ISO27001: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
  HIPAA: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  GDPR: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
};

export function FrameworkBadges({ frameworks }) {
  return (
    <span className="inline-flex flex-wrap gap-1">
      {frameworks.map(f => (
        <span key={f} className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${BADGE[f] || ''}`}>
          {FW_CHIPS.find(c => c.id === f)?.label || f}
        </span>
      ))}
    </span>
  );
}
