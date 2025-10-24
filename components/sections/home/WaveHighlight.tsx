import clsx from "clsx";
import React from "react";

type WaveHighlightProps = {
  particles?: "gold" | "teal" | "magenta";
  className?: string;
  children?: React.ReactNode;
};

const maskStyle: React.CSSProperties = {
  WebkitMaskImage: "url(/waves/smh-wave-mask.svg)",
  maskImage: "url(/waves/smh-wave-mask.svg)",
  WebkitMaskSize: "cover",
  maskSize: "cover",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

export default function WaveHighlight({ particles = "gold", className, children }: WaveHighlightProps) {
  const particleVideoSrc = `/textures/particles-${particles}-animated.webm`;
  const particleFallbackSrc = `/textures/particles-${particles}.webp`;

  return (
    <section
      className={clsx(
        "relative isolate w-full overflow-hidden rounded-3xl smh-gradient-bg text-white",
        className,
      )}
      style={maskStyle}
      aria-label="Champagne wave highlight"
    >
      <div aria-hidden className="absolute inset-0 smh-gradient-bg" />

      <img
        aria-hidden
        src="/textures/film-grain-desktop.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-soft-light"
      />

      <ParticleOverlay src={particleVideoSrc} fallbackSrc={particleFallbackSrc} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        {children ?? <span aria-hidden className="block min-h-[4rem]" />}
      </div>
    </section>
  );
}

function ParticleOverlay({ src, fallbackSrc }: { src: string; fallbackSrc: string }) {
  "use client";
  const [failed, setFailed] = React.useState(false);
  const bust = typeof window === "undefined" ? "" : `?v=${new Date().toISOString().slice(0, 10)}`;
  const srcWithBuster = `${src}${bust}`;
  const fallbackWithBuster = `${fallbackSrc}${bust}`;

  React.useEffect(() => {
    setFailed(false);
  }, [srcWithBuster]);

  if (failed) {
    return (
      <img
        aria-hidden
        src={fallbackWithBuster}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-screen pointer-events-none"
      />
    );
  }

  return (
    <video
      key={srcWithBuster}
      className="pointer-events-none absolute inset-0 h-full w-full rounded-none bg-black/30 object-cover opacity-55"
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
      controls={false}
      poster="/gradients/hero-gradient-soft.webp"
      onError={() => {
        if (src.includes("magenta")) {
          console.log("MAGENTA_WEBM_DECODE_FAIL");
        }
        setFailed(true);
      }}
    >
      <source src={srcWithBuster} type="video/webm" />
    </video>
  );
}
