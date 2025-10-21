"use client";
import React from "react";

type Item =
  | { kind: "image"; label: string; path: string }
  | { kind: "video"; label: string; path: string };

const IMAGES: Item[] = [
  { kind: "image", label: "gradient: hero-gradient-fallback",      path: "/gradients/hero-gradient-fallback.webp" },
  { kind: "image", label: "gradient: hero-gradient-fallback-dark", path: "/gradients/hero-gradient-fallback-dark.webp" },
  { kind: "image", label: "gradient: hero-gradient-soft",          path: "/gradients/hero-gradient-soft.webp" },
  { kind: "image", label: "overlay: glow-dust",                    path: "/overlays/glow-dust.webp" },
  { kind: "image", label: "overlay: glow-dust-dark",               path: "/overlays/glow-dust-dark.webp" },
  { kind: "image", label: "overlay: glow-dust-mobile",             path: "/overlays/glow-dust-mobile.webp" },
  { kind: "image", label: "film-grain: desktop",                   path: "/textures/film-grain-desktop.webp" },
  { kind: "image", label: "film-grain: dark",                      path: "/textures/film-grain-dark.webp" },
  { kind: "image", label: "film-grain: mobile",                    path: "/textures/film-grain-mobile.webp" },
  { kind: "image", label: "film-grain: mobile-dark",               path: "/textures/film-grain-mobile-dark.webp" },
  { kind: "image", label: "particles: gold (static)",              path: "/textures/particles-gold.webp" },
  { kind: "image", label: "particles: magenta (static)",           path: "/textures/particles-magenta.webp" },
  { kind: "image", label: "particles: teal (static)",              path: "/textures/particles-teal.webp" },
  { kind: "image", label: "wave mask (svg)",                       path: "/waves/smh-wave-mask.svg" },
] as const;

const VIDEOS: Item[] = [
  { kind: "video", label: "particles: gold (animated)",    path: "/textures/particles-gold-animated.webm" },
  { kind: "video", label: "particles: magenta (animated)", path: "/textures/particles-magenta-animated.webm" },
  { kind: "video", label: "particles: teal (animated)",    path: "/textures/particles-teal-animated.webm" },
] as const;

function Tile({ item }: { item: Item }) {
  return (
    <div className="rounded-xl border border-white/15 p-3 bg-black/10">
      <div className="mb-2 text-xs text-white/70">{item.label}<br/><span className="opacity-60">{item.path}</span></div>
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-white/5">
        {item.kind === "image" ? (
          // Use plain <img> so we avoid Next/Image domain config and see true 404s
          <img
            src={item.path}
            alt={item.label}
            loading="eager"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.3"; }}
          />
        ) : (
          <video
            src={item.path}
            // Autoplay rules
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => { (e.currentTarget as HTMLVideoElement).style.opacity = "0.3"; }}
          />
        )}
      </div>
    </div>
  );
}

export default function Diagnostics() {
  const uniq = (arr: Item[]) => {
    const seen = new Set<string>();
    return arr.filter((i) => (seen.has(i.path) ? false : (seen.add(i.path), true)));
  };

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">SMH Asset Diagnostics</h1>
          <a
            href="/api/assets/check"
            className="rounded-full border border-emerald-300/30 px-3 py-1 text-sm hover:bg-white/5"
          >
            Open JSON check
          </a>
        </header>

        <section className="mb-8">
          <h2 className="mb-3 text-sm uppercase tracking-wide text-white/60">Images (.webp / .svg)</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uniq(IMAGES).map((item) => <Tile key={item.path} item={item} />)}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm uppercase tracking-wide text-white/60">Animated Particles (.webm)</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uniq(VIDEOS).map((item) => <Tile key={item.path} item={item} />)}
          </div>
        </section>
      </div>
      {/* Keep chat bubble below tiles */}
      <style jsx global>{`
        .chat-dock, .chat-overlay, [data-chat] { z-index: 40 !important; }
      `}</style>
    </main>
  );
}
