import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, MessageCircle, Leaf } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { MealCard } from '@/components/cards';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { useFetch } from '@/hooks/useFetch';
import { menuService } from '@/services/menuService';
import { WEEK_DAYS, WEEK_DAY_LABELS, MEAL_TYPES, MEAL_LABELS, WHATSAPP_LINK, DELIVERY_WINDOWS } from '@/utils/constants';
import { WHATSAPP_LINK as _w } from '@/utils/constants';

const SPICE_FILTERS = ['ALL', 'MILD', 'MEDIUM', 'SPICY'];

export default function Menu() {
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0
  const [day, setDay] = useState(WEEK_DAYS[todayIdx]);
  const [mealType, setMealType] = useState('LUNCH');
  const [spice, setSpice] = useState('ALL');

  const { data: fullMenu, loading } = useFetch(() => menuService.getMenu({}), [], []);
  const meals = fullMenu?.[day]?.[mealType] || [];
  const filtered = spice === 'ALL' ? meals : meals.filter((m) => m.spiceLevel === spice);
  const special = meals.find((m) => m.isSpecial);

  return (
    <div className="bg-cream dark:bg-ink">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-500 to-[#F04A23] px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow text-white/80">Weekly menu</span>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tightest sm:text-5xl">
            Ghar jaisa khana, / <span className="text-white/80">roz naya.</span>
          </h1>
          <p className="mt-3 max-w-md text-white/85">
            Home-style pure veg meals. Dal, roti, rice, sabzi, kadhi — and a seasonal special.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge variant="success"><Leaf size={12} /> Pure Veg</Badge>
            <Badge variant="brand" className="bg-white/20 text-white">
              Lunch: {DELIVERY_WINDOWS.LUNCH}
            </Badge>
            <Badge variant="brand" className="bg-white/20 text-white">
              Dinner: {DELIVERY_WINDOWS.DINNER}
            </Badge>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-1 overflow-x-auto rounded-full border border-cream-border bg-cream-surface p-1 dark:border-ink-border dark:bg-ink-surface no-scrollbar">
            {WEEK_DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  day === d ? 'bg-gradient-to-br from-brand-500 to-[#F04A23] text-white shadow-glow' : 'text-muted hover:text-textBase dark:hover:text-white'
                }`}
              >
                {WEEK_DAY_LABELS[d].slice(0, 3)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast('Menu download is a UI placeholder.')}>
              <Download size={14} /> Download
            </Button>
            <Button variant="success" size="sm" href={WHATSAPP_LINK}>
              <MessageCircle size={14} /> WhatsApp
            </Button>
          </div>
        </div>

        {/* Meal type + spice filter */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-1 rounded-full border border-cream-border bg-cream-surface p-1 dark:border-ink-border dark:bg-ink-surface">
            {MEAL_TYPES.map((mt) => (
              <button
                key={mt}
                onClick={() => setMealType(mt)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                  mealType === mt ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'text-muted'
                }`}
              >
                {MEAL_LABELS[mt]}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {SPICE_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setSpice(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                  spice === s ? 'bg-brand-500 text-white' : 'border border-cream-border text-muted dark:border-ink-border'
                }`}
              >
                {s === 'ALL' ? 'All spice' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Today's special */}
        {special && (
          <div className="mb-8 flex items-center gap-4 rounded-card border border-brand-300 bg-gradient-to-r from-brand-50 to-cream-surface p-5 dark:border-brand-500/30 dark:from-ink-surface">
            <span className="text-3xl">⭐</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide2 text-brand-600 dark:text-brand-400">Today's special</p>
              <p className="text-lg font-bold">{special.name}</p>
              <p className="text-sm text-muted">{special.description}</p>
            </div>
          </div>
        )}

        {/* Meals grid */}
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((meal) => (
              <motion.div key={meal.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <MealCard meal={meal} onAdd={() => toast.success(`${meal.name} — noted! (Demo only)`)} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="py-16 text-center text-muted">No meals match this filter. Try another spice level.</p>
        )}
      </div>
    </div>
  );
}
