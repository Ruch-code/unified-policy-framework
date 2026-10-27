// Starter templates for SBOM, AIBOM and ABOM. JSON templates use standard CycloneDX 1.6 fields
// so they load into common SBOM tools. Values in square brackets are placeholders to replace.

const NOW = '2026-01-01T00:00:00Z';

export const SBOM_JSON = {
  bomFormat: 'CycloneDX',
  specVersion: '1.6',
  serialNumber: 'urn:uuid:00000000-0000-4000-8000-000000000001',
  version: 1,
  metadata: {
    timestamp: NOW,
    lifecycles: [{ phase: 'build' }],
    tools: { components: [{ type: 'application', name: '[SBOM generator, e.g. Syft or cdxgen]', version: '[x.y.z]' }] },
    supplier: { name: '[Your company]' },
    component: { type: 'application', 'bom-ref': 'app', name: '[your-app]', version: '[1.4.0]' },
  },
  components: [
    {
      type: 'library', 'bom-ref': 'pkg:npm/express@4.19.2', name: 'express', version: '4.19.2',
      purl: 'pkg:npm/express@4.19.2', supplier: { name: 'OpenJS Foundation' },
      licenses: [{ license: { id: 'MIT' } }],
      hashes: [{ alg: 'SHA-256', content: '[sha256 of the package]' }],
    },
    {
      type: 'library', 'bom-ref': 'pkg:pypi/requests@2.32.3', name: 'requests', version: '2.32.3',
      purl: 'pkg:pypi/requests@2.32.3', licenses: [{ license: { id: 'Apache-2.0' } }],
      hashes: [{ alg: 'SHA-256', content: '[sha256 of the package]' }],
    },
    {
      type: 'container', 'bom-ref': 'base-image', name: '[node]', version: '[20-alpine@sha256:...]',
      description: 'Base container image',
    },
  ],
  dependencies: [
    { ref: 'app', dependsOn: ['pkg:npm/express@4.19.2', 'pkg:pypi/requests@2.32.3', 'base-image'] },
  ],
};

export const AIBOM_JSON = {
  bomFormat: 'CycloneDX',
  specVersion: '1.6',
  serialNumber: 'urn:uuid:00000000-0000-4000-8000-000000000002',
  version: 1,
  metadata: {
    timestamp: NOW,
    supplier: { name: '[Your company]' },
    component: { type: 'application', 'bom-ref': 'ai-system', name: '[Support reply assistant]', version: '[2.1]' },
  },
  components: [
    {
      type: 'machine-learning-model', 'bom-ref': 'model-base', name: '[base model name]', version: '[model version or ID]',
      supplier: { name: '[Model provider]' },
      licenses: [{ license: { name: '[model licence or commercial terms]' } }],
      hashes: [{ alg: 'SHA-256', content: '[weights hash, if self-hosted]' }],
      modelCard: {
        modelParameters: {
          task: '[text-generation]',
          architectureFamily: '[transformer]',
          datasets: [{ ref: 'dataset-finetune' }],
        },
        quantitativeAnalysis: {
          performanceMetrics: [
            { type: '[accuracy on internal eval set]', value: '[0.91]' },
            { type: '[prompt injection test pass rate]', value: '[0.97]' },
          ],
        },
        considerations: {
          useCases: ['[Draft replies to customer tickets for human review]'],
          technicalLimitations: ['[May produce incorrect answers; not for legal or medical advice]'],
          ethicalConsiderations: [{ name: '[Bias across customer languages]', mitigationStrategy: '[Evaluation per language; human review]' }],
        },
      },
    },
    {
      type: 'data', 'bom-ref': 'dataset-finetune', name: '[Fine-tuning dataset]', version: '[2026-01]',
      data: [{
        type: 'dataset', name: '[Resolved support tickets, de-identified]',
        classification: '[Confidential]',
        contents: { url: '[internal storage location]' },
        governance: { owners: [{ organization: { name: '[Data owner team]' } }] },
      }],
    },
    {
      type: 'data', 'bom-ref': 'rag-index', name: '[Retrieval index: help centre articles]', version: '[2026-01-15]',
      data: [{ type: 'dataset', name: '[Public help articles]', classification: '[Public]' }],
    },
    {
      type: 'library', 'bom-ref': 'pkg:pypi/transformers@4.44.0', name: 'transformers', version: '4.44.0',
      purl: 'pkg:pypi/transformers@4.44.0', licenses: [{ license: { id: 'Apache-2.0' } }],
    },
  ],
  services: [
    {
      'bom-ref': 'svc-model-api', name: '[Hosted model API]', provider: { name: '[Model provider]' },
      endpoints: ['[https://api.example-provider.com]'], authenticated: true, 'x-trust-boundary': true,
      data: [{ flow: 'bi-directional', classification: '[Confidential]' }],
    },
  ],
  dependencies: [
    { ref: 'ai-system', dependsOn: ['model-base', 'rag-index', 'svc-model-api', 'pkg:pypi/transformers@4.44.0'] },
    { ref: 'model-base', dependsOn: ['dataset-finetune'] },
  ],
};

export const ABOM_JSON = {
  bomFormat: 'CycloneDX',
  specVersion: '1.6',
  serialNumber: 'urn:uuid:00000000-0000-4000-8000-000000000003',
  version: 1,
  metadata: {
    timestamp: NOW,
    supplier: { name: '[Your company]' },
    component: {
      type: 'application', 'bom-ref': 'agent', name: '[Finance ops agent]', version: '[0.9]',
      description: '[Reconciles invoices and drafts payment runs for human approval]',
      properties: [
        { name: 'agent:owner', value: '[Head of Finance Ops]' },
        { name: 'agent:autonomy', value: '[Drafts only; human approves every payment]' },
        { name: 'agent:identity', value: '[Dedicated service account: svc-finance-agent]' },
        { name: 'agent:system-prompt-version', value: '[v12, stored in repo]' },
        { name: 'agent:memory', value: '[Session only; no long-term memory]' },
        { name: 'agent:human-approval-required', value: '[payments, vendor bank detail changes]' },
        { name: 'agent:kill-switch', value: '[Feature flag finance-agent-enabled]' },
      ],
    },
  },
  components: [
    { type: 'machine-learning-model', 'bom-ref': 'agent-model', name: '[model name]', version: '[model ID]', supplier: { name: '[Model provider]' } },
    {
      type: 'application', 'bom-ref': 'tool-erp-read', name: '[Tool: read invoices from ERP]',
      properties: [{ name: 'tool:permission', value: '[read-only]' }, { name: 'tool:data', value: '[vendor invoices, Confidential]' }],
    },
    {
      type: 'application', 'bom-ref': 'tool-payment-draft', name: '[Tool: create draft payment run]',
      properties: [{ name: 'tool:permission', value: '[write drafts only, cannot release]' }, { name: 'tool:approval', value: '[Finance manager]' }],
    },
  ],
  services: [
    {
      'bom-ref': 'mcp-erp', name: '[MCP server: ERP connector]', version: '[1.3.0]',
      provider: { name: '[Vendor or internal team]' }, endpoints: ['[internal MCP endpoint]'],
      authenticated: true, 'x-trust-boundary': true,
      data: [{ flow: 'bi-directional', classification: '[Confidential]' }],
    },
    {
      'bom-ref': 'svc-email', name: '[Email API for notifications]', authenticated: true, 'x-trust-boundary': true,
      data: [{ flow: 'outbound', classification: '[Internal]' }],
    },
  ],
  dependencies: [
    { ref: 'agent', dependsOn: ['agent-model', 'tool-erp-read', 'tool-payment-draft', 'mcp-erp', 'svc-email'] },
  ],
};

// Spreadsheet versions (one row per item) for teams that start with a register.
export const SBOM_SHEET = {
  headers: ['Component', 'Version', 'Type', 'Supplier', 'Package URL (purl)', 'Licence', 'Hash (SHA-256)', 'Direct or transitive', 'Used by', 'Known vulnerabilities', 'Last reviewed'],
  rows: [
    ['express', '4.19.2', 'Library', 'OpenJS Foundation', 'pkg:npm/express@4.19.2', 'MIT', '[hash]', 'Direct', '[api service]', '[none / CVE IDs]', '[date]'],
    ['[base image]', '[tag@digest]', 'Container', '[publisher]', '', '[licence]', '[digest]', 'Direct', '[all services]', '', '[date]'],
  ],
};

export const AIBOM_SHEET = {
  headers: ['AI system', 'Owner', 'Model (name and version)', 'Model provider', 'Hosting (API or self-hosted)', 'Licence or terms', 'Training or fine-tuning data', 'Data classification', 'Retrieval sources', 'Prompt or config version', 'Evaluation results', 'Known limitations', 'Risk level (EU AI Act)', 'Last reviewed'],
  rows: [
    ['[Support reply assistant]', '[Head of Support]', '[model, version ID]', '[provider]', '[API]', '[commercial terms, no training on our data]', '[de-identified tickets 2025]', '[Confidential]', '[help centre articles]', '[prompt v7]', '[accuracy 0.91, injection tests pass]', '[may hallucinate; human review]', '[Transparency risk]', '[date]'],
  ],
};

export const ABOM_SHEET = {
  headers: ['Agent', 'Owner', 'Purpose', 'Model', 'Tools', 'MCP servers and APIs', 'Permissions and scopes', 'Data it can read', 'Data it can change', 'Identity used', 'Memory', 'Human approval required for', 'Kill switch', 'Logging', 'Last reviewed'],
  rows: [
    ['[Finance ops agent]', '[Head of Finance Ops]', '[Reconcile invoices, draft payment runs]', '[model ID]', '[read invoices; create draft payment]', '[ERP MCP server v1.3; email API]', '[ERP read; payments draft-only]', '[vendor invoices]', '[draft payments only]', '[svc-finance-agent]', '[session only]', '[payment release; bank detail changes]', '[feature flag]', '[all tool calls logged 1 year]', '[date]'],
  ],
};
