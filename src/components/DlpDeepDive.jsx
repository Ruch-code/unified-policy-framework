// DLP deep dive: channels (email, SharePoint/OneDrive, endpoint, chat, cloud apps, GenAI), design, tuning, rollout,
// incident handling, audit evidence and framework mapping. Product names are examples, not endorsements.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300';
const H = 'mt-4 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';
const Ul = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: head.length > 3 ? 860 : 620 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Part({ id, title, children }) {
  return (
    <details id={id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">{title}</summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

export default function DlpDeepDive() {
  return (
    <details id="dlp-deep-dive" className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Data Loss Prevention (DLP) in depth: email, SharePoint and OneDrive, endpoint, chat, cloud apps and GenAI</summary>
      <div className="mt-3 space-y-3">
        <p className={P}>DLP finds sensitive data and stops it leaving where it should not, whether by mistake or on purpose. It works in three places: <strong>data in motion</strong> (email, web uploads, chat), <strong>data at rest</strong> (SharePoint, OneDrive, file shares, cloud storage) and <strong>data in use</strong> (copy, paste, print, USB on the endpoint). DLP only works well on top of a data classification scheme and an inventory of where sensitive data lives.</p>

        <Part id="dlp-detect" title="1. How DLP recognises sensitive data">
          <Table head={['Method', 'How it works', 'Good for', 'Watch out for']} rows={[
            ['Sensitive information types', 'Patterns plus checksums and nearby keywords, for example a card number that passes the Luhn check near the word "card".', 'Card numbers, Aadhaar, PAN, passport, bank account, health IDs', 'Too-loose patterns cause false positives; tune confidence and counts.'],
            ['Exact data match (EDM)', 'Matches against a hashed copy of your real records, such as the customer table.', 'Your actual customer or patient data, with very few false positives', 'Needs a maintained, hashed data source.'],
            ['Document fingerprinting', 'Matches documents built from a template, such as a contract or HR form.', 'Standard forms and templates', 'Only catches documents close to the template.'],
            ['Trainable classifiers', 'Machine-learning models that recognise a type of content, such as source code or resumes.', 'Unstructured content with no fixed pattern', 'Needs good training samples; review accuracy.'],
            ['Sensitivity labels', 'A label applied by the user, by default, or automatically, such as Confidential or Restricted.', 'Making policies follow the classification scheme', 'Labels are only as good as labelling coverage.'],
            ['Context', 'Who sends it, to whom, from which device or location, and how much.', 'Reducing noise, for example allowing internal sharing but blocking external', 'Complex rules are hard to maintain.'],
          ]} />
        </Part>

        <Part id="dlp-email" title="2. Email DLP">
          <p className={P}>Email remains the most common leak channel: the wrong recipient, a forwarded attachment, or bulk data sent to a personal address.</p>
          <Ul items={[
            'Where it runs: in the mail platform as a transport or outbound rule (for example Microsoft Purview DLP for Exchange Online, or Google Workspace DLP for Gmail), or in a secure email gateway.',
            'Typical rules: block or require justification when sensitive data goes to external recipients; force encryption for certain content; block auto-forwarding to personal domains; alert on bulk attachments.',
            'User experience: policy tips warn the sender before they send, with an option to override and give a business reason, which is logged.',
            'Common gaps: personal webmail from the browser bypasses mail DLP (cover it with endpoint or web DLP); password-protected zip files cannot be inspected; images of documents need OCR to be detected.',
            'Pair with: misdirected-email protection (recipient warnings), external sender banners and mail encryption.',
          ]} />
        </Part>

        <Part id="dlp-sharepoint" title="3. SharePoint, OneDrive and Teams files (data at rest and sharing)">
          <Ul items={[
            'Discovery first: scan sites and drives to find where sensitive data already sits, and who it is shared with.',
            'Sharing controls: block or warn on sharing labelled or sensitive files with "Anyone" links or external guests; restrict sharing on sensitive sites.',
            'Labels: apply sensitivity labels at site or file level; auto-label files containing sensitive types; labels can carry encryption that travels with the file.',
            'Oversharing review: report on files with broad internal access ("Everyone except external users") as well as external links. This matters more once AI assistants can search everything a user can open.',
            'Equivalent in Google Workspace: Drive DLP rules and trust rules for external sharing.',
            'Common gaps: legacy file shares and personal cloud storage outside the tenant; files synced to unmanaged devices.',
          ]} />
        </Part>

        <Part id="dlp-endpoint" title="4. Endpoint DLP">
          <p className={P}>Endpoint DLP runs on the laptop or desktop and controls what happens to sensitive data in use.</p>
          <Table head={['Activity', 'Typical control']} rows={[
            ['Copy to USB or removable media', 'Block, or allow only encrypted company-issued devices, with logging'],
            ['Upload to websites', 'Block uploads of sensitive files to unapproved cloud storage or personal email in the browser'],
            ['Copy and paste', 'Block or warn when pasting sensitive content into unapproved apps or sites'],
            ['Print', 'Block or audit printing of labelled documents'],
            ['Bluetooth, network shares, sync clients', 'Restrict transfer of sensitive files to unapproved locations'],
            ['Screen capture', 'Limit on highly restricted content where the platform supports it'],
          ]} />
          <Ul items={[
            'Requires managed devices: onboarded to MDM and the DLP agent (for example Microsoft Purview Endpoint DLP, or agents from other DLP vendors). Unmanaged devices should get browser-only or virtual desktop access.',
            'Browser controls: enterprise browser policies (for example Chrome Enterprise or Edge for Business) extend DLP to web uploads and paste.',
            'Operating system coverage varies by product; check Windows, macOS and Linux support before relying on it.',
          ]} />
        </Part>

        <Part id="dlp-chat-cloud-ai" title="5. Chat, cloud apps (CASB) and GenAI">
          <Ul items={[
            'Chat: DLP for Teams, Slack or Google Chat can block or hide messages containing sensitive data, especially in channels with external guests.',
            'Cloud apps: a CASB (cloud access security broker) discovers shadow IT, applies DLP to sanctioned SaaS through APIs, and controls uploads to unsanctioned apps.',
            'GenAI: block or warn on pasting or uploading sensitive data to public AI tools; route staff to an approved enterprise AI with data protection terms; log prompts where policy allows. Apply labels so approved AI assistants respect access and do not surface restricted content.',
          ]} />
        </Part>

        <Part id="dlp-design" title="6. Designing policies: from data to rules">
          <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
            <li>Start from the classification scheme and the data inventory: what is Restricted or Confidential, and where it lives.</li>
            <li>Pick the top risks, such as customer personal data to personal email, source code to public repositories, or card data anywhere.</li>
            <li>For each risk, choose the channel, the detection method, the action and who is exempt (for example finance sending payroll to the bank).</li>
            <li>Decide the action ladder: audit only, then notify the user, then block with override and justification, then hard block.</li>
            <li>Route alerts to an owner with a triage playbook and a response time.</li>
          </ol>
        </Part>

        <Part id="dlp-rollout" title="7. Rollout and tuning">
          <Table head={['Phase', 'What to do', 'Exit criteria']} rows={[
            ['1. Discover', 'Run in audit mode on all channels for 2 to 4 weeks; scan data at rest.', 'You know volume, top senders and false positive rate'],
            ['2. Tune', 'Adjust confidence levels, counts, exclusions and trusted domains.', 'False positives low enough that alerts are worth reviewing'],
            ['3. Notify', 'Turn on user policy tips and overrides with justification.', 'Users understand why they are warned; overrides are reviewed'],
            ['4. Enforce', 'Block high-confidence, high-risk cases; keep override for lower risk.', 'Business processes still work; exceptions documented'],
            ['5. Operate', 'Weekly alert review, monthly policy review, quarterly reporting.', 'Metrics trend in the right direction'],
          ]} />
          <p className={P}>Timings are an example; set them by data volume and risk. Communicate before enforcing, and give a fast path to request exceptions.</p>
        </Part>

        <Part id="dlp-incidents" title="8. Handling a DLP alert">
          <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
            <li>Triage: real sensitive data or a false positive? What data, how much, to whom?</li>
            <li>Contain: recall or block the message, remove the sharing link, revoke access, or wipe the device as policy allows.</li>
            <li>Investigate: one-off mistake or a pattern? Involve HR or legal if intent is suspected, and preserve evidence.</li>
            <li>Decide on notification: if personal data reached someone unauthorised, assess breach duties under the applicable law (for example DPDP Rule 7, GDPR Articles 33 and 34, HIPAA Breach Notification Rule).</li>
            <li>Learn: coach the user, tune the policy, fix the process that caused it.</li>
          </ol>
          <p className={P}>Privacy and employment law: DLP monitors staff activity, so tell employees in policy and notices, keep alert access need-to-know, and follow local employee-monitoring rules.</p>
        </Part>

        <Part id="dlp-metrics-evidence" title="9. Metrics, audit evidence and framework mapping">
          <Table head={['Metric', 'Why it matters']} rows={[
            ['Coverage: users, devices, mailboxes and sites under DLP', 'Gaps are where data leaks'],
            ['Alerts per week by channel and policy', 'Trend and workload'],
            ['False positive rate', 'Shows tuning quality'],
            ['Overrides with justification, and how many were reviewed', 'Shows whether users bypass controls'],
            ['Mean time to triage high-severity alerts', 'Response speed'],
            ['Confirmed incidents and repeat offenders', 'Real risk and training need'],
          ]} />
          <h3 className={H}>Evidence an auditor will ask for</h3>
          <Ul items={['DLP policy documents and the data classification scheme', 'Policy configuration exports showing channels, rules and actions', 'Coverage reports for endpoints, mailboxes and sites', 'Sample alerts with triage notes and outcomes', 'Exception register with approvals and expiry', 'Evidence of periodic policy review and tuning']} />
          <Table head={['Framework', 'Where DLP fits']} rows={[
            ['ISO/IEC 27001:2022', 'A.8.12 Data leakage prevention; also A.5.12 classification, A.5.13 labelling, A.5.14 information transfer'],
            ['SOC 2', 'CC6.1 and CC6.7 (restricting and protecting data in transmission), C1.1 confidentiality'],
            ['NIST CSF 2.0', 'PR.DS (data security) outcomes'],
            ['PCI DSS v4.0', 'Supports finding and protecting stored and transmitted cardholder data (Requirements 3 and 4)'],
            ['HIPAA', 'Supports transmission security, 164.312(e)'],
            ['DPDP Act', 'Supports reasonable security safeguards, Section 8(5) and Rule 6'],
          ]} />
          <p className={P}>Mappings are indicative; DLP supports these controls but does not satisfy them alone.</p>
        </Part>

        <Part id="dlp-interview" title="10. Interview answer: how would you roll out DLP?">
          <p className={P}>"I start with the data, not the tool: the classification scheme and where Restricted and Confidential data lives. I pick the top leak risks, usually customer personal data and source code leaving by email, file sharing, endpoint and GenAI tools. I run every policy in audit mode first to see the real volume and false positives, tune it, then turn on user tips with justified overrides, and only then block the high-confidence, high-risk cases. Alerts go to a named owner with a triage playbook, and I report coverage, false positives, overrides and confirmed incidents. Staff are told about monitoring, and exceptions are documented with an expiry."</p>
        </Part>
      </div>
    </details>
  );
}
