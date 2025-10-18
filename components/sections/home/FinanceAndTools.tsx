import React from "react";
import Link from "next/link";

const items = [
  {
    title: "0% Finance",
    copy: "Spread treatment investments with interest-free plans tailored to your timeline.",
    href: "/fees",
    cta: "Explore finance",
  },
  {
    title: "AI Smile Quiz",
    copy: "Answer a few guided questions and receive personalised treatment suggestions.",
    href: "/quiz",
    cta: "Start the quiz",
  },
  {
    title: "Virtual Try-On",
    copy: "Preview veneer shades and aligner outcomes from the comfort of home.",
    href: "/ar-try-on",
    cta: "Launch AR experience",
  },
];

export default function FinanceAndTools() {
  return (
    <section className="py-20 bg-slate-100/70 dark:bg-slate-900/50">
      <div className="container-luxury">
        <div className="max-w-2xl">
          <p className="uppercase tracking-[0.3em] text-xs text-slate-500 dark:text-slate-300">Finance & Tools</p>
          <h2 className="smh-heading text-3xl md:text-4xl mt-3">Make every decision effortless</h2>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-200">
            Flexible pathways to plan, preview, and commit to treatment with confidence.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="smh-gold-border relative flex h-full flex-col justify-between rounded-3xl bg-white/50 dark:bg-white/5 px-6 py-8 backdrop-blur-xl"
            >
              <div>
                <h3 className="smh-heading text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">{item.copy}</p>
              </div>
              <Link
                href={item.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition-transform duration-300 hover:translate-x-1 dark:text-white"
              >
                {item.cta}
                <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
