"use client";
import React, { useEffect, useState } from "react";
import GlassCard_Lux from "@/components/brand/GlassCard_Lux";

const stories = [
  {
    name: "A.",
    quote: "My veneers were designed and fitted so quickly — and they look incredible.",
  },
  {
    name: "J.",
    quote: "The guided implant felt planned to perfection. Zero surprises.",
  },
  {
    name: "S.",
    quote: "Calm team, beautiful clinic, and tech that actually makes care better.",
  },
];

export default function Patient_Stories() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % stories.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = stories[i];
  return (
    <section className="relative py-14 md:py-18">
      <div className="mx-auto w-full max-w-[var(--maxw,1200px)] px-6">
        <h2 className="smh-heading text-2xl md:text-3xl font-semibold mb-6">
          Patient stories
        </h2>
        <GlassCard_Lux className="p-8">
          <p className="italic text-lg md:text-xl mb-3">“{s.quote}”</p>
          <div className="smh-text-dim">— {s.name}</div>
        </GlassCard_Lux>
      </div>
    </section>
  );
}
