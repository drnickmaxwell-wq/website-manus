"use client";

import React, { useEffect, useState } from "react";
import JsonLd from "@/lib/seo/JsonLd";

const testimonials = [
  {
    author: "Sophie",
    role: "Smile makeover patient",
    quote: "The 3D preview made it effortless to trust the process. I walked out with the smile I imagined.",
    rating: 5,
  },
  {
    author: "Michael",
    role: "Implant patient",
    quote: "Guided surgery meant zero surprises. The team translated scans into a seamless experience.",
    rating: 5,
  },
  {
    author: "Elena",
    role: "Aligner patient",
    quote: "Weekly digital check-ins kept me on track without constant visits. Modern dentistry done right.",
    rating: 5,
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const active = testimonials[index];

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 smh-gradient-bg opacity-20" aria-hidden />
      <div className="container-luxury relative">
        <p className="uppercase tracking-[0.3em] text-xs text-slate-500 dark:text-slate-300">Patient feedback</p>
        <h2 className="smh-heading text-3xl md:text-4xl mt-3">Reviews from the lounge</h2>
        <div className="mt-10 rounded-3xl bg-white/70 p-8 shadow-slate-900/5 backdrop-blur-xl dark:bg-slate-900/60">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{active.role}</p>
          <p className="mt-4 text-2xl font-medium text-slate-900 dark:text-white">“{active.quote}”</p>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="smh-heading text-lg">{active.author}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{`${active.rating}.0 ★ rating`}</p>
            </div>
            <div className="flex gap-2">
              {testimonials.map((testimonial, testimonialIndex) => (
                <button
                  key={testimonial.author}
                  type="button"
                  onClick={() => setIndex(testimonialIndex)}
                  className={`h-2 w-8 rounded-full transition-opacity ${
                    testimonialIndex === index ? "bg-slate-900 opacity-100" : "bg-slate-400/50 opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`Show testimonial from ${testimonial.author}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {testimonials.map((testimonial) => (
        <JsonLd
          key={testimonial.author}
          type="Review"
          data={{
            author: { "@type": "Person", name: testimonial.author },
            reviewBody: testimonial.quote,
            reviewRating: { "@type": "Rating", ratingValue: testimonial.rating },
            itemReviewed: { "@type": "LocalBusiness", name: "St Mary's House Dental Care" },
          }}
        />
      ))}
    </section>
  );
}
