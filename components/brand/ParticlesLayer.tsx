import React from "react";

/** Render shimmering champagne particles using CSS drift (no videos required).
 *  Usage:
 *    <div className="relative">
 *      <ParticlesLayer variant="gold" slow />
 *      ...content...
 *    </div>
 */
export default function ParticlesLayer({
  variant = "gold",
  slow = false,
  className = "",
}: {
  variant?: "gold" | "magenta" | "teal";
  slow?: boolean;
  className?: string;
}) {
  const classes = [
    "smh-layer smh-particles",
    variant,
    slow ? "slow" : "",
    className,
  ].filter(Boolean).join(" ");
  return <div aria-hidden className={classes} />;
}
