import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthorAboutPopup from '../components/AuthorAboutPopup';
import PetMascots from '../components/PetMascots';
import { UserRound } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showPets, setShowPets] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setInfo(''); setLoading(true);
    try {
      const data = await login(email, password);
      if (data.isDefaultPassword) {
        setInfo('You are using a temporary password. Please change it in your profile.');
      }
      nav('/');
    } catch (err) {
      setError(err.message || 'Login failed');
      if (err.status === 403) setInfo('Your account is pending approval or deactivated.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h1>
        <p className="text-sm text-gray-500 mb-6">Access the compliance playbooks once your account is approved.</p>
        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>}
        {info && <div className="mb-4 p-3 rounded-lg bg-blue-50 text-blue-700 text-sm border border-blue-200">{info}</div>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
          <button disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600 space-y-2">
          <p>Don't have an account? <Link to="/signup" className="text-indigo-600 font-medium hover:underline">Request access</Link></p>
          <p>Forgot password? <Link to="/forgot" className="text-indigo-600 font-medium hover:underline">Reset it</Link></p>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100 relative">
          <div
            onMouseEnter={() => setShowPets(true)}
            onMouseLeave={() => setShowPets(false)}
            className="inline-flex items-center gap-2 group cursor-pointer"
            onClick={() => setShowAbout(true)}
          >
            <span className="inline-flex items-center gap-2 text-[#7c3aed] text-sm font-semibold group-hover:underline transition">
              <UserRound className="w-4 h-4" /> About the author
            </span>
          </div>
          <PetMascots show={showPets} />
        </div>
      </div>

      <AuthorAboutPopup open={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
}
