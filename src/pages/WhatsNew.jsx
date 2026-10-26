import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Download, Filter, X, ChevronDown, Calendar, Tag, Sparkles, Bug, AlertTriangle, Shield, FileText, ExternalLink } from 'lucide-react';
import { exportToCSV } from '../utils/exportCSV.jsx';
import { FRAMEWORKS } from '../data/registry';

const CHANGELOG = [
  {
    version: '2.9.0',
    date: '2026-10-26',
    label: 'ISO/IEC 27090 Release',
    changes: [
      { type: 'Feature', title: 'ISO/IEC 27090:2026 AI Security Page', desc: 'New /iso/27090 page for the October 2026 standard on security threats and compromises to AI systems: the nine Clause 6 threat types, a 4-week implementation path, startup gaps, and how it fits with ISO 27001 and ISO 42001.' },
      { type: 'Feature', title: 'ISO 27001 Reference Workspace', desc: 'Clauses 4 to 10, all 93 Annex A controls and the Statement of Applicability workspace now appear on the ISO 27001 LI page. /iso/27001 now opens that page.' },
      { type: 'Fix', title: 'Dark Mode Colours', desc: 'Fixed dark mode colours in the ISO 27001 workspace, framework week cards and the Common Gaps panels.' },
    ],
  },
  {
    version: '2.8.0',
    date: '2026-10-20',
    label: 'Phase 8 Release',
    changes: [
      { type: 'Feature', title: 'CSV Export for All Data Tables', desc: 'Every framework table now has an Export CSV button — downloads all columns (not just visible) for audit evidence. Works on Password Policies, Security Operations, User Access Review, Access Requirements, SOC 2, Admin Panel.' },
      { type: 'Feature', title: 'Responsive Tables with Mobile Card View', desc: 'All tables automatically collapse to accessible card stacks on mobile (< 640px). Key-value pairs with full keyboard navigation and screen reader support.' },
      { type: 'Feature', title: 'Global Keyboard Accessibility', desc: 'Full keyboard navigation across tables (Arrow keys, Home/End, Enter to sort, Escape to clear focus). Visible focus rings, skip links, and ARIA live regions for screen readers.' },
      { type: 'Feature', title: 'What\'s New / Changelog Page', desc: 'New /whats-new route with versioned changelog, filter by category (Feature, Fix, Breaking, Security, Docs), RSS/JSON feeds, and deep links to related frameworks.' },
      { type: 'Feature', title: 'Reusable <ResponsiveTable> Component', desc: 'Single component handles desktop table + mobile cards + CSV export + keyboard nav + sorting. Applied to 6+ tables across the platform.' },
      { type: 'Feature', title: 'Phase 7: 8 New Framework Pages', desc: 'Added ISO 42001 (AI Mgmt), ISO 27017 (Cloud Security), ISO 27018 (Cloud PII), ISO 22301 (BCM), HITRUST CSF v11, NIS2, DORA, CMMC 2.0, UK GDPR — all with 4-week learning tracks.' },
    ]
  },
  {
    version: '2.7.0',
    date: '2026-10-15',
    label: 'Phase 7 Release',
    changes: [
      { type: 'Feature', title: 'ISO 42001 AI Management System', desc: 'Complete 4-week track: AI governance, risk assessment per EU AI Act, ISO 42001 Annex A controls, model lifecycle, conformity assessment.' },
      { type: 'Feature', title: 'ISO 27017 Cloud Security Controls', desc: 'Shared responsibility, IAM, network segmentation, data encryption, workload protection, CSP governance, zero trust.' },
      { type: 'Feature', title: 'ISO 27018 Cloud PII Protection', desc: 'PII in cloud: data minimization, purpose limitation, DSAR automation, breach detection, CSP oversight, international transfers.' },
      { type: 'Feature', title: 'ISO 22301 Business Continuity', desc: 'BIA, risk assessment, strategies, capabilities, exercises, monitoring, audit, management review.' },
      { type: 'Feature', title: 'HITRUST CSF v11.x', desc: 'r2/i1/e1 assessment types, 110 controls across 19 domains, C3PAO assessment prep, SPRS submission, continuous compliance.' },
      { type: 'Feature', title: 'NIS2 Directive Compliance', desc: 'Essential/Important entity classification, registration, Art. 21 measures, incident reporting (24h/72h/1mo), supply chain, supervision readiness.' },
      { type: 'Feature', title: 'DORA Financial Resilience', desc: 'ICT risk management, incident reporting (4h/72h/1mo), TLPT testing every 3 years, critical third-party oversight, concentration risk.' },
      { type: 'Feature', title: 'CMMC 2.0 / NIST 800-171', desc: 'All 110 practices across 14 families, C3PAO assessment, SPRS score 110, POA&M, continuous monitoring.' },
      { type: 'Feature', title: 'UK GDPR Post-Brexit', desc: 'DPO, ROPA, DPIA, lawful basis mapping, DSAR automation, breach management, IDTA/UK-US Data Bridge, Children\'s Code, AI governance.' },
    ]
  },
  {
    version: '2.6.0',
    date: '2026-09-28',
    label: 'Phase 6 Release',
    changes: [
      { type: 'Feature', title: 'Vendor Risk Management Expansion', desc: 'New tabs: Lifecycle (8 stages), Tiering Calculator (6 questions), Due Diligence Evidence Matrix, SOC 2 Report Review Checklist, Contract Clause Library (9 categories), Issue Management (6 stages), AI Vendor Due Diligence (6 categories), Regional Laws expansion (India, UAE, KSA, South Africa, South Korea).' },
      { type: 'Feature', title: 'Sub-Processor Governance', desc: 'Expandable cards with flow-down clauses, 4th/5th party visibility, concentration risk mapping, automated review frequency by tier.' },
    ]
  },
  {
    version: '2.5.0',
    date: '2026-09-20',
    label: 'Phase 5 Release',
    changes: [
      { type: 'Fix', title: 'Content Corrections Across 11 Frameworks', desc: 'Fixed CIPP/EU (GDPR Art. 28, ePrivacy), PCI DSS v4.0.1 (phishing-resistant MFA, targeted risk analysis), COPPA (verifiable parental consent, Safe Harbor), CCPA/CPRA (sensitive personal info, 45-day response), DPDPA (significant data fiduciary, children consent), NIST CSF 2.0 (Govern function, implementation tiers), CIS v8.1 (IG updates, SAF), FedRAMP (Low/Mod/High, ATO, ConMon), CJIS (5.6 auth, 5.7 PIV/FIDO2), ISO 27701 (PIMS controls, privacy roles).' },
    ]
  },
  {
    version: '2.4.0',
    date: '2026-09-10',
    label: 'Phase 4 Release',
    changes: [
      { type: 'Feature', title: 'Hero Banner with Live Counters', desc: 'Animated lens SVG, real-time framework/module counts, CTA buttons, FEATURES.newHero flag.' },
    ]
  },
  {
    version: '2.3.0',
    date: '2026-09-01',
    label: 'Phase 3 Release',
    changes: [
      { type: 'Feature', title: 'Branding: OneLens by Ruchi', desc: 'Logo, hero, footer, OG tags, favicon across all pages.' },
    ]
  },
  {
    version: '2.2.0',
    date: '2026-08-20',
    label: 'Phase 2 Release',
    changes: [
      { type: 'Fix', title: 'Layout Fixes', desc: 'Tab overflow scroll, unified header, playbook H1/region spacing.' },
    ]
  },
  {
    version: '2.1.0',
    date: '2026-08-10',
    label: 'Phase 1 Release',
    changes: [
      { type: 'Fix', title: 'Theme Tokens & Contrast', desc: 'Semantic color tokens, region badges, level badges, chips, counters, effort text — WCAG 2.1 AA compliant.' },
    ]
  },
  {
    version: '2.0.0',
    date: '2026-08-01',
    label: 'Phase 0 Release',
    changes: [
      { type: 'Fix', title: 'Critical Bug Fixes', desc: 'AI Privacy Matrix crash, ISO 27001 LI crash, CJIS page load, session persistence, TypeScript strict mode.' },
    ]
  },
];

const CATEGORIES = ['All', 'Feature', 'Fix', 'Breaking', 'Security', 'Docs'];

const TYPE_ICONS = {
  Feature: Sparkles,
  Fix: Bug,
  Breaking: AlertTriangle,
  Security: Shield,
  Docs: FileText,
};

const TYPE_COLORS = {
  Feature: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  Fix: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Breaking: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Security: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Docs: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
};

function TypeBadge({ type }) {
  const Icon = TYPE_ICONS[type] || Tag;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${TYPE_COLORS[type] || TYPE_COLORS.Docs}`}>
      <Icon className="w-3 h-3" aria-hidden="true" />
      {type}
    </span>
  );
}

export default function WhatsNewPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedVersions, setExpandedVersions] = useState(new Set(['2.8.0']));
  const isDark = document.documentElement.classList.contains('dark');

  const filteredVersions = useMemo(() => {
    return CHANGELOG.filter(v => {
      const matchesCategory = activeCategory === 'All' || v.changes.some(c => c.type === activeCategory);
      const matchesSearch = !searchQuery || 
        v.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.changes.some(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.desc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const allChanges = useMemo(() => 
    CHANGELOG.flatMap(v => v.changes.map(c => ({ ...c, version: v.version, date: v.date, label: v.label })))
  , []);

  const exportChangelog = () => {
    const data = allChanges.map(c => ({
      version: c.version,
      date: c.date,
      release: c.label,
      type: c.type,
      title: c.title,
      description: c.desc
    }));
    exportToCSV(data, [
      { key: 'version', header: 'Version' },
      { key: 'date', header: 'Date' },
      { key: 'release', header: 'Release' },
      { key: 'type', header: 'Type' },
      { key: 'title', header: 'Title' },
      { key: 'description', header: 'Description' }
    ], 'whats-new-changelog.csv');
  };

  const toggleVersion = (version) => {
    setExpandedVersions(prev => {
      const next = new Set(prev);
      if (next.has(version)) next.delete(version);
      else next.add(version);
      return next;
    });
  };

  return (
    <section className="min-h-screen bg-surface-50 dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-navy-900 dark:text-text-dark-primary">
                What\'s New
              </h1>
              <p className="text-gray-600 dark:text-text-dark-secondary mt-1">
                Platform changelog — versioned releases, categorized changes, and deep links to frameworks.
              </p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search changelog…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-colors
                  ${isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                aria-label="Search changelog"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                    ${activeCategory === cat
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={exportChangelog}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
                  bg-indigo-600 text-white hover:bg-indigo-700
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                aria-label="Export full changelog as CSV"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* RSS/JSON Links */}
          <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
            <a href="/rss.xml" className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" target="_blank" rel="noopener">
              <ExternalLink className="w-3.5 h-3.5" /> RSS Feed
            </a>
            <a href="/changelog.json" className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" target="_blank" rel="noopener">
              <FileText className="w-3.5 h-3.5" /> JSON Feed
            </a>
          </div>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-6" role="feed" aria-label="Changelog">
          {filteredVersions.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-slate-400">No changes match your filters.</p>
              <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            filteredVersions.map(version => (
              <article key={version.version} className={`${isDark ? 'bg-slate-900/50' : 'bg-white'} rounded-2xl border ${isDark ? 'border-slate-700/50' : 'border-slate-200'} overflow-hidden`}>
                <button
                  onClick={() => toggleVersion(version.version)}
                  className="w-full px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                  aria-expanded={expandedVersions.has(version.version)}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">v{version.version}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-lg font-semibold text-navy-900 dark:text-text-dark-primary truncate">{version.label}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                          {new Date(version.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {version.changes.length} change{version.changes.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedVersions.has(version.version) ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                {expandedVersions.has(version.version) && (
                  <div className="px-6 pb-6 border-t border-slate-200 dark:border-slate-700/50 animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-4 mt-4">
                      {version.changes.map((change, i) => (
                        <div key={`${version.version}-${i}`} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50">
                          <TypeBadge type={change.type} />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-navy-900 dark:text-text-dark-primary">{change.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{change.desc}</p>
                            {/* Framework links */}
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {Object.values(FRAMEWORKS)
                                .filter(fw => change.desc.toLowerCase().includes(fw.id.toLowerCase()) || 
                                  change.title.toLowerCase().includes(fw.id.toLowerCase()) ||
                                  change.desc.toLowerCase().includes(fw.name.toLowerCase()))
                                .slice(0, 3)
                                .map(fw => (
                                  <Link
                                    key={fw.id}
                                    to={fw.basePath || `/${fw.id}`}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                                  >
                                    {fw.name}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}