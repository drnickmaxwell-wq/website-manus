"use client";
import React from "react";

/**
 *
 * BrandCoastalWaves
 *
 * Lightweight wave overlay that relies on the site wave mask + gradient.
 *
 * This component does not hardcode colors—everything comes from tokens
 *
 * and the container's classes.
 */
export default function BrandCoastalWaves({
  className = "",
}: { className?: string }) {
  return (
    <div
      aria-hidden
      className={[
        "absolute inset-0 smh-wave-mask pointer-events-none opacity-95",
        className,
      ].join(" ")}
    />
  );
}
