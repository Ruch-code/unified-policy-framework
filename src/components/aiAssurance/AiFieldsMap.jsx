// How AI, machine learning, neural networks and deep learning nest inside each other.
const RINGS = [
  ['Artificial intelligence', 'Any technique that lets machines perform tasks that need human-like intelligence.', 'Expert systems, knowledge representation, planning and scheduling, search, speech recognition, computer vision, natural language processing, robotics', 'border-violet-400 bg-violet-50 dark:bg-violet-900/20'],
  ['Machine learning', 'Systems that learn patterns from data instead of following hand-written rules.', 'Linear and logistic regression, decision trees, random forest, support vector machines, k-nearest neighbours, k-means clustering, PCA, naive Bayes, reinforcement learning, anomaly detection', 'border-sky-400 bg-sky-50 dark:bg-sky-900/20'],
  ['Neural networks', 'Machine learning models made of layers of connected nodes.', 'Multilayer perceptrons, self-organising maps, Hopfield networks, Boltzmann machines, autoencoders', 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'],
  ['Deep learning', 'Neural networks with many layers that learn features from raw data.', 'Convolutional networks (images), recurrent networks and LSTMs (sequences), GANs, transformers such as BERT and GPT (today\'s large language models), deep reinforcement learning', 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'],
];

export default function AiFieldsMap() {
  return (
    <details id="ai-fields-map" className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">AI, machine learning, neural networks and deep learning: how they fit together</summary>
      <div className="mt-3 space-y-0">
        {RINGS.map(([t, d, ex, tone], i) => (
          <div key={t} className={`rounded-xl border-2 p-3 ${tone}`} style={{ marginLeft: i * 16, marginRight: i * 16, marginTop: i ? -4 : 0 }}>
            <p className="font-bold text-gray-900 dark:text-white">{t}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{d}</p>
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400"><strong>Examples:</strong> {ex}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">Why it matters for governance: risk controls depend on the technique. Rule-based systems are explainable by design; deep learning and generative models need more testing, monitoring and transparency measures.</p>
    </details>
  );
}
