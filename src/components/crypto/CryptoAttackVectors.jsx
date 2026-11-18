import FlowDiagram from './FlowDiagram.jsx';

// "How attacks happen in the crypto world": common attack paths, their impact and the control that stops each.
// The website script case summarises public reporting (Cybernews); details not confirmed there are marked as such.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-gray-700';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

const VECTORS = [
  ['Malicious website scripts', 'A third-party script on a trusted website is altered and swaps the payment address shown to the user.', 'Customers pay the attacker; trust in the brand drops', 'Script inventory, Subresource Integrity, Content Security Policy, change alerts on third-party code'],
  ['Clipboard hijacking', 'Malware on the user\'s device replaces a copied wallet address with the attacker\'s.', 'Funds sent to the wrong address, with no way back', 'Show and confirm address checksums; whitelisted withdrawal addresses'],
  ['Address poisoning', 'The attacker sends tiny amounts from an address that looks like one the user often uses, hoping it gets copied from history.', 'Large payment sent to a look-alike address', 'Address book of verified addresses; warn on first-time destinations'],
  ['Phishing and fake apps', 'Fake sites, apps or support agents collect passwords, seed phrases or 2FA codes.', 'Account takeover and stolen balances', 'Phishing-resistant MFA, withdrawal cooling-off for new devices, user education'],
  ['Wallet drainers and malicious approvals', 'A user is tricked into signing a transaction that grants a contract permission to move their tokens.', 'Wallet emptied, often within minutes', 'Transaction simulation and clear signing prompts; approval review tools'],
  ['SIM swap', 'The attacker takes over the victim\'s phone number to receive SMS codes.', 'Account and withdrawal takeover', 'No SMS-based 2FA for withdrawals; app or hardware keys instead'],
  ['Social engineering of staff', 'Fake job offers or support requests deliver malware to employees with privileged access.', 'Hot or operational wallets drained', 'Signing on dedicated devices, PAM, multi-party approval (see technical controls)'],
  ['Front-end or DNS hijack', 'The attacker takes over the domain or hosting and serves a fake version of the site.', 'Mass theft from users of a legitimate site', 'Registrar lock, DNS monitoring, MFA on registrar and hosting accounts'],
  ['Smart contract and bridge exploits', 'A bug in contract code or a bridge lets the attacker mint or withdraw funds.', 'Large, fast losses that affect many users', 'Code audits, bug bounty, limits and pause switches on contracts'],
];

export default function CryptoAttackVectors({ open = false }) {
  return (
    <details className={CARD} open={open} id="crypto-attack-vectors">
      <summary className="cursor-pointer text-xl font-bold text-gray-900 dark:text-white">How attacks happen in the crypto world, and their impact</summary>
      <div className="mt-3">
        <p className={P}>Most crypto losses do not come from breaking cryptography. They come from tricking a person, a device or a trusted piece of software into sending funds to the wrong place. Because transfers cannot be reversed, the impact lands immediately.</p>

        <h3 className="mt-4 mb-1 font-semibold text-gray-900 dark:text-white">Recent example: malicious scripts on 178 company websites</h3>
        <p className={P}>Cybernews reported that attackers altered scripts delivered through a website optimisation platform used by 178 organisations across several industries. Visitors to affected sites could be served malicious code. The scripts targeted crypto payments by replacing the payment address with the attacker&apos;s wallet, and also skimmed card numbers, stole cookies and took screenshots. The report did not confirm how the platform was accessed, which crypto businesses were affected, or how much money was lost.</p>
        <FlowDiagram title="How a website script attack steals a crypto payment" steps={[
          { label: 'Third-party script altered', note: 'At the supplier, not the website owner', tone: 'risk' },
          { label: 'Trusted site loads it', note: 'No change on the site itself' },
          { label: 'Visitor starts a payment' },
          { label: 'Address swapped', note: 'Shown address is the attacker\'s', tone: 'risk' },
          { label: 'Payment sent', note: 'Cannot be reversed' },
        ]} caption="The website owner did nothing wrong in their own code. The risk sat in a supplier they trusted, which makes this a third-party and supply chain problem." />
        <p className={P}><span className="font-semibold">Why it matters for GRC:</span> third-party scripts are suppliers. They belong in the supplier inventory and risk assessment (ISO 27001 A.5.19 to A.5.22), and changes to them need monitoring like any other change (A.8.32). PCI DSS v4.0.1 requirements 6.4.3 and 11.6.1 already require an inventory of payment page scripts and detection of unauthorised changes.</p>

        <h3 className="mt-4 mb-1 font-semibold text-gray-900 dark:text-white">Common attack paths</h3>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Crypto attack paths">
          <table className="w-full min-w-[760px] text-sm">
            <thead><tr>{['Attack', 'How it works', 'Impact', 'Control that stops it'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{VECTORS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>

        <h3 className="mt-4 mb-1 font-semibold text-gray-900 dark:text-white">Impact on an exchange</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Direct loss: stolen funds usually cannot be recovered unless an issuer or exchange freezes them quickly.</li>
          <li>Customer harm: users lose funds even when the exchange&apos;s own systems were not breached.</li>
          <li>Regulatory: CERT-In reporting within 6 hours, possible FIU-IND reporting, and DPDP obligations if personal data (cookies, card data) was taken.</li>
          <li>Reputation: withdrawals spike and trust drops, which can turn a security event into a liquidity problem.</li>
        </ul>
      </div>
    </details>
  );
}
