"use client";

import { Suspense, useRef } from "react";
import "@/styles/tokens/smh-champagne-tokens.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import type { Group } from "three";

function Model({ modelSrc }: { modelSrc: string }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(modelSrc, true);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.3;
    }
  });

  return <primitive ref={group} object={scene} dispose={null} />;
}

type ThreeViewerClientProps = {
  modelSrc: string;
};

export default function ThreeViewerClient({ modelSrc }: ThreeViewerClientProps) {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl bg-[var(--smh-bg-alt)] shadow-[0_24px_60px_-20px_rgba(24,24,24,0.45)]">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#080808"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color={"#ffffff"} />
        <Suspense fallback={null}>
          <Stage
            intensity={0.7}
            environment="city"
            shadows={{ type: "contact", color: "#111111", opacity: 0.5 }}
            adjustCamera
          >
            <Model modelSrc={modelSrc} />
          </Stage>
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--smh-bg)]/70 to-transparent" />
    </div>
  );
}
