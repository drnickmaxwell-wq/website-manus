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
        videoSrc="/video/3d-printed-veneers.mp4"
        fallbackClass="smh-gradient-bg smh-wave-mask"
      />
      <section className="relative mx-auto max-w-6xl px-6 py-16 space-y-12">
        <ThreeViewer modelSrc="/models/3d-printed-veneers.glb" />
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">3D Printed Veneers</h1>
          <p>
            Hyper-precise 3D printing brings ultra-thin veneer shells to life in a single session. Manus analyses
            tooth shade, translucency, and edge dynamics so each veneer reinforces the natural lightplay of your smile.
          </p>
          <p>
            The result is a bespoke smile design that celebrates texture and proportion. We map the entire facial
            envelope, calibrate it with biometric scanning, and finish with layered surface treatments that mimic
            native enamel.
          </p>
          <h2 className="smh-heading">Why it matters</h2>
          <ul>
            <li>Featherlight veneers produced in-clinic within hours.</li>
            <li>AI-controlled milling for unwavering marginal fit.</li>
            <li>Shade harmony maintained through Champagne tone references.</li>
          </ul>
        </div>
        <Timeline />
        <FAQAccordion />
      </section>
    </main>
  );
}
