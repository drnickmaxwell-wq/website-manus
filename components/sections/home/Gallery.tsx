import React from "react";
import BrandButton from "@/components/brand/BrandButton";

const galleryItems = [
  { id: 1, label: "Smile Rehab", focus: "Composite bonding" },
  { id: 2, label: "Implant Case", focus: "Guided placement" },
  { id: 3, label: "Aligner Journey", focus: "Digital monitoring" },
];

export default function Gallery() {
  return (
    <section className="py-20 bg-white/70 dark:bg-black/40">
      <div className="container-luxury">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-slate-500 dark:text-slate-300">Smile gallery</p>
            <h2 className="smh-heading text-3xl md:text-4xl mt-3">Before & After transformations</h2>
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-200 max-w-2xl">
              A preview of digital mock-ups and real patient results. Each story starts with a scan and ends with a confident smile.
            </p>
          </div>
          <BrandButton as="a" href="/patient-stories" className="self-start">
            View Patient Stories
          </BrandButton>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <article key={item.id} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {(["Before", "After"] as const).map((state) => (
                  <div
                    key={state}
                    className="relative aspect-[4/3] overflow-hidden rounded-3xl"
                    aria-label={`${item.label} ${state.toLowerCase()} placeholder`}
                  >
                    <div className="absolute inset-0 smh-gradient-bg" aria-hidden />
                    <div className="absolute inset-0 smh-film-grain" aria-hidden />
                    <div className="relative flex h-full items-center justify-center">
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/90">{state}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="smh-heading text-xl">{item.label}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-200">{item.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
