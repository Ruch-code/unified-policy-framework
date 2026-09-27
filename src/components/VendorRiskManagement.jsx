import React, { useState, Suspense, lazy } from 'react';
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
    laws: ['GLBA', 'SOX', 'PCI-DSS', 'NYDFS 23 NYCRR 500', 'FFIEC'],
    reviewFreq: 'Annual + Continuous',
    risks: ['Data breaches', 'Regulatory fines', 'Operational resilience', 'Concentration risk'],
    controls: ['Vendor tiering', 'SOC 2 Type II req', 'Right to audit', 'BCP testing', '4th party mapping'],
    subProcessorReq: ['Notification 30 days prior', 'Same contractual protections', 'Data localization'],
  },
  'Healthcare': {
    icon: Users,
    color: '#10b981',
    laws: ['HIPAA', 'HITRUST', 'HITECH', '42 CFR Part 2', 'State privacy laws'],
    reviewFreq: 'Annual + Incident-driven',
    risks: ['PHI exposure', 'BAA gaps', 'Business associate liability', 'Subcontractor cascade'],
    controls: ['BAA mandatory', 'Minimum necessary', 'Breach notification 60d', 'Subcontractor flow-down'],
    subProcessorReq: ['BAA flow-down required', 'Subcontractor approval', 'Audit rights extend'],
  },
  'Technology/SaaS': {
    icon: Network,
    color: '#8b5cf6',
    laws: ['GDPR', 'CCPA/CPRA', 'SOC 2', 'ISO 27001', 'State AI laws'],
    reviewFreq: 'Semi-annual + Continuous',
    risks: ['Data processing compliance', 'Cross-border transfers', 'AI model training on data', 'Shadow IT'],
    controls: ['DPA/SCC mandatory', 'Subprocessor registry', 'AI data usage restrictions', 'Continuous monitoring'],
    subProcessorReq: ['Public subprocessor list', 'Objection rights', 'Equivalent protections', 'Annual disclosure'],
  },
  'E-commerce/Retail': {
    icon: Briefcase,
    color: '#f59e0b',
    laws: ['PCI-DSS', 'CCPA/CPRA', 'GDPR', 'COPPA', 'State breach laws'],
    reviewFreq: 'Annual + PCI quarterly',
    risks: ['Payment data exposure', 'Consumer privacy violations', 'Loyalty program data', 'Marketing vendor risks'],
    controls: ['PCI DSS validation', 'Tokenization', 'Consent management', 'Data retention policies'],
    subProcessorReq: ['PCI scope validation', 'Consumer data restrictions', 'Breach notification SLA'],
  },
  'Manufacturing/Supply Chain': {
    icon: Layers,
    color: '#84cc16',
    laws: ['CISA', 'NIST 800-171', 'CMMC', 'ITAR/EAR', 'TSCA'],
    reviewFreq: 'Annual + Contract-driven',
    risks: ['IP theft', 'Supply chain disruption', 'Counterfeit parts', 'Nth-tier visibility'],
    controls: ['CMMC certification', 'Supply chain mapping', 'SBOM requirements', 'Nth-party questionnaires'],
    subProcessorReq: ['Tier 1-3 mapping', 'Critical supplier audits', 'Change notification 90d'],
  },
  'Public Sector/GovTech': {
    icon: Scale,
    color: '#ef4444',
    laws: ['FISMA', 'FedRAMP', 'NIST 800-53', 'CJIS', 'State procurement codes'],
    reviewFreq: 'Continuous (FedRAMP) + Annual',
    risks: ['CUI/FCI exposure', 'Foreign ownership (CFIUS)', 'Supply chain compromise', 'Insider threats'],
    controls: ['FedRAMP ATO', 'CJIS addendum', 'Supply chain risk mgmt (SCRM)', 'Continuous monitoring'],
    subProcessorReq: ['FedRAMP equivalent', 'US persons only', 'Government approval required'],
  },
};

const REGION_LAWS = {
  'United States (Federal)': ['GLBA', 'HIPAA', 'FCRA', 'FERPA', 'COPPA', 'ECPA', 'CISA', 'SOX', 'PCI-DSS'],
  'California': ['CCPA/CPRA', 'CalOPPA', 'CCPA Regulations', 'CPPA Enforcement'],
  'New York': ['SHIELD Act', 'DFS 23 NYCRR 500', 'NYDFS Cyber', 'Biometric Privacy'],
  'European Union': ['GDPR', 'ePrivacy Directive', 'NIS2', 'DORA', 'AI Act', 'Data Act', 'DSA/DMA'],
  'United Kingdom': ['UK GDPR', 'Data Protection Act 2018', 'PECR', 'NIS Regulations'],
  'Canada': ['PIPEDA', 'CPPA (Bill C-27)', 'Quebec Law 25', 'Alberta PIPA'],
  'Brazil': ['LGPD', 'ANPD Regulations', 'Marco Civil'],
  'Australia': ['Privacy Act 1988', 'Notifiable Data Breaches', 'APRA CPS 234'],
  'Singapore': ['PDPA', 'Cybersecurity Act', 'MAS TRM Guidelines'],
  'Japan': ['APPI', 'Act on Protection of Personal Information', 'CSF'],
  'India': ['DPDPA 2023', 'IT Act 2000', 'RBI Guidelines', 'CERT-In Directions'],
  'China': ['PIPL', 'CSL', 'DSL', 'Personal Information Protection Standard'],
  'South Korea': ['PIPA', 'Network Act', 'Credit Information Act'],
};

const SUB_PROCESSOR_RISKS = [
  {
    title: 'Sub-Processor Notification & Objection Rights',
    description: 'GDPR Art. 28, CCPA 1798.140, and modern DPAs require controllers to be notified of new sub-processors and given objection periods (typically 30 days).',
    controls: ['Maintain public sub-processor registry', '30-day advance notice', 'Contractual objection rights', 'Automated notification workflows'],
    regulations: ['GDPR Art. 28(2)', 'CCPA 1798.140', 'Standard Contractual Clauses']
  },
  {
    title: 'Nth-Party / 4th+ Party Risk Visibility',
    description: 'Sub-processors of sub-processors (nth parties) create cascading risk. Most organizations lack visibility beyond Tier 1.',
    controls: ['Tier 1-3 supply chain mapping', 'Critical path identification', 'Nth-party questionnaires', 'Automated discovery tools', 'SBOM for software vendors'],
    regulations: ['NIST 800-161', 'Executive Order 14028', 'DORA Art. 28', 'NIS2 Art. 21']
  },
  {
    title: 'Sub-Processor Contractual Flow-Down',
    description: 'Data protection obligations must flow down unchanged through the entire sub-processor chain. Breaks in the chain create liability gaps.',
    controls: ['Mandatory flow-down clauses', 'Audit rights extension', 'Liability allocation', 'Indemnification chains', 'Termination rights'],
    regulations: ['GDPR Art. 28(4)', 'Standard Contractual Clauses Module 2/3', 'ISO 27001 A.15.1']
  },
  {
    title: 'Cross-Border Sub-Processor Transfers',
    description: 'Sub-processors in non-adequate countries require transfer mechanisms (SCC, BCR, certification). Schrems II requires case-by-case assessment.',
    controls: ['Transfer impact assessments (TIAs)', 'SCC Module 2/3', 'Supplementary measures', 'Data localization options', 'Adequacy monitoring'],
    regulations: ['GDPR Ch. V', 'Schrems II', 'Standard Contractual Clauses', 'UK IDTA', 'China PIPL Art. 38']
  },
  {
    title: 'Sub-Processor Incident Notification & Liability',
    description: 'Breach at sub-processor level must flow up to controller within regulatory timelines (72h GDPR, 60d HIPAA, etc.). Liability allocation often unclear.',
    controls: ['Incident notification SLAs (4-24h)', 'Joint liability clauses', 'Insurance requirements', 'Indemnification caps', 'Regulatory cooperation'],
    regulations: ['GDPR Art. 33/34', 'HIPAA 45 CFR 164.410', 'CCPA 1798.150', 'State breach laws']
  },
];

const REVIEW_FREQUENCY_MATRIX = [
  { tier: 'Tier 1: Critical/High Risk', frequency: 'Continuous + Quarterly Deep Dive', triggers: ['SOC 2 changes', 'Breach notification', 'M&A', 'Regulatory action', 'Service changes'], color: '#ef4444' },
  { tier: 'Tier 2: Medium Risk', frequency: 'Semi-annual + Annual Onsite', triggers: ['Contract renewal', 'Control failures', 'Regulatory changes', 'Sub-processor changes'], color: '#f59e0b' },
  { tier: 'Tier 3: Low Risk', frequency: 'Annual Self-assessment', triggers: ['Contract renewal', 'Major incidents', 'Regulatory updates'], color: '#eab308' },
  { tier: 'Tier 4: Commodity/Non-critical', frequency: 'Biennial or Contract-driven', triggers: ['Contract renewal only'], color: '#10b981' },
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
  };
  return colors[color] || colors['#ef4444'];
}

const darkChip = 'bg-surface-dark-200 border border-surface-dark-300 text-text-dark-primary';
const darkChipMuted = 'bg-surface-dark-200 border border-surface-dark-300 text-text-dark-secondary';

function SectorCard({ sector, data, isDark, expandedSector, setExpandedSector }) {
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-300
      ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-indigo-900/30' : data.color + '20'}`}>
            <data.icon className="w-6 h-6" style={{ color: data.color }} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-navy-900 dark:text-text-dark-primary">{sector}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-surface-dark-200 border border-surface-dark-300 text-text-dark-secondary' : 'bg-surface-200 border border-surface-300 text-navy-700'}`}>
              {data.reviewFreq}
            </span>
          </div>
        </div>

        <button
          onClick={() => setExpandedSector(expandedSector === sector ? null : sector)}
          className="w-full text-left py-2"
        >
          <div className="flex items-center justify-between text-sm text-navy-600 dark:text-text-dark-muted mb-2">
            <span>Laws & Regulations ({data.laws.length})</span>
            <span>{expandedSector === sector ? '▲' : '▼'}</span>
          </div>
          {expandedSector === sector && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {data.laws.map((law, i) => (
                <span key={i} className={`px-2 py-1 text-xs font-medium rounded-lg ${isDark ? darkChipMuted : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                  {law}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-navy-600 dark:text-text-dark-muted mb-2">
            <span>Key Risks ({data.risks.length})</span>
            <span>{expandedSector === sector ? '▲' : '▼'}</span>
          </div>
          {expandedSector === sector && (
            <ul className="space-y-1 mb-4 text-sm text-navy-600 dark:text-text-dark-secondary">
              {data.risks.map((risk, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: data.color }} />
                  {risk}
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between text-sm text-navy-600 dark:text-text-dark-muted mb-2">
            <span>Controls ({data.controls.length})</span>
            <span>{expandedSector === sector ? '▲' : '▼'}</span>
          </div>
          {expandedSector === sector && (
            <ul className="space-y-1 mb-4 text-sm text-navy-600 dark:text-text-dark-secondary">
              {data.controls.map((ctrl, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: data.color }} />
                  {ctrl}
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between text-sm text-navy-600 dark:text-text-dark-muted">
            <span>Sub-Processor Requirements</span>
            <span>{expandedSector === sector ? '▲' : '▼'}</span>
          </div>
          {expandedSector === sector && (
            <ul className="space-y-1 text-sm text-navy-600 dark:text-text-dark-secondary mt-2">
              {data.subProcessorReq.map((req, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: data.color }} />
                  {req}
                </li>
              ))}
            </ul>
          )}
        </button>
      </div>
    </div>
  );
}

function RegionCard({ region, laws, isDark, expandedRegion, setExpandedRegion }) {
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
      <button
        onClick={() => setExpandedRegion(expandedRegion === region ? null : region)}
        className="w-full p-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl">📍</span>
          <h3 className="font-bold text-lg text-navy-900 dark:text-text-dark-primary">{region}</h3>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800' : 'bg-indigo-50 text-indigo-700'}`}>
            {laws.length} Regulations
          </span>
        </div>
        <span>{expandedRegion === region ? '▲' : '▼'}</span>
      </button>
      {expandedRegion === region && (
        <div className={`px-6 pb-6 pt-0 border-t ${isDark ? 'border-surface-dark-300' : 'border-surface-300'}`}>
          <div className="flex flex-wrap gap-2">
            {laws.map((law, i) => (
              <span key={i} className={`px-3 py-1 text-sm font-medium rounded-lg ${isDark ? darkChip : 'bg-surface-200 text-navy-700 hover:bg-indigo-50 transition'}`}>
                {law}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SubProcessorCard({ risk, index, expandedSubProcessor, setExpandedSubProcessor }) {
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
      <button
        onClick={() => setExpandedSubProcessor(expandedSubProcessor === index ? null : index)}
        className="w-full p-6 flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-violet-900/30' : 'bg-violet-50'}`}>
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="font-bold text-lg text-navy-900 dark:text-text-dark-primary">{risk.title}</h3>
          </div>
          <p className="text-sm text-navy-600 dark:text-text-dark-secondary">{risk.description}</p>
        </div>
        <span>{expandedSubProcessor === index ? '▲' : '▼'}</span>
      </button>
      {expandedSubProcessor === index && (
        <div className={`px-6 pb-6 pt-0 border-t ${isDark ? 'border-surface-dark-300' : 'border-surface-300'} space-y-4`}>
          <div>
            <h4 className="text-xs font-semibold text-navy-500 dark:text-text-dark-muted uppercase tracking-wider mb-2">Controls</h4>
            <ul className="space-y-1.5">
              {risk.controls.map((ctrl, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-navy-600 dark:text-text-dark-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  {ctrl}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-navy-500 dark:text-text-dark-muted uppercase tracking-wider mb-2">Regulations</h4>
            <div className="flex flex-wrap gap-1.5">
              {risk.regulations.map((reg, j) => (
                <span key={j} className={`px-2 py-1 text-xs font-medium rounded-lg ${isDark ? 'bg-violet-900/30 text-violet-400 border border-violet-800' : 'bg-violet-50 text-violet-700'}`}>
                  {reg}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewTierCard({ tier, index, expandedReview, setExpandedReview }) {
  const colorStyles = getColorStyles(tier.color);

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
      <button
        onClick={() => setExpandedReview(expandedReview === index ? null : index)}
        className="w-full p-6 flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-red-900/30' : colorStyles.bg}`}>
              <BarChart2 className={`w-5 h-5 ${colorStyles.icon}`} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-navy-900 dark:text-text-dark-primary">{tier.tier}</h3>
              <p className="text-sm text-navy-600 dark:text-text-dark-secondary">{tier.frequency}</p>
            </div>
          </div>
        </div>
        <span>{expandedReview === index ? '▲' : '▼'}</span>
      </button>
      {expandedReview === index && (
        <div className={`px-6 pb-6 pt-0 border-t ${isDark ? 'border-surface-dark-300' : 'border-surface-300'}`}>
          <h4 className="text-xs font-semibold text-navy-500 dark:text-text-dark-muted uppercase tracking-wider mb-2">Review Triggers</h4>
          <ul className="space-y-1.5">
            {tier.triggers.map((trigger, j) => (
              <li key={j} className="flex items-center gap-2 text-sm text-navy-600 dark:text-text-dark-secondary">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: tier.color }} />
                {trigger}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function VendorRiskManagement({ isDark = false }) {
  const [activeTab, setActiveTab] = useState('Sectors');
  const [expandedSector, setExpandedSector] = useState(null);
  const [expandedRegion, setExpandedRegion] = useState(null);
  const [expandedSubProcessor, setExpandedSubProcessor] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);

  // The Incident Brief tab pulls the incident corpus and renders newsletter copy
  // and artwork. Keep it behind sign in, since this section also renders on the
  // public landing page.
  const { user } = useAuth();
  const briefTab = 'Incident Brief';

  const tabs = [
    'Sectors',
    'Regional Laws',
    'Sub-Processors',
    'Review Frequency',
    ...(user ? [briefTab] : []),
  ];
  
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
              aria-controls={`panel-${tab}`}
              id={`vtab-${tab}`}
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

        {activeTab === 'Sectors' && (
          <div id="panel-Sectors" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="tabpanel" aria-labelledby="vtab-Sectors">
            {Object.entries(VENDOR_RISK_SECTORS).map(([sector, data]) => (
              <SectorCard 
                key={sector} 
                sector={sector} 
                data={data} 
                isDark={isDark}
                expandedSector={expandedSector}
                setExpandedSector={setExpandedSector}
              />
            ))}
          </div>
        )}

        {activeTab === 'Regional Laws' && (
          <div id="panel-Regional Laws" className="space-y-4" role="tabpanel" aria-labelledby="vtab-Regional Laws">
            {Object.entries(REGION_LAWS).map(([region, laws]) => (
              <RegionCard 
                key={region}
                region={region}
                laws={laws}
                isDark={isDark}
                expandedRegion={expandedRegion}
                setExpandedRegion={setExpandedRegion}
              />
            ))}
          </div>
        )}

        {activeTab === 'Sub-Processors' && (
          <div id="panel-Sub-Processors" className="space-y-4" role="tabpanel" aria-labelledby="vtab-Sub-Processors">
            {SUB_PROCESSOR_RISKS.map((risk, i) => (
              <SubProcessorCard
                key={i}
                risk={risk}
                index={i}
                expandedSubProcessor={expandedSubProcessor}
                setExpandedSubProcessor={setExpandedSubProcessor}
                isDark={isDark}
              />
            ))}
          </div>
        )}

        {activeTab === 'Review Frequency' && (
          <div id="panel-Review Frequency" className="space-y-4" role="tabpanel" aria-labelledby="vtab-Review Frequency">
            {REVIEW_FREQUENCY_MATRIX.map((tier, i) => (
              <ReviewTierCard
                key={i}
                tier={tier}
                index={i}
                expandedReview={expandedReview}
                setExpandedReview={setExpandedReview}
                isDark={isDark}
              />
            ))}
          </div>
        )}

        {activeTab === briefTab && (
          <Suspense fallback={
            <div className="py-16 text-center text-sm text-navy-500" data-testid="vendor-brief-loading">
              Loading brief generator...
            </div>
          }>
            <VendorIncidentBrief isDark={isDark} />
          </Suspense>
        )}
      </div>
    </section>
  );
}