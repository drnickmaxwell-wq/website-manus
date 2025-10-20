"use client";

import Link from "next/link";

const routes = [
  "/treatments/3d-printed-veneers",
  "/treatments/3d-implant-restorations",
  "/treatments/3d-same-day-restorations",
  "/treatments/digital-smile-design",
  "/treatments/3d-guided-implants",
  "/treatments/checkups",
  "/treatments/fillings",
  "/treatments/extractions",
  "/treatments/root-canal",
  "/treatments/airflow-cleaning",
  "/treatments/teeth-whitening",
  "/our-team",
  "/patient-stories",
  "/all-treatments",
  "/blog",
  "/ai-smile-analysis",
  "/technology",
];

export default function ManusImportPage() {
  return (
    <main className="min-h-screen bg-[var(--smh-bg)] p-8 text-[var(--smh-text)]">
      <h1 className="smh-heading mb-6 text-3xl">Imported Manus Routes</h1>
      <ul className="space-y-2">
        {routes.map((r) => (
          <li key={r}>
            <Link href={r} className="text-[var(--smh-primary-teal)] hover:underline">
              {r}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-[var(--smh-text-muted)]">
        Verify pages render correctly and assets load (3D models, video, textures).
        Build must remain green; report any missing assets separately.
      </p>
    </main>
  );
}
