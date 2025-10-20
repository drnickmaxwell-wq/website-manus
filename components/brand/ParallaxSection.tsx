"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 *
 * ParallaxSection — delicate y-translate based on scroll. Respects reduced motion.
 *
 * depthPx: max vertical shift (defaults to 6px).
 */
export default function ParallaxSection({
  children,
  className = "",
  depthPx = 6,
}: {
  children: React.ReactNode;
  className?: string;
  depthPx?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [supportsMotion, setSupportsMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSupportsMotion(!media.matches);
    const onChange = () => setSupportsMotion(!media.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!supportsMotion || !ref.current) return;
    const el = ref.current;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const viewport = Math.max(1, window.innerHeight);
      const progress = Math.min(
        1,
        Math.max(0, (viewport - r.top) / (viewport + r.height))
      );
      const offset = (progress - 0.5) * 2 * depthPx;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [supportsMotion, depthPx]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
