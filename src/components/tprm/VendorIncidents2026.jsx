// Late-2026 third-party incidents: what happened (as reported), how to remediate, and which controls would have helped.
const P = 'text-sm text-gray-700 dark:text-gray-300';

const INCIDENTS = [
  {
    name: 'JPMorgan Chase, Visa and Mastercard (data analytics vendor)',
    happened: 'Attackers allegedly used compromised credentials of a cloud data analytics provider to reach customer AWS environments through IAM roles set up to give that vendor access (claimed activity 14 to 26 October 2026). Chase said marketing data held by vendors, possibly names and email addresses, was accessed. Visa said a provider in Asia Pacific was involved and no payment data was affected. Mastercard said a limited number of email addresses from a benefit programme were exposed. The n0n group claimed it and leaked data on 16 November 2026. Reporting names the suspected vendor, but this was not confirmed by the vendor at publication.',
    remediate: ['Revoke and reissue every cross-account role and external ID granted to the vendor.', 'Review CloudTrail for AssumeRole calls from the vendor account during the window.', 'Identify exactly which data sets the vendor role could read and notify affected customers where required.', 'Warn customers about targeted phishing using the leaked emails.'],
    controls: ['Least privilege on vendor IAM roles, scoped to specific buckets and actions, with an expiry or periodic recertification.', 'Data minimisation: share only the marketing fields the vendor needs, ideally pseudonymised.', 'Alerting on unusual vendor role use (new IPs, volume, off-hours).', 'Contract clauses requiring the vendor to notify within a set number of hours and to protect its own credentials with MFA and rotation.', 'Inventory of every third-party role in your cloud accounts, reviewed quarterly.'],
    src: [['BleepingComputer', 'https://www.bleepingcomputer.com/news/security/vendor-data-breach-exposes-chase-visa-mastercard-customer-info/'], ['ABC News', 'https://abcnews.com/US/jpmorgan-chase-reports-cyberattack-party-service-providers/story?id=138287705']],
  },
  {
    name: 'Expedia (same supply chain campaign)',
    happened: 'Expedia confirmed a cyberattack involving a third-party provider and said the investigation into scope is ongoing. Reporting links it to a stolen vendor key used by the same n0n group. The attackers claim hundreds of millions of loyalty, traveller and account records; Expedia has not confirmed these figures.',
    remediate: ['Contain by revoking vendor keys and roles, then scope the data actually reached.', 'Force password resets where hashed credentials may be exposed, and monitor for credential stuffing.', 'Protect loyalty balances with step-up verification on redemptions.', 'Notify regulators and customers once scope is confirmed, across all affected brands.'],
    controls: ['Short-lived credentials for vendors instead of long-lived keys.', 'Vendor access brokered through a monitored gateway, not direct production access.', 'Strong hashing with salt for stored credentials.', 'Fraud controls on loyalty points as a high-value asset.', 'Tabletop exercise for "critical vendor compromised" scenarios.'],
    src: [['SC Media', 'https://www.scworld.com/brief/expedia-confirms-data-breach-following-supply-chain-attack']],
  },
  {
    name: 'NVIDIA (possible partner incident)',
    happened: 'The Gentlemen ransomware group listed NVIDIA on its leak site without publishing proof. NVIDIA said it is investigating an incident that may have affected a third-party partner and has found no sign its own systems or networks were affected.',
    remediate: ['Confirm with the partner what NVIDIA data they hold and whether it was reached.', 'Treat the claim as unverified until evidence appears, but prepare notifications in case.', 'Rotate any credentials or tokens shared with the partner.'],
    controls: ['A data-sharing register per vendor showing what data each partner holds.', 'Contractual right to incident details and forensic summaries.', 'Threat intelligence monitoring of leak sites for your name and your critical vendors.', 'A communications plan for unverified extortion claims.'],
    src: [['SecurityWeek', 'https://securityweek.com/nvidia-responds-to-gentlemen-ransomware-claim']],
  },
  {
    name: 'Uber (AI platform vendor)',
    happened: 'Uber is notifying drivers that personal and driver\'s licence information was stolen after a third-party tech provider, reported as an AI model platform, told Uber on 9 October 2026 that attackers had stolen internal credentials, which were then used to access Uber data. Headlines put the total near 150,000 driver\'s licences; Uber had not given a total in the state notices reported.',
    remediate: ['Rotate every credential and API key shared with the vendor.', 'Notify drivers state by state, offer identity protection, and keep counts updated.', 'Review what driver data the vendor actually needed.'],
    controls: ['Do not send identity documents to AI or analytics vendors unless essential; redact or tokenise first.', 'Vendor tiering that treats AI platforms handling personal data as critical.', 'Per-vendor credentials with narrow scope so one vendor\'s breach does not open wider access.', 'Secrets management and rotation on a schedule and on vendor incident.'],
    src: [['TechCrunch via Yahoo News', 'https://www.yahoo.com/news/us/articles/uber-confirms-hackers-stole-thousands-145755325.html']],
  },
  {
    name: 'Cursor (malicious extension via a leaked vendor key)',
    happened: 'An access key Cursor issued to the same AI vendor was exposed. It gave read access to a storage bucket of coding agent traces that still contained some credentials. The attacker used those to reach Cursor services and, on 29 October 2026, placed modified Claude Code extension packages (2.1.312 and 2.1.313) into the cache serving Cursor\'s extension marketplace. Up to 5,000 users could have received them over about 11 hours. The code added an SSH key and tried a reverse SSH tunnel. Cursor says Anthropic did not publish these packages.',
    remediate: ['Users: removing the extension is not enough. Check for the added SSH key and startup persistence, isolate affected machines, rotate credentials from a clean system, and consider a rebuild.', 'Cursor: revoked vendor access, rotated credentials, rebuilt the marketplace, expanded secret scanning and redeployed infrastructure.'],
    controls: ['Scrub secrets from logs and training data before sharing with any vendor.', 'Scope vendor keys to the minimum and rotate them; alert on unusual use.', 'Sign extension packages and verify signatures before serving or installing.', 'Allow-list approved IDE extensions on company devices and pin versions.', 'EDR rules for new SSH keys and new scheduled tasks or launch agents on developer machines.'],
    src: [['Cybersecurity News', 'https://cybersecuritynews.com/cursor-data-breach/']],
  },
];

export default function VendorIncidents2026() {
  return (
    <details className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="vendor-incidents-2026">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Recent third-party incidents (October to November 2026): remediation and missing controls</summary>
      <p className={`${P} mt-3`}>Facts below are as reported at the time of writing and may change as investigations continue. Claims made by attackers are marked as claims. The remediation and control sections are our own analysis.</p>
      <div className="mt-3 space-y-3">
        {INCIDENTS.map((i) => (
          <details key={i.name} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">{i.name}</summary>
            <p className={`${P} mt-2`}><strong>What happened:</strong> {i.happened}</p>
            <p className={`${P} mt-2 font-semibold`}>How to remediate</p>
            <ul className={`list-disc pl-5 space-y-1 ${P}`}>{i.remediate.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className={`${P} mt-2 font-semibold`}>Controls that should have been in place</p>
            <ul className={`list-disc pl-5 space-y-1 ${P}`}>{i.controls.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Source: {i.src.map(([l, u], k) => <span key={u}>{k ? ', ' : ''}<a className="ui-link" href={u} target="_blank" rel="noreferrer">{l}</a></span>)}</p>
          </details>
        ))}
      </div>
      <p className={`${P} mt-4`}><strong>Common thread:</strong> in most of these, the vendor's own credentials became the attacker's way in. The controls that break that path are least-privilege and short-lived vendor access, data minimisation before sharing, monitoring of vendor activity in your environment, and contracts that force fast notification.</p>
    </details>
  );
}
