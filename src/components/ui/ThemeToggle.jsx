import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-cream-border bg-cream-surface text-textBase transition-colors hover:border-brand-400 dark:border-ink-border dark:bg-ink-surface dark:text-white ${className}`}
      aria-label="Toggle dark mode"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </button>
  );
}
