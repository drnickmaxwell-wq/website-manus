"use client";
import React from "react";
import BrandCoastalWaves from "@/components/brand/BrandCoastalWaves";
import BrandParticles from "@/components/brand/BrandParticles";
import SparkleButton_Lux from "@/components/brand/SparkleButton_Lux";

/** Homepage hero — gradient + waves + grain + particles with two CTAs. */
export default function Hero_Lux() {
  return (
    <section
      className={[
        "relative overflow-hidden",
        "smh-hero-gradient-bg smh-wave-mask",
        "min-h-[66vh] flex items-center",
      ].join(" ")}
      aria-label="Welcome"
    >
      {/* overlays */}
      <div aria-hidden className="absolute inset-0 smh-film-grain" />
      <BrandParticles gold teal={false} magenta={false} />
      <BrandCoastalWaves />

      <div className="relative z-10 mx-auto w-full max-w-[var(--maxw,1200px)] px-6 py-20">
        <div className="max-w-2xl">
          <p className="smh-text-dim mb-3">St Mary’s House Dental Care</p>
          <h1 className="smh-heading text-4xl/tight md:text-5xl font-bold mb-4">
            Luxury dental care by the sea — designed, scanned, and 3D-printed in-house.
          </h1>
          <p className="text-base md:text-lg smh-text-dim mb-8">
            Same-day 3D veneers, guided implants, and digital smile design. Quiet luxury, cutting-edge tech.
          </p>
          <div className="flex flex-wrap gap-3">
            <SparkleButton_Lux as="a" href="/contact">
              Book consultation
            </SparkleButton_Lux>
            <SparkleButton_Lux as="a" href="/treatments" className="smh-glass">
              Explore treatments
            </SparkleButton_Lux>
          </div>
        </div>
      </div>
    </section>
  );
}
