// Tabletop exercise scenario for a crypto exchange, inspired by public incidents.
// VaultX Exchange is fictional. Nothing here describes what actually happened inside any real company.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-6 mb-6 dark:bg-gray-800 dark:border-gray-700';
const H3 = 'text-lg font-bold text-gray-900 dark:text-white mb-2';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows, min = 600 }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
const Ul = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
function Section({ n, title, children, open = false }) {
  return (
    <details className={CARD} open={open}>
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">{n}. {title}</summary>
      <div className="mt-3 space-y-3">{children}</div>
    </details>
  );
}

const ROLES = [
  ['Facilitator', 'Runs the session, reveals injects on time and keeps discussion moving. Does not play a role.'],
  ['Incident Commander', 'Owns the response, assigns tasks and makes the call on severity.'],
  ['CISO', 'Leads the security investigation and advises on containment.'],
  ['CTO or Head of Engineering', 'Owns system changes, rebuilds and engineering capacity.'],
  ['Treasury and Wallet Ops', 'Knows every wallet, balance and signing process; runs sweeps and pauses.'],
  ['SOC or Security Monitoring', 'Triage of alerts, log analysis and evidence capture. (SOC: security operations centre.)'],
  ['Compliance and Principal Officer (FIU-IND)', 'Owns regulatory reports and the suspicious transaction report.'],
  ['Legal', 'Advises on liability, law enforcement, disclosures and contracts.'],
  ['Communications and PR', 'Drafts public, customer and media statements.'],
  ['Customer Support', 'Handles customer contact using approved scripts.'],
  ['CEO or Executive Sponsor', 'Approves high-impact decisions and speaks for the company.'],
  ['Scribe or Observer', 'Records every decision, time and owner for the after-action report.'],
];

const RACI = [
  ['Pause withdrawals', 'Treasury and Wallet Ops', 'Incident Commander', 'CISO, CTO', 'CEO, Support, Comms'],
  ['CERT-In report', 'CISO', 'Incident Commander', 'Legal, Compliance', 'CEO'],
  ['FIU-IND report', 'Compliance and Principal Officer', 'Principal Officer', 'Legal, SOC', 'CEO'],
  ['Freeze requests', 'SOC with Treasury', 'CISO', 'Legal', 'Comms'],
  ['Public statement', 'Communications and PR', 'CEO', 'Legal, CISO', 'Support, all staff'],
  ['Resume withdrawals', 'Treasury and Wallet Ops', 'CEO', 'CISO, CTO, Compliance', 'Support, Comms'],
];

const INJECTS = [
  ['T+0', 'Blockchain analytics (a service that watches public blockchains and flags risky flows) alerts: outflows from a wallet marked "retired" in the inventory.', 'Who owns this alert? Is this wallet supposed to hold funds?', 'SOC escalates at once. Treasury checks the wallet register. Treated as a potential incident until proven otherwise.', 'Monitoring of retired addresses; alert triage procedure'],
  ['T+15 min', 'The on-call engineer says it is probably a test transaction and suggests ignoring it.', 'What evidence would prove it is a test? Who can close the alert?', 'Nobody closes an outflow alert without confirming the transaction with Treasury. "Probably" is not evidence.', 'Escalation rules; "no false alarm without proof" principle'],
  ['T+45 min', 'Reconciliation (comparing on-chain balances with the internal customer ledger) shows a gap of about USD 9 million (fictional figure).', 'Is this a confirmed incident? Do we pause withdrawals?', 'Declare a confirmed incident. Incident Commander takes charge. Pause withdrawals on affected wallets at least.', 'Incident classification; withdrawal pause authority'],
  ['T+1 hr', 'Funds are seen on a DEX (decentralised exchange: trading run by code, with no account or KYC) and then entering a cross-chain bridge (a service that moves value from one blockchain to another).', 'Who do we contact first? What evidence do they need?', 'Send freeze requests within minutes to the stablecoin issuer and the bridge, with transaction hashes. Ask analytics firms to tag the addresses.', 'Freeze contact list; evidence pack template'],
  ['T+2 hrs', 'Crypto Twitter and a news outlet ask questions. The CEO wants to post "user funds are safe".', 'Can we say that yet? What do we know for sure?', 'Only say what is confirmed. Holding statement: aware of unusual activity, investigating, withdrawals paused as a precaution, update by a set time.', 'Crisis communications plan; Legal review'],
  ['T+5 hrs', 'The 6-hour CERT-In reporting deadline (counted from when the incident was noticed) is approaching.', 'Is the report drafted? Who submits it? What if facts are incomplete?', 'Submit on time with what is known, and update later. The clock started at T+0, not at confirmation.', 'CERT-In reporting step in the IR plan'],
  ['T+6 hrs', 'A stablecoin issuer asks for formal evidence before it will freeze funds.', 'What exactly do we send, and who signs it?', 'Send a prepared pack: transaction hashes, addresses, timeline, police complaint number if available, authorised signatory.', 'Freeze request template; law enforcement liaison'],
  ['T+12 hrs', 'Customers flood support and a rumour of insolvency spreads.', 'What do agents say? How do we show customers are protected?', 'Approved script for agents. Confirm the reserve covers the loss, if it does. Regular public updates.', 'Customer communications; reserve or insurance policy'],
  ['T+24 hrs', 'DR inject: rebuild the signing infrastructure (the systems and devices that approve and sign transactions) and rotate all keys. Backup key shares are in two cities and one custodian (a person or firm holding a key share) is unreachable.', 'Can we reach quorum without them? What is the backup plan?', 'Quorum design allows recovery without any single custodian. Deputy custodians are listed. Ceremony is witnessed and recorded.', 'Key recovery procedure; custodian succession'],
  ['T+72 hrs', 'Leadership wants to resume withdrawals within 24 hours.', 'What has to be true first?', 'Root cause known and fixed; keys rotated; every wallet reconciled; independent review signed off; staged limits ready; monitoring heightened.', 'Recovery criteria; change approval'],
];

const CURVEBALLS = [
  ['Optional: attacker contact', 'The attacker emails offering to return 80% of funds as a "bug bounty".', 'Do we engage? Who decides? Legal and law enforcement guidance first; never pay without legal advice; record every contact.'],
  ['Optional: insider suspected', 'Logs show a valid employee account approved one transfer.', 'Preserve evidence quietly, restrict that account, involve HR and Legal, and avoid tipping off.'],
];

const DECISIONS = [
  'Pause all withdrawals → stops further loss → but triggers panic and reputational damage.',
  'Pause only affected wallets → keeps the business running → but risks missing a wider compromise.',
  'Declare a confirmed incident early → starts reporting clocks and resources → but may be a false positive. Late → more loss and missed deadlines.',
  'Who can approve a pause → pre-agreed authority means minutes, not hours → decide this before an incident.',
  'Say something publicly now → reduces rumours → but anything wrong will be quoted back. Wait → silence fuels speculation.',
  'Engage law enforcement → helps freezes and recovery → but adds formality and possible publicity.',
  'Make customers whole from reserves → protects trust → but hits capital and needs board approval.',
  'Negotiate with the attacker → may recover funds → but legal, sanctions and precedent risks. Take legal advice first.',
];

const CHECKLIST = [
  ['CERT-In report (CERT-In: India\'s national cyber incident response team)', 'CISO', 'Within 6 hours of noticing the incident'],
  ['Preserve ICT logs (information and communication technology logs) in tamper-proof storage; 180-day retention', 'SOC', 'Immediately; keep for at least 180 days'],
  ['FIU-IND suspicious transaction report (STR) under PMLA (Prevention of Money Laundering Act); keep records for 5 years', 'Principal Officer', 'Within the STR timeline in the PML Rules (commonly cited as 7 days from forming suspicion; confirm)'],
  ['Police or cybercrime cell complaint', 'Legal', 'As soon as practical; helps freeze requests'],
  ['DPDP Act (Digital Personal Data Protection Act, 2023): assess whether customer personal data was affected; notify the Board and affected users if so', 'Legal with DPO', 'Without delay if personal data is affected'],
  ['Board and investor notification', 'CEO', 'Same day for a material incident'],
];

const RECOVERY = [
  ['Contain', 'Stop further loss: pause affected wallets and block known attacker paths.'],
  ['Isolate compromised systems', 'Disconnect infected laptops and servers, keeping them for forensics.'],
  ['Revoke and rotate all keys', 'Assume every key reachable by the attacker is exposed.'],
  ['Rebuild signing infrastructure from clean images', 'Build fresh from trusted templates, not from the infected systems.'],
  ['Restore from verified backups', 'Use backups taken before the compromise and checked for integrity.'],
  ['Reconcile every wallet against the ledger', 'Prove every customer balance is backed before reopening.'],
  ['Independent security review', 'An outside party checks the fix.'],
  ['Staged resumption of withdrawals', 'Small limits first, then raise them as monitoring stays clean.'],
  ['Monitor closely', 'Heightened alerting for weeks after reopening.'],
];

const SCORECARD = ['Detection', 'Escalation', 'Decision making', 'Regulatory reporting', 'Communication', 'Freeze coordination', 'Recovery', 'Documentation'].map((a) => [a, '', 'Met / Partially met / Not met', '']);

const GAPS = [
  'Retired wallets still held funds → no decommissioning procedure → control: sweep, revoke keys, monitor the address.',
  'Alert closed as a "test" → no rule for confirming outflows → control: outflow alerts closed only with Treasury confirmation.',
  'Nobody knew who could pause withdrawals → authority not defined → control: RACI with named deputies.',
  'CERT-In clock started late → team counted from confirmation, not detection → control: runbook timer starts at first alert.',
  'No freeze contact list → hours lost finding contacts → control: verified contact list reviewed quarterly.',
  'Evidence pack not ready → issuer delayed freezing → control: freeze request template with required fields.',
  'Public statement over-promised → "funds are safe" before facts known → control: holding statements pre-approved by Legal.',
  'Key recovery depended on one custodian → no succession → control: quorum design with deputies.',
  'Sweep job failure went unnoticed → no job monitoring → control: alert on failed or missed sweeps.',
  'Decisions not recorded → weak after-action report → control: dedicated scribe and decision log.',
];

const TIPS = [
  'Keep it blameless (focus on the process, not the person) so people speak openly.',
  'Timebox each inject, about 15 to 20 minutes, and move on even if the discussion is unfinished.',
  'Record every decision with time and owner; the scribe is as important as the facilitator.',
  'Push on assumptions: "Who exactly does that? Show me where it is written down."',
  'Use real names of tools, contacts and documents so gaps are concrete.',
  'End with three to five clear actions, each with an owner and a date.',
];

const GLOSSARY = [
  ['After-action report', 'A written review of what happened in an exercise or incident and what to fix.', 'A match review after the game.'],
  ['Blameless review', 'A review that looks at process failures, not individual fault.', 'An air crash investigation that fixes the system, not the pilot.'],
  ['Blockchain analytics', 'Services that trace and label activity on public blockchains.', 'Detectives following footprints in fresh snow.'],
  ['Bridge', 'A service that moves value between blockchains.', 'A currency exchange counter at a border.'],
  ['CERT-In', 'India\'s national computer emergency response team.', 'The fire department for cyber incidents.'],
  ['Cold wallet', 'A wallet whose keys are kept offline.', 'Money in a vault.'],
  ['Custodian', 'A person or firm holding a key share or the assets.', 'A trusted friend holding a spare house key.'],
  ['DEX', 'Decentralised exchange: token trading run by code, with no account or KYC.', 'A vending machine for swapping tokens.'],
  ['Dormant wallet', 'A wallet with no recent activity.', 'A locker nobody has opened in months.'],
  ['DPDP Act', 'Digital Personal Data Protection Act, 2023: India\'s personal data law.', 'The rulebook for handling people\'s personal details.'],
  ['DR', 'Disaster recovery: restoring systems and services after an incident.', 'Rebuilding the shop after a fire.'],
  ['FIU-IND', 'Financial Intelligence Unit of India: receives anti-money-laundering reports.', 'The authority you tip off about suspicious money.'],
  ['Freeze request', 'A formal request to an issuer, bridge or exchange to block stolen funds.', 'Asking a bank to stop a cheque.'],
  ['Hot wallet', 'A wallet with keys on internet-connected systems.', 'Cash in the till.'],
  ['ICT logs', 'Logs from systems, networks, applications and access.', 'CCTV footage for your IT.'],
  ['Inject', 'A new piece of information the facilitator reveals during the exercise.', 'A plot twist in a story.'],
  ['IR', 'Incident response: containing and fixing an attack.', 'Putting out the fire.'],
  ['Key rotation', 'Replacing keys with new ones.', 'Changing the locks.'],
  ['Key shares', 'Pieces of a key held separately so no one holds the whole key.', 'A torn map with pieces held by different people.'],
  ['PMLA', 'Prevention of Money Laundering Act, 2002.', 'India\'s follow-the-money law.'],
  ['RACI', 'Responsible, Accountable, Consulted, Informed: who does what for a decision.', 'A cast list showing who acts, who directs and who watches.'],
  ['Reconciliation', 'Comparing two records of the same thing to find differences.', 'Matching your bank statement to your chequebook.'],
  ['Retired wallet', 'A wallet the company has stopped using.', 'An old bank account you forgot to close.'],
  ['RPO', 'Recovery point objective: how much data you can afford to lose, measured in time.', 'How far back your last save point is.'],
  ['RTO', 'Recovery time objective: how long a service can be down before it must be back.', 'How long the shop can stay shut.'],
  ['Signing infrastructure', 'Systems and devices that approve and sign transactions.', 'The room where cheques are signed.'],
  ['SOC', 'Security operations centre: the team that watches alerts.', 'The control room watching the cameras.'],
  ['Stablecoin', 'A token designed to stay at a fixed value, usually 1 US dollar.', 'A chip always worth one dollar.'],
  ['STR', 'Suspicious transaction report filed with FIU-IND.', 'A formal tip-off to the authorities.'],
  ['Tabletop exercise', 'A discussion-based drill that walks through an incident without touching live systems.', 'A fire drill done around a table.'],
];

export default function CryptoTabletopScenario() {
  return (
    <div className="mt-8" id="crypto-tabletop">
      <div className={CARD}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Crypto exchange scenario: Operation Cold Trail</h2>
        <p className={P}>A complete tabletop exercise for VaultX Exchange (fictional Indian crypto exchange). The scenario is inspired by public incidents covered in the Crypto Exchanges (VDA) topic. It does not describe what happened inside any real company. Reuse it as a template for a real client by swapping in their names, tools and contacts.</p>
      </div>

      <Section n={1} title="What a tabletop exercise is" open>
        <p className={P}>A tabletop exercise is a discussion-based drill. The team sits together and talks through how they would respond to a realistic incident, step by step, without touching live systems. Think of it as a fire drill done around a table.</p>
        <Ul items={['IR (incident response) → contain and fix the attack.', 'DR (disaster recovery) → restore systems and services afterwards.', 'This exercise tests both, because a wallet theft needs fast containment and then a careful rebuild before customers can withdraw again.']} />
        <p className={`${P} font-semibold`}>Why regulators, auditors and frameworks expect it</p>
        <Ul items={['ISO 27001 (Annex A 5.24 to 5.30): incident planning, response, learning, evidence and ICT readiness for business continuity, which are best proven by testing.', 'SOC 2 (CC7.3 to CC7.5, A1.3): evaluating and responding to incidents, recovering from them, and testing recovery plans.', 'NIST SP 800-84: the NIST guide to designing and running test, training and exercise programmes, including tabletops.', 'CERT-In: expects organisations to report incidents within 6 hours, which only works if the process has been practised.']} />
      </Section>

      <Section n={2} title="Exercise overview">
        <Table head={['Item', 'Detail']} rows={[
          ['Scenario name', 'Operation Cold Trail: Retired Wallet Drain and Cross-Chain Laundering'],
          ['Duration', '3 to 4 hours'],
          ['Format', 'Facilitated discussion with timed injects'],
          ['Out of scope', 'Live system changes and real fund movements'],
        ]} />
        <Ul items={['→ Test how fast we detect and confirm a real breach, and avoid calling it a "false alarm".', '→ Test the decision to pause withdrawals and who can make it.', '→ Test the CERT-In 6-hour reporting process.', '→ Test freeze requests to stablecoin issuers, bridges and other exchanges.', '→ Test customer and media communication.', '→ Test recovery of wallet infrastructure and reconciliation of balances.']} />
      </Section>

      <Section n={3} title="Roles and participants">
        <Table head={['Role', 'What they own']} rows={ROLES} />
        <p className={`${P} font-semibold`}>RACI for key decisions (Responsible, Accountable, Consulted, Informed)</p>
        <Table head={['Decision', 'Responsible', 'Accountable', 'Consulted', 'Informed']} rows={RACI} min={720} />
      </Section>

      <Section n={4} title="The scenario story">
        <p className={P}>It is a Friday evening. Markets are busy after a big price move, and trading volume is three times normal. Half the engineering team has left for the weekend, and one SOC analyst is on shift. Two weeks ago, a DevOps engineer accepted a "take-home coding test" from a recruiter who seemed to be from a well-known firm.</p>
        <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
          {['Fake job offer sent to a DevOps engineer (the person who runs servers and deployment pipelines)', '→ malicious coding test installs malware (software that gives the attacker remote access)', '→ credentials and access to the signing infrastructure (systems that approve and sign transactions) stolen', '→ attacker finds retired wallets (addresses the company stopped using) that still hold funds', '→ unauthorised withdrawals', '→ stolen tokens swapped on a DEX (decentralised exchange: trading run by code, no account needed)', '→ bridged (moved through a cross-chain bridge) from Solana to Ethereum in chunks', '→ parked in dormant wallets (addresses with no activity) to wait'].map((x) => <li key={x} className="list-none -ml-5">{x}</li>)}
        </ol>
      </Section>

      <Section n={5} title="Timed injects">
        <Table head={['Time', 'What happens', 'Questions for the team', 'What a good answer looks like', 'Control or policy tested']} rows={INJECTS} min={980} />
        <Table head={['Curveball', 'What happens', 'What a good answer looks like']} rows={CURVEBALLS} min={720} />
      </Section>

      <Section n={6} title="Key decisions and discussion questions">
        <Ul items={DECISIONS} />
      </Section>

      <Section n={7} title="Regulatory and reporting checklist (India)">
        <Table head={['Item', 'Owner', 'Deadline']} rows={CHECKLIST.map((r) => [`☐ ${r[0]}`, r[1], r[2]])} min={720} />
        <p className="text-xs text-gray-500 dark:text-gray-400">Confirm all timelines against the current official text and your legal advisers before relying on them.</p>
      </Section>

      <Section n={8} title="DR and recovery steps">
        <ol className="space-y-0">
          {RECOVERY.map(([s, d], i) => (
            <li key={s}><div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3"><p className="text-sm font-semibold text-gray-900 dark:text-white">{s}</p><p className={P}>{d}</p></div>{i < RECOVERY.length - 1 && <p className="text-center text-gray-400 leading-6" aria-hidden="true">↓</p>}</li>
          ))}
        </ol>
        <Ul items={['RTO (recovery time objective): how long a service can be down before it must be back. Example target for withdrawals: 24 to 72 hours after containment, depending on severity.', 'RPO (recovery point objective): how much data you can afford to lose, measured in time. Example target for the customer ledger: near zero, because every balance must be exact.', 'These are example targets for discussion, not regulatory requirements.']} />
      </Section>

      <Section n={9} title="Evaluation and scoring">
        <Table head={['Area', 'What we tested', 'Rating', 'Notes']} rows={SCORECARD} />
        <Ul items={['Time to detect', 'Time to escalate', 'Time to pause withdrawals', 'Time to CERT-In report', 'Time to first freeze request', 'Time to restore service']} />
      </Section>

      <Section n={10} title="After-action report template">
        <Ul items={['Summary: scenario, date, participants and overall result.', 'Timeline of decisions: time, decision, who made it.', 'What went well.', 'Gaps found.', 'Root cause for each gap.', 'Retest date.']} />
        <Table head={['Action', 'Owner', 'Due date', 'Status']} rows={[['', '', '', 'Open'], ['', '', '', 'Open']]} />
      </Section>

      <Section n={11} title="Common gaps this exercise usually uncovers">
        <Ul items={GAPS} />
      </Section>

      <Section n={12} title="Facilitator tips">
        <Ul items={TIPS} />
      </Section>

      <Section n={13} title="Interview one-liners">
        <Ul items={[
          '"I design tabletops around real public incidents, so the team practises the decisions that actually went wrong, like calling a breach a false alarm."',
          '"Each inject tests a named control or policy, so every gap maps straight to a corrective action with an owner."',
          '"I always include the regulatory clock, like the CERT-In 6-hour report, because that is where teams fail under pressure."',
          '"The exercise is not finished until the after-action report has owners, dates and a retest date."',
        ]} />
      </Section>

      <details className={CARD}>
        <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Glossary</summary>
        <dl className="mt-3 space-y-2">
          {GLOSSARY.map(([t, m, a]) => <div key={t} className={P}><dt className="inline font-semibold text-gray-900 dark:text-white">{t}: </dt><dd className="inline">{m} <span className="italic">Like {a.charAt(0).toLowerCase() + a.slice(1)}</span></dd></div>)}
        </dl>
      </details>
      <p className="text-xs text-gray-500 dark:text-gray-400">Guidance only. Verify obligations against the official text before relying on them.</p>
    </div>
  );
}
