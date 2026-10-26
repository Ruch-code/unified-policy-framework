import { useState } from 'react';
import { Siren, Clock, Users, Database, ShieldOff, Landmark, Megaphone, ClipboardList, ChevronDown, AlertTriangle, Copy, Check } from 'lucide-react';

/*
 * Tabletop scenario: an AI vendor of an Indian digital lending NBFC is breached over a long
 * holiday weekend. Regulatory timelines as understood in October 2026; verify applicability
 * for your entity type before relying on them. Not legal advice.
 */

const TIMELINE = [
  { t: 'Fri 22:40 (T+0)', d: 'Vendor emails the security contact: an attacker used a stolen vendor admin credential to access a storage bucket holding customer uploads and chat transcripts. Detection is the moment the NBFC becomes aware; the 6-hour regulatory clocks start here.' },
  { t: 'T+15 min', d: 'On-call engineer acknowledges, opens the incident channel and pages the security lead, who becomes Incident Commander (IC).' },
  { t: 'T+45 min', d: 'Pre-approved containment runs: vendor API keys revoked, integration switched off behind its feature flag, KYC falls back to manual review, chatbot replaced by a "human support" message.' },
  { t: 'T+1 h', d: 'Severity set to Critical (Sev 1): customer personal and financial data, regulated entity, possible fraud use. CISO, CTO, DPO, Legal and CEO informed.' },
  { t: 'T+4 h', d: 'Initial reports drafted with what is known so far. Partial facts are acceptable; follow-ups will add detail.' },
  { t: 'T+6 h (Sat 04:40)', d: 'Deadline: report to RBI through DAKSH and to CERT-In. Submitted with incident summary, data categories, containment taken, and contact person.' },
  { t: 'T+12 to 24 h', d: 'Vendor shares access logs and indicators. Team identifies affected customers and checks own systems for any use of vendor-held tokens.' },
  { t: 'T+24 to 48 h', d: 'Customer notice and FAQ published, support staffed up, fraud rules tightened on new loan applications using exposed identities.' },
  { t: 'T+72 h', d: 'Detailed update to regulators. Once DPDP breach rules are in force, the detailed report to the Data Protection Board is also due at 72 hours.' },
  { t: 'Day 7 to 30', d: 'Root cause report, vendor reassessment, contract changes, board risk committee briefing, lessons learned and tabletop re-run.' },
];

const SKELETON = [
  'Published on-call rota with a named primary and deputy for each role, including holidays',
  'Delegated authority: the IC can disable a vendor integration and notify regulators without waiting for the CEO',
  'Pre-approved containment playbook per critical vendor (revoke keys, kill switch, fallback process)',
  'Regulator report templates pre-filled with entity details, stored where on-call can reach them',
  'Out-of-band contact list (phone numbers, personal numbers for key roles) in case email or chat is affected',
  'Clear rule: if a role cannot be reached within 30 minutes, the deputy acts; nobody waits for Monday',
];

const MATRIX = [
  { level: 'Sev 1 Critical', when: 'Customer personal or financial data exposed, regulated service disrupted, or fraud risk', who: 'IC, CISO, CTO, DPO, Legal, CEO, Comms lead, Head of Lending Ops', within: '30 to 60 min, any time', board: 'Board risk committee chair within 24 h' },
  { level: 'Sev 2 High', when: 'Vendor breach with internal data only, or unconfirmed customer data exposure', who: 'IC, CISO, CTO, DPO, Legal', within: '2 h', board: 'Next scheduled risk committee' },
  { level: 'Sev 3 Medium', when: 'Vendor security event with no data access confirmed', who: 'Security lead, vendor manager', within: 'Same business day', board: 'Monthly report' },
  { level: 'Sev 4 Low', when: 'Vendor advisory, patch notice, no impact', who: 'Vendor manager', within: 'Next business day', board: 'Quarterly summary' },
];

const DATA_HELD = [
  { item: 'Uploaded KYC documents: PAN card images, address proof', cls: 'Restricted', note: 'Identity data; high fraud value. Should be masked or tokenised before sending to an AI vendor where possible.' },
  { item: 'Aadhaar copies uploaded by customers', cls: 'Restricted', note: 'Aadhaar numbers should be masked (only last four digits visible) before any third-party processing. Unmasked Aadhaar at a vendor is a serious finding in its own right.' },
  { item: 'Bank statements and salary slips', cls: 'Restricted', note: 'Financial data used for credit decisions; enables targeted fraud and social engineering.' },
  { item: 'Chat transcripts from the support bot', cls: 'Confidential', note: 'Often contain loan IDs, phone numbers, EMI issues and sometimes health or family details volunteered by customers.' },
  { item: 'Prompts, model outputs and usage logs', cls: 'Internal', note: 'Can reveal system prompts, business rules and internal API endpoints.' },
  { item: 'API keys and webhook secrets issued to the vendor', cls: 'Restricted', note: 'If exposed, attackers can call your systems as the vendor. Rotate immediately.' },
];

const CLASS_CLS = {
  Restricted: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800',
  Confidential: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  Internal: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600',
};

const CONTAIN = [
  { h: 'Cut the connection', items: ['Revoke and rotate every API key, OAuth token and webhook secret shared with the vendor', 'Turn off the integration with its feature flag; switch to manual KYC and human support', 'Block the vendor\'s IP ranges and callbacks at the gateway until they confirm containment'] },
  { h: 'Check for spread into your systems', items: ['Search your logs for any use of vendor-held credentials after the earliest known attacker activity', 'Review any write access the vendor had (for example updating loan application status)', 'Check whether the same credentials or SSO trust are used by other vendors'] },
  { h: 'Scope the exposure', items: ['Ask the vendor for: affected buckets or tables, time window, records accessed or exported, attacker indicators, sub-processors involved', 'Map vendor record IDs to your customer list to count affected people by data type', 'Confirm whether data was encrypted and who held the keys'] },
  { h: 'Limit harm to customers', items: ['Add fraud rules: flag new loan applications, device changes or bank account changes using exposed identities', 'Watch for phishing calls or messages pretending to be from the company', 'Prepare to help customers if their documents are misused'] },
  { h: 'Preserve evidence', items: ['Keep your own logs, vendor communications and decisions with timestamps', 'Request the vendor preserve their logs and forensic images', 'Record every decision and who made it in the incident log'] },
];

const REGULATORS = [
  { who: 'RBI', when: 'Within 6 hours of detection', how: 'Through the RBI DAKSH portal, under the Cybersecurity, Technology Risk, Resilience and Assurance Framework Directions issued 31 July 2026. Confirm the direction that applies to your NBFC category.', note: 'Outsourcing a function to a vendor does not move accountability; the NBFC reports and remains responsible.' },
  { who: 'CERT-In', when: 'Within 6 hours of noticing the incident', how: 'Using CERT-In\'s incident reporting form or email, as required by the CERT-In Directions of April 2022. RBI also expects proactive notification to CERT-In.', note: 'Send what you know; incomplete details can be updated later.' },
  { who: 'Data Protection Board (DPDP Act)', when: 'Initial intimation without delay; detailed report within 72 hours', how: 'Under Section 8(6) and Rule 7 of the DPDP Rules 2025, through the Board\'s prescribed process.', note: 'The breach notification provisions come into force around May 2027, 18 months after the Rules were notified in November 2025. Until then, prepare to the same standard; customers and partners already expect it.' },
  { who: 'Affected customers', when: 'Without undue delay, once facts are confirmed', how: 'SMS and email in plain language, plus an in-app notice and FAQ; under the DPDP Rules (when in force) notice must cover what happened, likely consequences, steps taken and steps the person can take.', note: 'Coordinate timing with regulator reports so customers do not hear first from the media.' },
  { who: 'Others to consider', when: 'As applicable', how: 'Cyber crime complaint to police, co-lending bank partners under contract, cyber insurer (often within 24 to 72 hours under the policy), and GDPR authorities within 72 hours if EU residents are affected.', note: 'Check contracts and insurance policy now; their deadlines are easy to miss.' },
];

const HOLDING = `We are aware of a security incident at one of our technology service providers that may have affected some customer information. We acted immediately to disconnect the provider and protect customer accounts, and our services remain available. We have informed the relevant authorities and are working with the provider to understand exactly what happened. We will contact affected customers directly with clear guidance. We will never ask for your OTP, PIN or password.`;

const CUSTOMER = `Dear customer, we are writing to let you know about a security incident at a technology provider we use for document processing and customer support. On [date], an unauthorised person accessed files held by the provider, which may have included [documents you uploaded / chat messages]. We disconnected the provider immediately and have informed the authorities. What you can do: be cautious of calls or messages asking for OTPs or payments, review your loan and bank activity, and contact us at [contact] if anything looks unusual. We are sorry this happened and will keep you updated.`;

const PR_DO = ['One spokesperson; legal and DPO review every statement', 'Say what you know, what you did, and what customers should do', 'Publish after or alongside regulator reports, not before', 'Brief support staff with an FAQ before customers are notified', 'Monitor social media and app reviews; respond with the same message'];
const PR_DONT = ['Do not say "no data was affected" until confirmed', 'Do not blame or name the vendor publicly until agreed with legal', 'Do not speculate on attacker identity or numbers', 'Do not stay silent if media are already reporting it'];

function CopyBox({ title, text }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-lg p-3 bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700">
      <div className="flex items-center justify-between gap-2 mb-1">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">{title}</p>
        <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(text); } catch { /* ignore */ } setCopied(true); setTimeout(() => setCopied(false), 1200); }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="text-sm text-gray-700 dark:text-slate-200 italic">{text}</p>
    </div>
  );
}

function Section({ id, Icon, title, open, onToggle, children }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
      <button type="button" onClick={() => onToggle(id)} aria-expanded={open} className="w-full flex items-center gap-3 p-4 text-left">
        <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 flex items-center justify-center shrink-0"><Icon className="w-4 h-4" /></span>
        <span className="flex-1 font-bold text-sm text-gray-900 dark:text-white">{title}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-4 text-sm">{children}</div>}
    </div>
  );
}

export default function AiVendorBreachScenario() {
  const [open, setOpen] = useState(['timeline']);
  const toggle = id => setOpen(o => (o.includes(id) ? o.filter(x => x !== id) : [...o, id]));
  const li = x => <li key={x} className="flex gap-2 text-gray-700 dark:text-slate-200"><span>-</span><span>{x}</span></li>;

  return (
    <div className="bg-white rounded-2xl border border-rose-200 dark:border-rose-800 p-5" id="ai-vendor-breach-scenario">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
        <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 flex items-center justify-center"><Siren className="w-4 h-4" /></span>
        Scenario: AI vendor breached on a holiday weekend (Indian digital lending NBFC)
      </h3>
      <p className="text-sm text-gray-600 dark:text-slate-300 max-w-3xl mb-4">
        A mid-size digital lending NBFC uses an AI vendor for two things: reading KYC and income documents uploaded by loan applicants, and a customer support chatbot. On the Friday night of a long festival weekend, with most of the team away, the vendor reports that an attacker accessed its storage. This walk-through shows what happens, who does what, and when regulators hear about it.
      </p>

      <div className="space-y-2">
        <Section id="timeline" Icon={Clock} title="Timeline: the first 72 hours and beyond" open={open.includes('timeline')} onToggle={toggle}>
          <ol className="relative border-l-2 border-rose-200 dark:border-rose-800 ml-2 space-y-3">
            {TIMELINE.map(e => (
              <li key={e.t} className="relative pl-4">
                <span className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full bg-rose-500" />
                <p className="font-semibold text-gray-900 dark:text-white">{e.t}</p>
                <p className="text-gray-700 dark:text-slate-200">{e.d}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="skeleton" Icon={Users} title="Running the response with a skeleton team" open={open.includes('skeleton')} onToggle={toggle}>
          <p className="text-gray-600 dark:text-slate-300 mb-2">Regulatory clocks do not pause for weekends or festivals. What makes the difference is preparation done before the incident:</p>
          <ul className="space-y-1">{SKELETON.map(li)}</ul>
        </Section>

        <Section id="matrix" Icon={AlertTriangle} title="Escalation matrix" open={open.includes('matrix')} onToggle={toggle}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead><tr className="text-left text-[11px] uppercase tracking-wide text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-700">
                <th className="p-2">Severity</th><th className="p-2">Trigger</th><th className="p-2">Who is notified</th><th className="p-2">Within</th><th className="p-2">Board</th>
              </tr></thead>
              <tbody>
                {MATRIX.map((m, i) => (
                  <tr key={m.level} className={`align-top border-b border-gray-100 dark:border-slate-800 ${i === 0 ? 'bg-rose-50/60 dark:bg-rose-900/20' : ''}`}>
                    <td className="p-2 font-semibold text-gray-900 dark:text-white whitespace-nowrap">{m.level}</td>
                    <td className="p-2 text-gray-700 dark:text-slate-200">{m.when}</td>
                    <td className="p-2 text-gray-700 dark:text-slate-200">{m.who}</td>
                    <td className="p-2 text-gray-700 dark:text-slate-200 whitespace-nowrap">{m.within}</td>
                    <td className="p-2 text-gray-700 dark:text-slate-200">{m.board}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">This scenario is Sev 1. Every role has a named deputy; the Incident Commander owns decisions until the CISO takes over.</p>
        </Section>

        <Section id="data" Icon={Database} title="What data did the vendor hold, and was it classified?" open={open.includes('data')} onToggle={toggle}>
          <div className="space-y-2 mb-4">
            {DATA_HELD.map(d => (
              <div key={d.item} className="flex flex-wrap items-start gap-2 rounded-lg p-3 border border-gray-200 dark:border-slate-700">
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${CLASS_CLS[d.cls]}`}>{d.cls}</span>
                <div className="flex-1 min-w-[200px]">
                  <p className="font-semibold text-gray-900 dark:text-white">{d.item}</p>
                  <p className="text-gray-600 dark:text-slate-300">{d.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
              <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300 mb-1">If data was classified and minimised</p>
              <ul className="space-y-1">{['Scoping takes hours: the vendor data inventory already lists data types and record counts', 'Aadhaar masked and documents deleted after extraction, so exposure is limited', 'Regulator reports can state categories and volumes with confidence'].map(li)}</ul>
            </div>
            <div className="rounded-lg p-3 bg-rose-50 border border-rose-200 dark:bg-rose-900/30 dark:border-rose-800">
              <p className="text-[11px] font-bold uppercase tracking-wide text-rose-800 dark:text-rose-300 mb-1">If it was not</p>
              <ul className="space-y-1">{['Nobody knows what the vendor kept or for how long; everything must be assumed exposed', 'Full documents retained indefinitely turn a contained incident into a large breach', 'Regulator and customer notices become broad and alarming because scope cannot be narrowed'].map(li)}</ul>
            </div>
          </div>
        </Section>

        <Section id="contain" Icon={ShieldOff} title="Containing the blast radius" open={open.includes('contain')} onToggle={toggle}>
          <div className="grid md:grid-cols-2 gap-3">
            {CONTAIN.map(c => (
              <div key={c.h} className="rounded-lg p-3 bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">{c.h}</p>
                <ul className="space-y-1">{c.items.map(li)}</ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="regulators" Icon={Landmark} title="Who is notified, when and how" open={open.includes('regulators')} onToggle={toggle}>
          <div className="space-y-2">
            {REGULATORS.map(r => (
              <div key={r.who} className="rounded-lg p-3 border border-gray-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-bold text-gray-900 dark:text-white">{r.who}</p>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">{r.when}</span>
                </div>
                <p className="text-gray-700 dark:text-slate-200"><span className="font-semibold">How: </span>{r.how}</p>
                <p className="text-gray-600 dark:text-slate-300 mt-1 text-xs">{r.note}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="pr" Icon={Megaphone} title="PR and customer communication" open={open.includes('pr')} onToggle={toggle}>
          <div className="grid md:grid-cols-2 gap-3 mb-3">
            <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
              <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300 mb-1">Do</p>
              <ul className="space-y-1">{PR_DO.map(li)}</ul>
            </div>
            <div className="rounded-lg p-3 bg-rose-50 border border-rose-200 dark:bg-rose-900/30 dark:border-rose-800">
              <p className="text-[11px] font-bold uppercase tracking-wide text-rose-800 dark:text-rose-300 mb-1">Do not</p>
              <ul className="space-y-1">{PR_DONT.map(li)}</ul>
            </div>
          </div>
          <div className="space-y-2">
            <CopyBox title="Holding statement (media and social)" text={HOLDING} />
            <CopyBox title="Customer notice (adapt once facts are confirmed)" text={CUSTOMER} />
          </div>
        </Section>

        <Section id="after" Icon={ClipboardList} title="After the incident: what changes" open={open.includes('after')} onToggle={toggle}>
          <ul className="space-y-1">{[
            'Root cause report from the vendor, reviewed by your security team, with evidence of fixes',
            'Contract update: breach notice to you within 24 hours or less, audit rights, deletion certificates, sub-processor approval',
            'Data minimisation: mask Aadhaar and redact documents before sending; vendor deletes source files after extraction',
            'Per-vendor kill switch and fallback process tested quarterly',
            'Vendor data inventory with classification, kept in the vendor register',
            'Board risk committee briefing and a repeat tabletop exercise within 90 days',
          ].map(li)}</ul>
        </Section>
      </div>

      <p className="text-xs text-gray-500 dark:text-slate-400 mt-4">Fictional scenario for training. Regulatory timelines reflect the position as of October 2026; confirm which directions apply to your entity and check for updates. Not legal advice.</p>
    </div>
  );
}
