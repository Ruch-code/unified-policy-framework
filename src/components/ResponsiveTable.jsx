import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Download, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { exportToCSV } from '../utils/exportCSV.jsx';

function ResponsiveTable({
  data = [],
  columns = [],
  caption = '',
  filename = 'export.csv',
  exportLabel = 'Export Excel',
  isDark = false,
  className = '',
  enableSort = true,
  defaultSortKey = null,
  defaultSortDir = 'asc',
  onSortChange,
  keyExtractor = (row, index) => row.id || index,
  emptyMessage = 'No data available',
  stickyHeader = true
}) {
  const [sortConfig, setSortConfig] = useState({
    key: defaultSortKey,
    direction: defaultSortDir
  });
  const [focusedCell, setFocusedCell] = useState({ rowIndex: -1, colIndex: -1 });
  const tableRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  useEffect(() => {
    const handleResize = () => {
      // Force re-render on breakpoint change
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !enableSort) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      const dir = sortConfig.direction === 'asc' ? 1 : -1;
      return aStr.localeCompare(bStr) * dir;
    });
  }, [data, sortConfig, enableSort]);

  const handleSort = (key) => {
    if (!enableSort) return;
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    onSortChange?.(key, prev => prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc');
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    const rowCount = sortedData.length;
    const colCount = columns.length;
    let newRow = rowIndex;
    let newCol = colIndex;
    let handled = false;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newCol = Math.min(colIndex + 1, colCount - 1);
        handled = true;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newCol = Math.max(colIndex - 1, 0);
        handled = true;
        break;
      case 'ArrowDown':
        e.preventDefault();
        newRow = Math.min(rowIndex + 1, rowCount - 1);
        handled = true;
        break;
      case 'ArrowUp':
        e.preventDefault();
        newRow = Math.max(rowIndex - 1, 0);
        handled = true;
        break;
      case 'Home':
        e.preventDefault();
        newCol = 0;
        handled = true;
        break;
      case 'End':
        e.preventDefault();
        newCol = colCount - 1;
        handled = true;
        break;
      case 'Enter':
      case ' ':
        if (enableSort && columns[colIndex]?.sortable !== false) {
          e.preventDefault();
          handleSort(columns[colIndex].key);
        }
        handled = true;
        break;
      case 'Escape':
        if (focusedCell.rowIndex >= 0) {
          e.preventDefault();
          setFocusedCell({ rowIndex: -1, colIndex: -1 });
          tableRef.current?.focus();
        }
        handled = true;
        break;
    }

    if (handled) {
      setFocusedCell({ rowIndex: newRow, colIndex: newCol });
    }
  };

  const handleExport = () => {
    exportToCSV(sortedData, columns, filename);
  };

  const headerClassBase = `
    px-4 py-3 text-left text-xs font-bold uppercase tracking-wider
    ${isDark ? 'text-navy-600 dark:text-text-dark-muted' : 'text-navy-600 dark:text-text-dark-muted'}
  `;

  const cellClassBase = `
    px-4 py-3 text-sm
    ${isDark ? 'text-navy-600 dark:text-text-dark-secondary' : 'text-navy-600 dark:text-text-dark-secondary'}
  `;

  if (isMobile) {
    return (
      <div className={`overflow-hidden rounded-2xl border ${className} ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
        {caption && (
          <div className={`px-4 py-3 border-b ${isDark ? 'border-surface-dark-300 bg-surface-dark-200' : 'border-surface-300 bg-surface-200'}`}>
            <h3 className="text-sm font-semibold text-navy-900 dark:text-text-dark-primary">{caption}</h3>
          </div>
        )}
        
        <div className="p-3 flex justify-end border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors
              bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600
              text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            aria-label={`${exportLabel} (.xlsx)`}
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            {exportLabel}
          </button>
        </div>

        {sortedData.length === 0 ? (
          <div className="p-8 text-center">
            <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{emptyMessage}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700" role="list" aria-label={caption || 'Data table'}>
            {sortedData.map((row, rowIndex) => (
              <article
                key={keyExtractor(row, rowIndex)}
                className="p-4"
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, 0)}
              >
                {columns.map((col, colIndex) => (
                  <div
                    key={col.key}
                    className="flex items-start gap-3 py-2"
                    role="listitem"
                  >
                    <dt className={`font-medium text-xs text-slate-500 dark:text-slate-400 shrink-0 min-w-[120px] ${col.align === 'right' ? 'text-right' : ''}`}>
                      {col.header}
                    </dt>
                    <dd className={`flex-1 min-w-0 text-slate-700 dark:text-slate-200 ${col.align === 'right' ? 'text-right' : ''}`}>
                      {typeof col.render === 'function' 
                        ? col.render(row[col.key], row) 
                        : row[col.key] ?? '-'}
                    </dd>
                  </div>
                ))}
              </article>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto rounded-2xl border ${className} ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`} ref={tableRef} tabIndex={0}>
      {caption && (
        <div className={`px-4 py-3 border-b ${isDark ? 'border-surface-dark-300 bg-surface-dark-200' : 'border-surface-300 bg-surface-200'}`}>
          <h3 className="text-sm font-semibold text-navy-900 dark:text-text-dark-primary">{caption}</h3>
        </div>
      )}
      
      <div className="p-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {sortedData.length} row{sortedData.length !== 1 ? 's' : ''}
        </span>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors
            bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600
            text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          aria-label={`${exportLabel} (.xlsx)`}
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          {exportLabel}
        </button>
      </div>

      {sortedData.length === 0 ? (
        <div className="p-8 text-center">
          <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{emptyMessage}</p>
        </div>
      ) : (
        <table className="w-full min-w-[600px]" role="grid" aria-label={caption || 'Data table'}>
          <thead className={`${isDark ? 'border-surface-dark-300 bg-surface-dark-200' : 'border-surface-300 bg-surface-200'} ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
            <tr role="row">
              {columns.map((col, colIndex) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`${headerClassBase} ${col.align === 'right' ? 'text-right' : ''} ${col.width ? `w-[${col.width}]` : ''}`}
                  style={{ minWidth: col.minWidth }}
                  tabIndex={enableSort && col.sortable !== false ? 0 : -1}
                  onClick={() => handleSort(col.key)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && enableSort && col.sortable !== false) {
                      e.preventDefault();
                      handleSort(col.key);
                    }
                  }}
                  aria-sort={sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  aria-label={`${col.header}${enableSort && col.sortable !== false ? ', press Enter to sort' : ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {enableSort && col.sortable !== false && sortConfig.key === col.key && (
                      <span aria-hidden="true" className="flex-shrink-0">
                        {sortConfig.direction === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-surface-dark-300' : 'divide-surface-300'}`}>
            {sortedData.map((row, rowIndex) => (
              <tr
                key={keyExtractor(row, rowIndex)}
                role="row"
                className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${focusedCell.rowIndex === rowIndex ? 'ring-2 ring-indigo-500/50' : ''}`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={col.key}
                    role="gridcell"
                    className={`${cellClassBase} ${col.align === 'right' ? 'text-right' : ''}`}
                    tabIndex={0}
                    onFocus={() => setFocusedCell({ rowIndex, colIndex })}
                    onBlur={() => setFocusedCell(fc => fc.rowIndex === rowIndex && fc.colIndex === colIndex ? { rowIndex: -1, colIndex: -1 } : fc)}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                  >
                    {typeof col.render === 'function' 
                      ? col.render(row[col.key], row) 
                      : row[col.key] ?? '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {focusedCell.rowIndex >= 0 && 
         `Row ${focusedCell.rowIndex + 1}, Column ${columns[focusedCell.colIndex]?.header}`}
      </div>
    </div>
  );
}

export default ResponsiveTable;