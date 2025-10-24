"use client";

import Image from "next/image";
import { ReactNode } from "react";

const WAVE_FALLBACK_WIDTH = 1280;
const WAVE_FALLBACK_HEIGHT = 720;

export default function WaveHighlight({
  video = "/textures/particles-gold-animated.webm",
  fallback = "/textures/particles-gold.webp",
  children,
}: {
  video?: string;
  fallback?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* gradient */}
      <Image
        src="/gradients/hero-gradient-soft.webp"
        alt=""
        width={2400}
        height={1350}
        className="absolute inset-0 h-full w-full object-cover"
        priority
        aria-hidden={true}
      />

      {/* film grain */}
      <Image
        src="/textures/film-grain-desktop.webp"
        alt=""
        width={2048}
        height={2048}
        className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
        aria-hidden={true}
      />

      {/* particles */}
      <div className="pointer-events-none absolute inset-0 h-full w-full">
        <Image
          src={fallback}
          alt=""
          width={WAVE_FALLBACK_WIDTH}
          height={WAVE_FALLBACK_HEIGHT}
          className="h-full w-full object-cover opacity-60"
          aria-hidden={true}
        />
        <video
          src={video}
          className="champagne-drift absolute inset-0 h-full w-full object-cover opacity-90"
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          poster={fallback}
          aria-hidden={true}
          onError={(event) => {
            const el = event.currentTarget;
            el.style.display = "none";
          }}
        />
      </div>

      {/* wave mask */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[240px] sm:h-[320px]"
        style={{
          WebkitMaskImage: "url(/waves/smh-wave-mask.svg)",
          maskImage: "url(/waves/smh-wave-mask.svg)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "cover",
          maskSize: "cover",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {children ?? (
          <div className="max-w-2xl text-white">
            <h3 className="text-2xl font-semibold sm:text-3xl">A quiet, champagne glow.</h3>
            <p className="mt-2 text-neutral-200">
              Finely tuned particles and film grain craft a rich surface that stays performant across the experience.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
