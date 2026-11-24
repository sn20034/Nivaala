import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

/**
 * Sidebar for student/admin dashboard layouts.
 * @param {Array} nav - [{ label, path, icon }]
 */
export default function Sidebar({ nav, title }) {
  return (
    <aside className="sticky top-[64px] hidden h-[calc(100vh-64px)] w-60 shrink-0 border-r border-cream-border bg-cream-surface p-4 dark:border-ink-border dark:bg-ink-surface lg:block">
      <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wide2 text-muted">{title}</p>
      <nav className="space-y-1">
        {nav.map((item) => {
          const Icon = Icons[item.icon] || Icons.Circle;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300'
                    : 'text-textBase hover:bg-cream-border/50 dark:text-white dark:hover:bg-ink-border/50'
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

/** Mobile bottom-bar version of the sidebar nav. */
export function MobileTabBar({ nav }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-cream-border bg-cream-surface px-2 py-1.5 dark:border-ink-border dark:bg-ink-surface lg:hidden">
      {nav.slice(0, 5).map((item) => {
        const Icon = Icons[item.icon] || Icons.Circle;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium ${
                isActive ? 'text-brand-600 dark:text-brand-400' : 'text-muted'
              }`
            }
          >
            <Icon size={18} />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
