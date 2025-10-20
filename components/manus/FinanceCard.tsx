"use client";

import React from "react";
import "@/styles/tokens/smh-champagne-tokens.css";
import clsx from "clsx";

type FinanceCardProps = {
  title: string;
  description: string;
  cta?: string;
  onClick?: () => void;
  className?: string;
};

export default function FinanceCard({ title, description, cta = "Explore options", onClick, className }: FinanceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-[var(--smh-border)]/50 bg-[var(--smh-card)]/80 p-6 text-left text-[var(--smh-text)] transition-transform duration-500 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--smh-primary-teal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--smh-bg)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--smh-primary-gold)_0%,transparent_55%)]" aria-hidden />
        <div className="absolute inset-0 translate-x-[-120%] skew-x-12 bg-gradient-to-r from-transparent via-[var(--smh-primary-gold)]/60 to-transparent transition-transform duration-500 group-hover:translate-x-[120%]" aria-hidden />
      </div>
      <span className="smh-heading text-xl font-semibold">{title}</span>
      <p className="mt-3 text-[var(--smh-text-muted)]">{description}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-[var(--smh-primary-teal)]">
        {cta}
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M4 10h10.586l-3.293 3.293a1 1 0 1 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 1 0-1.414 1.414L14.586 8H4a1 1 0 1 0 0 2Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
  );
}
