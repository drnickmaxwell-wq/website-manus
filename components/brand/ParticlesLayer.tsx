"use client";

import { useCallback, useMemo, useState } from "react";
import clsx from "clsx";

type Mode = "css" | "video" | "auto";
type Variant = "light" | "dark";
type ColorKey = "gold" | "magenta" | "teal";

type ParticlesLayerProps = {
  mode?: Mode;
  variant?: Variant;
  className?: string;
};

const COLOR_LAYERS: Array<{
  key: ColorKey;
  videoSrc: string;
  animationDuration: string;
  backgroundSize: string;
}> = [
  {
    key: "gold",
    videoSrc: "/textures/particles-gold-animated.webm",
    animationDuration: "60s",
    backgroundSize: "700px 700px",
  },
  {
    key: "magenta",
    videoSrc: "/textures/particles-magenta-animated.webm",
    animationDuration: "72s",
    backgroundSize: "820px 760px",
  },
  {
    key: "teal",
    videoSrc: "/textures/particles-teal-animated.webm",
    animationDuration: "54s",
    backgroundSize: "640px 640px",
  },
];

export function detectWebm(): boolean {
  if (typeof document === "undefined") return false;
  const testVideo = document.createElement("video");
  const support = testVideo.canPlayType('video/webm; codecs="vp9"');
  return support !== "";
}

export default function ParticlesLayer({
  mode = "auto",
  variant = "light",
  className,
}: ParticlesLayerProps) {
  const [failed, setFailed] = useState<Record<ColorKey, boolean>>({
    gold: false,
    magenta: false,
    teal: false,
  });

  const prefersVideo = useMemo(() => {
    if (mode === "css") return false;
    const supported = detectWebm();
    if (!supported) return false;
    if (mode === "video") return true;
    if (typeof document === "undefined") return false;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="smh-has-webm"]');
    return meta?.content === "1";
  }, [mode]);

  const mixBlendMode = variant === "dark" ? "soft-light" : "screen";

  const handleVideoError = useCallback(
    (color: ColorKey) => () => {
      setFailed((prev) => (prev[color] ? prev : { ...prev, [color]: true }));
    },
    []
  );

  return (
    <div className={clsx("smh-particles-layer", className)} data-variant={variant} aria-hidden>
      {COLOR_LAYERS.map((layer) => {
        const showVideo = prefersVideo && !failed[layer.key];
        const showCss = !prefersVideo || failed[layer.key];
        return (
          <div key={layer.key} className="smh-particles-layer__slot">
            {showCss ? (
              <div
                className={clsx("smh-particles-layer__css", `smh-particles-layer__css--${layer.key}`)}
                style={{ mixBlendMode, backgroundSize: layer.backgroundSize, animationDuration: layer.animationDuration }}
              />
            ) : null}
            {showVideo ? (
              <video
                className="smh-particles-layer__video"
                muted
                loop
                playsInline
                preload="auto"
                autoPlay
                style={{ mixBlendMode }}
                onError={handleVideoError(layer.key)}
              >
                <source src={layer.videoSrc} type="video/webm" />
              </video>
            ) : null}
          </div>
        );
      })}
      <style jsx>{`
        .smh-particles-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .smh-particles-layer__slot {
          position: absolute;
          inset: 0;
        }
        .smh-particles-layer__css {
          position: absolute;
          inset: 0;
          background-repeat: repeat;
          opacity: 0.14;
          animation-name: smhParticlesDrift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: background-position;
        }
        .smh-particles-layer__css--gold {
          background-image: url("/textures/particles-gold.webp");
        }
        .smh-particles-layer__css--magenta {
          background-image: url("/textures/particles-magenta.webp");
        }
        .smh-particles-layer__css--teal {
          background-image: url("/textures/particles-teal.webp");
        }
        .smh-particles-layer__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          opacity: 0.55;
        }
        .smh-particles-layer[data-variant="dark"] .smh-particles-layer__css {
          opacity: 0.2;
        }
        .smh-particles-layer[data-variant="dark"] .smh-particles-layer__video {
          opacity: 0.4;
        }
        @keyframes smhParticlesDrift {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 700px 350px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .smh-particles-layer__css {
            animation: none;
          }
          .smh-particles-layer__video {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
}
