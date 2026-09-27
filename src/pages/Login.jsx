import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthorAboutPopup from '../components/AuthorAboutPopup.jsx';
import { UserRound } from 'lucide-react';

const TABS = [
  { id: 'signin', label: 'Sign in' },
  { id: 'request', label: 'Request access' },
  { id: 'forgot', label: 'Forgot password' },
  { id: 'admin', label: 'Admin' }
];

const INPUT_CLASS =
  'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState('signin');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqMessage, setReqMessage] = useState('');
  const [reqError, setReqError] = useState('');
  const [reqLoading, setReqLoading] = useState(false);

  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const [showAbout, setShowAbout] = useState(false);

  const switchTab = (id) => {
    setTab(id);
    setError('');
    setInfo('');
    setReqError('');
    setReqMessage('');
    setResetError('');
    setResetMessage('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setInfo(''); setLoading(true);
    try {
      const data = await login(email, password);
      if (data.isDefaultPassword) {
        setInfo('You are using a temporary password. Please change it in your profile.');
      }
      if (tab === 'admin') {
        nav(data.user?.role === 'admin' ? '/admin' : '/');
      } else {
        nav(location.state?.from || '/');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      if (err.status === 403) setInfo('Your account is pending approval or deactivated.');
    } finally {
      setLoading(false);
    }
  };

  const requestAccess = async (e) => {
    e.preventDefault();
    setReqError(''); setReqMessage(''); setReqLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: reqEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      setReqMessage(data.message || 'Account created — awaiting approval.');
    } catch (err) {
      setReqError(err.message);
    } finally {
      setReqLoading(false);
    }
  };

  const resetRequest = async (e) => {
    e.preventDefault();
    setResetError(''); setResetMessage(''); setResetLoading(true);
    try {
      const res = await fetch('/api/auth/reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');
      setResetMessage(data.message || 'A reset token has been generated.');
      if (data.resetToken) setResetToken(data.resetToken);
    } catch (err) {
      setResetError(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-3 flex gap-1 bg-gray-50 border-b border-gray-200 rounded-t-2xl">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => switchTab(t.id)}
              className={`flex-1 px-2 py-2 rounded-lg text-sm font-semibold transition ${
                tab === t.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          {(tab === 'signin' || tab === 'admin') && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {tab === 'admin' ? 'Admin sign-in' : 'Sign in'}
              </h1>
              <p className="text-sm text-gray-500 mb-6">
                {tab === 'admin'
                  ? 'Use the administrator credentials configured for this site.'
                  : 'Access the compliance playbooks once your account is approved.'}
              </p>
              {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>}
              {info && <div className="mb-4 p-3 rounded-lg bg-blue-50 text-blue-700 text-sm border border-blue-200">{info}</div>}
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={INPUT_CLASS} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className={INPUT_CLASS} />
                </div>
                <button disabled={loading}
                  className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">
                  {loading ? 'Signing in…' : tab === 'admin' ? 'Sign in as admin' : 'Sign in'}
                </button>
              </form>
            </>
          )}

          {tab === 'request' && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Request access</h1>
              <p className="text-sm text-gray-500 mb-6">Create an account. An admin reviews it before you can sign in.</p>
              {reqError && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">{reqError}</div>}
              {reqMessage && <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm border border-emerald-200">{reqMessage}</div>}
              <form onSubmit={requestAccess} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} className={INPUT_CLASS} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work email</label>
                  <input type="email" required value={reqEmail} onChange={e => setReqEmail(e.target.value)} className={INPUT_CLASS} />
                </div>
                <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  On approval you'll receive a temporary password which you can change after your first sign-in (or via the reset tab).
                </p>
                <button disabled={reqLoading}
                  className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">
                  {reqLoading ? 'Submitting…' : 'Request access'}
                </button>
              </form>
            </>
          )}

          {tab === 'forgot' && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Reset password</h1>
              <p className="text-sm text-gray-500 mb-6">Generate a token, then set a new password.</p>
              {resetMessage && <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm border border-emerald-200">{resetMessage}</div>}
              {resetError && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">{resetError}</div>}
              <form onSubmit={resetRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" required value={resetEmail} onChange={e => setResetEmail(e.target.value)} className={INPUT_CLASS} />
                </div>
                <button disabled={resetLoading}
                  className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">
                  {resetLoading ? 'Generating token…' : 'Generate reset token'}
                </button>
              </form>
              {resetToken && (
                <div className="mt-4 text-sm text-gray-600">
                  <p className="mb-1">Your reset token:</p>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 font-mono text-xs break-all">{resetToken}</div>
                  <p className="text-xs text-gray-500 mt-2">
                    Copy it and then reset on the same flow, or use it in the dedicated reset page after signing out.
                  </p>
                </div>
              )}
            </>
          )}

          <div className={`${tab === 'signin' || tab === 'admin' ? 'mt-6 pt-4 border-t border-gray-100' : 'mt-6'} relative`}>
            <div
              onMouseEnter={() => setShowAbout(true)}
              onMouseLeave={() => setShowAbout(false)}
              className="inline-flex items-center gap-2 group cursor-pointer"
              onClick={() => setShowAbout(true)}
            >
              <span className="inline-flex items-center gap-2 text-[#7c3aed] text-sm font-semibold group-hover:underline transition">
                <UserRound className="w-4 h-4" /> About the author
              </span>
            </div>
          </div>
        </div>
      </div>

      <AuthorAboutPopup open={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
}