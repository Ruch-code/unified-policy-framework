import { Link } from 'react-router-dom';

export default function Gdpr() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">GDPR (General Data Protection Regulation)</h2>
          <p className="text-gray-600 text-lg">
            GDPR is the European Union's comprehensive data protection law that governs the processing
            and free movement of personal data within the EU and EEA regions.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Where to Buy</h3>
          <p className="text-gray-600 mb-3">
            GDPR compliance resources and guidance can be obtained from:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-primary-600">EU GDPR Official Site</span>
              <span className="ml-2">(eugdpr.org) - Official GDPR information</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">Data Protection Authorities</span>
              <span className="ml-2">(per EU member state) - Enforcement and guidance</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">Training Providers</span>
              <span className="ml-2">(iapp.org, gdpr.eu) - GDPR certification courses</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Previous Version vs Latest - Changes</h3>
          <p className="text-gray-600 mb-4">
            GDPR became enforceable in May 2018, replacing the Data Protection Directive 95/46/EC:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Data Protection Directive (1995)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Member state implementation varied</li>
                <li>Limited extraterritorial reach</li>
                <li>Reactive rather than proactive compliance</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">GDPR (2018+)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Directly applicable across EU member states</li>
                <li>Extraterritorial scope (applies globally if processing EU data)</li>
                <li>Higher fines up to 4% of global turnover</li>
                <li>Data subject rights expansion</li>
                <li>Privacy by design and by default</li>
                <li>Mandatory breach notification within 72 hours</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">When & Why Reinforced</h3>
          <p className="text-gray-600 mb-3">
            GDPR was reinforced and became enforceable on <strong>25 May 2018</strong> to:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Harmonize data protection laws across Europe</li>
            <li>Strengthen citizens' data protection rights</li>
            <li>Address the digital economy and cross-border data flows</li>
            <li>Give individuals more control over personal data</li>
          </ul>
          <p className="text-gray-600 mt-3 font-medium">
            Why it's required: In the digital age, personal data has become a valuable commodity.
            GDPR reinforcement ensures organizations respect privacy rights, face meaningful
            consequences for violations, and establish data protection as a fundamental right.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">What's Required</h3>
          <p className="text-gray-600 mb-3">
            GDPR compliance requires:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Lawful, fair, and transparent processing</li>
            <li>Purpose limitation and data minimization</li>
            <li>Data subject rights (access, rectification, erasure, portability)</li>
            <li>Data protection impact assessments (DPIAs) for high-risk processing</li>
            <li>Appointing a DPO for certain organizations</li>
            <li>International data transfer mechanisms</li>
            <li>Documentation and record-keeping</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework for Business Type</h3>
          <p className="text-gray-600 mb-3">
            GDPR applies to any organization processing EU residents' data:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Service-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>EU SaaS companies</li>
                <li>Cross-border data processing services</li>
                <li>Online platforms serving EU users</li>
                <li>Cloud providers with EU customers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Product-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Consumer electronics sold in EU</li>
                <li>Mobile apps with EU users</li>
                <li>E-commerce companies targeting EU</li>
                <li>IoT devices operating in EU market</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Compliance Checklist</h3>
          <p className="text-gray-600 text-sm mb-3">
            Use this checklist to verify your GDPR compliance readiness:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct data mapping and inventory all personal data processing</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Identify lawful basis for each processing activity (consent, contract, legal obligation, etc.)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement data subject rights processes (access, rectification, erasure, portability, restriction)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct Data Protection Impact Assessments (DPIAs) for high-risk processing</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Appoint Data Protection Officer (DPO) if required by criteria</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Establish data breach notification procedure (within 72 hours of becoming aware)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement privacy by design and by default in all processing activities</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Maintain records of processing activities (ROPA) and documentation</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Ensure adequate safeguards for international data transfers (adequacy decisions, SCCs, BCRs)</span>
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">Made by Ruchi</p>
        </footer>
      </div>
    </section>
  );
}