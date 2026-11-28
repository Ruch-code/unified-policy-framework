import { Search, Microscope, ShieldAlert } from 'lucide-react';
import GrcAngle from './GrcAngle.jsx';

// How endpoint detection and response (EDR) works: detect, investigate, respond.
const STAGES = [
  ['Detection', Search, 'border-sky-300 dark:border-sky-800', [
    'Behaviour analysis: watches processes, files, registry and network activity for suspicious patterns, such as Office spawning PowerShell',
    'Indicator of compromise (IoC) scanning: matches hashes, domains and IPs from threat intelligence',
    'Machine learning and heuristics: flags new or unknown malware that has no signature yet',
  ]],
  ['Investigation', Microscope, 'border-amber-300 dark:border-amber-800', [
    'Root cause analysis: traces how the attacker got in and what ran first',
    'Attack visualisation: a process tree or timeline showing each step on the device',
    'Enriched alerts: alerts carry user, device, threat intelligence and MITRE ATT&CK context so analysts can triage fast',
  ]],
  ['Response', ShieldAlert, 'border-rose-300 dark:border-rose-800', [
    'Isolation: cuts the device off from the network while keeping the EDR connection open',
    'Quarantine: moves malicious files where they cannot run; kills malicious processes',
    'Rollback: reverses changes such as encrypted files, where the product supports it',
  ]],
];

export default function EdrExplainer() {
  return (
    <details id="edr-explained" className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">How EDR works: detect, investigate, respond</summary>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Endpoint detection and response (EDR) is an agent on each laptop and server that records activity, detects threats and lets the security team act remotely. Antivirus mainly blocks known malware; EDR also shows what happened and lets you respond.</p>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {STAGES.map(([t, Icon, border, items]) => (
          <div key={t} className={`rounded-xl border-2 ${border} p-3`}>
            <p className="flex items-center gap-2 font-bold text-gray-900 dark:text-white"><Icon className="w-5 h-5" aria-hidden="true" />{t}</p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">{items.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">Audit checks: every in-scope device has a working agent (compare the EDR console with the asset inventory), tamper protection is on, alerts reach the SOC or SIEM, and response times are tracked.</p>
      <GrcAngle>ISO 27001:2022 A.8.1 (user endpoint devices), A.8.7 (protection against malware), A.8.16 (monitoring activities); SOC 2 CC6.8 (prevent or detect malicious software) and CC7.2 to CC7.4 (monitoring, evaluating and responding to incidents).</GrcAngle>
    </details>
  );
}
