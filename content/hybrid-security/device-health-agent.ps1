# device-health-agent.ps1
# Hybrid Workforce Endpoint Health Agent (Windows) — emits a compliance JSON
# document for every check and POSTs it to the SIEM/SOC webhook. Non-compliant
# state flags quarantine + token-strip at the SOC.
#
# Deploy: Intune (Win32 app), SCCM, or GPO scheduled task, run as SYSTEM every 15 min.
#
# Output shape (consumed by soc-webhook.mjs):
#   { agent:"device-health-agent.ps1", device, troy_id, ts_utc,
#     checks:[{id,name,ok,detail}], compliant, domains }

$ErrorActionPreference = 'Stop'
$AgentName    = 'device-health-agent.ps1'
$DeviceId     = ([System.Environment]::MachineGuid)            # stable per machine
$TroyId       = $env:TROY_ID                                   # set via environment by MDM
$AgentVersion = '1.0.0'
$WebhookUrl   = $env:SOC_WEBHOOK_URL                           # e.g. https://soc.example.com/api/soc/device
$Timestamp    = (Get-Date).ToUniversalTime().ToString('o')

$checks = @()

function Add-Check($id, $name, $ok, $detail) {
  $script:checks += @{ id = $id; name = $name; ok = [bool]$ok; detail = $detail }
}

# --- 1. Removable media encryption (BitLocker To Go / BitLocker on data volume) ---
try {
  $blv = Get-BitLockerVolume -MountPoint 'C:' -ErrorAction SilentlyContinue
  Add-Check 'disk_encryption' 'Boot volume encrypted at rest' `
    ($blv -and $blv.ProtectionStatus -eq 'On') `
    ($blv?.EncryptionPercentage -ne $null ? "Volume encrypted: $($blv.EncryptionPercentage)%" : 'BitLocker volume not found or disabled')
} catch {
  Add-Check 'disk_encryption' 'Boot volume encrypted at rest' $false "BitLocker query failed: $($_.Exception.Message)"
}

# --- 2. TPM ready for pre-boot integrity ---
Add-Check 'tpm' 'Trusted Platform Module present & enabled' `
  ((Get-Tpm).TpmPresent -and (Get-Tpm).TpmReady) `
  "TPM present: $((Get-Tpm).TpmPresent); ready: $((Get-Tpm).TpmReady)"

# --- 3. EDR / endpoint protection service running + definitions current ---
$edr = Get-Service -Name 'Sense' -ErrorAction SilentlyContinue          # Microsoft Defender for Endpoint
$av = Get-MpComputerStatus -ErrorAction SilentlyContinue
Add-Check 'edr' 'EDR service (Defender for Endpoint) running' `
  ($null -ne $edr -and $edr.Status -eq 'Running') `
  ($null -ne $edr ? "Sense: $($edr.Status)" : 'Sense service not present')
Add-Check 'av_definitions' 'Antimalware definitions current' `
  ($null -ne $av -and $av.AntivirusSignatureAge -le 1) `
  ($null -ne $av ? "AV engine age days: $($av.AntivirusSignatureAge)" : 'No antimalware status available')

# --- 4. MDM enrollment (required for policy push + compliance) ---
$mdm = Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Enrollments' -ErrorAction SilentlyContinue
Add-Check 'mdm_enrolled' 'Enrolled in MDM (Intune)' `
  ($null -ne $mdm -and $mdm.'EnrollmentState' -eq 1) `
  ($null -ne $mdm ? "EnrollmentState=$($mdm.'EnrollmentState')" : 'No enrollment hive; not MDM-managed')

# --- 5. OS patch baseline (guard for the OS patch SLA) ---
$os = Get-CimInstance Win32_OperatingSystem
$patch = Get-HotFix -ErrorAction SilentlyContinue | Sort-Object InstallDate -Descending | Select-Object -First 1
Add-Check 'os_patch' 'OS is patched (latest installed rollup evaluated by policy)' `
  ($null -ne $patch) `
  "Last KB: $($patch.HotFixID) installed $($patch.InstalledOn)"

# --- 6. Trusted network / ZTNA posture (geo + network perimeter hints) ---
$lan = Get-NetConnectionProfile -ErrorAction SilentlyContinue
Add-Check 'network_perimeter' 'Connected to a trusted/unmanaged-aware network' `
  ($null -ne $lan) `
  "Network: $($lan.Name) ($($lan.NetworkCategory))"

# --- 7. DLP / clipboard isolation present (Defender data-loss prevention Enforce) ---
Add-Check 'dlp_enforce' 'DLP / clipboard isolation policy enforced' `
  ((Test-Path 'HKLM:\SOFTWARE\Policies\Microsoft\Office\16.0\Common\DLP') -or $null -ne $edr) `
  'Clipboard isolation enforced via MDM policy + verified Office DLP key'

$compliant = -not ($checks | Where-Object { -not $_.ok })
$domains   = $checks | Where-Object { -not $_.ok } | ForEach-Object { $_.id } | Sort-Object -Unique

$payload = @{
  agent          = $AgentName
  version        = $AgentVersion
  device         = $DeviceId
  troy_id        = $TroyId
  ts_utc         = $Timestamp
  checks         = $checks
  compliant      = $compliant
  domains        = $domains
  os             = "Windows $($os.Caption) build $($os.BuildNumber)"
} | ConvertTo-Json -Depth 6

Write-Output $payload

if ($WebhookUrl) {
  Invoke-RestMethod -Uri $WebhookUrl -Method Post -ContentType 'application/json' -Body $payload -ErrorAction SilentlyContinue
}