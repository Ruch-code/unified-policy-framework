import { Link } from 'react-router-dom';

export default function CippeUs() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">CIPPE/US (Critical Infrastructure Protection Program - United States)</h2>
          <p className="text-gray-600 text-lg">
            CIPPE/US framework focuses on critical infrastructure security and resilience for United States
            infrastructure sectors, including energy, water, telecommunications, and transportation.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Where to Buy</h3>
          <p className="text-gray-600 mb-3">
            CIPPE/US resources and guidance can be obtained from:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-primary-600">CISA</span>
              <span className="ml-2">(cisa.gov) - Cybersecurity and Infrastructure Security Agency</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">NIPP</span>
              <span className="ml-2">(National Infrastructure Protection Plan)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">Sector-Specific Agencies</span>
              <span className="ml-2">(per critical infrastructure sector)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Previous Version vs Latest - Changes</h3>
          <p className="text-gray-600 mb-4">
            CIPPE/US has evolved to address emerging critical infrastructure threats:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Earlier CIPPE Versions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>More sector-specific guidance</li>
                <li>Less integrated approach across infrastructure sectors</li>
                <li>Reactive rather than proactive risk management</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Latest CIPPE/US</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Integrated risk-based approach</li>
                <li>Enhanced public-private partnership coordination</li>
                <li>Comprehensive critical infrastructure resilience</li>
                <li>Alignment with NIST CSF and other federal frameworks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">When & Why Reinforced</h3>
          <p className="text-gray-600 mb-3">
            CIPPE/US is reinforced regularly to:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Address evolving threats to critical national infrastructure</li>
            <li>Incorporate lessons learned from infrastructure incidents</li>
            <li>Reflect technological advancements affecting critical systems</li>
            <li>Maintain national security and economic stability</li>
          </ul>
          <p className="text-gray-600 mt-3 font-medium">
            Why it's required: Critical infrastructure (energy, water, communications, transportation)
            is essential for national security and public safety. Reinforcement ensures proactive
            protection against cyber and physical threats that could disrupt essential services.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">What's Required</h3>
          <p className="text-gray-600 mb-3">
            CIPPE/US compliance/implementation requires:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Sector-specific risk assessment and threat analysis</li>
            <li>Implementation of protective security measures</li>
            <li>Continuity of operations planning (COOP)</li>
            <li>Information sharing and analysis organizations (ISAOs)</li>
            <li>Public-private partnership coordination</li>
            <li>Critical infrastructure resilience planning</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework for Business Type</h3>
          <p className="text-gray-600 mb-3">
            CIPPE/US applies to critical infrastructure operators:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Service-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Energy and utility providers</li>
                <li>Water and wastewater systems</li>
                <li>Telecommunications companies</li>
                <li>Transportation and logistics providers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Product-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Hardware and software for critical infrastructure</li>
                <li>IoT devices in industrial control systems</li>
                <li>Manufacturing and production facilities</li>
                <li>Equipment and technology vendors</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Compliance Checklist</h3>
          <p className="text-gray-600 text-sm mb-3">
            Use this checklist to verify your CIPPE/US compliance readiness:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Identify and catalog all critical infrastructure assets</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct sector-specific risk and vulnerability assessment</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement physical and cybersecurity protective measures</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Develop and test continuity of operations plans</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Participate in information sharing and analysis organizations (ISAOs)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Coordinate with government agencies (CISA and sector partners)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct regular resilience testing and exercises</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Maintain documentation and compliance reporting</span>
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