import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary-600 mb-8">Security Standards & Frameworks Library</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/iso/27001/la" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">ISO/IEC 27001:2022 Lead Auditor (LA)</h3>
            <p className="text-gray-600 line-clamp-2">ISO 27001 LA certification training and examination</p>
          </Link>
          <Link to="/iso/27001/li" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">ISO/IEC 27001:2022 Lead Implementer (LI)</h3>
            <p className="text-gray-600 line-clamp-2">ISO 27001 LI certification for information security implementation</p>
          </Link>
          <Link to="/pci-dss" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">PCI-DSS</h3>
            <p className="text-gray-600 line-clamp-2">Payment Card Industry Data Security Standard compliance</p>
          </Link>
          <Link to="/soc2" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">SOC 2</h3>
            <p className="text-gray-600 line-clamp-2">Service Organization Control 2 auditing framework</p>
          </Link>
          <Link to="/hipaa" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">HIPAA</h3>
            <p className="text-gray-600 line-clamp-2">Health Insurance Portability and Accountability Act compliance</p>
          </Link>
          <Link to="/dpdpa" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">DPDPA</h3>
            <p className="text-gray-600 line-clamp-2">Data Protection Digital Personal Data Protection Act</p>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          <Link to="/nist" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">NIST</h3>
            <p className="text-gray-600 line-clamp-2">National Institute of Standards and Technology frameworks</p>
          </Link>
          <Link to="/gdpr" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">GDPR</h3>
            <p className="text-gray-600 line-clamp-2">General Data Protection Regulation compliance</p>
          </Link>
          <Link to="/cippe/us" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">CIPPE/US</h3>
            <p className="text-gray-600 line-clamp-2">CIPPE United States framework</p>
          </Link>
          <Link to="/cippe/eu" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">CIPPE/EU</h3>
            <p className="text-gray-600 line-clamp-2">CIPPE European Union framework</p>
          </Link>
          <Link to="/sebi" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">SEBI</h3>
            <p className="text-gray-600 line-clamp-2">Securities and Exchange Board of India</p>
          </Link>
          <Link to="/rbi" className="group block bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-primary-600 mb-2">RBI</h3>
            <p className="text-gray-600 line-clamp-2">Reserve Bank of India</p>
          </Link>
        </div>
      </div>
    </section>
  );
}