"use client";
import React, { useState } from "react";

const stories = [
  {
    id: "story-1",
    poster: "/placeholders/patient-story-1.jpg",
    title: "Emma's Veneer Journey",
    duration: "3:24",
  },
  {
    id: "story-2",
    poster: "/placeholders/patient-story-2.jpg",
    title: "James' Implant Experience",
    duration: "4:12",
  },
  {
    id: "story-3",
    poster: "/placeholders/patient-story-3.jpg",
    title: "Sarah's Aligner Transformation",
    duration: "2:58",
  },
  {
    id: "story-4",
    poster: "/placeholders/patient-story-4.jpg",
    title: "Michael's Full Smile Makeover",
    duration: "5:06",
  },
];

export default function PatientStories() {
  const [focusedVideo, setFocusedVideo] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white dark:bg-slate-900" aria-labelledby="patient-stories-heading">
      <div className="container-luxury">
        <div className="max-w-2xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-xs" style={{ color: "var(--smh-text-muted)" }}>
            Patient Stories
          </p>
          <h2 id="patient-stories-heading" className="smh-heading text-3xl md:text-4xl mt-3" style={{ color: "var(--smh-text)" }}>
            Real transformations, genuine voices
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--smh-text-muted)" }}>
            Hear directly from patients who chose precision, artistry, and a seaside sanctuary for their smile journey.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {stories.map((story) => (
            <article
              key={story.id}
              className="group relative overflow-hidden rounded-3xl aspect-video cursor-pointer"
              style={{
                background: "linear-gradient(135deg, var(--smh-champagne), var(--smh-sand))",
                border: focusedVideo === story.id
                  ? "3px solid var(--smh-accent-gold)"
                  : "1px solid rgba(212, 175, 55, 0.3)",
                boxShadow: focusedVideo === story.id
                  ? "var(--glow-gold), 0 8px 24px rgba(212, 175, 55, 0.25)"
                  : "var(--shadow-elevate-light)",
                transition: "all 0.3s ease",
              }}
              onClick={() => setFocusedVideo(story.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setFocusedVideo(story.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Play video: ${story.title}`}
            >
              {/* Placeholder poster */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(212, 175, 55, 0.9)",
                      boxShadow: focusedVideo === story.id ? "var(--glow-gold)" : "none",
                    }}
                  >
                    <svg
                      className="w-8 h-8 ml-1"
                      fill="white"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h3 className="smh-heading text-xl mb-1" style={{ color: "var(--smh-text)" }}>
                    {story.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--smh-text-muted)" }}>
                    {story.duration}
                  </p>
                </div>
              </div>

              {/* Film grain */}
              <div className="smh-film-grain absolute inset-0" aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: "var(--smh-text-muted)" }}>
            <em>Video placeholders – actual patient testimonials coming soon</em>
          </p>
        </div>
      </div>
    </section>
  );
}

