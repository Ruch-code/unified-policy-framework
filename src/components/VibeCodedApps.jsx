import { useState } from 'react';
import { Sparkles, AlertTriangle, ShieldCheck, ListChecks, ClipboardCheck, Check, X, Workflow } from 'lucide-react';

/*
 * High-risk apps and tools built with vibe coding platforms (prompt-to-app builders and
 * AI coding agents), often by business users outside the normal engineering pipeline.
 * Platform names are examples only.
 */

const RISKS = [
  { t: 'No review, no pipeline', d: 'The app goes live from the builder in minutes. No pull request, no peer review, no SAST or SCA, no change record. Every control on this page is skipped.' },
  { t: 'Secrets in the browser', d: 'API keys for payment, email or AI providers end up in front-end code where anyone can read them in the browser developer tools.', link: 'hardcoded-secrets' },
  { t: 'Database open to anyone', d: 'Apps built on hosted backends often ship with row-level security or access rules switched off, so any user can read or change every row, including other customers\' data.', link: 'exposed-admin' },
  { t: 'Weak or missing authentication', d: 'Login is added as an afterthought, admin pages are only hidden in the menu, and IDs in the URL can be changed to see other records.', link: 'exposed-admin' },
  { t: 'Classic injection flaws', d: 'Generated code can build queries from text, render user input unescaped, or call outside URLs supplied by users.', link: 'sqli' },
  { t: 'Personal data with no governance', d: 'Customer lists, health or financial data are uploaded to test the app. No ROPA entry, no DPIA screening, no retention rule, and often a new processor nobody assessed.' },
  { t: 'Public by default', d: 'Preview links and published apps are reachable on the internet and sometimes indexed by search engines.' },
  { t: 'No owner, no lifecycle', d: 'The person who built it leaves or moves on. Nobody patches it, rotates its keys or switches it off, and it never appears in the asset inventory.' },
  { t: 'Prompt injection in AI features', d: 'If the app passes user or document text to an AI model with access to tools or data, that text can steer it.' },
  { t: 'The platform is a vendor too', d: 'Code, data and secrets sit with the builder platform and its hosting and database partners, which need the same vendor review as any processor.' },
];

const CHECKS = [
  { id: 'pii', q: 'Does it store or display personal, customer, health or financial data?' },
  { id: 'prod', q: 'Is it connected to production systems, a production database or company SaaS with write access?' },
  { id: 'public', q: 'Can people outside the company reach it (public URL, customer-facing)?' },
  { id: 'creds', q: 'Does it hold API keys, tokens or service accounts?' },
  { id: 'decide', q: 'Does it make or support decisions about people (pricing, approval, access)?' },
  { id: 'ai', q: 'Does it send company or customer data to an AI model?' },
];

const TIERS = {
  low: { label: 'Low risk', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800', text: 'Internal prototype with no sensitive data. Register it, use the approved platform, and set an expiry date.' },
  medium: { label: 'Medium risk', cls: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800', text: 'Apply the minimum security baseline below, name an owner, and run a quick security review before wider use.' },
  high: { label: 'High risk', cls: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800', text: 'Treat it as production software: move the code into a repository and the normal pipeline, run a full security review (including DAST on the live URL), privacy screening and vendor assessment before launch.' },
};

const BASELINE = [
  'Registered in the asset and application inventory with a named business owner and technical owner',
  'Built only on an approved platform and workspace under company SSO, not personal accounts',
  'Login required, with roles enforced on the server, not just hidden buttons',
  'Database access rules (for example row-level security) switched on and tested with two different users',
  'No secrets in front-end code; keys kept server-side in the platform secret store and rotated if ever exposed',
  'Code exported or synced to a company repository so it gets secret scanning, SAST and SCA',
  'DAST scan against the deployed URL before it goes live, and after major changes',
  'Real personal data only after privacy review; use test or masked data while building',
  'Logging switched on, and the app included in incident response and access reviews',
  'Review date set: promote to a supported app, or switch it off and delete its data',
];

const GOVERNANCE = [
  { t: 'Do not ban it, channel it', d: 'Blocking all vibe coding pushes people to personal accounts. Offer an approved platform with SSO and a simple path to production.' },
  { t: 'Lightweight intake', d: 'A short form (the six questions above) decides the risk tier before anything goes live. Low risk proceeds; high risk goes to security.' },
  { t: 'Assess the platform once', d: 'Review the builder platform as a vendor: data location, sub-processors such as hosting and database providers, AI training terms, SSO, audit logs and deletion.' },
  { t: 'Find what already exists', d: 'Search for apps on platform subdomains, check expense reports and SSO logs, and ask teams. Most organisations find more than they expected.' },
];

const AUDIT = [
  'If the app touches in-scope data or systems, it is in scope for the audit, however it was built.',
  'Auditors will ask for change management evidence. "Built and published from the builder" has none, so route changes through a repository and approvals.',
  'Expect questions on access reviews, MFA and vendor management for the platform itself.',
  'An unknown app found during the audit is worse than a known one with a documented risk acceptance.',
];

function jump(id) {
  const el = typeof document !== 'undefined' ? document.getElementById(`vuln-${id}`) : null;
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function VibeCodedApps() {
  const [ans, setAns] = useState({});
  const yes = Object.values(ans).filter(Boolean).length;
  const answered = Object.keys(ans).length;
  const tier = yes === 0 ? 'low' : (ans.pii || ans.prod || ans.public || yes >= 3) ? 'high' : 'medium';
  const li = x => <li key={x} className="flex gap-2"><span>-</span><span>{x}</span></li>;

  return (
    <div className="bg-white rounded-2xl border border-rose-200 dark:border-rose-800 p-5" id="vibe-coded-apps">
      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
        <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 flex items-center justify-center"><Sparkles className="w-4 h-4" /></span>
        Vibe-coded apps: high-risk tools built outside the pipeline
      </h4>
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 max-w-3xl">
        Vibe coding platforms (for example Lovable, Bolt, Replit or v0) let anyone describe an app and publish it in minutes. Sales builds a quoting tool, operations builds a customer portal, a founder builds an internal admin panel. Useful, but these apps usually skip every check above, and many handle real customer data.
      </p>

      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Why they are high risk</p>
      <div className="grid md:grid-cols-2 gap-2 mb-6">
        {RISKS.map(r => (
          <div key={r.t} className="rounded-lg p-3 bg-rose-50 border border-rose-200 dark:bg-rose-900/30 dark:border-rose-800 text-sm">
            <p className="font-semibold text-rose-900 dark:text-rose-200">{r.t}</p>
            <p className="text-gray-700 dark:text-slate-200 mt-1">{r.d}</p>
            {r.link && (
              <button type="button" onClick={() => jump(r.link)} className="mt-1 text-xs font-semibold text-rose-700 dark:text-rose-300 underline decoration-dotted">See in the Vulnerability Guide</button>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 mb-6">
        <p className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2"><ListChecks className="w-4 h-4 text-indigo-600 dark:text-indigo-300" /> Is this app high risk? Quick check</p>
        <p className="text-xs text-gray-600 dark:text-slate-300 mb-3">Answer for one app. Personal data, production access or public exposure makes it high risk on its own.</p>
        <div className="space-y-2 mb-4">
          {CHECKS.map(c => (
            <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-gray-700 dark:text-slate-200">{c.q}</span>
              <span className="flex gap-1.5">
                {[['Yes', true], ['No', false]].map(([label, val]) => (
                  <button key={label} type="button" aria-pressed={ans[c.id] === val} onClick={() => setAns(a => ({ ...a, [c.id]: val }))}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border ${ans[c.id] === val ? (val ? 'bg-rose-600 text-white border-rose-600' : 'bg-emerald-600 text-white border-emerald-600') : 'bg-white text-gray-700 border-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
                    {val ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} {label}
                  </button>
                ))}
              </span>
            </div>
          ))}
        </div>
        {answered > 0 ? (
          <div className={`rounded-lg p-3 border ${TIERS[tier].cls}`}>
            <p className="text-xs font-bold uppercase tracking-wide">{TIERS[tier].label}{answered < CHECKS.length ? ' (so far)' : ''}</p>
            <p className="text-sm text-gray-700 dark:text-slate-200 mt-1">{TIERS[tier].text}</p>
          </div>
        ) : (
          <p className="text-xs text-gray-500 dark:text-slate-400">Answer the questions to see the risk tier.</p>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Minimum security baseline</p>
          <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1">{BASELINE.map(li)}</ul>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-slate-400 flex items-center gap-1.5"><Workflow className="w-3.5 h-3.5" /> Governing it without killing it</p>
          {GOVERNANCE.map(g => (
            <div key={g.t} className="rounded-lg p-3 border border-gray-200 dark:border-slate-700 text-sm">
              <p className="font-semibold text-gray-900 dark:text-white">{g.t}</p>
              <p className="text-gray-700 dark:text-slate-200 mt-0.5">{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-4 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 mb-4">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-1.5"><ClipboardCheck className="w-3.5 h-3.5" /> How auditors see it</p>
        <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1">{AUDIT.map(li)}</ul>
      </div>

      <div className="rounded-xl p-4 bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700 text-sm">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Example</p>
        <p className="text-gray-700 dark:text-slate-200">A customer success manager builds a renewal tracker in an afternoon and shares the link with the team. It pulls customer contacts and contract values from the CRM using an admin API key placed in the front-end code, and the database has no access rules. Anyone with the link can read every customer record, and the key can be copied from the browser. The quick check marks it high risk: the key is rotated, access rules are switched on, the code moves to a company repository behind SSO, and the CRM connection is replaced with a read-only integration.</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-slate-400 mt-3">Platform names are examples, not endorsements. The same risks apply to apps generated with AI coding agents and published directly.</p>
    </div>
  );
}
