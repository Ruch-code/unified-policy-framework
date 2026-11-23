// Session management and offboarding for RAG and agentic AI: continuous identity checks, middleware, global kill switch, SCIM and webhooks.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';
const PRE = 'mt-2 p-3 rounded-lg bg-gray-900 text-gray-100 text-xs overflow-x-auto';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: 620 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const DIAGRAM = `  HR system ──(termination)──▶ Identity provider (Okta / Entra ID)
                                   │
              ┌────────────────────┼─────────────────────────┐
              ▼                    ▼                         ▼
      SCIM: deactivate user   Webhook / event stream   Revoke refresh tokens
              │               (user.deactivated)             │
              ▼                    ▼                         ▼
      App user store        Revocation service ──▶  Revocation list (Redis, TTL)
                                   │
   User / agent ──▶ API gateway ──▶ Auth middleware ──▶ RAG / agent orchestrator
                       │            │  1. verify token (short TTL)
                       │            │  2. check revocation list
                       │            │  3. check global kill switch flag
                       │            │  4. re-check entitlements per call
                       │            ▼
                       │       Retriever (filters by user ACL) ──▶ Vector store
                       │       Tool router (scoped, per-user credentials)
                       ▼
                  Audit log ──▶ SIEM (alerts on use after revocation)`;

const CODE = `// Auth middleware run on every request and every agent tool call
async function authorize(req) {
  const token = verifyJwt(req.headers.authorization);     // signature, expiry (5 to 15 min)
  if (await flags.get('ai_global_kill_switch')) deny('AI disabled');
  if (await revoked.has(token.sub) || await revoked.has(token.sid)) deny('session revoked');

  const user = await directory.getUser(token.sub);          // cached briefly, e.g. 60 seconds
  if (!user.active) { await revoked.add(token.sub); deny('user inactive'); }

  req.ctx = { userId: user.id, groups: user.groups, sessionId: token.sid };
  audit.log({ event: 'ai.request', user: user.id, sid: token.sid });
}

// Webhook from the identity provider when a user is deactivated
async function onUserDeactivated(evt) {
  verifySignature(evt);
  await revoked.add(evt.userId, { ttl: MAX_REFRESH_TOKEN_LIFETIME });
  await agents.cancelRunningJobs({ owner: evt.userId });    // stop long-running agent tasks
  await credentials.revokeDelegated({ owner: evt.userId }); // OAuth grants agents used
  await cache.purge({ owner: evt.userId });                 // chat history and retrieval cache
  audit.log({ event: 'ai.offboard', user: evt.userId });
}

// Retriever enforces document permissions, not the prompt
function retrieve(query, ctx) {
  return vectorStore.search(query, { filter: { allowedGroups: { any: ctx.groups } } });
}`;

export default function AiSessionOffboarding() {
  return (
    <details className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="ai-session-offboarding">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Session management and offboarding for RAG and agentic AI</summary>
      <div className="mt-3">
        <p className={P}>Classic offboarding disables the account and assumes access stops. AI systems break that assumption: long-lived sessions, cached chat history, background agent jobs, and OAuth grants that agents use to act on the user's behalf can keep working after the person has left. The design goal is that revocation reaches every layer within minutes.</p>

        <h3 className={H}>Design principles</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li><strong>Continuous identity verification:</strong> short-lived access tokens and a check on every request and every agent tool call, not only at login.</li>
          <li><strong>Central middleware:</strong> one authorisation layer in front of the RAG and agent services, so no path skips the checks.</li>
          <li><strong>Push, not poll:</strong> the identity provider pushes deactivation by SCIM and webhooks or event streams; the app revokes immediately.</li>
          <li><strong>Global kill switch:</strong> a feature flag that stops all AI features or all tool use in seconds during an incident.</li>
          <li><strong>Permissions at retrieval:</strong> the retriever filters by the user's current access, so revoked groups stop returning documents at once.</li>
        </ul>

        <h3 className={H}>Architecture</h3>
        <pre className={PRE}>{DIAGRAM}</pre>

        <h3 className={H}>Controls by layer</h3>
        <Table head={['Layer', 'Risk on offboarding', 'Control']} rows={[
          ['Identity provider', 'User still active in some apps', 'SCIM deprovisioning to every app; HR-driven trigger'],
          ['Sessions and tokens', 'Refresh tokens keep working for days', 'Short access-token lifetime, refresh-token revocation, revocation list checked per request'],
          ['RAG retrieval', 'Cached results or stale group membership', 'Filter by current groups at query time; purge retrieval cache for the user'],
          ['Chat history and memory', 'Personal or confidential data retained', 'Retention rules; delete or transfer on offboarding'],
          ['Agents and background jobs', 'Scheduled agent keeps acting as the user', 'Cancel jobs owned by the user; agents run under their own identity with an accountable owner'],
          ['Delegated OAuth grants', 'Agent still reads mail or files through granted tokens', 'Revoke grants at the provider; inventory of grants per user'],
          ['API keys', 'Personal keys used in scripts', 'No personal long-lived keys; keys tied to service identities and rotated'],
          ['Logging', 'No proof that access stopped', 'Log every request with user and session; alert on any use after deactivation'],
        ]} />

        <h3 className={H}>Example tech stack</h3>
        <Table head={['Need', 'Common options']} rows={[
          ['Identity and SCIM', 'Okta, Microsoft Entra ID, Google Workspace'],
          ['Event push', 'Identity provider event hooks, Shared Signals Framework (CAEP) where supported'],
          ['Gateway and middleware', 'API gateway plus an auth service or policy engine such as Open Policy Agent'],
          ['Revocation list and flags', 'Redis with TTL; a feature flag service for the kill switch'],
          ['Vector store with metadata filters', 'Any store that supports filtering by access metadata'],
          ['Logs', 'Central logging and SIEM'],
        ]} />

        <h3 className={H}>Pseudo-code</h3>
        <pre className={PRE}>{CODE}</pre>

        <h3 className={H}>How to test it</h3>
        <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
          <li>Create a test user with an active chat session, a scheduled agent job and an OAuth grant.</li>
          <li>Deactivate the user in the identity provider and start a timer.</li>
          <li>Retry the API call, the chat, the agent job and the delegated tool. All must fail; record the time to revocation.</li>
          <li>Check the audit log shows the offboarding event and the denied attempts.</li>
          <li>Flip the kill switch in a test environment and confirm all AI calls stop.</li>
        </ol>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Pseudo-code is illustrative. Exact SCIM and event hook support varies by identity provider and by app.</p>
      </div>
    </details>
  );
}
