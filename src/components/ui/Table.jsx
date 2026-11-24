export default function Table({ columns, data, renderRow, empty }) {
  if (!data || data.length === 0) {
    return empty || <p className="py-8 text-center text-muted">No records found.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-card border border-cream-border dark:border-ink-border">
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
  );
}
