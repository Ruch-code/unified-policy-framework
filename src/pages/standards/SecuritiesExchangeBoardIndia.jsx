import { Link } from 'react-router-dom';

export default function SecuritiesExchangeBoardIndia() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">SEBI (Securities and Exchange Board of India)</h2>
          <p className="text-gray-600 text-lg">
            SEBI is the regulator for the securities market in India, established to protect investors and develop securities market.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Where to Buy</h3>
          <p className="text-gray-600 mb-3">
            SEBI compliance and certification resources can be obtained from:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-primary-600">SEBI Official Website</span>
              <span className="ml-2">(sebi.gov.in) - Official SEBI website</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">SEBI Training Academy</span>
              <span className="ml-2">(www.sebifss.com) - SEBI training programs</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600">Financial Market Institutes</span>
              <span className="ml-2">(nism.co.in, ifmcindia.com) - Financial market certification</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Previous Version vs Latest - Changes</h3>
          <p className="text-gray-600 mb-4">
            SEBI has evolved significantly since its establishment in 1988:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Early SEBI (1988-2010)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Focused primarily on fraud prevention</li>
                <li>Limited investor protection measures</li>
                <li>Reactive regulatory approach</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-p p-4">
              <h4 className="font-medium mb-2">Latest SEBI Framework (2020+)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Proactive risk-based regulation</li>
                <li>Enhanced disclosure and transparency requirements</li>
                <li>Stronger corporate governance norms</li>
                <li>Digital and fintech regulation focus</li>
                <li>Investor education and awareness emphasis</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">When & Why Reinforced</h3>
          <p className="text-gray-600 mb-3">
            SEBI regulations are reinforced regularly to:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Address evolving market manipulation techniques</li>
            <li>Protect retail investors in growing retail participation</li>
            <li>Regulate new financial instruments and derivatives</li>
            <li>Ensure market integrity in algorithmic and high-frequency trading</li>
          </ul>
          <p className="text-gray-600 mt-3 font-medium">
            Why it's required: SEBI reinforcement ensures the Indian securities market
            maintains global competitiveness while protecting investors from fraud
            and malpractices in an increasingly digital trading environment.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">What's Required</h3>
          <p className="text-gray-600 mb-3">
            SEBI compliance requires:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Company registration and continuous disclosure</li>
            <li>Insider trading prevention policies</li>
            <li>Listing obligations and compliance</li>
            <li>Investor grievance redressal mechanism</li>
            <li>Board composition and governance norms</li>
            <li>Regular financial reporting and disclosures</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Framework for Business Type</h3>
          <p className="text-gray-600 mb-3">
            SEBI regulations apply to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Service-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Stock exchanges and brokerage firms</li>
                <li>Investment advisors and portfolio managers</li>
                <li>Mutual funds and AIFs</li>
                <li>Fintech and digital trading platforms</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-600 mb-2">Product-Based Businesses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Issue managers and merchant bankers</li>
                <li>Credit rating agencies</li>
                <li>Depository participants</li>
                <li>Stock broker technology vendors</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Compliance Checklist</h3>
          <p className="text-gray-600 text-sm mb-3">
            Use this checklist to verify your SEBI compliance readiness:</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Register with SEBI and obtain necessary licenses</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Implement insider trading prevention policies</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Establish investor grievance redressal mechanism</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Maintain proper board composition and governance</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Ensure regular financial reporting and disclosures</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6.2-2.5l2.2 2.2L8 9l-1.7-1.7m14.7 5.3l-2.2-2.2L16 15l1.7 1.7"/>
              </svg>
              <span className="flex-1 font-medium">Conduct regular SEBI regulatory audits</span>
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