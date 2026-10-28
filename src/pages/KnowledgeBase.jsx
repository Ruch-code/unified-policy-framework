import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BookOpenCheck, SearchCheck, FileSignature, Radar, MessageSquareText,
  CheckCircle, Copy, Check, ScrollText, ShieldAlert, Clock, CalendarDays, FileText, Timer,
  Shield, ShieldCheck, GitBranch, GitPullRequest, Package, Smartphone, HardDrive, Cloud, Globe, Network, Users, Layers, Zap, Cpu, Key,
} from 'lucide-react';
import {
  FRAMEWORK_KB, UNIFIED_POLICY_MAP, DISCREPANCY_MATRIX,
  VENDOR_CLAUSE_BASE, VENDOR_CLAUSE_CONDITIONAL, GRC_RESPONSE_PLAYBOOK,
} from '../data/grcKnowledgeBase.js';
import {
  mdmControls, dlpControls, byodControls, byodModels, ecosystemComparison,
  thirdPartyTools, roadmaps, pushbacks, frameworkMapping, sizeProfiles,
  LICENSING_NOTE,
} from '../data/edp.ts';
import GrcAssistant from '../components/GrcAssistant.jsx';
import EdpTab from '../components/EdpTab.jsx';
import SecretsScanningTab from '../components/SecretsScanningTab.jsx';
import AiVendorAssuranceTab from '../components/AiVendorAssuranceTab.jsx';
import AuditObservations from '../components/AuditObservations.jsx';
import CicdPipelineSecurity from '../components/CicdPipelineSecurity.jsx';
import ChangeManagementTab from '../components/ChangeManagementTab.jsx';
import BomTab from '../components/BomTab.jsx';

const order = ['soc2', 'iso27001', 'iso42001', 'pci', 'hipaa', 'nist', 'gdpr', 'cis', 'hitrust', 'dpdpa', 'fedramp', 'cjis'];
const EDP_TABS = [
  { id: 'overview', label: 'Overview', icon: BookOpenCheck },
  { id: 'sizes', label: 'Size Profiles', icon: Layers },
  { id: 'mdm', label: 'MDM', icon: Smartphone },
  { id: 'dlp', label: 'DLP', icon: HardDrive },
  { id: 'byod', label: 'BYOD', icon: Users },
  { id: 'ecosystems', label: 'Google vs Microsoft', icon: Globe },
  { id: 'mixed', label: 'Mixed & Third-Party', icon: Network },
  { id: 'mapping', label: 'Framework Mapping', icon: Shield },
  { id: 'roadmap', label: 'Roadmap', icon: CalendarDays },
  { id: 'evidence', label: 'Audit Evidence', icon: FileText },
  { id: 'pushback', label: 'Pushback', icon: ShieldAlert },
  { id: 'checklist', label: 'Checklist & Downloads', icon: Timer },
];
const TABS = [
  { id: 'policies', label: 'Policies → Controls', icon: BookOpenCheck },
  { id: 'audit', label: 'Audit & Rebuttals', icon: ShieldAlert },
  { id: 'contracts', label: 'Vendor Clause Builder', icon: FileSignature },
  { id: 'radar', label: 'Discrepancy Radar', icon: Radar },
  { id: 'assistant', label: 'GRC Assistant', icon: MessageSquareText },
  { id: 'edp', label: 'Endpoint & Data Protection', icon: Smartphone },
  { id: 'secrets', label: 'Secrets Scanning', icon: Key },
  { id: 'change', label: 'Change Management', icon: GitPullRequest },
  { id: 'cicd', label: 'CI/CD Pipelines', icon: GitBranch },
  { id: 'bom', label: 'SBOM, AIBOM & ABOM', icon: Package },
  { id: 'ai-assurance', label: 'AI Vendor Assurance', icon: ShieldCheck },
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
  const [edpTab, setEdpTab] = useState('overview');
  const { copied, copy } = useCopy();

  // Check if we're viewing the EDP topic
  const isEdpTopic = fw === 'endpoint-data-protection';
  const fwObj = isEdpTopic ? null : FRAMEWORK_KB[fw];

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('fw');
    const t = params.get('topic');
    if (t === 'endpoint-data-protection') {
      setTab('edp');
    } else if (t === 'change-management') {
      setTab('change');
    } else if (t === 'sbom' || t === 'aibom' || t === 'abom') {
      setTab('bom');
    } else if (t === 'cicd') {
      setTab('cicd');
    } else if (t === 'secrets-scanning') {
      setTab('secrets');
    } else if (t === 'ai-vendor-assurance') {
      setTab('ai-assurance');
    } else if (t === 'audit-observations') {
      setTab('audit');
    } else if (p && FRAMEWORK_KB[p]) {
      setFw(p);
    }
  }, [location.search]);

  const selectedClauses = Object.entries(VENDOR_CLAUSE_CONDITIONAL)
    .filter(([id]) => sel[id])
    .map(([, c]) => `[${c.label}] ${c.clause}`);
  const contractText = VENDOR_CLAUSE_BASE.map(c => `${c.title}.\n${c.text}`).join('\n\n')
    + '\n\n' + selectedClauses.join('\n\n');

  const tabContent = {
    policies: (
      <div className="space-y-3">
        {/* Unified map teaser when 'all' context */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 dark:bg-indigo-900/30 dark:border-indigo-800">
          <h4 className="flex items-center gap-2 font-bold text-indigo-900 text-sm dark:text-indigo-300">
            <SearchCheck className="w-4 h-4" /> How this policy area maps across frameworks
          </h4>
          <div className="mt-3 space-y-4">
            {UNIFIED_POLICY_MAP.map(a => (
              <div key={a.area} className="space-y-1">
                <span className="block font-bold text-blue-600 dark:text-blue-400">{a.area}</span>
                <span className="block text-sm text-gray-600 dark:text-slate-400">
                  {Object.entries(a.map).map(([k, v]) => `${k} (${v})`).join(' · ')}
                </span>
              </div>
            ))}
          </div>
        </div>
        {fwObj.timeline && (
          <div className="bg-white border border-gray-200 rounded-2xl p-4 dark:bg-[#1e293b] dark:border-[#334155]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="flex items-center gap-2 font-bold text-gray-900 text-sm dark:text-[#f8fafc]"><CalendarDays className="w-4 h-4 text-indigo-600" /> Readiness timeline - from preparation to re-issuance</h4>
              <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-2.5 py-0.5 dark:bg-[#312e81]/40 dark:border-[#4338ca] dark:text-[#c7d2fe]">{fwObj.timeline.kind}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1.5 dark:text-[#cbd5e1]">Total readiness: <span className="font-semibold text-gray-800 dark:text-[#f8fafc]">{fwObj.timeline.total}</span></p>
            <div className="mt-3 grid md:grid-cols-2 gap-2">
              {fwObj.timeline.phases.map((ph, i) => (
                <div key={ph.name} className="flex gap-2.5 border border-slate-200 rounded-xl p-2.5 bg-slate-50/60 dark:bg-[#1e293b] dark:border-[#334155]">
                  <div className="flex flex-col items-center justify-start min-w-[7rem] shrink-0 pt-0.5">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-[#94a3b8]">Phase {i + 1}</span>
                    <span className="text-xs font-bold text-indigo-700 mt-0.5 text-center leading-tight dark:text-[#a5b4fc]">{ph.weeks}</span>
                  </div>
                  <div className="border-l border-slate-200 pl-2.5 dark:border-[#334155]">
                    <p className="font-bold text-gray-800 text-xs dark:text-[#f8fafc]">{ph.name}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-snug dark:text-[#cbd5e1]">{ph.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <h4 className="font-bold text-gray-800 text-sm mt-2">{fwObj.name} - policies & controls</h4>
        {fwObj.policies.map(p => (
          <div key={p.area} className="bg-white border border-gray-200 rounded-2xl p-4 dark:bg-[#1e293b] dark:border-[#334155]">
            <h5 className="font-bold text-gray-900 text-sm dark:text-[#f8fafc]">{p.area}</h5>
            <ul className="mt-1.5 space-y-2">
              {p.controls.map(c => {
                const isObj = typeof c === 'object';
                return (
                  <li key={isObj ? c.text : c} className="text-sm text-gray-600 dark:text-[#cbd5e1]">
                    <div className="flex gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{isObj ? c.text : c}</span>
                    </div>
                    {isObj && (c.freq || c.policy || c.sla) && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5 ml-5">
                        {c.freq && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5 dark:text-indigo-300 dark:bg-indigo-900/40 dark:border-indigo-800">
                            <CalendarDays className="w-3 h-3" /> Frequency: {c.freq}
                          </span>
                        )}
                        {c.policy && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700">
                            <FileText className="w-3 h-3" /> Policy: {c.policy}
                          </span>
                        )}
                        {c.sla && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5 dark:text-emerald-300 dark:bg-emerald-900/40 dark:border-emerald-800">
                            <Timer className="w-3 h-3" /> SLA / TAT: {c.sla}
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            {p.note && <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 dark:bg-[#451a03]/40 dark:border-[#78350f] dark:text-[#fcd34d]">💡 {p.note}</p>}
          </div>
        ))}
      </div>
    ),
    audit: (
      <div className="space-y-4">
        <AuditObservations />
        <h4 className="font-bold text-gray-800 text-sm">Audit battle cards - observation → why it's raised → your rebuttal</h4>
        {fwObj.policyTimeline && (
<div className="bg-white border border-gray-200 rounded-2xl p-4 dark:bg-[#1e293b] dark:border-[#334155]">
            <h5 className="flex items-center gap-2 font-bold text-gray-900 text-sm"><Clock className="w-4 h-4 text-indigo-600" /> Policy change timeline - when policies move, and how to evidence them</h5>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><span className="font-semibold text-indigo-700 shrink-0">During drafting:</span><span>{fwObj.policyTimeline.drafting}</span></li>
              <li className="flex gap-2"><span className="font-semibold text-amber-700 dark:text-amber-300 shrink-0">Before audit:</span><span>{fwObj.policyTimeline.beforeAudit}</span></li>
              <li className="flex gap-2"><span className="font-semibold text-emerald-700 dark:text-emerald-300 shrink-0">After audit findings:</span><span>{fwObj.policyTimeline.afterFindings}</span></li>
            </ul>
          </div>
        )}
        {fwObj.observations.map((o, i) => {
          const reb = fwObj.rebuttals[i];
          return (
            <div key={o.finding} className="bg-white border border-gray-200 rounded-2xl overflow-hidden dark:bg-[#1e293b] dark:border-[#334155]">
              <div className="p-4 border-b border-red-100 bg-red-50/50 dark:bg-red-900/20 dark:border-red-800">
                <div className="flex items-start gap-2">
                  <ScrollText className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm dark:text-white">{o.finding}</h5>
                    <p className="text-xs text-gray-600 mt-1 dark:text-slate-200">{o.why}</p>
                  </div>
                </div>
              </div>
              {reb && (
                <div className="p-4 bg-emerald-50/40 dark:bg-emerald-900/20">
                  <div className="flex items-start gap-2">
                    <SearchCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-300 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-800 text-xs uppercase tracking-wide dark:text-emerald-300">GRC pushback</p>
                      <p className="text-sm text-gray-700 mt-1 dark:text-slate-200">{reb.pushback}</p>
                      <p className="text-xs text-gray-500 mt-1.5 dark:text-slate-400"><span className="font-semibold">Evidence to prepare:</span> {reb.evidence}</p>
                      {reb.replyToAuditor && (
                        <div className="mt-3 border-l-2 border-emerald-500 pl-3">
                          <p className="font-bold text-emerald-800 text-xs uppercase tracking-wide dark:text-emerald-300">Your reply to the auditor</p>
                          <p className="text-sm text-gray-600 mt-1 italic dark:text-slate-300">“{reb.replyToAuditor}”</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <h4 className="font-bold text-gray-800 text-sm mt-2 dark:text-[#f8fafc]">General response technique (any framework)</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {GRC_RESPONSE_PLAYBOOK.map(c => (
            <div key={c.title} className="bg-white border border-gray-200 rounded-2xl p-4 dark:bg-[#1e293b] dark:border-[#334155]">
              <h5 className="font-bold text-gray-900 text-sm dark:text-[#f8fafc]">{c.title}</h5>
              <p className="text-sm text-gray-600 dark:text-[#cbd5e1] mt-1">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    contracts: (
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <h4 className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-2 dark:text-[#f8fafc]"><FileSignature className="w-4 h-4 text-[#7c3aed]" /> Pick frameworks your vendor must comply with</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(VENDOR_CLAUSE_CONDITIONAL).map(([id, c]) => (
              <button key={id} onClick={() => setSel(s => ({ ...s, [id]: !s[id] }))}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${sel[id] ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 dark:bg-[#1e293b] dark:text-[#cbd5e1] dark:border-[#334155] dark:hover:border-[#475569]'}`}>
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={() => copy(contractText, 'full')}
            className="mt-4 inline-flex items-center gap-2 bg-[#7c3aed] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#6d28d9] transition">
            {copied === 'full' ? <><Check className="w-4 h-4" /> Copied to clipboard</> : <><Copy className="w-4 h-4" /> Copy full clause set</>}
          </button>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-h-[480px] overflow-y-auto dark:bg-[#1e293b] dark:border-[#334155]">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-[#cbd5e1] font-sans">{contractText}</pre>
        </div>
      </div>
    ),
    radar: (
      <div className="space-y-3">
        {DISCREPANCY_MATRIX.map(row => (
          <div key={row.topic} className="bg-white border border-gray-200 rounded-2xl p-4 dark:bg-[#1e293b] dark:border-[#334155]">
            <h4 className="font-bold text-gray-900 text-sm dark:text-[#f8fafc]">{row.topic}</h4>
            <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mt-2 dark:bg-[#450a0a]/40 dark:border-[#7f1d1d] dark:text-[#fca5a5]">⚡ {row.conflict}</p>
            <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 mt-2 dark:bg-[#022c22]/40 dark:border-[#065f46] dark:text-[#6ee7b7]">✓ Reconcile: {row.reconcile}</p>
          </div>
        ))}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-sm text-indigo-900 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-200">
          Golden rule: implement the strictest overlapping control, then document the marginal differences in a retention schedule / risk-treatment register - auditors accept documented reconciliation far more often than they admit.
        </div>
      </div>
    ),
    assistant: (
      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <GrcAssistant />
      </div>
    ),
    edp: <EdpTab />,
    secrets: <SecretsScanningTab />,
    change: <ChangeManagementTab onOpenTab={setTab} />,
    cicd: <CicdPipelineSecurity onOpenTab={setTab} />,
    bom: <BomTab onOpenTab={setTab} />,
    'ai-assurance': <AiVendorAssuranceTab />,
  };

  return (
    <div className="container px-4 pt-10 pb-28">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">GRC Knowledge Base</h1>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Map policies to frameworks to controls, see common audit observations and how to push back, generate vendor
          contract clauses, reconcile cross-framework conflicts - and ask the assistant any question.
        </p>
      </div>

      {/* Framework selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {order
          .filter(id => FRAMEWORK_KB[id])
          .map(id => {
            const k = FRAMEWORK_KB[id];
            if (!k) {
              if (process.env.NODE_ENV === 'development') {
                console.warn(`Framework ID "${id}" not found in FRAMEWORK_KB`);
              }
              return null;
            }
            return (
              <button key={id} onClick={() => setFw(id)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition ${fw === id ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 dark:bg-[#1e293b] dark:text-[#cbd5e1] dark:border-[#334155] dark:hover:border-[#475569]'}`}
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
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition ${tab === t.id ? 'bg-[#1e293b] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 dark:bg-[#1e293b] dark:text-[#cbd5e1] dark:border-[#334155] dark:hover:border-[#475569]'}`}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {/* Framework description context under Audit/Assistant */}
      {(tab === 'audit' || tab === 'assistant') && fwObj && (
        <div className="mb-4 text-xs text-gray-500">
          Viewing <span className="font-semibold" style={{ color: fwObj.color }}>{fwObj.name}</span> - {fwObj.desc}
        </div>
      )}

      {tabContent[tab]}
    </div>
  );
}