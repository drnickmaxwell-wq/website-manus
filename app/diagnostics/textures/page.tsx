// app/diagnostics/textures/page.tsx
import Image from "next/image";

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="max-w-6xl mx-auto px-4 py-10">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
  </section>
);

const Tile = ({ src, alt }: { src: string; alt: string }) => (
  <figure className="rounded-xl overflow-hidden border border-white/10 shadow-sm bg-[var(--smh-bg)]">
    <div className="relative w-full aspect-[16/9]">
      {/* Use unoptimized to avoid domain config; these are local assets */}
      {/* @ts-expect-error */}
      <Image src={src} alt={alt} fill unoptimized style={{ objectFit: "cover" }} />
    </div>
    <figcaption className="p-3 text-sm">{alt}<div className="text-xs opacity-70">{src}</div></figcaption>
  </figure>
);

export default function Page() {
  return (
    <main className="min-h-screen smh-surface">
      <header className="smh-gradient-bg smh-wave-mask py-12 mb-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="smh-heading text-3xl font-bold">Textures & Overlays — Diagnostics</h1>
          <p className="smh-text-dim">If you can see thumbnails below, the paths are correct and deployable.</p>
        </div>
      </header>

      <Block title="Gradients">
        <Tile src="/gradients/hero-gradient-fallback.webp" alt="Hero gradient (light)" />
        <Tile src="/gradients/hero-gradient-fallback-dark.webp" alt="Hero gradient (dark)" />
        <Tile src="/gradients/hero-gradient-soft.webp" alt="Hero gradient (soft)" />
      </Block>

      <Block title="Film Grain">
        <Tile src="/textures/film-grain-desktop.webp" alt="Film grain (desktop)" />
        <Tile src="/textures/film-grain-mobile.webp" alt="Film grain (mobile)" />
        <Tile src="/textures/film-grain-dark.webp" alt="Film grain (dark)" />
        <Tile src="/textures/film-grain-mobile-dark.webp" alt="Film grain (mobile dark)" />
      </Block>

      <Block title="Particles (static)">
        <Tile src="/textures/particles-gold.webp" alt="Particles gold" />
        <Tile src="/textures/particles-magenta.webp" alt="Particles magenta" />
        <Tile src="/textures/particles-teal.webp" alt="Particles teal" />
      </Block>

      <Block title="Overlays">
        <Tile src="/overlays/glow-dust.webp" alt="Glow dust (light)" />
        <Tile src="/overlays/glow-dust-dark.webp" alt="Glow dust (dark)" />
        <Tile src="/overlays/glow-dust-mobile.webp" alt="Glow dust (mobile)" />
      </Block>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-4">Wave Mask</h2>
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-sm smh-gradient-bg smh-wave-mask h-48" />
        <p className="text-sm smh-text-dim mt-3">If the top of the band is curved, <code>/waves/smh-wave-mask.svg</code> is loading.</p>
      </section>

      <footer className="px-4 py-10 text-center smh-text-dim">Done. Visit other pages to apply these assets.</footer>
    </main>
  );
}
