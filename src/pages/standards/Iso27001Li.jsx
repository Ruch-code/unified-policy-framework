import { Link } from 'react-router-dom';

export default function Iso27001Li() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">ISO/IEC 27001:2022 Lead Implementer (LI)</h2>
          <p className="text-gray-600 text-lg">
            The ISO/IEC 27001:2022 Lead Implementer (LI) certification is designed for professionals who
            lead and manage the implementation of an Information Security Management System (ISMS). This
            certification validates your ability to implement, maintain, and improve information security
            controls based on the latest 2022 version of the standard.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Where to Buy</h3>
          <p className="text-gray-600 mb-3">
            ISO 27001 LI certification can be purchased from authorized training providers such as:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-primary-600">PECB</span>
              <span className="ml-2">(pecb.com) - Official certification and training</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">Exin</span>
              <span className="ml-2">(exin.com) - ISMS implementation certification</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">ISO Central Secretariat</span>
              <span className="ml-2">(iso.org) - Official standards body</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Previous Version vs Latest - Changes</h3>
          <p className="text-gray-600 mb-4">
            The ISO/IEC 27001:2022 version replaced the 2013 edition with significant enhancements:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">ISO/IEC 27001:2013 (Previous)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Focused on ISMS establishment and documentation</li>
                <li>Limited guidance on implementation planning</li>
                <li>Less emphasis on continual improvement</li>
                <li>Linear approach to documentation</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">ISO/IEC 27001:2022 (Latest)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Structured for easier implementation management</li>
                <li>Enhanced guidance on risk treatment planning</li>
                <li>Stronger focus on continual improvement</li>
                <li>Iterative implementation cycle</li>
                <li>Better integration with business processes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">When & Why Reinforced</h3>
          <p className="text-gray-600 mb-3">
            The 2022 revision was reinforced and published in <strong>October 2022</strong> to:
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Address evolving cyber threat landscape</li>
            <li>Align with current data privacy regulations</li>
            <li>Reflect digital transformation and remote work trends</li>
            <li>Provide clearer guidance for AI and emerging technologies</li>
          </ul>
          <p className="text-gray-600 mt-3 font-medium">
            Why it's required: Organizations need skilled leaders who can effectively implement and
            maintain an ISMS that protects against modern security threats while ensuring business
            continuity and regulatory compliance.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">What's Required</h3>
          <p className="text-gray-600 mb-3">
            To implement ISO/IEC 27001:2022, Lead Implementers focus on:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>ISMS project planning and management</li>
            <li>Resource allocation and competency development</li>
            <li>Control implementation according to Annex A</li>
            <li>Documentation and record management</li>
            <li>Stakeholder communication and engagement</li>
            <li>Post-implementation monitoring and review</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework for Business Type</h3>
          <p className="text-gray-600 mb-3">
            ISO 27001 applies to both service-based and product-based businesses:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Service-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>SaaS platforms and cloud services</li>
                <li>IT outsourcing and consulting firms</li>
                <li>Data hosting and storage providers</li>
                <li>Business process outsourcing (BPO)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Product-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Software development companies</li>
                <li>Embedded systems manufacturers</li>
                <li>Consumer electronics companies</li>
                <li>Device and appliance vendors</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Compliance Checklist</h3>
          <p className="text-gray-600 text-sm mb-3">
            Use this checklist to verify your ISO 27001:2022 implementation readiness:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Secure executive sponsorship and resources</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Define ISMS scope and organizational context</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Perform gap analysis against ISO 27001:2022</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Develop risk treatment plan and controls</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Document ISMS processes and procedures</span>
</div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Train staff on security policies and procedures</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct internal audits and management review</span>
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