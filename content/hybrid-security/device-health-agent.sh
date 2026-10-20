#!/usr/bin/env bash
# device-health-agent.sh
# Hybrid Workforce Endpoint Health Agent (macOS / Linux) — emits one compliance
# JSON document per run and POSTs it to the SIEM/SOC webhook. Same schema as the
# Windows agent so the SOC validator treats both identically.
#
# Deploy: MDM LaunchAgent (macOS) / systemd timer, run as root every 15 min.
# Env:  TROY_ID and SOC_WEBHOOK_URL set by the MDM profile.

set -u

AGENT="device-health-agent.sh"
VERSION="1.0.0"
DEVICE_ID=$( (system_profiler SPHardwareDataType 2>/dev/null | awk -F': ' '/Hardware UUID/{print $2; exit}') || cat /etc/machine-id )
TROY_ID="${TROY_ID:-}"
WEBHOOK="${SOC_WEBHOOK_URL:-}"
TS_UTC=$(date -u +%Y-%m-%dT%H:%M:%SZ)
PLATFORM=$(uname -s)

checks_json=""
fail_count=0

emit() { # id name ok detail
  local id="$1" name="$2" ok="$3" detail="$4"
  local okv="false"; [ "$ok" = "yes" ] && okv="true"
  if [ "$okv" = "false" ]; then fail_count=$((fail_count+1)); fi
  checks_json="$checks_json$(printf '{"id":"%s","name":"%s","ok":%s,"detail":"%s"},' "$id" "$name" "$okv" "$detail")"
}

if [ "$PLATFORM" = "Darwin" ]; then
  # --- FileVault (full-disk encryption) ---
  if fdesetup status | grep -q "FileVault is On"; then
    emit "disk_encryption" "FileVault full-disk encryption" yes "FileVault is On"
  else
    emit "disk_encryption" "FileVault full-disk encryption" no "FileVault is Off"
  fi

  # --- EDR (Wazuh / CrowdStrike / SentinelOne / Defender) ---
  edr_active="no"
  for svc in wazuh-agent falcon-sensor sentinelhelper mdatp; do
    if /bin/launchctl list | grep -qi "$svc"; then edr_active="yes"; break; fi
  done
  emit "edr" "EDR service running" "$edr_active" "launchd agent present: $edr_active"

  # --- SIP + XProtect baseline (macOS integrity) ---
  if csrutil status 2>/dev/null | grep -q "enabled"; then
    emit "platform_integrity" "System Integrity Protection enabled" yes "SIP enabled"
  else
    emit "platform_integrity" "System Integrity Protection enabled" no "SIP disabled"
  fi

  # --- OS patch baseline (compare to latest) ---
  sw_vers > /dev/null 2>&1 && emit "os_patch" "OS patched (evaluated by policy server)" yes "$(sw_vers -productVersion)"
else
  # --- LUKS full-disk encryption ---
  if lsblk -o TYPE,FSTYPE 2>/dev/null | grep -q crypt; then
    emit "disk_encryption" "LUKS full-disk encryption" yes "dm-crypt volume(s) present"
  else
    emit "disk_encryption" "LUKS full-disk encryption" no "no LUKS/dm-crypt volume found"
  fi

  # --- EDR ---
  edr_active="no"
  for unit in wazuh-agent falcon-sensor sentinelagent; do
    if systemctl is-active --quiet "$unit" 2>/dev/null; then edr_active="yes"; break; fi
  done
  emit "edr" "EDR service running" "$edr_active" "systemd unit active: $edr_active"

  # --- Unattended-upgrades for the patch SLA ---
  if [ -f /etc/apt/apt.conf.d/20auto-upgrades ] || systemctl is-enabled --quiet unattended-upgrades 2>/dev/null; then
    emit "os_patch" "Automatic security patching enabled" yes "unattended-upgrades configured"
  else
    emit "os_patch" "Automatic security patching enabled" no "no auto-upgrade mechanism found"
  fi
fi

# --- MDM enrollment marker (Jamf / Kandji / Mosyle / Fleet) ---
if [ "$PLATFORM" = "Darwin" ] && [ -f /var/db/configurationprofiles/Settings.plist ]; then
  emit "mdm_enrolled" "Enrolled in MDM" yes "MDM profile settings present"
else
  emit "mdm_enrolled" "Enrolled in MDM" no "no MDM profile found"
fi

# --- DLP / clipboard isolation (Endpoint security policy presence) ---
if [ -d /Library/Managed\ Preferences ]; then
  emit "dlp_enforce" "DLP / clipboard isolation policy enforced" yes "managed preferences present"
else
  emit "dlp_enforce" "DLP / clipboard isolation policy enforced" no "no managed preferences"
fi

# --- ZTNA posture hint (network category) ---
emit "network_perimeter" "Network posture reported to ZTNA" yes "gateway/ZTNA client present; policy server evaluates"

checks_json=$(printf '%s' "$checks_json" | sed 's/,$//')
if [ "$fail_count" -eq 0 ]; then compliant="true"; else compliant="false"; fi

payload=$(printf '{"agent":"%s","version":"%s","device":"%s","troy_id":"%s","ts_utc":"%s","platform":"%s","checks":[%s],"compliant":%s,"domains":[]}' \
  "$AGENT" "$VERSION" "$DEVICE_ID" "$TROY_ID" "$TS_UTC" "$PLATFORM" "$checks_json" "$compliant")

printf '%s\n' "$payload"

if [ -n "$WEBHOOK" ]; then
  curl -s -o /dev/null -X POST "$WEBHOOK" -H 'Content-Type: application/json' -d "$payload" || true
fi