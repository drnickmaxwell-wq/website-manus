"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useMemo, useState } from "react";
import ParticlesLayer from '@/components/brand/ParticlesLayer';

type Tile = {
  label: string;
  href: string;
  kind: "img" | "svg" | "webm";
  variant?: "gold" | "magenta" | "teal";
};

const IMGS: Tile[] = [
  { label: "gradient hero-gradient-fallback", href: "/gradients/hero-gradient-fallback.webp", kind: "img" },
  { label: "gradient hero-gradient-fallback-dark", href: "/gradients/hero-gradient-fallback-dark.webp", kind: "img" },
  { label: "gradient hero-gradient-soft", href: "/gradients/hero-gradient-soft.webp", kind: "img" },
  { label: "overlay glow-dust", href: "/overlays/glow-dust.webp", kind: "img" },
  { label: "overlay glow-dust-dark", href: "/overlays/glow-dust-dark.webp", kind: "img" },
  { label: "overlay glow-dust-mobile", href: "/overlays/glow-dust-mobile.webp", kind: "img" },
  { label: "texture film-grain-desktop", href: "/textures/film-grain-desktop.webp", kind: "img" },
  { label: "texture film-grain-dark", href: "/textures/film-grain-dark.webp", kind: "img" },
  { label: "texture film-grain-mobile", href: "/textures/film-grain-mobile.webp", kind: "img" },
  { label: "texture film-grain-mobile-dark", href: "/textures/film-grain-mobile-dark.webp", kind: "img" },
  { label: "particles gold (static)", href: "/textures/particles-gold.webp", kind: "img" },
  { label: "particles magenta (static)", href: "/textures/particles-magenta.webp", kind: "img" },
  { label: "particles teal (static)", href: "/textures/particles-teal.webp", kind: "img" },
  { label: "wave mask SVG", href: "/waves/smh-wave-mask.svg", kind: "svg" },
];

const VIDS: Tile[] = [
  {
    label: "particles gold (animated)",
    href: "/textures/particles-gold-animated.webm",
    kind: "webm",
    variant: "gold",
  },
  {
    label: "particles magenta (animated)",
    href: "/textures/particles-magenta-animated.webm",
    kind: "webm",
    variant: "magenta",
  },
  {
    label: "particles teal (animated)",
    href: "/textures/particles-teal-animated.webm",
    kind: "webm",
    variant: "teal",
  },
];

function Card({ children, title, sub, aspectClass = "aspect-[4/3]" }: { children: ReactNode; title: string; sub: string; aspectClass?: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/40 p-3">
      <div className="text-xs font-semibold text-neutral-300">{title}</div>
      <div className="mb-2 text-[11px] text-neutral-500">{sub}</div>
      <div className={`${aspectClass} grid place-items-center overflow-hidden rounded-xl bg-neutral-900`}>
        {children}
      </div>
    </div>
  );
}

function ImageTile({ tile }: { tile: Tile }) {
  const [ok, setOk] = useState(true);
  if (tile.kind === "svg") {
    return (
      <Card title={tile.label} sub={tile.href}>
        <object data={tile.href} type="image/svg+xml" className="h-full w-full" />
      </Card>
    );
  }

  return (
    <Card title={tile.label} sub={tile.href}>
      {ok ? (
        <Image
          src={tile.href}
          alt={tile.label}
          width={800}
          height={600}
          className="h-full w-full object-cover"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="px-3 text-center text-sm text-red-400">image failed to load: {tile.href}</div>
      )}
    </Card>
  );
}

function VideoTile({ tile }: { tile: Tile }) {
  const [hasVideo, setHasVideo] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    async function probe() {
      try {
        const res = await fetch(tile.href, { method: "HEAD" });
        if (!active) return;
        setHasVideo(res.ok);
      } catch (error) {
        if (!active) return;
        setHasVideo(false);
      }
    }

    probe();

    return () => {
      active = false;
    };
  }, [tile.href]);

  return (
    <Card title={tile.label} sub={tile.href} aspectClass="aspect-video">
      {hasVideo === false ? (
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-900">
          <ParticlesLayer variant={tile.variant ?? "gold"} className="pointer-events-none" />
          <div className="absolute inset-x-0 bottom-3 flex justify-center">
            <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] uppercase tracking-wide text-neutral-200">
              CSS particles demo
            </span>
          </div>
        </div>
      ) : (
        <video
          key={tile.href}
          src={tile.href}
          className="h-full w-full object-cover"
          muted
          playsInline
          loop
          autoPlay
          onError={() => setHasVideo(false)}
        />
      )}
    </Card>
  );
}

export default function Page() {
  const imageTiles = useMemo(() => IMGS, []);
  const videoTiles = useMemo(() => VIDS, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">SMH Asset Diagnostics</h1>
        <Link
          href="/api/assets/check"
          className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-200 transition hover:bg-neutral-800"
        >
          Open JSON check
        </Link>
      </div>

      <h2 className="mt-8 mb-3 text-xs tracking-[0.35em] text-neutral-400">IMAGES (.WEBP / .SVG)</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {imageTiles.map((tile) => (
          <ImageTile key={tile.href} tile={tile} />
        ))}
      </div>

      <h2 className="mt-10 mb-3 text-xs tracking-[0.35em] text-neutral-400">VIDEOS (.WEBM)</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videoTiles.map((tile) => (
          <VideoTile key={tile.href} tile={tile} />
        ))}
      </div>
    </div>
  );
}
