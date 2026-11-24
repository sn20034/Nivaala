import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card-surface overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-textBase dark:text-white">{question}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="px-5 pb-5 text-muted leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <AccordionItem key={i} {...item} />
      ))}
    </div>
  );
}
