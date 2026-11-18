import FlowDiagram, { CompareDiagram } from './FlowDiagram.jsx';

// Deeper dive on how Bitcoin, exchanges and decentralised exchanges work, written for a GRC reader.
// Written in our own words.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-gray-700';
const SUMMARY = 'cursor-pointer text-xl font-bold text-gray-900 dark:text-white';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';
const Ul = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;

function Table({ head, rows, min = 640 }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function CryptoDeepDive() {
  return (
    <details className={CARD} id="crypto-deep-dive">
      <summary className={SUMMARY}>Deeper dive: how Bitcoin, exchanges and DEXs work</summary>
      <div className="mt-3">
        <p className={P}>The basics above explain the vocabulary. This section explains the mechanics a GRC professional needs in an exchange interview: how a payment is confirmed, how an exchange runs, and how a decentralised exchange differs.</p>

        <h3 className={H}>1. The cryptography underneath</h3>
        <Ul items={[
          'Hash function: turns any data into a fixed-length fingerprint. Change one character and the fingerprint changes completely. Blocks are chained by including the previous block\'s hash.',
          'Public key cryptography: a private key signs, and anyone can check the signature with the matching public key. The private key never has to be shared.',
          'Digital signature: proves the owner of the key approved this exact transaction, and that nobody changed it afterwards.',
          'GRC angle: the same ideas protect TLS, code signing and document integrity, so key management controls (ISO 27001 A.8.24) apply in the same way.',
        ]} />

        <h3 className={H}>2. How a Bitcoin payment is confirmed</h3>
        <FlowDiagram steps={[
          { label: 'Wallet builds a transaction', note: 'Spends earlier outputs (UTXOs)' },
          { label: 'Signed with private key' },
          { label: 'Sent to nodes', note: 'Each checks the rules' },
          { label: 'Miner adds it to a block', note: 'Proof of work' },
          { label: 'Confirmations build up', note: 'Each new block adds one', tone: 'safe' },
        ]} caption="Exchanges usually wait for several confirmations before crediting a deposit, because a very recent block can occasionally be replaced." />
        <Ul items={[
          'UTXO (unspent transaction output): Bitcoin balances are not stored as account totals. A wallet holds a set of unspent outputs, like notes in a purse, and spends them as inputs to new transactions.',
          'Nodes: computers that keep a full copy of the ledger and reject any transaction or block that breaks the rules. No single company controls them.',
          'Mining and proof of work: miners compete to find a block hash below a target. The difficulty adjusts about every two weeks so blocks arrive roughly every 10 minutes.',
          'Fixed supply: new bitcoin enters only as a reward to miners, and the reward halves roughly every four years (about every 210,000 blocks), with total supply capped just under 21 million.',
          'Ethereum and Solana work differently: they use account balances and proof of stake, where validators lock up coins instead of spending electricity.',
        ]} />

        <h3 className={H}>3. How a centralised exchange works</h3>
        <FlowDiagram steps={[
          { label: 'Onboarding', note: 'KYC and risk rating' },
          { label: 'Deposit', note: 'INR via bank or crypto on chain' },
          { label: 'Internal ledger credit', note: 'Balance in the app' },
          { label: 'Order book and matching engine', note: 'Buyers matched to sellers' },
          { label: 'Withdrawal', note: 'Checks, then signed from hot wallet', tone: 'risk' },
        ]} />
        <Ul items={[
          'Most trading never touches the blockchain. Trades move balances in the exchange\'s internal ledger; only deposits and withdrawals go on chain. That is why reconciling the ledger against on-chain wallets is a key control.',
          'Order book: the list of open buy and sell orders at each price. The matching engine pairs them and records the trade.',
          'Market makers: firms that keep buy and sell orders on the book so customers can trade instantly. Exchanges often have contracts with them, which brings third-party and conflict-of-interest risk.',
          'Fiat rails: banking partners for rupee deposits and withdrawals. Losing a banking partner can stop the business, so it is a key dependency in the risk register.',
          'Revenue: mainly trading fees, plus listing, staking, lending and other services. Each new product can bring new regulatory duties.',
          'Proof of reserves: the exchange shows that wallet balances cover customer balances. It proves assets, not liabilities, unless the customer side is also checked.',
        ]} />

        <h3 className={H}>4. Centralised vs decentralised exchanges</h3>
        <CompareDiagram items={[
          { label: 'Centralised exchange (CEX)', points: ['A company runs it and holds customer keys', 'KYC, AML and local regulation apply', 'Order book and matching engine', 'Risk: custody, insiders, hacks of company wallets'] },
          { label: 'Decentralised exchange (DEX)', points: ['Smart contracts run it; users keep their own keys', 'Usually no KYC at the protocol level', 'Automated market maker (AMM) pools', 'Risk: contract bugs, price manipulation, fake tokens'] },
        ]} />
        <Ul items={[
          'Automated market maker (AMM): instead of matching buyers and sellers, users trade against a pool holding two tokens. A common design keeps the product of the two pool balances constant (x times y equals k), so the price moves as the pool balance shifts.',
          'Liquidity providers deposit both tokens into the pool and earn fees. They can lose value if prices move sharply (impermanent loss).',
          'Slippage: large trades move the pool price, so the trader gets a worse rate than quoted.',
          'GRC angle: a CEX that routes customer trades or treasury funds through DEXs takes on smart contract risk, which belongs in the third-party and technology risk assessment.',
        ]} />

        <h3 className={H}>5. Types of cryptoassets</h3>
        <Table head={['Type', 'What it is', 'Example', 'GRC angle']} rows={[
          ['Native coin', 'The base currency of a blockchain, used to pay fees', 'BTC, ETH, SOL', 'Custody and key management'],
          ['Stablecoin', 'Token designed to hold a fixed value, usually 1 US dollar', 'USDT, USDC', 'Issuer can freeze; check reserves and issuer risk'],
          ['Utility token', 'Gives access to a service on a platform', 'Platform fee or access tokens', 'Listing due diligence; may be treated as a security in some countries'],
          ['Governance token', 'Gives voting rights over a protocol', 'DEX governance tokens', 'Concentration of voting power'],
          ['NFT', 'Unique token representing a specific item', 'Digital art, tickets', 'Counts as a VDA in India; fraud and wash trading risk'],
        ]} />

        <h3 className={H}>6. Enterprise blockchain</h3>
        <Ul items={[
          'Public blockchains (Bitcoin, Ethereum) let anyone join. Permissioned blockchains limit who can run nodes and see data, which suits banks and supply chains.',
          'Common uses: trade finance, settlement between banks, supply chain tracking and shared records between partners who do not fully trust each other.',
          'GRC angle: permissioned networks still need access control, key management, change control and a clear operating agreement between members.',
        ]} />

        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">This section is written in our own words as general guidance. Figures such as block time, halving interval and supply cap are approximate protocol parameters.</p>
      </div>
    </details>
  );
}
