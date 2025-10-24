'use client';

import { useMemo, useState } from 'react';

const PLACEHOLDER = 'linear-gradient(135deg, rgba(234, 206, 137, 0.55), rgba(194, 24, 91, 0.45))';

export type BeforeAfterProps = {
  before: { label: string; image?: string };
  after: { label: string; image?: string };
};

export default function BeforeAfter({ before, after }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const beforeStyle = useMemo(() => ({
    backgroundImage: before.image ? `url(${before.image})` : PLACEHOLDER,
  }), [before.image]);
  const afterStyle = useMemo(() => ({
    backgroundImage: after.image ? `url(${after.image})` : PLACEHOLDER,
  }), [after.image]);

  return (
    <section className="space-y-6 rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-white/10 sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-3 text-[var(--smh-text)] dark:text-white">
        <div>
          <h2 className="text-xl font-semibold">Before & After preview</h2>
          <p className="text-sm text-[var(--smh-text-muted)] dark:text-white/70">Drag the slider to compare transformation stages.</p>
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--smh-text-muted)] dark:text-white/60">Interactive</span>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/20 bg-black/5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ ...afterStyle }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            ...beforeStyle,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur"
          >
            {before.label}
          </div>
          <div
            className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur"
          >
            {after.label}
          </div>
          <div
            className="absolute inset-y-0 w-1 bg-white/80 backdrop-blur"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          />
        </div>
      </div>
      <label className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--smh-text-muted)] dark:text-white/60">
        Slide
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="h-1 flex-1 cursor-ew-resize appearance-none rounded-full bg-white/50 accent-[var(--smh-primary-magenta)]"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={position}
          aria-label="Before and after slider"
        />
      </label>
    </section>
  );
}
