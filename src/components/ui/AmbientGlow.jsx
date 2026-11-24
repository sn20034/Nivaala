/**
 * AmbientGlow — two large blurred orange/red radial gradients behind content.
 * Dark mode only. pointer-events-none, positioned absolutely.
 */
export default function AmbientGlow({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-0 hidden overflow-hidden dark:block ${className}`} aria-hidden>
      <div
        className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FF8A0A 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F04A23 0%, transparent 70%)' }}
      />
    </div>
  );
}
