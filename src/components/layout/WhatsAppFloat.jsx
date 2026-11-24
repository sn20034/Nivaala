import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WHATSAPP_LINK } from '@/utils/constants';

const BANNER_KEY = 'nivaala_whatsapp_banner_dismissed';

export default function WhatsAppFloat() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setDrawerOpen(document.body.hasAttribute('data-drawer-open'));
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-drawer-open'] });
    window.addEventListener('resize', check);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', check);
    };
  }, []);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setBannerOpen(localStorage.getItem(BANNER_KEY) !== '1');
    }
  }, []);

  const dismiss = () => {
    setBannerOpen(false);
    try { localStorage.setItem(BANNER_KEY, '1'); } catch {}
  };

  if (drawerOpen) return null;

  const showFloatingButton = !isMobile || !bannerOpen;

  return (
    <>
      {/* Floating round button — hidden on mobile when banner is visible */}
      {showFloatingButton && (
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-lg shadow-success/30 transition-transform hover:scale-110"
          style={{ bottom: isMobile ? '4.5rem' : '1.5rem' }}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={26} fill="white" className="text-success" />
        </a>
      )}

      {/* Mobile: slim bottom bar */}
      {bannerOpen && isMobile && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-success/20 bg-cream-surface dark:border-success/30 dark:bg-ink-surface"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex h-14 max-h-14 items-center gap-2 px-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
              <MessageCircle size={16} />
            </span>
            <p className="flex-1 truncate text-sm font-medium text-textBase dark:text-white">Daily menu on WhatsApp</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full bg-success px-3 py-1.5 text-xs font-bold text-white"
            >
              Join now
            </a>
            <button
              onClick={dismiss}
              className="shrink-0 rounded-full p-1.5 text-muted hover:bg-cream-border dark:hover:bg-ink-border"
              aria-label="Dismiss banner"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Desktop: card at bottom-left */}
      {bannerOpen && !isMobile && (
        <div className="fixed bottom-6 left-6 z-40 max-w-sm">
          <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-cream-surface p-3 pr-2 shadow-card dark:bg-ink-surface">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
              <MessageCircle size={18} />
            </span>
            <p className="flex-1 text-sm font-medium text-textBase dark:text-white">Get the daily menu on WhatsApp.</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full bg-success px-4 py-1.5 text-xs font-bold text-white"
            >
              Join now
            </a>
            <button
              onClick={dismiss}
              className="shrink-0 rounded-full p-1 text-muted hover:bg-cream-border dark:hover:bg-ink-border"
              aria-label="Dismiss banner"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
