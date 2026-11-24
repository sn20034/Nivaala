import { Check, Star } from 'lucide-react';
import { formatCurrency } from '@/utils/dateHelpers';

export default function PlanCard({ plan, onSelect, billingCycle = 'MONTHLY' }) {
  const popular = plan.isPopular;
  return (
    <div
      className={`relative flex h-full flex-col rounded-card border p-6 text-textBase dark:text-white transition-all duration-300 hover:-translate-y-1 ${
        popular
          ? 'border-brand-400 bg-gradient-to-b from-brand-50 to-cream-surface shadow-glow dark:from-ink-surface dark:to-ink-surface'
          : 'border-cream-border bg-cream-surface hover:shadow-card dark:border-ink-border dark:bg-ink-surface dark:hover:shadow-card-dark'
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-brand-500 to-[#F04A23] px-4 py-1 text-xs font-bold text-white shadow-glow">
            <Star size={12} /> Most Popular
          </span>
        </div>
      )}

      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted">{plan.billingCycle === 'ONE_TIME' ? 'One time' : `Billed ${plan.billingCycle.toLowerCase()}`}</p>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold tracking-tightest">{formatCurrency(plan.price)}</span>
        <span className="text-sm text-muted">/ {plan.mealsCount} meals</span>
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2 text-sm">
            <Check size={18} className="mt-0.5 shrink-0 text-success" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect?.(plan)}
        className={`mt-6 w-full ${popular ? 'btn-primary' : 'btn-outline'}`}
      >
        {plan.billingCycle === 'ONE_TIME' ? 'Order trial →' : 'Join now →'}
      </button>
    </div>
  );
}
