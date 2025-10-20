"use client";

import React from "react";
import HeroVideo from "@/components/HeroVideo";
import ThreeViewer from "@/components/ThreeViewer";
import FAQAccordion from "@/components/FAQAccordion";
import Timeline from "@/components/Timeline";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <HeroVideo
        videoSrc="/video/digital-smile-design.mp4"
        fallbackClass="smh-gradient-bg smh-wave-mask"
      />
      <section className="relative mx-auto max-w-6xl px-6 py-16 space-y-12">
        <ThreeViewer modelSrc="/models/digital-smile-design.glb" />
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">Digital Smile Design</h1>
          <p>
            We choreograph smiles using volumetric scans, facial tracking, and Manus predictive rendering. Every
            proposal shows how teeth, lips, and expression harmonise from any angle.
          </p>
          <p>
            Clients experience interactive previews, refine preferences in real time, and approve a treatment journey
            that feels tailored yet data-backed. Final outputs respect Champagne materials, preserving the luxe SMH
            aesthetic.
          </p>
          <h2 className="smh-heading">Inclusions</h2>
          <ul>
            <li>Photogrammetry overlay to validate proportion and symmetry.</li>
            <li>Material and shade curation referencing Champagne palette values.</li>
            <li>Export-ready plans for veneers, aligners, or implants.</li>
          </ul>
        </div>
        <Timeline />
        <FAQAccordion />
      </section>
    </main>
  );
}
