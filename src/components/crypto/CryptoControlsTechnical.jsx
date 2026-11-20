import FlowDiagram, { CompareDiagram } from './FlowDiagram.jsx';

// Crypto Exchanges topic: "Controls Applied and Gaps: How to Implement Them Technically".
// Written for a GRC reader who is new to crypto. Tool names are industry examples, not endorsements.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-gray-700';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

const AREAS = [
  {
    title: '1. Key management',
    diagram: <CompareDiagram title="Single key vs 2-of-3 multisig or MPC" items={[{ label: 'Single key', tone: 'risk', points: ['One key signs everything', 'Steal it once, drain the wallet'] }, { label: '2-of-3 multisig or MPC', tone: 'safe', points: ['Three key holders or shares', 'Any two must agree', 'One stolen key is not enough'] }]} caption="Like a bank locker that needs two of three keys turned together." />,
    gap: 'One stolen key or one hacked server can drain a whole wallet.',
    why: 'Crypto transfers cannot be reversed. Whoever holds the private key (the secret code that authorises spending) controls the money.',
    control: 'No single person, key or server can move funds alone. Keys are split, stored in hardened hardware and changed on a schedule.',
    how: [
      'MPC (multi-party computation: the key is never created in one place; it exists as separate "shares" held by different servers or people) → each share holder signs its part → the parts combine into one valid signature → the full key never exists anywhere to steal.',
      'Multisig (multi-signature: the wallet needs several separate keys to approve) → for example 2-of-3 or 3-of-5 → an attacker with one key still cannot move funds. Like a bank locker that needs two keys turned at the same time.',
      'HSM (hardware security module: a tamper-resistant device that stores keys and signs inside it, so keys never leave) → certified to FIPS 140-2 or 140-3 Level 3 (a US government standard; Level 3 adds tamper resistance and identity-based access).',
      'Key ceremony (a scripted, witnessed, recorded event where keys are created or recovered) → done offline → every step logged and signed by witnesses.',
      'Dual control (two people must act together) → no one person can create, use or recover a key alone.',
      'Key rotation (replacing keys on a schedule or after any suspected exposure) → move funds to new addresses → retire the old keys properly (see area 3).',
    ],
    tools: [
      ['Fireblocks', 'MPC-based custody and transfer platform with a built-in policy engine.'],
      ['BitGo', 'Custody and multisig wallet provider for institutions.'],
      ['Copper', 'Institutional custody using MPC.'],
      ['Safe (formerly Gnosis Safe)', 'Smart-contract multisig wallet widely used on Ethereum.'],
      ['AWS CloudHSM', 'HSMs hosted in AWS that you control.'],
      ['Thales and Utimaco', 'Hardware HSM vendors used by banks and exchanges.'],
    ],
    evidence: ['Key management policy and procedure', 'Signed key ceremony records with witness list', 'HSM certificate (FIPS level) and configuration', 'Quorum settings screenshot (for example 2-of-3)', 'Key rotation log'],
    oneLiner: 'I make sure no single person or server can sign a withdrawal, by using MPC or multisig with keys held in certified HSMs and created in witnessed ceremonies.',
  },
  {
    title: '2. Hot and cold wallet split',
    diagram: <FlowDiagram title="Keeping the hot wallet small" steps={[{ label: 'Hot wallet above cap', tone: 'risk' }, { label: 'Automated sweep' }, { label: 'Cold wallet', tone: 'safe' }, { label: 'Hot wallet runs low' }, { label: 'Quorum approves refill' }, { label: 'Signed offline', tone: 'safe' }]} />,
    gap: 'Too much money is kept online, where an attacker can reach it.',
    why: 'Hot wallet losses come straight out of the business, and a large one can threaten solvency and customer trust.',
    control: 'Keep only what daily withdrawals need online, and the rest offline.',
    how: [
      'Hot wallet (keys on internet-connected systems, used for fast withdrawals) → set a policy cap, for example 2 to 5% of total assets (a common industry range, not a regulatory number).',
      'Cold wallet (keys kept offline) → holds the rest.',
      'Automated sweep (a scheduled script that moves excess funds) → when the hot wallet goes above the cap → sweep the excess to cold storage.',
      'When the hot wallet runs low → a refill request → quorum approval (an agreed minimum number of approvers) → signed on an air-gapped device (a computer never connected to any network) → funds move from cold to hot.',
      'Monitor the sweep job itself → alert if it stops running. In the late-2026 incident a failed sweep left funds sitting at an old address.',
    ],
    tools: [
      ['Fireblocks, BitGo, Copper', 'Run hot and cold wallets with policy limits and approval workflows.'],
      ['Hardware wallets (for example Ledger, Trezor)', 'Small offline devices for signing cold transactions.'],
    ],
    evidence: ['Hot wallet cap in policy', 'Daily hot vs cold balance report', 'Sweep job logs and failure alerts', 'Approval records for cold to hot refills'],
    oneLiner: 'I cap the hot wallet at what a day of withdrawals needs, sweep the rest to cold storage automatically, and alert if the sweep ever stops.',
  },
  {
    title: '3. Retired and dormant wallets',
    diagram: <FlowDiagram title="Decommissioning a wallet" steps={[{ label: 'Mark retired', note: 'In the wallet inventory' }, { label: 'Sweep to zero' }, { label: 'Revoke keys' }, { label: 'Destroy key material', note: 'Witnessed' }, { label: 'Keep evidence' }, { label: 'Alert on activity', tone: 'safe', note: 'Forever' }]} />,
    gap: 'The late-2026 loss came from retired wallets that still held funds.',
    why: 'A wallet nobody watches is the easiest target. If its keys still exist or funds still arrive there, it can be drained without anyone noticing.',
    control: 'Every wallet is tracked from creation to decommissioning, and retired addresses are watched.',
    how: [
      'Wallet inventory (like a CMDB, a configuration management database: a register of every asset) → each address has an owner, purpose, chain and status (active, retired, closed).',
      'Decommissioning → sweep to zero (move every token out) → revoke keys (remove access in the custody platform) → destroy key material (securely wipe key shares and backups, witnessed) → keep evidence (signed record of each step).',
      'Tell counterparties and liquidity providers the address is retired → so they stop sending funds to it.',
      'On-chain alert (an alert based on public blockchain activity) on every retired address → any incoming or outgoing transaction → page the on-call team immediately.',
      'Quarterly review → compare the inventory against the custody platform and on-chain balances → close any gaps.',
    ],
    tools: [
      ['Blockchain analytics alerts (Chainalysis, TRM Labs, Elliptic)', 'Watch specific addresses and alert on activity.'],
      ['Asset or CMDB tools (for example ServiceNow)', 'Hold the wallet register with owners and status.'],
    ],
    evidence: ['Wallet inventory with owner and status', 'Decommissioning checklist signed for each retired wallet', 'Zero balance proof (block explorer screenshot)', 'Alert rule configuration for retired addresses'],
    oneLiner: 'I treat wallets like any other asset: inventoried, owned, decommissioned with evidence, and monitored after retirement, because a forgotten address is a free target.',
  },
  {
    title: '4. Withdrawal controls',
    diagram: <FlowDiagram title="Checks before a withdrawal is signed" steps={[{ label: 'Withdrawal request' }, { label: 'Whitelisted address?', note: 'Cooling-off for new ones' }, { label: 'Within limits?', note: 'Size and speed' }, { label: 'Policy engine', note: 'Rules pass or block' }, { label: 'Two approvers', note: 'Out of band' }, { label: 'Signed and sent', tone: 'safe' }]} caption="Fail any check → the transfer stops." />,
    gap: 'Large outflows go through without anyone checking.',
    why: 'Once funds leave, they are gone. Checks must happen before signing, not after.',
    control: 'Rules decide what can be sent, where, how much and how fast, and large transfers need human approval.',
    how: [
      'Address whitelisting (only pre-approved destination addresses allowed) → a new address goes into a cooling-off period of 24 to 48 hours before use.',
      'Velocity and value limits (caps on how much can move per transaction, per hour and per day) → anything above → blocked or sent for approval.',
      'Policy engine (software that checks every transfer against rules before signing), for example the Fireblocks Transaction Authorization Policy → rule fails → transfer stops.',
      'Out-of-band approval (approval through a separate channel from the request, for example a phone app or hardware key) → a hacked admin console alone cannot approve.',
      'Four-eyes principle (two different people must agree) → requester cannot be approver.',
    ],
    tools: [
      ['Fireblocks TAP, BitGo policies, Copper', 'Built-in policy engines for limits, whitelists and approvals.'],
      ['Safe (multisig)', 'Requires multiple signers on chain.'],
    ],
    evidence: ['Withdrawal policy with limits', 'Policy engine rule export', 'Whitelist change log with cooling-off dates', 'Sample of large withdrawals with two approvals'],
    oneLiner: 'Every withdrawal passes a policy engine first: approved addresses only, limits on size and speed, and two separate approvers for anything large.',
  },
  {
    title: '5. Detection and monitoring',
    diagram: <FlowDiagram title="From signal to response" steps={[{ label: 'On-chain outflow', tone: 'risk' }, { label: 'KYT alert' }, { label: 'Ledger reconciliation', note: 'Does it match?' }, { label: 'Mismatch = incident', note: 'Never a false alarm without proof' }, { label: 'Pause and investigate', tone: 'safe' }]} />,
    gap: 'The late-2026 breach was first called a "false alarm".',
    why: 'Every minute of delay lets funds move further and makes freezing harder.',
    control: 'Watch both the blockchain and internal systems, reconcile balances continuously, and treat any unexplained outflow as an incident until proven otherwise.',
    how: [
      'Blockchain analytics → KYT (know your transaction: screening transactions in real time for links to theft, sanctions or mixers) → risky flow → alert.',
      'Address screening → check destination addresses against known bad lists before sending.',
      'Real-time reconciliation (comparing what the blockchain shows against the internal ledger of customer balances) → any mismatch → alert within minutes.',
      'SIEM (security information and event management: a system that collects logs and raises alerts) → detection rules mapped to MITRE ATT&CK techniques used by the Lazarus Group (a North Korea-linked group known for crypto theft), such as phishing and use of valid accounts.',
      'Honeypot or decoy wallets (wallets with small funds that nobody should touch) → any movement → instant high-severity alert.',
    ],
    tools: [
      ['Chainalysis KYT, TRM Labs, Elliptic', 'Blockchain analytics and transaction screening.'],
      ['Splunk, Microsoft Sentinel, Elastic', 'SIEM platforms for log collection and alerting.'],
    ],
    evidence: ['KYT alert configuration and sample alerts', 'Reconciliation reports and mismatch tickets', 'SIEM rule list mapped to ATT&CK', 'Incident triage records showing time to confirm'],
    oneLiner: 'I reconcile on-chain balances against the ledger in near real time and treat any unexplained outflow as an incident, so nobody can wave it away as a false alarm.',
  },
  {
    title: '6. Access and endpoint security',
    diagram: <CompareDiagram title="Why SMS codes lose to security keys" items={[{ label: 'SMS or app code', tone: 'risk', points: ['Fake login page asks for the code', 'Person types it in', 'Attacker uses it straight away'] }, { label: 'FIDO2 security key', tone: 'safe', points: ['Key checks the real website', 'Fake site gets no answer', 'Nothing to trick the person into typing'] }]} />,
    gap: 'Groups like Lazarus usually get in by tricking people, not by breaking code.',
    why: 'One compromised engineer laptop can expose signing systems.',
    control: 'Strong login, minimal standing access and locked-down devices for anyone near the keys.',
    how: [
      'Phishing-resistant MFA (multi-factor authentication) → FIDO2 security keys such as YubiKey (the key checks the real website before responding, so a fake login page gets nothing) → SMS or OTP codes are weaker because people can be tricked into typing them on a fake site.',
      'PAM (privileged access management: a vault and gateway for admin access), for example CyberArk or Teleport → just-in-time access (admin rights granted for a short time, then removed automatically) → session recording.',
      'Dedicated signing workstations → used only for signing → no email, browsing or chat.',
      'Awareness training → fake job offers and malicious coding tests (a "take-home test" that installs malware) → report, do not run.',
    ],
    tools: [
      ['YubiKey (FIDO2)', 'Hardware security key for phishing-resistant MFA.'],
      ['CyberArk, Teleport', 'Privileged access management with just-in-time access and session recording.'],
      ['EDR (for example CrowdStrike, Microsoft Defender)', 'Detects malware and suspicious activity on laptops.'],
    ],
    evidence: ['MFA policy and enforcement report', 'PAM access logs and session recordings', 'Signing workstation build standard', 'Training records including fake recruiter scenarios'],
    oneLiner: 'Anyone near signing systems uses hardware security keys, gets admin access only when needed, and works from a locked-down device, because attackers target people first.',
  },
  {
    title: '7. Regulatory controls in India',
    gap: 'Missed reporting deadlines and incomplete records.',
    why: 'Late reporting and missing logs create legal exposure on top of the financial loss.',
    control: 'Reporting steps are built into the incident process, and logs and records are kept as the rules require.',
    how: [
      'CERT-In (India\'s national cyber incident response agency) → report listed incidents within 6 hours of noticing them → reporting step in the incident runbook with a named owner.',
      'ICT logs (logs from information and communication technology: systems, network, applications and access) → kept for 180 days in India → stored on WORM storage (write once, read many: data cannot be changed or deleted), for example AWS S3 Object Lock.',
      'NTP time sync (network time protocol: keeps all system clocks in step) → synced to national time servers → so event times from different systems line up during an investigation.',
      'FIU-IND (Financial Intelligence Unit of India) under PMLA (Prevention of Money Laundering Act) → keep KYC and transaction records for 5 years → automated STR (suspicious transaction report) workflow from KYT and monitoring alerts.',
    ],
    tools: [
      ['AWS S3 Object Lock, Azure immutable storage', 'Tamper-proof log storage.'],
      ['SIEM and case management tools', 'Track incidents and reporting deadlines.'],
      ['Transaction monitoring tools', 'Flag suspicious activity for STR review.'],
    ],
    evidence: ['Incident runbook with the CERT-In step and timer', 'Log retention settings and immutability proof', 'NTP configuration', 'STR register and FIU-IND filings'],
    oneLiner: 'I build the CERT-In 6-hour clock and the FIU-IND reporting steps into the incident runbook, and keep logs immutable for at least 180 days.',
  },
  {
    title: '8. Incident response and recovery',
    diagram: <FlowDiagram title="The first hour" steps={[{ label: 'Anomaly detected', tone: 'risk' }, { label: 'Auto-pause wallet' }, { label: 'Confirm incident' }, { label: 'Freeze requests', note: 'Issuers, bridges, exchanges' }, { label: 'CERT-In clock running', note: '6 hours' }, { label: 'Reserve protects customers', tone: 'safe' }]} />,
    gap: 'In the mid-2025 incident, stolen funds were moved out before anyone could freeze them.',
    why: 'Funds can cross chains within minutes, so recovery depends on speed and on having contacts ready.',
    control: 'Automatic pause on suspicious outflows, a ready list of freeze contacts and a reserve so customers are protected.',
    how: [
      'Anomaly detected → automatic withdrawal pause on the affected wallets → humans confirm or release.',
      'Pre-built freeze-request contact list → stablecoin issuers (for example Tether for USDT and Circle for USDC, which can freeze tokens at specific addresses), bridges and other exchanges → request with transaction hashes and evidence.',
      'Engage blockchain analytics and law enforcement → trace and flag the funds.',
      'Reserve or insurance fund → covers the loss → customer balances stay whole.',
    ],
    tools: [
      ['Blockchain analytics firms', 'Trace funds and alert other exchanges.'],
      ['Incident management tools (for example PagerDuty, Opsgenie)', 'Page the right people fast.'],
    ],
    evidence: ['Incident response plan with crypto playbooks', 'Freeze contact list with last verified date', 'Tabletop exercise reports', 'Reserve or insurance documentation'],
    oneLiner: 'I prepare the freeze contacts and the pause decision before an incident, because after a theft you have minutes, not days.',
  },
];

const SUMMARY = [
  ['Single key or server compromise', 'MPC or multisig with HSMs', 'Split keys → quorum signing → keys in FIPS 140 Level 3 HSMs', 'Ceremony records, quorum settings, HSM certificate', 'Status not confirmed publicly'],
  ['Too much value online', 'Hot wallet cap and sweeps', 'Cap 2 to 5% → automated sweep → quorum refill', 'Policy, balance reports, sweep logs', 'Gap: sweep job failed unnoticed (Oct 2026)'],
  ['Retired wallet compromise', 'Wallet decommissioning', 'Sweep funds → revoke keys → monitor the address', 'Decommission log, alert screenshot', 'Gap: retired wallets still held funds'],
  ['Unauthorised large outflow', 'Policy engine and approvals', 'Whitelist → limits → out-of-band four-eyes approval', 'Rule export, approval samples', 'Gap: drain in about five minutes (Jul 2025)'],
  ['Late or missed detection', 'Monitoring and reconciliation', 'KYT → reconciliation → SIEM rules → decoys', 'Alert configs, reconciliation tickets', 'Gap: first called a false alarm (Oct 2026)'],
  ['Social engineering of staff', 'Phishing-resistant MFA and PAM', 'FIDO2 → just-in-time access → signing workstations', 'MFA report, PAM logs, training', 'Method of access not confirmed publicly (Jul 2025)'],
  ['Regulatory breach', 'Reporting built into IR', 'CERT-In 6-hour step → immutable logs → STR workflow', 'Runbook, retention settings, STR register', 'Not confirmed publicly'],
  ['Funds lost before freeze', 'Pause and freeze playbook', 'Auto pause → freeze requests → reserve', 'IR plan, contact list, tabletop report', 'Gap: funds moved before any freeze (Jul 2025)'],
];

const ATTACK = [
  ['Phishing or fake job lure', 'Awareness training on fake recruiters; email filtering; report button.'],
  ['Malware on an employee laptop', 'EDR on every device; dedicated signing workstations; no admin rights on daily laptops.'],
  ['Stolen credentials or keys', 'FIDO2 MFA; PAM with just-in-time access; keys in MPC or HSM so no full key exists to steal.'],
  ['Unauthorised withdrawal from a hot or retired wallet', 'Policy engine limits and whitelists; four-eyes approval; retired wallets swept to zero and monitored.'],
  ['Swap on a DEX', 'KYT alerts on outflows to DEX routers; automatic pause on the source wallet.'],
  ['Bridge to another chain', 'Freeze requests to stablecoin issuers and bridges sent within minutes, using the pre-built contact list.'],
  ['Park in dormant wallets', 'Blockchain analytics tags the addresses so other exchanges block deposits.'],
  ['Cash out', 'Exchanges screen deposits against tagged addresses; FIU-IND and law enforcement reports.'],
];

const GLOSSARY = [
  ['Air-gapped', 'A device never connected to any network.', 'A safe with no door to the street.'],
  ['Bridge', 'A service that moves value between blockchains by locking tokens on one and releasing them on another.', 'A currency exchange counter at a border.'],
  ['CERT-In', 'India\'s national computer emergency response team; receives cyber incident reports.', 'The fire department for cyber incidents.'],
  ['CMDB', 'Configuration management database: a register of all IT assets and their owners.', 'A library catalogue for your systems.'],
  ['Cold wallet', 'A wallet whose keys are kept offline.', 'Money in a bank vault.'],
  ['DEX', 'Decentralised exchange: trading run by code on a blockchain, with no company account or KYC.', 'A vending machine for swapping tokens.'],
  ['FIDO2', 'A login standard using hardware keys that check the real website before responding.', 'A house key that only fits your own front door, not a copy of it.'],
  ['FIPS 140-2/3', 'US government standards for cryptographic modules; Level 3 adds tamper resistance.', 'A safety rating for a safe.'],
  ['FIU-IND', 'Financial Intelligence Unit of India: receives anti-money-laundering reports.', 'The tax office for suspicious money flows.'],
  ['Four-eyes principle', 'Two different people must agree before an action happens.', 'Two signatures on a company cheque.'],
  ['Honeypot', 'A decoy wallet or system that nobody legitimate should touch, used to detect attackers.', 'A marked banknote in a till.'],
  ['Hot wallet', 'A wallet whose keys are on internet-connected systems for fast use.', 'Cash in a shop till.'],
  ['HSM', 'Hardware security module: a tamper-resistant device that stores keys and signs inside it.', 'A vault that signs documents without letting the pen out.'],
  ['ICT logs', 'Logs from information and communication technology: system, network, application and access logs.', 'CCTV footage for your systems.'],
  ['Just-in-time access', 'Admin rights granted for a short time when needed, then removed automatically.', 'A visitor badge that expires at the end of the day.'],
  ['Key ceremony', 'A scripted, witnessed, recorded event to create or recover keys.', 'Opening a safe deposit box with a notary present.'],
  ['Key rotation', 'Replacing keys on a schedule or after possible exposure.', 'Changing the locks when you move house.'],
  ['KYT', 'Know your transaction: screening crypto transactions for links to theft, sanctions or mixers.', 'Checking where a parcel came from before accepting it.'],
  ['Lazarus Group', 'A North Korea-linked threat group known for large crypto thefts (MITRE ATT&CK G0032).', 'A professional burglary gang that studies its targets.'],
  ['MFA', 'Multi-factor authentication: proving identity with more than a password.', 'A key plus a PIN for a locker.'],
  ['MITRE ATT&CK', 'A public catalogue of attacker techniques used to design detections.', 'A field guide to how burglars break in.'],
  ['MPC', 'Multi-party computation: a key split into shares held by different parties, never joined in one place.', 'A treasure map torn into pieces held by different people.'],
  ['Multisig', 'A wallet that needs several separate keys to approve a transfer.', 'A bank locker that needs two keys turned together.'],
  ['NTP', 'Network time protocol: keeps system clocks in sync.', 'Everyone setting their watch to the same clock tower.'],
  ['On-chain', 'Recorded on the public blockchain, visible to anyone.', 'Written in a public ledger anyone can read.'],
  ['Out-of-band approval', 'Approval through a different channel from the request.', 'A bank calling you to confirm a large transfer.'],
  ['PAM', 'Privileged access management: a vault and gateway that controls and records admin access.', 'A key cabinet with a sign-out log and a camera.'],
  ['PMLA', 'Prevention of Money Laundering Act, 2002: India\'s anti-money-laundering law.', 'The rulebook for following the money.'],
  ['Policy engine', 'Software that checks every transfer against rules before it is signed.', 'A bouncer with a guest list and a spending limit.'],
  ['Private key', 'The secret that authorises spending from a wallet.', 'The PIN and the card in one.'],
  ['Public key', 'Derived from the private key and safe to share; used to create the address and verify signatures.', 'Your signature specimen held by the bank.'],
  ['Quorum', 'The minimum number of approvers needed.', 'The minimum attendance for a board vote.'],
  ['Reconciliation', 'Comparing two records of the same thing to find differences.', 'Matching your bank statement against your chequebook.'],
  ['SIEM', 'Security information and event management: collects logs and raises alerts.', 'A control room watching all the CCTV feeds.'],
  ['Stablecoin', 'A token designed to hold a steady value, usually 1 US dollar.', 'A casino chip always worth one dollar.'],
  ['STR', 'Suspicious transaction report filed with FIU-IND.', 'A formal tip-off to the authorities.'],
  ['Sweep', 'Moving funds out of an address, usually to a safer one.', 'Emptying the till into the safe at closing.'],
  ['Velocity limit', 'A cap on how much can move in a time window.', 'A daily ATM withdrawal limit.'],
  ['Wallet address', 'The public identifier funds are sent to.', 'An account number anyone can see.'],
  ['Whitelisting', 'Allowing only pre-approved destinations.', 'A guest list at the door.'],
  ['WORM storage', 'Write once, read many: data that cannot be changed or deleted.', 'Ink in a bound, numbered ledger.'],
];

function Area({ a }) {
  const Row = ({ label, children }) => <div className="mt-3"><p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>{children}</div>;
  const Ul = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={typeof x === 'string' ? x : x[0]}>{typeof x === 'string' ? x : <><span className="font-medium">{x[0]}:</span> {x[1]}</>}</li>)}</ul>;
  return (
    <details className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-3">
      <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">{a.title}</summary>
      <Row label="The gap"><p className={P}>{a.gap}</p></Row>
      <Row label="Why it matters"><p className={P}>{a.why}</p></Row>
      <Row label="The control"><p className={P}>{a.control}</p></Row>
      <Row label="How it works technically">{a.diagram}<Ul items={a.how} /></Row>
      <Row label="Tools used in the industry"><Ul items={a.tools} /></Row>
      <Row label="Evidence an auditor would ask for"><Ul items={a.evidence} /></Row>
      <Row label="Interview one-liner"><p className={`${P} italic`}>"{a.oneLiner}"</p></Row>
    </details>
  );
}

export default function CryptoControlsTechnical() {
  return (
    <details className={CARD} id="crypto-controls-technical">
      <summary className="cursor-pointer text-xl font-bold text-gray-900 dark:text-white">Controls Applied and Gaps: How to Implement Them Technically</summary>
      <div className="mt-3">
      <p className={P}>Eight control areas, each in the same format: the gap, why it matters, the control, how it works step by step, tools, audit evidence and a one-liner for interviews. Where the public reporting does not confirm what happened, the text says so.</p>
      <div className="mt-4">{AREAS.map((a) => <Area key={a.title} a={a} />)}</div>

      <h4 className="mt-6 mb-2 text-base font-semibold text-gray-900 dark:text-white">Summary table</h4>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Controls summary">
        <table className="w-full min-w-[860px] text-sm">
          <thead><tr>{['Risk', 'Control', 'Technical implementation', 'Evidence', 'Gap / status'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
          <tbody>{SUMMARY.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>

      <h4 className="mt-6 mb-2 text-base font-semibold text-gray-900 dark:text-white">How this kind of attack usually happens, and what stops each step</h4>
      <ol className="space-y-0">
        {ATTACK.map(([step, ctl], i) => (
          <li key={step}>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{i + 1}. {step}</p>
              <p className={P}><span className="font-medium">Control that breaks this step:</span> {ctl}</p>
            </div>
            {i < ATTACK.length - 1 && <p className="text-center text-gray-400 leading-6" aria-hidden="true">↓</p>}
          </li>
        ))}
      </ol>

      <details className="mt-6">
        <summary className="cursor-pointer text-base font-semibold text-gray-900 dark:text-white">Glossary (A to Z)</summary>
        <dl className="mt-3 space-y-2">
          {GLOSSARY.map(([t, m, an]) => (
            <div key={t} className={P}><dt className="font-semibold text-gray-900 dark:text-white inline">{t}: </dt><dd className="inline">{m} <span className="italic">Like {an.charAt(0).toLowerCase() + an.slice(1)}</span></dd></div>
          ))}
        </dl>
      </details>
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Guidance only. Verify obligations against the official text before relying on them.</p>
      </div>
    </details>
  );
}
