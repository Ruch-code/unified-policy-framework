import { useState } from 'react';
import { Link } from 'react-router-dom';

const TYPES = ['Access a copy of my data', 'Correct my data', 'Delete my data and account', 'Unsubscribe and delete my newsletter address', 'Other privacy question'];
const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const FIELD = 'mt-1 w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded text-sm bg-white dark:bg-slate-900';

export default function DataRequest() {
  const [f, setF] = useState({ name: '', email: '', type: TYPES[0], details: '', consent: false, website: '' });
  const [state, setState] = useState({ status: 'idle', msg: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: 'loading', msg: '' });
    try {
      const res = await fetch('/api/privacy-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const data = await res.json().catch(() => ({}));
      setState({ status: res.ok ? 'done' : 'error', msg: data.message || 'Something went wrong. Please try again.' });
    } catch { setState({ status: 'error', msg: 'Network error. Please try again.' }); }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-serif font-bold mb-2 ${H}`}>Data and privacy requests</h1>
      <p className={`text-sm mb-6 ${TXT}`}>Use this form to ask for a copy of your data, correct it, or delete it along with your account or newsletter subscription. Requests are answered within 30 days. See the <Link to="/privacy" className="underline">Privacy Policy</Link> for what is collected and why.</p>
      {state.status === 'done' ? (
        <p role="status" className={`text-sm p-3 border border-gray-300 dark:border-slate-700 rounded ${TXT}`}>{state.msg}</p>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <label className={`block text-sm font-medium ${H}`}>Your name<input required maxLength={100} value={f.name} onChange={set('name')} className={FIELD} autoComplete="name" /></label>
          <label className={`block text-sm font-medium ${H}`}>Email address used on this site<input type="email" required maxLength={200} value={f.email} onChange={set('email')} className={FIELD} autoComplete="email" /></label>
          <label className={`block text-sm font-medium ${H}`}>What would you like to do?<select value={f.type} onChange={set('type')} className={FIELD}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
          <label className={`block text-sm font-medium ${H}`}>Details (optional)<textarea rows={4} maxLength={2000} value={f.details} onChange={set('details')} className={FIELD} placeholder="For corrections, say what should change." /></label>
          <input type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} className="hidden" aria-hidden="true" />
          <label className={`flex gap-2 items-start text-sm ${TXT}`}>
            <input type="checkbox" required checked={f.consent} onChange={set('consent')} className="mt-1" />
            <span>I agree that the details above will be used only to handle this request, as described in the <Link to="/privacy" className="underline">Privacy Policy</Link>.</span>
          </label>
          {state.status === 'error' && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{state.msg}</p>}
          <button disabled={state.status === 'loading' || !f.consent} className="px-4 py-2 rounded bg-[#344c67] text-white text-sm font-semibold disabled:opacity-50">{state.status === 'loading' ? 'Sending' : 'Send request'}</button>
        </form>
      )}
    </div>
  );
}
