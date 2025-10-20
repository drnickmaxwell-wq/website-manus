"use client";

import React from "react";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";

const posts = [
  {
    title: "Inside the Manus Lab",
    excerpt: "A look at how our team blends AI with artisan techniques for Champagne-level care.",
    href: "/blog/inside-the-manus-lab",
  },
  {
    title: "3D Printed Veneers vs. Traditional Porcelain",
    excerpt: "Comparing workflows, longevity, and aesthetics through the Manus lens.",
    href: "/blog/3d-printed-veneers-vs-porcelain",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <HeroVideo videoSrc="/video/blog.mp4" fallbackClass="smh-gradient-bg" />
      <section className="mx-auto max-w-5xl px-6 py-16 space-y-12">
        <div className="prose prose-lg text-[var(--smh-text)]">
          <h1 className="smh-heading">Champagne Journal</h1>
          <p>
            Editorial insights, treatment breakdowns, and technology deep dives curated by the SMH Champagne team.
          </p>
        </div>
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="block rounded-3xl border border-[var(--smh-border)]/60 bg-[var(--smh-card)]/70 p-6 transition hover:border-[var(--smh-primary-teal)]"
            >
              <h2 className="smh-heading text-2xl font-semibold">{post.title}</h2>
              <p className="mt-3 text-[var(--smh-text-muted)]">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--smh-primary-teal)]">
                Read more
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
