import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import LoginForm from '@/components/forms/LoginForm';
import SignupForm from '@/components/forms/SignupForm';
import { NameBoxCard } from '@/components/cards';
import SmartImage from '@/components/ui/SmartImage';
import { ROUTES } from '@/routes/routePaths';
import { images } from '@/data/images';

export default function Login() {
  const [tab, setTab] = useState('login');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirect = searchParams.get('redirect');

  // If a redirect param exists, default to login tab
  if (redirect && tab !== 'login') setTab('login');

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-500 to-[#F04A23] p-12 text-white lg:flex">
        <div className="flex items-center gap-2.5">
          <img src="/images/WhatsApp_Image_2026-11-20_at_1.10.44_AM.jpeg" alt="Nivaala" className="h-10 w-10 rounded-2xl object-cover" />
          <span className="font-display text-xl font-extrabold tracking-tightest">Nivaala</span>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 z-0 opacity-20">
            <SmartImage
              src={images.categories.lunch.src}
              alt={images.categories.lunch.alt}
              aspect="1/1"
              focal={images.categories.lunch.focal}
              className="h-full w-full rounded-card"
            />
          </div>
          <div className="relative z-10">
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tightest">
              Hostel ka khana.<br />
              Ab ghar jaisa.<br />
              <span className="text-white/80">Aur sab dikhta hai.</span>
            </h1>
            <p className="mt-4 max-w-sm text-white/85">
              Home cooks. Filmed kitchen. Your name on every box.
            </p>
            <div className="mt-8 w-56">
              <NameBoxCard name="Aarav" note="Welcome to the family. Your first box is on its way." rotate={-4} />
            </div>
          </div>
        </div>
        <p className="text-sm text-white/60">Dekho, phir khao.</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-cream p-6 dark:bg-ink sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <img src="/images/WhatsApp_Image_2026-11-20_at_1.10.44_AM.jpeg" alt="Nivaala" className="h-10 w-10 rounded-2xl object-cover shadow-glow" />
            <span className="font-display text-xl font-extrabold tracking-tightest">Nivaala</span>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-1 rounded-full border border-cream-border bg-cream-surface p-1 dark:border-ink-border dark:bg-ink-surface">
            {['login', 'signup'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                  tab === t ? 'bg-gradient-to-br from-brand-500 to-[#F04A23] text-white shadow-glow' : 'text-muted'
                }`}
              >
                {t === 'login' ? 'Log in' : 'Sign up'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: tab === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === 'login' ? 20 : -20 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 'login' ? <LoginForm /> : <SignupForm />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
