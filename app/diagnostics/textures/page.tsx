"use client";
import React, { useEffect, useState } from "react";

type ImgItem = { label: string; path: string; type: "img" | "svg" };
type VidItem = { label: string; path: string; type: "video" };

const IMAGES: ImgItem[] = [
  { label: "gradient hero-gradient-fallback", path: "/gradients/hero-gradient-fallback.webp", type: "img" },
  { label: "gradient hero-gradient-fallback-dark", path: "/gradients/hero-gradient-fallback-dark.webp", type: "img" },
  { label: "gradient hero-gradient-soft", path: "/gradients/hero-gradient-soft.webp", type: "img" },
  { label: "overlay glow-dust", path: "/overlays/glow-dust.webp", type: "img" },
  { label: "overlay glow-dust-dark", path: "/overlays/glow-dust-dark.webp", type: "img" },
  { label: "overlay glow-dust-mobile", path: "/overlays/glow-dust-mobile.webp", type: "img" },
  { label: "texture film-grain-desktop", path: "/textures/film-grain-desktop.webp", type: "img" },
  { label: "texture film-grain-dark", path: "/textures/film-grain-dark.webp", type: "img" },
  { label: "texture film-grain-mobile", path: "/textures/film-grain-mobile.webp", type: "img" },
  { label: "texture film-grain-mobile-dark", path: "/textures/film-grain-mobile-dark.webp", type: "img" },
  { label: "particles gold (static)", path: "/textures/particles-gold.webp", type: "img" },
  { label: "particles magenta (static)", path: "/textures/particles-magenta.webp", type: "img" },
  { label: "particles teal (static)", path: "/textures/particles-teal.webp", type: "img" },
  { label: "wave mask SVG", path: "/waves/smh-wave-mask.svg", type: "svg" },
];

const VIDEOS: VidItem[] = [
  { label: "particles gold (animated)", path: "/textures/particles-gold-animated.webm", type: "video" },
  { label: "particles magenta (animated)", path: "/textures/particles-magenta-animated.webm", type: "video" },
  { label: "particles teal (animated)", path: "/textures/particles-teal-animated.webm", type: "video" },
];

function Box({ children, title, sub }: { children: React.ReactNode; title: string; sub: string }) {
  return (
    <div style={{
      border: "1px solid #333", borderRadius: 12, padding: 12, background: "#111",
      boxShadow: "0 0 0 1px rgba(255,255,255,.05) inset"
    }}>
      <div style={{ fontSize: 12, opacity: .8, marginBottom: 6 }}>
        <b>{title}</b><div style={{ opacity: .7 }}>{sub}</div>
      </div>
      <div style={{
        height: 220, borderRadius: 10, overflow: "hidden",
        background: "linear-gradient(135deg,#1f1f1f,#181818)"
      }}>
        {children}
      </div>
    </div>
  );
}

export default function Page() {
  const [jsonHref] = useState("/api/assets/check");

  return (
    <div style={{ color: "white", background: "#0b0c0f", minHeight: "100vh", padding: "24px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>SMH Asset Diagnostics</h1>
        <a href={jsonHref} style={{
          border: "1px solid #2d6", padding: "8px 12px", borderRadius: 999,
          textDecoration: "none", color: "#cfe", background: "rgba(0,128,96,.12)"
        }}>Open JSON check</a>
      </header>

      <p style={{ opacity: .8, marginTop: 6, marginBottom: 18 }}>
        Images (.webp/.svg) and videos (.webm). Videos are muted/looped to guarantee autoplay.
      </p>

      <h2 style={{ fontSize: 14, opacity: .8, margin: "10px 0" }}>IMAGES (.WEBP / .SVG)</h2>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12
      }}>
        {IMAGES.map(({ label, path, type }) => (
          <Box key={path} title={label} sub={path}>
            <ImgProbe src={path} isSvg={type === "svg"} />
          </Box>
        ))}
      </div>

      <h2 style={{ fontSize: 14, opacity: .8, margin: "16px 0" }}>VIDEOS (.WEBM)</h2>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12
      }}>
        {VIDEOS.map(({ label, path }) => (
          <Box key={path} title={label} sub={path}>
            <video
              src={path}
              muted
              loop
              playsInline
              autoPlay
              controls
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => {
                const el = e.currentTarget;
                el.replaceWith(errDiv(`video failed to load: ${path}`));
              }}
            />
          </Box>
        ))}
      </div>
    </div>
  );
}

function errDiv(msg: string) {
  const d = document.createElement("div");
  d.style.cssText = "height:100%;display:flex;align-items:center;justify-content:center;background:#2b1a1a;color:#ffb3b3;padding:12px;text-align:center";
  d.innerText = msg;
  return d;
}

function ImgProbe({ src, isSvg }: { src: string; isSvg?: boolean }) {
  const [info, setInfo] = useState<{ w: number; h: number } | null>(null);
  const [failed, setFailed] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setInfo({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => setFailed("image failed to load");
    img.src = src;
  }, [src]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {!failed ? (
        <img
          src={src}
          alt={src}
          style={{
            width: "100%", height: "100%", objectFit: isSvg ? "contain" : "cover",
            display: "block", filter: "none", opacity: 1
          }}
          onError={() => setFailed("image failed to load")}
        />
      ) : (
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#2b1a1a", color: "#ffb3b3" }}>
          {failed}: {src}
        </div>
      )}
      <div style={{
        position: "absolute", left: 8, bottom: 8, fontSize: 11, opacity: .8,
        background: "rgba(0,0,0,.45)", padding: "4px 6px", borderRadius: 6, border: "1px solid rgba(255,255,255,.08)"
      }}>
        {info ? `${info.w}×${info.h}` : "…"}
      </div>
    </div>
  );
}
