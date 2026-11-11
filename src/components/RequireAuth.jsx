import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Skeleton from './ui/Skeleton.jsx';

export default function RequireAuth({ children, admin = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-[60vh] max-w-3xl mx-auto px-4 pt-10"><Skeleton lines={6} /></div>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname + location.search + location.hash }} replace />;
  }
  if (admin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}
