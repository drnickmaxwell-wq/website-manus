import Link from "next/link";

const HOURS = [
  { label: "Mon – Thu", value: "08:00 – 19:00" },
  { label: "Fri", value: "08:00 – 17:00" },
  { label: "Sat", value: "By appointment" },
];

export default function FooterGlow() {
  return (
    <footer className="relative mt-20 bg-[color:var(--smh-bg)] text-[color:var(--smh-text)]">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[color:var(--smh-accent-gold)]/15 to-transparent blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <h2 className="smh-heading text-2xl font-semibold">Visit St Mary’s House Dental</h2>
            <p className="max-w-prose text-[color:var(--smh-text-muted)]">
              18 St Mary’s Road, Portsea, West Sussex · PO1 2AB
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="tel:+441234567890"
                className="smh-btn rounded-full px-6 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
              >
                Call +44 1234 567 890
              </Link>
              <Link
                href="mailto:hello@stmaryshouse.dental"
                className="rounded-full border border-[color:var(--smh-accent-gold)] px-6 py-3 text-sm font-semibold text-[color:var(--smh-accent-gold)] transition hover:bg-[color:var(--smh-accent-gold)] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
              >
                Email the Concierge
              </Link>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--smh-text-muted)]">Opening Hours</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {HOURS.map((item) => (
                  <li key={item.label} className="flex items-center justify-between gap-4">
                    <span>{item.label}</span>
                    <span className="text-[color:var(--smh-text-muted)]">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--smh-text-muted)]">Patient Concierge</h3>
              <p className="text-sm text-[color:var(--smh-text-muted)]">
                Reserve your appointment or request a digital smile simulation in under two minutes.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/patient-info"
                  className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold transition hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
                >
                  Patient Information
                </Link>
                <Link
                  href="/fees"
                  className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold transition hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]"
                >
                  Fees & Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[color:var(--smh-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} St Mary’s House Dental. All rights reserved.</span>
          <div className="flex flex-wrap gap-3">
            <Link href="/privacy" className="hover:text-[color:var(--smh-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[color:var(--smh-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--smh-primary-teal)]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
