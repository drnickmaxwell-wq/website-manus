"use client";
import Image from "next/image";
import React from "react";

/**
 * WaveHighlight
 *
 * Shows the master wave image with grain + optional particles.
 *
 * Use in heroes (non-video), CTA bands, section breaks, and footers.
 */
export default function WaveHighlight({
  className = "",
  dim = false,
  particles = "gold" as "none" | "gold" | "teal" | "magenta",
}: {
  className?: string;
  dim?: boolean;
  particles?: "none" | "gold" | "teal" | "magenta";
}) {
  return (
    <section
      className={[
        "relative overflow-hidden smh-wave-mask",
        "isolate", // ensure overlays stack nicely
        className,
      ].join(" ")}
      aria-label="Champagne wave"
    >
      {/* base gradient to unify tones */}
      <div aria-hidden className="absolute inset-0 smh-hero-gradient-bg" />

      {/* master wave image */}
      <Image
        src="/waves/hero-waves-alone.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        priority={false}
        className={[
          "object-cover object-center",
          dim ? "opacity-[.65]" : "opacity-95",
        ].join(" ")}
      />

      {/* subtle grain always */}
      <div aria-hidden className="absolute inset-0 smh-film-grain" />

      {/* optional champagne particles */}
      {particles !== "none" && (
        <>
          {particles === "gold" && <div aria-hidden className="absolute inset-0 smh-particles-gold" />}
          {particles === "teal" && <div aria-hidden className="absolute inset-0 smh-particles-teal" />}
          {particles === "magenta" && <div aria-hidden className="absolute inset-0 smh-particles-magenta" />}
        </>
      )}

      {/* content slot */}
      <div className="relative z-10 mx-auto w-full max-w-[var(--maxw,1200px)] px-6 py-16 md:py-24">
        {/* place complementary text/cards here by composition */}
      </div>
    </section>
  );
}
