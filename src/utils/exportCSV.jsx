/**
 * CSV Export Utility
 * Converts array of objects to CSV string with proper escaping
 * Supports all columns (not just visible) for audit completeness
 */

export function escapeCSVValue(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export function generateCSV(data, columns) {
  if (!data || !data.length) return '';
  
  const headers = columns.map(col => escapeCSVValue(col.header));
  const rows = data.map(row => 
    columns.map(col => {
      const value = row[col.key];
      if (typeof col.format === 'function') {
        return escapeCSVValue(col.format(value, row));
      }
      return escapeCSVValue(value);
    }).join(',')
  );
  
  return [headers.join(','), ...rows].join('\n');
}

export function downloadCSV(csvContent, filename) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToCSV(data, columns, filename = 'export.csv') {
  const csv = generateCSV(data, columns);
  downloadCSV(csv, filename);
}

export function createExportButton({
  data,
  columns,
  filename = 'export.csv',
  label = 'Export CSV',
  className = '',
  onExport
}) {
  const handleClick = () => {
    exportToCSV(data, columns, filename);
    onExport?.();
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors
        bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600
        text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${className}`}
      aria-label={`Export ${label} as CSV`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {label}
    </button>
  );
}

export default {
  escapeCSVValue,
  generateCSV,
  downloadCSV,
  exportToCSV,
  createExportButton
};