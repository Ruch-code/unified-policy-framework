// soc-webhook.mjs
// SOC ingestion webhook — Hybrid Workforce device compliance.
// Receives the agent JSON from device-health-agent.{ps1,sh}, validates the schema,
// reconciles flags against the Conditional Access posture, and on violation:
//   1) quarantines the device (isolate in ZTNA/SASE),
//   2) strips access tokens (Azure AD revokeSignInSessions + cache bust),
//   3) alerts the on-call SOC via webhook/mail.
//
// Deploy: Azure Functions (Node 18+) / Netlify function / any stateless server.
// Export: POST handler. Mount at '/api/soc/device'.

const crypto = require('crypto');

const EXPECTED_CHECK_IDS = [
  'disk_encryption', 'tpm', 'edr', 'av_definitions', 'mdm_enrolled',
  'os_patch', 'network_perimeter', 'dlp_enforce', 'platform_integrity',
];

exports.handler = async (event) => {
  // ---- 1. Auth: shared-secret handshake from the agent env ----
  const secret = process.env.SOC_WEBHOOK_SECRET;
  const provided = event.headers['x-soc-secret'] || '';
  if (!secret || !crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(secret))) {
    return json(401, { error: 'unauthorized' });
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'invalid-json' }); }

  // ---- 2. Schema validation ----
  if (!body.agent || !body.device || !body.ts_utc || !Array.isArray(body.checks)) {
    return json(400, { error: 'schema', missing: ['agent', 'device', 'ts_utc', 'checks'].filter(k => !(k in body)) });
  }
  if (typeof body.compliant !== 'boolean') body.compliant = !body.checks.some(c => c.ok === false);

  const failures = (body.checks || []).filter(c => c.ok === false);
  const domains  = failures.map(c => c.id);

  // ---- 3. Posture decision ----
  const quarantine = !body.compliant;
  const sensitiveDomainHit = domains.some(d => [
    'disk_encryption', 'edr', 'dlp_enforce', 'mdm_enrolled',
  ].includes(d));

  // ---- 4. Quarantine + token-strip ----
  const actions = [];
  if (quarantine) {
    actions.push({ type: 'ztna.quarantine', device: body.device, reason: domains });
    if (sensitiveDomainHit) {
      actions.push({ type: 'signin.revoke', device: body.device, reason: domains });
      actions.push({
        type: 'notify.soc',
        channel: process.env.SOC_ALERT_ENDPOINT,
        body: {
          severity: 'high',
          text: `Device ${body.device} non-compliant — tokens stripped (${domains.join(', ')})`,
        },
      });
    }
  }

  // Persist the immutable event to the SIEM cold tier (append-only).
  const ledger = {
    ts_utc: new Date().toISOString(),
    device: body.device,
    troy_id: body.troy_id || null,
    compliant: body.compliant,
    domains,
    actions,
    agent_version: body.version || null,
  };

  // In a real deployment, write `ledger` to the azurerm_storage_container above
  // (append-only / WORM) and invoke the quarantine + revoke endpoints.
  console.log(JSON.stringify(ledger));

  return json(200, { accepted: true, compliant: body.compliant, actions });
};

const json = (status, payload) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});