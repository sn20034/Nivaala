import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

export default function ComparisonCard({ variant, title, items }) {
  const isWithout = variant === 'without';
  return (
    <motion.div
      initial={{ opacity: 0, x: isWithout ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`h-full rounded-card border p-6 ${
        isWithout
          ? 'border-ink-border bg-ink-surface text-white'
          : 'border-brand-400 bg-gradient-to-br from-brand-50 to-cream-surface shadow-glow dark:from-ink-surface dark:to-ink-surface'
      }`}
    >
      <h3 className={`text-lg font-bold ${isWithout ? 'text-white/80' : 'text-textBase dark:text-white'}`}>
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                isWithout ? 'bg-danger/20 text-danger' : 'bg-success/20 text-success'
              }`}
            >
              {isWithout ? <X size={13} /> : <Check size={13} />}
            </span>
            <span className={isWithout ? 'text-white/70' : 'font-medium text-textBase dark:text-white'}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
