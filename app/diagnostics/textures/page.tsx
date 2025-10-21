"use client";

// app/diagnostics/textures/page.tsx
import React from "react";

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 p-3">
      <div className="text-sm mb-2 opacity-80 whitespace-pre-line">{label}</div>
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/20">
        {children}
      </div>
    </div>
  );
}

export default function Page() {
  const imgs = [
    { label: "gradient: hero-gradient-fallback", src: "/gradients/hero-gradient-fallback.webp" },
    { label: "gradient: hero-gradient-fallback-dark", src: "/gradients/hero-gradient-fallback-dark.webp" },
    { label: "gradient: hero-gradient-soft", src: "/gradients/hero-gradient-soft.webp" },

    { label: "overlay: glow-dust", src: "/overlays/glow-dust.webp" },
    { label: "overlay: glow-dust-dark", src: "/overlays/glow-dust-dark.webp" },
    { label: "overlay: glow-dust-mobile", src: "/overlays/glow-dust-mobile.webp" },

    { label: "texture: film-grain-desktop", src: "/textures/film-grain-desktop.webp" },
    { label: "texture: film-grain-dark", src: "/textures/film-grain-dark.webp" },
    { label: "texture: film-grain-mobile", src: "/textures/film-grain-mobile.webp" },
    { label: "texture: film-grain-mobile-dark", src: "/textures/film-grain-mobile-dark.webp" },

    { label: "texture: particles-gold", src: "/textures/particles-gold.webp" },
    { label: "texture: particles-magenta", src: "/textures/particles-magenta.webp" },
    { label: "texture: particles-teal", src: "/textures/particles-teal.webp" },
  ];

  const videos = [
    { label: "particles-gold (animated)", src: "/textures/particles-gold-animated.webm" },
    { label: "particles-magenta (animated)", src: "/textures/particles-magenta-animated.webm" },
    { label: "particles-teal (animated)", src: "/textures/particles-teal-animated.webm" },
  ];

  return (
    <main className="min-h-screen px-6 py-10 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-semibold">SMH Asset Diagnostics</h1>
      <p className="opacity-80">
        Verifies gradients/overlays/film-grain/static particle textures (.webp) and animated particles (.webm). Videos should auto-play.
      </p>

      <section>
        <h2 className="text-xl mb-4">Images (.webp)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {imgs.map(({ label, src }) => (
            <Tile key={label} label={`${label}\n${src}`}>
              <img
                src={src}
                alt={label}
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = "0.25")}
              />
            </Tile>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-4">Animated Particles (.webm)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map(({ label, src }) => (
            <Tile key={label} label={`${label}\n${src}`}>
              <video
                src={src}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </Tile>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-4">Wave Mask (SVG present)</h2>
        <Tile label="/waves/smh-wave-mask.svg">
          <div className="w-full h-full smh-gradient-bg"
               style={{
                 WebkitMaskImage: 'url("/waves/smh-wave-mask.svg")',
                 maskImage: 'url("/waves/smh-wave-mask.svg")',
                 WebkitMaskRepeat: 'no-repeat',
                 maskRepeat: 'no-repeat',
                 WebkitMaskPosition: 'center',
                 maskPosition: 'center',
                 WebkitMaskSize: 'contain',
                 maskSize: 'contain',
               }}/>
        </Tile>
      </section>
    </main>
  );
}
