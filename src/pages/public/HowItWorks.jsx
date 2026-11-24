import { motion } from 'framer-motion';
import { Search, ClipboardCheck, Truck, Box, Heart, ShieldCheck } from 'lucide-react';

const STEPS = [
  { icon: Search, title: 'Choose your plan', desc: 'Trial, single meal, or two meals. Pick what fits your routine.' },
  { icon: Box, title: 'Tell us your name', desc: 'Your name goes on every box. Not a number — your name.' },
  { icon: ClipboardCheck, title: 'We cook — and film it', desc: 'Our aunties cook home-style veg meals in a filmed kitchen. You can watch.' },
  { icon: Truck, title: 'Delivered warm', desc: 'Lunch 12–1:30 PM, dinner 7–8:30 PM. Right to your hostel door.' },
  { icon: Heart, title: 'Skip or pause anytime', desc: 'Going home? Skip before 9 PM and get a credit. No money wasted.' },
  { icon: ShieldCheck, title: 'Parents stay in the loop', desc: 'Weekly menu and kitchen clips on WhatsApp. "Beta, khana mila?" — answered.' },
];

export default function HowItWorks() {
  return (
    <div className="bg-cream dark:bg-ink">
      <section className="bg-gradient-to-br from-brand-500 to-[#F04A23] px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="eyebrow text-white/80">How it works</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tightest sm:text-5xl">
            Simple. / <span className="text-white/80">Honest. Warm.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-white/85">
            From signup to your first warm box — here's how Nivaala works, step by step.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-surface p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                    <step.icon size={22} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide2 text-brand-600 dark:text-brand-400">Step {i + 1}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
