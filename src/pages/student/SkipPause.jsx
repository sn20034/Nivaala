import { useState, useMemo, useEffect } from 'react';
import { eachDayOfInterval, isValid } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  CalendarOff, Clock, AlertCircle, Check, ChevronLeft, ChevronRight,
  PartyPopper,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Input, Select, Textarea } from '@/components/ui/Input';
import EmptyState from '@/components/ui/EmptyState';
import { ListSkeleton } from '@/components/ui/Skeleton';
import ErrorBoundary from '@/components/ErrorBoundary';
import Modal from '@/components/ui/Modal';
import { RequestCard } from '@/components/cards';
import { useSkipRequests } from '@/hooks/useSkipRequests';
import { todayISO, formatDate } from '@/utils/dateHelpers';
import { isTooLateForDate, countMealsInRange, tomorrowISO } from '@/utils/cutoffRules';
import { SKIP_CUTOFF_LABEL, MEAL_LABELS, MEAL_TYPES, SKIP_REASONS, SKIP_STATUS } from '@/utils/constants';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function SkipPause() {
  return (
    <ErrorBoundary>
      <SkipPauseContent />
    </ErrorBoundary>
  );
}

function SkipPauseContent() {
  const { skips, loading, load, createSkip, cancelSkip } = useSkipRequests();
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [rangeModal, setRangeModal] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);

  // Range pause form state
  const [rangeForm, setRangeForm] = useState({
    fromDate: tomorrowISO(), toDate: tomorrowISO(),
    meals: ['LUNCH', 'DINNER'], reason: 'Going home', note: '',
  });

  useEffect(() => { load(); }, [load]);

  // Active skips map for calendar coloring
  const skipMap = useMemo(() => {
    const map = {};
    (skips || []).forEach((request) => {
      if (request.status === SKIP_STATUS.CANCELLED || !request.fromDate || !request.toDate) return;
      const from = new Date(`${request.fromDate}T00:00:00`);
      const to = new Date(`${request.toDate}T00:00:00`);
      if (!isValid(from) || !isValid(to) || from > to) return;
      const cappedTo = new Date(Math.min(to.getTime(), from.getTime() + 89 * 86400000));
      eachDayOfInterval({ start: from, end: cappedTo }).forEach((date) => {
        const iso = date.toISOString().slice(0, 10);
        if (!map[iso]) map[iso] = [];
        map[iso].push(request);
      });
    });
    return map;
  }, [skips]);

  // Calendar days
  const calendarDays = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startWeekday; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ iso, day: d, skips: skipMap[iso] || [] });
    }
    return days;
  }, [viewMonth, skipMap]);

  const selectedSkips = selectedDate ? (skipMap[selectedDate] || []) : [];

  // Quick action: skip tomorrow's meal(s)
  const quickSkip = async (meals, label) => {
    const tmr = tomorrowISO();
    if (isTooLateForDate(tmr)) {
      toast.error(`Too late — skip before ${SKIP_CUTOFF_LABEL} yesterday for a credit.`);
      return;
    }
    try {
      await createSkip({ fromDate: tmr, toDate: tmr, meals, reason: 'Other', note: '' });
      setSuccessAnim(true);
      toast.success(`${label} skipped! Credit carried forward.`);
      setTimeout(() => setSuccessAnim(false), 2000);
    } catch {
      toast.error('Could not skip. Try again.');
    }
  };

  const handleCancelSkip = async (id) => {
    try {
      await cancelSkip(id);
      toast.success('Skip cancelled — meals resumed.');
    } catch {
      toast.error('Could not cancel.');
    }
  };

  // Toggle a meal skip for a single selected day
  const toggleDayMeal = async (meal) => {
    if (!selectedDate) return;
    if (isTooLateForDate(selectedDate)) {
      toast.error(`Too late for ${formatDate(selectedDate)}. Skip before ${SKIP_CUTOFF_LABEL} the previous day.`);
      return;
    }
    const existing = selectedSkips.find((s) => s.meals.includes(meal));
    if (existing) {
      await handleCancelSkip(existing.id);
    } else {
      try {
        await createSkip({ fromDate: selectedDate, toDate: selectedDate, meals: [meal], reason: 'Other', note: '' });
        toast.success(`${MEAL_LABELS[meal]} on ${formatDate(selectedDate)} skipped.`);
      } catch {
        toast.error('Could not skip.');
      }
    }
  };

  const submitRange = async (e) => {
    e?.preventDefault();
    if (rangeForm.fromDate > rangeForm.toDate) {
      toast.error('From date must be before to date.');
      return;
    }
    try {
      const created = await createSkip(rangeForm);
      setRangeModal(false);
      setSuccessAnim(true);
      toast.success(`Paused ${formatDate(rangeForm.fromDate)}–${formatDate(rangeForm.toDate)}. ${created.creditMeals} credits!`);
      setTimeout(() => setSuccessAnim(false), 2000);
    } catch {
      toast.error('Could not pause.');
    }
  };

  const upcoming = (skips || []).filter((s) => s.status !== SKIP_STATUS.CANCELLED && s.toDate >= todayISO());
  const past = (skips || []).filter((s) => s.status === SKIP_STATUS.CANCELLED || s.toDate < todayISO());

  const creditPreview = useMemo(() => {
    if (rangeForm.fromDate > rangeForm.toDate) return 0;
    const tooLate = isTooLateForDate(rangeForm.fromDate);
    if (tooLate) return 0;
    return countMealsInRange(rangeForm.fromDate, rangeForm.toDate, rangeForm.meals);
  }, [rangeForm.fromDate, rangeForm.toDate, rangeForm.meals]);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {successAnim && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex flex-col items-center rounded-card bg-cream-surface p-10 shadow-card dark:bg-ink-surface"
            >
              <PartyPopper size={48} className="text-brand-500" />
              <p className="mt-3 text-lg font-bold">Done! Credit saved.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tightest">Skip / Pause</h1>
        <p className="text-muted">Kal ghar ja raha ho? Tiffin mat bhejna. We've got you.</p>
      </div>

      {/* Cut-off banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4">
        <Clock size={20} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <b>Skip before {SKIP_CUTOFF_LABEL} the previous day</b> to get a credit. Later skips can't be refunded — the food is already being prepared.
        </p>
      </div>

      {/* Quick action chips */}
      <div>
        <p className="mb-2 text-sm font-semibold">Quick actions</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => quickSkip(['LUNCH'], "Tomorrow's lunch")} className="rounded-full border border-cream-border bg-cream-surface px-4 py-2.5 text-sm font-semibold transition-all hover:border-brand-400 dark:border-ink-border dark:bg-ink-surface">
            Skip tomorrow's lunch
          </button>
          <button onClick={() => quickSkip(['DINNER'], "Tomorrow's dinner")} className="rounded-full border border-cream-border bg-cream-surface px-4 py-2.5 text-sm font-semibold transition-all hover:border-brand-400 dark:border-ink-border dark:bg-ink-surface">
            Skip tomorrow's dinner
          </button>
          <button onClick={() => quickSkip(['LUNCH', 'DINNER'], "Tomorrow (full day)")} className="rounded-full border border-cream-border bg-cream-surface px-4 py-2.5 text-sm font-semibold transition-all hover:border-brand-400 dark:border-ink-border dark:bg-ink-surface">
            Skip tomorrow (full day)
          </button>
          <button onClick={() => setRangeModal(true)} className="rounded-full bg-gradient-to-br from-brand-500 to-[#F04A23] px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
            Going home, pause for dates…
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="card-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold">Calendar — tap a day to skip</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))} className="rounded-full p-1.5 text-muted hover:bg-cream-border dark:hover:bg-ink-border">
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-semibold">{viewMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
            <button onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))} className="rounded-full p-1.5 text-muted hover:bg-cream-border dark:hover:bg-ink-border">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-2 text-center text-xs font-semibold text-muted">{d}</div>
          ))}
          {calendarDays.map((day, i) => {
            if (!day) return <div key={i} />;
            const isToday = day.iso === todayISO();
            const isSelected = day.iso === selectedDate;
            const isSkipped = day.skips.length > 0;
            const isPast = day.iso < todayISO();
            const tooLate = !isPast && isTooLateForDate(day.iso);
            const disabled = isPast || tooLate;
            return (
              <button
                key={day.iso}
                onClick={() => !disabled && setSelectedDate(day.iso)}
                disabled={disabled}
                aria-label={`${formatDate(day.iso)}${isSkipped ? ', skipped' : ''}`}
                className={`relative flex h-16 flex-col items-center justify-center rounded-xl text-sm font-semibold transition-all sm:h-20 ${
                  isSelected
                    ? 'bg-gradient-to-br from-brand-500 to-[#F04A23] text-white shadow-glow'
                    : isSkipped
                    ? 'bg-amber-400/20 text-amber-800 dark:text-amber-300'
                    : isToday
                    ? 'border-2 border-brand-400 bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'text-textBase hover:bg-cream-border/50 dark:text-white dark:hover:bg-ink-border/50'
                } ${disabled && !isSelected ? 'cursor-not-allowed opacity-40' : ''}`}
              >
                {day.day}
                {isSkipped && !isSelected && <span className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-amber-500" />}
              </button>
            );
          })}
        </div>

        {/* Selected day detail */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 rounded-2xl border border-cream-border p-4 dark:border-ink-border"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold">{formatDate(selectedDate, 'EEEE, dd MMM yyyy')}</p>
              {isTooLateForDate(selectedDate) && (
                <Badge variant="warning"><AlertCircle size={12} /> Too late for credit</Badge>
              )}
            </div>
            <div className="mt-3 flex gap-2">
              {MEAL_TYPES.map((meal) => {
                const isSkipped = selectedSkips.some((s) => s.meals.includes(meal));
                return (
                  <button
                    key={meal}
                    onClick={() => toggleDayMeal(meal)}
                    disabled={isTooLateForDate(selectedDate)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border p-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                      isSkipped
                        ? 'border-amber-400 bg-amber-400/15 text-amber-700 dark:text-amber-300'
                        : 'border-cream-border dark:border-ink-border'
                    }`}
                  >
                    {isSkipped ? <Check size={16} /> : <CalendarOff size={16} />}
                    {MEAL_LABELS[meal]}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Upcoming requests */}
      <div>
        <h3 className="mb-3 font-bold">Upcoming requests</h3>
        {loading ? (
          <ListSkeleton count={2} />
        ) : upcoming.length > 0 ? (
          <div className="space-y-3">
            {upcoming.map((req) => <RequestCard key={req.id} request={req} onCancel={handleCancelSkip} />)}
          </div>
        ) : (
          <EmptyState title="No upcoming skips" message="You're on for every meal. Use a quick action when you're heading home." icon={CalendarOff} />
        )}
      </div>

      {/* Past requests */}
      {past.length > 0 && (
        <div>
          <h3 className="mb-3 font-bold">Past requests</h3>
          <div className="space-y-3">
            {past.map((req) => <RequestCard key={req.id} request={req} />)}
          </div>
        </div>
      )}

      {/* Range pause modal */}
      <Modal open={rangeModal} onClose={() => setRangeModal(false)} title="Pause for dates">
        <form onSubmit={submitRange} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="From date" type="date" value={rangeForm.fromDate} onChange={(e) => setRangeForm((f) => ({ ...f, fromDate: e.target.value }))} />
            <Input label="To date" type="date" value={rangeForm.toDate} onChange={(e) => setRangeForm((f) => ({ ...f, toDate: e.target.value }))} />
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Which meals?</p>
            <div className="flex gap-2">
              {MEAL_TYPES.map((meal) => {
                const active = rangeForm.meals.includes(meal);
                return (
                  <button
                    key={meal}
                    type="button"
                    onClick={() => setRangeForm((f) => ({
                      ...f,
                      meals: active ? f.meals.filter((m) => m !== meal) : [...f.meals, meal],
                    }))}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                      active ? 'bg-gradient-to-br from-brand-500 to-[#F04A23] text-white' : 'border border-cream-border text-muted dark:border-ink-border'
                    }`}
                  >
                    {MEAL_LABELS[meal]}
                  </button>
                );
              })}
            </div>
          </div>
          <Select label="Reason" value={rangeForm.reason} onChange={(e) => setRangeForm((f) => ({ ...f, reason: e.target.value }))}>
            {SKIP_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </Select>
          <Textarea label="Note (optional)" value={rangeForm.note} onChange={(e) => setRangeForm((f) => ({ ...f, note: e.target.value }))} placeholder="Diwali ghar ja raha hoon..." />

          {/* Credit preview */}
          <div className={`rounded-2xl p-4 ${creditPreview > 0 ? 'bg-success/10 text-success' : 'bg-amber-400/10 text-amber-600 dark:text-amber-400'}`}>
            {creditPreview > 0 ? (
              <p className="text-sm font-semibold">You will get {creditPreview} meal credit{creditPreview > 1 ? 's' : ''} carried forward.</p>
            ) : (
              <p className="text-sm font-semibold">Too late for a credit on these dates — food is already being prepared.</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="ghost" className="flex-1" onClick={() => setRangeModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1">Confirm pause</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
