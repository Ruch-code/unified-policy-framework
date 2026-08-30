import { Link } from 'react-router-dom';

export default function Dpdpa() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">DPDPA (Digital Personal Data Protection Act)</h2>
          <p className="text-gray-600 text-lg">
            DPDPA is India's comprehensive data protection law that governs the processing of digital personal
            data, establishing rights of data principals and obligations of data fiduciaries.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Where to Buy</h3>
          <p className="text-gray-600 mb-3">
            DPDPA compliance resources and guidance can be obtained from:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-primary-600">MeitY.gov.in</span>
              <span className="ml-2">(meity.gov.in) - Ministry of Electronics and IT</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">CPRA/PDPB</span>
              <span className="ml-2">(pdpbill.gov.in) - Personal Data Protection Bill</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">Legal Publishers</span>
              <span className="ml-2">(lexisnexis, sacyr) - DPDPA legal frameworks</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Previous Version vs Latest - Changes</h3>
          <p className="text-gray-600 mb-4">
            DPDPA replaced the earlier drafts of the Personal Data Protection Bill:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Earlier Drafts (2018-2022)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>More extensive consent requirements</li>
                <li>Data localization mandates</li>
                <li>Higher compliance burden for fiduciaries</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">DPDPA 2023 (Latest)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Enacted August 2023, effective future date</li>
                <li>Balanced approach between protection and innovation</li>
                <li>Exemptions for legitimate uses</li>
                <li>Simplified compliance for startups</li>
                <li>Focus on digital personal data only</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">When & Why Reinforced</h3>
          <p className="text-gray-600 mb-3">
            DPDPA was reinforced and enacted in <strong>August 2023</strong> to:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Establish India's framework for data protection</li>
            <li>Align with global standards (GDPR, etc.)</li>
            <li>Enable cross-border data flows</li>
            <li>Protect citizens' digital privacy rights</li>
          </ul>
          <p className="text-gray-600 mt-3 font-medium">
            Why it's required: With India's digital economy growing rapidly, a comprehensive data
            protection law is needed to protect citizens' privacy, enable trusted digital services,
            and comply with international data transfer requirements.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">What's Required</h3>
          <p className="text-gray-600 mb-3">
            DPDPA compliance requires:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Data fiduciary obligations and responsibilities</li>
            <li>Valid data processing consent</li>
            <li>Data principal rights (access, correction, erasure)</li>
            <li>Data breach notification requirements</li>
            <li>Data protection officer (DPO) appointment for certain entities</li>
            <li>Records of processing activities</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework for Business Type</h3>
          <p className="text-gray-600 mb-3">
            DPDPA applies based on business operations:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Service-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>SaaS companies operating in India</li>
                <li>Indian e-commerce platforms</li>
                <li>FinTech and payment services</li>
                <li>EdTech and digital learning platforms</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Product-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Mobile app developers</li>
                <li>Consumer device manufacturers</li>
                <li>Internet and telecom providers</li>
                <li>Digital advertising and marketing companies</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Compliance Checklist</h3>
          <p className="text-gray-600 text-sm mb-3">
            Use this checklist to verify your DPDPA compliance readiness:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Identify all systems that process digital personal data</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Determine data fiduciary vs data processor role</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Establish lawful basis for data processing (consent or legitimate interest)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement data principal rights mechanisms (access, correction, erasure)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Data breach notification procedures and timelines</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Appoint Data Protection Officer (DPO) if required</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Maintain records of processing activities (ROPA)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct Data Protection Impact Assessments (DPIAs) for high-risk processing</span>
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