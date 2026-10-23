import { useState, useEffect } from 'react';
import {
  BookOpenCheck, SearchCheck, FileSignature, Radar, MessageSquareText,
  CheckCircle, Copy, Check, ScrollText, ShieldAlert, Clock, CalendarDays, FileText, Timer,
  Shield, Smartphone, HardDrive, Cloud, Globe, Network, Users, Layers, Zap, Cpu,
} from 'lucide-react';
import {
  FRAMEWORK_KB, UNIFIED_POLICY_MAP, DISCREPANCY_MATRIX,
  VENDOR_CLAUSE_BASE, VENDOR_CLAUSE_CONDITIONAL, GRC_RESPONSE_PLAYBOOK,
} from '../data/grcKnowledgeBase.js';
import EdpTab from '../components/EdpTab.jsx';
import {
  mdmControls, dlpControls, byodControls, byodModels, ecosystemComparison,
  thirdPartyTools, roadmaps, pushbacks, frameworkMapping, sizeProfiles,
  LICENSING_NOTE,
} from '../data/edp.ts';
import GrcAssistant from '../components/GrcAssistant.jsx';

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

function getTabContent(fwObj) {
  if (!fwObj) {
    return {
      policies: <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155] text-center py-12"><ShieldAlert className="w-12 h-12 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select a Framework</h3><p className="text-gray-600 dark:text-gray-400">Select a framework from the tabs above to view its policies and controls.</p></div>,
      audit: <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155] text-center py-12"><ShieldAlert className="w-12 h-12 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select a Framework</h3><p className="text-gray-600 dark:text-gray-400">Select a framework to view audit battle cards.</p></div>,
      contracts: <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155] text-center py-12"><FileSignature className="w-12 h-12 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select a Framework</h3><p className="text-gray-600 dark:text-gray-400">Select a framework to view vendor clauses.</p></div>,
      radar: <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155] text-center py-12"><Radar className="w-12 h-12 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select a Framework</h3><p className="text-gray-600 dark:text-gray-400">Select a framework to view discrepancies.</p></div>,
      assistant: <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]"><GrcAssistant /></div>,
      edp: <EdpTab />,
    };
  }

  const tabContent = getTabContent(fwObj);

  return (
    <div className="container px-4 pt-10 pb-28">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">GRC Knowledge Base</h1>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Map policies to frameworks to controls, see common audit observations and how to push back, generate vendor
          contract clauses, reconcile cross-framework conflicts — and ask the assistant any question.
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
          Viewing <span className="font-semibold" style={{ color: fwObj.color }}>{fwObj.name}</span> — {fwObj.desc}
        </div>
      )}

      {tabContent[tab]}
    </div>
  );
}
export default KnowledgeBase;
