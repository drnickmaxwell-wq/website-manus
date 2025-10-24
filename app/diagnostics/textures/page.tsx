import fs from "node:fs";
import path from "node:path";
import React from "react";

type MediaTileData = {
  label: string;
  src: string;
  kind: "image" | "video";
  isSvg?: boolean;
};

type ReplacementRecord = {
  target: string;
  source: string;
};

const IMAGE_TILES: MediaTileData[] = [
  { label: "gradient hero-gradient-fallback", src: "/gradients/hero-gradient-fallback.webp", kind: "image" },
  { label: "gradient hero-gradient-fallback-dark", src: "/gradients/hero-gradient-fallback-dark.webp", kind: "image" },
  { label: "gradient hero-gradient-soft", src: "/gradients/hero-gradient-soft.webp", kind: "image" },
  { label: "overlay glow-dust", src: "/overlays/glow-dust.webp", kind: "image" },
  { label: "overlay glow-dust-dark", src: "/overlays/glow-dust-dark.webp", kind: "image" },
  { label: "overlay glow-dust-mobile", src: "/overlays/glow-dust-mobile.webp", kind: "image" },
  { label: "texture film-grain-desktop", src: "/textures/film-grain-desktop.webp", kind: "image" },
  { label: "texture film-grain-dark", src: "/textures/film-grain-dark.webp", kind: "image" },
  { label: "texture film-grain-mobile", src: "/textures/film-grain-mobile.webp", kind: "image" },
  { label: "texture film-grain-mobile-dark", src: "/textures/film-grain-mobile-dark.webp", kind: "image" },
  { label: "particles gold (static)", src: "/textures/particles-gold.webp", kind: "image" },
  { label: "particles magenta (static)", src: "/textures/particles-magenta.webp", kind: "image" },
  { label: "particles teal (static)", src: "/textures/particles-teal.webp", kind: "image" },
  { label: "wave mask SVG", src: "/waves/smh-wave-mask.svg", kind: "image", isSvg: true },
];

const VIDEO_TILES: MediaTileData[] = [
  { label: "particles gold (animated)", src: "/textures/particles-gold-animated.webm", kind: "video" },
  { label: "particles magenta (animated)", src: "/textures/particles-magenta-animated.webm", kind: "video" },
  { label: "particles teal (animated)", src: "/textures/particles-teal-animated.webm", kind: "video" },
];

const PUBLIC_DIR = path.join(process.cwd(), "public");
const CORRUPT_SIZE_THRESHOLD = 5 * 1024; // 5 KB

function statIfExists(filePath: string) {
  try {
    return fs.statSync(filePath);
  } catch {
    return null;
  }
}

function ensureDarkGrainIntegrity(): ReplacementRecord[] {
  if (typeof window !== "undefined") {
    return [];
  }

  const replacements: ReplacementRecord[] = [];

  const candidates: { target: string; alternates: string[] }[] = [
    {
      target: "/textures/film-grain-dark.webp",
      alternates: [
        "/film-grain-dark-desktop.webp",
        "/film-grain-dark-mobile.webp",
        "/textures/film-grain-dark-desktop.webp",
        "/textures/film-grain-dark-mobile.webp",
      ],
    },
    {
      target: "/textures/film-grain-mobile-dark.webp",
      alternates: [
        "/film-grain-dark-mobile.webp",
        "/film-grain-dark-desktop.webp",
        "/textures/film-grain-dark-mobile.webp",
        "/textures/film-grain-dark-desktop.webp",
      ],
    },
  ];

  for (const { target, alternates } of candidates) {
    const targetAbs = path.join(PUBLIC_DIR, target.replace(/^\/+/, ""));
    const targetStat = statIfExists(targetAbs);
    if (!targetStat || !targetStat.isFile() || targetStat.size >= CORRUPT_SIZE_THRESHOLD) {
      continue;
    }

    let chosen: { rel: string; abs: string; size: number } | null = null;

    for (const alt of alternates) {
      if (alt === target) continue;
      const altAbs = path.join(PUBLIC_DIR, alt.replace(/^\/+/, ""));
      const altStat = statIfExists(altAbs);
      if (!altStat || !altStat.isFile()) continue;
      if (altStat.size <= targetStat.size || altStat.size < CORRUPT_SIZE_THRESHOLD) continue;
      if (!chosen || altStat.size > chosen.size) {
        chosen = { rel: alt, abs: altAbs, size: altStat.size };
      }
    }

    if (chosen) {
      fs.copyFileSync(chosen.abs, targetAbs);
      console.log(`[diagnostics] swapped ${target} <- ${chosen.rel}`);
      replacements.push({ target, source: chosen.rel });
    }
  }

  return replacements;
}

const replacementLog = ensureDarkGrainIntegrity();

export default function Page() {
  return (
    <DiagnosticsClient imageTiles={IMAGE_TILES} videoTiles={VIDEO_TILES} replacements={replacementLog} />
  );
}

function DiagnosticsClient({
  imageTiles,
  videoTiles,
  replacements,
}: {
  imageTiles: MediaTileData[];
  videoTiles: MediaTileData[];
  replacements: ReplacementRecord[];
}) {
  "use client";
  const jsonHref = "/api/assets/check";

  return (
    <div style={{ color: "white", background: "#0b0c0f", minHeight: "100vh", padding: "24px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>SMH Asset Diagnostics</h1>
        <a
          href={jsonHref}
          style={{
            border: "1px solid #2d6",
            padding: "8px 12px",
            borderRadius: 999,
            textDecoration: "none",
            color: "#cfe",
            background: "rgba(0,128,96,.12)",
          }}
        >
          Open JSON check
        </a>
      </header>

      <p style={{ opacity: 0.8, marginTop: 6, marginBottom: 18 }}>
        Images (.webp/.svg) and videos (.webm). Videos are muted/looped to guarantee autoplay.
      </p>

      {replacements.length > 0 && (
        <div
          style={{
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 18,
            background: "rgba(26,50,40,.45)",
            fontSize: 12,
            lineHeight: 1.4,
          }}
        >
          <b>Replaced dark grain assets:</b>
          <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
            {replacements.map((item) => (
              <li key={`${item.target}-${item.source}`}>
                {item.target} &larr; {item.source}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 style={{ fontSize: 14, opacity: 0.8, margin: "10px 0" }}>IMAGES (.WEBP / .SVG)</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {imageTiles.map(({ label, src, kind, isSvg }) => (
          <Box key={src} title={label} sub={src}>
            <MediaTile src={src} kind={kind} isSvg={isSvg} />
          </Box>
        ))}
      </div>

      <h2 style={{ fontSize: 14, opacity: 0.8, margin: "16px 0" }}>VIDEOS (.WEBM)</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {videoTiles.map(({ label, src, kind }) => (
          <Box key={src} title={label} sub={src}>
            <MediaTile src={src} kind={kind} />
          </Box>
        ))}
      </div>
    </div>
  );
}

function Box({
  children,
  title,
  sub,
}: {
  children: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: 12,
        padding: 12,
        background: "#111",
        boxShadow: "0 0 0 1px rgba(255,255,255,.05) inset",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>
        <b>{title}</b>
        <div style={{ opacity: 0.7 }}>{sub}</div>
      </div>
      <div
        style={{
          height: 220,
          borderRadius: 10,
          overflow: "hidden",
          background: "linear-gradient(135deg,#1f1f1f,#181818)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MediaTile({ src, kind, isSvg }: { src: string; kind: "image" | "video"; isSvg?: boolean }) {
  "use client";
  const [error, setError] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<{ w: number; h: number } | null>(null);

  const bust = typeof window === "undefined" ? "" : `?v=${new Date().toISOString().slice(0, 10)}`;
  const srcWithBuster = `${src}${bust}`;

  React.useEffect(() => {
    if (kind !== "image") return;
    setInfo(null);
    setError(null);
    const img = new Image();
    img.onload = () => setInfo({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => setError("image failed to load");
    img.src = srcWithBuster;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [kind, srcWithBuster]);

  React.useEffect(() => {
    if (kind === "video") {
      setError(null);
    }
  }, [kind, srcWithBuster]);

  const showError = (message: string) => {
    setError(message);
  };

  if (error) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2b1a1a",
          color: "#ffb3b3",
          padding: "12px",
          textAlign: "center",
          fontSize: 12,
          lineHeight: 1.4,
        }}
      >
        {error}: {src}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {kind === "image" ? (
        <img
          src={srcWithBuster}
          alt={src}
          loading="eager"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: isSvg ? "contain" : "cover",
            display: "block",
          }}
          onError={() => showError("image failed to load")}
        />
      ) : (
        <video
          key={srcWithBuster}
          className="w-full h-full rounded-lg bg-black/30"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          controls={false}
          poster="/gradients/hero-gradient-soft.webp"
          onError={() => {
            if (src.includes("magenta")) {
              console.log("MAGENTA_WEBM_DECODE_FAIL");
            }
            showError("video failed to load");
          }}
        >
          <source src={srcWithBuster} type="video/webm" />
        </video>
      )}

      {kind === "image" && (
        <div
          style={{
            position: "absolute",
            left: 8,
            bottom: 8,
            fontSize: 11,
            opacity: 0.8,
            background: "rgba(0,0,0,.45)",
            padding: "4px 6px",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          {info ? `${info.w}×${info.h}` : "…"}
        </div>
      )}
    </div>
  );
}
