import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

/**
 * Sidebar for student/admin dashboard layouts (desktop).
 * Includes a portal-rendered mobile drawer with ALL nav items.
 * @param {Array} nav - [{ label, path, icon }]
 */
export default function Sidebar({ nav, title }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef(null);
  const { logout } = useAuth();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll + Esc handler
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-drawer-open');
      return;
    }
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-drawer-open', 'true');
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    setTimeout(() => drawerRef.current?.querySelector('a, button')?.focus(), 50);
    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-drawer-open');
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-[64px] hidden h-[calc(100dvh-64px)] w-60 shrink-0 border-r border-cream-border bg-cream-surface p-4 dark:border-ink-border dark:bg-ink-surface lg:block">
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

      {/* Mobile drawer via portal */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[90] bg-black/50 lg:hidden"
                onClick={() => setOpen(false)}
              />
              <motion.aside
                ref={drawerRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed right-0 top-0 z-[100] flex h-[100dvh] w-[85%] max-w-sm flex-col overflow-y-auto bg-cream-surface dark:bg-ink-surface lg:hidden"
                style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
              >
                {/* Drawer header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream-border bg-cream-surface px-5 py-4 dark:border-ink-border dark:bg-ink-surface">
                  <span className="font-display text-lg font-extrabold tracking-tightest text-textBase dark:text-white">{title} menu</span>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-textBase hover:bg-cream-border dark:text-white dark:hover:bg-ink-border"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* All nav links */}
                <div className="flex-1 px-5 py-4">
                  <nav className="space-y-1">
                    {nav.map((item) => {
                      const Icon = Icons[item.icon] || Icons.Circle;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end
                          className={({ isActive }) =>
                            `flex min-h-[48px] items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
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

                  {/* Theme toggle */}
                  <div className="mt-6 flex items-center justify-between border-t border-cream-border pt-4 dark:border-ink-border">
                    <span className="text-sm font-medium text-textBase dark:text-white">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>

                {/* Logout */}
                <div className="border-t border-cream-border px-5 py-5 dark:border-ink-border">
                  <button
                    onClick={handleLogout}
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-danger px-4 text-sm font-bold text-white"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Hidden trigger — the hamburger is in the Navbar, which calls a global event */}
      <HamburgerTrigger onOpen={() => setOpen(true)} />
    </>
  );
}

// Listen for a custom event from the Navbar hamburger to open the dashboard drawer
function HamburgerTrigger({ onOpen }) {
  useEffect(() => {
    const handler = () => onOpen();
    window.addEventListener('open-dashboard-drawer', handler);
    return () => window.removeEventListener('open-dashboard-drawer', handler);
  }, [onOpen]);
  return null;
}

/** Mobile bottom-bar version of the sidebar nav. */
export function MobileTabBar({ nav }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-cream-border bg-cream-surface px-2 py-1.5 dark:border-ink-border dark:bg-ink-surface lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
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
            <Icon size={20} />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
