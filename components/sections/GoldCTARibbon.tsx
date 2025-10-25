"use client";
import React from "react";
import Link from "next/link";

export default function GoldCTARibbon() {
  return (
    <section
      className="relative py-16 overflow-hidden smh-wave-mask"
      style={{
        background: "var(--smh-gradient)",
      }}
      aria-label="Call to action"
    >
      {/* Film grain overlay */}
      <div className="smh-film-grain absolute inset-0" aria-hidden="true" />

      {/* Subtle particles */}
      <div className="smh-particles" aria-hidden="true" />

      <div className="container-luxury relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="smh-heading text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to transform your smile?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Book a consultation and discover how 3D precision meets coastal luxury.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "var(--smh-accent-gold)",
                color: "white",
                boxShadow: "var(--glow-gold), 0 8px 24px rgba(0, 0, 0, 0.2)",
              }}
            >
              Book consultation
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "white",
              }}
            >
              Explore treatments
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Reduced motion support */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          section {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

