"use client";

import React from "react";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";

const treatments = [
  { name: "3D Printed Veneers", href: "/treatments/3d-printed-veneers", description: "Sculpted veneer artistry printed in-clinic." },
  { name: "3D Implant Restorations", href: "/treatments/3d-implant-restorations", description: "Precision-engineered crowns and bridges." },
  { name: "3D Same-Day Restorations", href: "/treatments/3d-same-day-restorations", description: "Chairside crowns delivered in one visit." },
  { name: "Digital Smile Design", href: "/treatments/digital-smile-design", description: "Predictive modelling of your dream smile." },
  { name: "3D Guided Implants", href: "/treatments/3d-guided-implants", description: "Guided surgery for confident placement." },
  { name: "Checkups", href: "/treatments/checkups", description: "Preventive plans powered by Manus tracking." },
  { name: "Fillings", href: "/treatments/fillings", description: "Biomimetic composites that disappear." },
  { name: "Extractions", href: "/treatments/extractions", description: "Gentle procedures with regenerative follow-up." },
  { name: "Root Canal", href: "/treatments/root-canal", description: "Laser-assisted endodontics for lasting comfort." },
  { name: "Airflow Cleaning", href: "/treatments/airflow-cleaning", description: "Polishing rituals for luminous enamel." },
  { name: "Teeth Whitening", href: "/treatments/teeth-whitening", description: "Champagne brightness without sensitivity." },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <section className="mx-auto max-w-6xl px-6 py-16 space-y-16">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">All Treatments</h1>
          <p>
            Explore the full SMH Champagne portfolio. Every pathway is orchestrated through Manus, blending precision
            technology with restorative artistry.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <Link
              key={treatment.name}
              href={treatment.href}
              className="group rounded-3xl border border-[var(--smh-border)]/60 bg-[var(--smh-card)]/70 p-6 transition-transform hover:-translate-y-1 hover:border-[var(--smh-primary-teal)]"
            >
              <h2 className="smh-heading text-xl font-semibold">{treatment.name}</h2>
              <p className="mt-3 text-sm text-[var(--smh-text-muted)]">{treatment.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--smh-primary-teal)]">
                View detail
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
        <FAQAccordion />
      </section>
    </main>
  );
}
