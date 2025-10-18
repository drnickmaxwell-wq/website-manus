import React from "react";

const steps = [
  {
    title: "Scan",
    description: "High-resolution intraoral scans capture every contour of the smile for digital planning.",
  },
  {
    title: "Design",
    description: "3D software maps bespoke restorations tailored to facial proportions and bite.",
  },
  {
    title: "Print",
    description: "In-house printers produce precise guides and veneers ready for same-day transformations.",
  },
];

export default function Why3D() {
  return (
    <section className="py-20 bg-white/60 dark:bg-black/40">
      <div className="container-luxury grid gap-12 lg:grid-cols-[1.05fr,0.95fr] items-center">
        <div>
          <p className="uppercase tracking-[0.35em] text-xs text-slate-500 dark:text-slate-300">Digital workflow</p>
          <h2 className="smh-heading text-3xl md:text-4xl mt-3">Why 3D Dentistry Matters</h2>
          <p className="mt-5 text-lg text-slate-700 dark:text-slate-200 max-w-xl">
            Elevate patient experiences with an end-to-end digital approach that keeps every stage of treatment in-house.
          </p>
          <ul className="mt-8 space-y-5" aria-label="3D dentistry workflow steps">
            {steps.map((step) => (
              <li key={step.title} className="flex gap-4 items-start">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-200" aria-hidden />
                <div>
                  <p className="font-semibold uppercase tracking-[0.2em] text-xs text-slate-500 dark:text-slate-200">{step.title}</p>
                  <p className="mt-1 text-base text-slate-700 dark:text-slate-100">{step.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="smh-gradient-bg smh-film-grain aspect-[4/3] w-full rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 backdrop-blur-md flex items-center justify-center text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
            3D viewer here
          </div>
        </div>
      </div>
    </section>
  );
}
