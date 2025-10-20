"use client";

import React from "react";
import HeroVideo from "@/components/HeroVideo";
import Timeline from "@/components/Timeline";
import FAQAccordion from "@/components/FAQAccordion";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <HeroVideo videoSrc="/video/ai-smile-analysis.mp4" fallbackClass="smh-gradient-bg" />
      <section className="mx-auto max-w-6xl px-6 py-16 space-y-16">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">AI Smile Analysis</h1>
          <p>
            Upload your smile and receive an in-depth analysis powered by Manus AI. We evaluate symmetry, hue, and
            functional dynamics to recommend bespoke treatment pathways.
          </p>
          <p>
            Secure submissions, rapid turnaround, and a concierge follow-up experience keep the process elevated and
            personal.
          </p>
        </div>
        <Timeline
          items={[
            {
              title: "1. Upload & Scan",
              description: "Share images or book an in-studio scan. Our AI establishes a baseline instantly.",
            },
            {
              title: "2. AI Insight",
              description: "Receive a Champagne-aligned report covering health, esthetics, and restorative options.",
            },
            {
              title: "3. Consultation",
              description: "Meet our clinicians to refine the plan and schedule treatment with confidence.",
            },
          ]}
        />
        <FAQAccordion />
      </section>
    </main>
  );
}
