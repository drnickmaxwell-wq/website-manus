"use client";

import React from "react";
import FAQAccordion from "@/components/FAQAccordion";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <section className="relative mx-auto max-w-5xl px-6 py-16 space-y-12">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">Luxury Teeth Whitening</h1>
          <p>
            Manus analyses your enamel composition and sensitivity markers before we curate a whitening pathway. In-clinic
            LED activation pairs with at-home serums to maintain Champagne-aligned brightness without overbleaching.
          </p>
          <p>
            The lounge environment keeps every visit indulgent, with hydration rituals and desensitising treatments built
            into each appointment.
          </p>
        </div>
        <FAQAccordion />
      </section>
    </main>
  );
}
