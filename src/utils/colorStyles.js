export function getColorStyles(color) {
  const colors = {
    '#ef4444': { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-500', trigger: 'bg-red-500', title: 'text-red-700', box: 'border-red-200 dark:border-red-800' },
    '#7c3aed': { bg: 'bg-violet-50', icon: 'text-violet-600', dot: 'bg-violet-500', trigger: 'bg-violet-500', title: 'text-violet-700', box: 'border-violet-200 dark:border-violet-800' },
    '#84cc16': { bg: 'bg-lime-50', icon: 'text-lime-600', dot: 'bg-lime-500', trigger: 'bg-lime-500', title: 'text-lime-700', box: 'border-lime-200 dark:border-lime-800' },
    '#dc2626': { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-500', trigger: 'bg-red-500', title: 'text-red-700', box: 'border-red-200 dark:border-red-800' },
    '#059669': { bg: 'bg-emerald-50', icon: 'text-emerald-600', dot: 'bg-emerald-500', trigger: 'bg-emerald-500', title: 'text-emerald-700', box: 'border-emerald-200 dark:border-emerald-800' },
    '#f59e0b': { bg: 'bg-amber-50', icon: 'text-amber-600', dot: 'bg-amber-500', trigger: 'bg-amber-500', title: 'text-amber-700', box: 'border-amber-200 dark:border-amber-800' },
    '#10b981': { bg: 'bg-emerald-50', icon: 'text-emerald-600', dot: 'bg-emerald-500', trigger: 'bg-emerald-500', title: 'text-emerald-700', box: 'border-emerald-200 dark:border-emerald-800' },
    '#4f46e5': { bg: 'bg-indigo-50', icon: 'text-indigo-600', dot: 'bg-indigo-500', trigger: 'bg-indigo-500', title: 'text-indigo-700', box: 'border-indigo-200 dark:border-indigo-800' },
    '#8b5cf6': { bg: 'bg-violet-50', icon: 'text-violet-600', dot: 'bg-violet-500', trigger: 'bg-violet-500', title: 'text-violet-700', box: 'border-violet-200 dark:border-violet-800' },
    '#84cc16': { bg: 'bg-lime-50', icon: 'text-lime-600', dot: 'bg-lime-500', trigger: 'bg-lime-500', title: 'text-lime-700', box: 'border-lime-200 dark:border-lime-800' },
    '#dc2626': { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-500', trigger: 'bg-red-500', title: 'text-red-700', box: 'border-red-200 dark:border-red-800' },
    '#059669': { bg: 'bg-emerald-50', icon: 'text-emerald-600', dot: 'bg-emerald-500', trigger: 'bg-emerald-500', title: 'text-emerald-700', box: 'border-emerald-200 dark:border-emerald-800' },
    '#f59e0b': { bg: 'bg-amber-50', icon: 'text-amber-600', dot: 'bg-amber-500', trigger: 'bg-amber-500', title: 'text-amber-700', box: 'border-amber-200 dark:border-amber-800' },
  };
  return colors[color] || colors['#4f46e5'];
}