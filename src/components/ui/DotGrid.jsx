/**
 * DotGrid — subtle dot pattern overlay with a radial mask fade.
 * Dark mode only. pointer-events-none.
 */
export default function DotGrid({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-0 hidden dark:block ${className}`}
      aria-hidden
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
      }}
    />
  );
}
