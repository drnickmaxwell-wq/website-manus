"use client";

import React from "react";
import FAQAccordion from "@/components/FAQAccordion";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <section className="relative mx-auto max-w-5xl px-6 py-16 space-y-12">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">Gentle Extractions</h1>
          <p>
            When removal is necessary, Manus models the roots and bone so we can section teeth precisely and preserve
            your future restorative site. We pair the procedure with platelet-rich healing protocols.
          </p>
          <p>
            Comfort is elevated through calming lighting, Champagne-toned suites, and follow-up regeneration scans to
            ensure rapid recovery.
          </p>
        </div>
        <FAQAccordion />
      </section>
    </main>
  );
}
