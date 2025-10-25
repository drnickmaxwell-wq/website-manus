"use client";
import { useEffect, useRef, useState } from "react";

let Legacy: any = () => <div className="h-40 grid place-items-center">Legacy hero not found</div>;
try {
  Legacy = require("@/components/sections/home/VideoHero").default;
} catch {}

function BgReadout() {
  const ref = useRef<HTMLDivElement>(null);
  const [bg, setBg] = useState("");
  useEffect(() => {
    if (!ref.current) return;
    const c = getComputedStyle(ref.current);
    setBg(c.backgroundImage || "");
  }, []);
  return (
    <div className="text-xs break-all opacity-70 mt-2">
      <div ref={ref} className="smh-hero-gradient-bg smh-hero-lock h-0 w-0 overflow-hidden" />
      <strong>Computed background-image:</strong> {bg}
    </div>
  );
}

export default function CompareHeroes() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Hero Comparison</h1>

      <section>
        <h2 className="text-lg mb-2">Champagne Hero (homepage)</h2>
        <div className="relative h-64 rounded-xl overflow-hidden smh-hero-gradient-bg smh-hero-lock smh-wave-mask">
          <div aria-hidden className="smh-film-grain absolute inset-0" />
          <div aria-hidden className="smh-particles" />
        </div>
        <BgReadout />
      </section>

      {/* legacy hero block remains as-is below */}
      <section className="mt-8">
        <h2 className="text-lg mb-2">Legacy Hero (should NOT be on homepage)</h2>
        <Legacy />
      </section>
    </div>
  );
}
