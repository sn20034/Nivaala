import { Link } from 'react-router-dom';
import {
  UtensilsCrossed, Clock, CreditCard, CalendarDays, Package,
  CalendarOff, ArrowRight, Star,
} from 'lucide-react';
import { StatCard } from '@/components/cards';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import SmartImage from '@/components/ui/SmartImage';
import { useAuth } from '@/context/AuthContext';
import { useFetch } from '@/hooks/useFetch';
import { studentService } from '@/services/studentService';
import { orderService } from '@/services/orderService';
import { planService } from '@/services/planService';
import { skipPauseService } from '@/services/skipPauseService';
import { formatCurrency, formatDate, todayISO, addDaysISO, shortDay } from '@/utils/dateHelpers';
import { ROUTES } from '@/routes/routePaths';
import { images, mealImage } from '@/data/images';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: plan } = useFetch(() => studentService.getPlan(), [], null);
  const { data: orders } = useFetch(() => orderService.getStudentOrders(), [], []);
  const { data: skips } = useFetch(() => skipPauseService.getMySkips(), [], []);

  const mealsLeft = 58;
  const renewalDate = plan?.renewalDate || addDaysISO(todayISO(), 15);
  const daysToRenewal = Math.max(0, Math.round((new Date(renewalDate + 'T00:00:00') - new Date(todayISO() + 'T00:00:00')) / 86400000));
  const nextDelivery = `Today, ${new Date().getHours() < 12 ? '12:00 PM' : '7:00 PM'}`;
  const recentOrders = (orders || []).slice(0, 3);

  // Upcoming 7-day strip
  const upcoming = Array.from({ length: 7 }).map((_, i) => {
    const iso = addDaysISO(todayISO(), i);
    const skip = (skips || []).find((s) => s.status === 'CONFIRMED' && s.fromDate <= iso && s.toDate >= iso);
    return { iso, skip };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tightest">
          Namaste, {user?.boxName} 👋
        </h1>
        <p className="text-muted">Here's your Nivaala today.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={UtensilsCrossed} number={mealsLeft} label="Meals left this cycle" />
        <StatCard icon={Clock} number={nextDelivery} label="Next delivery" />
        <StatCard icon={CreditCard} number={plan?.name || '—'} label="Current plan" />
        <StatCard icon={CalendarDays} number={daysToRenewal} label="Days to renewal" />
      </div>

      {/* Today's meal */}
      <div className="overflow-hidden rounded-card bg-gradient-to-br from-brand-500 to-[#F04A23]">
        <div className="flex flex-col sm:flex-row">
          <div className="relative aspect-[4/3] sm:aspect-auto sm:h-48 sm:w-48 shrink-0">
            <SmartImage
              src={images.categories.lunch.src}
              alt={images.categories.lunch.alt}
              aspect="4/3"
              focal={images.categories.lunch.focal}
              className="h-full w-full"
            />
          </div>
          <div className="flex flex-1 items-center justify-between p-6 text-white">
            <div>
              <p className="text-sm text-white/80">Today's meal</p>
              <h2 className="mt-1 font-display text-2xl font-extrabold">Lunch — Dal, Roti, Rice, Sabzi</h2>
              <p className="mt-1 text-white/70">Arriving 12:00 PM – 1:30 PM</p>
            </div>
            <div className="text-right">
              <span className="veg-dot border-white" />
              <p className="mt-1 text-xs text-white/70">Pure veg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Button to={ROUTES.STUDENT.SKIP_PAUSE} variant="outline" size="sm"><CalendarOff size={16} /> Skip / Pause</Button>
        <Button to={ROUTES.STUDENT.PLAN} variant="outline" size="sm"><CreditCard size={16} /> Manage plan</Button>
        <Button to={ROUTES.MENU} variant="outline" size="sm"><UtensilsCrossed size={16} /> See menu</Button>
        <Button to={ROUTES.STUDENT.ORDERS} variant="outline" size="sm"><Package size={16} /> Order history</Button>
      </div>

      {/* Upcoming 7-day strip */}
      <div className="card-surface p-5">
        <h3 className="mb-4 font-bold">Upcoming 7 days</h3>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {upcoming.map((day) => (
            <div
              key={day.iso}
              className={`flex min-w-[80px] flex-col items-center rounded-2xl border p-3 text-center ${
                day.skip
                  ? 'border-amber-400/40 bg-amber-400/10'
                  : 'border-cream-border dark:border-ink-border'
              }`}
            >
              <span className="text-xs font-semibold text-muted">{shortDay(day.iso)}</span>
              <span className="mt-1 text-lg font-bold">{day.iso.slice(-2)}</span>
              {day.skip ? (
                <Badge variant="warning" className="mt-1 text-[10px]">Skipped</Badge>
              ) : (
                <span className="mt-1 text-xs text-success">Both meals</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="card-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold">Recent orders</h3>
          <Link to={ROUTES.STUDENT.ORDERS} className="text-sm font-semibold text-brand-600 dark:text-brand-400">
            View all →
          </Link>
        </div>
        {recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const img = mealImage(order.mealTypes.join(' '));
              return (
                <div key={order.id} className="flex items-center justify-between rounded-2xl border border-cream-border p-4 dark:border-ink-border">
                  <div className="flex items-center gap-3">
                    <SmartImage
                      src={img.src}
                      alt={img.alt}
                      aspect="1/1"
                      focal={img.focal}
                      className="h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                    />
                    <div>
                      <p className="font-semibold">{order.mealTypes.join(' + ')}</p>
                      <p className="text-sm text-muted">{formatDate(order.startDate)} · {formatCurrency(order.total)}</p>
                    </div>
                  </div>
                  <Badge variant={order.status === 'Delivered' ? 'success' : 'brand'}>{order.status}</Badge>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="py-6 text-center text-muted">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
