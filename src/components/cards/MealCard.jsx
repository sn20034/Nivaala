import { Plus, Flame, Check } from 'lucide-react';
import Badge from '../ui/Badge';
import SmartImage from '../ui/SmartImage';
import { mealImage } from '@/data/images';

const SPICE_LABELS = { MILD: 'Mild', MEDIUM: 'Medium', SPICY: 'Spicy', SWEET: 'Sweet' };
const SPICE_COLORS = {
  MILD: 'text-success', MEDIUM: 'text-brand-600', SPICY: 'text-danger', SWEET: 'text-maroon',
};

export default function MealCard({ meal, onAdd }) {
  const img = meal.imageUrl ? { src: meal.imageUrl, alt: meal.name } : mealImage(meal.name);
  return (
    <div className="card-surface group flex flex-col overflow-hidden text-textBase dark:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card dark:hover:shadow-card-dark">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={img.src}
          alt={img.alt}
          aspect="4/3"
          focal={img.focal || 'center'}
          className="h-full w-full"
          imgClassName="group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="veg-dot" title="Pure veg" />
          {meal.isSpecial && (
            <Badge variant="brand" className="bg-maroon text-white">Today's special</Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold leading-tight">{meal.name}</h3>
          <div className={`flex items-center gap-1 text-xs font-semibold ${SPICE_COLORS[meal.spiceLevel]}`}>
            <Flame size={14} />
            {SPICE_LABELS[meal.spiceLevel]}
          </div>
        </div>
        <p className="mt-1 flex-1 text-sm text-muted">{meal.description}</p>

        {meal.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {meal.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-cream-border/50 px-2 py-0.5 text-xs text-muted dark:bg-ink-border/50">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted">Included in plan</span>
          <button
            onClick={() => onAdd?.(meal)}
            className="btn-pill bg-brand-500 px-4 py-2 text-xs text-white hover:bg-brand-600"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
