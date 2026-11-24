import { useState } from 'react';

export default function Tabs({ tabs, defaultIndex = 0, onChange, className = '' }) {
  const [active, setActive] = useState(defaultIndex);

  const handleSelect = (i) => {
    setActive(i);
    onChange?.(tabs[i].id ?? i);
  };

  return (
    <div className={className}>
      <div className="flex gap-1 rounded-full border border-cream-border bg-cream-surface p-1 dark:border-ink-border dark:bg-ink-surface">
        {tabs.map((tab, i) => (
          <button
            key={tab.id || tab.label}
            onClick={() => handleSelect(i)}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              active === i
                ? 'bg-gradient-to-br from-brand-500 to-[#F04A23] text-white shadow-glow'
                : 'text-muted hover:text-textBase dark:hover:text-white'
            }`}
            aria-selected={active === i}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs[active]?.content}
    </div>
  );
}
