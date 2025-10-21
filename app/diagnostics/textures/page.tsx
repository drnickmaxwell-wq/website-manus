"use client";
import Image from "next/image";
import React from "react";

const tiles = [
  // Gradients
  { label: "gradient: hero-gradient-fallback", src: "/gradients/hero-gradient-fallback.webp", kind: "image" },
  { label: "gradient: hero-gradient-fallback-dark", src: "/gradients/hero-gradient-fallback-dark.webp", kind: "image" },
  { label: "gradient: hero-gradient-soft", src: "/gradients/hero-gradient-soft.webp", kind: "image" },

  // Overlays
  { label: "overlay: glow-dust", src: "/overlays/glow-dust.webp", kind: "image" },
  { label: "overlay: glow-dust-dark", src: "/overlays/glow-dust-dark.webp", kind: "image" },
  { label: "overlay: glow-dust-mobile", src: "/overlays/glow-dust-mobile.webp", kind: "image" },

  // Textures (static)
  { label: "texture: film-grain-desktop", src: "/textures/film-grain-desktop.webp", kind: "image" },
  { label: "texture: film-grain-dark", src: "/textures/film-grain-dark.webp", kind: "image" },
  { label: "texture: film-grain-mobile", src: "/textures/film-grain-mobile.webp", kind: "image" },
  { label: "texture: film-grain-mobile-dark", src: "/textures/film-grain-mobile-dark.webp", kind: "image" },

  { label: "texture: particles-gold", src: "/textures/particles-gold.webp", kind: "image" },
  { label: "texture: particles-magenta", src: "/textures/particles-magenta.webp", kind: "image" },
  { label: "texture: particles-teal", src: "/textures/particles-teal.webp", kind: "image" },

  // Textures (animated webm)
  { label: "anim: particles-gold-animated", src: "/textures/particles-gold-animated.webm", kind: "video" },
  { label: "anim: particles-magenta-animated", src: "/textures/particles-magenta-animated.webm", kind: "video" },
  { label: "anim: particles-teal-animated", src: "/textures/particles-teal-animated.webm", kind: "video" },

  // Wave mask presence check
  { label: "wave mask (svg)", src: "/waves/smh-wave-mask.svg", kind: "raw" },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)] p-6">
      <h1 className="text-2xl font-semibold mb-4">SMH Asset Diagnostics</h1>
      <p className="mb-6 text-sm opacity-80">
        Verifies presence of gradients, overlays, film grain, particle textures, and wave mask. Animated tiles should play.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-xl border p-3 bg-white/5">
            <div className="text-sm mb-2">{t.label}</div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
              {t.kind === "image" && (
                <Image src={t.src} alt={t.label} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              )}
              {t.kind === "video" && (
                <video className="w-full h-full object-cover" autoPlay loop muted playsInline src={t.src} />
              )}
              {t.kind === "raw" && (
                <iframe title={t.label} className="w-full h-full" src={t.src} />
              )}
            </div>
            <code className="text-xs opacity-75 mt-2 block">{t.src}</code>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full smh-gold-border smh-gradient-bg text-white"
          href="/api/assets/check"
          target="_blank"
          rel="noreferrer"
        >
          Run /api/assets/check
        </a>
      </div>
    </div>
  );
}
