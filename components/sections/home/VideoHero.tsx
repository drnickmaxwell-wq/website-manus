"use client";
import React from "react";
import GradientUnderlay from "@/components/brand/GradientUnderlay";
import ParticlesLayer from "@/components/brand/ParticlesLayer";

/**
 * VideoHero
 *
 * Use for homepage only: video on top, gradient peeking at edges as fallback.
 *
 * Keep videos small (≤ ~6–8 MB total across formats), muted, looped.
 */
export default function VideoHero() {
  return (
    <section className="relative overflow-hidden min-h-[64vh] flex items-center" aria-label="Welcome">
      <GradientUnderlay />

      {/* Grain & tiny gold twinkle to keep the luxury texture */}
      <div aria-hidden className="absolute inset-0 smh-film-grain" />
      <ParticlesLayer variant="gold" slow className="opacity-20" />

      {/* Video layer */}
      <div className="relative z-10 mx-auto w-full max-w-[var(--maxw,1200px)] px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div>
            <p className="smh-text-dim mb-2">St Mary’s House Dental Care</p>
            <h1 className="smh-heading text-4xl/tight md:text-5xl font-bold mb-4">
              Same-day 3D veneers & guided implants — luxury care by the sea.
            </h1>
            <p className="smh-text-dim mb-6">
              Designed, planned and printed in-house. Quiet luxury, precise outcomes.
            </p>
            <div className="flex flex-wrap gap-3">
              <a className="smh-btn" href="/contact">
                Book consultation
              </a>
              <a className="smh-btn smh-glass" href="/treatments">
                Explore treatments
              </a>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden smh-gold-border">
            {/* Poster/fallback handled by gradient underlay behind */}
            <video
              className="w-full h-full object-cover"
              playsInline
              muted
              loop
              autoPlay
              preload="metadata"
              poster="/gradients/hero-gradient-fallback.webp"
            >
              <source src="/video/clinic-hero.webm" type="video/webm" />
              <source src="/video/clinic-hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
