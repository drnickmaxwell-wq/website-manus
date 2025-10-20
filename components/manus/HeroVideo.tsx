"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import "@/styles/tokens/smh-champagne-tokens.css";

export type HeroVideoProps = {
  videoSrc: string;
  posterSrc?: string;
  fallbackClass?: string;
  children?: React.ReactNode;
};

const PARTICLE_TEXTURES = [
  "/textures/particles-1.webp",
  "/textures/particles-2.webp",
  "/textures/particles-3.webp",
];

export default function HeroVideo({
  videoSrc,
  posterSrc,
  fallbackClass = "smh-gradient-bg",
  children,
}: HeroVideoProps) {
  const [isReady, setIsReady] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const particleTexture = useMemo(
    () => PARTICLE_TEXTURES[Math.floor(Math.random() * PARTICLE_TEXTURES.length)],
    []
  );

  return (
    <section className="relative overflow-hidden text-[var(--smh-text)]">
      <div className="pointer-events-none absolute inset-0 bg-[var(--smh-overlay-dark)]/40 mix-blend-screen" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <Image
          src="/textures/film-grain-desktop.webp"
          alt="Film grain texture"
          fill
          sizes="100vw"
          className="object-cover mix-blend-soft-light"
          priority
        />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-35" aria-hidden>
        <Image src={particleTexture} alt="Particles" fill sizes="100vw" className="object-cover" priority />
      </div>
      <div className="relative">
        {!isErrored && (
          <video
            className="h-[60vh] w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setIsReady(true)}
            onLoadedData={() => setIsReady(true)}
            onError={() => setIsErrored(true)}
            poster={posterSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        {(isErrored || !isReady) && (
          <div
            className={`flex h-[60vh] w-full items-center justify-center bg-[var(--smh-bg-alt)] ${fallbackClass}`}
            aria-hidden={!isErrored}
          >
            <span className="smh-heading text-3xl font-semibold text-[var(--smh-text-muted)]">
              Immersive treatment preview loading...
            </span>
          </div>
        )}
        {children && (
          <div className="pointer-events-none absolute inset-0 flex items-end justify-start p-6 text-left">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
