"use client";

import React, { useState } from "react";
import "@/styles/tokens/smh-champagne-tokens.css";

export type FAQItem = {
  question: string;
  answer: string;
};

const DEFAULT_FAQ: FAQItem[] = [
  {
    question: "How does Manus enhance treatment planning?",
    answer:
      "Manus unifies scanning, simulation, and fabrication so clinicians can iterate virtually before touching a tooth, lowering chair time and raising precision.",
  },
  {
    question: "Are the restorations produced in-house?",
    answer:
      "Yes. Our lab-grade printers and mills output restorations the same day, under constant AI calibration to ensure material integrity.",
  },
  {
    question: "What if I have existing dental work?",
    answer:
      "Legacy restorations are rescanned and factored into the Manus model to avoid clashes and preserve harmony between old and new dentistry.",
  },
];

type FAQAccordionProps = {
  items?: FAQItem[];
};

export default function FAQAccordion({ items = DEFAULT_FAQ }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-[var(--smh-border)]/60 bg-[var(--smh-card)]/80 shadow-[0_12px_40px_-25px_rgba(0,0,0,0.6)]"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 px-6 py-4 text-left text-[var(--smh-text)] transition-colors hover:bg-[var(--smh-bg-alt)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--smh-primary-teal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--smh-bg)]"
              onClick={() => setActiveIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="smh-heading text-lg font-medium">{item.question}</span>
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--smh-border)] text-sm transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden px-6 pb-6 text-[var(--smh-text-muted)]">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
