import React from "react";

const assets = [
  { label: "Film grain desktop", path: "/textures/film-grain-desktop.webp" },
  { label: "Film grain dark", path: "/textures/film-grain-dark.webp" },
  { label: "Film grain mobile", path: "/textures/film-grain-mobile.webp" },
  { label: "Film grain mobile dark", path: "/textures/film-grain-mobile-dark.webp" },
  { label: "Particles gold", path: "/textures/particles-gold.webp" },
  { label: "Particles gold animated", path: "/textures/particles-gold-animated.webm" },
  { label: "Particles magenta", path: "/textures/particles-magenta.webp" },
  { label: "Particles magenta animated", path: "/textures/particles-magenta-animated.webm" },
  { label: "Particles teal", path: "/textures/particles-teal.webp" },
  { label: "Particles teal animated", path: "/textures/particles-teal-animated.webm" },
  { label: "Glow dust", path: "/overlays/glow-dust.webp" },
  { label: "Glow dust dark", path: "/overlays/glow-dust-dark.webp" },
  { label: "Glow dust mobile", path: "/overlays/glow-dust-mobile.webp" },
  { label: "Hero gradient fallback", path: "/gradients/hero-gradient-fallback.webp" },
  { label: "Hero gradient fallback dark", path: "/gradients/hero-gradient-fallback-dark.webp" },
  { label: "Hero gradient soft", path: "/gradients/hero-gradient-soft.webp" },
  { label: "Smh wave mask", path: "/waves/smh-wave-mask.svg" },
  { label: "Hero waves alone", path: "/waves/hero-waves-alone.png" }
];

async function getStatuses() {
  const results = await Promise.all(
    assets.map(async (asset) => {
      try {
        const res = await fetch(asset.path, { method: "HEAD" });
        return { ...asset, found: res.ok };
      } catch (e) {
        return { ...asset, found: false };
      }
    })
  );
  return results;
}

export default async function Page() {
  const statuses = await getStatuses();
  return (
    <div style={{ padding: "20px" }}>
      <h1>Assets Diagnostic</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Label</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Path</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((s) => (
            <tr key={s.path}>
              <td style={{ padding: "4px 8px" }}>{s.label}</td>
              <td style={{ padding: "4px 8px" }}>{s.path}</td>
              <td style={{ padding: "4px 8px" }}>{s.found ? "Found" : "Missing"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundImage: `url('/gradients/hero-gradient-soft.webp'), url('/textures/film-grain-desktop.webp')`,
            backgroundSize: "cover, cover",
            border: "1px solid #ccc"
          }}
        />
        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundImage: `url('/waves/hero-waves-alone.png'), url('/overlays/glow-dust.webp')`,
            backgroundSize: "cover, cover",
            border: "1px solid #ccc"
          }}
        />
      </div>
    </div>
  );
}
