"use client";

import React from "react";
import FAQAccordion from "@/components/FAQAccordion";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <section className="relative mx-auto max-w-5xl px-6 py-16 space-y-12">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">Airflow Cleaning</h1>
          <p>
            Experience spa-level maintenance with our airflow technology. Manus tracks stain accumulation, enabling us
            to target and polish without abrasion.
          </p>
          <p>
            Champagne tones and aromatherapy keep the visit relaxed while your smile regains luminous clarity.
          </p>
        </div>
        <FAQAccordion />
      </section>
    </main>
  );
}
