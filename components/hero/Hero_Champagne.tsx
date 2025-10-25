import React from "react";
import Link from "next/link";

type CTA = { label: string; href: string };
type Props = {
  title: string;
  lead: string;
  ctas?: CTA[];
  className?: string;
};

export default function Hero_Champagne({
  title,
  lead,
  ctas = [],
  className = "",
}: Props) {
  return (
    <section
      className={[
        "relative overflow-hidden smh-hero-gradient-bg smh-wave-mask",
        "min-h-[54vh] flex items-center",
        className,
      ].join(" ")}
      aria-label="Hero"
    >
      {/* overlays (procedural) */}
      <div aria-hidden className="smh-film-grain absolute inset-0" />
      <div aria-hidden className="smh-particles" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <h1 className="smh-heading text-4xl md:text-6xl font-bold leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-lg md:text-xl smh-text-dim">{lead}</p>

          {ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {ctas.map((c, i) => (
                <Link key={i} href={c.href} className="smh-btn smh-gold-border">
                  {c.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
