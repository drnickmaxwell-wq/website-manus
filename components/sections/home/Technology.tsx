import React from "react";

const technologies = [
  {
    title: "SprintRay",
    summary: "Chairside printing delivers on-the-day guides, aligners, and temporaries.",
  },
  {
    title: "Exocad",
    summary: "Design software sculpts restorations with facially driven precision.",
  },
  {
    title: "Guided Implants",
    summary: "Fully guided workflows enhance accuracy for complex implant placements.",
  },
  {
    title: "Digital Scans",
    summary: "Comfortable, impression-free scans keep records pristine and sharable.",
  },
];

export default function Technology() {
  return (
    <section className="py-20 bg-slate-50/60 dark:bg-slate-900/40">
      <div className="container-luxury">
        <div className="max-w-2xl">
          <p className="uppercase tracking-[0.3em] text-xs text-slate-500 dark:text-slate-300">Technology stack</p>
          <h2 className="smh-heading text-3xl md:text-4xl mt-3">Tools shaping every smile</h2>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-200">
            A curated suite of digital systems orchestrates diagnostics, planning, and delivery with consistent excellence.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {technologies.map((item) => (
            <article
              key={item.title}
              className="group smh-gold-border relative overflow-hidden rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-xl px-6 py-8 transition-transform duration-300 ease-out hover:-translate-y-2"
            >
              <div className="absolute inset-0 smh-film-grain" aria-hidden />
              <div className="relative">
                <h3 className="smh-heading text-xl">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
