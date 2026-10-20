import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import ResponsiveTable from '../components/ResponsiveTable';

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
      <ResponsiveTable
        data={others.map(u => ({
          id: u._id,
          name: u.name + (String(u._id) === String(user._id) ? ' (you)' : ''),
          email: u.email,
          role: u.role,
          status: isDeleted(u) ? 'Deleted' : u.status,
          joined: new Date(u.createdAt).toLocaleDateString()
        }))}
        columns={[
          { key: 'name', header: 'Name', sortable: true },
          { key: 'email', header: 'Email', sortable: true },
          { key: 'role', header: 'Role', sortable: true },
          { key: 'status', header: 'Status', sortable: true },
          { key: 'joined', header: 'Joined', sortable: true }
        ]}
        caption="All users with role and status management"
        filename="admin-users.csv"
        exportLabel="Export Users"
        isDark={false}
        enableSort
        defaultSortKey="joined"
        defaultSortDir="desc"
      />
      <p className="text-[11px] text-gray-400 mt-3">Reset pwd sets the user's password back to the default temporary password. Deactivate blocks sign-in without removing the record; Delete hides the account (restorable).</p>
    </div>
  );
}
