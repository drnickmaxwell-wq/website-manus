'use client';

import { useCallback, useRef, useState } from 'react';
import ModelViewer from '@/components/3d/ModelViewer';

type ViewerPanelProps = {
  src: string;
  poster?: string;
  alt: string;
  notes?: string[];
};

type ViewerElement = HTMLElement & {
  activateAR?: () => void;
};

export default function ViewerPanel({ src, poster, alt, notes = [] }: ViewerPanelProps) {
  const [arSupported, setArSupported] = useState(false);
  const viewerRef = useRef<ViewerElement | null>(null);

  const handleArClick = useCallback(() => {
    viewerRef.current?.activateAR?.();
  }, []);

  return (
    <section className="relative rounded-3xl border border-white/20 bg-white/60 p-6 shadow-sm backdrop-blur dark:bg-white/10 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
        <div className="space-y-4 text-[var(--smh-text)] dark:text-white">
          <h2 className="text-xl font-semibold">Explore the treatment</h2>
          <p className="text-sm text-[var(--smh-text-muted)] dark:text-white/70">
            Rotate, zoom, and inspect the micro-detail of our restorations before you visit the studio.
          </p>
          {notes.length > 0 && (
            <ul className="space-y-2 rounded-2xl border border-white/40 bg-white/70 p-4 text-sm dark:bg-white/5">
              {notes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-[var(--smh-primary-magenta)] to-[var(--smh-primary-teal)]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="space-y-4">
          <ModelViewer
            src={src}
            poster={poster}
            alt={alt}
            onArSupportChange={setArSupported}
            onViewerReady={(el) => {
              viewerRef.current = el as ViewerElement | null;
            }}
          />
          {arSupported && (
            <button
              type="button"
              onClick={handleArClick}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--smh-primary-magenta)] to-[var(--smh-primary-teal)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:shadow-xl"
            >
              View in your space (AR)
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
