"use client";

import React from "react";
import FAQAccordion from "@/components/FAQAccordion";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <section className="relative mx-auto max-w-5xl px-6 py-16 space-y-12">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">3D Composite Fillings</h1>
          <p>
            Manus maps the decay site and surrounding structure, guiding us to preserve as much natural enamel as
            possible. We sculpt biomimetic composites in Champagne tones for seamless blending.
          </p>
          <p>
            Each filling is scanned post-placement to confirm occlusion harmony and structural integrity.
          </p>
        </div>
        <FAQAccordion />
      </section>
    </main>
  );
}
