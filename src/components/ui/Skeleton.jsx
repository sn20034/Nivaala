export function Skeleton({ className = '', rounded = 'rounded-xl' }) {
  return <div className={`animate-pulse bg-cream-border/60 dark:bg-ink-border ${rounded} ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="card-surface p-4">
      <Skeleton className="h-40 w-full rounded-card" />
      <Skeleton className="mt-4 h-5 w-3/4" />
      <Skeleton className="mt-2 h-4 w-full" />
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}

export default Skeleton;
