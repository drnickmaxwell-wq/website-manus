export default function DesignDiagnostics() {
  return (
    <div className="min-h-[70vh] grid place-items-center p-8">
      <section className="relative w-full max-w-5xl h-80 smh-hero-gradient-bg smh-wave-mask rounded-xl overflow-hidden">
        <div aria-hidden className="smh-film-grain absolute inset-0" />
        <div aria-hidden className="smh-particles" />
        <div className="relative z-10 p-6 text-white">
          <h2 className="text-2xl font-semibold">Champagne Design Mode</h2>
          <p className="opacity-80">
            CSS/SVG gradient, wave mask, particles, and film grain active (no binaries).
          </p>
        </div>
      </section>
    </div>
  );
}
