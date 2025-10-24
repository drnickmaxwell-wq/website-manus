"use client";

export default function ParticlesLayer({
  variant = "gold",
  dark = false,
  className = "",
}: {
  variant?: "gold" | "magenta" | "teal";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={["champagne-layer", dark ? "is-dark" : "", className].join(" ").trim()}>
      <div className="particles" data-variant={variant} />
      <div className="film-grain" />
    </div>
  );
}
