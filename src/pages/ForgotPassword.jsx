import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [step, setStep] = useState('request'); // request | confirm | done
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const request = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      const res = await fetch('/api/auth/reset-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');
      setMessage(data.message || 'A reset token has been generated.');
      if (data.resetToken) setToken(data.resetToken);
      setStep('confirm');
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const confirm = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      const res = await fetch('/api/auth/reset-confirm', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, resetToken: token, newPassword }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Reset failed');
      setMessage(data.message); setStep('done');
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Reset password</h1>
        <p className="text-sm text-gray-500 mb-6">Generate a token, then set a new password.</p>
        {message && <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm border border-emerald-200">{message}</div>}
        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>}

        {step === 'done' ? (
          <p className="text-sm text-gray-700">You can now <Link to="/login" className="text-indigo-600 font-medium hover:underline">sign in</Link> with your new password.</p>
        ) : (
          <>
            {step === 'request' && (
              <form onSubmit={request} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <button disabled={loading} className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">
                  {loading ? 'Generating token…' : 'Generate reset token'}
                </button>
              </form>
            )}
            {step === 'confirm' && (
              <form onSubmit={confirm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reset token</label>
                  <input required value={token} onChange={e => setToken(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono" />
                  <p className="text-[11px] text-gray-400 mt-1">Token was returned in the previous step (auto-filled).</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
                  <input type="password" required minLength={6} value={newPassword} onChange={e => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <button disabled={loading} className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">
                  {loading ? 'Resetting…' : 'Set new password'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
