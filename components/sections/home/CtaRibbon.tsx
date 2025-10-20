import React from "react";
import BrandButton from "@/components/brand/BrandButton";

export default function CtaRibbon() {
  return (
    <section className="smh-gradient-bg smh-wave-mask relative py-10">
      <div className="absolute inset-0 smh-film-grain" aria-hidden />
      <div className="container-luxury relative flex flex-col items-start gap-6 py-4 text-white md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="uppercase tracking-[0.3em] text-xs text-white/70">Next step</p>
          <h2 className="smh-heading text-2xl md:text-3xl">Experience the precision of in-house 3D smile design.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <BrandButton as="a" href="/contact" className="bg-white text-slate-900 hover:bg-white/90">
            Book Consultation
          </BrandButton>
          <BrandButton as="a" href="/treatments" className="bg-transparent border border-white text-white hover:bg-white/10">
            Explore Treatments
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
