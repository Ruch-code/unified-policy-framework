// One-line "GRC angle" that maps a topic to ISO 27001:2022 Annex A and SOC 2 criteria.
export default function GrcAngle({ children }) {
  return (
    <p className="mt-2 rounded-lg border-l-4 border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 break-words">
      <strong>GRC angle:</strong> {children}
    </p>
  );
}
