'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ModelViewerElement } from '@/types/model-viewer';

const ModelViewerTag = 'model-viewer' as any;

export type ModelViewerProps = {
  src: string;
  poster?: string;
  alt: string;
  ar?: boolean;
  cameraControls?: boolean;
  exposure?: number;
  shadowIntensity?: number;
  className?: string;
  onArSupportChange?: (supported: boolean) => void;
  onViewerReady?: (el: ModelViewerElement | null) => void;
};

const DEFAULT_POSTER = '/gradients/hero-gradient-fallback.webp';

export default function ModelViewer({
  src,
  poster,
  alt,
  ar = true,
  cameraControls = true,
  exposure = 1.1,
  shadowIntensity = 0.2,
  className = '',
  onArSupportChange,
  onViewerReady,
}: ModelViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [arSupported, setArSupported] = useState(false);
  const viewerRef = useRef<ModelViewerElement | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      await import('@google/model-viewer');
      if (!active) return;
      setMounted(true);
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!mounted || !viewerRef.current) return;
    const element = viewerRef.current;
    onViewerReady?.(element);
    if (typeof element.canActivateAR === 'function') {
      element
        .canActivateAR?.()
        .then((supported) => {
          const next = Boolean(supported);
          setArSupported(next);
          onArSupportChange?.(next);
        })
        .catch(() => {
          setArSupported(false);
          onArSupportChange?.(false);
        });
    } else {
      setArSupported(false);
      onArSupportChange?.(false);
    }
  }, [mounted, onArSupportChange, onViewerReady]);

  const resolvedPoster = poster ?? DEFAULT_POSTER;

  const placeholder = useMemo(
    () => (
      <figure className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-brand-sand/60 to-brand-gold/20">
        <img
          src={resolvedPoster}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <figcaption className="absolute inset-x-4 bottom-4 rounded-full bg-black/40 px-4 py-1 text-center text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur">
          {alt}
        </figcaption>
      </figure>
    ),
    [alt, resolvedPoster],
  );

  if (!mounted) {
    return placeholder;
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-black/10 ${className}`}>
      <ModelViewerTag
        ref={viewerRef}
        src={src}
        poster={resolvedPoster}
        alt={alt}
        ar={ar}
        arModes="webxr scene-viewer quick-look"
        cameraControls={cameraControls}
        exposure={exposure}
        shadowIntensity={shadowIntensity}
        loading="lazy"
        reveal="interaction"
        style={{ width: '100%', height: '100%', minHeight: '360px', background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))' }}
      />
      {!arSupported && ar && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 w-[220px] -translate-x-1/2 rounded-full bg-black/40 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
          AR preview not available on this device
        </div>
      )}
    </div>
  );
}
