import React, { useState } from 'react';
import {
  Shield, Lock, Key, Globe, Cloud, Users, FileText, Search, Zap, Cpu,
  HardDrive, Network, BookOpen, ExternalLink, CalendarDays, ShieldAlert,
  Clock, Timer, CheckCircle, Copy, Check, ChevronDown, ChevronRight,
  AlertTriangle, List, BarChart3, Target, Layers, Box, Server, Wrench, ShieldCheck,
} from 'lucide-react';
import { SECRET_ENVIRONMENTS, CLOUD_RUNBOOK } from '../data/secretsBeyondCode.js';
import {
  SECRET_TYPES, LEAK_SURFACES, CONTROL_POINTS, TOOLS, FRAMEWORK_MAPPINGS,
  ROADMAP, MATURITY_LEVELS, GAP_ROWS, SLA_ROWS, REMEDIATION_STEPS,
  REGEX_PATTERNS, METRICS, GOVERNANCE_CARDS, AUDIT_EVIDENCE,
  ASSESSMENT_QUESTIONS, TRIAGE_OPTIONS,
} from '../data/secretsScanning.ts';
import CodeBlock from './ui/CodeBlock.jsx';

function useCopy() {
  const [copied, setCopied] = useState(null);
  const copy = async (text, key) => {
    try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1200);
  };
  return { copied, copy };
}

// Severity logic for triage helper
function triageSeverity(type, visibility, live, env, priv) {
  let sev = 'Low';
  if (live === 'Yes') {
    if (visibility === 'Public') sev = 'Critical';
    else if (env === 'Production' && (priv === 'Admin' || priv === 'Write')) sev = 'Critical';
    else if (env === 'Production') sev = 'High';
    else sev = 'High';
  } else if (live === 'Unknown') {
    if (visibility === 'Public') sev = 'High';
    else if (env === 'Production') sev = 'Medium';
    else sev = 'Medium';
  } else {
    sev = 'Low';
  }
  const slaMap = { Critical: '4 hours', High: '24 hours', Medium: '7 days', Low: '30 days (triage)' };
  return { severity: sev, sla: slaMap[sev] };
}

const ENV_ICONS = { Cloud, Layers, Box, FileText, Server, Users, HardDrive, Cpu, Globe };

function SecretsBeyondCode() {
  const [active, setActive] = React.useState('aws');
  const env = SECRET_ENVIRONMENTS.find(e => e.id === active);
  const EnvIcon = ENV_ICONS[env.icon] || Cloud;
  const li = x => <li key={x} className="flex gap-2"><span>-</span><span>{x}</span></li>;
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]" id="secrets-beyond-code">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secret scanning beyond code: cloud and everywhere else</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-3xl">
        Repository scanning catches secrets before they ship. Many leaks happen after that: in cloud settings, storage, images, logs, chat tools and laptops. Pick an environment to see where secrets hide, how to scan for them, and how to stop them appearing.
      </p>
      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Environments">
        {SECRET_ENVIRONMENTS.map(e => {
          const I = ENV_ICONS[e.icon] || Cloud;
          return (
            <button key={e.id} type="button" role="tab" aria-selected={active === e.id} onClick={() => setActive(e.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${active === e.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
              <I className="w-3.5 h-3.5" /> {e.name}
            </button>
          );
        })}
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-4" role="tabpanel">
        <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3"><EnvIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-300" /> {env.name}</p>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg p-3 bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> Where secrets hide</p>
            <ul className="space-y-1 text-gray-700 dark:text-slate-200">{env.hide.map(li)}</ul>
          </div>
          <div className="rounded-lg p-3 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5" /> How to scan</p>
            <ul className="space-y-1 text-gray-700 dark:text-slate-200">{env.scan.map(li)}</ul>
            <p className="mt-2 text-xs text-gray-600 dark:text-slate-300"><span className="font-semibold">Open source:</span> {env.oss}</p>
          </div>
          <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
            <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> How to prevent it</p>
            <ul className="space-y-1 text-gray-700 dark:text-slate-200">{env.prevent.map(li)}</ul>
          </div>
        </div>
      </div>
      <h4 className="font-bold text-gray-900 dark:text-white mt-6 mb-3">Cloud secrets runbook</h4>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {CLOUD_RUNBOOK.map((r, i) => (
          <li key={r.step} className="rounded-lg p-3 border border-gray-200 dark:border-slate-700 text-sm">
            <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">{i + 1}</span>{r.step}
            </p>
            <p className="text-gray-600 dark:text-slate-300 mt-1">{r.text}</p>
          </li>
        ))}
      </ol>
      <p className="text-xs text-gray-500 dark:text-slate-400 mt-3">Tool names are common examples, not endorsements. Some native features depend on your plan or tier.</p>
    </div>
  );
}

function SecretsScanningTab() {
  const { copied, copy } = useCopy();

  // Assessment state
  const [answers, setAnswers] = useState({});
  const [showAssessmentResult, setShowAssessmentResult] = useState(false);

  // Triage state
  const [triage, setTriage] = useState({
    secretType: TRIAGE_OPTIONS.secretType[0],
    repoVisibility: TRIAGE_OPTIONS.repoVisibility[0],
    verifiedLive: TRIAGE_OPTIONS.verifiedLive[0],
    environment: TRIAGE_OPTIONS.environment[0],
    privilege: TRIAGE_OPTIONS.privilege[0],
  });
  const [showTriageResult, setShowTriageResult] = useState(false);

  const assessmentScore = ASSESSMENT_QUESTIONS.filter((q) => answers[q.id] === 'yes').length;
  const assessmentLevel = assessmentScore <= 2 ? 1 : assessmentScore <= 4 ? 2 : assessmentScore <= 6 ? 3 : assessmentScore <= 8 ? 4 : 5;
  const noItems = ASSESSMENT_QUESTIONS.filter((q) => answers[q.id] === 'no');

  const triageResult = triageSeverity(triage.secretType, triage.repoVisibility, triage.verifiedLive, triage.environment, triage.privilege);

  const assessmentText = `Secrets Scanning Self-Assessment Results\nMaturity Level: ${assessmentLevel} / 5\nScore: ${assessmentScore} / ${ASSESSMENT_QUESTIONS.length}\n\nGaps (answer "no"):\n${noItems.map((q) => '- ' + q.label).join('\n')}\n`;

  const triageText = `Secret Triage Result\nSeverity: ${triageResult.severity}\nRotate within: ${triageResult.sla}\n\nInputs: ${triage.secretType}, ${triage.repoVisibility} repo, verified live: ${triage.verifiedLive}, ${triage.environment}, ${triage.privilege} privilege`;

  return (
    <div className="space-y-6">
      {/* 1. Header and intro */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Secrets Scanning</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Secrets scanning is the automated detection of credentials and sensitive tokens placed where they should not be: source code, commit history, config files, container images, CI logs, tickets, chat, wikis and AI prompts. A leaked secret bypasses identity controls entirely. MFA, SSO and Conditional Access do nothing if an attacker holds a valid long-lived key.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Public repos are scraped by bots within minutes of a push. Private repos leak through forks, ex-employees, compromised laptops, third-party CI and backups. This module covers detection, control points, remediation, governance and audit evidence.
        </p>
      </div>

      {/* 2. What counts as a secret */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What counts as a secret</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {SECRET_TYPES.map((s) => (
            <div key={s.name} className="bg-blue-50 border border-blue-200 rounded-xl p-4 dark:bg-blue-900/20 dark:border-blue-800">
              <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-1">{s.name}</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Where secrets leak */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Where secrets leak</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Surface</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Typical leak</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Why it is missed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {LEAK_SURFACES.map((r) => (
                <tr key={r.surface}>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">{r.surface}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{r.leak}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{r.missed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. How detection works */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How detection works</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 dark:bg-indigo-900/20 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Pattern / regex</h4>
            <p className="text-sm text-indigo-800 dark:text-indigo-300">Provider-specific formats with fixed prefixes and lengths. High precision but misses generic secrets.</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 dark:bg-indigo-900/20 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Entropy analysis</h4>
            <p className="text-sm text-indigo-800 dark:text-indigo-300">Shannon entropy on strings in assignment context. Catches random-looking generic secrets but is noisy.</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 dark:bg-indigo-900/20 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Context / keywords</h4>
            <p className="text-sm text-indigo-800 dark:text-indigo-300">Variable names, file names, proximity to words like secret or apikey.</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 dark:bg-indigo-900/20 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Validation (liveness)</h4>
            <p className="text-sm text-indigo-800 dark:text-indigo-300">Calling the provider to confirm a key is active. Turns findings into verified live vs inactive.</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 dark:bg-indigo-900/20 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">ML / semantic</h4>
            <p className="text-sm text-indigo-800 dark:text-indigo-300">Newer tools use models to reduce false positives on generic passwords.</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 dark:bg-indigo-900/20 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Fingerprinting / baselines</h4>
            <p className="text-sm text-indigo-800 dark:text-indigo-300">Hash the secret so the same key across 40 commits is one finding. Allow baselining of accepted findings.</p>
          </div>
        </div>
        <CodeBlock code={REGEX_PATTERNS} title="Illustrative regex patterns" lang="regex" />
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 dark:bg-amber-900/20 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Caution:</strong> liveness checks must be read-only calls, never from untrusted environments, and governed by an approved runbook. Never validate secrets from untrusted or shared infrastructure.
          </p>
        </div>
      </div>

      {/* 5. Control points */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Control points (shift left plus safety net)</h3>
        {/* Pipeline visual */}
        <div className="flex flex-wrap items-center gap-2 mb-6 overflow-x-auto pb-2">
          {['IDE', 'Pre-commit', 'Push protection', 'CI gate', 'Full history scan', 'Non-code sources', 'Public monitoring'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <div className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">{step}</div>
              {i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Layer</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Purpose</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Example tooling</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {CONTROL_POINTS.map((r) => (
                <tr key={r.layer}>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">{r.layer}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{r.purpose}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{r.tooling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 dark:bg-amber-900/20 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Important:</strong> Pre-commit hooks are bypassable (client-side). Auditors rely on server-side push protection and CI gating as the enforceable layer.
          </p>
        </div>
      </div>

      {/* 5b. Beyond code: cloud and other environments */}
      <SecretsBeyondCode />

      {/* 6. Tool comparison */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tool comparison</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Tool</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Type</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Strengths</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Watch-outs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {TOOLS.map((r) => (
                <tr key={r.tool}>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">{r.tool}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{r.type}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{r.strengths}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{r.watchouts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Licensing note: use "typically requires" phrasing. Verify current plans with the vendor before purchasing.
        </p>
      </div>

      {/* 7. Remediation runbook */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Remediation runbook</h3>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-300">
            <strong>Important:</strong> Deleting the secret from code is NOT remediation. Rotate first. Assume compromise.
          </p>
        </div>
        <div className="space-y-3 mb-6">
          {REMEDIATION_STEPS.map((s) => (
            <div key={s.step} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 dark:bg-gray-800">
              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0">{s.step}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{s.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <h4 className="font-bold text-gray-900 dark:text-white mb-3">SLA by severity</h4>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Severity</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Example</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Rotate within</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {SLA_ROWS.map((r) => (
                <tr key={r.severity}>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">{r.severity}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{r.example}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{r.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. Governance */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Governance and program design</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {GOVERNANCE_CARDS.map((c) => (
            <div key={c.title} className="bg-gray-50 rounded-xl p-4 dark:bg-gray-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{c.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Metrics */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Metrics (KRIs/KPIs)</h3>
        <ul className="space-y-2">
          {METRICS.map((m) => (
            <li key={m} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> {m}
            </li>
          ))}
        </ul>
      </div>

      {/* 10. Framework mapping */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Framework mapping</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Secrets scanning controls map to these frameworks.</p>
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

      {/* 11. Roadmap by size */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation roadmap by size</h3>
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

      {/* 12. Maturity model */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Maturity model</h3>
        <div className="flex flex-wrap items-center gap-2 mb-4 overflow-x-auto pb-2">
          {MATURITY_LEVELS.map((m, i, arr) => (
            <React.Fragment key={m.level}>
              <div className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">
                {m.level}. {m.name}
              </div>
              {i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
        <div className="space-y-2">
          {MATURITY_LEVELS.map((m) => (
            <div key={m.level} className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold text-gray-900 dark:text-white">{m.name}:</span> {m.desc}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          The real end state is fewer secrets to leak: OIDC federation for CI to cloud, workload identity, short-lived tokens.
        </p>
      </div>

      {/* 13. Audit evidence and common gaps */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Audit evidence and common gaps</h3>
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

      {/* 14. Self-assessment */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Secrets Program Self-Assessment</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Answer yes or no to each question. Results are computed in your browser and not stored.</p>
        <div className="space-y-2 mb-6">
          {ASSESSMENT_QUESTIONS.map((q) => (
            <div key={q.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 dark:bg-gray-800">
              <span className="text-sm text-gray-700 dark:text-gray-300">{q.label}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: 'yes' }))}
                  className={`px-3 py-1 rounded text-xs font-semibold border transition ${answers[q.id] === 'yes' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: 'no' }))}
                  className={`px-3 py-1 rounded text-xs font-semibold border transition ${answers[q.id] === 'no' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowAssessmentResult(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition"
        >
          Show results
        </button>
        {showAssessmentResult && (
          <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4 dark:bg-indigo-900/20 dark:border-indigo-800">
            <p className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Maturity Level: {assessmentLevel} / 5 (score {assessmentScore}/{ASSESSMENT_QUESTIONS.length})</p>
            {noItems.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 mb-1">Prioritized gaps:</p>
                <ul className="space-y-1 text-sm text-indigo-800 dark:text-indigo-300">
                  {noItems.map((q) => (
                    <li key={q.id}>• {q.label}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              type="button"
              onClick={() => copy(assessmentText, 'assessment')}
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 hover:text-indigo-900 dark:text-indigo-300"
            >
              {copied === 'assessment' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy results</>}
            </button>
          </div>
        )}
      </div>

      {/* 15. Triage helper */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:bg-[#1e293b] dark:border-[#334155]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Exposed Secret Triage Helper</h3>
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-300">
            <strong>Warning:</strong> Never paste a real secret into this or any website.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Secret type</label>
            <select
              value={triage.secretType}
              onChange={(e) => setTriage((t) => ({ ...t, secretType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            >
              {TRIAGE_OPTIONS.secretType.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Repo visibility</label>
            <select
              value={triage.repoVisibility}
              onChange={(e) => setTriage((t) => ({ ...t, repoVisibility: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            >
              {TRIAGE_OPTIONS.repoVisibility.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verified live</label>
            <select
              value={triage.verifiedLive}
              onChange={(e) => setTriage((t) => ({ ...t, verifiedLive: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            >
              {TRIAGE_OPTIONS.verifiedLive.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Environment</label>
            <select
              value={triage.environment}
              onChange={(e) => setTriage((t) => ({ ...t, environment: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            >
              {TRIAGE_OPTIONS.environment.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Privilege level</label>
            <select
              value={triage.privilege}
              onChange={(e) => setTriage((t) => ({ ...t, privilege: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            >
              {TRIAGE_OPTIONS.privilege.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowTriageResult(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition mb-4"
        >
          Triage
        </button>
        {showTriageResult && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 dark:bg-indigo-900/20 dark:border-indigo-800">
            <p className="font-bold text-indigo-900 dark:text-indigo-200 mb-1">Severity: {triageResult.severity}</p>
            <p className="text-sm text-indigo-800 dark:text-indigo-300 mb-3">Rotate within: {triageResult.sla}</p>
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2 text-sm">Ordered checklist (remediation runbook):</h4>
            <ol className="space-y-1 text-sm text-indigo-800 dark:text-indigo-300 list-decimal list-inside">
              {REMEDIATION_STEPS.map((s) => (
                <li key={s.step}>{s.title}: {s.desc}</li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => copy(triageText, 'triage')}
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 hover:text-indigo-900 dark:text-indigo-300"
            >
              {copied === 'triage' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy results</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SecretsScanningTab;
