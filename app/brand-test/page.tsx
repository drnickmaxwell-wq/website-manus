import React from "react";

export default function BrandTestPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <section className="smh-gradient-bg smh-wave-mask relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 smh-film-grain" aria-hidden />
        <div className="absolute inset-0 smh-particles-gold" aria-hidden />
        <div className="absolute inset-0 smh-particles-teal mix-blend-screen" aria-hidden />
        <div className="absolute inset-0 smh-particles-magenta mix-blend-screen" aria-hidden />
        <div className="relative flex h-full items-center justify-center text-center">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-white/70">Brand surfaces</p>
            <h1 className="smh-heading text-3xl">Gradient & Wave Sanity Check</h1>
          </div>
        </div>
      </section>
    </main>
  );
}
