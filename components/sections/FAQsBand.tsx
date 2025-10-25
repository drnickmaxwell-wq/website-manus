"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "What makes your practice different from other dental clinics?",
    answer:
      "We combine cutting-edge 3D technology with a serene coastal setting, offering precision-driven treatments in a luxurious, stress-free environment. Our digital-first approach ensures predictable outcomes and same-day solutions.",
  },
  {
    question: "Do you offer payment plans for cosmetic treatments?",
    answer:
      "Yes, we partner with leading finance providers to offer flexible payment plans with 0% APR options available. Speak to our team during your consultation to explore tailored solutions.",
  },
  {
    question: "How long does a veneer or implant procedure take?",
    answer:
      "Veneers typically require two visits over 2-3 weeks. Implants involve placement (1-2 hours) followed by a healing period (3-6 months) before final restoration. We provide same-day temporaries for immediate aesthetics.",
  },
  {
    question: "Are your treatments suitable for nervous patients?",
    answer:
      "Absolutely. Our calm, spa-like environment and gentle approach are designed to ease anxiety. We also offer sedation options and take time to explain every step, ensuring you feel comfortable and in control.",
  },
  {
    question: "Can I see a preview of my new smile before treatment?",
    answer:
      "Yes. Using digital smile design and 3D visualization, we create a virtual preview of your results during the consultation, allowing you to see and approve your new smile before any work begins.",
  },
];

export default function FAQsBand() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900" aria-labelledby="faqs-heading">
      <div className="container-luxury max-w-4xl">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-xs" style={{ color: "var(--smh-text-muted)" }}>
            Frequently Asked Questions
          </p>
          <h2 id="faqs-heading" className="smh-heading text-3xl md:text-4xl mt-3" style={{ color: "var(--smh-text)" }}>
            Your questions, answered
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <article
              key={index}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(248, 244, 238, 0.5)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors duration-200 hover:bg-white/50"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                style={{ color: "var(--smh-text)" }}
              >
                <h3 className="smh-heading text-lg font-medium pr-4">{faq.question}</h3>
                <span
                  className="flex-shrink-0 text-2xl transition-transform duration-300"
                  style={{
                    transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                    color: "var(--smh-accent-gold)",
                  }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === index ? "500px" : "0",
                  opacity: openIndex === index ? 1 : 0,
                }}
                aria-hidden={openIndex !== index}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-base leading-relaxed" style={{ color: "var(--smh-text-muted)" }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: "var(--smh-text-muted)" }}>
            Have more questions?{" "}
            <a
              href="/contact"
              className="font-medium transition-colors duration-200"
              style={{ color: "var(--smh-accent-gold)" }}
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>

      {/* Commented JSON-LD for FAQPage schema */}
      {/*
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />
      */}
    </section>
  );
}

