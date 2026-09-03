import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AssessmentPage from './components/AssessmentPage';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
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

const Protected = ({ children }) => (
  <RequireAuth>
    <ProtectedRouteContent>{children}</ProtectedRouteContent>
  </RequireAuth>
);

function ProtectedRouteContent({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="admin" element={<RequireAuth admin><AdminPanel /></RequireAuth>} />
          <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />

          <Route path="iso/27001/la" element={<Protected><Iso27001La /></Protected>} />
          <Route path="iso/27001/li" element={<Protected><Iso27001Li /></Protected>} />
          <Route path="iso-31000" element={<Protected><Iso31000 /></Protected>} />
          <Route path="iso-27701" element={<Protected><Iso27701 /></Protected>} />
          <Route path="pci-dss" element={<Protected><PciDss /></Protected>} />
          <Route path="soc2" element={<Protected><Soc2 /></Protected>} />
          <Route path="hipaa" element={<Protected><Hipaa /></Protected>} />
          <Route path="nist" element={<Protected><Nist /></Protected>} />
          <Route path="cippe/us" element={<Protected><CippeUs /></Protected>} />
          <Route path="hitrust" element={<Protected><Hitrust /></Protected>} />
          <Route path="coppa" element={<Protected><Coppa /></Protected>} />
          <Route path="ccpa" element={<Protected><CcpaCpra /></Protected>} />
          <Route path="gdpr" element={<Protected><Gdpr /></Protected>} />
          <Route path="cippe/eu" element={<Protected><CippeEu /></Protected>} />
          <Route path="dpdpa" element={<Protected><Dpdpa /></Protected>} />
          <Route path="sebi" element={<Protected><SecuritiesExchangeBoardIndia /></Protected>} />
          <Route path="rbi" element={<Protected><ReserveBankOfIndia /></Protected>} />
          <Route path="cscrf" element={<Protected><Cscrf /></Protected>} />
          <Route path="cert-in" element={<Protected><CertIn /></Protected>} />
          <Route path="lgpd" element={<Protected><Lgpd /></Protected>} />
          <Route path="pdpa" element={<Protected><Pdpa /></Protected>} />
          <Route path="pipl" element={<Protected><Pipl /></Protected>} />
          <Route path="cis" element={<Protected><Cis /></Protected>} />
          <Route path="*" element={<Protected><AssessRoute /></Protected>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
