import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Drawer({ open, onClose, title, children, side = 'right' }) {
  const sideClass = side === 'right' ? 'right-0' : 'left-0';
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: side === 'right' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'right' ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className={`fixed top-0 ${sideClass} z-[91] h-full w-full max-w-sm overflow-y-auto border-l border-cream-border bg-cream-surface p-6 dark:border-ink-border dark:bg-ink-surface no-scrollbar`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={onClose} className="rounded-full p-1.5 text-muted hover:bg-cream-border dark:hover:bg-ink-border" aria-label="Close">
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
