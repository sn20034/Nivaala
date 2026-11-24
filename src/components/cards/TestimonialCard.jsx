import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card-surface flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-card dark:hover:shadow-card-dark">
      <Quote size={28} className="text-brand-400" />
      <p className="mt-3 text-textBase dark:text-white leading-relaxed">"{testimonial.text}"</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold text-sm">{testimonial.name}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < testimonial.rating ? 'fill-brand-500 text-brand-500' : 'text-cream-border dark:text-ink-border'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
