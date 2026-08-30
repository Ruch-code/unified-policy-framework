import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Iso27001La from './pages/standards/Iso27001La';
import Iso27001Li from './pages/standards/Iso27001Li';
import PciDss from './pages/standards/PciDss';
import Soc2 from './pages/standards/Soc2';
import Hipaa from './pages/standards/Hipaa';
import Dpdpa from './pages/standards/Dpdpa';
import Nist from './pages/standards/Nist';
import Gdpr from './pages/standards/Gdpr';
import CippeUs from './pages/standards/CippeUs';
import CippeEu from './pages/standards/CippeEu';
import Lms from './pages/standards/Lms';
import SecuritiesExchangeBoardIndia from './pages/standards/SecuritiesExchangeBoardIndia';
import ReserveBankOfIndia from './pages/standards/ReserveBankOfIndia';

function PrivateRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="iso/27001/la" element={<Iso27001La />} />
        <Route path="iso/27001/li" element={<Iso27001Li />} />
        <Route path="pci-dss" element={<PciDss />} />
        <Route path="soc2" element={<Soc2 />} />
        <Route path="hipaa" element={<Hipaa />} />
        <Route path="dpdpa" element={<Dpdpa />} />
        <Route path="nist" element={<Nist />} />
        <Route path="gdpr" element={<Gdpr />} />
        <Route path="cippe/us" element={<CippeUs />} />
        <Route path="cippe/eu" element={<CippeEu />} />
        <Route path="lms" element={<Lms />} />
        <Route path="sebi" element={<SecuritiesExchangeBoardIndia />} />
        <Route path="rbi" element={<ReserveBankOfIndia />} />
      </Route>
    </Routes>
  );
}

export default App;
