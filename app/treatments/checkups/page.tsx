"use client";

import React from "react";
import FAQAccordion from "@/components/FAQAccordion";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <section className="relative mx-auto max-w-5xl px-6 py-16 space-y-12">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">Checkups & Prevention</h1>
          <p>
            Regular Manus-guided examinations track subtle shifts in enamel, gingiva, and bite dynamics. Our scans
            benchmark every visit so we can intervene proactively and keep treatment minimal.
          </p>
          <p>
            Expect a calm lounge experience, champagne tones throughout, and a preventive plan tailored to your
            lifestyle, nutrition, and cosmetic goals.
          </p>
        </div>
        <FAQAccordion />
      </section>
    </main>
  );
}
