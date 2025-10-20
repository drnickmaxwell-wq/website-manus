"use client";

import React from "react";
import HeroVideo from "@/components/HeroVideo";
import BeforeAfter from "@/components/BeforeAfter";
import FinanceCard from "@/components/FinanceCard";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <HeroVideo videoSrc="/video/our-team.mp4" fallbackClass="smh-gradient-bg" />
      <section className="mx-auto max-w-6xl px-6 py-16 space-y-16">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">Our Team</h1>
          <p>
            Meet the multidisciplinary specialists behind SMH Champagne. Each clinician blends artistry with technology,
            using Manus AI to craft restorative outcomes that feel effortless and luxurious.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <FinanceCard
            title="Cosmetic Dentistry"
            description="Veneer artists who balance facial harmony with long-term oral health."
            cta="Discover artisans"
          />
          <FinanceCard
            title="Implantology"
            description="Surgical experts using guided workflows for secure, swift placements."
            cta="Meet the surgeons"
          />
          <FinanceCard
            title="Wellness & Aftercare"
            description="Therapists curating preventive programs and comfort-first experiences."
            cta="Explore the lounge"
          />
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="prose prose-lg text-[var(--smh-text)]">
            <h2 className="smh-heading">Philosophy</h2>
            <p>
              Our team collaborates in weekly design rounds, reviewing Manus simulations together to ensure every detail
              aligns with SMH Champagne standards. This ritual keeps the practice boutique yet data-driven.
            </p>
          </div>
          <BeforeAfter
            beforeSrc="/images/team-lab-before.webp"
            afterSrc="/images/team-lab-after.webp"
            alt="Team crafted smile transformation"
          />
        </div>
      </section>
    </main>
  );
}
