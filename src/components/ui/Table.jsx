/**
 * Table — renders a real table at md+ and optional cards below md.
 * Pass `renderCard(row)` to control the mobile card layout.
 */
export default function Table({ columns, data, renderRow, renderCard, empty }) {
  if (!data || data.length === 0) {
    return empty || <p className="py-8 text-center text-muted">No records found.</p>;
  }
  return (
    <>
      {/* Desktop: table at md and above */}
      <div className="hidden overflow-x-auto rounded-card border border-cream-border dark:border-ink-border md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-border/40 dark:bg-ink-border/40">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="whitespace-nowrap px-4 py-3 font-semibold text-textBase dark:text-white">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-border dark:divide-ink-border">
            {data.map((row) => renderRow(row))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards below md */}
      {renderCard && (
        <div className="space-y-3 md:hidden">
          {data.map((row) => renderCard(row))}
        </div>
      )}
    </>
  );
}
