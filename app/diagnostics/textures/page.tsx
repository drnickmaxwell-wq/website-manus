import Link from "next/link";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";

type AssetGroup = {
  title: string;
  description?: string;
  items: AssetDescriptor[];
};
import { ReactNode, useEffect, useMemo, useState } from "react";
import ParticlesLayer from '@/components/brand/ParticlesLayer';

type AssetDescriptor = {
  label: string;
  href: string;
  kind: "webp" | "svg";
};

type VideoDescriptor = {
  label: string;
  href: string;
};

type DimensionInfo = {
  width: number;
  height: number;
};

type LoadedAsset = AssetDescriptor & {
  dimensions: DimensionInfo | null;
  size: number;
  missing: boolean;
};

type LoadedVideo = VideoDescriptor & {
  size: number;
};

const PUBLIC_ROOT = join(process.cwd(), "public");

const IMAGE_GROUPS: AssetGroup[] = [
  {
    title: "Gradients",
    items: [
      { label: "Hero gradient fallback", href: "/gradients/hero-gradient-fallback.webp", kind: "webp" },
      { label: "Hero gradient fallback (dark)", href: "/gradients/hero-gradient-fallback-dark.webp", kind: "webp" },
      { label: "Hero gradient soft", href: "/gradients/hero-gradient-soft.webp", kind: "webp" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { label: "Glow dust", href: "/overlays/glow-dust.webp", kind: "webp" },
      { label: "Glow dust (dark)", href: "/overlays/glow-dust-dark.webp", kind: "webp" },
      { label: "Glow dust mobile", href: "/overlays/glow-dust-mobile.webp", kind: "webp" },
    ],
  },
  {
    title: "Film grain",
    description: "Desktop / dark / mobile variants",
    items: [
      { label: "Film grain desktop", href: "/textures/film-grain-desktop.webp", kind: "webp" },
      { label: "Film grain dark", href: "/textures/film-grain-dark.webp", kind: "webp" },
      { label: "Film grain mobile", href: "/textures/film-grain-mobile.webp", kind: "webp" },
      { label: "Film grain mobile dark", href: "/textures/film-grain-mobile-dark.webp", kind: "webp" },
    ],
  },
  {
    title: "Particles (static)",
    description: "CSS textures used when animated clips are missing",
    items: [
      { label: "Gold particles", href: "/textures/particles-gold.webp", kind: "webp" },
      { label: "Magenta particles", href: "/textures/particles-magenta.webp", kind: "webp" },
      { label: "Teal particles", href: "/textures/particles-teal.webp", kind: "webp" },
    ],
  },
  {
    title: "Wave mask (SVG)",
    items: [{ label: "Wave highlight mask", href: "/waves/smh-wave-mask.svg", kind: "svg" }],
  },
];

const VIDEO_GROUP: { title: string; items: VideoDescriptor[] } = {
  title: "Videos (animated particles)",
  items: [
    { label: "Gold particles animated", href: "/textures/particles-gold-animated.webm" },
    { label: "Magenta particles animated", href: "/textures/particles-magenta-animated.webm" },
    { label: "Teal particles animated", href: "/textures/particles-teal-animated.webm" },
  ],
};

function loadBuffer(relative: string) {
  const normalized = relative.replace(/^\/+/, "");
  const fullPath = join(PUBLIC_ROOT, normalized);
  try {
    return readFileSync(fullPath);
  } catch {
    return null;
  }
}

function statSize(relative: string) {
  const normalized = relative.replace(/^\/+/, "");
  const fullPath = join(PUBLIC_ROOT, normalized);
  try {
    return statSync(fullPath).size;
  } catch {
    return 0;
  }
}

function parseWebpDimensions(buffer: Buffer): DimensionInfo | null {
  if (buffer.length < 30) return null;
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }

  const chunkHeader = buffer.toString("ascii", 12, 16);
  const chunkDataOffset = 20;

  if (chunkHeader === "VP8 ") {
    if (buffer.length < chunkDataOffset + 10) return null;
    if (buffer[chunkDataOffset + 3] !== 0x9d || buffer[chunkDataOffset + 4] !== 0x01 || buffer[chunkDataOffset + 5] !== 0x2a) {
      return null;
    }
    const widthMinusOne = buffer.readUInt16LE(chunkDataOffset + 6) & 0x3fff;
    const heightMinusOne = buffer.readUInt16LE(chunkDataOffset + 8) & 0x3fff;
    return { width: widthMinusOne + 1, height: heightMinusOne + 1 };
  }

  if (chunkHeader === "VP8L") {
    if (buffer.length < chunkDataOffset + 5) return null;
    const data = buffer.readUInt32LE(chunkDataOffset + 1);
    const width = (data & 0x3fff) + 1;
    const height = ((data >> 14) & 0x3fff) + 1;
    return { width, height };
  }

  if (chunkHeader === "VP8X") {
    const widthMinusOne = buffer.readUIntLE(24, 3);
    const heightMinusOne = buffer.readUIntLE(27, 3);
    return { width: widthMinusOne + 1, height: heightMinusOne + 1 };
  }

  return null;
}

function parseSvgDimensions(buffer: Buffer): DimensionInfo | null {
  const text = buffer.toString("utf8");
  const widthMatch = text.match(/width=["']([0-9]+(?:\.[0-9]+)?)/i);
  const heightMatch = text.match(/height=["']([0-9]+(?:\.[0-9]+)?)/i);
  const viewBoxMatch = text.match(/viewBox=["']([0-9.\s-]+)/i);

  let width = widthMatch ? Number(widthMatch[1]) : undefined;
  let height = heightMatch ? Number(heightMatch[1]) : undefined;

  if ((!width || !height) && viewBoxMatch) {
    const parts = viewBoxMatch[1].trim().split(/\s+/);
    if (parts.length === 4) {
      const maybeWidth = Number(parts[2]);
      const maybeHeight = Number(parts[3]);
      width = width ?? maybeWidth;
      height = height ?? maybeHeight;
    }
  }

  if (width && height) {
    return { width, height };
  }

  return null;
}

function loadImage(asset: AssetDescriptor): LoadedAsset {
  const buffer = loadBuffer(asset.href);
  const size = buffer ? buffer.length : 0;
  let dimensions: DimensionInfo | null = null;

  if (buffer) {
    if (asset.kind === "webp") {
      dimensions = parseWebpDimensions(buffer);
    } else if (asset.kind === "svg") {
      dimensions = parseSvgDimensions(buffer);
    }
  }

  return {
    ...asset,
    dimensions,
    size,
    missing: !buffer,
  };
}

function loadVideo(asset: VideoDescriptor): LoadedVideo {
  return {
    ...asset,
    size: statSize(asset.href),
  };
}

function formatDimensions(dimensions: DimensionInfo | null) {
  if (!dimensions) return "unknown";
  return `${dimensions.width}×${dimensions.height}`;
}

export default function Page() {
  const imageGroups = IMAGE_GROUPS.map((group) => ({
    ...group,
    items: group.items.map(loadImage),
  }));

  const videos = VIDEO_GROUP.items.map(loadVideo);
  const overlayPaths = {
    default: "/overlays/glow-dust.webp",
    dark: "/overlays/glow-dust-dark.webp",
    mobile: "/overlays/glow-dust-mobile.webp",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="mb-6 rounded-xl border border-neutral-800/70 bg-neutral-900/40 px-4 py-3 text-xs text-neutral-300">
        Champagne hero overlays now resolve to {overlayPaths.default} (dark: {overlayPaths.dark}, mobile: {overlayPaths.mobile}).
      </p>
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">SMH Asset Diagnostics</h1>
          <p className="text-sm text-neutral-400">Static textures, overlays, masks and animated layers.</p>
        </div>
        <Link
          href="/api/assets/check"
          className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-200 transition hover:bg-neutral-800"
        >
          Open JSON check
        </Link>
      </header>

      <div className="mt-10 space-y-12">
        {imageGroups.map((group) => (
          <section key={group.title} aria-labelledby={group.title.replace(/\s+/g, "-").toLowerCase()}>
            <header className="mb-4">
              <h2
                id={group.title.replace(/\s+/g, "-").toLowerCase()}
                className="text-xs font-semibold tracking-[0.35em] text-neutral-400"
              >
                {group.title.toUpperCase()}
              </h2>
              {group.description ? (
                <p className="mt-1 text-sm text-neutral-500">{group.description}</p>
              ) : null}
            </header>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => {
                const fallback = item.dimensions === null;
                const aspectStyle = item.dimensions
                  ? { aspectRatio: `${item.dimensions.width} / ${item.dimensions.height}` }
                  : undefined;

                return (
                  <figure
                    key={item.href}
                    data-fallback={fallback ? "true" : "false"}
                    className="group relative overflow-hidden rounded-2xl border border-neutral-800/70 bg-neutral-950/40 p-3"
                  >
                    <div className="mb-3 flex items-center justify-between text-xs text-neutral-400">
                      <span className="rounded-full bg-neutral-900/70 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide">
                        {formatDimensions(item.dimensions)}
                      </span>
                      <span className="truncate text-neutral-500">{item.href}</span>
                    </div>
                    <div
                      className="relative overflow-hidden rounded-xl border border-neutral-900/70 bg-neutral-900"
                      style={aspectStyle}
                    >
                      {item.kind === "svg" ? (
                        <object data={item.href} type="image/svg+xml" className="h-full w-full" aria-label={item.label} />
                      ) : (
                        <img src={item.href} alt={item.label} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                      <span>{item.label}</span>
                      <span>{item.size > 0 ? `${item.size.toLocaleString()} B` : "missing"}</span>
                    </div>
                    <span className="hidden items-center gap-2 rounded-md border border-red-500/40 bg-red-950/40 px-2 py-1 text-xs font-semibold text-red-300 data-[fallback=true]:mt-3 data-[fallback=true]:flex">
                      Unable to detect image dimensions — verify asset integrity.
                    </span>
                    {item.missing ? (
                      <span className="mt-3 flex items-center gap-2 rounded-md border border-red-500/40 bg-red-950/40 px-2 py-1 text-xs font-semibold text-red-300">
                        File missing on disk.
                      </span>
                    ) : null}
                  </figure>
                );
              })}
            </div>
          </section>
        ))}

        <section aria-labelledby="animated-videos">
          <header className="mb-4">
            <h2 id="animated-videos" className="text-xs font-semibold tracking-[0.35em] text-neutral-400">
              {VIDEO_GROUP.title.toUpperCase()}
            </h2>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <figure
                key={video.href}
                className="relative overflow-hidden rounded-2xl border border-neutral-800/70 bg-neutral-950/40 p-3"
              >
                <div className="mb-3 flex items-center justify-between text-xs text-neutral-400">
                  <span className="rounded-full bg-neutral-900/70 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide">
                    webm source
                  </span>
                  <span className="truncate text-neutral-500">{video.href}</span>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-neutral-900/70 bg-black">
                  <video
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                  >
                    <source src={video.href} type="video/webm" />
                  </video>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                  <span>{video.label}</span>
                  <span>{video.size > 0 ? `${video.size.toLocaleString()} B` : "missing"}</span>
                </div>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
