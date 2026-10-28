import { useState } from 'react';
import { FileSignature, Check, Copy } from 'lucide-react';
import { VENDOR_CLAUSE_BASE, VENDOR_CLAUSE_CONDITIONAL } from '../data/grcKnowledgeBase.js';

export default function VendorClauseBuilder() {
  const [sel, setSel] = useState({ soc2: true, iso27001: true, pci: true, hipaa: true, gdpr: true, dpdpa: true });
  const [copied, setCopied] = useState(false);
  const selected = Object.entries(VENDOR_CLAUSE_CONDITIONAL).filter(([id]) => sel[id]).map(([, c]) => `[${c.label}] ${c.clause}`);
  const text = VENDOR_CLAUSE_BASE.map((c) => `${c.title}.\n${c.text}`).join('\n\n') + '\n\n' + selected.join('\n\n');
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 dark:bg-[#1e293b] dark:border-[#334155]">
        <h4 className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-2 dark:text-[#f8fafc]"><FileSignature className="w-4 h-4 text-[#7c3aed]" /> Clause builder: pick the frameworks your vendor must comply with</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(VENDOR_CLAUSE_CONDITIONAL).map(([id, c]) => (
            <button key={id} type="button" onClick={() => setSel((s) => ({ ...s, [id]: !s[id] }))}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${sel[id] ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 dark:bg-[#1e293b] dark:text-[#cbd5e1] dark:border-[#334155]'}`}>
              {c.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={copy} className="mt-4 inline-flex items-center gap-2 bg-[#7c3aed] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#6d28d9] transition">
          {copied ? <><Check className="w-4 h-4" /> Copied to clipboard</> : <><Copy className="w-4 h-4" /> Copy full clause set</>}
        </button>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-h-[480px] overflow-y-auto dark:bg-[#1e293b] dark:border-[#334155]">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-[#cbd5e1] font-sans">{text}</pre>
      </div>
    </div>
  );
}
