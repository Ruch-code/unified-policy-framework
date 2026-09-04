import { useState } from 'react';
import { Send, Linkedin, Loader2, CheckCircle, Users } from 'lucide-react';

const API = '/api/newsletter/publish';

export default function NewsletterEditor() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const publish = async () => {
    if (!title.trim() || !body.trim()) return;
    setStatus('loading');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: title.trim(), body: body.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('done');
        setResult(data);
      } else {
        setStatus('error');
        setError(data.message || 'Publish failed.');
      }
    } catch {
      setStatus('error');
      setError('Could not reach the server.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Newsletter</h1>
        <p className="text-sm text-gray-600 mt-1">
          Write a newsletter and publish it — it's emailed to every subscriber and you can share it on LinkedIn.
        </p>
      </div>

      {/* Input card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Compliance in 2026: what actually changed"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <label className="block text-sm font-semibold text-gray-700 mt-4 mb-1.5">Body</label>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={10}
          placeholder={`Write your newsletter here…\n\nSeparate paragraphs with a blank line. Plain text is fine.`}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
        />
        {status === 'error' && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={publish}
            disabled={status === 'loading' || !title.trim() || !body.trim()}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition">
            {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Publishing…</> : <><Send className="w-4 h-4" /> Publish to list</>}
          </button>
          <span className="text-xs text-gray-500">Publishes to all subscribers</span>
        </div>
      </div>

      {/* Result card */}
      {status === 'done' && result && (
        <div className="mt-5 bg-white rounded-2xl border border-emerald-200 shadow-sm p-5">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <CheckCircle className="w-5 h-5" /> Published successfully
          </div>
          <p className="mt-2 text-sm text-gray-700">
            Emailed <strong>{result.sent}</strong> of <strong>{result.subscribers}</strong> subscribers.
          </p>
          <a
            href={result.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-[#0a66c2] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#084d94] transition">
            <Linkedin className="w-4 h-4" /> Share on LinkedIn
          </a>
          <p className="mt-3 text-xs text-gray-500 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Subscribers receive the newsletter in their inbox; the LinkedIn button posts it to your network.
          </p>
        </div>
      )}
    </div>
  );
}