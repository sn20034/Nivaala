import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'Nothing here yet', message, icon: Icon = Inbox, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-cream-border p-10 text-center dark:border-ink-border">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cream-border/50 dark:bg-ink-border">
        <Icon size={24} className="text-muted" />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      {message && <p className="mt-1 max-w-sm text-sm text-muted">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
