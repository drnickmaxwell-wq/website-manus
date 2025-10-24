'use client';

import { useState } from 'react';
import type { Treatment } from '@/content/treatments';

export default function FAQs({ faqs }: { faqs: Treatment['faqs'] }) {
  const [open, setOpen] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-white/10 sm:p-10">
      <h2 className="text-xl font-semibold text-[var(--smh-text)] dark:text-white">Frequently asked questions</h2>
      <div className="mt-6 divide-y divide-white/40">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div key={faq.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 py-4 text-left text-[var(--smh-text)] transition hover:text-[var(--smh-primary-magenta)] dark:text-white"
                aria-expanded={isOpen}
                onClick={() => setOpen((prev) => (prev === index ? -1 : index))}
              >
                <span className="text-base font-medium">{faq.q}</span>
                <span className={`text-2xl font-light transition-transform ${isOpen ? 'rotate-45' : ''}`} aria-hidden>
                  +
                </span>
              </button>
              <div
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="min-h-0">
                  <p className="pb-4 text-sm text-[var(--smh-text-muted)] dark:text-white/70">{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
