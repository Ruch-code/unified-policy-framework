import { useState } from 'react';
import { Package, Brain, Bot, Download, FileJson, FileSpreadsheet, CheckCircle2, Scale, Wrench, ArrowRight, Info } from 'lucide-react';
import { SBOM_JSON, AIBOM_JSON, ABOM_JSON, SBOM_SHEET, AIBOM_SHEET, ABOM_SHEET } from '../data/bomTemplates.js';
import { downloadXlsx, downloadBlob } from '../utils/xlsxExport.js';

const TYPES = [
  {
    id: 'sbom', short: 'SBOM', full: 'Software Bill of Materials', Icon: Package,
    what: 'A machine-readable list of every component inside a piece of software: open-source libraries, their versions, suppliers, licences and how they depend on each other. Like the ingredients label on food.',
    why: [
      'When a new critical vulnerability is announced, you can find every affected product in minutes instead of days',
      'Shows licence obligations before they become legal problems',
      'Customers, regulators and procurement teams increasingly require one',
      'Base for supply chain controls such as signing and provenance',
    ],
    contains: ['Supplier and component name', 'Version and a unique identifier (package URL or CPE)', 'Dependency relationships, including transitive ones', 'Hashes of each component', 'Licence', 'Who generated the SBOM, with which tool, and when'],
    formats: 'CycloneDX (OWASP, ECMA-424) and SPDX (Linux Foundation, ISO/IEC 5962). Both are widely supported.',
    tools: 'Syft, cdxgen, Trivy, CycloneDX plugins for npm, Maven and Python; GitHub dependency graph export. Dependency-Track or similar to monitor SBOMs over time.',
    drivers: ['US Executive Order 14028 and CISA SBOM minimum elements (NTIA 2021 baseline; CISA published an updated draft in 2025 adding fields such as hashes, licence and generation context)', 'EU Cyber Resilience Act: manufacturers of products with digital elements must keep an SBOM; reporting duties apply from September 2026 and most obligations from December 2027', 'US FDA premarket requirements for cyber devices', 'PCI DSS v4.0 requirement 6.3.2: inventory of bespoke and third-party software components'],
    practices: ['Generate automatically in CI for every release, not by hand', 'Generate from the built artifact or container image, not only from source manifests', 'Include transitive dependencies and hashes', 'Sign the SBOM and store it with the release', 'Load SBOMs into a monitoring tool so new CVEs are matched continuously', 'Publish VEX statements to say whether a vulnerability actually affects your product', 'Keep one SBOM per version; never overwrite'],
    json: SBOM_JSON, sheet: SBOM_SHEET, file: 'sbom-template',
  },
  {
    id: 'aibom', short: 'AIBOM', full: 'AI Bill of Materials', Icon: Brain,
    what: 'An SBOM extended for AI systems. Besides software libraries, it records the models, datasets, retrieval sources, prompts and external AI services an AI system is built from, plus how the model was evaluated.',
    why: [
      'Answers "which model and which data is behind this decision?" for auditors, customers and regulators',
      'Lets you react when a model, dataset or AI provider has a problem, for example a poisoned model on a public hub',
      'Supports EU AI Act technical documentation and ISO/IEC 42001 controls',
      'Makes licence and training-data rights visible before launch',
    ],
    contains: ['Models with version, provider, licence and hash', 'Model card: task, intended use, limitations, evaluation results', 'Training, fine-tuning and evaluation datasets with provenance and classification', 'Retrieval indexes and their sources', 'Prompt and configuration versions', 'External AI services (APIs) and the data sent to them', 'Software libraries, as in a normal SBOM'],
    formats: 'CycloneDX 1.6 ML-BOM (machine-learning-model and data component types, model cards) and the SPDX 3.0 AI profile.',
    tools: 'CycloneDX tooling, model registries (MLflow, cloud ML platforms) as the source of truth, model scanners for unsafe files, and AI governance platforms that export AIBOMs.',
    drivers: ['EU AI Act technical documentation and transparency duties (Annex IV for high-risk systems; Art. 53 for general-purpose AI models)', 'ISO/IEC 42001 Annex A controls on AI system documentation and data', 'Customer due diligence questionnaires on AI'],
    practices: ['Identify models and datasets by immutable hash or registry digest, never by "latest"', 'Record data provenance and the legal basis for using it', 'Version prompts and system instructions in the repository and reference them', 'Attach evaluation results, including bias and prompt injection tests', 'Regenerate the AIBOM whenever the model, data, prompt or provider changes', 'Treat third-party model APIs as services with data flow and classification', 'Keep the AIBOM linked to the AI system inventory and risk register'],
    json: AIBOM_JSON, sheet: AIBOM_SHEET, file: 'aibom-template',
  },
  {
    id: 'abom', short: 'ABOM', full: 'Agent Bill of Materials (also AgBOM)', Icon: Bot,
    what: 'An inventory of an AI agent: the model it uses and also what it can do. That means its tools, MCP servers and APIs, permissions, identity, memory, and which actions need human approval. It describes the agent\'s reach, not just its parts.',
    why: [
      'An agent\'s risk comes from its permissions and tools, which an SBOM or AIBOM does not show',
      'Makes prompt injection impact visible: what could an attacker make this agent do?',
      'Supports access reviews for non-human identities',
      'Gives incident responders a map of what an agent touched',
    ],
    contains: ['Agent name, owner, purpose and autonomy level', 'Models used', 'Tools and their permissions (read, write, delete, send)', 'MCP servers, APIs and other agents it connects to', 'Identity or service account and its scopes', 'Data it can read and change, with classification', 'Memory and knowledge sources', 'Actions that require human approval, and the kill switch', 'Logging and retention'],
    formats: 'No final standard yet. OWASP\'s Agent Observability Standard describes an AgBOM extending CycloneDX, SPDX and SWID (drafts). The template here uses standard CycloneDX fields so it loads in existing tools.',
    tools: 'Agent and MCP inventories from your agent platform, identity provider reports for agent service accounts, and logs of tool calls. Expect dedicated tooling to mature quickly.',
    drivers: ['Access control and least privilege requirements (ISO 27001 A.5.15, A.8.2; SOC 2 CC6)', 'EU AI Act human oversight and logging for high-risk uses', 'ISO/IEC 27090 guidance on securing AI systems against prompt injection and misuse'],
    practices: ['Give every agent its own identity; never reuse a person\'s credentials', 'Least privilege per tool; separate read and write tools', 'Require human approval for payments, deletions, permission changes and external messages', 'Pin MCP server and tool versions and review changes like code', 'Update the ABOM automatically when tools, servers or models change', 'Log every tool call and review high-impact actions', 'Include agents in quarterly access reviews'],
    json: ABOM_JSON, sheet: ABOM_SHEET, file: 'abom-template',
  },
];

function downloadJson(obj, name) {
  const blob = new Blob([JSON.stringify(obj, null, 2) + '\n'], { type: 'application/json' });
  downloadBlob(blob, `${name}.cdx.json`);
}

function downloadSheet(t) {
  const instructions = {
    name: 'How to use', title: `${t.short} template: ${t.full}`,
    notes: ['Exported from OneLens by Ruchi. Values in square brackets are examples to replace.'],
    headers: ['Best practice'],
    rows: t.practices.map(p => [p]),
  };
  const register = { name: `${t.short} register`, title: `${t.full} register`, notes: ['One row per item. Keep one register per product, AI system or agent.'], headers: t.sheet.headers, rows: t.sheet.rows };
  downloadXlsx([register, instructions], t.file);
}

export default function BomTab({ onOpenTab }) {
  const [active, setActive] = useState('sbom');
  const t = TYPES.find(x => x.id === active);
  const li = x => <li key={x} className="flex gap-2"><span>-</span><span>{x}</span></li>;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-indigo-200 dark:border-indigo-800 p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
          <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 flex items-center justify-center"><Package className="w-4 h-4" /></span>
          SBOM, AIBOM and ABOM
        </h3>
        <p className="text-sm text-gray-600 dark:text-slate-300 max-w-3xl">
          Bills of materials list what something is made of, so you can answer "are we affected?" quickly. An SBOM covers software, an AIBOM adds models and data, and an ABOM adds what an AI agent is allowed to do. Each includes a ready-to-use template in CycloneDX JSON and Excel.
        </p>
        {onOpenTab && (
          <p className="text-sm text-gray-600 dark:text-slate-300 mt-2">Where SBOMs are generated and signed in the pipeline: <button type="button" onClick={() => onOpenTab('cicd')} className="font-semibold text-indigo-700 dark:text-indigo-300 underline">CI/CD Pipelines <ArrowRight className="inline w-3 h-3" /></button></p>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 dark:border-slate-700 p-5 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <caption className="text-left font-bold text-gray-900 dark:text-white pb-3">How they compare</caption>
          <thead><tr className="text-left text-[11px] uppercase tracking-wide text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-700">
            <th className="p-2"></th><th className="p-2">SBOM</th><th className="p-2">AIBOM</th><th className="p-2">ABOM</th>
          </tr></thead>
          <tbody className="text-gray-700 dark:text-slate-200">
            {[
              ['Answers', 'What software is inside?', 'Which models and data is it built on?', 'What can this agent do and reach?'],
              ['Covers', 'Libraries, packages, containers', 'SBOM plus models, datasets, prompts, AI services', 'Models plus tools, MCP servers, permissions, identity, memory'],
              ['Main risk addressed', 'Vulnerable or malicious components, licences', 'Model and data provenance, poisoning, AI regulation', 'Excessive agency, prompt injection impact, non-human identities'],
              ['Standard', 'CycloneDX, SPDX (mature)', 'CycloneDX ML-BOM, SPDX 3.0 AI profile', 'Emerging (OWASP AgBOM drafts)'],
              ['Changes when', 'Every build', 'Model, data, prompt or provider changes', 'Any tool, server, permission or model change'],
            ].map(r => (
              <tr key={r[0]} className="align-top border-b border-gray-100 dark:border-slate-800">
                <th scope="row" className="p-2 text-left text-xs font-semibold text-gray-900 dark:text-white">{r[0]}</th>
                {r.slice(1).map((c, i) => <td key={i} className="p-2">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 dark:border-slate-700 p-5">
        <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Bill of materials types">
          {TYPES.map(x => (
            <button key={x.id} type="button" role="tab" aria-selected={active === x.id} onClick={() => setActive(x.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${active === x.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
              <x.Icon className="w-4 h-4" /> {x.short}
            </button>
          ))}
        </div>

        <div role="tabpanel">
          <h4 className="font-bold text-gray-900 dark:text-white">{t.short}: {t.full}</h4>
          <p className="text-sm text-gray-700 dark:text-slate-200 mt-1 mb-4 max-w-3xl">{t.what}</p>

          <div className="grid md:grid-cols-2 gap-3 mb-3 text-sm">
            <div className="rounded-lg p-3 bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
              <p className="text-[11px] font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300 mb-1">Why it matters</p>
              <ul className="space-y-1 text-gray-700 dark:text-slate-200">{t.why.map(li)}</ul>
            </div>
            <div className="rounded-lg p-3 bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300 mb-1">What it contains</p>
              <ul className="space-y-1 text-gray-700 dark:text-slate-200">{t.contains.map(li)}</ul>
            </div>
            <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
              <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Best practices</p>
              <ul className="space-y-1 text-gray-700 dark:text-slate-200">{t.practices.map(li)}</ul>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg p-3 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
                <p className="text-[11px] font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-1.5"><Scale className="w-3.5 h-3.5" /> Regulatory and framework drivers</p>
                <ul className="space-y-1 text-gray-700 dark:text-slate-200">{t.drivers.map(li)}</ul>
              </div>
              <div className="rounded-lg p-3 border border-gray-200 dark:border-slate-700">
                <p className="text-[11px] font-bold uppercase tracking-wide text-gray-600 dark:text-slate-300 mb-1 flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5" /> Formats and tools</p>
                <p className="text-gray-700 dark:text-slate-200"><span className="font-semibold">Formats:</span> {t.formats}</p>
                <p className="text-gray-700 dark:text-slate-200 mt-1"><span className="font-semibold">Tools:</span> {t.tools}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800">
            <p className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2"><Download className="w-4 h-4 text-indigo-700 dark:text-indigo-300" /> Download the {t.short} template</p>
            <p className="text-xs text-gray-600 dark:text-slate-300 mb-3">Values in square brackets are examples to replace. The JSON version follows CycloneDX 1.6 and loads into common SBOM tools; the Excel version is a register for teams starting without tooling.</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => downloadJson(t.json, t.file)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
                <FileJson className="w-4 h-4" /> CycloneDX JSON
              </button>
              <button type="button" onClick={() => downloadSheet(t)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50 dark:bg-slate-800 dark:text-indigo-300 dark:border-indigo-700 dark:hover:bg-slate-700">
                <FileSpreadsheet className="w-4 h-4" /> Excel register
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 dark:border-slate-700 p-5">
        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Lifecycle that works for all three</h4>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          {[
            ['Generate', 'Automatically at build or release, from the actual artifact, model registry or agent configuration.'],
            ['Sign and store', 'Sign it, store it next to the release, and keep every version.'],
            ['Monitor', 'Feed it to a tool that matches new vulnerabilities, model advisories and licence issues.'],
            ['Respond', 'When something is announced, query all BOMs to find what is affected, and publish VEX where it is not.'],
            ['Share', 'Provide to customers and regulators on request, under NDA where needed.'],
            ['Review', 'Include in change management and access reviews; regenerate on every relevant change.'],
          ].map(([k, v], i) => (
            <li key={k} className="rounded-lg p-3 border border-gray-200 dark:border-slate-700">
              <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">{i + 1}</span>{k}</p>
              <p className="text-gray-600 dark:text-slate-300 mt-1">{v}</p>
            </li>
          ))}
        </ol>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-3 flex gap-1.5"><Info className="w-3.5 h-3.5 shrink-0 mt-0.5" /> "ABOM" is also sometimes used loosely to mean an AI BOM. Here it means an Agent BOM. Regulatory dates reflect the position as of October 2026.</p>
      </div>
    </div>
  );
}
