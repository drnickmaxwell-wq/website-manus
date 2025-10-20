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
        videoSrc="/video/3d-same-day-restorations.mp4"
        fallbackClass="smh-gradient-bg smh-wave-mask"
      />
      <section className="relative mx-auto max-w-6xl px-6 py-16 space-y-12">
        <ThreeViewer modelSrc="/models/3d-same-day-restorations.glb" />
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">3D Same-Day Restorations</h1>
          <p>
            From scan to seated restoration in a single visit. Manus automates margin detection, axis alignment, and
            contact calibration so crowns, inlays, and onlays drop into place without iterative adjustments.
          </p>
          <p>
            Patients leave with resilient ceramic or hybrid restorations that honour the Champagne palette, matching the
            surrounding dentition in warmth and translucency.
          </p>
          <h2 className="smh-heading">Experience</h2>
          <ul>
            <li>Chairside fabrication with laboratory-grade surface finishing.</li>
            <li>Adaptive milling strategies to protect pulp health.</li>
            <li>Post-placement analytics verify bite comfort before you leave.</li>
          </ul>
        </div>
        <Timeline />
        <FAQAccordion />
      </section>
    </main>
  );
}
