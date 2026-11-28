import SortableGrid from './SortableGrid.jsx';
import { Monitor, Phone, Smartphone, Mail, Briefcase, Fingerprint, UserCheck, FileText, Bot, Megaphone, Ban, ShieldCheck, Siren, FileSearch, ArrowRight, ArrowDown, AlertTriangle, Shield, Lock, CheckCircle2, X } from 'lucide-react';

// Security awareness guide: AI-enabled fraud and social engineering, for employees, managers, executives, IT and security.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-slate-300';
const H = 'mt-4 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const Ul = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;

// [name, what, example, at risk, signs, prevent, employee, security, ir, activity, measure]
const FRAUDS = [
  ['Deepfake video fraud', 'A fake live or recorded video of a real person, usually a senior leader, used to pressure staff into acting.', 'A video call with someone who looks and sounds like the CFO asks finance to approve an urgent, confidential payment.', 'Finance, HR, legal, IT, executive assistants',
    ['Unusual urgency', 'Refusal to follow the normal approval process', 'Poor lip sync, odd pauses, unnatural lighting or strange voice timing', 'Request for secrecy', 'Request for payment, credentials or sensitive data'],
    ['Out-of-band verification for sensitive requests', 'Callback to known numbers', 'Dual approval for payments'],
    ['End the call politely and verify through a known channel', 'Never approve payments or share data on the call alone'],
    ['Train finance, HR, legal and IT on deepfake scenarios', 'Treat suspected executive impersonation as an incident and escalate immediately'],
    ['Preserve the meeting link, recording, invite and chat', 'Freeze or recall any payment through the bank', 'Check whether the executive account or calendar was compromised'],
    'Live demo of a deepfake in a leadership or finance briefing', 'Share of finance staff who correctly refuse a simulated deepfake request'],
  ['AI voice cloning and vishing', 'A cloned voice of a known person on a phone or voice message.', 'A caller who sounds like the CEO asks for gift cards, a wire transfer or approval of an MFA prompt.', 'Help desk, finance, assistants, anyone with privileged access',
    ['Panic or urgency', 'Asks to bypass the process', 'Requests secrecy', 'Refuses a video or callback', 'Unknown or withheld number'],
    ['Verbal passphrases for high-risk approvals', 'Callback via the trusted directory', 'Help desk identity checks before resets'],
    ['Hang up and call back on a known number', 'Never approve an MFA prompt because a caller asked'],
    ['Monitor help desk password and MFA reset requests', 'Log and escalate suspicious calls'],
    ['Record the number, time and what was asked', 'Block the number', 'Check for MFA approvals or resets on related accounts'],
    'Vishing simulation for the help desk and finance', 'Help desk reset requests verified correctly in tests'],
  ['Smishing with AI-written texts', 'Text messages written to look like HR, payroll, IT, delivery firms, banks or leaders.', 'An SMS from "Payroll" says salary will be held unless the employee logs in through a short link.', 'All staff, especially mobile and frontline workers',
    ['Shortened links', 'Urgent account warnings', 'Payroll or benefit threats', 'Requests to install an app', 'Unknown numbers'],
    ['Mobile device management where applicable', 'Domain blocking', 'Clear rule that IT never asks for passwords by text'],
    ['Do not tap the link; open the service directly', 'Report the SMS to security'],
    ['Block known malicious domains', 'Include smishing examples in campaigns'],
    ['Collect the number, text and link', 'Check whether anyone entered credentials', 'Reset and revoke sessions where needed'],
    'Monthly smishing examples in the newsletter or intranet', 'Number of smishing reports compared with previous months'],
  ['AI-generated phishing emails', 'Polished, error-free emails tailored with real names, projects and events.', 'An email from a lookalike vendor domain references a real invoice and links to a fake login page.', 'All staff, especially finance, procurement and admins',
    ['Unexpected attachment or link', 'New payment instructions or bank change', 'Login page that looks slightly wrong', 'Sender domain close but not exact'],
    ['SPF, DKIM and DMARC', 'Email security filtering', 'Phishing-resistant MFA'],
    ['Use the report button', 'Do not enter credentials from a link in an email'],
    ['Run simulations with realistic AI-style lures', 'Tune email rules and investigate reports quickly'],
    ['Pull back similar messages from all mailboxes', 'Reset credentials for anyone who entered them', 'Block the sender and domain'],
    'Tiered phishing simulations', 'Report rate and time to report rising; click rate falling'],
  ['Executive impersonation and business email compromise', 'Fake or compromised emails from leaders or vendors asking for money, data or bank changes.', 'A "CEO" email in a new thread asks finance to pay an acquisition deposit today and keep it confidential.', 'Finance, accounts payable, HR, executive assistants',
    ['Request bypasses the normal workflow', 'Change in payment details', 'Urgent confidential request', 'New thread instead of the existing one', 'Pressure to act before confirming'],
    ['Dual approval for payments and bank changes', 'Vendor changes verified with known contacts'],
    ['Pause and verify through a separate channel', 'Follow the payment process even for leaders'],
    ['Monitor inbox forwarding rules and suspicious logins', 'Train finance and HR separately', 'Keep a BEC playbook'],
    ['Recall or freeze payments with the bank immediately', 'Check mailbox rules and sign-ins for compromise', 'Notify finance leadership and legal'],
    'Finance and HR workshop with real BEC cases', 'Zero payments made to unverified bank changes'],
  ['Synthetic identity fraud', 'A made-up identity built with AI-generated documents, photos, CVs or references.', 'A new contractor passes onboarding with AI-generated ID and references, then requests wide access.', 'HR, procurement, vendor onboarding, customer onboarding',
    ['Inconsistent documents', 'Avoids live verification', 'Suspicious employment history', 'Contact details do not match claimed location', 'Pressure to onboard quickly'],
    ['Stronger identity verification at onboarding', 'Document checks through trusted sources', 'Background checks for sensitive roles'],
    ['Raise doubts with HR or security before onboarding'],
    ['Limit initial access for new users', 'Review access after probation or contractor onboarding'],
    ['Suspend access', 'Review what the identity accessed', 'Involve HR and legal'],
    'Training for HR and procurement on identity checks', 'Share of onboarding files with completed verification'],
  ['Fake job applicant or remote worker', 'A candidate using AI-generated CVs, scripted answers or a deepfake on camera, sometimes passing work to unknown third parties.', 'A hired remote engineer logs in from changing countries and devices and asks for production access in week one.', 'Hiring managers, HR, IT, security',
    ['Avoids live camera or odd video', 'Scripted-sounding answers', 'Identity does not match documents', 'Unusual locations or device changes', 'Requests unnecessary access early'],
    ['Verify identity before access is granted', 'Company-managed devices for sensitive work', 'Least privilege'],
    ['Tell HR and security about concerns during hiring'],
    ['Monitor impossible travel and unusual logins', 'Coordinate with HR and legal on suspected fraud'],
    ['Suspend access and preserve logs', 'Review code and data accessed', 'Check for data exfiltration'],
    'Briefing for hiring managers on spotting fake candidates', 'Identity verification completed before first login'],
  ['AI-generated invoice fraud', 'Fake invoices that look like real vendor invoices, often with changed bank details.', 'An invoice referencing a real purchase order arrives from a slightly different vendor domain with new bank details.', 'Accounts payable, procurement, project managers',
    ['New bank account details', 'Slight vendor name changes', 'Unusual sender address', 'Pressure to pay immediately', 'Mismatch with purchase order or contract'],
    ['Out-of-band verification of bank changes', 'Approval workflow for invoice changes', 'Three-way match with purchase order and receipt'],
    ['Check the invoice against the purchase order and vendor record'],
    ['Train accounts payable', 'Review payment logs for unusual activity'],
    ['Stop or recall the payment', 'Preserve the email and invoice', 'Alert the real vendor'],
    'Accounts payable exercise with fake invoices', 'Fake invoices caught in exercises and real cases'],
  ['Malicious AI chatbots or fake support agents', 'Fake support chats that ask for credentials, codes or remote access.', 'A support link in an SMS opens a chatbot that asks for an MFA code and to install remote access software.', 'All staff and customers',
    ['Asks for a password, token or MFA code', 'Asks to install unknown software', 'Support link came from an email or SMS', 'Suspicious domain', 'Pressure to act fast'],
    ['Published official support channels', 'Restricted remote access tools', 'Domain blocking'],
    ['Go to support portals directly, never through links in messages'],
    ['Monitor for unauthorised software installs'],
    ['Remove installed remote tools', 'Reset credentials and revoke sessions', 'Block the domain'],
    'Short guide to official support channels', 'Unauthorised remote access tools found on devices'],
  ['AI-generated misinformation and brand impersonation', 'Fake posts, websites, press releases or emails that use the company brand.', 'A lookalike website and fake social posts offer customers a refund in exchange for card details.', 'Customers, vendors, communications team, executives',
    ['Suspicious domains', 'Unverified social posts', 'Fake press releases', 'Customer complaints about strange messages', 'Unusual login or payment requests'],
    ['Lookalike domain and brand monitoring', 'Verified official channels'],
    ['Report suspected impersonation to security and communications'],
    ['Work with legal and communications', 'Request takedowns of fake domains and pages'],
    ['Preserve evidence', 'Issue customer alerts where needed', 'Track takedown progress'],
    'Brand impersonation briefing for customer-facing teams', 'Time from detection to takedown'],
];

const ICONS = [Monitor, Phone, Smartphone, Mail, Briefcase, Fingerprint, UserCheck, FileText, Bot, Megaphone];
const COLORS = ['bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300', 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300', 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300', 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300', 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300', 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300', 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300', 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300', 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'];

const RULE = [
  [Ban, 'Stop', 'Pause the call, chat or email. Urgency is the attacker\'s main tool.', 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'],
  [ShieldCheck, 'Verify', 'Use a channel you already trust: known number, official portal, in person.', 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'],
  [Siren, 'Report', 'Tell security straight away, even if you already clicked or shared.', 'border-sky-400 bg-sky-50 dark:bg-sky-900/20'],
  [FileSearch, 'Preserve', 'Keep emails, screenshots, numbers, URLs and times.', 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'],
];

function FieldList({ icon: Icon, title, items, tone }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-slate-700 p-3">
      <p className={`flex items-center gap-1.5 text-sm font-bold ${tone}`}><Icon className="w-4 h-4" aria-hidden="true" />{title}</p>
      <ul className="mt-1 space-y-1">{items.map((x) => <li key={x} className="flex gap-1.5 text-sm text-gray-700 dark:text-slate-300"><span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-60" />{x}</li>)}</ul>
    </div>
  );
}

function Box({ children, tone }) {
  return <div className={`rounded-lg border-2 px-3 py-2 text-sm text-center text-gray-900 dark:text-white ${tone}`}>{children}</div>;
}

export default function AiFraudGuide() {
  return (
    <details className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 my-4" id="ai-fraud-guide">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">AI-enabled fraud and social engineering: awareness guide</summary>
      <div className="mt-3">
        <p className={P}>AI makes fraud more convincing: perfect writing, cloned voices and fake video. The defence is the same for all of them: slow down, verify through a channel you already trust, and report. Use this guide with employees, managers, executives, IT and security teams.</p>

        <h3 className={H}>The golden rule</h3>
        <ol className="flex flex-col md:flex-row md:items-stretch gap-2" aria-label="Stop, verify, report, preserve">
          {RULE.map(([Icon, t, d, tone], i) => (
            <li key={t} className="flex flex-col md:flex-row items-center gap-2 flex-1">
              <div className={`flex-1 w-full rounded-xl border-2 p-3 ${tone}`}>
                <p className="flex items-center gap-2 font-bold text-gray-900 dark:text-white"><Icon className="w-5 h-5" aria-hidden="true" />{i + 1}. {t}</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-slate-300">{d}</p>
              </div>
              {i < RULE.length - 1 && <><ArrowRight className="hidden md:block w-5 h-5 text-gray-400 shrink-0" aria-hidden="true" /><ArrowDown className="md:hidden w-5 h-5 text-gray-400" aria-hidden="true" /></>}
            </li>
          ))}
        </ol>

        <h3 className={H}>Decision flow: should I act on this request?</h3>
        <div className="flex flex-col items-center gap-1.5 max-w-xl mx-auto" role="img" aria-label="If a request is urgent, secret, or involves money, credentials or data, stop and verify through a trusted channel. If verified, follow the normal process. If not, report it.">
          <Box tone="border-indigo-400">A request arrives by video, call, text, email or chat</Box>
          <ArrowDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
          <Box tone="border-amber-400 bg-amber-50 dark:bg-amber-900/20">Is it urgent, secret, or about money, passwords, MFA codes, data or bank details?</Box>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-xs font-bold text-gray-500 dark:text-slate-400">No</span>
              <Box tone="border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"><CheckCircle2 className="inline w-4 h-4 mr-1" aria-hidden="true" />Follow the normal process</Box>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-xs font-bold text-gray-500 dark:text-slate-400">Yes</span>
              <Box tone="border-rose-400 bg-rose-50 dark:bg-rose-900/20"><Ban className="inline w-4 h-4 mr-1" aria-hidden="true" />Stop and verify through a known channel</Box>
              <ArrowDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <div className="grid grid-cols-2 gap-2 w-full">
                <Box tone="border-emerald-400"><CheckCircle2 className="inline w-4 h-4 mr-1" aria-hidden="true" />Confirmed: proceed with normal approvals</Box>
                <Box tone="border-rose-500"><X className="inline w-4 h-4 mr-1" aria-hidden="true" />Not confirmed: report to security</Box>
              </div>
            </div>
          </div>
        </div>

        <h3 className={H}>The ten AI fraud types at a glance</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {FRAUDS.map((f, i) => { const Icon = ICONS[i]; return (
            <a key={f[0]} href={`#fraud-${i}`} className="rounded-xl border border-gray-200 dark:border-slate-700 p-3 hover:shadow-md transition-shadow">
              <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${COLORS[i]}`}><Icon className="w-5 h-5" aria-hidden="true" /></span>
              <p className="mt-2 text-sm font-bold text-gray-900 dark:text-white">{f[0]}</p>
              <p className="mt-0.5 text-xs text-gray-600 dark:text-slate-400">At risk: {f[3]}</p>
            </a>
          ); })}
        </div>

        <h3 className={H}>Summary table</h3>
        <SortableGrid label="AI-enabled fraud types" headers={['Fraud type', 'What it is', 'Most at risk', 'Awareness activity', 'How to measure']} file="ai-fraud-awareness" min={1100}
          rows={FRAUDS.map((f) => [f[0], f[1], f[3], f[9], f[10]])} />

        <h3 className={H}>Playbook by fraud type</h3>
        <div className="space-y-2">
          {FRAUDS.map((f, i) => { const Icon = ICONS[i]; return (
            <details key={f[0]} id={`fraud-${i}`} className="rounded-xl border border-gray-200 dark:border-slate-700 p-3 scroll-mt-24">
              <summary className="cursor-pointer flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${COLORS[i]}`}><Icon className="w-4 h-4" aria-hidden="true" /></span>{f[0]}
              </summary>
              <div className="mt-3 rounded-lg bg-gray-50 dark:bg-slate-800 p-3 text-sm text-gray-700 dark:text-slate-300"><strong>What it is:</strong> {f[1]}<br /><strong>Example:</strong> {f[2]}</div>
              <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                <FieldList icon={AlertTriangle} title="Warning signs" items={f[4]} tone="text-rose-700 dark:text-rose-300" />
                <FieldList icon={Lock} title="Preventive controls" items={f[5]} tone="text-indigo-700 dark:text-indigo-300" />
                <FieldList icon={UserCheck} title="What employees do" items={f[6]} tone="text-emerald-700 dark:text-emerald-300" />
                <FieldList icon={Shield} title="What security does" items={f[7]} tone="text-sky-700 dark:text-sky-300" />
                <FieldList icon={Siren} title="If it happens" items={f[8]} tone="text-orange-700 dark:text-orange-300" />
                <FieldList icon={CheckCircle2} title="Train and measure" items={[f[9], `Measure: ${f[10]}`]} tone="text-violet-700 dark:text-violet-300" />
              </div>
            </details>
          ); })}
        </div>

        <h3 className={H}>What employees should do if they suspect AI fraud</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[[Ban, 'Stop the conversation, politely if needed.', true], [X, 'Do not click links or download files.', true], [Lock, 'Do not share passwords, MFA codes, customer data, payroll data or payment details.', true], [ShieldCheck, 'Verify using a trusted channel, such as a known phone number or the official portal.', false], [Siren, 'Report to security immediately.', false], [FileSearch, 'Keep evidence: emails, screenshots, phone numbers, URLs and timestamps.', false]].map(([Icon, t, dont]) => (
            <div key={t} className={`flex items-start gap-2 rounded-lg border p-2.5 text-sm ${dont ? 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20' : 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20'} text-gray-800 dark:text-slate-200`}>
              <Icon className={`w-5 h-5 shrink-0 ${dont ? 'text-rose-600' : 'text-emerald-600'}`} aria-hidden="true" />{t}
            </div>
          ))}
        </div>

        <h3 className={H}>Security team response playbook</h3>
        <ol className="relative border-l-2 border-sky-300 dark:border-sky-700 ml-3 space-y-2">
          {['Triage the report and set severity.', 'Preserve evidence.', 'Identify affected users, systems and data.', 'Revoke sessions if credentials may be exposed.', 'Reset passwords and re-register MFA where needed.', 'Review sign-in logs, mailbox rules, OAuth grants and endpoint alerts.', 'Block malicious domains, senders, phone numbers and files.', 'Notify legal, HR, finance, leadership or communications depending on impact.', 'Document the timeline and lessons learned, and update training with the real example.'].map((x, i) => (
            <li key={x} className="ml-4 text-sm text-gray-700 dark:text-slate-300"><span className="absolute -left-3 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold">{i + 1}</span>{x}</li>
          ))}
        </ol>

        <h3 className={H}>Controls that reduce AI-enabled fraud risk</h3>
        <SortableGrid label="Controls against AI-enabled fraud" headers={['Control', 'What it stops']} file="ai-fraud-controls" min={640} rows={[
          ['Phishing-resistant MFA (passkeys, security keys)', 'Stolen passwords and MFA codes being reused'],
          ['Password managers and passkeys', 'Logging in to lookalike sites'],
          ['Out-of-band verification', 'Deepfake, voice clone and BEC requests'],
          ['Dual approval for payments', 'A single tricked person moving money'],
          ['Vendor bank change verification', 'Invoice and vendor fraud'],
          ['Help desk identity verification', 'Vishing-driven password and MFA resets'],
          ['SPF, DKIM and DMARC', 'Spoofing of your own domain'],
          ['Endpoint detection and response', 'Malware and remote access tools installed after a lure'],
          ['Data loss prevention', 'Sensitive data sent out after a request'],
          ['Security awareness training', 'People acting before verifying'],
          ['Incident response tabletop exercises', 'Slow or confused response to a real case'],
        ]} />
      </div>
    </details>
  );
}
