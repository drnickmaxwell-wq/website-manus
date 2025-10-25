"use client";
import React from "react";
import Link from "next/link";

const services = [
  {
    title: "3D Veneers",
    description: "Ultra-thin porcelain crafted with digital precision for a natural, luminous finish.",
    href: "/treatments/veneers",
    icon: "✨",
  },
  {
    title: "Dental Implants",
    description: "Guided placement and same-day restorations anchored in bone for lasting confidence.",
    href: "/treatments/implants",
    icon: "⚡",
  },
  {
    title: "Clear Aligners",
    description: "Invisible orthodontics designed and tracked in 3D for predictable smile transformation.",
    href: "/treatments/aligners",
    icon: "💎",
  },
];

export default function SignatureServices() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900" aria-labelledby="signature-services-heading">
      <div className="container-luxury">
        <div className="max-w-2xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-xs" style={{ color: "var(--smh-text-muted)" }}>
            Signature Services
          </p>
          <h2 id="signature-services-heading" className="smh-heading text-3xl md:text-4xl mt-3" style={{ color: "var(--smh-text)" }}>
            Precision meets artistry
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--smh-text-muted)" }}>
            Three pillars of digital dentistry, each delivered with quiet luxury and clinical excellence.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-white/5 backdrop-blur-xl px-8 py-10 transition-all duration-500 ease-out hover:-translate-y-1"
              style={{
                border: "1px solid color-mix(in oklab, var(--smh-accent-gold) 70%, transparent)",
                boxShadow: "var(--glow-gold), var(--shadow-elevate-light)",
                transform: `perspective(1000px) rotateX(${idx % 2 === 0 ? "2deg" : "-2deg"}) rotateY(${idx === 1 ? "1deg" : "-1deg"})`,
              }}
            >
              {/* Film grain overlay */}
              <div className="smh-film-grain absolute inset-0" aria-hidden="true" />

              <div className="relative z-10">
                <div
                  className="text-4xl mb-4"
                  style={{ filter: "drop-shadow(var(--glow-gold))" }}
                  aria-hidden="true"
                >
                  {service.icon}
                </div>
                <h3 className="smh-heading text-2xl mb-3" style={{ color: "var(--smh-text)" }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--smh-text-muted)" }}>
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3"
                  style={{ color: "var(--smh-accent-gold)" }}
                >
                  Learn more
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105"
            style={{
              border: "1px solid color-mix(in oklab, var(--smh-accent-gold) 70%, transparent)",
              boxShadow: "var(--glow-gold)",
              color: "var(--smh-text)",
              background: "linear-gradient(135deg, rgba(249, 232, 195, 0.3), rgba(212, 175, 55, 0.1))",
            }}
          >
            View all treatments
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

