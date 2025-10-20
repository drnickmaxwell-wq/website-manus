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
        videoSrc="/video/3d-implant-restorations.mp4"
        fallbackClass="smh-gradient-bg smh-wave-mask"
      />
      <section className="relative mx-auto max-w-6xl px-6 py-16 space-y-12">
        <ThreeViewer modelSrc="/models/3d-implant-restorations.glb" />
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">3D Implant Restorations</h1>
          <p>
            Manus orchestrates implant placement and restorative design simultaneously, ensuring crowns, bridges, or
            hybrids emerge with anatomical precision. Dynamic occlusion checks and soft-tissue mapping keep loading
            forces balanced long term.
          </p>
          <p>
            Our team leverages AI-informed surgical guides and surface treatments to create restorations that feel
            indistinguishable from natural teeth. Each component is calibrated to Champagne tone references for a
            cohesive, luminous finish.
          </p>
          <h2 className="smh-heading">Highlights</h2>
          <ul>
            <li>Virtual surgical rehearsal minimizes surprises on treatment day.</li>
            <li>Print-ready abutments and crowns fabricated within the same workflow.</li>
            <li>Soft tissue sculpting supported by 3D-printed emergence profiles.</li>
          </ul>
        </div>
        <Timeline />
        <FAQAccordion />
      </section>
    </main>
  );
}
