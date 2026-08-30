import { Link } from 'react-router-dom';

export default function CippeEu() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">CIPPE/EU (Critical Infrastructure Protection Program - European Union)</h2>
          <p className="text-gray-600 text-lg">
            CIPPE/EU framework focuses on critical infrastructure security and resilience across European
            Union member states, harmonizing protection strategies for critical sectors including energy,
            transport, health, and digital infrastructure.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Where to Buy</h3>
          <p className="text-gray-600 mb-3">
            CIPPE/EU resources and guidance can be obtained from:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-primary-600">EU Directive on Security of Network and Information Systems (NIS2)</span>
              <span className="ml-2">(eu.eu) - Official EU NIS2 directive</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">ENISA</span>
              <span className="ml-2">(enisa.europa.eu) - EU Agency for Cybersecurity</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">European Commission</span>
              <span className="ml-2">(ec.europa.eu) - Critical infrastructure policies</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Previous Version vs Latest - Changes</h3>
          <p className="text-gray-600 mb-4">
            CIPPE/EU has evolved significantly with the NIS2 Directive:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Original NIS Directive (2016)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Member state implementation varied</li>
                <li>Essential services only (digital services omitted)</li>
                <li>Less stringent security requirements</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">NIS2 Directive (2022/2024)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Broader sector coverage including digital services</li>
                <li>Stricter security and notification requirements</li>
                <li>Higher fines for non-compliance</li>
                <li>Managed security risk per sector</li>
                <li>Enhanced cooperation between EU member states</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">When & Why Reinforced</h3>
          <p className="text-gray-600 mb-3">
            NIS2 was reinforced and adopted in <strong>2022</strong>, with Member State transposition by <strong>October 2024</strong>, to:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Address the evolving cyber threat landscape in Europe</li>
            <li>Harmonize critical infrastructure protection across the EU</li>
            <li>Reflect the digital transformation and new technologies</li>
            <li>Ensure resilience against state-sponsored and criminal cyber threats</li>
          </ul>
          <p className="text-gray-600 mt-3 font-medium">
            Why it's required: Critical infrastructure across the EU faces increasing cyber and physical
            threats that can disrupt essential services, impact economies, and threaten national security.
            NIS2 reinforcement ensures a unified, robust approach to protection and resilience.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">What's Required</h3>
          <p className="text-gray-600 mb-3">
            CIPPE/EU compliance/implementation requires:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Risk management per sector and digital service</li>
            <li>Security measures and hygiene practices</li>
            <li>Incident reporting within 24 hours for significant incidents</li>
            <li>Business continuity and disaster recovery planning</li>
            <li>Supply chain and value chain security</li>
            <li>Cooperation with Computer Security Incident Response Teams (CSIRTs)</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework for Business Type</h3>
          <p className="text-gray-600 mb-3">
            CIPPE/EU applies to operators of essential and important entities:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Service-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Cloud and internet service providers</li>
                <li>Digital platform operators</li>
                <li>Energy and transport operators</li>
                <li>Health service providers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Product-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Hardware and software for critical sectors</li>
                <li>IoT and industrial control system providers</li>
                <li>Manufacturing and production technology</li>
                <li>Digital infrastructure and equipment vendors</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Compliance Checklist</h3>
          <p className="text-gray-600 text-sm mb-3">
            Use this checklist to verify your CIPPE/EU compliance readiness:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Identify and classify operators of essential and important entities</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct risk management per NIS2 requirements</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement security measures and cyber hygiene practices</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Establish incident reporting procedures (24-hour notification for significant incidents)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Develop business continuity and disaster recovery plans</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Map and secure supply chains and value chains</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Cooperate with CSIRTs and national competent authorities</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Maintain documentation and demonstrate compliance</span>
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