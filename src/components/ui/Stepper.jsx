import { Check } from 'lucide-react';

export default function Stepper({ steps, current, className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  done
                    ? 'bg-success text-white'
                    : active
                    ? 'bg-gradient-to-br from-brand-500 to-[#F04A23] text-white shadow-glow'
                    : 'bg-cream-border text-muted dark:bg-ink-border'
                }`}
              >
                {done ? <Check size={16} /> : i + 1}
              </div>
              <span className={`hidden text-xs font-medium sm:block ${active ? 'text-textBase dark:text-white' : 'text-muted'}`}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 rounded-full ${done ? 'bg-success' : 'bg-cream-border dark:bg-ink-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
