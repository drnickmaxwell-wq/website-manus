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
        videoSrc="/video/3d-guided-implants.mp4"
        fallbackClass="smh-gradient-bg smh-wave-mask"
      />
      <section className="relative mx-auto max-w-6xl px-6 py-16 space-y-12">
        <ThreeViewer modelSrc="/models/3d-guided-implants.glb" />
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">3D Guided Implants</h1>
          <p>
            Manus builds surgical guides that respect bone density, nerve pathways, and restorative goals concurrently.
            It means faster placement, smaller incisions, and restorative outcomes that align perfectly with your final
            smile design.
          </p>
          <p>
            Navigation-ready data is synchronised with our in-clinic technology so your surgery day flows with minimal
            downtime. Each guide is printed in hypoallergenic materials aligned with Champagne standards.
          </p>
          <h2 className="smh-heading">Precision at every stage</h2>
          <ul>
            <li>CBCT fusion to map underlying anatomy safely.</li>
            <li>AI-driven drilling protocols reduce heat and trauma.</li>
            <li>Immediate temp restorations crafted in parallel.</li>
          </ul>
        </div>
        <Timeline />
        <FAQAccordion />
      </section>
    </main>
  );
}
