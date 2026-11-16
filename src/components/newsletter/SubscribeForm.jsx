import { useState } from 'react';

const LINE = 'border-gray-300 dark:border-slate-600';

// Public subscribe form. Double opt-in happens server side; the reply is the same whether or not the address is known.
export default function SubscribeForm({ compact = false, source = 'site', dark = false }) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [state, setState] = useState({ status: 'idle', msg: '' });
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  const submit = async (e) => {
    e.preventDefault();
    if (!valid) { setState({ status: 'error', msg: 'Please enter a valid email address.' }); return; }
    setState({ status: 'loading', msg: '' });
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), website, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setState({ status: 'done', msg: data.message || 'Check your inbox for a confirmation link.' }); setEmail(''); }
      else setState({ status: 'error', msg: data.message || 'Something went wrong. Please try again.' });
    } catch {
      setState({ status: 'error', msg: 'Could not reach the server. Please try again.' });
    }
  };

  const text = dark ? 'text-gray-300' : 'text-gray-600 dark:text-slate-400';
  const id = `nl-email-${source}`;
  return (
    <div className={compact ? '' : 'max-w-xl'}>
      {!compact && <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-gray-900 dark:text-white'}`}>Subscribe and get the 113-control cross-framework mapping (Excel).</p>}
      {state.status === 'done' ? (
        <p role="status" className={`mt-2 text-sm ${dark ? 'text-emerald-300' : 'text-emerald-700 dark:text-emerald-300'}`}>{state.msg}</p>
      ) : (
        <form onSubmit={submit} noValidate className="mt-2 flex flex-col sm:flex-row gap-2">
          <label htmlFor={id} className="sr-only">Email address</label>
          <input id={id} type="email" inputMode="email" autoComplete="email" required value={email}
            onChange={(e) => { setEmail(e.target.value); if (state.status === 'error') setState({ status: 'idle', msg: '' }); }}
            placeholder="you@company.com" aria-invalid={state.status === 'error'} aria-describedby={`${id}-help`}
            className={`flex-1 min-w-0 px-3 py-2 rounded-lg border ${LINE} text-sm bg-white text-gray-900 dark:bg-slate-900 dark:text-white`} />
          <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
            <label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
          </div>
          <button type="submit" disabled={state.status === 'loading'}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-700 text-white hover:bg-indigo-800 disabled:opacity-60 dark:bg-indigo-500 dark:text-slate-950 dark:hover:bg-indigo-400">
            {state.status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}
      <p id={`${id}-help`} className={`mt-1.5 text-xs ${state.status === 'error' ? 'text-red-600 dark:text-red-300' : text}`} role={state.status === 'error' ? 'alert' : undefined}>
        {state.status === 'error' ? state.msg : 'No spam. Unsubscribe anytime.'}
      </p>
    </div>
  );
}
