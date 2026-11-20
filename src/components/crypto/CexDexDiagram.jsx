// Side-by-side picture of how a trade works on a centralised exchange (CEX) and a decentralised exchange (DEX).
// The dashed box marks who controls the keys at each step. Stacks on phones; borders only, so it reads in light and dark mode.
const BOX = 'rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-center';
const T = 'text-sm font-semibold text-gray-900 dark:text-white';
const N = 'mt-0.5 text-xs text-gray-600 dark:text-gray-300';
const ARROW = <span aria-hidden="true" className="block text-center text-lg leading-5 text-gray-400">↓</span>;

function Step({ title, note, tone }) {
  const t = tone === 'risk' ? 'border-2 border-red-500' : tone === 'safe' ? 'border-2 border-emerald-600' : '';
  return <div className={`${BOX} ${t}`}><p className={T}>{title}</p>{note && <p className={N}>{note}</p>}</div>;
}

function Zone({ label, children }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-gray-400 dark:border-gray-500 p-2 space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 text-center">{label}</p>
      {children}
    </div>
  );
}

const ROWS = [
  ['Who holds the keys', 'The exchange holds keys for customer funds in its own wallets', 'You hold your own keys in your wallet'],
  ['Who you trust', 'The company: its security, honesty and solvency', 'The smart contract code and the blockchain'],
  ['Where the trade happens', 'Inside the exchange\'s private ledger, matched by its order book', 'On chain, against a liquidity pool, in one transaction'],
  ['Identity checks', 'KYC and AML under local regulation', 'Usually none at the protocol level'],
  ['Typical failure', 'Hot wallet hack, insider theft, insolvency, frozen withdrawals', 'Contract bug, price manipulation, fake tokens, user signs a malicious approval'],
  ['If something goes wrong', 'Complain to the company or regulator; funds may be recoverable', 'Usually no one to call; on-chain transfers cannot be reversed'],
];

export default function CexDexDiagram() {
  return (
    <figure className="my-4" aria-label="How a trade works on a centralised and a decentralised exchange">
      <figcaption className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">How one trade works on each type of exchange</figcaption>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <p className="text-sm font-bold text-gray-900 dark:text-white text-center">Centralised exchange (CEX)</p>
          <Step title="You" note="Account with login and KYC" />
          {ARROW}
          <Step title="Deposit" note="Rupees by bank, or crypto sent to the exchange's address" />
          {ARROW}
          <Zone label="Inside the exchange: the company controls the keys">
            <Step title="Exchange wallets" note="Hot wallet for daily use, cold storage for the rest" tone="risk" />
            {ARROW}
            <Step title="Internal ledger" note="Your balance is a number in the exchange's database" />
            {ARROW}
            <Step title="Order book and matching engine" note="Your buy order is matched with another customer's sell order" />
          </Zone>
          {ARROW}
          <Step title="Withdrawal" note="Exchange checks it, then signs from its hot wallet to your wallet" tone="safe" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-gray-900 dark:text-white text-center">Decentralised exchange (DEX)</p>
          <Zone label="Your wallet: you control the keys">
            <Step title="You" note="Self-custody wallet, no account" tone="safe" />
            {ARROW}
            <Step title="Sign a swap transaction" note="Approve the token, then swap" />
          </Zone>
          {ARROW}
          <Zone label="On chain: code controls the pool">
            <Step title="Smart contract liquidity pool" note="Two tokens; price set by a formula such as x times y equals k" tone="risk" />
            {ARROW}
            <Step title="Swap settles in the same transaction" note="Tokens leave the pool and arrive in your wallet" />
          </Zone>
          {ARROW}
          <Step title="Your wallet" note="New tokens, still under your keys" tone="safe" />
        </div>
      </div>
      <div className="mt-4 overflow-x-auto" tabIndex={0} role="region" aria-label="CEX and DEX compared">
        <table className="w-full text-sm min-w-[640px]">
          <thead><tr>{['', 'Centralised (CEX)', 'Decentralised (DEX)'].map((h) => <th key={h} scope="col" className="p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">{h}</th>)}</tr></thead>
          <tbody>{ROWS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`p-2 align-top border-t border-gray-200 dark:border-gray-700 ${j === 0 ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">Red borders mark where most losses happen: the exchange's hot wallet on a CEX, the pool contract on a DEX. Green borders mark the points you control.</p>
    </figure>
  );
}
