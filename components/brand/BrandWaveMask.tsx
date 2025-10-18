import React from "react";
export default function BrandWaveMask({ className="", children }: { className?: string; children?: React.ReactNode }) {
  return <div className={["relative smh-wave-mask", className].join(" ")}>{children}</div>;
}
