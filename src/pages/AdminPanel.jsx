import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const STATUS_META = {
  pending: { label: 'Pending', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
  active: { label: 'Active', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  deactivated: { label: 'Deactivated', cls: 'bg-red-100 text-red-700 border-red-200' },
};
const isDeleted = (u) => !!u.deletedAt;

export default function AdminPanel() {
  const { user, api } = useAuth();
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true); setErr('');
    try { const d = await api('/api/admin/users'); setUsers(d.users || []); }
    catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const act = async (id, action) => {
    setMsg(''); setErr('');
    try {
      const d = await api('/api/admin/user-update', { method: 'POST', body: JSON.stringify({ id, action }) });
      setMsg(d.message || 'Done');
      await load();
    } catch (e) { setErr(e.message); }
  };

  const approve = async (id, doApprove) => {
    setMsg(''); setErr('');
    try {
      const d = await api('/api/admin/approve', { method: 'POST', body: JSON.stringify({ id, action: doApprove ? 'approve' : 'reject' }) });
      setMsg(d.message || 'Done');
      await load();
    } catch (e) { setErr(e.message); }
  };

  const pending = users.filter(u => u.status === 'pending' && !isDeleted(u));
  const others = users.filter(u => !(u.status === 'pending' && !isDeleted(u)));

  if (!user || user.role !== 'admin') {
    return <div className="container px-4 py-16 text-center text-gray-600">Admin access required.</div>;
  }

  return (
    <div className="container px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin — User Access Control</h1>
      <p className="text-gray-500 text-sm mb-6">Review access requests, approve accounts, and manage users. Signed in as {user.email}.</p>

      <Link to="/newsletter" className="inline-flex items-center gap-2 mb-4 bg-[#7c3aed] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#6d28d9] transition">
        <Send className="w-4 h-4" /> Send Newsletter
      </Link>

      {msg && <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm border border-emerald-200">{msg}</div>}
      {err && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">{err}</div>}
      {loading && <p className="text-gray-500 text-sm">Loading users…</p>}

      {/* Pending approvals */}
      <h2 className="text-lg font-bold text-gray-800 mt-6 mb-3">Pending approvals ({pending.length})</h2>
      {pending.length === 0 && <p className="text-sm text-gray-500 bg-gray-50 border border-gray-100 rounded-xl p-4">No pending requests.</p>}
      <div className="space-y-3">
        {pending.map(u => (
          <div key={u._id} className="border border-amber-200 bg-amber-50/40 rounded-xl p-4 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[180px]">
              <div className="font-semibold text-gray-900">{u.name}</div>
              <div className="text-sm text-gray-600">{u.email} · requested {new Date(u.createdAt).toLocaleString()}</div>
            </div>
            <button onClick={() => approve(u._id, true)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">Approve</button>
            <button onClick={() => approve(u._id, false)} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition">Reject</button>
          </div>
        ))}
      </div>

      {/* All users */}
      <h2 className="text-lg font-bold text-gray-800 mt-8 mb-3">All users ({others.length})</h2>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Role</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Joined</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {others.map(u => {
              const sm = STATUS_META[u.status] || STATUS_META.pending;
              return (
                <tr key={u._id} className={isDeleted(u) ? 'opacity-50' : ''}>
                  <td className="p-3 font-medium text-gray-900">{u.name}{String(u._id) === String(user._id) && <span className="ml-1 text-[10px] text-indigo-500">(you)</span>}</td>
                  <td className="p-3 text-gray-600">{u.email}</td>
                  <td className="p-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${u.role === 'admin' ? 'bg-violet-100 text-violet-700 border-violet-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>{u.role}</span></td>
                  <td className="p-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${isDeleted(u) ? 'bg-gray-200 text-gray-600 border-gray-200' : sm.cls}`}>{isDeleted(u) ? 'Deleted' : u.status}</span></td>
                  <td className="p-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1.5">
                      {u.status === 'deactivated' && !isDeleted(u) && <button onClick={() => act(u._id, 'activate')} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100">Activate</button>}
                      {u.status === 'active' && !isDeleted(u) && <button onClick={() => act(u._id, 'deactivate')} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100">Deactivate</button>}
                      {!isDeleted(u) && <button onClick={() => act(u._id, 'reset-password')} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100">Reset pwd</button>}
                      {u.role !== 'admin' && !isDeleted(u) && <button onClick={() => act(u._id, 'make-admin')} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100">Make admin</button>}
                      {u.role === 'admin' && !isDeleted(u) && <button onClick={() => act(u._id, 'revoke-admin')} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200">Revoke admin</button>}
                      {!isDeleted(u) && <button onClick={() => act(u._id, 'delete')} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100">Delete</button>}
                      {isDeleted(u) && <button onClick={() => act(u._id, 'activate')} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200">Restore</button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-gray-400 mt-3">Reset pwd sets the user's password back to the default temporary password. Deactivate blocks sign-in without removing the record; Delete hides the account (restorable).</p>
    </div>
  );
}
