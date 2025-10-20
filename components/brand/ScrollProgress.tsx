"use client";
import React, { useEffect, useState } from "react";

/** Top progress bar — subtle gold line indicating page scroll. */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const s = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (s / h) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div
      aria-hidden
      className="fixed left-0 top-0 right-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        className="h-full"
        style={{
          width: `${pct}%`,
          background:
            "linear-gradient(90deg,var(--smh-accent-gold), color-mix(in oklab, var(--smh-accent-gold) 40%, transparent))",
          boxShadow: "var(--glow-gold)",
          transition: "width 120ms linear",
        }}
      />
    </div>
  );
}
