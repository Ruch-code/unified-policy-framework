// Cross-organisation AI agent interactions in banking and payments: the trust problem, who is responsible, and controls.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: head.length > 2 ? 760 : 560 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function AgentToAgentBanking() {
  return (
    <details className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="agent-to-agent-banking">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">When AI agents talk to other organisations' agents: banking and payments</summary>
      <div className="mt-3">
        <p className={P}>AI agents are starting to act across organisations, not just inside one. Picture a customer's personal agent instructing the bank's agent, which calls a payment provider's agent, which settles with a merchant's agent. Some banks are restricting third-party agents from accessing customer accounts; others are updating terms to make customers responsible for what their agents do, while also building agents of their own.</p>

        <h3 className={H}>The three hard questions</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li><strong>Who is responsible</strong> when a transaction goes wrong: the customer, their agent's provider, the bank, the payment provider or the merchant?</li>
          <li><strong>Which agents can be trusted</strong>, and how does the bank know who built and operates an agent and whether it is genuine?</li>
          <li><strong>What is the agent allowed to do</strong>, and has the instruction been changed or injected somewhere along the chain?</li>
        </ul>

        <h3 className={H}>Bank's own agent vs a third-party agent</h3>
        <Table head={['Topic', 'Bank-provided agent', 'Customer-chosen third-party agent']} rows={[
          ['Who builds and controls it', 'The bank', 'An outside provider the customer picked'],
          ['Bank\'s responsibility', 'Largely the bank\'s, like any bank channel', 'Shared; depends on terms, regulation and how access was granted'],
          ['Main risk', 'Model errors, prompt injection, over-broad permissions', 'Unknown provider security, credential sharing, screen-scraping, unclear liability'],
          ['Key control', 'Bank\'s own AI governance and testing', 'Controlled access through approved APIs and consent, not shared passwords'],
        ]} />

        <h3 className={H}>Risks along the chain</h3>
        <Table head={['Risk', 'What can go wrong']} rows={[
          ['Impersonation', 'A malicious agent pretends to be a trusted agent or the customer.'],
          ['Instruction tampering', 'The amount, payee or purpose is changed between agents, or injected through content an agent read.'],
          ['Scope creep', 'An agent authorised to pay one bill moves money elsewhere or reads data it does not need.'],
          ['Credential sharing', 'Customers give agents their banking passwords, bypassing strong authentication.'],
          ['No audit trail', 'Nobody can reconstruct which agent did what, on whose authority.'],
          ['Unclear liability', 'Disputes and refunds stall because each party points to another.'],
          ['Speed and scale', 'Automated agents can repeat a bad instruction many times before anyone notices.'],
        ]} />

        <h3 className={H}>Controls and mitigations</h3>
        <Table head={['Control area', 'What to put in place']} rows={[
          ['Agent identity', 'Every agent has a verifiable identity tied to the organisation that operates it, for example signed requests and certificates, and is registered with the bank before it gets access.'],
          ['Delegated authority (mandates)', 'The customer grants a specific, signed permission: which accounts, payees, limits per transaction and per day, purpose and expiry. The bank checks every instruction against it.'],
          ['No password sharing', 'Third-party agents connect through bank APIs with OAuth-style consent and scoped tokens, not the customer\'s login. Tokens are short-lived and revocable from the bank app.'],
          ['Step-up for high risk', 'New payees, large amounts or unusual patterns need the human to confirm in the bank\'s own app, outside the agent chain.'],
          ['Instruction integrity', 'Sign transaction details end to end so changes are detectable; the bank confirms the final details with the customer when risk is high.'],
          ['Prompt injection defence', 'Treat content from other agents and websites as data, not instructions; the bank\'s agent cannot be told by another agent to change its own permissions.'],
          ['Least privilege for the bank\'s own agents', 'Bank agents get narrow tools and limits; high-impact actions need human approval and are logged.'],
          ['Monitoring and fraud controls', 'Label agent-initiated traffic, apply velocity limits and anomaly detection, and keep a kill switch per agent and per provider.'],
          ['Audit trail', 'Log the full chain: which agent, which mandate, which instruction, which approval, at what time.'],
          ['Third-party agent due diligence', 'Assess agent providers like any critical vendor: security, data handling, incident notice and insurance.'],
          ['Clear terms and dispute process', 'State in customer and partner terms who is liable in which situation, how to report a bad agent action, and how refunds work, within consumer protection law.'],
        ]} />

        <h3 className={H}>Emerging industry approaches (check current status)</h3>
        <p className={P}>Payment networks and technology companies have announced approaches for trusted agent commerce, such as agent protocols that carry signed customer mandates and network tokens issued specifically to registered agents. They are still maturing, and adoption and regulation differ by country, so treat them as direction of travel rather than settled standards.</p>

        <h3 className={H}>Interview answer: how would a bank secure agent-to-agent payments?</h3>
        <p className={P}>"I would make trust explicit at every hop. Each agent has a verifiable identity and is registered before it gets access. It acts only under a signed, limited mandate from the customer with amounts, payees and expiry, checked by the bank on every instruction. Third-party agents use scoped, revocable API consent, never shared passwords. High-risk actions step up to the customer in the bank's own app. The transaction details are integrity-protected and the whole chain is logged, with fraud monitoring and a kill switch per agent. Finally the terms say clearly who is responsible in each scenario, so disputes can be resolved."</p>
      </div>
    </details>
  );
}
