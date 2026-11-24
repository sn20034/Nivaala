import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input, Select, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Stepper from '@/components/ui/Stepper';
import { useAuth } from '@/context/AuthContext';
import { useFetch } from '@/hooks/useFetch';
import { planService } from '@/services/planService';
import { orderService } from '@/services/orderService';
import { formatCurrency, formatDate, todayISO, addDaysISO } from '@/utils/dateHelpers';
import { MEAL_LABELS, PAYMENT_METHODS } from '@/utils/constants';
import { ROUTES as R } from '@/routes/routePaths';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

const STEPS = ['Plan & meals', 'Delivery', 'Your box', 'Payment', 'Done'];

export default function OrderStepper() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(null);

  const { data: plans, loading } = useFetch(() => planService.getPlans(), [], []);
  const presetPlanId = searchParams.get('plan');

  const [selection, setSelection] = useState({
    planId: presetPlanId || '',
    meals: ['LUNCH'],
    startDate: addDaysISO(todayISO(), 1),
    hostelName: '', room: '', address: '',
    boxName: '', note: '', paymentMethod: 'UPI',
  });

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate(`${R.LOGIN}?redirect=${encodeURIComponent(`/order?plan=${presetPlanId || ''}`)}`);
    return null;
  }

  const selectedPlan = plans?.find((p) => p.id === selection.planId);

  const update = (patch) => setSelection((s) => ({ ...s, ...patch }));

  const toggleMeal = (meal) => {
    setSelection((s) => ({
      ...s,
      meals: s.meals.includes(meal)
        ? s.meals.filter((m) => m !== meal)
        : [...s.meals, meal],
    }));
  };

  const canNext = () => {
    if (step === 0) return selection.planId && selection.meals.length > 0;
    if (step === 1) return selection.hostelName && selection.address;
    if (step === 2) return selection.boxName;
    if (step === 3) return selection.paymentMethod;
    return true;
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const order = await orderService.createOrder(selection);
      setCompleted(order);
      setStep(4);
      toast.success('Order placed! Your first meal is on its way.');
    } catch (err) {
      toast.error('Could not place order. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-muted">Loading plans…</div>;

  return (
    <div className="mx-auto max-w-2xl">
      <Stepper steps={STEPS} current={step} className="mb-8" />

      {step === 0 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold">Choose your plan</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {plans?.map((plan) => (
              <button
                key={plan.id}
                onClick={() => update({ planId: plan.id })}
                className={`card-surface p-4 text-left transition-all ${selection.planId === plan.id ? 'border-brand-400 ring-2 ring-brand-400/30' : ''}`}
              >
                <p className="font-bold">{plan.name}</p>
                <p className="text-sm text-muted">{formatCurrency(plan.price)} · {plan.mealsCount} meals</p>
              </button>
            ))}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">Which meals?</p>
            <div className="flex gap-2">
              {Object.entries(MEAL_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => toggleMeal(key)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    selection.meals.includes(key)
                      ? 'bg-gradient-to-br from-brand-500 to-[#F04A23] text-white shadow-glow'
                      : 'border border-cream-border text-muted dark:border-ink-border'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Delivery details</h2>
          <Input label="Hostel / PG name" value={selection.hostelName} onChange={(e) => update({ hostelName: e.target.value })} placeholder="Sunrise Hostel" />
          <Input label="Room number" value={selection.room} onChange={(e) => update({ room: e.target.value })} placeholder="Room 204" />
          <Input label="Full address" value={selection.address} onChange={(e) => update({ address: e.target.value })} placeholder="Baner Road, Pune" />
          <Input label="Start date" type="date" value={selection.startDate} onChange={(e) => update({ startDate: e.target.value })} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Your box</h2>
          <p className="text-sm text-muted">This name goes on every meal box. Make it yours.</p>
          <Input label="Name on the box" value={selection.boxName} onChange={(e) => update({ boxName: e.target.value })} placeholder="Aarav" />
          <Textarea label="Note for the kitchen (optional)" value={selection.note} onChange={(e) => update({ note: e.target.value })} placeholder="Thoda extra ghee daal diya..." />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Payment</h2>
          <div className="space-y-2">
            {Object.entries(PAYMENT_METHODS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => update({ paymentMethod: key })}
                className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                  selection.paymentMethod === key ? 'border-brand-400 ring-2 ring-brand-400/30' : 'border-cream-border dark:border-ink-border'
                }`}
              >
                <span className="font-medium">{label}</span>
                {selection.paymentMethod === key && <Check size={18} className="text-brand-500" />}
              </button>
            ))}
          </div>
          <div className="card-surface p-4">
            <p className="text-sm text-muted">Order total</p>
            <p className="text-2xl font-extrabold">{formatCurrency(selectedPlan?.price || 0)}</p>
          </div>
        </div>
      )}

      {step === 4 && completed && (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
            <Check size={32} />
          </div>
          <h2 className="text-2xl font-extrabold">Order confirmed!</h2>
          <p className="mt-2 text-muted">Your box for <b>{completed.boxName}</b> is being prepared.</p>
          <div className="mx-auto mt-6 max-w-sm card-surface p-5 text-left text-sm">
            <Row label="Plan" value={selectedPlan?.name} />
            <Row label="Meals" value={completed.mealTypes.map((m) => MEAL_LABELS[m]).join(' + ')} />
            <Row label="Start date" value={formatDate(completed.startDate)} />
            <Row label="Delivery" value={`${completed.hostelName}, ${completed.room}`} />
            <Row label="Payment" value={PAYMENT_METHODS[completed.paymentMethod]} />
            <Row label="Total" value={formatCurrency(completed.total)} bold />
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" to={R.STUDENT.DASHBOARD}>Go to dashboard</Button>
            <Button to={R.MENU}>See menu →</Button>
          </div>
        </div>
      )}

      {step < 4 && (
        <div className="mt-8 flex justify-between">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            <ArrowLeft size={16} /> Back
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
              Continue <ArrowRight size={16} />
            </Button>
          ) : (
            <Button onClick={submit} loading={submitting} disabled={!canNext()}>
              Place order <ArrowRight size={16} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-muted">{label}</span>
      <span className={bold ? 'font-bold' : 'font-medium'}>{value}</span>
    </div>
  );
}
