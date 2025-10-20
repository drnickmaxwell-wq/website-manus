"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Row = { path: string; label: string; exists: boolean | null };

const TARGETS: Row[] = [
  { path: "/textures/film-grain-desktop.webp", label: "Film grain (light)", exists: null },
  { path: "/textures/film-grain-dark.webp", label: "Film grain (dark)", exists: null },
  { path: "/textures/particles-gold.webp", label: "Particles — gold", exists: null },
  { path: "/textures/particles-teal.webp", label: "Particles — teal", exists: null },
  { path: "/textures/particles-magenta.webp", label: "Particles — magenta", exists: null },
  { path: "/gradients/hero-gradient-fallback.webp", label: "Hero gradient (light)", exists: null },
  { path: "/gradients/hero-gradient-fallback-dark.webp", label: "Hero gradient (dark)", exists: null },
  { path: "/gradients/hero-gradient-soft.webp", label: "Hero gradient (soft)", exists: null },
  { path: "/waves/hero-waves-alone.png", label: "Master wave image", exists: null },
];

export const dynamic = "force-dynamic";

export default function AssetsPage() {
  const [rows, setRows] = useState<Row[]>(TARGETS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const results: Row[] = [];
      for (const r of TARGETS) {
        try {
          const res = await fetch(r.path, { method: "HEAD", cache: "no-store" });
          results.push({ ...r, exists: res.ok });
        } catch {
          results.push({ ...r, exists: false });
        }
      }
      if (!cancelled) setRows(results);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="mx-auto max-w-[var(--maxw,1200px)] px-6 py-10">
      <h1 className="smh-heading text-3xl font-bold mb-6">Asset Check</h1>
      <p className="smh-text-dim mb-6">
        This page verifies that required textures and gradients exist in <code>/public</code>.
      </p>
      <table className="w-full text-sm border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Label</th>
            <th className="pb-2">Path</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.path} className="align-top">
              <td className="pr-4">{r.label}</td>
              <td className="pr-4 smh-text-dim">{r.path}</td>
              <td>
                {r.exists === null ? (
                  <span className="smh-text-dim">Checking…</span>
                ) : r.exists ? (
                  <span style={{ color: "limegreen" }}>Found</span>
                ) : (
                  <span style={{ color: "tomato" }}>Missing</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10">
        <h2 className="smh-heading text-xl font-semibold mb-3">Visual preview</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative h-40 rounded-xl overflow-hidden smh-hero-gradient-bg">
            <div aria-hidden className="absolute inset-0 smh-film-grain" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white/70 rounded px-2 py-1 text-black text-xs">Gradient + Grain</span>
            </div>
          </div>
          <div className="relative h-40 rounded-xl overflow-hidden">
            <Image
              src="/waves/hero-waves-alone.png"
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-90"
            />
            <div aria-hidden className="absolute inset-0 smh-particles-gold" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white/70 rounded px-2 py-1 text-black text-xs">Wave + Gold particles</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
