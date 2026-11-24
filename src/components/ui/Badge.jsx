export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-cream-border/60 text-textBase dark:bg-ink-border dark:text-white',
    brand: 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300',
    success: 'bg-success/15 text-success',
    danger: 'bg-danger/15 text-danger',
    warning: 'bg-amber-400/20 text-amber-600 dark:text-amber-400',
    maroon: 'bg-maroon/10 text-maroon dark:text-maroon.gold',
    gold: 'bg-maroon.gold/20 text-maroon',
    live: 'bg-danger/15 text-danger',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
