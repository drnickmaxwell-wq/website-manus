// components/brand/WaveHighlight.tsx
'use client';

import React from 'react';

type Props = {
  particles?: 'gold' | 'magenta' | 'teal';
  children?: React.ReactNode;
};

export default function WaveHighlight({ particles = 'gold', children }: Props) {
  const videoSrc = `/textures/particles-${particles}-animated.webm`;
  const imgFallback = `/textures/particles-${particles}.webp`;

  return (
    <section aria-label="Champagne wave highlight" className="relative my-10 md:my-16">
      <div className="relative isolate overflow-hidden rounded-3xl ring-1 ring-white/10">
        {/* gradient base */}
        <div className="absolute inset-0 bg-[url('/gradients/hero-gradient-soft.webp')] bg-cover bg-center" />

        {/* film grain (soft-light) */}
        <img
          aria-hidden
          src="/textures/film-grain-desktop.webp"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-soft-light"
          alt=""
        />

        {/* particles video with fallback image */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-[.16] particles-drift particles-drift--slow"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = 'none'; }}
        >
          <source src={videoSrc} type="video/webm" />
        </video>
        <img aria-hidden src={imgFallback} className="absolute inset-0 w-full h-full object-cover opacity-25" alt="" />

        {/* wave mask accent at top */}
        <div
          className="pointer-events-none absolute -top-px left-0 right-0 h-16"
          style={{
            WebkitMaskImage: 'url(/waves/smh-wave-mask.svg)',
            maskImage: 'url(/waves/smh-wave-mask.svg)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
            maskSize: 'cover',
            background: 'linear-gradient(90deg, rgba(255,255,255,.35), rgba(255,255,255,0))'
          }}
        />

        {/* content */}
        <div className="relative px-6 py-12 md:px-12 md:py-20">
          {children}
        </div>
      </div>
    </section>
  );
}
