import SortableGrid from '../kb/SortableGrid.jsx';

// The modern AI tool ecosystem by layer, with the GRC and security questions to ask at each layer.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300';

const LAYERS = [
  ['LLMs', 'The models that reason and generate', 'OpenAI GPT, Anthropic Claude, Google Gemini, Meta Llama, Mistral, Cohere; Hugging Face, Ollama and vLLM for hosting open models', 'Is the model approved? Is our data used for training? Where is it hosted and for how long are prompts kept? Who patches self-hosted models?'],
  ['Agentic AI frameworks', 'Build agents that plan and call tools', 'LangGraph, CrewAI, Microsoft AutoGen, Microsoft Agent Framework, LlamaIndex Workflows, AWS Strands Agents, CAMEL, Agno', 'What tools and permissions can the agent use? Where are human approvals? Are actions logged?'],
  ['RAG frameworks', 'Connect models to your documents and data', 'LangChain, LlamaIndex, Haystack, DSPy, RAGFlow, GraphRAG, Unstructured, EmbedChain', 'Does retrieval respect the user\'s own access rights? Could poisoned or injected documents change answers?'],
  ['Embedding models', 'Turn text into vectors for search', 'OpenAI, Cohere, Voyage AI, Sentence Transformers, BGE, Google Vertex AI and Azure OpenAI embeddings', 'Is sensitive data sent to an external embedding API? Can embeddings be reversed to reveal content?'],
  ['MCP (Model Context Protocol)', 'A standard way for AI apps to connect to tools and data', 'MCP SDK, FastMCP, MCP Registry; servers for GitHub, Slack, PostgreSQL, Google Drive and file systems', 'Which MCP servers are approved? What scopes do their tokens have? Are third-party servers reviewed before use?'],
  ['AI security and guardrails', 'Filter inputs and outputs, detect attacks and protect data', 'NVIDIA NeMo Guardrails, Guardrails AI, Microsoft Presidio, Lakera Guard, Prompt Security, Protect AI, Azure AI Content Safety, AWS Bedrock Guardrails', 'Which risks does each guardrail cover? How is it tested and tuned? What happens when it fails?'],
  ['Observability and evaluation', 'Trace, evaluate and debug AI behaviour', 'LangSmith, Langfuse, Arize Phoenix, Weights and Biases Weave, TruLens, Ragas, Promptfoo, Helicone', 'Do traces capture personal data, and how long are they kept? Are evaluations repeated with pass thresholds?'],
  ['Memory', 'Store conversation and long-term context for agents', 'Mem0, Zep, Letta, LangGraph Memory, Redis, PostgreSQL, Neo4j, Chroma', 'What personal data is remembered, for how long, and can users delete it? Is memory separated between users?'],
  ['AI agent platforms', 'Managed services and SDKs to build and run agents', 'OpenAI Agents SDK, LangChain Agents, PydanticAI, Semantic Kernel, Google ADK, AWS Bedrock Agents, Azure AI Foundry Agent Service', 'Does the platform give each agent its own identity? Are logs and data residency acceptable?'],
  ['Automation', 'Connect AI to business workflows', 'n8n, Zapier, Make, Microsoft Power Automate, Temporal, Apache Airflow, Prefect, Kestra, Pipedream', 'Who can build automations? Are connector credentials stored safely? Is there change control on production flows?'],
  ['Vector databases', 'Store and search embeddings', 'Pinecone, Weaviate, Qdrant, Milvus, Chroma, pgvector, Elasticsearch, Redis, MongoDB Atlas Vector Search', 'Is the store encrypted and access-controlled? Are deletions propagated so erased data is removed from the index?'],
];

export default function AiEcosystemMap() {
  return (
    <details className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="ai-ecosystem-map">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">The modern AI tool ecosystem by layer, and what GRC should ask at each</summary>
      <div className="mt-3">
        <p className={P}>AI systems are assembled from many layers of tools. Each layer brings its own data flows, vendors and risks, so an AI inventory and vendor review should cover every layer, not just the model.</p>
        <SortableGrid label="AI tool ecosystem by layer" headers={['Layer', 'What it does', 'Example tools', 'GRC and security questions']} rows={LAYERS} file="ai-tool-ecosystem" min={1100} />
        <h3 className="mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white">MCP vs API</h3>
        <p className={P}>An API is a standard interface any client can call: the client sends a request to an endpoint, the server processes it and returns a response, regardless of programming language. MCP (Model Context Protocol) is a standard built for AI: an MCP host (the app using the model) contains MCP clients that connect to MCP servers, and each server exposes tools, data and prompts in one consistent format. MCP usually sits on top of APIs; it replaces one-off integrations between each AI app and each system.</p>
        <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label="MCP vs API">
          <table className="w-full text-sm" style={{ minWidth: 760 }}>
            <thead><tr>{['', 'API', 'MCP'].map((h) => <th key={h} scope="col" className="p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">{h}</th>)}</tr></thead>
            <tbody>{[
              ['Built for', 'Any software talking to any other software', 'AI models and agents discovering and using tools and data'],
              ['Parts', 'Client, endpoint, server', 'Host (the AI app), client inside the host, servers exposing capabilities'],
              ['Discovery', 'Developer reads docs and codes each call', 'The model is told at runtime which tools exist and how to call them'],
              ['Integration effort', 'One integration per system per app', 'One MCP server per system, reusable by any MCP-capable app'],
              ['Who decides the call', 'Code written by a developer', 'The model chooses tools and arguments, so behaviour is less predictable'],
              ['Main security concern', 'Authentication, authorisation, rate limits, input validation', 'All API concerns plus prompt injection through tool output, over-scoped tokens, unreviewed third-party servers and tools that change after approval'],
              ['Key controls', 'API gateway, OAuth scopes, schema validation, logging', 'Approved server registry, version pinning, least-privilege tokens per server, human approval for sensitive tools, logging of every tool call'],
            ].map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`p-2 align-top border-t border-gray-100 dark:border-gray-700 ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Tool names are examples of what is commonly used, not endorsements. The market changes quickly; check each vendor&apos;s current terms and security documentation.</p>
      </div>
    </details>
  );
}
