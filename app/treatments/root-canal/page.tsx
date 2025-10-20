"use client";

import React from "react";
import FAQAccordion from "@/components/FAQAccordion";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <section className="relative mx-auto max-w-5xl px-6 py-16 space-y-12">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">Root Canal Therapy</h1>
          <p>
            Manus visualises canal morphology in 3D so our endodontic team can clean, shape, and seal with absolute
            accuracy. Laser-assisted disinfection and biomimetic sealing materials keep treated teeth resilient.
          </p>
          <p>
            The experience is tailored to remain calm and restorative, with Champagne-inspired aesthetics grounding the
            treatment environment.
          </p>
        </div>
        <FAQAccordion />
      </section>
    </main>
  );
}
