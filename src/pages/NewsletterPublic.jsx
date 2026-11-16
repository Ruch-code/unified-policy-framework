import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import SubscribeForm from '../components/newsletter/SubscribeForm.jsx';
import { markdownToHtml } from '../utils/markdown.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const MUTED = 'text-gray-500 dark:text-slate-400';
const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '');
const share = (slug) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/newsletter/${slug}`)}`;

function Archive() {
  const [state, setState] = useState({ status: 'loading', issues: [] });
  useEffect(() => {
    fetch('/api/newsletter/archive').then((r) => (r.ok ? r.json() : Promise.reject())).then((d) => setState({ status: 'ready', issues: d.issues || [] }))
      .catch(() => setState({ status: 'error', issues: [] }));
  }, []);
  return (
    <section aria-labelledby="nl-archive" className="mt-10">
      <h2 id="nl-archive" className={`text-xl font-bold ${H}`}>Past issues</h2>
      {state.status === 'loading' && <p className={`mt-3 text-sm ${MUTED}`}>Loading…</p>}
      {state.status === 'error' && <p className={`mt-3 text-sm ${MUTED}`}>Past issues could not be loaded right now.</p>}
      {state.status === 'ready' && !state.issues.length && <p className={`mt-3 text-sm ${MUTED}`}>The first issue is on its way.</p>}
      <ul className="mt-3 space-y-3">
        {state.issues.map((i) => (
          <li key={i.slug} className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-[#1e293b]">
            <p className={`text-xs ${MUTED}`}>{fmt(i.date)}</p>
            <Link to={`/newsletter/${i.slug}`} className={`block mt-0.5 font-semibold ${H} underline-offset-2 hover:underline break-words`}>{i.title}</Link>
            {i.excerpt && <p className={`mt-1 text-sm ${TXT} break-words`}>{i.excerpt}</p>}
            <a href={share(i.slug)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs underline text-sky-700 dark:text-sky-300">Share on LinkedIn</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NewsletterHome() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-serif font-bold ${H}`}>The OneLens newsletter</h1>
      <p className={`mt-2 ${TXT}`}>One practical GRC note every two weeks: what changed, what to do, and which template to use.</p>
      <div className="mt-6 border border-gray-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-[#1e293b]">
        <SubscribeForm source="newsletter-page" />
      </div>
      <Archive />
    </div>
  );
}

export function NewsletterIssue() {
  const { slug } = useParams();
  const [state, setState] = useState({ status: 'loading', issue: null });
  useEffect(() => {
    setState({ status: 'loading', issue: null });
    fetch(`/api/newsletter/archive?slug=${encodeURIComponent(slug)}`).then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setState({ status: 'ready', issue: d.issue })).catch(() => setState({ status: 'missing', issue: null }));
  }, [slug]);
  const i = state.issue;
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/newsletter" className="text-sm underline text-sky-700 dark:text-sky-300">All issues</Link>
      {state.status === 'loading' && <p className={`mt-6 ${MUTED}`}>Loading…</p>}
      {state.status === 'missing' && <p className={`mt-6 ${TXT}`}>This issue is not available.</p>}
      {i && (
        <article className="mt-4">
          <p className={`text-sm ${MUTED}`}>{fmt(i.date)}</p>
          <h1 className={`mt-1 text-3xl font-serif font-bold ${H} break-words`}>{i.title}</h1>
          {/* Body is escaped inside markdownToHtml before formatting is applied. */}
          <div className={`mt-4 nl-body ${TXT} break-words`} dangerouslySetInnerHTML={{ __html: markdownToHtml(i.body) }} />
          <a href={share(i.slug)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm underline text-sky-700 dark:text-sky-300">Share on LinkedIn</a>
        </article>
      )}
      <div className="mt-10 border border-gray-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-[#1e293b]">
        <SubscribeForm source="issue-page" />
      </div>
    </div>
  );
}

const MESSAGES = {
  confirmed: ['You are subscribed', 'Thanks for confirming. A welcome email with the control mapping download is on its way.'],
  unsubscribed: ['You are unsubscribed', 'You will not get any more newsletter emails. You can subscribe again at any time.'],
  invalid: ['That link has expired or is not valid', 'Subscribe again below and we will send you a fresh link.'],
  error: ['Something went wrong', 'Please try the link again in a few minutes.'],
};

export function NewsletterStatus() {
  const [params] = useSearchParams();
  const [title, text] = MESSAGES[params.get('s')] || MESSAGES.error;
  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className={`text-2xl font-bold ${H}`}>{title}</h1>
      <p className={`mt-2 ${TXT}`}>{text}</p>
      {params.get('s') === 'confirmed' && <a href="/OneLens_Control_Mapping.xlsx" download className="mt-4 inline-block px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-700 text-white dark:bg-indigo-500 dark:text-slate-950">Download the mapping (Excel)</a>}
      {params.get('s') === 'invalid' && <div className="mt-4"><SubscribeForm source="status-page" /></div>}
      <p className="mt-6"><Link to="/newsletter" className="text-sm underline text-sky-700 dark:text-sky-300">Back to the newsletter</Link></p>
    </div>
  );
}
