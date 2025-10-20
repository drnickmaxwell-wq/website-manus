import React from "react";
import GlassCard_Lux from "@/components/brand/GlassCard_Lux";
import SparkleButton_Lux from "@/components/brand/SparkleButton_Lux";

const items = [
  {
    title: "Same-Day 3D Veneers",
    copy: "Trial smile today, permanent veneers soon.",
    href: "/treatments/3d-printed-veneers",
  },
  {
    title: "Guided Implants",
    copy: "Digital planning and surgical guides.",
    href: "/treatments/implants",
  },
  {
    title: "Digital Smile Design",
    copy: "Preview your new smile in AR.",
    href: "/treatments/digital-smile",
  },
  {
    title: "Whitening",
    copy: "Safe, even results.",
    href: "/treatments/teeth-whitening",
  },
  {
    title: "Orthodontics",
    copy: "Clear aligners with AI progress checks.",
    href: "/treatments/orthodontics",
  },
  {
    title: "General Dentistry",
    copy: "Gentle, comprehensive care.",
    href: "/treatments/general-dentistry",
  },
];

export default function Treatments_Grid() {
  return (
    <section className="relative py-14 md:py-18">
      <div className="mx-auto w-full max-w-[var(--maxw,1200px)] px-6">
        <h2 className="smh-heading text-2xl md:text-3xl font-semibold mb-6">
          Signature treatments
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <GlassCard_Lux key={it.title} className="group">
              <h3 className="font-semibold text-lg mb-2">{it.title}</h3>
              <p className="smh-text-dim mb-4">{it.copy}</p>
              <SparkleButton_Lux as="a" href={it.href} className="mt-auto">
                Learn more →
              </SparkleButton_Lux>
            </GlassCard_Lux>
          ))}
        </div>
      </div>
    </section>
  );
}
