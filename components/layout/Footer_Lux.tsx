import React from "react";
import Link from "next/link";

const conciergeLinks = [
  { label: "Patient Portal", href: "/portal" },
  { label: "Whatsapp Concierge", href: "https://wa.me/441273453109" },
  { label: "Emergency Care", href: "/emergency" },
];

export default function Footer_Lux() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white" style={{
      borderTop: "1px solid color-mix(in oklab, var(--smh-accent-gold) 70%, transparent)",
    }}>
      <div className="absolute inset-0 smh-film-grain" aria-hidden />
      <div className="container-luxury relative py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="smh-heading text-lg uppercase tracking-[0.25em] text-sm">Contact</h3>
            <p className="mt-4 text-sm text-white/80">
              St Mary&apos;s House Dental Care
              <br /> St Mary&apos;s Road, Shoreham-by-Sea
              <br /> West Sussex BN43 5ZA
            </p>
            <p className="mt-4 text-sm text-white/80">
              <Link href="tel:+441273453109" className="hover:text-white">
                +44 (0)1273 453109
              </Link>
              <br />
              <Link href="mailto:concierge@smhdental.co.uk" className="hover:text-white">
                concierge@smhdental.co.uk
              </Link>
            </p>
          </div>
          <div>
            <h3 className="smh-heading text-lg uppercase tracking-[0.25em] text-sm">Hours</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>Mon – Fri: 8:00 – 18:00</li>
              <li>Saturday: 9:00 – 15:00</li>
              <li>Sunday: By appointment</li>
            </ul>
          </div>
          <div>
            <h3 className="smh-heading text-lg uppercase tracking-[0.25em] text-sm">Concierge</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {conciergeLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 text-xs uppercase tracking-[0.3em] text-white/50">© {new Date().getFullYear()} St Mary&apos;s House Dental Care</p>
      </div>
    </footer>
  );
}
