import { Link } from 'react-router-dom';

export default function Lms() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">LMS (Learning Management System)</h2>
          <p className="text-gray-600 text-lg">
            LMS platforms are used for delivering, tracking, and managing compliance training,
            security awareness, and certification programs for various regulatory frameworks.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Where to Buy</h3>
          <p className="text-gray-600 mb-3">
            LMS platforms and compliance training can be obtained from:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-primary-600">TalentLMS</span>
              <span className="ml-2">(talentlms.com) - Cloud-based LMS platform</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">Docebo</span>
              <span className="ml-2">(docebo.com) - AI-powered learning platform</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">Moodle</span>
              <span className="ml-2">(moodle.org) - Open-source LMS</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework Integration</h3>
          <p className="text-gray-600 mb-4">
            LMS platforms support compliance training for various frameworks:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">ISO 27001</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Security awareness training</li>
                <li>ISMS role-specific training</li>
                <li>Internal auditor certification preparation</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">SOC 2</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Trust Service Criteria awareness</li>
                <li>Type 1 vs Type 2 control understanding</li>
                <li>Annual recertification training</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">PCI-DSS</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Payment card security training</li>
                <li>Annual security awareness</li>
                <li>QSA preparation courses</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">HIPAA</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>PHI privacy and security training</li>
                <li>Breach notification procedures</li>
                <li>Annual required training</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">When & Why Required</h3>
          <p className="text-gray-600 mb-3">
            LMS platforms are essential for:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Ensuring ongoing employee training on security and compliance</li>
            <li>Maintaining audit-ready documentation and records</li>
            <li>Reducing risk of non-compliance penalties</li>
            <li>Scaling training across distributed workforces</li>
            <li>Tracking completion and certification status</li>
          </ul>
          <p className="text-gray-600 mt-3 font-medium">
            Why it's required: Regulatory frameworks require documented employee training and
            awareness. An LMS provides a centralized, trackable system to ensure all staff
            complete required training and remain compliant with industry standards.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Business Type Framework</h3>
          <p className="text-gray-600 mb-3">
            LMS needs vary by organization type:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Service-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>SaaS companies needing customer security training</li>
                <li>IT consulting firms requiring staff certification</li>
                <li>MSPs managing client compliance requirements</li>
                <li>Cloud providers serving regulated industries</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Product-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Software companies with employee compliance needs</li>
                <li>Manufacturing firms requiring safety and security training</li>
                <li>Healthcare product companies needing HIPAA/privacy training</li>
                <li>Retailers processing payments (PCI-DSS training)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">LMS Compliance Checklist</h3>
          <p className="text-gray-600 text-sm mb-3">
            Use this checklist to verify your LMS compliance training readiness:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Select LMS platform supporting required framework curricula</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Configure courses for each regulatory framework (ISO, SOC 2, PCI-DSS, HIPAA, etc.)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Assign mandatory training to all employees and contractors</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Track completion status and certification records</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Schedule recurring/annual training refreshers</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Generate compliance reports for auditors and regulators</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Integrate LMS with HR and onboarding workflows</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Ensure mobile accessibility for remote and field staff</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Maintain audit trails and training completion evidence</span>
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