import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu as MenuIcon, X, ChevronDown, LogOut,
  LayoutDashboard, CalendarOff, User,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ROUTES, STUDENT_NAV } from '@/routes/routePaths';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Button from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'Menu', path: ROUTES.MENU },
  { label: 'Our Kitchen', path: ROUTES.KITCHEN },
  { label: 'How it works', path: ROUTES.HOW_IT_WORKS },
  { label: 'For Hostels', path: ROUTES.HOSTELS },
  { label: 'Plans', path: ROUTES.PLANS },
];

const Z = { overlay: 90, drawer: 100 };

export default function Navbar() {
  const { isAuthenticated, user, logout, isStudent } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef(null);
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close avatar on outside click
  useEffect(() => {
    const handler = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll + Esc handler when drawer open
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-drawer-open');
      return;
    }
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-drawer-open', 'true');
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEsc);
    setTimeout(() => drawerRef.current?.querySelector('a, button')?.focus(), 50);
    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-drawer-open');
      document.removeEventListener('keydown', handleEsc);
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    setAvatarOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-cream-border bg-cream/80 backdrop-blur-md dark:border-ink-border dark:bg-ink/80">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex shrink-0 items-center gap-2.5">
            <img src="/images/WhatsApp_Image_2026-11-20_at_1.10.44_AM.jpeg" alt="Nivaala" className="h-10 w-10 rounded-2xl object-cover shadow-glow" />
            <span className="font-display text-xl font-extrabold tracking-tightest">Nivaala</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-textBase hover:text-brand-600 dark:text-white dark:hover:text-brand-400'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:flex" />

            {isAuthenticated ? (
              <div className="relative hidden lg:block" ref={avatarRef}>
                <button
                  onClick={() => setAvatarOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-full border border-cream-border bg-cream-surface py-1.5 pl-1.5 pr-3 dark:border-ink-border dark:bg-ink-surface"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-[#F04A23] text-sm font-bold text-white">
                    {user?.fullName?.charAt(0) || 'U'}
                  </span>
                  <span className="hidden text-sm font-semibold sm:block">{user?.boxName || user?.fullName}</span>
                  <ChevronDown size={16} className="text-muted" />
                </button>
                <AnimatePresence>
                  {avatarOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-cream-border bg-cream-surface shadow-card dark:border-ink-border dark:bg-ink-surface"
                    >
                      {isStudent && (
                        <>
                          <DropdownLink to={ROUTES.STUDENT.DASHBOARD} icon={LayoutDashboard} onClick={() => setAvatarOpen(false)}>Dashboard</DropdownLink>
                          <DropdownLink to={ROUTES.STUDENT.SKIP_PAUSE} icon={CalendarOff} onClick={() => setAvatarOpen(false)}>Skip / Pause</DropdownLink>
                          <DropdownLink to={ROUTES.STUDENT.PROFILE} icon={User} onClick={() => setAvatarOpen(false)}>Profile</DropdownLink>
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-danger hover:bg-danger/10"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" to={ROUTES.LOGIN} className="hidden lg:flex">Log in</Button>
                <Button variant="dark" size="sm" to={ROUTES.SIGNUP} className="hidden lg:flex">Sign up →</Button>
              </>
            )}

            {/* Mobile hamburger — opens public drawer on public pages, dashboard drawer on dashboard pages */}
            <button
              ref={hamburgerRef}
              onClick={() => {
                if (isAuthenticated) {
                  window.dispatchEvent(new CustomEvent('open-dashboard-drawer'));
                } else {
                  setMobileOpen(true);
                }
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-border text-textBase dark:border-ink-border dark:text-white lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              <MenuIcon size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer — rendered via portal to escape header's backdrop-blur */}
      {createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 lg:hidden"
                style={{ zIndex: Z.overlay }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                id="mobile-drawer"
                ref={drawerRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed right-0 top-0 flex h-[100dvh] w-[85%] max-w-sm flex-col overflow-y-auto bg-cream-surface dark:bg-ink-surface lg:hidden"
                style={{ zIndex: Z.drawer, paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
              >
                {/* Drawer header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream-border bg-cream-surface px-5 py-4 dark:border-ink-border dark:bg-ink-surface">
                  <Link to={ROUTES.HOME} className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                    <img src="/images/WhatsApp_Image_2026-11-20_at_1.10.44_AM.jpeg" alt="Nivaala" className="h-9 w-9 rounded-2xl object-cover" />
                    <span className="font-display text-lg font-extrabold tracking-tightest text-textBase dark:text-white">Nivaala</span>
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); hamburgerRef.current?.focus(); }}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-textBase hover:bg-cream-border dark:text-white dark:hover:bg-ink-border"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Links */}
                <div className="flex-1 px-5 py-4">
                  <div className="divide-y divide-cream-border dark:divide-ink-border">
                    {NAV_LINKS.map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex min-h-[48px] items-center rounded-none px-0 py-3 text-lg font-semibold transition-colors ${
                            isActive ? 'text-brand-600 dark:text-brand-400' : 'text-textBase hover:text-brand-600 dark:text-white dark:hover:text-brand-400'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </div>

                  {/* Theme toggle row */}
                  <div className="mt-6 flex items-center justify-between border-t border-cream-border pt-4 dark:border-ink-border">
                    <span className="text-sm font-medium text-textBase dark:text-white">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>

                {/* Bottom auth actions */}
                <div className="border-t border-cream-border px-5 py-5 dark:border-ink-border">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-[#F04A23] text-sm font-bold text-white">
                          {user?.fullName?.charAt(0) || 'U'}
                        </span>
                        <span className="font-semibold text-textBase dark:text-white">{user?.boxName || user?.fullName}</span>
                      </div>
                      {isStudent && (
                        <>
                          <Link to={ROUTES.STUDENT.DASHBOARD} onClick={() => setMobileOpen(false)} className="flex min-h-[48px] w-full items-center gap-3 rounded-2xl px-4 text-sm font-medium text-textBase hover:bg-cream-border dark:text-white dark:hover:bg-ink-border">
                            <LayoutDashboard size={18} className="text-muted" /> Dashboard
                          </Link>
                          <Link to={ROUTES.STUDENT.SKIP_PAUSE} onClick={() => setMobileOpen(false)} className="flex min-h-[48px] w-full items-center gap-3 rounded-2xl px-4 text-sm font-medium text-textBase hover:bg-cream-border dark:text-white dark:hover:bg-ink-border">
                            <CalendarOff size={18} className="text-muted" /> Skip / Pause
                          </Link>
                          <Link to={ROUTES.STUDENT.PROFILE} onClick={() => setMobileOpen(false)} className="flex min-h-[48px] w-full items-center gap-3 rounded-2xl px-4 text-sm font-medium text-textBase hover:bg-cream-border dark:text-white dark:hover:bg-ink-border">
                            <User size={18} className="text-muted" /> Profile
                          </Link>
                        </>
                      )}
                      <button onClick={handleLogout} className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-danger px-4 text-sm font-bold text-white">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" to={ROUTES.LOGIN} onClick={() => setMobileOpen(false)}>Log in</Button>
                      <Button variant="dark" className="w-full" to={ROUTES.SIGNUP} onClick={() => setMobileOpen(false)}>Sign up →</Button>
                    </div>
                  )}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

function DropdownLink({ to, icon: Icon, children, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-textBase hover:bg-cream-border/50 dark:text-white dark:hover:bg-ink-border/50">
      <Icon size={16} className="text-muted" /> {children}
    </Link>
  );
}
