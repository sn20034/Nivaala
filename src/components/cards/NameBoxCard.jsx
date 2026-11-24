import { motion } from 'framer-motion';

/**
 * Personalised name box — maroon gradient card with stacked-paper effect,
 * handwritten note, and pure veg dot.
 */
export default function NameBoxCard({ name = 'Aarav', note = "Aaj ka khana, ghar jaisa. Enjoy! 💛", rotate = -4, className = '' }) {
  return (
    <div className={`relative ${className}`} style={{ perspective: 1000 }}>
      {/* Stacked paper behind */}
      <div
        className="absolute inset-0 rounded-card bg-maroon.dark/80 -rotate-3 translate-y-2 translate-x-1"
        aria-hidden
      />
      <div
        className="absolute inset-0 rounded-card bg-maroon/60 rotate-2 -translate-y-1 -translate-x-2"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ rotate: `${rotate}deg` }}
        className="relative rounded-card bg-gradient-to-br from-maroon to-maroon.dark p-6 text-white shadow-card"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide2 text-maroon.gold">Your box</span>
          <span className="veg-dot border-maroon.gold" title="Pure veg">
            <span className="block h-2 w-2 rounded-full bg-maroon.gold" />
          </span>
        </div>
        <p className="mt-4 text-sm text-white/70">For</p>
        <h3 className="font-display text-3xl font-extrabold tracking-tightest text-maroon.gold">
          {name}
        </h3>
        <p className="mt-3 font-hand text-lg text-white/90 leading-snug">
          {note}
        </p>
        <div className="mt-4 border-t border-white/15 pt-3 text-xs text-white/50">
          Nivaala · Pure veg · Cooked with care
        </div>
      </motion.div>
    </div>
  );
}
