import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ControlMappingCard from '../components/ControlMappingCard.jsx';
import SubscribeForm from '../components/newsletter/SubscribeForm.jsx';
import OnThisPage from '../components/OnThisPage.jsx';
import AuditEvidenceChecklist from '../components/AuditEvidenceChecklist.jsx';
import { AuditorRequestList, TabletopExercise } from '../components/AuditInPractice.jsx';
import {
  BookOpenCheck, SearchCheck, FileSignature, Radar,
  CheckCircle, Copy, Check, ScrollText, ShieldAlert, Clock, CalendarDays, FileText, Timer,
  Shield, ShieldCheck, GitBranch, GitPullRequest, Package, Smartphone, HardDrive, Cloud, Globe, Network, Users, Layers, Zap, Cpu, Key,
} from 'lucide-react';
import {
  FRAMEWORK_KB, DISCREPANCY_MATRIX,
  GRC_RESPONSE_PLAYBOOK,
} from '../data/grcKnowledgeBase.js';
import {
  mdmControls, dlpControls, byodControls, byodModels, ecosystemComparison,
  thirdPartyTools, roadmaps, pushbacks, frameworkMapping, sizeProfiles,
  LICENSING_NOTE,
} from '../data/edp.ts';
import EdpTab from '../components/EdpTab.jsx';
import ItAuditToolkit from '../components/ItAuditToolkit.jsx';
import RcsaTab from '../components/RcsaTab.jsx';
import CryptoTabletopScenario from '../components/crypto/CryptoTabletopScenario.jsx';
import DataGovernanceTab from '../components/DataGovernanceTab.jsx';
import StreamlineGrc from '../components/toolkit/StreamlineGrc.jsx';
import FindingClassification from '../components/toolkit/FindingClassification.jsx';
import { CustomerTrustTab, PolicyLifecycleTab, DueDiligenceTab, AwarenessTab, ErpReviewTab } from '../components/toolkit/Phase4Modules.jsx';
import CryptoExchangeTab from '../components/CryptoExchangeTab.jsx';
import SecretsScanningTab from '../components/SecretsScanningTab.jsx';
import AuditObservations from '../components/AuditObservations.jsx';
import CicdPipelineSecurity from '../components/CicdPipelineSecurity.jsx';
import ChangeManagementTab from '../components/ChangeManagementTab.jsx';
import BomTab from '../components/BomTab.jsx';
import ItgcGapsKb from '../components/ItgcGapsKb.jsx';
import EvidenceAutomationKb from '../components/EvidenceAutomationKb.jsx';
import SystemDesignKb from '../components/SystemDesignKb.jsx';
import { OtherFrameworksKb, GrcToolingKb } from '../components/OtherFrameworksKb.jsx';
import ZeroTrustShadowIt from '../components/ZeroTrustShadowIt.jsx';
import InfraNetworkAudit from '../components/InfraNetworkAudit.jsx';

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
  { id: 'policies', label: 'Policies → Controls', icon: BookOpenCheck, group: 'GRC: Start here', area: 'GRC', desc: 'How each policy area maps to frameworks and controls, with readiness timelines.' },
  { id: 'streamline', label: 'Streamlining GRC', icon: Layers, group: 'GRC: Start here', area: 'GRC', desc: 'Step by step: one control set, right-sized scope, one calendar, automated evidence and measures' },
  { id: 'policy-lifecycle', label: 'Policy Lifecycle', icon: BookOpenCheck, group: 'GRC: Start here', area: 'GRC', desc: 'Policy, standard, procedure and guideline: drafting, approval, acknowledgement and review' },
  { id: 'audit', label: 'Audit & Rebuttals', icon: ShieldAlert, group: 'Fieldwork and findings', area: 'Internal audit', desc: 'Common audit observations for the selected framework and how to respond.' },
  { id: 'finding-classification', label: 'Classifying Findings', icon: ShieldAlert, group: 'Fieldwork and findings', area: 'Internal audit', desc: 'Major and minor nonconformity, OFI, observation, SOC 2 exceptions and opinions, SOX deficiencies and internal audit ratings' },
  { id: 'evidence-checklist', label: 'Audit Evidence Checklist', icon: ShieldAlert, group: 'Fieldwork and findings', area: 'Internal audit', also: 'GRC: Start here', desc: 'What auditors ask for under SOC 2, ISO 27001, HIPAA and GDPR, plus a typical readiness plan and roles.' },
  { id: 'gaps', label: 'Common Gaps (ITGC)', icon: ShieldAlert, group: 'Fieldwork and findings', area: 'Internal audit', desc: 'Typical startup gaps by ITGC domain, the pushback, compensating controls and a worked audit example.' },
  { id: 'it-audit', label: 'IT Audit Toolkit', icon: ShieldAlert, group: 'Fieldwork and findings', area: 'Internal audit', desc: 'Sample sizes, ITAC, report (IPE) testing, RCM, SOC report review, full-population analytics, findings and joiner, mover and leaver testing' },
  { id: 'due-diligence', label: 'Pre-IPO and M&A Due Diligence', icon: ShieldAlert, group: 'Fieldwork and findings', area: 'Internal audit', desc: 'Security and privacy due diligence before a listing or an acquisition' },
  { id: 'auditor-requests', label: 'Auditor Request List', icon: ShieldAlert, group: 'Fieldwork and findings', area: 'Internal audit', desc: 'What a SOC 2 Type 2 auditor asks for, how to respond to each request with an example, and the follow-ups to expect.' },
  { id: 'tabletop', label: 'Tabletop Exercise (IR and DR)', icon: ShieldAlert, group: 'GRC: Programme and tooling', area: 'GRC', desc: 'A template for a combined incident response and disaster recovery tabletop, with a worked scenario, model responses and findings.' },
  { id: 'radar', label: 'Discrepancy Radar', icon: Radar, group: 'GRC: Frameworks', area: 'GRC', desc: 'Where frameworks disagree, and how to reconcile them.' },
  { id: 'otherfw', label: 'Other Frameworks', icon: BookOpenCheck, group: 'GRC: Frameworks', area: 'GRC', desc: 'COSO, ISO 27002, ISAE 3402, CRBF 97-02, Solvency II, NIST CSF and HITRUST at a glance.' },
  { id: 'change', label: 'Change Management', icon: GitPullRequest, group: 'IT audit areas', area: 'Internal audit', also: 'GRC: Engineering and change', desc: 'Change control expectations, evidence and common exceptions.' },
  { id: 'cicd', label: 'CI/CD Pipelines', icon: GitBranch, group: 'IT audit areas', area: 'Internal audit', also: 'GRC: Engineering and change', desc: 'Pipeline controls auditors test, from branch protection to deployment approvals.' },
  { id: 'secrets', label: 'Secrets Scanning', icon: Key, group: 'GRC: Engineering and change', area: 'GRC', desc: 'Finding and handling secrets in code and pipelines.' },
  { id: 'bom', label: 'SBOM, AIBOM & ABOM', icon: Package, group: 'GRC: Engineering and change', area: 'GRC', desc: 'Software, AI and agent bills of materials and why they matter.' },
  { id: 'sysdesign', label: 'System Design for GRC', icon: Network, group: 'GRC: Engineering and change', area: 'GRC', desc: '53 system design concepts explained for GRC work, with examples.' },
  { id: 'zerotrust', label: 'Zero Trust and Shadow IT', icon: BookOpenCheck, group: 'GRC: Security architecture', area: 'GRC', desc: 'Zero trust principles and shadow IT, with practical examples.' },
  { id: 'infranet', label: 'Infra & Network Audit', icon: Network, group: 'IT audit areas', area: 'Internal audit', desc: 'Infrastructure and network audit areas and evidence.' },
  { id: 'erp', label: 'ERP Security Review', icon: ShieldAlert, group: 'IT audit areas', area: 'Internal audit', desc: 'Privileged accounts, critical transactions, SoD, change transports and logging in ERP systems' },
  { id: 'edp', label: 'Endpoint & Data Protection', icon: Smartphone, group: 'GRC: Security architecture', area: 'GRC', desc: 'MDM, DLP, BYOD, ecosystems, mapping, roadmap, evidence and checklists.' },
  { id: 'data-governance', label: 'Data Governance', icon: Shield, group: 'GRC: Security architecture', area: 'GRC', desc: 'Data discovery, classification, labelling, data flow mapping and records of processing' },
  { id: 'crypto', label: 'Crypto Exchanges (VDA)', icon: Key, group: 'GRC: Security architecture', area: 'GRC', desc: 'Security and compliance for crypto exchanges: CERT-In, FIU-IND, DPDP, CCSS, and two CoinDCX incidents as worked examples' },
  { id: 'evidence', label: 'Evidence Automation', icon: Package, group: 'GRC: Programme and tooling', area: 'GRC', desc: 'Automating evidence collection and keeping it audit-ready.' },
  { id: 'tooling', label: 'GRC Tooling', icon: Package, group: 'GRC: Programme and tooling', area: 'GRC', desc: 'GRC tools by category, what evidence they produce and what to watch for.' },
  { id: 'rcsa', label: 'Risk and Control Self-Assessment', icon: ShieldAlert, group: 'GRC: Programme and tooling', area: 'GRC', desc: 'Running RCSA workshops, scoring control effectiveness and feeding results into the risk register' },
  { id: 'customer-trust', label: 'Customer Trust and Questionnaires', icon: ShieldCheck, group: 'GRC: Programme and tooling', area: 'GRC', desc: 'Answering security questionnaires from an approved answer bank' },
  { id: 'awareness', label: 'Awareness and Physical Checks', icon: Users, group: 'GRC: Programme and tooling', area: 'GRC', desc: 'Awareness plan, induction, role-based training, phishing simulations and physical spot checks' },
];
// Two areas: internal audit work first, then GRC programme work. A topic can also be listed under a second group (also).
const AREAS = ['Internal audit', 'GRC'];
const TAB_GROUPS = [...new Set(TABS.map((t) => t.group))];
const AREA_GROUPS = AREAS.map((a) => [a, TAB_GROUPS.filter((g) => TABS.some((t) => t.group === g && t.area === a))]);
const inGroup = (t, g) => t.group === g || t.also === g;
const groupLabel = (g) => g.replace(/^GRC: /, '');
const FW_TABS = ['policies', 'audit'];


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
  const [navFilter, setNavFilter] = useState('');
  const kbContentRef = useRef(null);
  const activeTab = TABS.find((t) => t.id === tab) || TABS[0];
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
    } else if (t === 'ai-vendor-assurance' || t === 'vendor-clauses') {
      // Vendor topics now live in one place: Home, Vendor Risk Management.
      window.location.replace(t === 'ai-vendor-assurance' ? '/?section=ai-vendors#vendor-risk' : '/?section=contract-clauses#vendor-risk');
      return;
    } else if (t === 'zero-trust' || t === 'shadow-it') {
      setTab('zerotrust');
    } else if (t === 'infra-network' || t === 'network-security') {
      setTab('infranet');
    } else if (t === 'other-frameworks') {
      setTab('otherfw');
    } else if (t === 'grc-tooling') {
      setTab('tooling');
    } else if (t === 'system-design') {
      setTab('sysdesign');
    } else if (t === 'evidence-automation') {
      setTab('evidence');
    } else if (t === 'evidence-checklist' || t === 'audit-readiness') {
      setTab('evidence-checklist');
    } else if (t === 'auditor-requests' || t === 'drl') {
      setTab('auditor-requests');
    } else if (t === 'tabletop' || t === 'ttx') {
      setTab('tabletop');
    } else if (t === 'iso-tracker') {
      // Moved to the ISO 27001 page; keep old links working.
      window.location.replace('/iso/27001/li#iso-tracker');
      return;
    } else if (t === 'itgc-gaps') {
      setTab('gaps');
    } else if (t === 'audit-observations') {
      setTab('audit');
    } else if (t === 'assistant') {
      // Old links: the assistant now lives only in the site-wide chatbot.
      setTab('policies');
    } else if (t && TABS.some((x) => x.id === t)) {
      // Any topic id works as ?topic=<id>.
      setTab(t);
    } else if (p && FRAMEWORK_KB[p]) {
      setFw(p);
    }
  }, [location.search]);


  const tabContent = {
    policies: (
      <div className="space-y-3">
        {/* Unified map teaser when 'all' context */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 dark:bg-indigo-900/30 dark:border-indigo-800">
          <h4 className="flex items-center gap-2 font-bold text-indigo-900 text-sm dark:text-indigo-300">
            <SearchCheck className="w-4 h-4" /> How this policy area maps across frameworks
          </h4>
          <ControlMappingCard />
        </div>
        {fwObj.timeline && (
          <div className="bg-white border border-gray-200 rounded-2xl p-4 dark:bg-[#1e293b] dark:border-[#334155]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="flex items-center gap-2 font-bold text-gray-900 text-sm dark:text-[#f8fafc]"><CalendarDays className="w-4 h-4 text-indigo-600" /> Readiness timeline - from preparation to re-issuance</h4>
              <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-2.5 py-0.5 dark:bg-[#1f2e40]/40 dark:border-[#4338ca] dark:text-[#c6d2e2]">{fwObj.timeline.kind}</span>
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
                    {ph.bullets ? (
                      <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-[11px] text-gray-500 leading-snug dark:text-[#cbd5e1]">{ph.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                    ) : (
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-snug dark:text-[#cbd5e1]">{ph.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {fwObj.timeline.example && (
              <div className="mt-4">
                <p className="font-bold text-gray-800 text-xs dark:text-[#f8fafc]">{fwObj.timeline.example.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5 dark:text-[#cbd5e1]">{fwObj.timeline.example.note}</p>
                <div className="overflow-x-auto mt-2">
                  <table className="w-full min-w-[30rem] text-[11px] text-gray-600 dark:text-[#cbd5e1]">
                    <thead><tr className="text-left text-gray-800 dark:text-[#f8fafc]"><th scope="col" className="p-1.5">When</th><th scope="col" className="p-1.5">Phase</th><th scope="col" className="p-1.5">What happens</th></tr></thead>
                    <tbody>{fwObj.timeline.example.rows.map(r => <tr key={r[0]} className="border-t border-slate-200 dark:border-[#334155]">{r.map(c => <td key={c} className="p-1.5 align-top">{c}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              </div>
            )}
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
                          <span className="badge badge-primary text-[11px] font-medium px-2 py-0.5">
                            <CalendarDays className="w-3 h-3" /> Frequency: {c.freq}
                          </span>
                        )}
                        {c.policy && (
                          <span className="badge badge-neutral text-[11px] font-medium px-2 py-0.5">
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
            {p.note && <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 dark:bg-[#451a03]/40 dark:border-[#78350f] dark:text-[#fcd34d]">{p.note}</p>}
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
                        <div className="mt-3 border-l-2 border-gray-300 dark:border-slate-600 pl-3">
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
    radar: (
      <div className="space-y-3">
        {DISCREPANCY_MATRIX.map(row => (
          <div key={row.topic} className="bg-white border border-gray-200 rounded-2xl p-4 dark:bg-[#1e293b] dark:border-[#334155]">
            <h4 className="font-bold text-gray-900 text-sm dark:text-[#f8fafc]">{row.topic}</h4>
            <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mt-2 dark:bg-[#450a0a]/40 dark:border-[#7f1d1d] dark:text-[#fca5a5]">{row.conflict}</p>
            <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 mt-2 dark:bg-[#022c22]/40 dark:border-[#065f46] dark:text-[#6ee7b7]">Reconcile: {row.reconcile}</p>
          </div>
        ))}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-sm text-indigo-900 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-200">
          Golden rule: implement the strictest overlapping control, then document the marginal differences in a retention schedule / risk-treatment register - auditors accept documented reconciliation far more often than they admit.
        </div>
      </div>
    ),
    edp: <EdpTab />,
    crypto: <CryptoExchangeTab />,
    secrets: <SecretsScanningTab />,
    change: <ChangeManagementTab onOpenTab={setTab} />,
    cicd: <CicdPipelineSecurity onOpenTab={setTab} />,
    bom: <BomTab onOpenTab={setTab} />,
    evidence: <EvidenceAutomationKb />,
    sysdesign: <SystemDesignKb />,
    otherfw: <OtherFrameworksKb />,
    'evidence-checklist': <AuditEvidenceChecklist />,
    'auditor-requests': <AuditorRequestList />,
    tabletop: <><TabletopExercise /><CryptoTabletopScenario /></>,
    'it-audit': <ItAuditToolkit />,
    rcsa: <RcsaTab />,
    'data-governance': <DataGovernanceTab />,
    'policy-lifecycle': <PolicyLifecycleTab />,
    streamline: <StreamlineGrc />,
    'finding-classification': <FindingClassification />,
    'due-diligence': <DueDiligenceTab />,
    erp: <ErpReviewTab />,
    'customer-trust': <CustomerTrustTab />,
    awareness: <AwarenessTab />,
    zerotrust: <ZeroTrustShadowIt />,
    infranet: <InfraNetworkAudit />,
    tooling: <GrcToolingKb />,
    gaps: <ItgcGapsKb initialFramework={new URLSearchParams(location.search).get('gapfw') || 'all'} />,
  };

  return (
    <div className="container px-4 pt-10 pb-28">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">GRC Knowledge Base</h1>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Map policies to frameworks to controls, see common audit observations and how to push back, generate vendor
          contract clauses, reconcile cross-framework conflicts. Questions go to the chatbot at the bottom right.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        {/* Topic navigation: grouped sidebar on large screens, grouped menu on small screens */}
        <nav aria-label="Knowledge Base topics" className="mb-5 lg:mb-0">
          <label className="lg:hidden block text-xs font-semibold text-gray-600 dark:text-slate-300">Topic
            <select value={tab} onChange={(e) => setTab(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded text-sm bg-white dark:bg-slate-900">
              {AREA_GROUPS.flatMap(([a, gs]) => gs.map((g) => <optgroup key={g} label={`${a}: ${groupLabel(g)}`}>{TABS.filter((t) => t.group === g).map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</optgroup>))}
            </select>
          </label>
          <div className="hidden lg:block sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
            <input type="search" value={navFilter} onChange={(e) => setNavFilter(e.target.value)} placeholder="Filter topics" aria-label="Filter topics"
              className="w-full mb-3 px-3 py-1.5 border border-gray-300 dark:border-slate-700 rounded text-sm bg-white dark:bg-slate-900" />
            {AREA_GROUPS.map(([area, gs]) => (
            <div key={area} className="mb-5">
            <p className="px-2 mb-2 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-700 pb-1">{area}</p>
            {gs.map((g) => {
              const items = TABS.filter((t) => inGroup(t, g) && (!navFilter || `${t.label} ${t.desc}`.toLowerCase().includes(navFilter.toLowerCase())));
              if (!items.length) return null;
              return (
                <div key={g} className="mb-4">
                  <p className="px-2 mb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">{groupLabel(g)}</p>
                  <ul>
                    {items.map((t) => (
                      <li key={t.id}>
                        <button type="button" onClick={() => setTab(t.id)} aria-current={tab === t.id ? 'page' : undefined}
                          className={`btn btn-ghost w-full !justify-start text-left px-2 py-1.5 rounded text-sm ${tab === t.id ? 'is-selected' : '!font-normal'}`}>
                          {t.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            </div>
            ))}
          </div>
        </nav>

        <div className="min-w-0">
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">{activeTab.area}: {groupLabel(activeTab.group)}</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{activeTab.label}</h2>
            <p className="text-sm text-gray-600 dark:text-slate-300 mt-1 max-w-3xl">{activeTab.desc}</p>
          </div>

          {FW_TABS.includes(tab) && (
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-600 dark:text-slate-300 mb-2">Framework</p>
      <div className="flex flex-wrap gap-2">
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
                aria-pressed={fw === id}
                className="btn btn-secondary px-3 py-1.5 rounded-full text-sm">
                {k.name}
              </button>
            );
          })}
      </div>

            </div>
          )}

      {/* Framework description context under Audit/Assistant */}
      {tab === 'audit' && fwObj && (
        <div className="mb-4 text-xs text-gray-500">
          Viewing <span className="font-semibold" style={{ color: fwObj.color }}>{fwObj.name}</span> - {fwObj.desc}
        </div>
      )}

          <OnThisPage containerRef={kbContentRef} watch={tab} />
          <div ref={kbContentRef}>{tabContent[tab] ?? tabContent[TABS[0].id]}</div>
          <div className="mt-8 border border-gray-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-[#1e293b]">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Get the OneLens newsletter</p>
            <SubscribeForm source="knowledge" />
          </div>
        </div>
      </div>
    </div>
  );
}