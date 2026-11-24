import { CreditCard, Wallet, FileText, Check, ArrowUp, ArrowDown } from 'lucide-react';
import { StatCard } from '@/components/cards';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useFetch } from '@/hooks/useFetch';
import { studentService } from '@/services/studentService';
import { planService } from '@/services/planService';
import { formatCurrency, formatDate } from '@/utils/dateHelpers';
import { ROUTES } from '@/routes/routePaths';

const INVOICES = [
  { id: 'inv-1', date: '2026-11-15', amount: 3900, status: 'PAID' },
  { id: 'inv-2', date: '2026-11-01', amount: 3900, status: 'PAID' },
  { id: 'inv-3', date: '2026-10-15', amount: 3900, status: 'PAID' },
];

export default function MyPlan() {
  const { data: plan } = useFetch(() => studentService.getPlan(), [], null);
  const { data: plans } = useFetch(() => planService.getPlans(), [], []);
  const alternatives = (plans || []).filter((p) => p.id !== plan?.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tightest">My Plan</h1>
        <p className="text-muted">Your subscription, credits, and invoices.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={CreditCard} number={plan?.name || '—'} label="Current plan" />
        <StatCard icon={Wallet} number={plan?.credits || 0} label="Meal credits" />
        <StatCard icon={FileText} number={plan ? formatDate(plan.renewalDate) : '—'} label="Renewal date" />
      </div>

      {/* Current plan detail */}
      <div className="rounded-card border border-brand-300 bg-gradient-to-b from-brand-50 to-cream-surface p-6 dark:border-brand-500/30 dark:from-ink-surface">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{plan?.name}</h2>
            <p className="text-sm text-muted">{plan?.mealsCount} meals · {plan?.billingCycle === 'ONE_TIME' ? 'One time' : `${plan?.billingCycle?.toLowerCase()} billing`}</p>
          </div>
          <p className="text-2xl font-extrabold">{formatCurrency(plan?.price || 0)}</p>
        </div>
        <ul className="mt-4 space-y-2">
          {plan?.features?.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <Check size={16} className="mt-0.5 shrink-0 text-success" /> {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Credits wallet */}
      <div className="card-surface p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success/15 text-success">
              <Wallet size={22} />
            </div>
            <div>
              <p className="font-semibold">Meal credits wallet</p>
              <p className="text-sm text-muted">Credits carry forward when you skip on time.</p>
            </div>
          </div>
          <p className="text-2xl font-extrabold">{plan?.credits || 0}</p>
        </div>
      </div>

      {/* Upgrade/downgrade */}
      <div className="card-surface p-6">
        <h3 className="mb-4 font-bold">Switch plan</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {alternatives.map((alt) => (
            <div key={alt.id} className="rounded-2xl border border-cream-border p-4 dark:border-ink-border">
              <p className="font-semibold">{alt.name}</p>
              <p className="text-sm text-muted">{formatCurrency(alt.price)} · {alt.mealsCount} meals</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <ArrowUp size={14} /> Upgrade
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="card-surface p-6">
        <h3 className="mb-4 font-bold">Invoices</h3>
        <div className="space-y-3">
          {INVOICES.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between rounded-2xl border border-cream-border p-4 dark:border-ink-border">
              <div>
                <p className="font-semibold">{inv.id.toUpperCase()}</p>
                <p className="text-sm text-muted">{formatDate(inv.date)} · {formatCurrency(inv.amount)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success">{inv.status}</Badge>
                <Button size="sm" variant="ghost">Download</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
