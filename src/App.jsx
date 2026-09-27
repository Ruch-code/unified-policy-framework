import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import AssessmentPage from './components/AssessmentPage.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import NewsletterEditor from './pages/NewsletterEditor.jsx';
import KnowledgeBase from './pages/KnowledgeBase.jsx';
import Profile from './pages/Profile.jsx';
import { getFramework, FRAMEWORKS } from './data/registry.js';

import Iso27001La from './pages/standards/Iso27001La.jsx';
import Iso27001Li from './pages/standards/Iso27001Li.jsx';
import Iso31000 from './pages/standards/Iso31000.jsx';
import Iso27701 from './pages/standards/Iso27701.jsx';
import PciDss from './pages/standards/PciDss.jsx';
import Soc2 from './pages/standards/Soc2.jsx';
import Hipaa from './pages/standards/Hipaa.jsx';
import Nist from './pages/standards/Nist.jsx';
import CippeUs from './pages/standards/CippeUs.jsx';
import Hitrust from './pages/standards/Hitrust.jsx';
import Coppa from './pages/standards/Coppa.jsx';
import CcpaCpra from './pages/standards/CcpaCpra.jsx';
import Gdpr from './pages/standards/Gdpr.jsx';
import CippeEu from './pages/standards/CippeEu.jsx';
import Dpdpa from './pages/standards/Dpdpa.jsx';
import SecuritiesExchangeBoardIndia from './pages/standards/SecuritiesExchangeBoardIndia.jsx';
import ReserveBankOfIndia from './pages/standards/ReserveBankOfIndia.jsx';
import Cscrf from './pages/standards/Cscrf.jsx';
import CertIn from './pages/standards/CertIn.jsx';

import Lgpd from './pages/standards/Lgpd.jsx';
import Pdpa from './pages/standards/Pdpa.jsx';
import Pipl from './pages/standards/Pipl.jsx';
import Cis from './pages/standards/Cis.jsx';
import Aigp from './pages/standards/Aigp.jsx';
import AIGovernance from './pages/AIGovernance.jsx';

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
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Protected><Home /></Protected>} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="admin" element={<RequireAuth admin><AdminPanel /></RequireAuth>} />
          <Route path="newsletter" element={<RequireAuth admin><NewsletterEditor /></RequireAuth>} />
          <Route path="knowledge" element={<RequireAuth><KnowledgeBase /></RequireAuth>} />
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
          <Route path="aigp" element={<Protected><Aigp /></Protected>} />
          <Route path="ai-governance" element={<Protected><AIGovernance /></Protected>} />
          <Route path="*" element={<Protected><AssessRoute /></Protected>} />
        </Route>
      </Routes>
  );
}

export default App;
