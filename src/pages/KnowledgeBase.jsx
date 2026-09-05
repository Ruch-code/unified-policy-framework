import { useState } from 'react';
import {
  BookOpenCheck, SearchCheck, FileSignature, Radar, MessageSquareText,
  CheckCircle, Copy, Check, ScrollText, ShieldAlert,
} from 'lucide-react';
import {
  FRAMEWORK_KB, UNIFIED_POLICY_MAP, DISCREPANCY_MATRIX,
  VENDOR_CLAUSE_BASE, VENDOR_CLAUSE_CONDITIONAL, GRC_RESPONSE_PLAYBOOK,
} from '../data/grcKnowledgeBase';
import GrcAssistant from '../components/GrcAssistant';

const order = ['soc2', 'iso27001', 'pci', 'hipaa', 'nist', 'gdpr', 'cis', 'hitrust', 'dpdpa', 'fedramp', 'cjis'];
const TABS = [
  { id: 'policies', label: 'Policies → Controls', icon: BookOpenCheck },
  { id: 'audit', label: 'Audit & Rebuttals', icon: ShieldAlert },
  { id: 'contracts', label: 'Vendor Clause Builder', icon: FileSignature },
  { id: 'radar', label: 'Discrepancy Radar', icon: Radar },
  { id: 'assistant', label: 'GRC Assistant', icon: MessageSquareText },
];

function useCopy() {
  const [copied, setCopied] = useState(null);
  const copy = async (text, key) => {
    try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1200);
  };
  return { copied, copy };
}

export default function KnowledgeBase() {
  const [fw, setFw] = useState('soc2');
  const [tab, setTab] = useState('policies');
  const [sel, setSel] = useState({ soc2: true, iso27001: true, pci: true, hipaa: true, gdpr: true, dpdpa: true });
  const { copied, copy } = useCopy();
  const fwObj = FRAMEWORK_KB[fw];

  const selectedClauses = Object.entries(VENDOR_CLAUSE_CONDITIONAL)
    .filter(([id]) => sel[id])
    .map(([, c]) => `[${c.label}] ${c.clause}`);
  const contractText = VENDOR_CLAUSE_BASE.map(c => `${c.title}.\n${c.text}`).join('\n\n')
    + '\n\n' + selectedClauses.join('\n\n');

  const tabContent = {
    policies: (
      <div className="space-y-3">
        {/* Unified map teaser when 'all' context */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
          <h4 className="flex items-center gap-2 font-bold text-indigo-900 text-sm">
            <SearchCheck className="w-4 h-4" /> How this policy area maps across frameworks
          </h4>
          <div className="mt-2 space-y-1.5">
            {UNIFIED_POLICY_MAP.map(a => (
              <div key={a.area} className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">{a.area}:</span>{' '}
                {Object.entries(a.map).map(([k, v]) => `${k} (${v})`).join(' · ')}
              </div>
            ))}
          </div>
        </div>
        <h4 className="font-bold text-gray-800 text-sm mt-2">{fwObj.name} — policies & controls</h4>
        {fwObj.policies.map(p => (
          <div key={p.area} className="bg-white border border-gray-200 rounded-2xl p-4">
            <h5 className="font-bold text-gray-900 text-sm">{p.area}</h5>
            <ul className="mt-1.5 space-y-1">
              {p.controls.map(c => <li key={c} className="text-sm text-gray-600 flex gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />{c}</li>)}
            </ul>
            {p.note && <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">💡 {p.note}</p>}
          </div>
        ))}
      </div>
    ),
    audit: (
      <div className="space-y-4">
        <h4 className="font-bold text-gray-800 text-sm">Audit battle cards — observation → why it's raised → your rebuttal</h4>
        {fwObj.observations.map((o, i) => {
          const reb = fwObj.rebuttals[i];
          return (
            <div key={o.finding} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-red-100 bg-red-50/50">
                <div className="flex items-start gap-2">
                  <ScrollText className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">{o.finding}</h5>
                    <p className="text-xs text-gray-600 mt-1">{o.why}</p>
                  </div>
                </div>
              </div>
              {reb && (
                <div className="p-4 bg-emerald-50/40">
                  <div className="flex items-start gap-2">
                    <SearchCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-800 text-xs uppercase tracking-wide">GRC pushback</p>
                      <p className="text-sm text-gray-700 mt-1">{reb.pushback}</p>
                      <p className="text-xs text-gray-500 mt-1.5"><span className="font-semibold">Evidence to prepare:</span> {reb.evidence}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <h4 className="font-bold text-gray-800 text-sm mt-2">General response technique (any framework)</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {GRC_RESPONSE_PLAYBOOK.map(c => (
            <div key={c.title} className="bg-white border border-gray-200 rounded-2xl p-4">
              <h5 className="font-bold text-gray-900 text-sm">{c.title}</h5>
              <p className="text-sm text-gray-600 mt-1">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    contracts: (
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <h4 className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-2"><FileSignature className="w-4 h-4 text-[#7c3aed]" /> Pick frameworks your vendor must comply with</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(VENDOR_CLAUSE_CONDITIONAL).map(([id, c]) => (
              <button key={id} onClick={() => setSel(s => ({ ...s, [id]: !s[id] }))}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${sel[id] ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={() => copy(contractText, 'full')}
            className="mt-4 inline-flex items-center gap-2 bg-[#7c3aed] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#6d28d9] transition">
            {copied === 'full' ? <><Check className="w-4 h-4" /> Copied to clipboard</> : <><Copy className="w-4 h-4" /> Copy full clause set</>}
          </button>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-h-[480px] overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{contractText}</pre>
        </div>
      </div>
    ),
    radar: (
      <div className="space-y-3">
        {DISCREPANCY_MATRIX.map(row => (
          <div key={row.topic} className="bg-white border border-gray-200 rounded-2xl p-4">
            <h4 className="font-bold text-gray-900 text-sm">{row.topic}</h4>
            <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mt-2">⚡ {row.conflict}</p>
            <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 mt-2">✓ Reconcile: {row.reconcile}</p>
          </div>
        ))}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-sm text-indigo-900">
          Golden rule: implement the strictest overlapping control, then document the marginal differences in a retention schedule / risk-treatment register — auditors accept documented reconciliation far more often than they admit.
        </div>
      </div>
    ),
    assistant: (
      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <GrcAssistant />
      </div>
    ),
  };

  return (
    <div className="container px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">GRC Knowledge Base</h1>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Map policies to frameworks to controls, see common audit observations and how to push back, generate vendor
          contract clauses, reconcile cross-framework conflicts — and ask the assistant any question.
        </p>
      </div>

      {/* Framework selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {order.map(id => {
          const k = FRAMEWORK_KB[id];
          return (
            <button key={id} onClick={() => setFw(id)}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition ${fw === id ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
              style={fw === id ? { background: k.color } : undefined}>
              {k.name}
            </button>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition ${tab === t.id ? 'bg-[#1e293b] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {/* Framework description context under Audit/Assistant */}
      {(tab === 'audit' || tab === 'assistant') && (
        <div className="mb-4 text-xs text-gray-500">
          Viewing <span className="font-semibold" style={{ color: fwObj.color }}>{fwObj.name}</span> — {fwObj.desc}
        </div>
      )}

      {tabContent[tab]}
    </div>
  );
}