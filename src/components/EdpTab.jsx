import React from 'react';
import {
  Shield, Lock, Smartphone, Globe, Cloud, Users,
  FileText, Search, Zap, Cpu, HardDrive, Network,
  BookOpen, ExternalLink, CalendarDays, ShieldAlert, Clock,
  FileText as FileTextIcon, Timer
} from 'lucide-react';

// Helper function to handle Tailwind opacity modifiers
// Using string concatenation to avoid regex parsing issues
function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function EdpTab() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Endpoint & Data Protection (EDP)</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Endpoint & Data Protection covers DLP (Data Loss Prevention), MDM (Mobile Device Management), and BYOD (Bring Your Own Device) — critical for securing AI systems and data in hybrid environments.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className={["bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6", "dark:bg-blue-900/20", "dark:border-blue-800"].join(' ')}>
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">MDM / UEM</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">Mobile Device Management & Unified Endpoint Management</p>
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li className="flex items-start gap-2"><span>•</span> Device enrollment (Autopilot, ADE, zero-touch)</li>
              <li className="flex items-start gap-2"><span>•</span> Compliance policies (encryption, OS version, screen lock)</li>
              <li className="flex items-start gap-2"><span>•</span> Conditional Access with device compliance</li>
              <li className="flex items-start gap-2"><span>•</span> Patch management with SLAs</li>
              <li className="flex items-start gap-2"><span>•</span> Remote wipe / lock / selective wipe</li>
              <li className="flex items-start gap-2"><span>•</span> EDR integration (Defender, CrowdStrike, SentinelOne)</li>
            </ul>
          </div>
          <div className={["bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-xl p-6", "dark:bg-purple-900/20", "dark:border-purple-800"].join(' ')}>
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2">DLP</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">Data Loss / Leakage Prevention</p>
            <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-300">
              <li className="flex items-start gap-2"><span>•</span> Email DLP (Exchange, Gmail)</li>
              <li className="flex items-start gap-2"><span>•</span> File storage DLP (OneDrive, Drive, SharePoint)</li>
              <li className="flex items-start gap-2"><span>•</span> Endpoint DLP (clipboard, print, USB, network)</li>
              <li className="flex items-start gap-2"><span>•</span> Chat DLP (Teams, Slack, Chat)</li>
              <li className="flex items-start gap-2"><span>•</span> Cloud app / CASB (Defender for Cloud Apps)</li>
              <li className="flex items-start gap-2"><span>•</span> AI / GenAI DLP (block paste to public AI)</li>
            </ul>
          </div>
          <div className={["bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-6", "dark:bg-green-900/20", "dark:border-green-800"].join(' ')}>
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">BYOD</h3>
            <p className="text-sm text-green-700 dark:text-green-300 mb-3">Bring Your Own Device</p>
            <ul className="space-y-1 text-sm text-green-800 dark:text-green-300">
              <li className="flex items-start gap-2"><span>•</span> App protection / MAM (no enrollment)</li>
              <li className="flex items-start gap-2"><span>•</span> Work profile (Android) / User Enrollment (iOS)</li>
              <li className="flex items-start gap-2"><span>•</span> VDI / DaaS / Secure Browser (no local data)</li>
              <li className="flex items-start gap-2"><span>•</span> Conditional Access session controls</li>
              <li className="flex items-start gap-2"><span>•</span> Privacy notice + selective wipe consent</li>
              <li className="flex items-start gap-2"><span>•</span> Decision guide by role & data sensitivity</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8 dark:bg-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Google Workspace vs Microsoft 365 — Side by Side</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Capability</th>
                  <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Google Workspace</th>
                  <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Microsoft 365</th>
                  <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Typical Edition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="p-3 font-medium">MDM Enrollment</td>
                  <td className="text-gray-600 dark:text-gray-300">Zero-touch (Android), ABM (iOS)</td>
                  <td className="text-gray-600 dark:text-gray-300">Autopilot (Win), ABM (iOS), Android Enterprise</td>
                  <td className="text-gray-600 dark:text-gray-300">GW Business+ / Ent; M365 E3/E5</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Conditional Access</td>
                  <td className="text-gray-600 dark:text-gray-300">Context-Aware Access</td>
                  <td className="text-gray-600 dark:text-gray-300">Entra Conditional Access</td>
                  <td className="text-gray-600 dark:text-gray-300">GW Enterprise+; Entra ID P1/P2</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Email DLP</td>
                  <td className="text-gray-600 dark:text-gray-300">Workspace DLP for Gmail</td>
                  <td className="text-gray-600 dark:text-gray-300">Purview DLP for Exchange</td>
                  <td className="text-gray-600 dark:text-gray-300">GW Enterprise+; M365 E5</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">File DLP</td>
                  <td className="text-gray-600 dark:text-gray-300">Drive DLP, Trust Rules</td>
                  <td className="text-gray-600 dark:text-gray-300">Purview DLP for SPO/OD/T</td>
                  <td className="text-gray-600 dark:text-gray-300">GW Enterprise+; M365 E5</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Endpoint DLP</td>
                  <td className="text-gray-600 dark:text-gray-300">Chrome Enterprise DLP</td>
                  <td className="text-gray-600 dark:text-gray-300">Purview Endpoint DLP</td>
                  <td className="text-gray-600 dark:text-gray-300">GW Enterprise+; M365 E5 + Win E</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">CASB</td>
                  <td className="text-gray-600 dark:text-gray-300">CAW + Chrome Enterprise</td>
                  <td className="text-gray-600 dark:text-gray-300">Defender for Cloud Apps</td>
                  <td className="text-gray-600 dark:text-gray-300">GW Enterprise+; M365 E5</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Encryption</td>
                  <td className="text-gray-600 dark:text-gray-300">Client-side encryption (Ent)</td>
                  <td className="text-gray-600 dark:text-gray-300">Purview Message Encryption</td>
                  <td className="text-gray-600 dark:text-gray-300">GW Enterprise+; M365 E5</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Retention / eDiscovery</td>
                  <td className="text-gray-600 dark:text-gray-300">Google Vault</td>
                  <td className="text-gray-600 dark:text-gray-300">Purview Retention / eDiscovery</td>
                  <td className="text-gray-600 dark:text-gray-300">GW Business+ / Ent; M365 E3/E5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3 dark:text-gray-400">Note: Licensing guidance uses "typically requires" phrasing. Verify with your reseller or vendor portal before purchasing.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Framework Mapping</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">EDP controls map to these frameworks (ISO 27001:2022 numbering):</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">ISO 27001:2022</h4>
              <p className="text-blue-800 dark:text-blue-300">A.5.10, A.5.12, A.5.13, A.5.14, A.5.15, A.5.23, A.5.34, A.6.7, A.7.9, A.7.10, A.8.1, A.8.5, A.8.7, A.8.9, A.8.10, A.8.11, A.8.12, A.8.19, A.8.24</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 dark:bg-purple-900/20 dark:border-purple-800">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">SOC 2 / HIPAA / PCI</h4>
              <p className="text-purple-800 dark:text-purple-300">SOC 2: CC6.1, CC6.6, CC6.7, CC6.8, CC7.2<br/>HIPAA: 164.310(d), 164.312(a)(2)(iv), 164.312(e)<br/>PCI DSS v4: Req 3, 4, 5, 12.3</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 dark:bg-green-900/20 dark:border-green-800">
              <h4 className="font-bold text-green-900 dark:text-green-300 mb-2">CIS / NIST / GDPR</h4>
              <p className="text-green-800 dark:text-green-300">CIS v8: 1, 2, 3, 4, 10, 13<br/>NIST 800-53: AC-19, AC-20, CM-8, MP-7, SC-7, SI-4<br/>GDPR: Art 32 | DPDP Act: reasonable safeguards</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation Roadmap by Size</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Small (1-50)</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">30/60/90 days</p>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                <li>• Enroll all devices in MDM</li>
                <li>• Enforce encryption + MFA</li>
                <li>• Deploy EDR</li>
                <li>• Enable email/storage DLP</li>
                <li>• Draft BYOD policy</li>
                <li>• Conditional Access for cloud apps</li>
              </ul>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Medium (51-500)</h4>
              <p className="text-sm text-purple-800 dark:text-purple-300 mb-2">2 quarters</p>
              <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-300">
                <li>• MDM/EDR/MAM full deployment</li>
                <li>• Conditional Access enforcement</li>
                <li>• Patch SLAs</li>
                <li>• Vendor risk register</li>
                <li>• <a href="/knowledge?topic=secrets-scanning" className="text-blue-600 hover:underline dark:text-blue-400">Secrets scanning</a></li>
                <li>• Quarterly access reviews</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <h4 className="font-bold text-green-900 dark:text-green-300 mb-2">Large (500+)</h4>
              <p className="text-sm text-green-800 dark:text-green-300 mb-2">12 months</p>
              <ul className="space-y-1 text-sm text-green-800 dark:text-green-300">
                <li>• Multi-entity scope definition</li>
                <li>• Centralized logging</li>
                <li>• Phased MDM/EDR rollout</li>
                <li>• Break-glass accounts</li>
                <li>• Compliance dashboard</li>
                <li>• Vendor re-assessments</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Audit Evidence & Common Gaps</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-bold text-green-900 dark:text-green-300 mb-2">Evidence to Prepare</h4>
              <ul className="space-y-1 text-sm text-green-800 dark:text-green-300">
                <li>• MDM compliance dashboard export</li>
                <li>• DLP policy config + incident report sample</li>
                <li>• BYOD policy + signed acknowledgments</li>
                <li>• Conditional Access policy export</li>
                <li>• Device inventory reconciled to HR roster</li>
                <li>• Sample DLP alert with triage record</li>
              </ul>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2">Common Gaps & Pushback</h4>
              <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
                <li>• "MDM slows developers" → MAM + VDI alternative</li>
                <li>• "Too small for DLP" → Start with email DLP for PCI/PII</li>
                <li>• "Employees won't install MDM" → MAM / VDI alternative</li>
                <li>• "Macs are secure by default" → FileVault + MDM verify</li>
                <li>• "No budget for EDR" → Defender for Endpoint in E3/E5</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EdpTab;
