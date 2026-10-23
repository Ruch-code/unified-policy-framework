import React, { useState } from 'react';
import {
  Shield, Lock, Key, Globe, Cloud, Users, FileText, Search, Zap, Cpu,
  HardDrive, Network, BookOpen, ExternalLink, CalendarDays, ShieldAlert,
  Clock, Timer, CheckCircle, Copy, Check, ChevronDown, ChevronRight,
  AlertTriangle, List, BarChart3, Target, Layers, Building2, Scale,
  ClipboardCheck, Workflow, Database, Eye,
} from 'lucide-react';
import {
  DPA_CHECKLIST, DATA_FLOW_ROWS, ASSURANCE_ROWS, FRAMEWORK_MAPPINGS,
  ROADMAP, MATURITY_LEVELS, GAP_ROWS, AUDIT_EVIDENCE,
  SECTION1_BULLETS, SECTION1_REDFLAGS,
  SECTION2_BULLETS, SECTION2_REDFLAGS,
  SECTION3_BULLETS, SECTION3_REDFLAGS,
  SECTION4_BULLETS, SECTION4_REDFLAGS,
  SECTION5_BULLETS, SECTION5_REDFLAGS,
} from '../data/aiVendorAssurance.ts';

function useCopy() {
  const [copied, setCopied] = useState(null);
  const copy = async (text, key) => {
    try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1200);
  };
  return { copied, copy };
}

function Card({ icon: Icon, title, purpose, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
      <div className="flex items-center gap-3 mb-3">
        {Icon && (
          <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </span>
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          {purpose && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{purpose}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function SectionEnd({ evidence, redFlags }) {
  return (
    <div className="mt-4 grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-900/20 dark:border-green-800">
        <h4 className="font-bold text-green-900 dark:text-green-200 mb-2 text-sm">Evidence to request</h4>
        <ul className="space-y-1 text-sm text-green-800 dark:text-green-300">
          {evidence.map((e) => (
            <li key={e}>• {e}</li>
          ))}
        </ul>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
        <h4 className="font-bold text-red-900 dark:text-red-200 mb-2 text-sm">Red flags</h4>
        <ul className="space-y-1 text-sm text-red-800 dark:text-red-300">
          {redFlags.map((r) => (
            <li key={r}>• {r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AiVendorAssuranceTab() {
  const { copied, copy } = useCopy();
  const [verified, setVerified] = useState({});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI Vendor Assurance</h2>
        <p className="text-gray-600 dark:text-gray-300">
          This module helps you review customer DPAs, map AI agent data flows, answer security questionnaires accurately, verify AI controls with customers and auditors, and determine which emerging AI regulations apply. Every AI control is presented as a claim to verify, not an assumed capability.
        </p>
      </div>

      {/* Section 1: Customer DPA Review */}
      <Card icon={Scale} title="1. Customer DPA Review" purpose="Review a customer's DPA when our organization processes their data, with Legal.">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Step 1: Determine controller, processor or sub-processor role for each processing activity, not per contract.
        </p>
        {/* Decision table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Question</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Controller indicators</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Processor indicators</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="p-3 font-medium text-gray-900 dark:text-white">Who decides purpose and means?</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">Our organization decides</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">Customer decides</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-900 dark:text-white">Whose customers are the data subjects?</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">Our customers</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">Customer's customers</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-900 dark:text-white">Does the vendor use data for its own purposes?</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">Yes, for product improvement or analytics</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">No, only on documented instructions</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Review checklist (one row per item with "What to check" and "Typical acceptable position"):
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">What to check</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Typical acceptable position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {DPA_CHECKLIST.map((r) => (
                <tr key={r.check}>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">{r.check}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{r.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          This checklist supports Legal review and does not replace it.
        </p>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Maps to: GDPR Art. 28, 32, 33, 44-49; UK GDPR; DPDPA s.8; ISO 27701; SOC 2 P-series and CC9.2.
        </div>
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
          {SECTION1_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-2"><span>•</span> {b}</li>
          ))}
        </ul>
        <SectionEnd evidence={['DPA template with review notes', 'Controller/processor role determination records', 'Sub-processor list and notification process', 'Incident notification timeline commitment', 'Deletion certification process', 'Transfer impact assessment']} redFlags={SECTION1_REDFLAGS} />
      </Card>

      {/* Section 2: AI Agent Data Flow Mapping */}
      <Card icon={Workflow} title="2. AI Agent Data Flow Mapping" purpose="Map every data type an AI agent touches and who can access it.">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Data flow: User → Agent → Tool calls / Execution sandbox / Model provider → Logs. Mark trust boundaries at each step.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mb-4">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Data type</th>
                <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Where stored</th>
                <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Retention</th>
                <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Who can access</th>
                <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Why they need access</th>
                <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Encryption (transit / at rest)</th>
                <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Used for training</th>
                <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Evidence source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {DATA_FLOW_ROWS.map((r) => (
                <tr key={r.dataType}>
                  <td className="p-2 font-medium text-gray-900 dark:text-white">{r.dataType}</td>
                  <td className="p-2 text-gray-600 dark:text-gray-300">{r.stored}</td>
                  <td className="p-2 text-gray-600 dark:text-gray-300">{r.retention}</td>
                  <td className="p-2 text-gray-600 dark:text-gray-300">{r.access}</td>
                  <td className="p-2 text-gray-600 dark:text-gray-300">{r.why}</td>
                  <td className="p-2 text-gray-600 dark:text-gray-300">{r.encryption}</td>
                  <td className="p-2 text-gray-600 dark:text-gray-300">{r.training}</td>
                  <td className="p-2 text-gray-600 dark:text-gray-300">{r.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
          {SECTION2_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-2"><span>•</span> {b}</li>
          ))}
        </ul>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Maps to: ISO 42001 A.7 (data for AI systems), ISO 27001 A.5.12, A.5.14, A.8.10, A.8.11, NIST AI RMF MAP, SOC 2 CC6.1 and C1.1.
        </div>
        <SectionEnd evidence={['Data flow diagram with trust boundaries', 'Data type inventory', 'Access control documentation', 'Encryption configuration', 'Retention policy', 'Model provider agreement']} redFlags={SECTION2_REDFLAGS} />
      </Card>

      {/* Section 3: Security Questionnaire Accuracy */}
      <Card icon={ClipboardCheck} title="3. Security Questionnaire Accuracy" purpose="Answer questionnaires truthfully and defensibly.">
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Answer status</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">When to use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr><td className="p-3 font-medium text-gray-900 dark:text-white">Implemented</td><td className="p-3 text-gray-600 dark:text-gray-300">Control is in place and evidenced.</td></tr>
              <tr><td className="p-3 font-medium text-gray-900 dark:text-white">Partially implemented</td><td className="p-3 text-gray-600 dark:text-gray-300">Control exists in some environments or regions.</td></tr>
              <tr><td className="p-3 font-medium text-gray-900 dark:text-white">Planned (with target date)</td><td className="p-3 text-gray-600 dark:text-gray-300">Control is funded and scheduled; include the target date.</td></tr>
              <tr><td className="p-3 font-medium text-gray-900 dark:text-white">Not applicable (with reason)</td><td className="p-3 text-gray-600 dark:text-gray-300">Control does not apply to the in-scope product or environment.</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Never mark planned work as implemented.
        </p>
        <div className="bg-gray-50 rounded-xl p-4 dark:bg-gray-800 mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Weak answer vs Strong answer</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 dark:bg-red-900/20 dark:border-red-800">
              <p className="text-xs font-bold text-red-900 dark:text-red-200 mb-1">Weak</p>
              <p className="text-sm text-red-800 dark:text-red-300">"Yes, we encrypt all data."</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 dark:bg-green-900/20 dark:border-green-800">
              <p className="text-xs font-bold text-green-900 dark:text-green-200 mb-1">Strong</p>
              <p className="text-sm text-green-800 dark:text-green-300">"Implemented for Product X in production (EU region). AES-256 at rest, TLS 1.2+ in transit. Evidence: architecture doc v2.3, last verified 2026-01-15 by Security Lead. Exception: legacy reporting module uses TLS 1.1 (remediation scheduled Q2 2026)."</p>
            </div>
          </div>
        </div>
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
          {SECTION3_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-2"><span>•</span> {b}</li>
          ))}
        </ul>
        <SectionEnd evidence={['Answer library with owners and last-verified dates', 'Product scope documentation', 'Exception register', 'Control owner contact list']} redFlags={SECTION3_REDFLAGS} />
      </Card>

      {/* Section 4: AI-Specific Assurance Checklist */}
      <Card icon={ShieldCheck} title="4. AI-Specific Assurance Checklist" purpose="Prepare to discuss and verify AI controls with customers and auditors.">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Treat each item as a claim to verify, not an assumed capability.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Question to ask</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Evidence to request</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Verified?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ASSURANCE_ROWS.map((r, i) => (
                <tr key={r.question}>
                  <td className="p-3 text-gray-700 dark:text-gray-300">{r.question}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{r.evidence}</td>
                  <td className="p-3">
                    <select
                      value={verified[i] || 'No'}
                      onChange={(e) => setVerified((v) => ({ ...v, [i]: e.target.value }))}
                      className="px-2 py-1 border border-gray-300 rounded text-xs dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Partial">Partial</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
          {SECTION4_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-2"><span>•</span> {b}</li>
          ))}
        </ul>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Maps to: OWASP Top 10 for LLM Applications, MITRE ATLAS, NIST AI 600-1, ISO 42001 Annex A, SOC 2 CC6 and CC7.
        </div>
        <SectionEnd evidence={['IAM policy documentation', 'Architecture diagram', 'Sandbox configuration', 'Approval workflow documentation', 'Security testing results', 'DLP configuration', 'Retention policy', 'Terms of service', 'Model provider agreement']} redFlags={SECTION4_REDFLAGS} />
      </Card>

      {/* Section 5: AI Governance and Regulatory Applicability */}
      <Card icon={Building2} title="5. AI Governance and Regulatory Applicability" purpose="Decide which emerging AI rules apply, starting from facts and not from the fact that AI is used.">
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
          {SECTION5_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-2"><span>•</span> {b}</li>
          ))}
        </ul>
        <SectionEnd evidence={['Applicability assessment document', 'Regulatory change tracking process', 'Jurisdiction-specific requirements review', 'AI governance committee charter']} redFlags={SECTION5_REDFLAGS} />
      </Card>

      {/* Framework Mapping */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Framework Mapping</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">AI vendor assurance controls map to these frameworks.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {FRAMEWORK_MAPPINGS.map((f) => (
            <div key={f.framework} className="bg-blue-50 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
              <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2">{f.framework}</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300">{f.controls}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Verify control references against the current published standard.</p>
      </div>

      {/* Implementation Roadmap by Size */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation Roadmap by Size</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {ROADMAP.map((r) => (
            <div key={r.size} className="bg-blue-50 border border-blue-200 rounded-xl p-4 dark:bg-blue-900/20 dark:border-blue-800">
              <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-1">{r.size}</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">{r.label}</p>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                {r.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Evidence & Common Gaps */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Audit Evidence & Common Gaps</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-900/20 dark:border-green-800">
            <h4 className="font-bold text-green-900 dark:text-green-200 mb-2">Evidence to prepare</h4>
            <ul className="space-y-1 text-sm text-green-800 dark:text-green-300">
              {AUDIT_EVIDENCE.evidence.map((e) => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 dark:bg-amber-900/20 dark:border-amber-800">
            <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-2">Common gaps</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-amber-100 dark:bg-amber-900/40">
                  <tr>
                    <th className="text-left p-2 font-semibold text-amber-900 dark:text-amber-200">Observation</th>
                    <th className="text-left p-2 font-semibold text-amber-900 dark:text-amber-200">Client pushback</th>
                    <th className="text-left p-2 font-semibold text-amber-900 dark:text-amber-200">Recommended response</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 dark:divide-amber-800">
                  {GAP_ROWS.map((r) => (
                    <tr key={r.observation}>
                      <td className="p-2 text-amber-800 dark:text-amber-300">{r.observation}</td>
                      <td className="p-2 text-amber-800 dark:text-amber-300">{r.pushback}</td>
                      <td className="p-2 text-amber-800 dark:text-amber-300">{r.response}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiVendorAssuranceTab;
