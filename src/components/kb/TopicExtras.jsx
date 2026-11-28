// Reference blocks added to the matching sections of the site. Data lives in src/data/topicExtras.js and aiVendorExtras.js.
import GrcAngle from './GrcAngle.jsx';
import { CHANGE_EXAMPLES, CHANGE_EVIDENCE_MATRIX, CAB, VULN_RELEASE, MICROSERVICES, CLOUD_MODELS, DPA_CHECKS, DPA_TEAMS, BAA_COVERAGE, SOC_COMPARE, INDIA_US_SCENARIOS, CRYPTO_COMPARE } from '../../data/topicExtras.js';
import * as AI from '../../data/aiVendorExtras.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const MUTED = 'text-gray-500 dark:text-slate-400';
const LINE = 'border-gray-200 dark:border-slate-700';

export function Block({ id, title, intro, children }) {
  return (
    <section id={id} className={`bg-white dark:bg-[#1e293b] border ${LINE} rounded-2xl p-5 scroll-mt-24 min-w-0`}>
      <h3 className={`text-lg font-bold ${H}`}>{title}</h3>
      {intro && <p className={`mt-1 text-sm ${TXT}`}>{intro}</p>}
      <div className="mt-3 space-y-4">{children}</div>
    </section>
  );
}

export function Sub({ children }) {
  return <h4 className={`text-sm font-bold ${H}`}>{children}</h4>;
}

export function Note({ children }) {
  return <p className={`text-xs ${MUTED}`}>{children}</p>;
}

// Table on tablet and desktop, stacked cards on phones. Each value keeps its own labelled field.
export function RefTable({ columns, rows, label }) {
  return (
    <>
      <div className={`hidden sm:block overflow-x-auto border ${LINE} rounded-lg`} role="region" aria-label={label} tabIndex={0}>
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>{columns.map((c) => <th key={c} scope="col" className={`text-left align-bottom p-2 font-semibold ${H} border-b ${LINE}`}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.join('|')} className={`border-t ${LINE} align-top`}>
                {r.map((v, i) => <td key={i} className={`p-2 break-words ${i === 0 ? `font-semibold ${H}` : TXT}`}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sm:hidden space-y-2" aria-label={label}>
        {rows.map((r) => (
          <div key={r.join('|')} className={`border ${LINE} rounded-lg p-3`}>
            <p className={`font-semibold text-sm ${H} break-words`}>{r[0]}</p>
            {r.slice(1).map((v, i) => (v ? (
              <p key={i} className="mt-1 text-sm break-words"><span className={`font-semibold ${H}`}>{columns[i + 1]}: </span><span className={TXT}>{v}</span></p>
            ) : null))}
          </div>
        ))}
      </div>
    </>
  );
}

// Simple flow chart: numbered steps joined by arrows; vertical on phones, wrapping row on wider screens.
export function Flow({ steps, label }) {
  return (
    <ol aria-label={label} className="flex flex-col sm:flex-row sm:flex-wrap items-stretch gap-2">
      {steps.map(([t, d], i) => (
        <li key={t} className="flex flex-col sm:flex-row items-stretch gap-2 sm:flex-1 sm:min-w-[11rem]">
          <div className={`flex-1 border ${LINE} rounded-lg p-3 bg-gray-50 dark:bg-slate-800/60`}>
            <p className={`text-xs ${MUTED}`}>Step {i + 1}</p>
            <p className={`text-sm font-semibold ${H}`}>{t}</p>
            <p className={`mt-1 text-xs ${TXT}`}>{d}</p>
          </div>
          {i < steps.length - 1 && <span aria-hidden="true" className={`self-center text-lg ${MUTED}`}><span className="sm:hidden">↓</span><span className="hidden sm:inline">→</span></span>}
        </li>
      ))}
    </ol>
  );
}

const Bullets = ({ items }) => <ul className={`list-disc pl-5 text-sm ${TXT} space-y-1`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;

// ---------- Change management ----------
export function ChangeExtras() {
  return (
    <>
      <Block id="cm-hotfix-cosmetic" title="Hotfix, cosmetic, standard and normal changes: SaaS examples and audit evidence" intro={CHANGE_EXAMPLES.population}>
        <RefTable label="Change types with SaaS examples" columns={CHANGE_EXAMPLES.columns} rows={CHANGE_EXAMPLES.rows} />
      </Block>
      <Block id="cm-evidence-matrix" title="Mandatory evidence by change type" intro={CHANGE_EVIDENCE_MATRIX.intro}>
        <RefTable label="Mandatory evidence by change type" columns={CHANGE_EVIDENCE_MATRIX.columns} rows={CHANGE_EVIDENCE_MATRIX.rows} />
        <Note>{CHANGE_EVIDENCE_MATRIX.note}</Note>
      </Block>
      <Block id="cm-cab" title="Change advisory board (CAB): is it needed, and why" intro={CAB.intro}>
        <RefTable label="Why a CAB matters" columns={['Purpose', 'What it does']} rows={CAB.why} />
        <Sub>Typical agenda</Sub>
        <Bullets items={CAB.agenda} />
        <p className={`text-sm ${TXT}`}><span className={`font-semibold ${H}`}>Who attends: </span>{CAB.attendees}</p>
        <p className={`text-sm ${TXT}`}><span className={`font-semibold ${H}`}>Evidence: </span>{CAB.evidence}</p>
        <p className={`text-sm ${TXT}`}><span className={`font-semibold ${H}`}>For a small company: </span>{CAB.startup}</p>
        <Sub>Common pitfalls</Sub>
        <Bullets items={CAB.pitfalls} />
      </Block>
      <Block id="cm-release-with-vuln" title="Should we go to production with a known vulnerability?" intro={VULN_RELEASE.intro}>
        <RefTable label="Release decisions with a known vulnerability" columns={VULN_RELEASE.columns} rows={VULN_RELEASE.rows} />
        <Sub>What drives the decision</Sub>
        <Bullets items={VULN_RELEASE.factors} />
        <p className={`text-sm ${TXT}`}><span className={`font-semibold ${H}`}>Evidence: </span>{VULN_RELEASE.evidence}</p>
      </Block>
    </>
  );
}

// ---------- System design ----------
export function MicroservicesBlock() {
  return (
    <Block id="sd-microservices" title="Microservices: what changes for audit and controls" intro={MICROSERVICES.intro}>
      <RefTable label="Microservices controls" columns={MICROSERVICES.columns} rows={MICROSERVICES.rows} />
      <Note>{MICROSERVICES.vsMonolith}</Note>
    </Block>
  );
}

// ---------- Infra ----------
export function CloudModelsBlock() {
  return (
    <Block id="infra-cloud-models" title="IaaS, PaaS and SaaS: who manages what" intro="The service model decides which controls you own and which you inherit from the provider.">
      <RefTable label="Cloud service models" columns={CLOUD_MODELS.columns} rows={CLOUD_MODELS.rows} />
      <Note>{CLOUD_MODELS.note}</Note>
    </Block>
  );
}

// ---------- Vendors: DPA, teams, BAA ----------
export function DpaBaaBlock() {
  return (
    <>
      <Block id="vendor-dpa-checks" title="What to check in a Data Processing Agreement (DPA)" intro="Use this when a vendor will process personal data on your behalf. The left column is the clause; check each one is present and specific.">
        <RefTable label="DPA checklist" columns={DPA_CHECKS.columns} rows={DPA_CHECKS.rows} />
      </Block>
      <Block id="vendor-dpa-teams" title="Teams responsible for vendor and DPA review" intro="One team owns the workflow; several teams each own a part of the decision.">
        <RefTable label="Teams responsible" columns={DPA_TEAMS.columns} rows={DPA_TEAMS.rows} />
      </Block>
      <Block id="vendor-baa" title="What a Business Associate Agreement (BAA) covers" intro={BAA_COVERAGE.intro}>
        <RefTable label="BAA required terms" columns={BAA_COVERAGE.columns} rows={BAA_COVERAGE.rows} />
        <Note>{BAA_COVERAGE.extras}</Note>
      </Block>
    </>
  );
}

// ---------- SOC 1 / 2 / 3 ----------
export function SocCompareBlock() {
  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <Block id="soc1-soc2-soc3" title="SOC 1 vs SOC 2 vs SOC 3" intro="SOC reports are independent CPA attestation reports on a service organisation's controls. They answer different questions for different readers.">
        <RefTable label="SOC 1, SOC 2 and SOC 3 compared" columns={SOC_COMPARE.columns} rows={SOC_COMPARE.rows} />
        <Sub>Points that infographics often get wrong</Sub>
        <Bullets items={SOC_COMPARE.notes} />
      </Block>
    </div>
  );
}

// ---------- India to US scenarios ----------
export function IndiaUsScenarios({ wrap = true }) {
  const inner = (
    <Block id="india-us-hipaa-dpdpa" title="Scenarios: an Indian company doing business in the US. Does HIPAA or DPDPA apply?" intro={INDIA_US_SCENARIOS.rule}>
      <RefTable label="India and US scenarios" columns={INDIA_US_SCENARIOS.columns} rows={INDIA_US_SCENARIOS.rows} />
      <Note>Based on 45 CFR 160.103 (Covered Entity and Business Associate definitions) and the Digital Personal Data Protection Act 2023, sections 3 and 17(1)(d). This is general guidance, not legal advice.</Note>
    </Block>
  );
  return wrap ? <div className="max-w-6xl mx-auto px-4 my-10">{inner}</div> : inner;
}

// ---------- Encryption ----------
export function EncryptionBlock() {
  const C = CRYPTO_COMPARE;
  return (
    <Block id="edp-encryption" title="Encryption explained: symmetric, asymmetric, AES-256 and TLS 1.3" intro="Encryption at rest protects stored data; encryption in transit protects data moving over a network. Both rely on the same two families of cryptography.">
      <RefTable label="Symmetric and asymmetric encryption" columns={C.columns} rows={C.rows} />
      <Sub>AES-256</Sub>
      <p className={`text-sm ${TXT}`}>{C.aes}</p>
      <Sub>TLS 1.3 handshake</Sub>
      <p className={`text-sm ${TXT}`}>{C.tls}</p>
      <Flow label="TLS 1.3 handshake" steps={C.tlsFlow} />
      <Sub>How certificate validation works</Sub>
      <Bullets items={[
        'The server sends its certificate plus any intermediate certificates.',
        'The browser builds a chain from the server certificate to a root certificate authority in its trust store, checking each signature.',
        'It checks the name on the certificate matches the site, the dates are valid, and the certificate has not been revoked.',
        'In TLS 1.3 the session secret comes from an ephemeral Diffie-Hellman exchange; the server\'s key is used only to sign, never to encrypt the secret. This gives forward secrecy.',
        'SSL (all versions) and TLS 1.0 and 1.1 are deprecated; use TLS 1.2 or 1.3. "SSL certificate" is just the common name for a TLS certificate.',
      ]} />
      <GrcAngle>ISO 27001:2022 A.8.24 (use of cryptography), A.5.14 (information transfer), A.8.20 (networks security); SOC 2 CC6.7 (data in transit). Evidence: TLS configuration scan, certificate inventory with expiry dates.</GrcAngle>
      <Sub>Encryption at rest with a KMS (envelope encryption)</Sub>
      <Flow label="Envelope encryption" steps={C.envelopeFlow} />
      <Sub>Evidence auditors ask for</Sub>
      <Bullets items={C.evidence} />
    </Block>
  );
}

// ---------- AI vendor risk ----------
export function AiVendorExtras() {
  return (
    <div className="space-y-4 mt-6">
      <Block id="ai-vendor-position" title={AI.AI_POSITION.title} intro={AI.AI_POSITION.text}>
        <Sub>Conditions for a controlled pilot</Sub>
        <Bullets items={AI.AI_POSITION.conditions} />
      </Block>
      <Block id="ai-vendor-chain" title="A vendor is not the full system: you inherit a chain" intro={AI.AI_SUPPLY_CHAIN.intro}>
        <RefTable label="AI supply chain" columns={AI.AI_SUPPLY_CHAIN.columns} rows={AI.AI_SUPPLY_CHAIN.rows} />
        <p className={`text-sm ${TXT}`}>{AI.AI_SUPPLY_CHAIN.test}</p>
        <Sub>Why it matters now</Sub>
        <RefTable label="Supporting figures" columns={['Finding', 'Source']} rows={AI.AI_STATS} />
      </Block>
      <Block id="ai-vendor-blind-spots" title="Five blind spots worth more than a questionnaire">
        <RefTable label="AI vendor blind spots" columns={AI.AI_BLIND_SPOTS.columns} rows={AI.AI_BLIND_SPOTS.rows} />
      </Block>
      <Block id="ai-vendor-compare" title="Traditional TPRM tests the supplier; AI TPRM also tests the deployed use case">
        <RefTable label="Traditional and AI TPRM" columns={AI.AI_TPRM_COMPARE.columns} rows={AI.AI_TPRM_COMPARE.rows} />
        <Note>{AI.AI_TPRM_COMPARE.note}</Note>
      </Block>
      <Block id="ai-vendor-gates" title="Eight gates of AI vendor governance">
        <Flow label="Eight gates" steps={AI.AI_GATES.rows.map(([g, p, a]) => [g, `${p}. Artefact: ${a}.`])} />
        <Note>{AI.AI_GATES.note}</Note>
      </Block>
      <Block id="ai-vendor-tiering" title="Risk tiering: assess the deployment, not the marketing">
        <RefTable label="Decision prompts" columns={['Prompt', 'What to consider']} rows={AI.AI_TIERING.prompts} />
        <RefTable label="Tier outcomes" columns={AI.AI_TIERING.columns} rows={AI.AI_TIERING.rows} />
        <Note>{AI.AI_TIERING.note}</Note>
      </Block>
      <Block id="ai-vendor-evidence" title="Evidence, not promises: what to ask for by domain">
        <RefTable label="Evidence by domain" columns={AI.AI_EVIDENCE.columns} rows={AI.AI_EVIDENCE.rows} />
        <Note>{AI.AI_EVIDENCE.note}</Note>
      </Block>
      <Block id="ai-vendor-clauses" title="Five clauses every high-risk AI contract should negotiate">
        <RefTable label="AI contract clauses" columns={AI.AI_CLAUSES.columns} rows={AI.AI_CLAUSES.rows} />
        <Note>{AI.AI_CLAUSES.note}</Note>
      </Block>
      <Block id="ai-vendor-raci" title="RACI: separate ownership from expertise">
        <RefTable label="AI vendor RACI" columns={AI.AI_RACI.columns} rows={AI.AI_RACI.rows} />
        <Note>{AI.AI_RACI.note}</Note>
      </Block>
      <Block id="ai-vendor-ladder" title="Agent permission ladder: controls tighten as authority rises" intro={AI.AI_LADDER.rule}>
        <RefTable label="Agent permission ladder" columns={AI.AI_LADDER.columns} rows={AI.AI_LADDER.rows} />
      </Block>
      <Block id="ai-vendor-redteam" title="Five red-team tests to require from any agentic vendor">
        <RefTable label="Red-team tests" columns={AI.AI_REDTEAM.columns} rows={AI.AI_REDTEAM.rows} />
        <Note>{AI.AI_REDTEAM.note}</Note>
      </Block>
      <Block id="ai-vendor-air-canada" title={AI.AI_CASE_AIR_CANADA.title} intro={AI.AI_CASE_AIR_CANADA.role}>
        <RefTable label="Airline chatbot case" columns={['Item', 'Detail']} rows={[['What happened', AI.AI_CASE_AIR_CANADA.happened], ['What the case proves', AI.AI_CASE_AIR_CANADA.proves]]} />
        <Sub>TPRM controls to take away</Sub>
        <Bullets items={AI.AI_CASE_AIR_CANADA.controls} />
      </Block>
      <Block id="ai-vendor-plan" title="The 30, 60 and 90-day plan" intro={AI.AI_PLAN.monday}>
        <RefTable label="30 60 90 day plan" columns={AI.AI_PLAN.columns} rows={AI.AI_PLAN.rows} />
      </Block>
    </div>
  );
}

// ---------- AI agent frameworks ----------
export function AgentFrameworksBlock() {
  const F = AI.AGENT_FRAMEWORKS;
  return (
    <Block id="ai-agent-frameworks" title="AI agent frameworks you should know" intro={F.intro}>
      <RefTable label="AI agent frameworks" columns={F.columns} rows={F.rows} />
      <Sub>Choosing an approach</Sub>
      <RefTable label="Choosing a framework" columns={['If you need', 'Look at']} rows={F.choose} />
      <Note>{F.naming} Check each project's official documentation for current features.</Note>
    </Block>
  );
}
