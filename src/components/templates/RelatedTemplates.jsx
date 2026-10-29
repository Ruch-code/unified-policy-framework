import { Link } from 'react-router-dom';
import { FileDown } from 'lucide-react';
import { findTemplates } from '../../utils/templateMatch.js';
import TemplateDownloadButton from './TemplateDownloadButton.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

/**
 * Shows ready-to-use templates that match the given guidance text (control refs and keywords),
 * each with a direct download. Renders nothing when there is no match or the user is signed out.
 */
export default function RelatedTemplates({ text, framework, limit = 3, className = '' }) {
  const { user } = useAuth() || {};
  if (!user) return null;
  const items = findTemplates(text, { limit, framework });
  if (!items.length) return null;
  return (
    <div className={`rounded-lg border border-violet-200 bg-violet-50/60 dark:border-violet-800 dark:bg-violet-900/20 p-2.5 ${className}`} onClick={e => e.stopPropagation()}>
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300 mb-1.5">
        <FileDown className="w-3.5 h-3.5" aria-hidden="true" /> Ready-to-use template{items.length > 1 ? 's' : ''}
      </p>
      <ul className="space-y-1.5">
        {items.map(t => (
          <li key={t.slug} className="flex flex-wrap items-center gap-2">
            <TemplateDownloadButton template={t} compact />
            <Link to={`/templates/${t.slug}`} className="text-xs font-semibold text-violet-800 dark:text-violet-200 hover:underline break-words">{t.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
