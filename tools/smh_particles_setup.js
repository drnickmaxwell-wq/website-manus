#!/usr/bin/env node
/**
 * SMH Champagne Particles — CSS Drift Setup (No ffmpeg, No native deps)
 * Use: node tools/smh_particles_setup.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const pub = p => path.join(ROOT, "public", p);
const src = p => path.join(ROOT, p);

// 1) Ensure folders
const neededDirs = [
  "public/textures",
  "public/overlays",
  "public/gradients",
  "public/waves",
  "styles/tokens",
  "components/brand",
  "app/diagnostics/textures" // optional, for preview
];
neededDirs.forEach(d => fs.mkdirSync(path.join(ROOT, d), { recursive: true }));

// 2) Verify required textures (static)
const requiredTextures = [
  "textures/film-grain-desktop.webp",
  "textures/film-grain-dark.webp",
  "textures/film-grain-mobile.webp",
  "textures/film-grain-dark-mobile.webp",
  "textures/particles-gold.webp",
  "textures/particles-magenta.webp",
  "textures/particles-teal.webp",
  "waves/smh-wave-mask.svg",
];
const missing = requiredTextures.filter(f => !fs.existsSync(pub(f)));
if (missing.length) {
  console.warn("⚠️  Missing assets in /public (add these before previewing motion):");
  missing.forEach(m => console.warn("   - /public/" + m));
} else {
  console.log("✅ Found all required static textures in /public.");
}

// 3) Write CSS: drift classes + helpers (idempotent)
const cssPath = src("styles/tokens/smh-particles-drift.css");
if (!fs.existsSync(cssPath)) {
  const css = `
/* =====================================================================
   SMH Champagne — Particle Drift Classes (CSS-only motion)
   ===================================================================== */

@keyframes smhDriftDiag {
  from { background-position: 0 0; }
  to   { background-position: 700px 350px; }
}
@keyframes smhDriftSlow {
  from { background-position: 0 0; }
  to   { background-position: 420px 210px; }
}

.smh-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.smh-film-grain {
  background-image: url("/textures/film-grain-desktop.webp");
  background-size: cover;
  background-position: center;
  mix-blend-mode: overlay;
  opacity: .10;
}
@media (prefers-color-scheme: dark) {
  .smh-film-grain { background-image: url("/textures/film-grain-dark.webp"); opacity: .08; }
}
@media (max-width: 640px) {
  .smh-film-grain { background-image: url("/textures/film-grain-mobile.webp"); }
}

.smh-particles {
  background-size: 700px 700px;
  background-repeat: repeat;
  mix-blend-mode: screen;      /* try 'plus-lighter' on Safari 17+ */
  opacity: .10;                /* tune per section */
  animation: smhDriftDiag 40s linear infinite;
}
.smh-particles.slow { animation: smhDriftSlow 60s linear infinite; }

.smh-particles.gold    { background-image: url("/textures/particles-gold.webp"); }
.smh-particles.magenta { background-image: url("/textures/particles-magenta.webp"); }
.smh-particles.teal    { background-image: url("/textures/particles-teal.webp"); }

@media (prefers-reduced-motion: reduce) {
  .smh-particles { animation: none; opacity: .08; }
}

/* Optional overlay sparkle */
.smh-glow-dust {
  background-image: url("/overlays/glow-dust.webp");
  background-size: cover;
  background-position: center;
  mix-blend-mode: overlay;
  opacity: .08;
}
@media (prefers-color-scheme: dark) {
  .smh-glow-dust { background-image: url("/overlays/glow-dust-dark.webp"); opacity: .06; }
}
@media (max-width: 640px) {
  .smh-glow-dust { background-image: url("/overlays/glow-dust-mobile.webp"); }
}
`;
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("✍️  Wrote styles/tokens/smh-particles-drift.css");
} else {
  console.log("↩︎ CSS already present: styles/tokens/smh-particles-drift.css");
}

// 4) Brand helper component: <ParticlesLayer/>
const compPath = src("components/brand/ParticlesLayer.tsx");
if (!fs.existsSync(compPath)) {
  const comp = `import React from "react";

/** Render shimmering champagne particles using CSS drift (no videos required).
 *  Usage:
 *    <div className="relative">
 *      <ParticlesLayer variant="gold" slow />
 *      ...content...
 *    </div>
 */
export default function ParticlesLayer({
  variant = "gold",
  slow = false,
  className = "",
}: {
  variant?: "gold" | "magenta" | "teal";
  slow?: boolean;
  className?: string;
}) {
  const classes = [
    "smh-layer smh-particles",
    variant,
    slow ? "slow" : "",
    className,
  ].filter(Boolean).join(" ");
  return <div aria-hidden className={classes} />;
}
`;
  fs.writeFileSync(compPath, comp, "utf8");
  console.log("✍️  Wrote components/brand/ParticlesLayer.tsx");
} else {
  console.log("↩︎ Component already present: components/brand/ParticlesLayer.tsx");
}

// 5) Optional diagnostics preview page
const diagPath = src("app/diagnostics/textures/page.tsx");
if (!fs.existsSync(diagPath)) {
  const page = `export default function Page() {
  return (
    <main className="min-h-screen p-6 space-y-10">
      <section>
        <h1 className="text-2xl font-semibold">Textures — Static & Drift</h1>
        <p className="opacity-70">If the tiles below are blank, an image is missing.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {["film-grain-desktop.webp","film-grain-dark.webp","film-grain-mobile.webp"].map((f) => (
            <div key={f} className="relative aspect-video rounded-xl overflow-hidden ring-1 ring-white/10">
              <img src={"/textures/"+f} alt={f} className="object-cover w-full h-full" />
              <div className="absolute bottom-2 left-2 text-xs bg-black/50 px-2 py-1 rounded">{f}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Particles — CSS Drift</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {["gold","magenta","teal"].map((c) => (
            <div key={c} className="relative aspect-video rounded-xl overflow-hidden ring-1 ring-white/10">
              <div className={"absolute inset-0 smh-particles "+c}></div>
              <div className="absolute inset-0 smh-film-grain"></div>
              <div className="absolute bottom-2 left-2 text-xs bg-black/50 px-2 py-1 rounded">{c}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
`;
  fs.writeFileSync(diagPath, page, "utf8");
  console.log("✍️  Wrote app/diagnostics/textures/page.tsx");
} else {
  console.log("↩︎ Diagnostics page already present: app/diagnostics/textures/page.tsx");
}

// 6) Print next steps
console.log(`
Next steps:
1) Import the drift CSS once (global):
   • app/layout.tsx  →  import "../styles/tokens/smh-particles-drift.css";
   or
   • app/globals.css →  @import "../styles/tokens/smh-particles-drift.css";

2) Use the component:
   <div className="relative">
     <ParticlesLayer variant="gold" slow />
     {/* your hero or section content */}
   </div>

3) Visit /diagnostics/textures to visually verify.
`);
