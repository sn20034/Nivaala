import { UtensilsCrossed, Users, CalendarOff, IndianRupee, Star, MessageSquare } from 'lucide-react';
import { StatCard } from '@/components/cards';
import { useFetch } from '@/hooks/useFetch';
import { adminService } from '@/services/adminService';
import { formatCurrency, formatDate, addDaysISO, todayISO } from '@/utils/dateHelpers';
import { CardSkeleton } from '@/components/ui/Skeleton';

function MiniBarChart({ data, labels, color = '#FF8A0A', height = 140 }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((val, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div className="flex w-full items-end justify-center" style={{ height: height - 24 }}>
            <div
              className="w-full max-w-[28px] rounded-t-lg transition-all"
              style={{ height: `${(val / max) * 100}%`, backgroundColor: color, minHeight: '4px' }}
              title={`${labels[i]}: ${val}`}
            />
          </div>
          <span className="text-[10px] text-muted">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { data: stats, loading } = useFetch(() => adminService.getDashboardStats(), [], null);
  const { data: sheet } = useFetch(() => adminService.getKitchenSheet(addDaysISO(todayISO(), 1)), [], null);
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  if (loading || !stats) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-extrabold tracking-tightest">Admin Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tightest">Admin Dashboard</h1>
        <p className="text-muted">Today's kitchen at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={UtensilsCrossed} number={stats.todayMeals} label="Today's meals to cook" />
        <StatCard icon={Users} number={stats.activeStudents} label="Active students" />
        <StatCard icon={CalendarOff} number={stats.skipsTomorrow} label="Skips for tomorrow" />
        <StatCard icon={IndianRupee} number={formatCurrency(stats.revenueThisMonth)} label="Revenue this month" />
        <StatCard icon={Star} number={stats.avgRating} label="Avg rating" />
        <StatCard icon={MessageSquare} number={stats.complaintsOpen} label="Complaints open" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-5">
          <h3 className="mb-4 font-bold">Meals per day (this week)</h3>
          <MiniBarChart data={stats.mealsPerDay} labels={dayLabels} color="#FF8A0A" />
        </div>
        <div className="card-surface p-5">
          <h3 className="mb-4 font-bold">Skip trend (this week)</h3>
          <MiniBarChart data={stats.skipTrend} labels={dayLabels} color="#E5392B" />
        </div>
      </div>

      {/* Tomorrow's kitchen sheet */}
      <div className="rounded-card bg-gradient-to-br from-brand-500 to-[#F04A23] p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80">Tomorrow's kitchen sheet</p>
            <p className="text-xs text-white/60">{formatDate(addDaysISO(todayISO(), 1))} — after skips</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white/15 p-4 text-center">
            <p className="text-3xl font-extrabold">{sheet?.lunchCount ?? '—'}</p>
            <p className="text-sm text-white/80">Lunch boxes</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 text-center">
            <p className="text-3xl font-extrabold">{sheet?.dinnerCount ?? '—'}</p>
            <p className="text-sm text-white/80">Dinner boxes</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 text-center">
            <p className="text-3xl font-extrabold">{sheet?.skippedCount ?? '—'}</p>
            <p className="text-sm text-white/80">Skipped</p>
          </div>
        </div>
      </div>
    </div>
  );
}
