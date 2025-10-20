"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import "@/styles/tokens/smh-champagne-tokens.css";
import { useRef } from "react";

type TimelineItem = {
  title: string;
  description: string;
};

const DEFAULT_ITEMS: TimelineItem[] = [
  {
    title: "1. Consultation & Digital Scan",
    description:
      "High-resolution intraoral scanning builds a 3D baseline of your smile and bite for precise planning.",
  },
  {
    title: "2. Design & Visualisation",
    description:
      "Our specialists iterate in Manus to project final esthetics, stress-testing every micron for durability.",
  },
  {
    title: "3. Fabrication & Fit",
    description:
      "AI-guided milling or printing produces restorations that seat seamlessly with minimal chairside adjustments.",
  },
];

type TimelineProps = {
  items?: TimelineItem[];
};

export default function Timeline({ items = DEFAULT_ITEMS }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="relative grid gap-10 md:grid-cols-[auto_1fr]">
      <div className="absolute left-5 top-0 hidden h-full w-px bg-[var(--smh-primary-teal)]/40 md:block" aria-hidden />
      <div className="space-y-10 md:col-span-2">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
            className="relative rounded-2xl border border-[var(--smh-border)]/60 bg-[var(--smh-card)]/70 p-6 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)]"
          >
            <span className="absolute -left-5 top-6 hidden h-3 w-3 rounded-full border-2 border-[var(--smh-primary-teal)] bg-[var(--smh-bg)] md:inline-flex" />
            <h3 className="smh-heading text-xl font-semibold text-[var(--smh-text)]">{item.title}</h3>
            <p className="mt-2 text-[var(--smh-text-muted)]">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
