import SortableGrid from './SortableGrid.jsx';

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

export default function AiFraudGuide() {
  return (
    <details className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 my-4" id="ai-fraud-guide">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">AI-enabled fraud and social engineering: awareness guide</summary>
      <div className="mt-3">
        <p className={P}>AI makes fraud more convincing: perfect writing, cloned voices and fake video. The defence is the same for all of them: slow down, verify through a channel you already trust, and report. Use this guide with employees, managers, executives, IT and security teams.</p>

        <h3 className={H}>Summary</h3>
        <SortableGrid label="AI-enabled fraud types" headers={['Fraud type', 'What it is', 'Most at risk', 'Awareness activity', 'How to measure']} file="ai-fraud-awareness" min={1100}
          rows={FRAUDS.map((f) => [f[0], f[1], f[3], f[9], f[10]])} />

        <h3 className={H}>Playbook by fraud type</h3>
        <div className="space-y-2">
          {FRAUDS.map((f) => (
            <details key={f[0]} className="rounded-lg border border-gray-200 dark:border-slate-700 p-3">
              <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">{f[0]}</summary>
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                <div><p className={`${P} font-semibold`}>Example</p><p className={P}>{f[2]}</p></div>
                <div><p className={`${P} font-semibold`}>Warning signs</p><Ul items={f[4]} /></div>
                <div><p className={`${P} font-semibold`}>Preventive controls</p><Ul items={f[5]} /></div>
                <div><p className={`${P} font-semibold`}>Employee steps</p><Ul items={f[6]} /></div>
                <div><p className={`${P} font-semibold`}>Security team steps</p><Ul items={f[7]} /></div>
                <div><p className={`${P} font-semibold`}>Incident response</p><Ul items={f[8]} /></div>
              </div>
            </details>
          ))}
        </div>

        <h3 className={H}>What employees should do if they suspect AI fraud</h3>
        <Ul items={['Stop the conversation, politely if needed.', 'Do not click links or download files.', 'Do not share passwords, MFA codes, customer data, payroll data or payment details.', 'Verify using a trusted channel, such as a known phone number or the official portal.', 'Report to security immediately.', 'Keep evidence: emails, screenshots, phone numbers, URLs and timestamps.']} />

        <h3 className={H}>Security team response playbook</h3>
        <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
          {['Triage the report and set severity.', 'Preserve evidence.', 'Identify affected users, systems and data.', 'Revoke sessions if credentials may be exposed.', 'Reset passwords and re-register MFA where needed.', 'Review sign-in logs, mailbox rules, OAuth grants and endpoint alerts.', 'Block malicious domains, senders, phone numbers and files.', 'Notify legal, HR, finance, leadership or communications depending on impact.', 'Document the timeline and lessons learned, and update training with the real example.'].map((x) => <li key={x}>{x}</li>)}
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
