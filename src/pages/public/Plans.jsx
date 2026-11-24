import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { PlanCard } from '@/components/cards';
import { CardSkeleton } from '@/components/ui/Skeleton';
import SmartImage from '@/components/ui/SmartImage';
import { useFetch } from '@/hooks/useFetch';
import { planService } from '@/services/planService';
import { formatCurrency } from '@/utils/dateHelpers';
import { ROUTES } from '@/routes/routePaths';
import { images } from '@/data/images';

const COMPARISON_COLS = ['Feature', 'Mess + Zomato', 'Local Tiffin', 'Nivaala'];
const COMPARISON_ROWS = [
  { feature: 'Home-style taste', mess: false, tiffin: true, nivaala: true },
  { feature: 'Your name on the box', mess: false, tiffin: false, nivaala: true },
  { feature: 'Filmed kitchen', mess: false, tiffin: false, nivaala: true },
  { feature: 'Skip & get credit', mess: false, tiffin: false, nivaala: true },
  { feature: 'Parents can watch', mess: false, tiffin: false, nivaala: true },
  { feature: 'One fair price', mess: false, tiffin: true, nivaala: true },
  { feature: 'Pure veg always', mess: false, tiffin: true, nivaala: true },
];

export default function Plans() {
  const [billing, setBilling] = useState('MONTHLY');
  const { data: plans, loading } = useFetch(() => planService.getPlans(), [], []);

  const filtered = (plans || []).filter((p) => p.billingCycle === billing || p.billingCycle === 'ONE_TIME');

  const handleSelect = (plan) => {
    window.location.href = `${ROUTES.ORDER}?plan=${plan.id}`;
  };

  return (
    <div className="bg-cream dark:bg-ink">
      <section className="bg-gradient-to-br from-brand-500 to-[#F04A23] px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow text-white/80">Plans & pricing</span>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tightest sm:text-5xl">
            Ek plan, / <span className="text-white/80">har meal safe.</span>
          </h1>
          <p className="mt-3 max-w-md text-white/85">
            Pause anytime. Skip with credit. No lock-in. Just ghar jaisa khana.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Billing toggle */}
        <div className="mb-10 flex justify-center">
          <div className="flex gap-1 rounded-full border border-cream-border bg-cream-surface p-1 dark:border-ink-border dark:bg-ink-surface">
            {['MONTHLY', 'WEEKLY'].map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-all ${
                  billing === b ? 'bg-gradient-to-br from-brand-500 to-[#F04A23] text-white shadow-glow' : 'text-muted'
                }`}
              >
                {b.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                {plan.id === 'plan-trial' ? (
                  <div className="overflow-hidden rounded-card border border-brand-400 bg-gradient-to-b from-brand-50 to-cream-surface shadow-glow dark:border-brand-500/30 dark:from-ink-surface dark:to-ink-surface">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <SmartImage
                        src={images.categories.trialPack.src}
                        alt={images.categories.trialPack.alt}
                        aspect="16/9"
                        focal={images.categories.trialPack.focal}
                        overlay
                        className="h-full w-full"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-gradient-to-br from-brand-500 to-[#F04A23] px-3 py-1 text-xs font-bold text-white shadow-glow">
                        Trial Pack
                      </span>
                    </div>
                    <PlanCard plan={plan} onSelect={handleSelect} />
                  </div>
                ) : (
                  <PlanCard plan={plan} onSelect={handleSelect} />
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Add-ons */}
        <div className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-extrabold tracking-tightest">Add-ons</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Extra Roti (2 pcs)', price: 15 },
              { name: 'Sweet Dish', price: 40 },
              { name: 'Curd (150g)', price: 25 },
              { name: 'Festival Special', price: 60 },
            ].map((addon) => (
              <div key={addon.name} className="card-surface flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold">{addon.name}</p>
                  <p className="text-sm text-muted">{formatCurrency(addon.price)}</p>
                </div>
                <Button size="sm" variant="outline">Add</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-extrabold tracking-tightest">Nivaala vs the rest</h2>
          <div className="overflow-x-auto rounded-card border border-cream-border dark:border-ink-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream-border/40 dark:bg-ink-border/40">
                <tr>
                  {COMPARISON_COLS.map((col) => (
                    <th key={col} className="px-5 py-4 font-bold">
                      {col === 'Nivaala' ? <span className="gradient-text">{col}</span> : col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-border dark:divide-ink-border">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-5 py-3 font-medium">{row.feature}</td>
                    <td className="px-5 py-3">{row.mess ? <Check size={16} className="text-success" /> : <X size={16} className="text-danger" />}</td>
                    <td className="px-5 py-3">{row.tiffin ? <Check size={16} className="text-success" /> : <X size={16} className="text-danger" />}</td>
                    <td className="px-5 py-3">{row.nivaala ? <Check size={16} className="text-success" /> : <X size={16} className="text-danger" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
