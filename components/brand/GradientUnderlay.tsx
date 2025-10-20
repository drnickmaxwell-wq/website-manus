import React from "react";

/** GradientUnderlay — champagne gradient layer you can place behind content or video */
export default function GradientUnderlay({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={[
        "absolute inset-0 smh-hero-gradient-bg",
        "pointer-events-none",
        className,
      ].join(" ")}
    />
  );
}
