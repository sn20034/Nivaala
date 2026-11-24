const ITEMS = ['Dal', 'Roti', 'Sabzi', 'Rice', 'Kadhi', 'Ghar jaisa', 'Dekho, phir khao.'];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="group overflow-hidden bg-ink py-3 text-white">
      <div className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 text-sm font-semibold tracking-wide">
            {item}
            <span className="text-brand-400">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
