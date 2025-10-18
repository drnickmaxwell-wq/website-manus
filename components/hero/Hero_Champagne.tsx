"use client";

import { useEffect, useState } from "react";
import BrandHeroGradient from "@/components/brand/BrandHeroGradient";
import BrandButton from "@/components/brand/BrandButton";

export type HeroCta = { label: string; href: string };
export type HeroChampagneProps = { title: string; lead: string; ctas: HeroCta[] };

export default function Hero_Champagne({ title, lead, ctas }: HeroChampagneProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <BrandHeroGradient
      className="sm:mt-10"
      withParticles={!reducedMotion}
      disableAnimation={reducedMotion}
    >
      <div className="flex flex-col gap-8 py-12 sm:py-16">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--smh-text-muted)]">
            Boutique Dental Artistry
          </p>
          <h1 className="smh-heading text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
          <p className="text-lg leading-relaxed text-[color:var(--smh-text-muted)] md:text-xl">{lead}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {ctas.map((cta) => (
            <BrandButton
              key={cta.href + cta.label}
              as="a"
              href={cta.href}
              className="rounded-full px-6 py-3 text-base font-semibold sm:min-w-[12rem]"
            >
              {cta.label}
            </BrandButton>
          ))}
        </div>
      </div>
    </BrandHeroGradient>
  );
}
