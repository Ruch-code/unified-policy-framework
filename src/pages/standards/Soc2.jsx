import { Link } from 'react-router-dom';

export default function Soc2() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">SOC 2 (Service Organization Control 2)</h2>
          <p className="text-gray-600 text-lg">
            SOC 2 is a auditing framework developed by the AICPA that evaluates how service organizations
            manage customer data based on five "Trust Service Criteria" (TSC): security, availability,
            processing integrity, confidentiality, and privacy.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Where to Buy</h3>
          <p className="text-gray-600 mb-3">
            SOC 2 audit and reporting services can be obtained from:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-primary-600">AICPA</span>
              <span className="ml-2">(aicpa-cima.com) - Official SOC 2 framework</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">CPA Firms</span>
              <span className="ml-2">(licensed independent auditors) - Conduct SOC 2 audits</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">PCAOB</span>
              <span className="ml-2">(pcaobus.org) - Oversight of auditors</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">SOC 2 Basics - TSC, Type 1 & Type 2</h3>

          <div className="mb-6">
            <h4 className="text-xl font-bold text-primary-600 mb-3">Trust Service Criteria (TSC)</h4>
            <p className="text-gray-600 mb-3">
              The TSC are the five principles against which SOC 2 audits are performed:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-primary-600">Security</h5>
                <p className="text-sm text-gray-600">Protection against unauthorized access (the only mandatory criterion)</p>
              </div>
              <div>
                <h5 className="font-medium text-primary-600">Availability</h5>
                <p className="text-sm text-gray-600">System availability for operation and use</p>
              </div>
              <div>
                <h5 className="font-medium text-primary-600">Processing Integrity</h5>
                <p className="text-sm text-gray-600">System processing is complete, accurate, timely, and authorized</p>
              </div>
              <div>
                <h5 className="font-medium text-primary-600">Confidentiality</h5>
                <p className="text-sm text-gray-600">Information designated as confidential is protected</p>
              </div>
              <div>
                <h5 className="font-medium text-primary-600">Privacy</h5>
                <p className="text-sm text-gray-600">Collection, use, retention, disclosure, and disposal of personal data</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-bold text-primary-600 mb-3">Type 1 vs Type 2</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-p p-4">
                <h5 className="font-medium text-primary-600 mb-2">Type 1</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Snapshot audit at a specific point in time</li>
                  <li>Tests design effectiveness of controls</li>
                  <li>Faster and less expensive</li>
                  <li>Answers "Are controls properly designed?"</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-p p-4">
                <h5 className="font-medium text-primary-600 mb-2">Type 2</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Operates over a period (typically 6-12 months)</li>
                  <li>Tests operating effectiveness of controls</li>
                  <li>More comprehensive and expensive</li>
                  <li>Answers "Do controls operate effectively over time?"</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-bold text-primary-600 mb-3">Independent Auditor</h4>
            <p className="text-gray-600 mb-3">
              A SOC 2 audit must be performed by an <strong>independent CPA firm</strong> that is licensed
              by the AICPA. The auditor:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Evaluates the design and operating effectiveness of controls</li>
              <li>Issues an audit report (Type 1 or Type 2)</li>
              <li>Must be independent of the organization being audited</li>
              <li>Follows AICPA attestation standards</li>
              <li>Issues the report to the organization's management and stakeholders</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Previous Version vs Latest - Changes</h3>
          <p className="text-gray-600 mb-4">
            SOC 2 has evolved significantly since its inception, with the latest updates in 2022:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Earlier SOC 2 Versions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Less standardized criteria implementation</li>
                <li>More flexible interpretation by auditors</li>
                <li>Less emphasis on documentation</li>
                <li>Varied reporting formats</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Latest SOC 2 (2022+)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>More consistent criteria application</li>
                <li>Stronger emphasis on documentation and evidence</li>
                <li>Updated privacy criteria alignment</li>
                <li>Standardized reporting templates</li>
                <li>Better comparability across organizations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">What's Required</h3>
          <p className="text-gray-600 mb-3">
            SOC 2 compliance requires:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Documented policies and procedures</li>
            <li>Control implementation matching TSC</li>
            <li>Evidence of control operation (Type 2) or design (Type 1)</li>
            <li>Internal audit preparation</li>
            <li>Selection of relevant trust principles</li>
            <li>Readiness assessment before engaging auditor</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework for Business Type</h3>
          <p className="text-gray-600 mb-3">
            SOC 2 is primarily for service organizations, but varies by model:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Service-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>SaaS and cloud computing providers</li>
                <li>Data centers and hosting companies</li>
                <li>TPA (Third-party administrators)</li>
                <li>Payment processors</li>
                <li>Managed service providers (MSPs)</li>
                <li>API providers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Product-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Software companies with customer data</li>
                <li>IoT device manufacturers</li>
                <li>Consumer electronics with connected features</li>
                <li>Product companies hosting customer data</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Compliance Checklist</h3>
          <p className="text-gray-600 text-sm mb-3">
            Use this checklist to verify your SOC 2 compliance readiness:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Define and document Trust Service Criteria relevant to your organization</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Map existing controls to each TSC category</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Design control policies and procedures for each selected criterion</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement controls and document evidence of operation</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct pre-audit readiness assessment</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Engage independent CPA firm for SOC 2 audit</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Receive audit report (Type 1 or Type 2)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Address any audit findings and implement recommendations</span>
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