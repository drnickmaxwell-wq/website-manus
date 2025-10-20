"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { animated, useSpring } from "@react-spring/web";
import "@/styles/tokens/smh-champagne-tokens.css";

type BeforeAfterProps = {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
};

export default function BeforeAfter({ beforeSrc, afterSrc, alt = "Before and after" }: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0.5);
  const { clip } = useSpring({ clip: progress, config: { tension: 210, friction: 30 } });

  const updateProgress = useCallback((clientX: number) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const next = (clientX - bounds.left) / bounds.width;
    setProgress(Math.min(1, Math.max(0, next)));
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.buttons !== 1) return;
      updateProgress(event.clientX);
    },
    [updateProgress]
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      updateProgress(event.clientX);
    },
    [updateProgress]
  );

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[var(--smh-border)]/50 bg-[var(--smh-bg-alt)] shadow-[0_30px_80px_-35px_rgba(0,0,0,0.55)]"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
      role="presentation"
    >
      <Image src={afterSrc} alt={`${alt} – after`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      <animated.div
        className="absolute inset-0"
        style={{ clipPath: clip.to((value) => `polygon(0 0, ${value * 100}% 0, ${value * 100}% 100%, 0 100%)`) }}
      >
        <Image src={beforeSrc} alt={`${alt} – before`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      </animated.div>
      <animated.div
        className="absolute inset-y-0 w-px bg-[var(--smh-primary-teal)]"
        style={{ left: clip.to((value) => `${value * 100}%`) }}
      >
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--smh-primary-teal)] bg-[var(--smh-bg)] px-4 py-1 text-xs uppercase tracking-widest text-[var(--smh-primary-teal)]">
          Drag
        </span>
      </animated.div>
    </div>
  );
}
