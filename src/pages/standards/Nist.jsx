import { Link } from 'react-router-dom';

export default function Nist() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">NIST (National Institute of Standards and Technology)</h2>
          <p className="text-gray-600 text-lg">
            NIST provides cybersecurity frameworks and guidelines used by organizations worldwide to
            manage risk, improve security posture, and protect critical infrastructure.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Where to Buy</h3>
          <p className="text-gray-600 mb-3">
            NIST frameworks and resources can be obtained from:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-primary-600">NIST.gov</span>
              <span className="ml-2">(nist.gov) - Official NIST website</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">NIST SP 800-53</span>
              <span className="ml-2">(csrc.nist.gov/publications/detail/sp/800-53/rev-5)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">NIST CSF</span>
              <span className="ml-2">(nist.gov/cyberframework) - Cybersecurity Framework</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework Versions & Changes</h3>
          <p className="text-gray-600 mb-4">
            NIST frameworks have evolved significantly:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">NIST SP 800-53 (Early Versions)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Focused on federal information systems</li>
                <li>Static control families</li>
                <li>Less integration with risk management</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">NIST SP 800-53 Rev 5 (Latest)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Released 2020, broader applicability</li>
                <li>Merged with SP 800-171 for contractors</li>
                <li>Risk-based control selection</li>
                <li>Enhanced privacy controls</li>
                <li>Better alignment with other standards</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">NIST Cybersecurity Framework (CSF)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Version 1.1 released 2022</li>
                <li>Added Supply Chain Risk Management (SCRM) core function</li>
                <li>Enhanced alignment with international standards</li>
                <li>More practical implementation guidance</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">NIST CSF 2.0 (Planned)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Expected to further refine risk management</li>
                <li>Integrate emerging technology considerations</li>
                <li>Enhance governance components</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">When & Why Reinforced</h3>
          <p className="text-gray-600 mb-3">
            NIST frameworks are reinforced regularly to:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Address evolving cyber threats</li>
            <li>Incorporate lessons learned from incidents</li>
            <li>Reflect technological advancements (AI, IoT, cloud)</li>
            <li>Maintain relevance across sectors</li>
          </ul>
          <p className="text-gray-600 mt-3 font-medium">
            Why it's required: Cyber threats evolve constantly. NIST frameworks provide a flexible,
            risk-based approach that helps organizations prioritize investments and improve their
            security posture against modern attacks.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">What's Required</h3>
          <p className="text-gray-600 mb-3">
            NIST compliance/implementation requires:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Risk assessment and management process</li>
            <li>Implementation of relevant control families (SP 800-53)</li>
            <li>CSF: Identify, Protect, Detect, Respond, Recover functions</li>
            <li>Continuous monitoring and improvement</li>
            <li>Supply chain risk management</li>
            <li>Privacy risk management</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework for Business Type</h3>
          <p className="text-gray-600 mb-3">
            NIST applies to various business types:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Service-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Cloud service providers</li>
                <li>Data centers</li>
                <li>IT and cybersecurity firms</li>
                <li>Managed service providers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Product-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Software product companies</li>
                <li>IoT and device manufacturers</li>
                <li>Consumer electronics companies</li>
                <li>Automotive and embedded systems</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Compliance Checklist</h3>
          <p className="text-gray-600 text-sm mb-3">
            Use this checklist to verify your NIST compliance readiness:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct organizational risk assessment</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Prioritize and scope NIST controls based on risk</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement NIST SP 800-53 control families as applicable</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Map controls to NIST Cybersecurity Framework functions (Identify, Protect, Detect, Respond, Recover)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Establish continuous monitoring and reporting processes</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Develop supply chain risk management process</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement privacy risk management per NIST framework</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct regular assessments and improve security posture</span>
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