"use client";
import React from "react";

const technologies = [
  {
    title: "CBCT Imaging",
    description: "3D cone-beam scans reveal bone structure in exquisite detail for precise planning.",
  },
  {
    title: "Intraoral Scanner",
    description: "Digital impressions capture geometry without mess, discomfort, or distortion.",
  },
  {
    title: "Same-Day 3D Printing",
    description: "Chairside fabrication delivers guides, models, and temporaries within hours.",
  },
  {
    title: "Guided Surgery",
    description: "Surgical templates translate virtual plans into millimeter-perfect execution.",
  },
];

export default function TechnologyByTheSea() {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ background: "var(--smh-sand)" }}
      aria-labelledby="technology-heading"
    >
      {/* Wave divider at top */}
      <div
        className="absolute top-0 left-0 right-0 h-24 smh-wave-mask"
        style={{
          background: "var(--smh-gradient)",
          opacity: 0.15,
        }}
        aria-hidden="true"
      />

      <div className="container-luxury relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-xs" style={{ color: "var(--smh-text-muted)" }}>
            Technology by the Sea
          </p>
          <h2 id="technology-heading" className="smh-heading text-3xl md:text-4xl mt-3" style={{ color: "var(--smh-text)" }}>
            Digital tools, coastal calm
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--smh-text-muted)" }}>
            Advanced imaging and fabrication systems harmonize with our seaside setting to deliver precision without pressure.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech) => (
            <article
              key={tech.title}
              className="group relative overflow-hidden rounded-2xl px-6 py-8 transition-all duration-500 hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(64, 196, 180, 0.2)",
                boxShadow: "var(--shadow-elevate-light)",
              }}
            >
              <div className="smh-film-grain absolute inset-0" aria-hidden="true" />
              <div className="relative z-10">
                <h3 className="smh-heading text-lg mb-3" style={{ color: "var(--smh-text)" }}>
                  {tech.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--smh-text-muted)" }}>
                  {tech.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Subtle particles overlay */}
      <div className="smh-particles" aria-hidden="true" />
    </section>
  );
}

