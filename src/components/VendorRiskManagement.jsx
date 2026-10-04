import React, { useState, Suspense, lazy, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Loaded on demand. The incident corpus is editorial copy that is meant to stay
// behind sign in, and a static import would fold all of it into the bundle that
// every anonymous visitor downloads. Lazy keeps it in its own chunk that is only
// ever requested once an authenticated user opens the tab.
const VendorIncidentBrief = lazy(() => import('./VendorIncidentBrief.jsx'));

import { 
  Building, Shield, Globe, AlertTriangle, 
  Users, Network, Scale, FileText, 
  RefreshCw, Clock, Search, Link2,
  ShieldCheck, AlertCircle, ChevronDown, ChevronUp,
  MapPin, Briefcase, BarChart2, Layers
} from 'lucide-react';

const VENDOR_RISK_SECTORS = {
  'Financial Services': {
    icon: Building,
    color: '#4f46e5',
    description: 'Banks, fintechs, payment processors, and insurers — strict regulatory oversight (Basel III, Dodd-Frank, SOX) demands vendor classification, continuous monitoring, and contractual flow-down of security obligations.',
    risks: ['Data breaches', 'Regulatory fines', 'Operational resilience', 'Concentration risk'],
    controls: ['Vendor tiering', 'SOC 2 Type II req', 'Right to audit', 'BCP testing', '4th party mapping'],
    regions: ['Global', 'Americas', 'EMEA', 'APAC'],
    regulations: ['Basel III', 'SOX', 'GLBA', 'FFIEC', 'PSD2', 'DORA'],
  },
  Healthcare: {
    icon: Shield,
    color: '#059669',
    description: 'Hospitals, health tech, pharma, and payers — HIPAA, HITECH, and 21st Century Cures Act require BAA enforcement, minimum necessary access, and breach notification within 60 days.',
    risks: ['PHI exposure', 'Ransomware', 'Regulatory penalties', 'Patient safety'],
    controls: ['BAA mandatory', 'Minimum necessary', 'Breach notification 60d', 'Subcontractor flow-down'],
    subProcessorReq: ['BAA flow-down required', 'Subcontractor approval', 'Audit rights extend'],
    regions: ['Americas', 'EMEA'],
    regulations: ['HIPAA', 'HITECH', '21st Century Cures Act', 'GDPR Art. 28'],
  },
  'Technology & SaaS': {
    icon: Globe,
    color: '#7c3aed',
    description: 'Cloud providers, SaaS platforms, AI/ML services, and dev tools — GDPR Art. 28, CCPA, and modern DPAs require DPA/SCC, sub-processor registries, and AI data usage restrictions.',
    risks: ['Data residency', 'AI training on customer data', 'Sub-processor sprawl', 'Encryption gaps'],
    controls: ['DPA/SCC mandatory', 'Subprocessor registry', 'AI data usage restrictions', 'Continuous monitoring'],
    subProcessorReq: ['Public subprocessor list', 'Objection rights', 'Equivalent protections', 'Annual disclosure'],
    regions: ['Global', 'EMEA', 'APAC'],
    regulations: ['GDPR Art. 28', 'CCPA', 'AI Act', 'Schrems II'],
  },
  'Critical Infrastructure': {
    icon: AlertTriangle,
    color: '#dc2626',
    description: 'Energy, transport, water, telecom — NERC CIP, TSA Pipeline, and IEC 62443 mandate vendor cyber hygiene, supply chain visibility, and incident reporting SLAs.',
    risks: ['OT/IT convergence', 'Nation-state threats', 'Supply chain disruption', 'Legacy systems'],
    controls: ['Vendor cyber hygiene standards', 'Supply chain visibility', 'Incident reporting SLAs', 'Patch management'],
    regions: ['Americas', 'EMEA', 'APAC'],
    regulations: ['NERC CIP', 'TSA Pipeline', 'IEC 62443', 'CISA Directives'],
  },
  'Retail & E-Commerce': {
    icon: Briefcase,
    color: '#f59e0b',
    description: 'Retailers, marketplaces, payment gateways — PCI DSS v4.0, PCI MPE, and tokenization requirements drive vendor validation for cardholder data environments.',
    risks: ['Card data theft', 'Magecart attacks', 'PCI non-compliance', 'Tokenization gaps'],
    controls: ['PCI DSS validation', 'Tokenization', 'Consent management', 'Data retention policies'],
    regions: ['Global'],
    regulations: ['PCI DSS v4.0', 'PCI MPE', 'PA-DSS'],
  },
  Manufacturing: {
    icon: Layers,
    color: '#8b5cf6',
    description: 'Industrial, automotive, aerospace, defense — NIST 800-171, CMMC, and ITAR require supply chain risk management, counterfeit detection, and export-controlled data protection.',
    risks: ['IP theft', 'Supply chain disruption', 'Counterfeit parts', 'Nth-tier visibility'],
    controls: ['CMMC assessment', 'ITAR compliance', 'Nth-tier mapping', 'Counterfeit detection'],
    regions: ['Americas', 'EMEA', 'APAC'],
    regulations: ['NIST 800-171', 'CMMC 2.0', 'ITAR', 'EAR', 'DFARS'],
  },
  Government: {
    icon: ShieldCheck,
    color: '#1d4ed8',
    description: 'Federal, state, local agencies and contractors — FedRAMP, FISMA, NIST 800-53, and CJIS require continuous monitoring, continuous authorization, and supply chain risk management (SCRM).',
    risks: ['FedRAMP non-compliance', 'Supply chain attacks', 'Data sovereignty', 'Personnel vetting'],
    controls: ['FedRAMP authorization', 'Continuous monitoring', 'SCRM program', 'CJIS compliance'],
    regions: ['Americas'],
    regulations: ['FedRAMP', 'FISMA', 'NIST 800-53', 'CJIS', 'CISA Directives'],
  },
};

const REGIONAL_LAWS = {
  'United States': {
    federal: ['SOX', 'GLBA', 'HIPAA', 'FERPA', 'FISMA', 'FedRAMP', 'PCI DSS', 'CISA'],
    states: [
      { name: 'California', laws: ['CCPA/CPRA', 'CalOPPA', 'CCPA Regulations', 'CPPA Enforcement'] },
      { name: 'New York', laws: ['SHIELD Act', 'DFS 500', 'NYPA'] },
      { name: 'Texas', laws: ['Texas Privacy Protection Act', 'Identity Theft Enforcement'] },
      { name: 'Virginia', laws: ['VCDPA', 'Consumer Data Protection Act'] },
      { name: 'Colorado', laws: ['CPA', 'Colorado Privacy Act'] },
      { name: 'Connecticut', laws: ['CTDPA'] },
      { name: 'Utah', laws: ['UCPA'] },
    ],
  },
  'European Union': {
    gdpr: 'GDPR (2016/679)',
    laws: ['ePrivacy Directive', 'NIS2', 'DORA', 'AI Act', 'Data Act', 'DSA/DMA'],
    countries: [
      { name: 'Germany', laws: ['BDSG', 'TTDSG'] },
      { name: 'France', laws: ['CNIL Guidelines', 'Loi Informatique et Libertés'] },
      { name: 'Netherlands', laws: ['UAVG', 'GDPR Implementation Act'] },
    ],
  },
  'United Kingdom': {
    laws: ['UK GDPR', 'Data Protection Act 2018', 'PECR', 'NIS Regulations'],
  },
  'Canada': {
    laws: ['PIPEDA', 'CPPA (Bill C-27)', 'Quebec Law 25', 'Alberta PIPA'],
  },
  'Australia': {
    laws: ['Privacy Act 1988', 'Notifiable Data Breaches Scheme', 'APRA CPS 234'],
  },
  'Singapore': {
    laws: ['PDPA', 'Cybersecurity Act', 'MAS TRM Guidelines'],
  },
  'Japan': {
    laws: ['APPI', 'CSL', 'FIEA'],
  },
  'Brazil': {
    laws: ['LGPD', 'BCB Resolutions'],
  },
};

const SUB_PROCESSOR_RISKS = {
  '4th/5th Party Blindness': {
    description: '60% of breaches originate from sub-processors you don\'t track — no visibility = no liability protection.',
    impact: 'Critical',
    controls: ['Tier 1 vendor sub-processor registry', 'Automated discovery', 'Contractual flow-down'],
  },
  'Contractual Gaps': {
    description: 'Missing flow-down clauses = no audit rights, no liability flow-down, no breach notification SLAs.',
    impact: 'High',
    controls: ['Standardized flow-down clauses', 'Audit rights', 'Liability allocation'],
  },
  'Concentration Risk': {
    description: 'Single cloud provider for critical services = single point of failure (SolarWinds, Kaseya).',
    impact: 'Critical',
    controls: ['Multi-cloud strategy', 'Exit planning', 'Portability testing'],
  },
  'Regulatory Non-Compliance': {
    description: 'DORA Art. 28, NIS2 Art. 21, GDPR Art. 28 require sub-processor governance — fines up to 2% revenue.',
    impact: 'High',
    controls: ['Regulatory mapping', 'Sub-processor compliance tracking', 'Automated alerts'],
  },
  'Incident Cascade': {
    description: 'Vendor breach without notification SLA = 72-hour GDPR window missed, mandatory notification fails.',
    impact: 'Critical',
    controls: ['Notification SLAs (4-24h)', 'Joint liability clauses', 'Insurance requirements'],
  },
};

const REVIEW_FREQUENCY = [
  { tier: 'Tier 1: Critical/High Risk', frequency: 'Continuous + Quarterly Deep Dive', color: '#ef4444', triggers: ['SOC 2 changes', 'Breach notification', 'M&A', 'Regulatory action', 'Service changes'] },
  { tier: 'Tier 2: Medium Risk', frequency: 'Semi-annual + Annual Onsite', color: '#f59e0b', triggers: ['Contract renewal', 'Control failures', 'Regulatory changes', 'Sub-processor changes'] },
  { tier: 'Tier 3: Low Risk', frequency: 'Annual Self-assessment', color: '#eab308', triggers: ['Contract renewal', 'Major incidents', 'Regulatory updates'] },
  { tier: 'Tier 4: Commodity/Non-critical', frequency: 'Biennial or Contract-driven', color: '#10b981', triggers: ['Contract renewal only'] },
];

function getColorStyles(color) {
  const colors = {
    '#ef4444': { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-500', trigger: 'bg-red-500' },
    '#f59e0b': { bg: 'bg-amber-50', icon: 'text-amber-600', dot: 'bg-amber-500', trigger: 'bg-amber-500' },
    '#eab308': { bg: 'bg-yellow-50', icon: 'text-yellow-600', dot: 'bg-yellow-500', trigger: 'bg-yellow-500' },
    '#10b981': { bg: 'bg-emerald-50', icon: 'text-emerald-600', dot: 'bg-emerald-500', trigger: 'bg-emerald-500' },
    '#4f46e5': { bg: 'bg-indigo-50', icon: 'text-indigo-600', dot: 'bg-indigo-500', trigger: 'bg-indigo-500' },
    '#8b5cf6': { bg: 'bg-violet-50', icon: 'text-violet-600', dot: 'bg-violet-500', trigger: 'bg-violet-500' },
    '#84cc16': { bg: 'bg-lime-50', icon: 'text-lime-600', dot: 'bg-lime-500', trigger: 'bg-lime-500' },
    '#dc2626': { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-500', trigger: 'bg-red-500' },
    '#059669': { bg: 'bg-emerald-50', icon: 'text-emerald-600', dot: 'bg-emerald-500', trigger: 'bg-emerald-500' },
    '#7c3aed': { bg: 'bg-violet-50', icon: 'text-violet-600', dot: 'bg-violet-500', trigger: 'bg-violet-500' },
    '#dc2626': { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-500', trigger: 'bg-red-500' },
    '#f59e0b': { bg: 'bg-amber-50', icon: 'text-amber-600', dot: 'bg-amber-500', trigger: 'bg-amber-500' },
    '#059669': { bg: 'bg-emerald-50', icon: 'text-emerald-600', dot: 'bg-emerald-500', trigger: 'bg-emerald-500' },
    '#dc2626': { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-500', trigger: 'bg-red-500' },
    '#f59e0b': { bg: 'bg-amber-50', icon: 'text-amber-600', dot: 'bg-amber-500', trigger: 'bg-amber-500' },
    '#059669': { bg: 'bg-emerald-50', icon: 'text-emerald-600', dot: 'bg-emerald-500', trigger: 'bg-emerald-500' },
    '#dc2626': { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-500', trigger: 'bg-red-500' },
    '#f59e0b': { bg: 'bg-amber-50', icon: 'text-amber-600', dot: 'bg-amber-500', trigger: 'bg-amber-500' },
  };
  return colors[color] || colors['#4f46e5'];
}

export default function VendorRiskManagement({ isDark = false }) {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const section = params.get('section');
      const validTabs = ['Sectors', 'Regional Laws', 'Sub-Processors', 'Review Frequency', 'Incident Brief'];
      if (section) {
        const mapped = {
          'sub-processors': 'Sub-Processors',
          'review-frequency': 'Review Frequency',
          'incident-brief': 'Incident Brief',
          'regional-laws': 'Regional Laws',
          'sectors': 'Sectors'
        };
        if (mapped[section.toLowerCase()]) return mapped[section.toLowerCase()];
      }
      // Fallback to hash for backwards compatibility
      const hash = window.location.hash.slice(1);
      const validTabs = ['Sectors', 'Regional Laws', 'Sub-Processors', 'Review Frequency', 'Incident Brief'];
      if (validTabs.includes(hash)) return hash;
    }
    return 'Sectors';
  });
  const [expandedSector, setExpandedSector] = useState(null);
  const [expandedRegion, setExpandedRegion] = useState(null);
  const [expandedSubProcessor, setExpandedSubProcessor] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);

  const { user } = useAuth();
  const briefTab = 'Incident Brief';

  const tabs = [
    'Sectors',
    'Regional Laws',
    'Sub-Processors',
    'Review Frequency',
    ...(user ? [briefTab] : []),
  ];

  // Sync URL query params with active tab
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const sectionMap = {
      'Sectors': 'sectors',
      'Regional Laws': 'regional-laws',
      'Sub-Processors': 'sub-processors',
      'Review Frequency': 'review-frequency',
      'Incident Brief': 'incident-brief'
    };
    const section = sectionMap[activeTab];
    if (section) {
      setSearchParams({ section }, { replace: true });
    }
  }, [activeTab, setSearchParams]);

  // Handle query param changes from URL (e.g., deep links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    const sectionMap = {
      'sectors': 'Sectors',
      'regional-laws': 'Regional Laws',
      'sub-processors': 'Sub-Processors',
      'review-frequency': 'Review Frequency',
      'incident-brief': 'Incident Brief'
    };
    if (section && sectionMap[section.toLowerCase()]) {
      setActiveTab(sectionMap[section.toLowerCase()]);
    }
  }, []);

  // Handle hash changes from URL (backwards compatibility)
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      const validTabs = ['Sectors', 'Regional Laws', 'Sub-Processors', 'Review Frequency', 'Incident Brief'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <section className={`py-24 ${isDark ? 'bg-dark-bg' : 'bg-surface-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 dark:text-text-dark-primary mb-4">
            End-to-End Vendor Risk Management
          </h2>
          <p className="text-lg text-navy-600 dark:text-text-dark-secondary max-w-3xl mx-auto">
            Complete vendor risk lifecycle: sector compliance, regional law mapping, sub-processor governance, 
            nth-party visibility, and review frequency automation.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Vendor risk modules">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`panel-${tab.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
              id={`vtab-${tab.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300
                ${activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : `bg-surface-100 dark:bg-surface-dark-100 text-navy-700 dark:text-text-dark-secondary hover:bg-surface-200 dark:hover:bg-surface-dark-200 border border-surface-300 dark:border-surface-dark-300`
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div role="tabpanel" aria-label="Vendor risk module content">
          {activeTab === 'Sectors' && (
            <div id="panel-sectors" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="tabpanel" aria-labelledby="vtab-sectors">
              {Object.entries(VENDOR_RISK_SECTORS).map(([sector, data]) => {
                const c = getColorStyles(data.color);
                const Icon = data.icon;
                return (
                  <div key={sector} className={`group relative rounded-2xl border ${c.box} overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600/50`}>
                    <div className={`absolute top-0 left-0 right-0 h-1 ${c.dot} transition-transform duration-300 group-hover:scale-x-100 origin-left`} style={{ transform: 'scaleX(0)' }} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
                          <Icon className={`${c.icon} w-6 h-6`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary">{sector}</h3>
                          <p className="text-sm text-gray-600 dark:text-text-dark-secondary">{data.description}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Key Risks</h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-text-dark-secondary">
                            {data.risks.map((risk, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Controls</h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-text-dark-secondary">
                            {data.controls.map((control, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                                {control}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {data.subProcessorReq && (
                          <div>
                            <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Sub-Processor Requirements</h4>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-text-dark-secondary">
                              {data.subProcessorReq.map((req, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        }
                        <div>
                          <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Regulations</h4>
                          <div className="flex flex-wrap gap-1">
                            {data.regulations.map((reg, i) => (
                              <span key={i} className={`px-2 py-0.5 text-xs rounded-full border ${c.box} ${c.title}`}>
                                {reg}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'Regional Laws' && (
            <div id="panel-regional-laws" className="space-y-4" role="tabpanel" aria-labelledby="vtab-regional-laws">
              {Object.entries(REGIONAL_LAWS).map(([region, data]) => (
                <div key={region} className="rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-surface-dark-100 overflow-hidden">
                  <div className="bg-navy-50 dark:bg-navy-900/30 px-6 py-4 border-b border-surface-300 dark:border-surface-dark-300">
                    <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary">{region}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {data.federal && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Federal / National</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.federal.map((law, i) => (
                            <span key={i} className="px-3 py-1 text-sm rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/30">
                              {law}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.gdpr && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">EU GDPR</h4>
                        <span className="px-3 py-1 text-sm rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/30">
                          {data.gdpr}
                        </span>
                      </div>
                    )}
                    {data.laws && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Key Regulations</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.laws.map((law, i) => (
                            <span key={i} className="px-3 py-1 text-sm rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/30">
                              {law}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.countries && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Country-Specific</h4>
                        <div className="space-y-2">
                          {data.countries.map((country, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-dark-100 rounded-lg">
                              <span className="font-medium text-navy-900 dark:text-text-dark-primary">{country.name}:</span>
                              <div className="flex flex-wrap gap-1">
                                {country.laws.map((law, j) => (
                                  <span key={j} className="px-2 py-0.5 text-xs rounded bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                                    {law}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.states && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">State-Level</h4>
                        <div className="space-y-2">
                          {data.states.map((state, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-dark-100 rounded-lg">
                              <span className="font-medium text-navy-900 dark:text-text-dark-primary">{state.name}:</span>
                              <div className="flex flex-wrap gap-1">
                                {state.laws.map((law, j) => (
                                  <span key={j} className="px-2 py-0.5 text-xs rounded bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                                    {law}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.branches && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Branches</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.branches.map((branch, i) => (
                            <span key={i} className="px-3 py-1 text-sm rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/30">
                              {branch}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Sub-Processors' && (
            <div id="panel-sub-processors" className="space-y-4" role="tabpanel" aria-labelledby="vtab-sub-processors">
              {Object.entries(SUB_PROCESSOR_RISKS).map(([risk, data]) => {
                const c = getColorStyles(data.impact === 'Critical' ? '#ef4444' : '#f59e0b');
                return (
                  <details key={risk} className={`group rounded-2xl border ${c.box} overflow-hidden`}>
                    <summary className="p-4 flex items-center justify-between gap-4 cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`shrink-0 w-2.5 h-2.5 rounded-full ${c.dot}`} />
                        <span className="font-semibold text-navy-900 dark:text-text-dark-primary leading-snug">{risk}</span>
                      </div>
                      <span className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${data.impact === 'Critical' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/30' : 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30'}`}>
                        {data.impact}
                      </span>
                    </summary>
                    <div className="px-4 pb-4 space-y-3">
                      <p className="text-gray-600 dark:text-text-dark-secondary">{data.description}</p>
                      <div>
                        <p className={`font-bold uppercase tracking-wide text-[10px] mb-1 ${c.title}`}>Controls</p>
                        <ul className="space-y-1">
                          {data.controls.map((ctrl, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-text-dark-secondary">
                              <span className={`shrink-0 w-4 h-4 rounded-full ${c.dot} ${c.title} text-[9px] font-bold flex items-center justify-center mt-0.5`}>{i + 1}</span>
                              <span>{ctrl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          )}

          {activeTab === 'Review Frequency' && (
            <div id="panel-review-frequency" className="space-y-4" role="tabpanel" aria-labelledby="vtab-review-frequency">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {REVIEW_FREQUENCY.map((tier, i) => {
                  const c = getColorStyles(tier.color);
                  return (
                    <div key={tier.tier} className={`group rounded-2xl border ${c.box} p-6 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600/50`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                          <span className={`text-xl ${c.title}`}>{i + 1}</span>
                        </div>
                        <div>
                          <h4 className={`font-bold text-navy-900 dark:text-text-dark-primary ${c.title}`}>{tier.tier}</h4>
                          <p className="text-sm text-gray-600 dark:text-text-dark-secondary">{tier.frequency}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-text-dark-secondary">
                        <p className="font-medium text-navy-900 dark:text-text-dark-primary">Triggers:</p>
                        <ul className="space-y-1">
                          {tier.triggers.map((trigger, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${c.trigger}`} />
                              {trigger}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === briefTab && (
            <div id="panel-vendor-incident-brief" className="space-y-4" role="tabpanel" aria-labelledby="vtab-vendor-incident-brief">
              <Suspense fallback={
                <div className="py-16 text-center text-sm text-navy-500" data-testid="vendor-brief-loading">
                  Loading brief generator...
                </div>
              }>
                <VendorIncidentBrief isDark={isDark} />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default VendorRiskManagement;
