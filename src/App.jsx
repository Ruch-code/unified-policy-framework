import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AssessmentPage from './components/AssessmentPage';
import { getFramework, FRAMEWORKS } from './data/registry';

import Iso27001La from './pages/standards/Iso27001La';
import Iso27001Li from './pages/standards/Iso27001Li';
import Iso31000 from './pages/standards/Iso31000';
import Iso27701 from './pages/standards/Iso27701';
import PciDss from './pages/standards/PciDss';
import Soc2 from './pages/standards/Soc2';
import Hipaa from './pages/standards/Hipaa';
import Nist from './pages/standards/Nist';
import CippeUs from './pages/standards/CippeUs';
import Hitrust from './pages/standards/Hitrust';
import Coppa from './pages/standards/Coppa';
import CcpaCpra from './pages/standards/CcpaCpra';
import Gdpr from './pages/standards/Gdpr';
import CippeEu from './pages/standards/CippeEu';
import Dpdpa from './pages/standards/Dpdpa';
import SecuritiesExchangeBoardIndia from './pages/standards/SecuritiesExchangeBoardIndia';
import ReserveBankOfIndia from './pages/standards/ReserveBankOfIndia';
import Cscrf from './pages/standards/Cscrf';
import CertIn from './pages/standards/CertIn';

import Lgpd from './pages/standards/Lgpd';
import Pdpa from './pages/standards/Pdpa';
import Pipl from './pages/standards/Pipl';
import Cis from './pages/standards/Cis';

function AssessRoute() {
  const { pathname } = useLocation();
  const base = pathname.replace(/\/assess$/, '');
  const fw = Object.values(FRAMEWORKS).find(f => f.basePath === base) || getFramework(base.replace('/', ''));
  if (!fw) return (
    <div className="container px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Framework not found</h1>
      <a href="/" className="text-[#7c3aed] hover:underline">Back to Home</a>
    </div>
  );
  return <AssessmentPage framework={fw} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="iso/27001/la" element={<Iso27001La />} />
        <Route path="iso/27001/li" element={<Iso27001Li />} />
        <Route path="iso-31000" element={<Iso31000 />} />
        <Route path="iso-27701" element={<Iso27701 />} />
        <Route path="pci-dss" element={<PciDss />} />
        <Route path="soc2" element={<Soc2 />} />
        <Route path="hipaa" element={<Hipaa />} />
        <Route path="nist" element={<Nist />} />
        <Route path="cippe/us" element={<CippeUs />} />
        <Route path="hitrust" element={<Hitrust />} />
        <Route path="coppa" element={<Coppa />} />
        <Route path="ccpa" element={<CcpaCpra />} />
        <Route path="gdpr" element={<Gdpr />} />
        <Route path="cippe/eu" element={<CippeEu />} />
        <Route path="dpdpa" element={<Dpdpa />} />
        <Route path="sebi" element={<SecuritiesExchangeBoardIndia />} />
        <Route path="rbi" element={<ReserveBankOfIndia />} />
        <Route path="cscrf" element={<Cscrf />} />
        <Route path="cert-in" element={<CertIn />} />
        <Route path="lgpd" element={<Lgpd />} />
        <Route path="pdpa" element={<Pdpa />} />
        <Route path="pipl" element={<Pipl />} />
        <Route path="cis" element={<Cis />} />
        <Route path="*" element={<AssessRoute />} />
      </Route>
    </Routes>
  );
}

export default App;