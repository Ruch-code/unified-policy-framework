// Crypto, Web3 and traditional financial controls: the gaps not already covered in the crypto basics and deep dive.
// Each section marks Fact (verified, widely documented), Interpretation (our analysis) or Jurisdiction (varies by country).
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: 640 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const Tag = ({ t }) => {
  const c = { Fact: 'bg-green-50 text-green-800 border-green-200', Interpretation: 'bg-blue-50 text-blue-800 border-blue-200', Jurisdiction: 'bg-amber-50 text-amber-800 border-amber-200' }[t];
  return <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded border align-middle ${c}`}>{t}</span>;
};

export default function CryptoFinancialControls() {
  return (
    <details className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-gray-700" id="crypto-financial-controls">
      <summary className="cursor-pointer text-xl font-bold text-gray-900 dark:text-white">Crypto, Web3 and financial controls: comparisons, regulators and scams</summary>
      <div className="mt-3">
        <p className={P}>This extends the basics and deep dive above with what they do not cover. Labels show what kind of statement each part is: <Tag t="Fact" /> widely documented, <Tag t="Interpretation" /> our analysis, <Tag t="Jurisdiction" /> depends on country and changes often. Not legal or investment advice.</p>

        <h3 className={H}>Web2 vs Web3 <Tag t="Fact" /></h3>
        <Table head={['Aspect', 'Web2', 'Web3']} rows={[
          ['Who holds data and accounts', 'The platform company', 'The user, through wallets and keys, with records on a blockchain'],
          ['Login', 'Username, password, SSO', 'Wallet signature'],
          ['Recovery', 'Password reset by the company', 'Seed phrase or recovery set up in advance; often no reset'],
          ['Rules', 'Company terms, changed by the company', 'Smart contract code, changed only if the contract allows upgrades'],
          ['GRC angle', 'Classic access, privacy and vendor controls', 'Key management, smart contract audits, on-chain monitoring'],
        ]} />

        <h3 className={H}>Wallet types, including smart wallets <Tag t="Fact" /></h3>
        <Table head={['Type', 'Who holds the key', 'Note']} rows={[
          ['Custodial', 'A company such as an exchange', 'Easy for users; the company carries custody risk'],
          ['Self-custody (externally owned account)', 'The user, as one private key or seed phrase', 'Lose the key, lose the funds'],
          ['Multisig', 'Several keys, M of N must sign', 'Common for treasuries'],
          ['MPC', 'Key split into shares across parties; never whole in one place', 'Common at institutional custodians'],
          ['Smart contract wallet ("smart wallet")', 'Controlled by contract logic, often with passkeys', 'Allows spending limits, recovery and paying fees for users (account abstraction, for example Ethereum ERC-4337)'],
        ]} />

        <h3 className={H}>Bitcoin vs stocks <Tag t="Fact" /></h3>
        <Table head={['Aspect', 'Bitcoin', 'Listed stock']} rows={[
          ['What you own', 'A digital asset with no issuer', 'A share of ownership in a company'],
          ['Value driver', 'Supply and demand only; no earnings', 'Company earnings, assets and expectations'],
          ['Trading hours', '24 hours, every day', 'Exchange hours'],
          ['Settlement', 'On chain, final after confirmations', 'Through a clearing house (T+1 in the US since May 2024)'],
          ['Investor protection', 'Limited; depends on the platform and country', 'Securities law, disclosure rules, and in the US SIPC cover for broker failure (not market losses)'],
          ['Custody', 'Your own keys or a custodian', 'Broker and central depository'],
        ]} />

        <h3 className={H}>ETH vs ERC-20 tokens <Tag t="Fact" /></h3>
        <p className={P}>ETH is the native coin of Ethereum, used to pay network fees. ERC-20 is a technical standard for tokens built on Ethereum by smart contracts, for example USDC. Practical points: an ERC-20 transfer still needs ETH for fees; the token issuer's contract can include admin powers such as freezing or minting; and a token with a familiar name may be a fake contract, so exchanges verify the contract address before listing or crediting deposits.</p>

        <h3 className={H}>Roles in the ecosystem <Tag t="Fact" /></h3>
        <Table head={['Role', 'What they do', 'Main risk they bring']} rows={[
          ['Exchange (CEX)', 'Matches trades and often holds customer assets', 'Custody, insider and solvency risk'],
          ['Custodian', 'Holds keys for institutions', 'Key compromise, operational errors'],
          ['Broker', 'Executes orders for clients, often through exchanges', 'Best execution, client asset protection'],
          ['Stablecoin issuer', 'Issues tokens backed by reserves', 'Reserve quality, freezing powers'],
          ['Validator or miner', 'Confirms transactions', 'Network-level risk, usually outside a firm\'s control'],
          ['Market maker', 'Provides buy and sell prices', 'Conflicts, manipulation'],
          ['Auditor and attestation provider', 'Checks controls, reserves or smart contracts', 'Limited scope; an attestation is not a guarantee'],
        ]} />

        <h3 className={H}>US regulators <Tag t="Jurisdiction" /></h3>
        <Table head={['Body', 'Role', 'Crypto relevance']} rows={[
          ['SEC', 'Securities regulator', 'Tokens that are securities, crypto ETPs, broker and exchange registration'],
          ['FINRA', 'Self-regulatory body for broker-dealers', 'Supervises broker-dealers offering crypto-related products'],
          ['CFTC', 'Derivatives and commodities regulator', 'Treats Bitcoin and some other assets as commodities; oversees crypto futures'],
          ['FinCEN', 'Anti-money-laundering authority under the Treasury', 'Exchanges and many crypto businesses are money services businesses: registration, AML programme, suspicious activity reports, Travel Rule'],
          ['OFAC', 'Sanctions enforcement under the Treasury', 'Sanctioned wallet addresses; firms must screen and block'],
        ]} />
        <p className={P}>The split of authority between the SEC and CFTC for crypto has been changing through legislation and agency guidance. Check the current position before relying on it. In India, the equivalent touchpoints are FIU-IND registration under PMLA, covered above.</p>

        <h3 className={H}>Controls: common, stock-specific and crypto-specific <Tag t="Interpretation" /></h3>
        <Table head={['Type', 'Examples']} rows={[
          ['Common to both', 'KYC and AML, sanctions screening, access control and SoD, change management, client money reconciliation, trade surveillance, complaints handling, BCP'],
          ['Stock-specific', 'Best execution, trade reporting, clearing and settlement reconciliation, corporate actions processing, insider lists, market abuse rules'],
          ['Crypto-specific', 'Key generation and storage, hot and cold wallet limits, withdrawal address allow-lists, blockchain analytics for risky wallets, deposit confirmation thresholds, token contract verification, proof of reserves, Travel Rule data exchange'],
        ]} />

        <h3 className={H}>ITGC and ITAC in a trading or crypto platform <Tag t="Interpretation" /></h3>
        <Table head={['Control', 'Kind', 'What to test']} rows={[
          ['Access to wallet signing and admin consoles', 'ITGC', 'Approval, quarterly review, MFA, no shared accounts'],
          ['Change control on the matching engine and wallet service', 'ITGC', 'Peer review, testing, approval and segregation from deployers'],
          ['Job monitoring for reconciliations', 'ITGC', 'Failures followed up and closed'],
          ['Withdrawal limit and approval workflow', 'ITAC', 'Reperform: a withdrawal over the limit must be held for second approval'],
          ['Fee calculation', 'ITAC', 'Recalculate fees on sample trades'],
          ['Sanctions address block', 'ITAC', 'Attempt a test transfer to a listed address in a test environment; it must be blocked'],
          ['Ledger to wallet reconciliation', 'ITAC with manual review', 'Inspect breaks and their resolution'],
        ]} />

        <h3 className={H}>Common scams <Tag t="Fact" /></h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Ponzi and pyramid schemes: early investors paid from new investors' money, often with referral rewards.</li>
          <li>Pig butchering: long-running relationship or investment scams leading to a fake trading platform.</li>
          <li>Rug pulls: developers launch a token, attract money, then drain liquidity.</li>
          <li>Phishing and wallet drainers: fake sites that trick users into signing a harmful approval.</li>
          <li>Impersonation and fake support: "support staff" asking for seed phrases.</li>
          <li>Pump and dump: coordinated buying and hype, then selling to late buyers.</li>
        </ul>

        <h3 className={H}>Case study: OneCoin <Tag t="Fact" /></h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>OneCoin was promoted from 2014 as a cryptocurrency, sold through multi-level marketing "education packages". US prosecutors say it raised billions of dollars from investors worldwide.</li>
          <li>There was no real blockchain behind it. Coin values were set internally, not by a market.</li>
          <li>Founder Ruja Ignatova was charged in the US and disappeared in October 2017. She was added to the FBI's Ten Most Wanted Fugitives list in 2022.</li>
          <li>Co-founder Karl Sebastian Greenwood pleaded guilty in the US and was sentenced to 20 years in prison in 2023.</li>
        </ul>
        <p className={`${P} mt-2`}><strong>GRC lessons <Tag t="Interpretation" /></strong></p>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Verify the technology: ask for a public, independently verifiable chain or contract address.</li>
          <li>Returns that come mainly from recruiting others are a pyramid signal.</li>
          <li>Banks and exchanges need due diligence on crypto-related customers and the source of funds, not only on the customer's name.</li>
          <li>Prices that never fall, or that only one platform quotes, are a red flag.</li>
        </ul>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Sources: US Department of Justice (SDNY) OneCoin case releases; FBI Ten Most Wanted listing; SEC, CFTC, FinCEN and OFAC public guidance; Ethereum ERC-20 and ERC-4337 specifications.</p>
      </div>
    </details>
  );
}
