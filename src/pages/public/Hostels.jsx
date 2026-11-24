import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ClipboardCheck, Rocket, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import HostelLeadForm from '@/components/forms/HostelLeadForm';
import SmartImage from '@/components/ui/SmartImage';
import { ComparisonCard } from '@/components/cards';
import { images } from '@/data/images';

const STEPS = [
  { icon: Search, title: 'Audit', desc: 'We visit your hostel, taste the current mess, and understand your students. Free, no commitment.', img: images.hostels.hostelMess },
  { icon: ClipboardCheck, title: 'Pilot', desc: 'One week trial for a few students. They taste, you see. If they love it, we go further.', img: images.hostels.studentsEating },
  { icon: Rocket, title: 'Take over', desc: 'We handle cooking, delivery, skips, parent updates. You get one monthly report and zero kitchen tension.', img: images.hostels.hostelBanner },
];

export default function Hostels() {
  const [modal, setModal] = useState(false);

  return (
    <div className="bg-cream dark:bg-ink">
      <section className="bg-gradient-to-br from-brand-500 to-[#F04A23] px-4 py-16 text-white sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <span className="eyebrow text-white/80">For hostel owners</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tightest sm:text-5xl lg:text-6xl">
            Mess ki tension / <span className="text-white/80">humein do.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            You fill rooms. We fill plates. Nivaala takes over your mess — cooking, delivery, skips, and parent updates. Students get ghar jaisa khana, you get one less headache.
          </p>
          <Button variant="dark" size="lg" className="mt-7" onClick={() => setModal(true)}>Partner with Nivaala →</Button>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tightest sm:text-4xl">Audit. Pilot. / <span className="gradient-text">Take over.</span></h2>
          </div>
          <div className="grid auto-rows-fr gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-surface flex h-full flex-col overflow-hidden p-0 text-center"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <SmartImage
                    src={step.img.src}
                    alt={step.img.alt}
                    aspect="16/9"
                    focal={step.img.focal}
                    overlay
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                    <step.icon size={26} />
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide2 text-brand-600 dark:text-brand-400">Step {i + 1}</p>
                  <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="bg-ink px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="eyebrow text-brand-400">The honest bit</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tightest sm:text-4xl">Before Nivaala / <span className="gradient-text">after Nivaala.</span></h2>
          </div>
          <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
            <ComparisonCard variant="without" title="Running your own mess" items={['Cook no-shows', 'Wastage you can\'t control', 'Complaints from parents', 'No visibility into the kitchen']} />
            <ComparisonCard variant="with" title="With Nivaala" items={['No cook management — we handle it', 'Cooked to order, minimal wastage', 'Parents get clips & menu on WhatsApp', 'Full transparency, documented daily']} />
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <span className="eyebrow">Get started</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tightest">Partner with Nivaala</h2>
            <p className="mt-2 text-muted">Tell us about your hostel. We'll call you within 24 hours.</p>
          </div>
          <div className="mt-8 card-surface p-6">
            <HostelLeadForm />
          </div>
        </div>
      </section>

      <Modal open={modal} onClose={() => setModal(false)} title="Partner with Nivaala" size="lg">
        <HostelLeadForm />
      </Modal>
    </div>
  );
}
