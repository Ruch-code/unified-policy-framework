import { Link } from 'react-router-dom';
import WorldMap from '../components/WorldMap';
import RegionControlMap from '../components/RegionControlMap';
import CertAdvisor from '../components/CertAdvisor';
import ErrorBoundary from '../components/ErrorBoundary';

const REGIONS = [
  {
    name: 'Global',
    tag: 'bg-gray-100 text-gray-700',
    frameworks: [
      { path: '/iso/27001/la', name: 'ISO 27001 LA', desc: 'ISMS auditing & certification' },
      { path: '/iso/27001/li', name: 'ISO 27001 LI', desc: 'ISMS implementation' },
      { path: '/iso-31000', name: 'ISO 31000', desc: 'Enterprise risk management' },
      { path: '/iso-27701', name: 'ISO 27701', desc: 'Privacy Information Management (PIMS)' },
      { path: '/pci-dss', name: 'PCI-DSS', desc: 'Payment card data security' },
      { path: '/soc2', name: 'SOC 2', desc: 'Trust services (TSC) for service orgs' },
      { path: '/cis', name: 'CIS Controls v8', desc: 'CIS 18 Controls & Implementation Groups' },
    ],
  },
  {
    name: 'European Union',
    tag: 'bg-indigo-100 text-indigo-700',
    frameworks: [
      { path: '/gdpr', name: 'GDPR', desc: 'EU data protection regulation' },
      { path: '/cippe/eu', name: 'CIPPE/EU', desc: 'EU privacy professional' },
    ],
  },
  {
    name: 'India',
    tag: 'bg-orange-100 text-orange-700',
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
    tag: 'bg-green-100 text-green-700',
    frameworks: [
      { path: '/lgpd', name: 'LGPD', desc: 'Brazil Lei Geral de Proteção de Dados' },
    ],
  },
  {
    name: 'South East Asia',
    tag: 'bg-red-100 text-red-700',
    frameworks: [
      { path: '/pdpa', name: 'PDPA', desc: 'Singapore Personal Data Protection Act' },
    ],
  },
  {
     name: 'East Asia',
     tag: 'bg-rose-100 text-rose-700',
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

export default function Home() {
  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4">Unified Compliance Framework</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A single playbook of security & privacy standards — grouped by region and industry — so controls and policies
            align into one unified framework for your organization.
          </p>
        </div>

        {/* Interactive Globe */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#0ea5e9] rounded-full inline-block" />
            Explore the Globe
          </h2>
          <p className="text-gray-500 text-sm mb-5 max-w-2xl">
            Drag to rotate the world, scroll to zoom. Latitudes, longitudes and time zones update live. Hover a country or tap a
            waving flag to see the privacy & security laws that apply there — then open its playbook.
          </p>
          <WorldMap height={540} />
        </div>

        {/* Certification Advisor */}
        <ErrorBoundary>
          <CertAdvisor />
        </ErrorBoundary>

        {/* Region View */}
        <h2 className="text-2xl font-bold text-[#1e293b] mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#7c3aed] rounded-full inline-block" />
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
                  className="group block bg-white rounded-xl p-5 border border-gray-200 hover:border-[#7c3aed] hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7c3aed] transition-colors">{fw.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{fw.desc}</p>
                  <span className="inline-block mt-3 text-sm text-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity">
                    Open playbook →
                  </span>
                </Link>
              ))}
            </div>
            {region.frameworks.length > 1 && <RegionControlMap frameworks={region.frameworks} />}
          </div>
        ))}

        {/* Industry View — Unified grouping */}
        <h2 className="text-2xl font-bold text-[#1e293b] mb-2 mt-16 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#059669] rounded-full inline-block" />
          Unified Policy Framework — by Industry
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl">
          See which standards cluster together per industry, and the policy areas you can align into a single control set.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map(industry => (
            <div key={industry.name} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{industry.icon}</span>
                <h3 className="text-lg font-bold text-[#1e293b]">{industry.name}</h3>
              </div>
              <div className="mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Applicable frameworks</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {industry.frameworks.map(fw => {
                    const found = Object.values(REGIONS).flatMap(r => r.frameworks).find(x => x.name === fw);
                    return found ? (
                      <Link key={fw} to={found.path} className="px-2 py-1 bg-[#f5f3ff] text-[#7c3aed] text-xs font-medium rounded-lg hover:bg-[#ede9fe] transition-colors">
                        {fw}
                      </Link>
                    ) : (
                      <span key={fw} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">{fw}</span>
                    );
                  })}
                </div>
              </div>
              <p className="text-sm text-gray-500 border-t border-gray-100 pt-3">
                <span className="font-semibold text-gray-600">Align these policies:</span> {industry.policyFocus}
              </p>
            </div>
          ))}
        </div>

        {/* Unified control matrix teaser */}
        <div className="mt-14 bg-gradient-to-r from-[#ede9fe] to-[#fef3c7] rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-[#1e293b] mb-2">How to unify into one policy set</h3>
          <p className="text-gray-700 mb-4 max-w-3xl">
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
              <div key={step.t} className="bg-white/70 rounded-xl p-5">
                <h4 className="font-bold text-[#1e293b] mb-1">{step.t}</h4>
                <p className="text-sm text-gray-600">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
