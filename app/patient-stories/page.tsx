"use client";

import React from "react";
import HeroVideo from "@/components/HeroVideo";
import BeforeAfter from "@/components/BeforeAfter";
import FAQAccordion from "@/components/FAQAccordion";

const stories = [
  {
    name: "Amelia",
    summary: "3D printed veneers with guided bite lift.",
    before: "/images/story-amelia-before.webp",
    after: "/images/story-amelia-after.webp",
  },
  {
    name: "Harper",
    summary: "Full-arch implant restoration tracked in Manus.",
    before: "/images/story-harper-before.webp",
    after: "/images/story-harper-after.webp",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <HeroVideo videoSrc="/video/patient-stories.mp4" fallbackClass="smh-gradient-bg" />
      <section className="mx-auto max-w-6xl px-6 py-16 space-y-16">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">Patient Stories</h1>
          <p>
            Discover transformations guided by Manus precision and Champagne hospitality. Each journey is bespoke, yet
            united by comfort, confidence, and timeless design.
          </p>
        </div>
        <div className="grid gap-12">
          {stories.map((story) => (
            <div key={story.name} className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <BeforeAfter beforeSrc={story.before} afterSrc={story.after} alt={`${story.name} smile story`} />
              <div className="prose prose-lg text-[var(--smh-text)]">
                <h2 className="smh-heading">{story.name}</h2>
                <p>{story.summary}</p>
                <p className="text-[var(--smh-text-muted)]">
                  “The team choreographed every step. Manus previews made my decision effortless.”
                </p>
              </div>
            </div>
          ))}
        </div>
        <FAQAccordion />
      </section>
    </main>
  );
}
