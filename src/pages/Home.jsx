import { Link } from 'react-router-dom';
import GlobeExplorer from '../components/GlobeExplorer.jsx';
import RegionControlMap from '../components/RegionControlMap.jsx';
import CertAdvisor from '../components/CertAdvisor.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import AIPrivacyRisks from '../components/AIPrivacyRisks.jsx';
import VendorRiskManagement from '../components/VendorRiskManagement.jsx';
import InterviewPrep from '../components/InterviewPrep.jsx';
import PasswordPolicies from '../components/PasswordPolicies.jsx';
import AccessRequirements from '../components/AccessRequirements.jsx';
import UserAccessReview from '../components/UserAccessReview.jsx';
import SecurityOperations from '../components/SecurityOperations.jsx';
import HybridSecurityFramework from '../components/HybridSecurityFramework.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useState, useEffect } from 'react';
import { Lock, AlertCircle, Shield, AlertTriangle, Building, Users, ShieldCheck, Globe, Lock as LockIcon, Briefcase, GraduationCap, MessageSquare, Star, ArrowRight, Key, Server, Database, ClipboardCheck, ChevronRight, Menu, X } from 'lucide-react';

function useDark() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => { try { if (localStorage.getItem('compliance-dark') === '1') { document.documentElement.classList.add('dark'); setDark(true); } } catch {} }, []);
  return dark;
}

// Locked section component - single login prompt at top, then locked cards
function LockedSection({ title, description, children, icon: Icon, showLoginPrompt = false }) {
  const { user } = useAuth();
  if (user) return <>{children}</>;
  
  return (
    <div className="bg-surface-100 dark:bg-surface-dark-100 rounded-2xl border border-surface-300 dark:border-surface-dark-300">
      {showLoginPrompt && (
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-t-2xl px-6 py-6 md:p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Unlock Premium GRC Content</h3>
            <p className="text-indigo-100 mb-6">Sign in to unlock By Region frameworks, Industry mappings, AI Privacy Matrix, and Vendor Risk Management</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors">
                <Lock className="w-5 h-5" /> Sign In
              </Link>
              <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-indigo-700/20 transition-colors">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="p-8 md:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-2">Section Locked</h3>
        <p className="text-gray-600 dark:text-text-dark-secondary mb-6">{description}</p>
        <p className="text-sm text-gray-500 dark:text-text-dark-muted">Sign in above to unlock this section</p>
      </div>
    </div>
  );
}

const TABS = [
  {
    id: 'regional',
    label: 'Regional Frameworks',
    icon: Globe,
    description: 'By Region Framework Cards & Control Reuse Map — ISO 27001, GDPR, DPDPA, FedRAMP, CJIS, and 20+ regulations across 8 global regions',
    whatCanGoWrong: [
      'Regulatory Fines: GDPR fines up to €20M/4% revenue; CCPA $7,500/violation; DPDPA ₹250 crore',
      'Market Access Loss: Non-compliance blocks market entry (EU, India, US federal contracts)',
      'Data Breach Liability: No safe harbor without documented controls; increased breach costs 3-5x',
      'Audit Failures: Inability to demonstrate compliance during regulator audits or customer assessments',
      'Reputational Damage: Public enforcement actions erode customer trust and brand value',
    ],
  },
  {
    id: 'ai-privacy',
    label: 'AI Privacy Risk Matrix',
    icon: Shield,
    description: '12 critical privacy risks across Model Training, RAG Systems, AI Agents, and Industry Use Cases — mapped to GDPR, AI Act, HIPAA, CCPA with actionable controls',
    whatCanGoWrong: [
      'Model Memorization: LLMs regurgitate PII from training data — GDPR Art. 5(1)(c) violation, class-action lawsuits',
      'RAG Leakage: Vector DBs expose PII via retrieval without access controls — HIPAA/CCPA violations',
      'Agent Autonomy: AI agents process PII without human oversight — GDPR Art. 22 automated decision violation',
      'Supply Chain Risk: Third-party model APIs train on your data — no DPA, cross-border transfer violations',
      'Regulatory Bans: AI Act prohibits high-risk AI without conformity assessment — market ban in EU',
    ],
  },
  {
    id: 'vendor-risk',
    label: 'Vendor Risk Management',
    icon: Users,
    description: 'Complete vendor risk lifecycle across 6 sectors, 12 regional jurisdictions, sub-processor governance, nth-party visibility, and 4-tier review frequency automation',
    whatCanGoWrong: [
      '4th/5th Party Blindness: 60% of breaches originate from sub-processors you don\'t track — no visibility = no liability protection',
      'Contractual Gaps: Missing flow-down clauses = no audit rights, no liability flow-down, no breach notification SLAs',
      'Concentration Risk: Single cloud provider for critical services = single point of failure (SolarWinds, Kaseya)',
      'Regulatory Non-Compliance: DORA Art. 28, NIS2 Art. 21, GDPR Art. 28 require sub-processor governance — fines up to 2% revenue',
      'Incident Cascade: Vendor breach without notification SLA = 72-hour GDPR window missed, mandatory notification fails',
    ],
  },
  {
    id: 'interview-prep',
    label: 'Interview Preparation Hub',
    icon: Briefcase,
    description: 'Role-specific interview questions with conversational answers for GRC, Privacy, Security, and Risk roles. Practice real interview scenarios with expert-level responses.',
    whatCanGoWrong: [
      'Knowledge Gaps: Inability to articulate risk-based decisions and compensating controls under pressure',
      'Framework Confusion: Mixing up SOC 2, ISO 27001, PCI-DSS requirements leads to failed technical screens',
      'Scenario Weakness: Lack of concrete examples with metrics for "Tell me about a time..." questions',
      'Compliance Blind Spots: Missing CJIS, FedRAMP, HIPAA nuances for regulated industry roles',
      'Stale Knowledge: Not current on 2024/2025 framework updates (PCI v4, NIST CSF 2.0, ISO 27001:2022)',
    ],
  },
  {
    id: 'password-policies',
    label: 'Password Policies & Auth',
    icon: Key,
    description: 'Entra ID (Azure AD) password policies, custom banned lists, passwordless options, and SSO/MFA alternatives (Okta, Ping, Auth0, AWS, Google, Keycloak, PAM) with framework-mapped best practices per use case.',
    whatCanGoWrong: [
      'Legacy Rotation: Auditors still demanding 90-day rotation despite NIST 800-63B & PCI v4 removing forced rotation',
      'MFA Gaps: Not enforcing phishing-resistant MFA (FIDO2/WebAuthn) for privileged/admin access',
      'Weak Banned Lists: Missing organization-specific terms in Entra ID custom banned password list',
      'No Passwordless: Still relying on passwords + TOTP instead of passkeys/FIDO2 for critical systems',
      'Inconsistent Policies: Different password rules across Entra ID, Okta, AD, SaaS apps — no unified baseline',
    ],
  },
  {
    id: 'access-governance',
    label: 'Persona & Access Governance',
    icon: ClipboardCheck,
    description: 'FTE, Contractors, Interns, Production Access — pre-hire checks, provisioning, governance, offboarding, JIT controls, and User Access Review coverage/frequency mapped to SOC 2, ISO 27001, PCI, HIPAA, NIST, CIS, FedRAMP, GDPR, DPDPA, CJIS.',
    whatCanGoWrong: [
      'Background Check Gaps: Post-hire checks for FTEs/contractors violate SOC 2 CC6.1, ISO A.7.1.1, PCI 12.7',
      'Access Review Drift: Policy states quarterly but actual cadence annual — no sign-off, no exception tracking',
      'Intern Over-Provisioning: Interns with production access or privileged credentials',
      'Contractor Offboarding: Delayed revocation, orphaned accounts, no sub-contractor flow-down',
      'UAR Blind Spots: Missing non-human identities (service accounts, CI/CD runners, API keys) from reviews',
    ],
  },
];

const REGIONS = [
  {
    name: 'Global',
    tag: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    frameworks: [
      { path: '/iso/27001/la', name: 'ISO 27001 LA', desc: 'ISMS auditing & certification' },
      { path: '/iso/27001/li', name: 'ISO 27001 LI', desc: 'ISMS implementation' },
      { path: '/iso-22317', name: 'ISO 22317', desc: 'Business Impact Analysis (2021)' },
      { path: '/iso-31000', name: 'ISO 31000', desc: 'Enterprise risk management' },
      { path: '/iso-27701', name: 'ISO 27701', desc: 'Privacy Information Management (PIMS)' },
      { path: '/pci-dss', name: 'PCI-DSS', desc: 'Payment card data security' },
      { path: '/soc2', name: 'SOC 2', desc: 'Trust services (TSC) for service orgs' },
      { path: '/cis', name: 'CIS Controls v8', desc: 'CIS 18 Controls & Implementation Groups' },
    ],
  },
  {
    name: 'European Union',
    tag: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
    frameworks: [
      { path: '/gdpr', name: 'GDPR', desc: 'EU data protection regulation' },
      { path: '/cippe/eu', name: 'CIPPE/EU', desc: 'EU privacy professional' },
    ],
  },
  {
    name: 'India',
    tag: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    frameworks: [
      { path: '/dpdpa', name: 'DPDPA', desc: 'Digital Personal Data Protection Act' },
      { path: '/sebi', name: 'SEBI', desc: 'Securities & Exchange Board of India' },
      { path: '/rbi', name: 'RBI', desc: 'Reserve Bank of India' },
      { path: '/cscrf', name: 'CSCRF', desc: 'India cyber security framework' },
      { path: '/cert-in', name: 'CERT-In', desc: 'Indian CERT incident directives' },
    ],
  },
  {
    name: 'South America',
    tag: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    frameworks: [
      { path: '/lgpd', name: 'LGPD', desc: 'Brazil Lei Geral de Proteção de Dados' },
    ],
  },
  {
    name: 'South East Asia',
    tag: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    frameworks: [
      { path: '/pdpa', name: 'PDPA', desc: 'Singapore Personal Data Protection Act' },
    ],
  },
  {
    name: 'East Asia',
    tag: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
    frameworks: [
      { path: '/pipl', name: 'PIPL', desc: "China Personal Information Protection Law" },
    ],
  },
  {
    name: 'United States / Federal',
    tag: 'bg-slate-800 text-white',
    frameworks: [
      { path: '/fedramp', name: 'FedRAMP', desc: 'Federal cloud authorization (Low/Mod/High, ATO, ConMon)' },
      { path: '/cjis', name: 'CJIS', desc: 'FBI Criminal Justice Information Services policy' },
      { path: '/nist', name: 'NIST', desc: 'NIST CSF / SP 800-53' },
      { path: '/hipaa', name: 'HIPAA', desc: 'US health data protection' },
      { path: '/ccpa', name: 'CCPA/CPRA', desc: 'California consumer privacy' },
    ],
  },
];

const INDUSTRIES = [
  {
    name: 'Financial Services',
    icon: '🏦',
    frameworks: ['PCI-DSS', 'SOC 2', 'RBI', 'SEBI', 'ISO 27001 LA', 'ISO 27001 LI', 'CIS Controls v8'],
    policyFocus: 'Data at rest/in transit, fraud monitoring, access control, audit trails, vendor risk',
  },
  {
    name: 'Healthcare',
    icon: '🏥',
    frameworks: ['HIPAA', 'HITRUST CSF', 'NIST CSF 2.0', 'SOC 2', 'ISO 27001 LI', 'CIS Controls v8'],
    policyFocus: 'PHI handling, BAAs, encryption, breach notification, business continuity',
  },
  {
    name: 'Technology / SaaS',
    icon: '💻',
    frameworks: ['SOC 2', 'ISO 27001 LA', 'ISO 27001 LI', 'CCPA / CPRA', 'GDPR', 'ISO 27701', 'CIS Controls v8', 'LGPD', 'PDPA', 'PIPL'],
    policyFocus: 'Trust services criteria, DPIA, ROPA, encryption, SDLC security, incident response',
  },
  {
    name: 'E-commerce / Retail',
    icon: '🛒',
    frameworks: ['PCI-DSS', 'CCPA / CPRA', 'GDPR', 'COPPA', 'ISO 27701', 'DPDPA', 'LGPD', 'PDPA', 'PIPL'],
    policyFocus: 'Payment security, consent management, children privacy, data minimization',
  },
  {
    name: 'Cloud / Infrastructure',
    icon: '☁️',
    frameworks: ['ISO 27001 LA', 'SOC 2', 'NIST CSF 2.0', 'CERT-In', 'ISO 31000', 'CIS Controls v8'],
    policyFocus: 'Multi-cloud controls (AWS/Azure/GCP/Alibaba), logging, encryption keys, availability',
  },
  {
    name: 'Telecom / Data Centre',
    icon: '📡',
    frameworks: ['CERT-In', 'CSCRF', 'ISO 27001 LI', 'ISO 31000', 'GDPR', 'CIS Controls v8'],
    policyFocus: 'Traffic logging, 180-day retention, incident reporting (6-hr), SIM security',
  },
];

function TabPanel({ isDark, activeTab }) {
  const tab = TABS.find(t => t.id === activeTab);
  if (!tab) return null;

  const Icon = tab.icon;

  return (
    <div id={`panel-${activeTab}`} className="space-y-6 animate-in fade-in duration-300 scroll-mt-24" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
      {/* Globe + CertAdvisor - only on first tab */}
      {activeTab === 'regional' && (
        <>
          <ErrorBoundary>
            <GlobeExplorer isDark={isDark} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CertAdvisor />
          </ErrorBoundary>
        </>
      )}

      {/* What Can Go Wrong Panel */}
      <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">What Can Go Wrong Without {tab.label} Controls</h4>
            <ul className="text-sm text-red-700 dark:text-red-400 space-y-1 list-disc list-inside">
              {tab.whatCanGoWrong.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'regional' && (
        <ErrorBoundary>
          <SecurityOperations isDark={isDark} />
        </ErrorBoundary>
      )}

      {activeTab === 'regional' && (
        <div id="hybrid-security" className="scroll-mt-24">
          <ErrorBoundary>
            <HybridSecurityFramework isDark={isDark} />
          </ErrorBoundary>
        </div>
      )}

      {activeTab === 'regional' && (
        <div className="rounded-2xl border border-violet-300 dark:border-violet-900/50 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/40 dark:to-indigo-950/40 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <span className="inline-flex w-12 h-12 rounded-xl bg-violet-600 text-white items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </span>
          <div className="flex-1">
            <h2 className="text-lg font-extrabold text-navy-900 dark:text-text-dark-primary">AI Governance & Emerging Tech</h2>
            <p className="text-sm text-navy-600 dark:text-text-dark-secondary mt-0.5 max-w-2xl">
              One module across ISO 42001, the EU AI Act, and NIST AI RMF — AI inventory, risk-tier classification, model-release rhythm, and agentic-AI coverage.
            </p>
          </div>
          <Link to="/ai-governance" className="inline-flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-bold hover:bg-violet-700 transition-colors">
            Open module <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {activeTab === 'regional' && (
        <LockedSection
          title="By Region Framework Cards"
          description="Access detailed framework cards for ISO 27001, GDPR, DPDPA, FedRAMP, CJIS, and 20+ regulations across 8 global regions with direct playbook links."
          icon={Globe}
          showLoginPrompt={true}
        >
          <div>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full inline-block" />
              By Region
            </h2>
            {REGIONS.map(region => (
              <div key={region.name} className="mb-10">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${region.tag} mb-4`}>
                  {region.name}
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {region.frameworks.map(fw => (
                    <Link
                      key={fw.path}
                      to={fw.path}
                      className="grc-card group block p-5"
                    >
                      <h3 className="grc-card-title text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{fw.name}</h3>
                      <p className="grc-card-desc text-sm mt-1">{fw.desc}</p>
                      <span className="inline-block mt-3 text-sm text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
                        Open playbook →
                      </span>
                    </Link>
                  ))}
                </div>
                {region.frameworks.length > 1 && <RegionControlMap frameworks={region.frameworks} />}
              </div>
            ))}
          </div>
        </LockedSection>
      )}

      {activeTab === 'ai-privacy' && (
        <LockedSection
          title="AI Privacy Risk Matrix"
          description="Explore 12 critical privacy risks across Model Training, RAG Systems, AI Agents, and Industry Use Cases — mapped to GDPR, AI Act, HIPAA, and CCPA with actionable controls."
          icon={Shield}
          showLoginPrompt={false}
        >
          <AIPrivacyRisks isDark={isDark} />
        </LockedSection>
      )}

      {activeTab === 'vendor-risk' && (
        <LockedSection
          title="End-to-End Vendor Risk Management"
          description="Complete vendor risk lifecycle across 6 sectors, 12 regional jurisdictions, sub-processor governance, nth-party visibility, and 4-tier review frequency automation."
          icon={Users}
          showLoginPrompt={false}
        >
          <VendorRiskManagement isDark={isDark} />
        </LockedSection>
      )}

      {activeTab === 'interview-prep' && (
        <LockedSection
          title="Interview Preparation Hub"
          description="Role-specific interview questions with conversational answers for GRC, Privacy, Security, and Risk roles. Practice real interview scenarios with expert-level responses."
          icon={Briefcase}
          showLoginPrompt={false}
        >
          <InterviewPrep isDark={isDark} />
        </LockedSection>
      )}

      {activeTab === 'password-policies' && (
        <LockedSection
          title="Password Policies & Authentication Strategies"
          description="Entra ID (Azure AD) password policies, custom banned lists, passwordless options, and SSO/MFA alternatives (Okta, Ping, Auth0, AWS, Google, Keycloak, PAM) with framework-mapped best practices per use case."
          icon={Key}
          showLoginPrompt={false}
        >
          <PasswordPolicies isDark={isDark} />
        </LockedSection>
      )}

      {activeTab === 'access-governance' && (
        <>
          <LockedSection
            title="Mandatory Access Requirements by Persona"
            description="What's required for contractors, interns, full-time employees, and anyone with production access — pre-hire checks, provisioning, governance, offboarding, and production JIT controls mapped to SOC 2, ISO 27001, PCI, HIPAA, NIST, CIS, FedRAMP, GDPR, DPDPA, CJIS."
            icon={ShieldCheck}
            showLoginPrompt={false}
          >
            <AccessRequirements isDark={isDark} />
          </LockedSection>
          <LockedSection
            title="User Access Review — Coverage, Users & Frequency"
            description="What systems/applications must be reviewed, which user types (human + machine identities), and review frequency mandated by each framework — with risk-tiered operational guidance and automation strategies."
            icon={ClipboardCheck}
            showLoginPrompt={false}
          >
            <UserAccessReview isDark={isDark} />
          </LockedSection>
        </>
      )}

      {/* Unified control matrix teaser - only on last tab or regional */}
      {(activeTab === 'regional' || activeTab === 'access-governance') && (
        <div className="mt-10 bg-gradient-to-r from-indigo-50 dark:from-indigo-900/20 to-amber-50 dark:to-amber-900/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-2">How to unify into one policy set</h3>
          <p className="text-gray-700 dark:text-text-dark-secondary mb-4 max-w-3xl">
            Rather than maintaining separate policies per standard, map overlapping controls into a single baseline.
            Most frameworks share common controls — access management, encryption, incident response, logging,
            risk assessment, and vendor management — expressed differently.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { t: 'Map overlaps', d: 'Identify controls shared across frameworks (e.g., encryption appears in ISO 27001, HIPAA, PCI-DSS, SOC 2, GDPR).' },
              { t: 'Build one baseline', d: 'Create a single policy + technical control baseline satisfying the strictest overlapping requirement.' },
              { t: 'Map back', d: 'Document which standard each baseline control satisfies — so one control evidences many frameworks.' },
            ].map(step => (
              <div key={step.t} className="bg-white/70 dark:bg-surface-dark-100/70 rounded-xl p-5 border border-surface-200 dark:border-surface-dark-200">
                <h4 className="font-bold text-navy-900 dark:text-text-dark-primary mb-1">{step.t}</h4>
                <p className="text-sm text-gray-600 dark:text-text-dark-muted">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const isDark = useDark();
  const [activeTab, setActiveTab] = useState(() => {
    // Check URL hash for deep linking
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.slice(1);
      const validTab = TABS.find(t => t.id === hash);
      if (validTab) return hash;
    }
    return 'regional';
  });
  const [mobileTabsOpen, setMobileTabsOpen] = useState(false);

  // Update URL hash when tab changes (for deep linking)
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  // Respond to hash changes (e.g. deep links from search results)
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1);
      const tab = TABS.find(t => t.id === h);
      if (tab) setActiveTab(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Scroll to a section panel + flash-focus it (dispatched by SearchBar deep links)
  useEffect(() => {
    const onScrollTo = (e) => {
      const id = e.detail?.id;
      if (!id) return;
      let tries = 0;
      const attempt = () => {
        const el = document.getElementById(`panel-${id}`) || document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const start = performance.now();
          const flash = (now) => {
            const p = Math.min(1, (now - start) / 1500);
            const a = 0.55 * (1 - p);
            el.style.boxShadow = `0 0 0 3px rgba(99,102,241,${a.toFixed(3)}), 0 0 28px rgba(99,102,241,${(a * 0.4).toFixed(3)})`;
            if (p < 1) requestAnimationFrame(flash);
            else el.style.boxShadow = '';
          };
          requestAnimationFrame(flash);
        } else if (tries++ < 15) {
          setTimeout(attempt, 100);
        }
      };
      attempt();
    };
    window.addEventListener('compliance:scroll-to-section', onScrollTo);
    return () => window.removeEventListener('compliance:scroll-to-section', onScrollTo);
  }, []);

  return (
    <section className="min-h-screen bg-surface-50 dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy-900 dark:text-text-dark-primary mb-3">
            Unified Compliance & GRC Platform
          </h1>
          <p className="text-gray-600 dark:text-text-dark-secondary max-w-3xl">
            Centralized framework mapping, risk matrices, vendor governance, interview prep, and access controls — organized in discoverable modules.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          {/* Desktop Tabs */}
          <div className="hidden lg:flex flex-wrap gap-2 mb-4" role="tablist" aria-label="GRC Modules">
            {TABS.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-surface-100 dark:bg-surface-dark-100 text-navy-700 dark:text-text-dark-secondary hover:bg-surface-200 dark:hover:bg-surface-dark-200'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Tab Selector */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileTabsOpen(!mobileTabsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-dark-100 border border-surface-300 dark:border-surface-dark-300 text-navy-900 dark:text-text-dark-primary font-medium"
              aria-haspopup="listbox"
              aria-expanded={mobileTabsOpen}
            >
              <span>{TABS.find(t => t.id === activeTab)?.label}</span>
              <Menu className="w-5 h-5" />
            </button>
            {mobileTabsOpen && (
              <div className="mt-2 rounded-xl bg-surface-100 dark:bg-surface-dark-100 border border-surface-300 dark:border-surface-dark-300 overflow-hidden animate-in fade-in duration-200" role="listbox">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setMobileTabsOpen(false); }}
                    role="option"
                    aria-selected={activeTab === tab.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors
                      ${activeTab === tab.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-navy-700 dark:text-text-dark-secondary hover:bg-surface-200 dark:hover:bg-surface-dark-200'
                      }`}
                  >
                    <tab.icon className="w-4 h-4 flex-shrink-0" />
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab Description */}
          <div className="mb-4 p-4 rounded-xl bg-surface-100 dark:bg-surface-dark-100 border border-surface-300 dark:border-surface-dark-300">
            <p className="text-sm text-gray-600 dark:text-text-dark-secondary">
              {TABS.find(t => t.id === activeTab)?.description}
            </p>
          </div>
        </div>

        {/* Tab Panels */}
        <TabPanel isDark={isDark} activeTab={activeTab} />
      </div>
    </section>
  );
}