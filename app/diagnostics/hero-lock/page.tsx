export default function HeroLockDiagnostics() {
  return (
    <div className="min-h-[70vh] p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Champagne Hero Lock — Visual Proof</h1>

      <section className="relative h-64 rounded-xl overflow-hidden smh-hero-gradient-bg smh-hero-lock smh-wave-mask">
        <div aria-hidden className="smh-film-grain absolute inset-0" />
        <div aria-hidden className="smh-particles" />
        <div className="relative z-10 p-4 text-white">
          <p>135° magenta → teal gradient + gold halo</p>
          <p>SVG wave mask + procedural grain/sparkle</p>
        </div>
      </section>

      <ol className="list-decimal pl-6 text-sm opacity-80">
        <li>Gradient should run from magenta (top/left bias) → teal (right/bottom bias).</li>
        <li>Wave edge visible at the top of the band.</li>
        <li>Subtle grain present (not noisy).</li>
        <li>Sparkle barely visible; motion extremely subtle.</li>
        <li>Toggle OS reduced-motion → animations stop.</li>
      </ol>
    </div>
  );
}
