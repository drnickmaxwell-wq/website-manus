'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

type Variant = 'gold' | 'magenta' | 'teal';

type ParticlesLayerProps = {
  variant?: Variant;
  slow?: boolean;
  className?: string;
  mode?: 'auto' | 'css' | 'video';
};

const TEXTURE_MAP: Record<Variant, string> = {
  gold: '/textures/particles-gold.webp',
  magenta: '/textures/particles-magenta.webp',
  teal: '/textures/particles-teal.webp',
};

const VIDEO_MAP: Record<Variant, string> = {
  gold: '/textures/particles-gold-animated.webm',
  magenta: '/textures/particles-magenta-animated.webm',
  teal: '/textures/particles-teal-animated.webm',
};

type ParticleStyle = CSSProperties & { '--smh-particles'?: string };

const availabilityCache: Partial<Record<Variant, boolean>> = {};
const pendingChecks: Partial<Record<Variant, Promise<boolean>>> = {};

async function checkVideoAvailability(variant: Variant) {
  if (availabilityCache[variant] !== undefined) {
    return availabilityCache[variant] ?? false;
  }
  if (!pendingChecks[variant]) {
    pendingChecks[variant] = fetch(VIDEO_MAP[variant], { method: 'HEAD' })
      .then((res) => res.ok)
      .catch(() => false)
      .then((available) => {
        availabilityCache[variant] = available;
        pendingChecks[variant] = undefined;
        return available;
      });
  }
  return pendingChecks[variant] ?? Promise.resolve(false);
}

export default function ParticlesLayer({
  variant = 'gold',
  slow = false,
  className = '',
  mode = 'auto',
}: ParticlesLayerProps) {
  const [videoAvailable, setVideoAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (mode === 'auto' || mode === 'video') {
      checkVideoAvailability(variant).then((available) => {
        if (!cancelled) {
          setVideoAvailable(available);
        }
      });
    }
    return () => {
      cancelled = true;
    };
  }, [mode, variant]);

  const shouldUseVideo = mode === 'video' ? videoAvailable : mode === 'auto' ? videoAvailable : false;

  const style = useMemo<ParticleStyle>(() => ({
    '--smh-particles': `url(${TEXTURE_MAP[variant]})`,
  }), [variant]);

  return (
    <div aria-hidden className={`smh-layer ${className}`} style={style}>
      {shouldUseVideo ? (
        <video
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-screen ${slow ? 'opacity-40' : 'opacity-60'}`}
          src={VIDEO_MAP[variant]}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
        />
      ) : (
        <div className={`smh-layer smh-particles ${variant} ${slow ? 'slow' : ''}`} />
      )}
      <div className="smh-layer smh-film-grain" />
    </div>
  );
}
