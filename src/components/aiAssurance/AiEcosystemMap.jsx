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
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Tool names are examples of what is commonly used, not endorsements. The market changes quickly; check each vendor&apos;s current terms and security documentation.</p>
      </div>
    </details>
  );
}
