import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play, ShieldCheck, Check, MapPin, MessageCircle, Clock, Leaf, Package, Send, Droplets,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import SmartImage from '@/components/ui/SmartImage';
import VideoThumbnail from '@/components/ui/VideoThumbnail';
import AmbientGlow from '@/components/ui/AmbientGlow';
import DotGrid from '@/components/ui/DotGrid';
import { KitchenClipCard } from '@/components/cards';
import { useFetch } from '@/hooks/useFetch';
import { kitchenService } from '@/services/kitchenService';
import { WHATSAPP_LINK } from '@/utils/constants';
import { images, videos } from '@/data/images';
import toast from 'react-hot-toast';

const KITCHEN_STATS = [
  { icon: Clock, number: '6:00 AM', label: 'Kitchen opens' },
  { icon: Leaf, number: '100%', label: 'Pure veg' },
  { icon: Package, number: 'Every box', label: 'Has your name' },
  { icon: Send, number: 'Daily', label: 'Clips on WhatsApp' },
];

const KITCHEN_STANDARDS = [
  { icon: ShieldCheck, text: 'Hair covers and gloves' },
  { icon: Droplets, text: 'Clean water for all cooking' },
  { icon: Leaf, text: 'Fresh vegetables, washed daily' },
  { icon: Check, text: 'Daily cleaning checklist' },
];

const TRAIL_HELPERS = [
  'Washed in clean water, checked by our supervisor',
  'Cooked fresh in small batches',
  'Name card goes in every box',
  'Out for delivery, still warm',
];

const INGREDIENT_SOURCES = [
  'Vegetables: Local farm-direct, Pune',
  'Grains & pulses: Organic certified suppliers',
  'Dairy: Fresh daily from licensed dairy',
  'Spices: Branded, sealed packs only',
];

const HYGIENE_CHECKLIST = [
  'Kitchen sanitised twice daily',
  'All cooks wear gloves & caps',
  'Vegetables washed with food-grade cleaner',
  'Water filtered for cooking',
  'Temperature checks logged daily',
];

function getTrailStatuses(steps) {
  if (!steps.length) return [];
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const statuses = steps.map((step) => {
    const [h, m] = step.time.split(':').map(Number);
    const stepMin = h * 60 + m;
    return { ...step, stepMin, done: nowMin >= stepMin + 15, current: nowMin >= stepMin && nowMin < stepMin + 15 };
  });
  if (statuses.every((s) => !s.done && !s.current)) {
    return steps.map((s, i) => ({ ...s, done: i < 3, current: i === 3 }));
  }
  return statuses;
}

export default function Kitchen() {
  const { data: clips } = useFetch(() => kitchenService.getClips(), [], []);
  const { data: trail } = useFetch(() => kitchenService.getTrail(), [], []);
  const { data: aunties, loading } = useFetch(() => kitchenService.getAunties(), [], []);
  const clipsRef = useRef(null);
  const bookingRef = useRef(null);

  const trailSteps = trail?.length ? trail : [
    { time: '06:00', label: 'Vegetables washed' },
    { time: '09:30', label: 'Cooking begins' },
    { time: '11:00', label: 'Packed with your name' },
    { time: '12:30', label: 'Delivered warm' },
  ];
  const statuses = getTrailStatuses(trailSteps);
  const doneCount = statuses.filter((s) => s.done).length;
  const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const scrollToClips = () => clipsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToBooking = () => bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const trailClipVideo = {
    id: 'trail-clip',
    title: "Packing with your name, 11:00",
    duration: '0:38',
    category: 'Packing',
    thumbnail: images.kitchen.trailClip?.src || images.liveFeed.src,
    videoUrl: 'https://www.youtube.com/embed/8L5ZJ_Jd9Eo',
  };

  return (
    <div className="bg-cream dark:bg-ink">
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream px-4 py-16 text-textBase dark:bg-ink dark:text-white sm:px-6 sm:py-24">
        <AmbientGlow />
        <DotGrid />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* LEFT */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.span
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-2 rounded-full border border-cream-border bg-white px-3 py-1.5 text-xs font-semibold text-textBase dark:border-white/15 dark:bg-white/10 dark:text-white backdrop-blur-sm"
              >
                <Play size={12} fill="currentColor" /> Today's kitchen
              </motion.span>
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="mt-4 font-display text-4xl font-extrabold tracking-tightest [text-wrap:balance] sm:text-5xl lg:text-6xl"
              >
                <span className="text-[#1A1210] dark:text-white">Hamara kitchen</span><br />
                <span className="gradient-text">khula hai.</span>
              </motion.h1>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="mt-4 max-w-lg text-base leading-relaxed text-[#6B5F57] dark:text-[#D8CFC7] [text-wrap:pretty] sm:text-lg"
              >
                Every morning, our kitchen is filmed from washing vegetables to packing your box. No hidden doors, no shortcuts. Proof, not promise.
              </motion.p>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              >
                <button
                  onClick={scrollToClips}
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-[#F04A23] px-6 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
                >
                  <Play size={16} fill="currentColor" /> Watch today's clips
                </button>
                <button
                  onClick={scrollToBooking}
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-[#1A1210]/20 bg-transparent px-6 text-sm font-bold text-[#1A1210] transition-colors hover:bg-[#1A1210]/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
                >
                  Open Kitchen Day for parents
                </button>
              </motion.div>
            </motion.div>

            {/* RIGHT: tilted photo frame + mini trail card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto w-full max-w-md"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative aspect-[4/3] rotate-2 overflow-hidden rounded-3xl border-2 border-brand-500 shadow-2xl"
              >
                <SmartImage
                  src={images.kitchen.hero?.src || images.hero.src}
                  alt={images.kitchen.hero?.alt || images.hero.alt}
                  aspect="4/3"
                  focal={images.kitchen.hero?.focal || images.hero.focal}
                  overlay
                  fallbackSrc={images.hero.src}
                  className="h-full w-full"
                />
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <Clock size={12} /> Today: Washing vegetables · 08:42
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => {
                      const v = videos[0];
                      const event = new CustomEvent('open-video', { detail: v });
                      window.dispatchEvent(event);
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-[#F04A23] text-white shadow-glow transition-transform hover:scale-110"
                    aria-label="Play kitchen video"
                  >
                    <Play size={26} className="ml-0.5" fill="currentColor" />
                  </button>
                </div>
                {/* Mini trail card inside the frame edge */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-3 right-3 w-48 rounded-2xl border border-cream-border bg-[#FFF8EE]/95 p-3 text-textBase shadow-card backdrop-blur-md dark:border-white/10 dark:bg-[#141011]/95 dark:text-white"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide2 text-brand-600 dark:text-brand-400">Today's trail</p>
                  <ul className="mt-2 space-y-1.5">
                    {trailSteps.slice(0, 3).map((step) => (
                      <li key={step.time} className="flex items-center gap-2 text-xs">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success">
                          <Check size={10} className="text-white" />
                        </span>
                        <span className="font-medium text-textBase dark:text-white/90">{step.time}</span>
                        <span className="text-muted dark:text-white/60">{step.label}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="bg-cream px-4 pb-12 dark:bg-ink sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {KITCHEN_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-start gap-2 rounded-3xl border border-cream-border bg-[#FFF8EE] p-5 text-textBase transition-all dark:border-white/10 dark:bg-[#141011] dark:text-white dark:hover:border-brand-500/40"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                    <Icon size={22} />
                  </span>
                  <p className="text-xl font-extrabold tracking-tightest [text-wrap:balance]">{stat.number}</p>
                  <p className="text-sm text-[#6B5F57] dark:text-[#D8CFC7]">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLIP GALLERY */}
      <section ref={clipsRef} className="relative overflow-hidden bg-cream px-4 py-16 text-textBase dark:bg-ink dark:text-white sm:px-6">
        <AmbientGlow />
        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="eyebrow">Today's clips</span>
          <h2 className="mb-8 mt-2 font-display text-3xl font-extrabold tracking-tightest [text-wrap:balance] sm:text-4xl">
            Din bhar,<br />
            <span className="gradient-text">har step.</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(clips || []).map((clip) => <KitchenClipCard key={clip.id} clip={clip} />)}
          </div>
        </div>
      </section>

      {/* TODAY'S TRAIL */}
      <section className="relative overflow-hidden bg-cream px-4 py-16 text-textBase dark:bg-ink dark:text-white sm:px-6">
        <AmbientGlow />
        <DotGrid />
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10">
            <span className="eyebrow">
              Today's trail
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tightest [text-wrap:balance] sm:text-4xl lg:text-5xl">
              Subah 6 baje se<br />
              <span className="gradient-text">dupahar tak.</span>
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-[#6B5F57] dark:text-[#D8CFC7] [text-wrap:pretty]">
              Every step of your meal leaves a trail. From washed vegetables to a box with your name on it.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            {/* LEFT: TrailCard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-cream-border bg-[#FFF8EE] p-7 text-textBase dark:border-white/10 dark:bg-[#141011] dark:text-white"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1A1210] dark:text-white">Aaj ka khana</h3>
                <span className="text-sm text-[#6B5F57] dark:text-[#D8CFC7]">{todayStr}</span>
              </div>
              <div className="space-y-0">
                {statuses.map((step, i) => {
                  const helper = TRAIL_HELPERS[i] || '';
                  const isLast = i === statuses.length - 1;
                  const lineDone = step.done;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.12, type: 'spring', stiffness: 260, damping: 20 }}
                          className={`relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                            step.done ? 'bg-success text-white' : step.current ? 'bg-brand-500 text-white' : 'border-2 border-cream-border bg-transparent text-muted dark:border-white/20 dark:text-white/40'
                          }`}
                        >
                          {step.done ? <Check size={14} /> : step.current ? (
                            <>
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                              <span className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-30" />
                            </>
                          ) : i + 1}
                        </motion.div>
                        {!isLast && (
                          <div className={`my-1 h-full w-0.5 flex-1 ${lineDone ? 'bg-success' : 'border-l-2 border-dashed border-cream-border dark:border-white/15'}`} />
                        )}
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + 0.05 }}
                        className="pb-6"
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">{step.time}</p>
                          {step.current && (
                            <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Now</span>
                          )}
                        </div>
                        <p className="text-base font-semibold text-[#1A1210] dark:text-white">{step.label}</p>
                        <p className="text-sm text-[#6B5F57] dark:text-[#D8CFC7]">{helper}</p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
              {/* Progress bar */}
              <div className="mt-2">
                <div className="mb-1.5 flex items-center justify-between text-xs text-[#6B5F57] dark:text-[#D8CFC7]">
                  <span>{doneCount} of {statuses.length} steps done</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-cream-border dark:bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(doneCount / statuses.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-[#F04A23]"
                  />
                </div>
              </div>
            </motion.div>

            {/* RIGHT: 3 stacked blocks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col gap-6"
            >
              {/* 1. Clip card */}
              <div className="group rounded-3xl border border-cream-border bg-[#FFF8EE] p-3 transition-all hover:-translate-y-1.5 dark:border-white/10 dark:bg-[#141011] dark:hover:border-brand-500/40" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                <VideoThumbnail video={trailClipVideo} className="shadow-card" />
              </div>

              {/* 2. Parents can watch too */}
              <div className="rounded-3xl border border-cream-border bg-[#FFF8EE] p-6 text-textBase transition-all hover:-translate-y-1.5 dark:border-white/10 dark:bg-[#141011] dark:text-white dark:hover:border-brand-500/40" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success/20 text-success">
                    <MessageCircle size={22} />
                  </span>
                  <h3 className="text-lg font-bold text-[#1A1210] dark:text-white">Parents can watch too.</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#6B5F57] dark:text-[#D8CFC7] [text-wrap:pretty]">
                  Weekly menu and kitchen clips on WhatsApp, straight to your family.
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-success px-6 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Join on WhatsApp →
                </a>
              </div>

              {/* 3. Kitchen standards checklist */}
              <div className="rounded-3xl border border-cream-border bg-[#FFF8EE] p-6 text-textBase transition-all hover:-translate-y-1.5 dark:border-white/10 dark:bg-[#141011] dark:text-white dark:hover:border-brand-500/40" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                <h3 className="text-lg font-bold text-[#1A1210] dark:text-white">What we follow daily</h3>
                <ul className="mt-4 space-y-3">
                  {KITCHEN_STANDARDS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.text} className="flex items-start gap-3 text-sm text-[#6B5F57] dark:text-[#D8CFC7]">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                          <Icon size={16} />
                        </span>
                        {item.text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AUNTIES */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow">Meet our aunties</span>
          <h2 className="mb-8 mt-2 font-display text-3xl font-extrabold tracking-tightest sm:text-4xl">Yeh khana / <span className="gradient-text">kiska haath hai?</span></h2>
          {loading ? (
            <p className="text-muted">Loading…</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {aunties?.map((aunty, idx) => (
                <motion.div
                  key={aunty.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card-surface overflow-hidden"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <SmartImage
                      src={images.aunties[(idx % 4) + 1].src}
                      alt={images.aunties[(idx % 4) + 1].alt}
                      aspect="3/4"
                      focal={images.aunties[(idx % 4) + 1].focal}
                      overlay
                      fallbackSrc={images.hero.src}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold">{aunty.name}</h3>
                    <p className="text-sm text-muted">{aunty.region} · {aunty.years} years cooking</p>
                    <p className="mt-3 font-hand text-lg leading-snug text-textBase dark:text-white">"{aunty.story}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HYGIENE PROOF */}
      <section className="relative overflow-hidden bg-cream px-4 py-16 text-textBase dark:bg-ink dark:text-white sm:px-6">
        <AmbientGlow />
        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="eyebrow">Proof, not promise</span>
          <h2 className="mb-8 mt-2 font-display text-3xl font-extrabold tracking-tightest sm:text-4xl">Hygiene & <span className="gradient-text">sourcing.</span></h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-cream-border bg-[#FFF8EE] p-6 text-textBase dark:border-white/10 dark:bg-[#141011] dark:text-white" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              <ShieldCheck size={28} className="text-success" />
              <h3 className="mt-3 font-bold text-[#1A1210] dark:text-white">FSSAI Licence</h3>
              <p className="mt-1 font-mono text-sm">FSSAI-XXXXXXXXXX</p>
              <p className="mt-1 text-xs text-muted">Placeholder — replace with real number.</p>
              <p className="mt-3 text-sm text-[#6B5F57] dark:text-[#D8CFC7]">Last audit: <b>15 Nov 2026</b></p>
            </div>
            <div className="rounded-3xl border border-cream-border bg-[#FFF8EE] p-6 text-textBase dark:border-white/10 dark:bg-[#141011] dark:text-white" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              <Check size={28} className="text-success" />
              <h3 className="mt-3 font-bold text-[#1A1210] dark:text-white">Hygiene checklist</h3>
              <ul className="mt-3 space-y-2">
                {HYGIENE_CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#6B5F57] dark:text-[#D8CFC7]">
                    <Check size={14} className="mt-0.5 shrink-0 text-success" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-cream-border bg-[#FFF8EE] p-6 text-textBase dark:border-white/10 dark:bg-[#141011] dark:text-white" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              <MapPin size={28} className="text-brand-600 dark:text-brand-400" />
              <h3 className="mt-3 font-bold text-[#1A1210] dark:text-white">Ingredient sourcing</h3>
              <ul className="mt-3 space-y-2">
                {INGREDIENT_SOURCES.map((item) => (
                  <li key={item} className="text-sm text-[#6B5F57] dark:text-[#D8CFC7]">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN KITCHEN DAY + PARENT OPT-IN */}
      <section ref={bookingRef} className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="card-surface p-6">
            <h3 className="text-xl font-bold">Open Kitchen Day for parents</h3>
            <p className="mt-1 text-sm text-muted">Parents can visit the kitchen, meet the aunties, and see how the food is made. Book a slot.</p>
            <form className="mt-5 space-y-3" onSubmit={(e) => { e.preventDefault(); toast.success('Slot request sent! We\'ll confirm on WhatsApp.'); }}>
              <Input label="Parent name" placeholder="Mrs. Sharma" required />
              <Input label="Phone" placeholder="10-digit mobile" required />
              <Input label="Preferred date" type="date" required />
              <Textarea label="Anything you'd like to see?" placeholder="I want to see the cooking process..." />
              <Button type="submit" className="w-full">Book a slot →</Button>
            </form>
          </div>
          <div className="flex flex-col justify-center rounded-card bg-gradient-to-br from-success/15 to-cream-surface p-8 dark:to-ink-surface">
            <MessageCircle size={32} className="text-success" />
            <h3 className="mt-3 text-xl font-bold">Parents can watch too</h3>
            <p className="mt-1 text-muted">Get the daily kitchen clips and weekly menu on WhatsApp. Because "beta, khana mila?" should have an answer.</p>
            <Button variant="success" className="mt-5 self-start" href={WHATSAPP_LINK}>
              Opt in on WhatsApp →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
