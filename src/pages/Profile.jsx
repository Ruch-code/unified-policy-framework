import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, changePassword, logout } = useAuth();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(''); setErr(''); setLoading(true);
    try {
      const d = await changePassword(current, next);
      setMsg(d.message || 'Password updated.'); setCurrent(''); setNext('');
    } catch (e2) { setErr(e2.message); }
    finally { setLoading(false); }
  };

  if (!user) return null;

  return (
    <div className="container px-4 py-12 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">My profile</h1>
      <p className="text-gray-500 text-sm mb-6">Signed in as <strong>{user.email}</strong> · role: <strong>{user.role}</strong></p>

      {msg && <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm border border-emerald-200">{msg}</div>}
      {err && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">{err}</div>}

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Change password</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current password</label>
            <input type="password" required value={current} onChange={e => setCurrent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
            <input type="password" required minLength={6} value={next} onChange={e => setNext(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
          <button disabled={loading} className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>

      {user.role === 'admin' && (
        <div className="mt-4 p-3 bg-violet-50 border border-violet-200 text-violet-700 text-sm rounded-xl">
          You have admin rights. <a href="/admin" className="font-semibold underline">Manage user access →</a>
        </div>
      )}
    </div>
  );
}
