import { Link } from 'react-router-dom';

export default function Hipaa() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">HIPAA (Health Insurance Portability and Accountability Act)</h2>
          <p className="text-gray-600 text-lg">
            HIPAA is US legislation that provides data privacy and security provisions for safeguarding
            medical information. It applies to healthcare providers, health plans, and healthcare clearinghouses.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Where to Buy</h3>
          <p className="text-gray-600 mb-3">
            HIPAA compliance resources and training can be obtained from:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-primary-600">HHS.gov</span>
              <span className="ml-2">(hhs.gov/hipaa) - Official HIPAA resources</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">HITECH Act</span>
              <span className="ml-2">(hhs.gov/sites/default/files/hipaa-enforcement-summary.pdf)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">Training Providers</span>
              <span className="ml-2">(himalaya.org, codingmart.com) - HIPAA certification courses</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Previous Version vs Latest - Changes</h3>
          <p className="text-gray-600 mb-4">
            HIPAA has evolved since 1996, with key updates through the HITECH Act:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Original HIPAA (1996)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Focused on portability of health insurance</li>
                <li>Limited privacy protections</li>
                <li>Basic security requirements</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">HIPAA with HITECH (2009+)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Extended privacy and security rules</li>
                <li>Breach notification requirements</li>
                <li>Stricter enforcement and penalties</li>
                <li>HITECH Act strengthened enforcement</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">When & Why Reinforced</h3>
          <p className="text-gray-600 mb-3">
            HIPAA was significantly reinforced with the HITECH Act in <strong>2009</strong> to:
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Address growing healthcare data breaches</li>
            <li>Expand protections for electronic health information</li>
            <li>Require breach notification within 60 days</li>
            <li>Increase penalties for non-compliance</li>
          </ul>
          <p className="text-gray-600 mt-3 font-medium">
            Why it's required: Healthcare data is highly sensitive and a prime target for criminals.
            Reinforcement ensures proper protection of patient information, privacy rights, and
            accountability for data breaches.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">What's Required</h3>
          <p className="text-gray-600 mb-3">
            HIPAA compliance requires three main rules:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><strong>Privacy Rule</strong>: Protects personal health information (PHI)</li>
            <li><strong>Security Rule</strong>: Safeguards ePHI with administrative, physical, and technical controls</li>
            <li><strong>Breach Notification Rule</strong>: Requires notification of breaches of unsecured PHI</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework for Business Type</h3>
          <p className="text-gray-600 mb-3">
            HIPAA applies to specific entity types:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Covered Entities</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Healthcare providers transmitting health information electronically</li>
                <li>Health plans (insurance companies, HMOs, government programs)</li>
                <li>Healthcare clearinghouses</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Business Associates</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Third-party service providers handling PHI</li>
                <li>Billing and claims processing companies</li>
                <li>IT providers supporting healthcare operations</li>
                <li>Legal and accounting firms working with PHI</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Compliance Checklist</h3>
          <p className="text-gray-600 text-sm mb-3">
            Use this checklist to verify your HIPAA compliance readiness:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Identify all systems that create, receive, maintain, or transmit PHI</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct risk analysis and security evaluation per HIPAA Security Rule</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement administrative safeguards (policies, procedures, training)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement physical safeguards (facility access controls, workstation security)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement technical safeguards (access controls, audit controls, encryption)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Develop breach notification procedures and incident response plan</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Execute Business Associate Agreements (BAAs) with all relevant parties</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Maintain documentation and records of all HIPAA-related activities</span>
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