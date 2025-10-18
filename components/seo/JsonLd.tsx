"use client";
import React from "react";
type JsonLdProps = { type: string; data: Record<string, unknown> };
export default function JsonLd({ type, data }: JsonLdProps) {
  const payload = { "@context":"https://schema.org", "@type": type, ...data };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }} />;
}
