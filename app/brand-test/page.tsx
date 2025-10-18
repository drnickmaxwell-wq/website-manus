export default function BrandTestPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-6 py-16 text-center text-[color:var(--smh-text)]">
      <h1 className="smh-heading text-3xl font-semibold">Champagne Token Surface Check</h1>
      <p className="max-w-xl text-[color:var(--smh-text-muted)]">
        The block below should display the Champagne gradient with wave mask, film grain, and particle overlays.
      </p>
      <div className="relative h-[300px] w-full overflow-hidden smh-hero-gradient-bg smh-gradient-bg smh-wave-mask rounded-3xl">
        <div className="absolute inset-0 smh-film-grain" aria-hidden />
        <div className="absolute inset-0 smh-particles-gold" aria-hidden />
        <div className="absolute inset-0 smh-particles-teal" aria-hidden />
        <div className="absolute inset-0 smh-particles-magenta" aria-hidden />
      </div>
    </div>
  );
}
