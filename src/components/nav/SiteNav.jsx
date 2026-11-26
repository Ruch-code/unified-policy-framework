import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// One shared side panel for the home modules, Knowledge Base topics and standalone pages.
// Item kinds: ['kb', topicId, label] -> /knowledge?topic=id; ['home', tabId, label] -> /#tabId; ['page', path, label].
export const SITE_SECTIONS = [
  ['Engineering', [
    ['home', 'engineering-partnership', 'Engineering and Infrastructure Partnership'],
    ['kb', 'change', 'Change Management'],
    ['kb', 'cicd', 'CI/CD Pipelines'],
    ['kb', 'secrets', 'Secrets Scanning'],
    ['kb', 'bom', 'SBOM, AIBOM and ABOM'],
    ['kb', 'sysdesign', 'System Design for GRC'],
    ['kb', 'cloud-testing', 'Cloud Control Testing Guide'],
  ]],
  ['ITGC domains', [
    ['home', 'access-governance', 'Persona and Access Governance'],
    ['home', 'password-policies', 'Password Policies and Auth'],
    ['kb', 'gaps', 'Common Gaps (ITGC)'],
    ['kb', 'it-audit', 'IT Audit Toolkit'],
    ['kb', 'infranet', 'Infra and Network Audit'],
    ['kb', 'infra-review', 'Infrastructure Security Review Playbook'],
    ['kb', 'erp', 'ERP Security Review'],
    ['kb', 'sap-grc', 'SAP GRC Access Control'],
  ]],
  ['Risk', [
    ['home', 'risk-assessment', 'Risk Assessment and Treatment'],
    ['home', 'vendor-risk', 'Vendor Risk Management'],
    ['kb', 'rcsa', 'Risk and Control Self-Assessment'],
    ['kb', 'kpi-kri', 'KPI and KRI Library'],
  ]],
  ['AI', [
    ['page', '/ai-governance', 'AI Governance'],
    ['home', 'ai-privacy', 'AI Privacy Risk Matrix'],
  ]],
  ['Security operations', [
    ['home', 'security-operations', 'Incidents, Vulnerabilities and Hybrid Security'],
    ['kb', 'threat-news', 'Threat News Deep Dives'],
    ['kb', 'tabletop', 'Tabletop Exercise (IR and DR)'],
    ['kb', 'zerotrust', 'Zero Trust and Shadow IT'],
    ['kb', 'edp', 'Endpoint and Data Protection'],
    ['kb', 'crypto-algorithms', 'Cryptographic Algorithms'],
    ['kb', 'data-governance', 'Data Governance'],
    ['kb', 'awareness', 'Awareness and Physical Checks'],
  ]],
  ['Audit and evidence', [
    ['page', '/grc-vs-audit', 'GRC view vs Audit view'],
    ['page', '/field-notes', 'Field Notes'],
    ['kb', 'audit', 'Audit and Rebuttals'],
    ['kb', 'finding-classification', 'Classifying Findings'],
    ['kb', 'audit-readiness', 'Audit Readiness Plan'],
    ['kb', 'evidence-checklist', 'Audit Evidence Checklist'],
    ['kb', 'auditor-requests', 'Auditor Request List'],
    ['kb', 'evidence', 'Evidence Automation'],
    ['kb', 'due-diligence', 'Pre-IPO and M&A Due Diligence'],
  ]],
  ['GRC programme', [
    ['kb', 'policies', 'Policies to Controls'],
    ['kb', 'implementation', 'Implementation Guide'],
    ['kb', 'policy-lifecycle', 'Policy Lifecycle'],
    ['kb', 'streamline', 'Streamlining GRC'],
    ['kb', 'tooling', 'GRC Tooling'],
    ['kb', 'customer-trust', 'Customer Trust and Questionnaires'],
  ]],
  ['Frameworks and regulation', [
    ['home', 'regional', 'Regional Frameworks and Certification Roadmap'],
    ['home', 'framework-cards', 'Framework Cards by Region'],
    ['page', '/unified-framework', 'Unified Control Framework'],
    ['page', '/cheat-sheets', 'Cheat Sheets'],
    ['kb', 'otherfw', 'Other Frameworks'],
    ['kb', 'radar', 'Discrepancy Radar'],
  ]],
  ['Industry', [
    ['kb', 'logistics', 'Logistics and Supply Chain Security'],
    ['kb', 'crypto', 'Crypto Exchanges (VDA)'],
  ]],
  ['Career', [
    ['home', 'interview-prep', 'Interview Preparation Hub'],
  ]],
];

export const itemKey = ([kind, id]) => `${kind}:${id}`;
const hrefOf = ([kind, id]) => (kind === 'kb' ? `/knowledge?topic=${id}` : kind === 'home' ? `/#${id}` : id);
const STORE = 'onelens-sitenav-collapsed';

function readCollapsed() {
  try { return localStorage.getItem(STORE) === '1'; } catch { return false; }
}

// active: an itemKey such as 'kb:change', 'home:regional' or 'page:/field-notes'.
// onSelect(item): optional; return true to handle the click in place (for example switching a tab on the home page).
export default function SiteNav({ active, onSelect, filter = '', activeChildren = null, top = null }) {
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const activeGroup = SITE_SECTIONS.find(([, items]) => items.some((it) => itemKey(it) === active))?.[0];
  const [open, setOpen] = useState(() => (activeGroup ? [activeGroup] : []));
  useEffect(() => { if (activeGroup) setOpen((p) => (p.includes(activeGroup) ? p : [...p, activeGroup])); }, [activeGroup]);
  useEffect(() => { try { localStorage.setItem(STORE, collapsed ? '1' : '0'); } catch { /* storage unavailable */ } }, [collapsed]);

  if (collapsed) {
    return (
      <button type="button" onClick={() => setCollapsed(false)} aria-label="Show side panel" title="Show side panel"
        className="sticky top-20 w-9 h-9 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800">»</button>
    );
  }

  const f = filter.trim().toLowerCase();
  return (
    <div className="w-[240px] sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
      <div className="flex items-center justify-between mb-2 gap-1">
        <button type="button" onClick={() => setOpen(SITE_SECTIONS.map(([g]) => g))} className="text-[11px] underline text-gray-600 dark:text-slate-300">Expand all</button>
        <button type="button" onClick={() => setOpen([])} className="text-[11px] underline text-gray-600 dark:text-slate-300">Collapse all</button>
        <button type="button" onClick={() => setCollapsed(true)} aria-label="Hide side panel" title="Hide side panel"
          className="w-7 h-7 rounded border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800">«</button>
      </div>
      {top}
      {SITE_SECTIONS.map(([group, items]) => {
        const shown = items.filter((it) => !f || it[2].toLowerCase().includes(f));
        if (!shown.length) return null;
        const isOpen = !!f || open.includes(group);
        return (
          <div key={group} className="mb-1">
            <button type="button" aria-expanded={isOpen} onClick={() => setOpen((p) => (p.includes(group) ? p.filter((x) => x !== group) : [...p, group]))}
              className="w-full flex items-center justify-between px-2 py-1.5 rounded text-sm font-extrabold text-fuchsia-700 dark:text-fuchsia-400 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20">
              <span>{group} <span className="font-normal text-xs text-gray-500 dark:text-slate-400">({shown.length})</span></span>
              <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <ul className="mb-2">
                {shown.map((it) => {
                  const k = itemKey(it);
                  const cur = k === active;
                  return (
                    <li key={k}>
                      <Link to={hrefOf(it)} aria-current={cur ? 'page' : undefined}
                        onClick={(e) => { if (onSelect && onSelect(it)) e.preventDefault(); }}
                        className={`block px-2 py-1 rounded text-sm ${cur ? 'is-selected font-semibold' : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}>
                        {it[2]}
                      </Link>
                      {cur && activeChildren}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
