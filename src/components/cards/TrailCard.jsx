import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function TrailCard({ trail = [], className = '' }) {
  const steps = trail.length ? trail : [
    { time: '06:00', label: 'Vegetables washed' },
    { time: '09:30', label: 'Cooking begins' },
    { time: '11:00', label: 'Packed with your name' },
    { time: '12:30', label: 'Delivered warm' },
  ];
  return (
    <div className={`card-surface h-full p-6 text-textBase dark:text-white ${className}`}>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-2 w-2 animate-pulse-dot rounded-full bg-danger" />
        <span className="text-xs font-semibold uppercase tracking-wide2 text-danger">Today's trail</span>
      </div>
      <div className="space-y-0">
        {steps.map((step, i) => {
          const done = i < steps.length - 1;
          return (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 260, damping: 20 }}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    done ? 'bg-success text-white' : 'bg-brand-500 text-white'
                  }`}
                >
                  {done ? <Check size={14} /> : i + 1}
                </motion.div>
                {i < steps.length - 1 && <div className="h-full w-0.5 flex-1 bg-cream-border dark:bg-ink-border" />}
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.05 }}
                className="pb-6"
              >
                <p className="text-xs font-semibold text-[#E07000] dark:text-brand-400">{step.time}</p>
                <p className="text-sm font-medium text-textBase dark:text-white">{step.label}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
