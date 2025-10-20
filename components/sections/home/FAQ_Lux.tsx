"use client";
import React, { useState } from "react";
import GlassCard_Lux from "@/components/brand/GlassCard_Lux";

const faqs = [
  {
    q: "Do you offer same-day 3D veneers?",
    a: "Yes — we design and 3D-print a trial smile the same day when clinically suitable, with permanent veneers fitted after finalization.",
  },
  {
    q: "Are implants planned digitally?",
    a: "Always. We use guided surgery with custom surgical guides and in-house design for restorations.",
  },
  {
    q: "Do you provide finance?",
    a: "We offer transparent pricing and 0% finance options via our partner (subject to status).",
  },
];

export default function FAQ_Lux() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-14 md:py-18">
      <div className="mx-auto w-full max-w-[var(--maxw,1200px)] px-6">
        <h2 className="smh-heading text-2xl md:text-3xl font-semibold mb-6">
          Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <GlassCard_Lux key={f.q} className="p-0">
                <button
                  className="w-full text-left px-5 py-4 focus:outline-none focus-visible:ring-2 ring-teal-300 rounded-2xl"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">{f.q}</span>
                    <span aria-hidden className="smh-text-dim">
                      {isOpen ? "–" : "+"}
                    </span>
                  </div>
                </button>
                {isOpen && <div className="px-5 pb-5 smh-text-dim">{f.a}</div>}
              </GlassCard_Lux>
            );
          })}
        </div>
      </div>
    </section>
  );
}
