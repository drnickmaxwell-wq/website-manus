"use client";

import dynamic from "next/dynamic";
import React from "react";
import "@/styles/tokens/smh-champagne-tokens.css";

const Viewer = dynamic(() => import("./ThreeViewerClient"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-3xl bg-[var(--smh-bg-alt)] text-[var(--smh-text-muted)]">
      Loading 3D experience…
    </div>
  ),
});

type ThreeViewerProps = {
  modelSrc: string;
};

export default function ThreeViewer({ modelSrc }: ThreeViewerProps) {
  return <Viewer modelSrc={modelSrc} />;
}
