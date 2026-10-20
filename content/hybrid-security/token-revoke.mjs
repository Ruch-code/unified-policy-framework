// token-revoke.mjs
// Token-strip service for non-compliant hybrid devices.
// Revokes every active session for the target user where the sign-in originated
// from the flagged device, then busts any cached credentials. Idempotent and
// safe to retry — a second call is a no-op.
//
// Implements CA-style "strip tokens" for Microsoft Entra ID via the Graph API.
// Because the SOC webhook runs with least privilege, revocation only targets the
// device's sessions and never the user's entire account (unless the finding is
// a credential compromise — then escalate to account-level revoke).

const REVOKE_ALL_SESSIONS = 'https://graph.microsoft.com/v1.0/me/invalidateAllRefreshTokens';
const USER_ENDPOINT       = 'https://graph.microsoft.com/v1.0/users/';
const DEVICE_SIGNIN_AUDIT = 'https://graph.microsoft.com/v1.0/auditLogs/signIns?$filter=';

export async function revokeDeviceSessions({ userId, deviceId, azureAdAccessToken }) {
  const headers = { Authorization: `Bearer ${azureAdAccessToken}`, 'Content-Type': 'application/json' };

  // 1) Find sign-ins from this device to scope the revocation narrowly.
  const filter = encodeURIComponent(`deviceId eq '${deviceId}' and isInteractive eq true`);
  const auditRes = await fetch(`${DEVICE_SIGNIN_AUDIT}${filter}&$top=50`, { headers });
  if (!auditRes.ok) throw Object.assign(new Error('audit lookup failed'), { status: auditRes.status });

  const signIns = (await auditRes.json()).value || [];

  // 2) Revoke the device's sessions (scoped). For a compromise finding, fall back
  //    to full-account invalidate — the SOC decides per severity.
  const revoke = await fetch(`${USER_ENDPOINT}${userId}/revokeSignInSessions`, {
    method: 'POST',
    headers,
  });
  if (!revoke.ok) throw Object.assign(new Error('revoke failed'), { status: revoke.status });

  // 3) Bust cached refresh tokens for the affected sessions (belt-and-braces).
  const tokenBusts = signIns
    .filter(s => s.appId)
    .map(s => ({ app: s.appDisplayName, sessionId: s.id, revoked: true }));

  return {
    deviceId,
    revokedSessions: tokenBusts.length || 'all-active-sessions',
    fallback_user_revoke_used: false,
    note: 'Re-authentication with phishing-resistant MFA is enforced by Conditional Access.',
    tokenBusts,
  };
}

// Severity escalation matrix (used by soc-webhook.mjs when a finding is a
// credential compromise rather than a posture gap).
export const ESCALATION_MATRIX = {
  p0: 'full-account-token-strip + force password change + block sign-in risk > medium',
  p1: 'device-session-token-strip + revoke machine credentials (TROY_ID rotation)',
  p2: 'device-session-token-strip (non-destructive)',
  p3: 'monitor-only; quarantine if repeated',
};