import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Play, Star, Check, UtensilsCrossed, CalendarOff,
  Sun, Moon, Clock, Leaf, Sparkles,
} from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import VideoThumbnail from '@/components/ui/VideoThumbnail';
import AmbientGlow from '@/components/ui/AmbientGlow';
import DotGrid from '@/components/ui/DotGrid';
import { images, videos } from '@/data/images';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Accordion from '@/components/ui/Accordion';
import Marquee from '@/components/ui/Marquee';
import HostelLeadForm from '@/components/forms/HostelLeadForm';
import { NameBoxCard, ComparisonCard, TrailCard, TestimonialCard } from '@/components/cards';
import { ROUTES } from '@/routes/routePaths';
import { useFetch } from '@/hooks/useFetch';
import { kitchenService } from '@/services/kitchenService';

const TRIAL_CHIPS = [
  { icon: Leaf, text: 'Pure veg' },
  { icon: CalendarOff, text: 'Pause anytime' },
  { icon: Sparkles, text: 'Your name on every box' },
];

const CRAVING_CARDS = [
  { title: 'Lunch', desc: 'Ghar jaisa dal-roti-sabzi, roz 12 baje.', icon: Sun, path: ROUTES.MENU, img: images.categories.lunch },
  { title: 'Dinner', desc: 'Raat ko comfort khana, 7 PM se.', icon: Moon, path: ROUTES.MENU, img: images.categories.dinner },
  { title: 'Trial Pack', desc: 'Pehla hafta try karo. 5 meals ₹399.', icon: UtensilsCrossed, path: ROUTES.PLANS, img: images.categories.trialPack },
  { title: 'Skip / Pause', desc: 'Ghar ja rahe ho? Tiffin pause kar do.', icon: CalendarOff, path: ROUTES.STUDENT.SKIP_PAUSE, img: images.categories.skipPause },
];

const WITHOUT_ITEMS = ['Watery dal again?', 'Paying twice — mess + Zomato', '"Beta, khana mila?" calls', 'Nobody sees the kitchen'];
const WITH_ITEMS = ['Dal that holds a spoon', 'One fair price every meal', 'Parents can watch too', 'Open kitchen, documented daily'];

const FAQ_ITEMS = [
  { question: 'What time does my meal arrive?', answer: 'Lunch arrives between 12:00 PM and 1:30 PM. Dinner arrives between 7:00 PM and 8:30 PM. You\'ll get a WhatsApp message when your tiffin is out for delivery.' },
  { question: 'Can I skip a meal if I am going home?', answer: 'Absolutely. Just skip before 9:00 PM the previous day and you get a meal credit carried forward. Skip later and the food is already being prepared — so no refund, but no charge either for that meal.' },
  { question: 'Is everything vegetarian?', answer: 'Yes. Every meal is pure veg — home-style, no onion-garlic variations available on request. The whole kitchen is veg-only.' },
  { question: 'How do I pay?', answer: 'UPI, cash on delivery, or pay online. Monthly subscribers get an invoice every cycle. Pause anytime, no lock-in.' },
];

export default function Home() {
  const [hostelModal, setHostelModal] = useState(false);
  const { data: trail } = useFetch(() => kitchenService.getTrail(), [], []);
  const testimonials = [
    { id: 't1', name: 'Aarav, Sunrise Hostel', text: "Pehli baar mess ka khana khaake ghar yaad nahi aaya. And the name on the box — chef's kiss.", rating: 5 },
    { id: 't2', name: 'Priya, Green PG', text: 'Mummy ko ab roz tension nahi. Woh dekh sakti hain kitchen ka video. Aur mujhe bhi accha khana milta hai.', rating: 5 },
    { id: 't3', name: 'Rohan, Sunrise Hostel', text: 'Skip feature saves my money. Jab ghar jaata hoon, tiffin pause, credit milta hai. Fair.', rating: 4 },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 to-[#F04A23] px-4 py-12 text-white sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
            <motion.span variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="eyebrow text-white/80">Dekho, phir khao</motion.span>
            <motion.h1 variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tightest sm:text-5xl lg:text-6xl">
              Hostel ka khana.<br />
              Ab ghar jaisa.<br />
              <span className="relative inline-block">
                Aur sab <span className="underline decoration-danger decoration-[3px] underline-offset-4">dikhta</span> hai.
              </span>
            </motion.h1>
            <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="mt-5 max-w-md text-base text-white/85 sm:text-lg">
              Home cooks. Filmed kitchen. Your name on every box. Because the best kind of comfort food comes with proof.
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="dark" size="lg" to={ROUTES.PLANS} className="w-full sm:w-auto">Start your trial →</Button>
              <Button variant="outline" size="lg" to={ROUTES.KITCHEN} className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                <Play size={16} /> Watch our kitchen
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating cards cluster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative aspect-[4/3] rotate-2 overflow-hidden rounded-card border-4 border-white/20 shadow-2xl"
            >
              <SmartImage
                src={images.hero.src}
                alt={images.hero.alt}
                aspect="4/3"
                focal={images.hero.focal}
                priority
                overlay
                className="h-full w-full"
              />
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-danger px-3 py-1 text-xs font-bold text-white">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" />
                LIVE: Washing vegetables · 08:42
              </div>
            </motion.div>
            {/* NameBox overlapping — hidden on mobile to avoid overlap */}
            <div className="absolute -bottom-8 -left-4 hidden w-52 sm:block sm:-left-8">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                <NameBoxCard name="Aarav" note="Aaj ka khana, ghar jaisa. Enjoy!" rotate={-6} />
              </motion.div>
            </div>
            {/* Rating chip — positioned inside image card edges on mobile */}
            <div className="absolute -right-2 top-2 flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-sm font-bold text-ink shadow-lg sm:-right-6 sm:-top-4">
              <Star size={16} className="fill-brand-500 text-brand-500" />
              4.8 taste rating
            </div>
          </motion.div>
        </div>
      </section>

      <Marquee />

      {/* SOMETHING FOR EVERY CRAVING */}
      <Section>
        <SectionHeader eyebrow="Choose your comfort" title={<>Something for / <span className="gradient-text">every craving.</span></>} />
        <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CRAVING_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Link
                to={card.path}
                className="group relative block aspect-[4/5] h-full overflow-hidden rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-400/50 sm:aspect-[3/4]"
              >
                <SmartImage
                  src={card.img.src}
                  alt={card.img.alt}
                  aspect="3/4"
                  focal={card.img.focal}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Dark gradient overlay covering bottom 55%+ */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Centered text at bottom */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-6 text-center">
                  <h3 className="text-2xl font-bold tracking-tightest text-white drop-shadow-lg sm:text-[28px]">{card.title}</h3>
                  <p className="max-w-[22ch] text-sm text-white/90 drop-shadow-md">{card.desc}</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-brand-500 group-hover:border-brand-500">
                    Explore <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* HOSTEL OWNERS BANNER */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-3xl md:min-h-[560px]"
        >
          {/* Background photo */}
          <motion.img
            src={images.hostels.hostelBanner.src}
            alt={images.hostels.hostelBanner.alt}
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: 'center 35%' }}
          />
          {/* Overlay — single layer, photo stays bright */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/65" />
          {/* Soft radial dark spot behind text only */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35),transparent_70%)]" />

          {/* Centered content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5 px-5 py-12 text-center sm:px-6"
          >
            <motion.span
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="text-[13px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: '#FF8A0A' }}
            >
              For hostel owners
            </motion.span>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="font-display font-extrabold leading-tight tracking-tightest text-white drop-shadow-lg [text-wrap:balance]"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
            >
              Mess ki tension<br />
              <span className="gradient-text">humein do.</span>
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="max-w-xl text-base leading-relaxed text-white/90 [text-wrap:pretty] sm:text-lg"
            >
              You fill rooms. We fill plates. Nivaala takes over your mess — cooking, delivery, skips, parent updates. Students get ghar jaisa khana, you get one less headache.
            </motion.p>
            <motion.button
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              onClick={() => setHostelModal(true)}
              className="mt-2 flex h-14 w-full max-w-[320px] items-center justify-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-[#F04A23] px-8 text-sm font-bold text-white shadow-glow transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              Partner with Nivaala →
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* HONEST COMPARISON */}
      <Section>
        <SectionHeader eyebrow="The honest bit" title={<>Not all mess food / <span className="gradient-text">is made equal.</span></>} />
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
          <ComparisonCard variant="without" title="Without Nivaala" items={WITHOUT_ITEMS} />
          <ComparisonCard variant="with" title="With Nivaala" items={WITH_ITEMS} />
        </div>
      </Section>

      {/* SEE IT THEN EAT IT */}
      <section className="bg-ink px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Live kitchen" title={<>See it. / <span className="gradient-text">Then eat it.</span></>} dark />
          <div className="grid auto-rows-fr gap-6 lg:grid-cols-2">
            <VideoThumbnail video={videos[0]} isLive />
            <TrailCard trail={trail} />
          </div>
        </div>
      </section>

      {/* NAME BOX */}
      <Section>
        <AmbientGlow />
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Personalised" title={<>Khana jo tumhara / <span className="gradient-text">naam leke aaye.</span></>} />
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted dark:text-[#D8CFC7] [text-wrap:pretty]">
              Every box arrives with your name on it. Not a number, not a room — your name. Because this isn't a mess. It's your kitchen away from home.
            </p>
            <Button className="mt-6" to={ROUTES.PLANS}>Make it yours →</Button>
          </div>
          <div className="relative mx-auto w-full max-w-xs">
            <div className="pointer-events-none absolute inset-0 hidden rounded-card opacity-20 blur-3xl dark:block" style={{ background: 'radial-gradient(circle, #FF8A0A 0%, transparent 70%)' }} aria-hidden />
            <div className="relative">
              <NameBoxCard name="Priya" note="Today's lunch, made with extra love. — Sunita Aunty" rotate={3} />
            </div>
          </div>
        </div>
      </Section>

      {/* TRIAL PRICING */}
      <section className="relative overflow-hidden bg-ink px-4 py-16 text-white sm:px-6 sm:py-20" style={{ backgroundColor: '#0A0A0A' }}>
        <AmbientGlow />
        <DotGrid />
        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
          {/* LEFT: copy + trust chips */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#FF8A0A' }}>
              Pehla hafta try karo
            </span>
            <h2
              className="mt-3 font-display font-extrabold leading-tight tracking-tightest text-white [text-wrap:balance]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Pehla hafta<br />
              <span className="gradient-text">try karo.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#D8CFC7] [text-wrap:pretty] sm:text-lg">
              Three days. Five meals. Zero pressure. Find your comfort food before you commit.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {TRIAL_CHIPS.map((chip) => {
                const Icon = chip.icon;
                return (
                  <span
                    key={chip.text}
                    className="inline-flex items-center gap-2 rounded-2xl border border-ink-border bg-ink-surface px-4 py-2 text-sm font-medium text-white dark:border-white/10 dark:hover:border-brand-500/40"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
                  >
                    <Icon size={16} className="text-brand-400" /> {chip.text}
                  </span>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: PlanCard with NameBox peeking behind */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* NameBox peeking out bottom-left */}
            <div className="absolute -bottom-6 -left-6 z-0 hidden w-44 sm:block">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <NameBoxCard name="Priya" note="Ghar jaisa!" rotate={-6} />
              </motion.div>
            </div>
            {/* PlanCard */}
            <motion.div
              whileHover={{ rotate: 0 }}
              className="relative z-10 rounded-3xl p-6 text-white"
              style={{
                background: 'linear-gradient(135deg, #FF8A0A, #F04A23)',
                boxShadow: '0 30px 80px -20px rgba(255,138,10,0.45)',
                transform: 'rotate(2deg)',
              }}
            >
              <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                <span className="veg-dot border-white">
                  <span className="block h-2 w-2 rounded-full bg-white" />
                </span>
                Pure veg
              </div>
              <span className="text-xs font-bold uppercase tracking-wide2 text-white/80">Trial Pack</span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-5xl font-extrabold tracking-tightest">₹399</span>
                <span className="text-sm text-white/80">/ 5 meals</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {['Lunch or dinner, your call', 'Delivered with your name', 'Pause anytime'].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm">
                    <Check size={18} className="mt-0.5 shrink-0 text-white" />
                    <span className="text-white">{feat}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={ROUTES.PLANS}
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-bold text-ink transition-transform hover:scale-[1.02] active:scale-95"
              >
                Start your trial →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Section>
        <SectionHeader eyebrow="Students speak" title={<>Ghar ki yaad, / <span className="gradient-text">kum se kum.</span></>} />
        <div className="grid auto-rows-fr gap-5 md:grid-cols-3">
          {testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
        </div>
      </Section>

      {/* FAQ */}
      <Section dark>
        <SectionHeader eyebrow="Good to know" title={<>Questions? / <span className="gradient-text">We've got you.</span></>} dark />
        <div className="mx-auto max-w-2xl">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <div className="rounded-card bg-gradient-to-br from-brand-500 to-[#F04A23] p-10 text-center text-white sm:p-16">
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
            Ghar jaisa khana,<br /> <span className="text-white/80">roz bharosa ke saath.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/85">
            Start your trial this week. 5 meals, your name on the box, pause anytime.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button variant="dark" size="lg" to={ROUTES.PLANS}>Start your trial →</Button>
            <Button variant="outline" size="lg" to={ROUTES.MENU} className="border-white/30 bg-white/10 text-white hover:bg-white/20">See the menu</Button>
          </div>
        </div>
      </Section>

      {/* Hostel lead modal */}
      <Modal open={hostelModal} onClose={() => setHostelModal(false)} title="Partner with Nivaala" size="lg">
        <p className="mb-4 text-sm text-muted">Tell us about your hostel. We'll call you within 24 hours.</p>
        <HostelLeadForm />
      </Modal>
    </>
  );
}

function Section({ children, dark }) {
  return (
    <section className={`px-4 py-16 sm:px-6 sm:py-20 ${dark ? 'bg-ink text-white' : 'bg-cream dark:bg-ink'}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, dark }) {
  return (
    <div className="mb-10">
      <span className={`eyebrow ${dark ? 'text-brand-400' : ''}`}>{eyebrow}</span>
      <h2 className={`mt-2 font-display text-3xl font-extrabold leading-tight tracking-tightest sm:text-4xl lg:text-5xl ${dark ? 'text-white' : ''}`}>
        {title}
      </h2>
    </div>
  );
}
