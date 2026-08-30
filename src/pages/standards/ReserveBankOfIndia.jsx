import { Link } from 'react-router-dom';

export default function ReserveBankOfIndia() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">RBI (Reserve Bank of India)</h2>
          <p className="text-gray-600 text-lg">
            RBI is India's central bank, responsible for monetary policy, currency issuance, and regulating the financial system including banks and NBFCs.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Where to Buy</h3>
          <p className="text-gray-600 mb-3">
            RBI compliance and certification resources can be obtained from:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-primary-600">RBI Official Website</span>
              <span className="ml-2">(rbi.org.in) - Official RBI website</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">RBI Training College</span>
              <span className="ml-2">(rbi.org.in/ training) - RBI training programs</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">Indian Banks Association</span>
              <span className="ml-2">(iba.org.in) - Banking industry resources</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Previous Version vs Latest - Changes</h3>
          <p className="text-gray-600 mb-4">
            RBI regulations have evolved since its establishment in 1935:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Early RBI (1935-1991)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Focused on developmental banking</li>
                <li>Limited private sector participation</li>
                <li>Administered interest rates</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Latest RBI Framework (1991+)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Liberalized banking sector</li>
                <li>Risk-based supervision framework</li>
                <li>Basel III capital adequacy norms</li>
                <li>Promoting financial inclusion</li>
                <li>Digital banking and payments regulation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">When & Why Reinforced</h3>
          <p className="text-gray-600 mb-3">
            RBI regulations are reinforced regularly to:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Address banking sector vulnerabilities</li>
            <li>Promote financial stability and inclusion</li>
            <li>Regulate growing digital payments and fintech</li>
            <li>Manage systemic risk in the financial system</li>
          </ul>
          <p className="text-gray-600 mt-3 font-medium">
            Why it's required: RBI reinforcement ensures the Indian financial system
            remains stable and inclusive while adapting to rapid digital transformation
            and global economic changes.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">What's Required</h3>
          <p className="text-gray-600 mb-3">
            RBI compliance requires:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Banking license and capital adequacy</li>
            <li>Priority sector lending requirements</li>
            <li>KYC and AML compliance</li>
            <li>Basel III capital conservation</li>
            <li>Liquidity coverage ratio (LCR)</li>
            <li>Statutory liquidity ratio (SLR)</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework for Business Type</h3>
          <p className="text-gray-600 mb-3">
            RBI regulations apply to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Service-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Commercial banks and cooperative banks</li>
                <li>Payment banks and small finance banks</li>
                <li>Non-banking financial companies (NBFCs)</li>
                <li>Payment system operators</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Product-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Currency and note printing vendors</li>
                <li>Gold monetization scheme participants</li>
                <li>Infrastructure development finance companies</li>
                <li>Refinancing institutions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Compliance Checklist</h3>
          <p className="text-gray-600 text-sm mb-3">
            Use this checklist to verify your RBI compliance readiness:</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Obtain RBI license/registration as applicable</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement KYC and AML compliance procedures</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Maintain capital adequacy ratios (Basel III)</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Maintain SLR and LCR requirements</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Priority sector lending compliance</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Regular RBI regulatory inspections and audits</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Maintain proper documentation and records</span>
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