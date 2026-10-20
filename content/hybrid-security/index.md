# Hybrid Workforce Security & Enforcement

A compliance-and-enforcement framework for the hybrid operating model: Remote,
In-Office, and On-the-Go. It is a **tech-architecture module** — real, copy‑paste
deployables — not a slide deck. Everything here maps to the platform's Security
Operations baseline and the persona access requirements.

## Model: 6 enforcement domains

1. **Removable media encryption** — USB / external drives never writable
   unencrypted (BitLocker To Go / FileVault covers toast or CSP AES-256).
2. **BYOD / MDM-MAM** — managed container or full enrollment; device health is a
   gating input to access.
3. **EDR & telemetry** — every endpoint streams detections to the SIEM; agents
   report health JSON on a 15-min cadence.
4. **ZTNA / SASE** — access is per-app, per-identity, policy-evaluated at the
   gate; untrusted geography raises risk.
5. **Physical context** — office vs café vs airport changes the trust rating of
   the same identity/session.
6. **DLP / clipboard isolation** — work data cannot be pasted into personal web
   apps or synced to shadow IT.

## The enforcement loop

```
device-health-agent (ps1|sh) ──JSON (15 min)──▶ SOC webhook
   ▲                                              │ validate schema
   │                                              ▼
   └── re-onboard after fix ◀── quarantine + token-strip ──┐
                                                        │
ManageEngine/Jamf/Intune ◀── MDM remediation            │
   ▲                                                      │
   └───────────────── SIEM / alerting ◀───────────────────┘
```

Non-compliant → **quarantine** (ZTNA isolate) + **token-strip** (revoke sessions
scoped to the device). Compliant again → re-onboard automatically.

## Deploy order (90 minutes to a running pilot)

1. `intune-oma-uri.xml` / `jamf-filevault-profile.xml` — encrypt the fleet + lock
   USB & clipboard (P0 of the hybrid baseline).
2. `device-health-agent.ps1` + `.sh` — stand up the telemetry loop.
3. `soc-webhook.mjs` + `token-revoke.mjs` — wire quarantine/revoke; keep token
   revocation scoped and idempotent.
4. `conditional-access.json` — start **report-only**, then enforce.
5. `iac-terraform.tf` — bring the control plane up on your security subscription
   (storage, function app, RBAC).

## Secrets & safety

- Never commit the SOC webhook secret or Entra client secret. Use tfvars +
  Key Vault / env vars.
- `soc-webhook.mjs` returns 401 on bad signatures (timing-safe compare) — no
  schema abuse from the internet.
- Token revocation is **scoped to the device**; full-account revocation only on a
  p0 compromise (see `token-revoke.mjs` escalation matrix).
- Every policy starts report-only so you can measure false positives before
  enforcing.

Copyright note: this is original, self-authored material produced for this
platform — reuse keys, CSP paths, and OMA-URI nodes are public Microsoft/Apple
documented identifiers.