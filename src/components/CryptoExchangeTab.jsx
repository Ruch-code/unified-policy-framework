import { Link } from 'react-router-dom';
import CryptoControlsTechnical from './crypto/CryptoControlsTechnical.jsx';
import FlowDiagram, { CompareDiagram } from './crypto/FlowDiagram.jsx';
import CryptoAttackVectors from './crypto/CryptoAttackVectors.jsx';
// Knowledge Base topic: security and compliance for crypto exchanges (virtual digital asset service providers),
// with two public CoinDCX incidents as worked examples. Facts are taken from the cited public reporting.
const H2 = 'text-xl font-bold text-gray-900 dark:text-white mb-3';
const CARD = 'bg-white border border-gray-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-gray-700';
const SUMMARY = 'cursor-pointer text-xl font-bold text-gray-900 dark:text-white';
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
  ['Laundering across chains', 'Funds were swapped, moved from Solana to Ethereum in chunks and parked in dormant wallets. See "How the funds were laundered" below for each step.'],
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


// Bullet group with an optional "Why it matters for GRC" line.
function Group({ title, items, why, link }) {
  return (
    <div className="mb-4">
      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{title}</h4>
      <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>
      {why && <p className={`mt-1 ${P}`}><span className="font-semibold">Why it matters for GRC: </span>{why}</p>}
      {link && <p className={`mt-1 ${P}`}><Link className="ui-link" to={link[1]}>{link[0]}</Link></p>}
    </div>
  );
}

const BASICS = [
  ['What cryptocurrency is', [
    'Digital money that exists only as entries on a shared public ledger. No bank or central authority keeps the record.',
    'Ownership is proven with cryptographic keys, not with an account in your name.',
  ]],
  ['How it works', [
    'Blockchain: a ledger made of blocks of transactions, each linked to the one before, copied across thousands of computers. Changing past entries is practically impossible.',
    'Transaction: an instruction such as "send 10 USDT from address A to address B", signed with the sender\'s private key.',
    'Validation: the network checks and records transactions. Bitcoin uses mining (computers compete to add the next block). Ethereum and Solana use staking (validators lock up coins and are chosen to confirm blocks).',
    'Public and private keys: the private key is a secret that authorises spending. Whoever holds it controls the funds. The public key is derived from it and can be shared.',
    'Wallet address: a public identifier, derived from the public key, that others send funds to. It works like an account number anyone can see.',
    'Transactions cannot be reversed. Once stolen funds leave an address, there is no chargeback.',
  ]],
  ['What a crypto exchange is', [
    'A company, such as CoinDCX, that lets customers buy, sell and hold crypto, usually against Indian rupees.',
    'The exchange holds the private keys on behalf of customers (custody). Customers see a balance in the app; the coins sit in wallets the exchange controls.',
    'Customer funds are usually pooled, with an internal ledger recording what each customer owns.',
  ]],
  ['Hot, cold, retired and dormant wallets', [
    'Hot wallet: keys are on internet-connected systems so withdrawals can be processed quickly. Convenient, but exposed to online attack.',
    'Cold wallet: keys are kept offline, for example on hardware devices in a vault. Much safer, but slower to use.',
    'Exchanges keep most funds cold and only what is needed for daily withdrawals and trading hot.',
    'Operational or liquidity wallet: a hot wallet used to settle trades or move funds between venues. In July 2025 one of these was drained.',
    'Retired (deprecated) wallet: an address the company has stopped using. If anyone still sends funds to it, or its keys are still exposed, it can still be drained. This was the problem in October 2026.',
    'Dormant wallet: any address with no recent activity. Attackers park stolen funds in dormant wallets to wait.',
  ]],
  ['Tokens named on this page', [
    'BTC (Bitcoin): the first cryptocurrency, used mainly as a store of value.',
    'ETH (Ether): the native coin of Ethereum, used to pay network fees and as collateral in decentralised finance.',
    'SOL: the native coin of Solana, used to pay fees and for staking on that network.',
    'USDT (Tether): a stablecoin designed to stay at 1 US dollar, backed by reserves held by its issuer, Tether. It is the most common token for trading and moving value.',
    'Why USDT matters here: because it tracks the dollar, stolen USDT keeps its value. Because a central issuer controls the token contract, Tether can freeze USDT held at specific addresses, which is one of the few ways stolen crypto can be stopped.',
  ]],
  ['Chains and why one token exists on several', [
    'A chain is a separate blockchain network with its own rules, validators and fees, for example Solana or Ethereum.',
    'Tokens such as USDT are issued on several chains. USDT on Solana and USDT on Ethereum are separate tokens with the same value, recorded on different ledgers.',
    'Moving value between chains needs a bridge (explained below), which is why cross-chain moves are a common laundering step.',
  ]],
];

const LAUNDERING = [
  'Swap on Jupiter: Jupiter is a decentralised exchange aggregator on Solana. It finds the best price across many on-chain trading pools and executes the swap without any account or KYC. Attackers swap stolen USDT for other tokens, such as SOL, quickly, partly because the issuer can freeze USDT but not SOL.',
  'Bridge over Wormhole: a cross-chain bridge locks tokens on one chain and releases an equivalent amount on another. Wormhole connects Solana, Ethereum and other chains. The attacker used it to move value from Solana to Ethereum.',
  'Why change chains: each hop adds a new set of addresses and transactions to follow, spreads the trail across two ledgers, and moves funds to where more mixers, exchanges and cash-out routes are available. It also puts funds out of reach of tools tied to the original chain.',
  'Why move in chunks: reporting describes transfers in chunks of roughly 1,000 to 4,000 SOL. Smaller amounts are less likely to trip monitoring thresholds, bridge or pool limits, and price slippage on large trades.',
  'Why park in dormant wallets: the funds were left in wallets with no further activity. Attackers often wait weeks or months until public attention and active monitoring fade, then cash out through mixers or less strict exchanges.',
  'How investigators trace it: every transaction is public, so analysts follow the funds address by address. Blockchain analytics firms cluster addresses that belong to the same actor, label known services (exchanges, bridges, mixers) and alert exchanges when tainted funds arrive so they can be frozen at deposit.',
  'Who froze the funds: for the July 2025 theft, the reporting used here does not confirm that any funds were frozen, so this page does not name anyone. For the October 2026 loss, The Block reported that on-chain investigator ZachXBT said he helped freeze stolen funds worth six figures; it did not say which party carried out the freeze. Freezing works only where a central party controls the asset or account: a stablecoin issuer blacklisting an address, or an exchange blocking a deposit.',
];

const GLOSSARY = [
  ['MITRE ATT&CK', [
    'A free, public knowledge base of attacker tactics and techniques built from real incidents, run by MITRE, a US not-for-profit.',
    'Security teams use it to map detections, test defences and describe incidents in a common language (for example T1566 Phishing, T1078 Valid accounts).',
    'Its Lazarus Group entry (G0032) describes a North Korea-linked threat group known for large crypto thefts, often starting with fake job offers or malicious files sent to staff, then using valid accounts.',
  ], 'It turns a vague threat into specific techniques you can check your controls and monitoring against.'],
  ['CryptoCurrency Security Standard (CCSS)', [
    'A security standard for systems that store and use crypto keys, published by the CryptoCurrency Certification Consortium (C4).',
    'Three levels: Level I, II and III, each stricter than the last.',
    'Covers key and seed generation, wallet creation, key storage, key usage, key compromise policy, granting and revoking keyholder access, third-party security audits, data sanitisation, proof of reserve and security audit logs.',
  ], 'ISO 27001 and SOC 2 do not go deep on key custody; CCSS fills that gap for wallets.', ['Open the CCSS playbook', '/ccss']],
  ['VDA (Virtual Digital Asset)', [
    'Defined in Section 2(47A) of the Income Tax Act, 1961, added by the Finance Act, 2022.',
    'Covers any information, code, number or token generated through cryptographic means that has value or is used as a store of value or unit of account, including crypto tokens and NFTs. It excludes Indian and foreign currency.',
    'This is why Indian law and regulators refer to crypto exchanges as VDA service providers.',
  ], 'The VDA label is what brings an exchange under Indian tax, AML and reporting rules.'],
  ['PMLA (Prevention of Money Laundering Act, 2002)', [
    'India\'s main anti-money-laundering law.',
    'A Ministry of Finance notification of March 2023 made VDA service providers "reporting entities" under PMLA.',
  ], 'Being a reporting entity creates legal AML duties with penalties for failure.', ['Open the PMLA and FIU-IND playbook', '/pmla-vda']],
  ['FIU-IND AML/CFT obligations', [
    'FIU-IND is the Financial Intelligence Unit of India, under the Ministry of Finance. It receives and analyses reports on suspicious financial activity.',
    'AML means anti-money laundering. CFT means countering the financing of terrorism.',
    'Main duties for VDA providers: register with FIU-IND, run KYC and customer due diligence, monitor transactions, file suspicious transaction reports, keep records, and appoint a designated director and a principal officer.',
  ], 'Stolen funds passing through or out of an exchange are an AML event, not only a security incident.', ['Open the PMLA and FIU-IND playbook', '/pmla-vda']],
  ['CERT-In Directions under Section 70B (April 2022)', [
    'Issued by CERT-In, India\'s national computer emergency response team, under Section 70B(6) of the IT Act, 2000.',
    'Listed cyber incidents must be reported to CERT-In within 6 hours of noticing them.',
    'Organisations must keep ICT logs and synchronise system clocks to the national time servers.',
  ], 'The 6-hour clock starts at detection, so incident response plans must include a CERT-In reporting step.'],
  ['ICT logs', [
    'ICT stands for Information and Communication Technology.',
    'Covers system, network, application and access logs: for example firewall, server, database, authentication and wallet service logs.',
    'Must be kept for 180 days and stored within India.',
    'VDA providers must also keep KYC records and financial transaction records for 5 years.',
  ], 'Without these logs you cannot reconstruct an incident or satisfy CERT-In and FIU-IND.'],
  ['MeitY and the DPDP Act, 2023', [
    'The Ministry of Electronics and Information Technology (MeitY) administers the Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025.',
    'Exchanges hold a lot of personal data: identity documents, bank details and transaction history. They must apply reasonable security safeguards and report personal data breaches to the Data Protection Board and affected users.',
  ], 'A wallet theft that also exposes KYC data becomes a reportable personal data breach.'],
];

export default function CryptoExchangeTab() {
  return (
    <div>
      <div className={CARD}>
        <h2 className={H2}>Crypto exchanges: security and compliance</h2>
        <p className={P}>Exchanges hold keys that move money in one step, so a single compromised account or forgotten wallet can mean an irreversible loss. The two public CoinDCX incidents below show where controls held and where they did not. Facts come from public reporting; the exchange has not published full root cause reports.</p>
      </div>

      <details className={CARD}>
        <summary className={SUMMARY}>Crypto basics</summary>
        <div className="mt-3">
        <FlowDiagram title="How a crypto transfer works" steps={[
          { label: 'Private key signs', note: 'The owner approves the transfer' },
          { label: 'Sent to the network', note: 'Broadcast to the blockchain' },
          { label: 'Validators confirm', note: 'Mining or staking' },
          { label: 'Added to the ledger', note: 'Public, permanent record' },
          { label: 'Final', note: 'Cannot be reversed', tone: 'risk' },
        ]} />
        <FlowDiagram title="How an exchange holds customer funds" steps={[
          { label: 'Customer deposits', note: 'To a deposit address' },
          { label: 'Sweep', note: 'Moved out automatically' },
          { label: 'Hot wallet', note: 'Small amount, online', tone: 'risk' },
          { label: 'Cold wallet', note: 'Most funds, offline', tone: 'safe' },
        ]} caption="The exchange holds the keys. Customers see a balance in the app; the internal ledger records who owns what." />
        <CompareDiagram title="Hot vs cold vs retired wallets" items={[
          { label: 'Hot wallet', tone: 'risk', points: ['Keys online', 'Fast withdrawals', 'Easier to attack'] },
          { label: 'Cold wallet', tone: 'safe', points: ['Keys offline', 'Slow, needs approvals', 'Holds most funds'] },
          { label: 'Retired wallet', points: ['No longer in use', 'Dangerous if it still holds funds or its keys still exist', 'Should be emptied and watched'] },
        ]} />
        {BASICS.map(([t, items]) => <Group key={t} title={t} items={items} />)}
        </div>
      </details>

      <details className={CARD}>
        <summary className={SUMMARY}>Indian obligations for VDA service providers</summary>
        <div className="mt-3">
        <Table head={['Source', 'What it requires']} rows={REGS} min={560} />
        </div>
      </details>

      <CryptoAttackVectors />

      <details className={CARD}>
        <summary className={SUMMARY}>Case 1: CoinDCX operational wallet hack, July 2025 (about 44 million USD)</summary>
        <div className="mt-3">
        <Flow steps={JULY_2025} label="July 2025 incident flow" />
        </div>
      </details>

      <details className={CARD}>
        <summary className={SUMMARY}>How the funds were laundered (July 2025)</summary>
        <div className="mt-3">
        <FlowDiagram title="The laundering path at a glance" steps={[
          { label: 'Stolen USDT', note: 'On Solana; issuer can freeze it', tone: 'risk' },
          { label: 'Swap on Jupiter', note: 'DEX: no account, no KYC' },
          { label: 'Now SOL', note: 'Cannot be frozen by an issuer' },
          { label: 'Wormhole bridge', note: 'Solana to Ethereum, in chunks' },
          { label: 'Now on Ethereum', note: 'New chain, new addresses' },
          { label: 'Dormant wallets', note: 'Wait for attention to fade', tone: 'risk' },
        ]} caption="Each step makes the funds harder to freeze and trace. Investigators can still follow them, because every transaction is public." />
        <ol className={`list-decimal pl-5 space-y-2 ${P}`}>{LAUNDERING.map((x) => <li key={x}>{x}</li>)}</ol>
        </div>
      </details>

      <details className={CARD}>
        <summary className={SUMMARY}>Case 2: CoinDCX retired wallet loss, October 2026 (about 16 million USD)</summary>
        <div className="mt-3">
        <CompareDiagram title="What should happen to a retired wallet, and what happened here" items={[
          { label: 'Should happen', tone: 'safe', points: ['Sweep to zero', 'Revoke and destroy keys', 'Tell partners it is retired', 'Alert on any activity'] },
          { label: 'Reported in October 2026', tone: 'risk', points: ['Old address still received funds', 'Sweep service failed for a period', 'Drained by attackers', 'Spotted by outsiders first'] },
        ]} />
        <Flow steps={OCT_2026} label="October 2026 incident flow" />
        </div>
      </details>

      <details className={CARD}>
        <summary className={SUMMARY}>Controls applied and gaps</summary>
        <div className="mt-3">
        <Table head={['Control', 'Status', 'Effect']} rows={APPLIED} />
        </div>
      </details>

      <details className={CARD}>
        <summary className={SUMMARY}>Controls to implement</summary>
        <div className="mt-3">
        <Table head={['Control', 'Security principle', 'Maps to']} rows={CONTROLS} min={820} />
        <p className={`mt-3 ${P}`}>The Lazarus Group (MITRE ATT&CK G0032) often gets in through fake job offers and malicious files sent to engineers, then uses valid accounts. Chainalysis tracks how stolen funds move through mixers and bridges.</p>
        </div>
      </details>

      <CryptoControlsTechnical />

      <details className={CARD}>
        <summary className={SUMMARY}>Key terms and regulations</summary>
        <div className="mt-3">
        <FlowDiagram title="Reporting clocks after a crypto incident in India" steps={[
          { label: 'Incident noticed', note: 'The clock starts here', tone: 'risk' },
          { label: 'CERT-In report', note: 'Within 6 hours' },
          { label: 'Preserve ICT logs', note: 'Keep 180 days, in India' },
          { label: 'STR to FIU-IND', note: 'If funds or users are suspicious' },
          { label: 'DPDP breach notice', note: 'If personal data affected' },
        ]} caption="Timelines summarised from the sources described below. Confirm against the official text." />
        {GLOSSARY.map(([t, items, why, link]) => <Group key={t} title={t} items={items} why={why} link={link} />)}
        </div>
      </details>

      <p className="text-xs text-gray-500 dark:text-gray-400">Guidance only. Verify obligations against the official text before relying on them.</p>
    </div>
  );
}
