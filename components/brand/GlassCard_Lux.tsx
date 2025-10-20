import React from "react";

/** GlassCard_Lux — champagne glass panel with soft gold edge. */
export default function GlassCard_Lux({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "smh-glass smh-gold-border rounded-2xl p-6 shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
