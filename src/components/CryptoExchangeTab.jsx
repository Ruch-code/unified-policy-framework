// Knowledge Base topic: security and compliance for crypto exchanges (virtual digital asset service providers),
// with two public CoinDCX incidents as worked examples. Facts are taken from the cited public reporting.
const H2 = 'text-xl font-bold text-gray-900 dark:text-white mb-3';
const CARD = 'bg-white border border-gray-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-gray-700';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows, min = 680 }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

// Vertical flow: numbered boxes joined by arrows. Readable on phones and in both themes.
function Flow({ steps, label }) {
  return (
    <ol aria-label={label} className="space-y-0">
      {steps.map(([t, d], i) => (
        <li key={t}>
          <div className="flex gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
            <span className="step-num shrink-0 w-7 h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center justify-center" aria-hidden="true">{i + 1}</span>
            <div><p className="text-sm font-semibold text-gray-900 dark:text-white">{t}</p><p className={P}>{d}</p></div>
          </div>
          {i < steps.length - 1 && <div className="ml-5 h-4 border-l-2 border-gray-300 dark:border-gray-600" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

const JULY_2025 = [
  ['Reconnaissance (16 July 2025)', 'The attacker sent a 1 USDT test transaction. The attacker\'s address had been funded with 1 ETH from Tornado Cash, a mixer.'],
  ['Access to an operational account', 'The attacker reached an internal operational liquidity account on Solana. CoinDCX said its liquidity infrastructure was breached; the exact method was not confirmed. One security expert suggested exposed backend credentials.'],
  ['Drain in about five minutes', 'About 44.2 million USD in USDT was moved out. Because the activity used legitimate operational privileges, it did not trigger alerts.'],
  ['Laundering across chains', 'Funds were swapped through Jupiter and bridged from Solana to Ethereum over Wormhole in chunks, then parked in dormant wallets.'],
  ['Detection and disclosure', 'An on-chain investigator flagged the theft publicly about 17 hours later. CoinDCX then confirmed it and was criticised for the delay.'],
  ['Response', 'Loss covered from treasury reserves; customer funds in cold storage were not affected; experts engaged to trace funds; a recovery bounty of up to 25% offered on 21 July. Public reporting linked the attack to the Lazarus Group (reported, not officially confirmed).'],
];

const OCT_2026 = [
  ['Retired wallets left active', 'Deposit addresses from before the July 2025 hack were treated as deprecated, but at least one was still in use by a liquidity provider months later.'],
  ['Sweeping service failed', 'The automated service that moves deposits out of user-facing addresses into secure wallets stopped working for a period. Deposits built up at the old address.'],
  ['Drain (21 October 2026)', 'Attackers emptied the old address: about 16 million USD in USDT.'],
  ['External detection', 'Outflows were flagged on X by outside researchers, not by the exchange.'],
  ['Conflicting statements', 'The CEO first called the reports a false alarm. The company later acknowledged "operational losses" and confirmed the amount in a blog update.'],
  ['Response', 'CoinDCX absorbed the loss and said user funds in segregated cold wallets were safe. Some stolen funds were frozen with outside help.'],
];

const APPLIED = [
  ['Segregation of operational and customer wallets', 'Applied', 'Limited both losses to company funds'],
  ['Cold storage for customer assets', 'Applied', 'Customer balances were not touched in either incident'],
  ['Treasury reserve to absorb losses', 'Applied', 'Trading and withdrawals continued'],
  ['Recovery bounty and forensic tracing', 'Applied after July 2025', 'Supports recovery, not prevention'],
  ['Behavioural monitoring of privileged and hot-wallet activity', 'Gap', 'A five-minute drain using valid privileges raised no alert'],
  ['Wallet lifecycle management (decommissioning)', 'Gap', 'Old addresses stayed live and receivable after the July 2025 hack'],
  ['Monitoring of the sweeping job itself', 'Gap', 'The failure was not noticed until funds were stolen'],
  ['Timely and consistent incident communication', 'Gap', 'Both incidents were first reported by outsiders; the first statement in October was later contradicted'],
];

const CONTROLS = [
  ['Multi-party approval (MPC or multisig) and per-transaction limits on hot and operational wallets', 'Integrity, least privilege, separation of duties', 'CCSS 1.04 Key usage; ISO A.8.2, A.5.3; SOC 2 CC6.1'],
  ['Velocity and anomaly alerts on wallet outflows, with automatic pause above a threshold', 'Detect and respond, defence in depth', 'ISO A.8.16; SOC 2 CC7.2; CCSS 2.01 Security audit logs'],
  ['Short-lived, vaulted credentials for operational systems; no standing access', 'Least privilege, zero trust', 'ISO A.5.17, A.8.5; SOC 2 CC6.1, CC6.2; MITRE T1078 Valid accounts'],
  ['Wallet inventory with an owner, status and decommission date for every address; retired addresses monitored and emptied', 'Asset management, accountability', 'ISO A.5.9, A.5.11; CCSS 1.02 Wallet creation, 1.08 Data sanitisation'],
  ['Monitoring and alerting on critical automated jobs (sweeping, settlement, reconciliation)', 'Availability, detect and respond', 'ISO A.8.16; SOC 2 CC7.2, A1.2'],
  ['Phishing-resistant MFA and fake-recruiter awareness for engineers and finance staff', 'Defence in depth, people security', 'ISO A.6.3, A.8.5; MITRE T1566 Phishing'],
  ['Key compromise playbook, tested in a tabletop', 'Resilience, preparedness', 'CCSS 1.05 Key compromise policy; ISO A.5.24 to A.5.26; SOC 2 CC7.4'],
  ['Disclosure procedure: CERT-In report within 6 hours, user and regulator updates, one approved spokesperson', 'Accountability, transparency', 'CERT-In Directions 2022; DPDP Act Section 8(6); ISO A.5.24'],
  ['Proof of reserves published on a schedule', 'Transparency, integrity', 'CCSS 1.09 Proof of reserve'],
  ['Independent security review of custody and bridge integrations', 'Assurance', 'CCSS 1.07 Third-party audits; ISO A.5.21, A.8.29'],
];

const REGS = [
  ['CERT-In Directions under Section 70B(6) (April 2022)', 'Report listed incidents within 6 hours; keep ICT logs for 180 days in India; sync clocks to NIC or NPL NTP; VDA providers keep KYC and transaction records for 5 years; name a point of contact.'],
  ['PMLA and FIU-IND AML/CFT guidelines for VDA service providers', 'VDA providers are reporting entities under PMLA since March 2023: register with FIU-IND, run KYC and customer due diligence, file suspicious transaction reports, keep records and appoint a designated director and principal officer.'],
  ['DPDP Act 2023 and DPDP Rules 2025', 'Reasonable security safeguards (Section 8(5)); notify the Data Protection Board and affected users of a personal data breach (Section 8(6) and the Rules).'],
  ['CryptoCurrency Security Standard (CCSS)', 'Three levels covering key generation, wallet creation, key storage and use, key compromise, keyholder access, audits, data sanitisation, proof of reserve and audit logs.'],
];

const SOURCES = [
  ['CoinDCX blog', 'https://coindcx.com/blog/'],
  ['The Block: CoinDCX confirms 16 million USD loss from retired wallets (Oct 2026)', 'https://theblock.co/news/business/2026-10-25-coindcx-confirms-16-million-loss-from-retired-wallets-days-after-ceo-called-breach-reports-a-false-alarm-431617'],
  ['Cointelegraph: how hackers stole 44 million USD from CoinDCX (July 2025)', 'https://cointelegraph.com/explained/how-hackers-stole-44m-from-coindcx-without-touching-user-wallets'],
  ['CERT-In Directions under Section 70B', 'https://www.cert-in.org.in/Directions70B.jsp'],
  ['FIU-IND', 'https://fiuindia.gov.in'],
  ['MeitY: data protection framework', 'https://www.meity.gov.in/data-protection-framework'],
  ['CryptoCurrency Security Standard', 'https://cryptoconsortium.org/standards/CCSS'],
  ['MITRE ATT&CK: Lazarus Group (G0032)', 'https://attack.mitre.org/groups/G0032/'],
  ['Chainalysis blog', 'https://www.chainalysis.com/blog/'],
];

export default function CryptoExchangeTab() {
  return (
    <div>
      <div className={CARD}>
        <h2 className={H2}>Crypto exchanges: security and compliance</h2>
        <p className={P}>Exchanges hold keys that move money in one step, so a single compromised account or forgotten wallet can mean an irreversible loss. The two public CoinDCX incidents below show where controls held and where they did not. Facts come from public reporting; the exchange has not published full root cause reports.</p>
      </div>

      <div className={CARD}>
        <h3 className={H2}>Indian obligations for VDA service providers</h3>
        <Table head={['Source', 'What it requires']} rows={REGS} min={560} />
      </div>

      <div className={CARD}>
        <h3 className={H2}>Case 1: CoinDCX operational wallet hack, July 2025 (about 44 million USD)</h3>
        <Flow steps={JULY_2025} label="July 2025 incident flow" />
      </div>

      <div className={CARD}>
        <h3 className={H2}>Case 2: CoinDCX retired wallet loss, October 2026 (about 16 million USD)</h3>
        <Flow steps={OCT_2026} label="October 2026 incident flow" />
      </div>

      <div className={CARD}>
        <h3 className={H2}>Controls applied and gaps</h3>
        <Table head={['Control', 'Status', 'Effect']} rows={APPLIED} />
      </div>

      <div className={CARD}>
        <h3 className={H2}>Controls to implement</h3>
        <Table head={['Control', 'Security principle', 'Maps to']} rows={CONTROLS} min={820} />
        <p className={`mt-3 ${P}`}>The Lazarus Group (MITRE ATT&CK G0032) often gets in through fake job offers and malicious files sent to engineers, then uses valid accounts. Chainalysis tracks how stolen funds move through mixers and bridges.</p>
      </div>

      <div className={CARD}>
        <h3 className={H2}>Sources</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {SOURCES.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer" className="ui-link">{t}</a></li>)}
        </ul>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Guidance only. Verify obligations against the official text before relying on them.</p>
      </div>
    </div>
  );
}
