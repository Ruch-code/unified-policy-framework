import { useState } from 'react';
import { X, Mail, Linkedin, CheckCircle, Loader2 } from 'lucide-react';

const API = '/api/newsletter/subscribe';

export default function NewsletterPopup({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [msg, setMsg] = useState('');

  if (!open) return null;

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('done');
        setMsg(data.message || 'Subscribed!');
      } else {
        setStatus('error');
        setMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMsg('Could not reach the server. Please try again.');
    }
  };

  const shareLinkedIn = () => {
    const text = 'Check out the Unified Compliance newsletter — practical guides on certifications, security and privacy.';
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition" aria-label="Close">
          <X className="w-4 h-4" />
        </button>
        <div className="h-2 bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#6366f1]" />

        <div className="p-6">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#7c3aed] bg-indigo-50 px-2.5 py-1 rounded-full">
            <Mail className="w-3.5 h-3.5" /> Newsletter
          </span>
          <h2 className="mt-3 text-xl font-extrabold text-gray-900 leading-tight">
            Get compliance insights, straight to your inbox
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Practical, no-jargon guides on certifications, security &amp; privacy — plus the frameworks that actually matter for your business.
          </p>

          {status === 'done' ? (
            <div className="mt-5 flex flex-col items-center text-center">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
              <p className="mt-2 font-semibold text-gray-800">{msg}</p>
            </div>
          ) : (
            <form onSubmit={subscribe} className="mt-5">
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {status === 'error' && <p className="mt-1.5 text-xs text-red-600">{msg}</p>}
              <button type="submit" disabled={status === 'loading'}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-60 transition">
                {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing…</> : 'Subscribe'}
              </button>
            </form>
          )}

          <div className="mt-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[11px] text-gray-400 font-medium">or share on</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <button onClick={shareLinkedIn}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-[#0a66c2] text-white py-2.5 rounded-xl font-semibold hover:bg-[#084d94] transition">
            <Linkedin className="w-4 h-4" /> Share on LinkedIn
          </button>

          <p className="mt-4 text-[11px] text-gray-400 text-center">Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
