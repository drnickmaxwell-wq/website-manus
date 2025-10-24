'use client';

const IMGS = [
  ['/gradients/hero-gradient-fallback.webp', 'gradient hero-gradient-fallback'],
  ['/gradients/hero-gradient-fallback-dark.webp', 'gradient hero-gradient-fallback-dark'],
  ['/gradients/hero-gradient-soft.webp', 'gradient hero-gradient-soft'],
  ['/overlays/glow-dust.webp', 'overlay glow-dust'],
  ['/overlays/glow-dust-dark.webp', 'overlay glow-dust-dark'],
  ['/overlays/glow-dust-mobile.webp', 'overlay glow-dust-mobile'],
  ['/textures/film-grain-desktop.webp', 'texture film-grain-desktop'],
  ['/textures/film-grain-dark.webp', 'texture film-grain-dark'],
  ['/textures/film-grain-mobile.webp', 'texture film-grain-mobile'],
  ['/textures/film-grain-mobile-dark.webp', 'texture film-grain-mobile-dark'],
  ['/textures/particles-gold.webp', 'particles gold (static)'],
  ['/textures/particles-magenta.webp', 'particles magenta (static)'],
  ['/textures/particles-teal.webp', 'particles teal (static)'],
  ['/waves/smh-wave-mask.svg', 'wave mask SVG'],
];

const VIDS = [
  ['/textures/particles-gold-animated.webm', 'particles gold (animated)'],
  ['/textures/particles-magenta-animated.webm', 'particles magenta (animated)'],
  ['/textures/particles-teal-animated.webm', 'particles teal (animated)'],
];

export const dynamic = 'force-static';

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">SMH Asset Diagnostics</h1>
        <a
          href="/api/assets/check"
          className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-emerald-300 hover:bg-emerald-400/20"
        >
          Open JSON check
        </a>
      </header>

      <section>
        <h2 className="mb-4 text-sm font-medium tracking-wide text-white/70">IMAGES (.WEBP / .SVG)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {IMGS.map(([src, label]) => (
            <figure key={src} className="rounded-2xl border border-white/10 bg-black/30 p-3">
              <figcaption className="mb-2 text-xs text-white/70">{label}<br/><span className="text-white/40">{src}</span></figcaption>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black/40">
                {/* Using plain <img> to dodge Next image rules on diagnostics */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={label}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    const box = e.currentTarget.parentElement!;
                    box.classList.add('bg-red-900/60');
                    e.currentTarget.replaceWith(Object.assign(document.createElement('div'), {
                      className: 'p-3 text-sm text-red-200',
                      innerHTML: `image failed to load: <br/>${src}`
                    }));
                  }}
                />
              </div>
            </figure>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-medium tracking-wide text-white/70">VIDEOS (.WEBM)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VIDS.map(([src, label]) => (
            <figure key={src} className="rounded-2xl border border-white/10 bg-black/30 p-3">
              <figcaption className="mb-2 text-xs text-white/70">{label}<br/><span className="text-white/40">{src}</span></figcaption>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-black/40">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  muted autoPlay loop playsInline preload="auto"
                  onError={(e) => {
                    const box = e.currentTarget.parentElement!;
                    box.classList.add('bg-red-900/60');
                    e.currentTarget.replaceWith(Object.assign(document.createElement('div'), {
                      className: 'p-3 text-sm text-red-200',
                      innerHTML: `video failed to load: <br/>${src}`
                    }));
                  }}
                >
                  <source src={src} type="video/webm" />
                </video>
              </div>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
