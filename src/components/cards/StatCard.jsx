// Rule: every card sets its own bg-* and text-* together. Never use text-white on a light surface.
// White text is only for: orange gradient, maroon, near-black (dark mode), or photos with dark overlay.
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ icon: Icon, number, label, trend, trendUp = true }) {
  return (
    <div className="rounded-3xl border border-[#E8D9C3] bg-[#FFF8EE] p-5 transition-all hover:shadow-card dark:border-white/10 dark:bg-[#141011] dark:hover:border-brand-500/40 dark:hover:shadow-glow">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-[#E07000] dark:bg-brand-500/15 dark:text-[#FF8A0A]">
          {Icon && <Icon size={22} />}
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-semibold ${trendUp ? 'text-[#1E9E4A] dark:text-[#4ADE80]' : 'text-[#D92D20] dark:text-[#F87171]'}`}>
            {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend}
          </span>
        )}
      </div>
      <p className="mt-3 text-xl font-extrabold tracking-tightest text-[#1A1210] [text-wrap:balance] dark:text-white sm:text-2xl">{number}</p>
      <p className="text-sm text-[#6B5F57] dark:text-[#A89C93]">{label}</p>
    </div>
  );
}
