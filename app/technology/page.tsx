"use client";

import React from "react";
import HeroVideo from "@/components/HeroVideo";
import ThreeViewer from "@/components/ThreeViewer";
import Timeline from "@/components/Timeline";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <HeroVideo videoSrc="/video/technology.mp4" fallbackClass="smh-gradient-bg" />
      <section className="mx-auto max-w-6xl px-6 py-16 space-y-16">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">Technology</h1>
          <p>
            Manus AI anchors every treatment at SMH Champagne. Our lab is equipped with 3D printers, robotic milling,
            and guided surgery suites to translate digital plans into reality.
          </p>
        </div>
        <ThreeViewer modelSrc="/models/technology-suite.glb" />
        <Timeline
          items={[
            {
              title: "Immersive Diagnostics",
              description: "CBCT, intraoral scanning, and photogrammetry combine to capture your oral ecosystem.",
            },
            {
              title: "AI Treatment Design",
              description: "Manus synchronises data streams to craft treatment pathways with micron accuracy.",
            },
            {
              title: "On-Site Fabrication",
              description: "3D printing and milling suites realise the approved plan without outsourcing delays.",
            },
          ]}
        />
      </section>
    </main>
  );
}
