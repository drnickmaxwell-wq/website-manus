"use client";
import React from "react";
import Link from "next/link";

const plans = [
  {
    title: "Consultation",
    price: "£95",
    features: [
      "Comprehensive exam",
      "Digital scans & photos",
      "Treatment plan discussion",
      "3D visualization",
    ],
  },
  {
    title: "Veneers (per tooth)",
    price: "From £850",
    features: [
      "Digital design",
      "High-strength porcelain",
      "Natural aesthetics",
      "5-year warranty",
    ],
    featured: true,
  },
  {
    title: "Implants (per tooth)",
    price: "From £2,400",
    features: [
      "Guided placement",
      "Premium materials",
      "Same-day temporaries",
      "Lifetime support",
    ],
  },
];

export default function FeesAndPlans() {
  return (
    <section
      className="py-20"
      style={{ background: "var(--smh-sand)" }}
      aria-labelledby="fees-heading"
    >
      <div className="container-luxury">
        <div className="max-w-2xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-xs" style={{ color: "var(--smh-text-muted)" }}>
            Fees & Plans
          </p>
          <h2 id="fees-heading" className="smh-heading text-3xl md:text-4xl mt-3" style={{ color: "var(--smh-text)" }}>
            Transparent pricing, flexible options
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--smh-text-muted)" }}>
            Quality dentistry with clear costs and tailored finance solutions to suit your journey.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.title}
              className="relative overflow-hidden rounded-3xl px-8 py-10 transition-all duration-500 hover:scale-105"
              style={{
                background: plan.featured
                  ? "linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(64, 196, 180, 0.1))"
                  : "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(12px)",
                border: plan.featured
                  ? "2px solid var(--smh-accent-gold)"
                  : "1px solid rgba(212, 175, 55, 0.3)",
                boxShadow: plan.featured
                  ? "var(--glow-gold), var(--shadow-elevate-light)"
                  : "var(--shadow-elevate-light)",
              }}
            >
              {plan.featured && (
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "var(--smh-accent-gold)",
                    color: "white",
                  }}
                >
                  Popular
                </div>
              )}

              <div className="smh-film-grain absolute inset-0" aria-hidden="true" />

              <div className="relative z-10">
                <h3 className="smh-heading text-xl mb-2" style={{ color: "var(--smh-text)" }}>
                  {plan.title}
                </h3>
                <p className="text-3xl font-bold mb-6" style={{ color: "var(--smh-accent-gold)" }}>
                  {plan.price}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: "var(--smh-text-muted)" }}>
                      <span style={{ color: "var(--smh-primary-teal)" }} aria-hidden="true">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg mb-4" style={{ color: "var(--smh-text)" }}>
            Need flexible payment options?
          </p>
          <Link
            href="/patient-info/finance"
            className="inline-flex items-center gap-2 text-base font-medium transition-all duration-300 hover:gap-3"
            style={{ color: "var(--smh-accent-gold)" }}
          >
            Explore finance plans
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

