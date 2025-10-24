"use client";

import Image from "next/image";
import ParticlesLayer from "@/components/effects/ParticlesLayer";

export default function WaveHighlight() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* gradient base */}
      <Image
        src="/gradients/hero-gradient-soft.webp"
        alt=""
        width={2400}
        height={1350}
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />
      {/* particles + grain */}
      <ParticlesLayer variant="gold" />
      {/* mask band */}
      <div
        className="absolute inset-x-0 bottom-0 h-[240px] sm:h-[320px] pointer-events-none"
        style={{
          WebkitMaskImage: "url(/waves/smh-wave-mask.svg)",
          maskImage: "url(/waves/smh-wave-mask.svg)",
          WebkitMaskSize: "cover",
          maskSize: "cover",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />
      {/* copy */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <h3 className="text-2xl sm:text-3xl font-semibold">A quiet, champagne glow.</h3>
        <p className="text-neutral-300 max-w-prose mt-2">
          Film grain + floating particles rendered with pure CSS/SVG for zero-dependency performance.
        </p>
      </div>
    </section>
  );
}
