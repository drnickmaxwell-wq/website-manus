// app/api/assets/check/route.ts
import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const groups = {
  textures: [
    '/textures/film-grain-desktop.webp',
    '/textures/film-grain-dark.webp',
    '/textures/film-grain-mobile.webp',
    '/textures/film-grain-mobile-dark.webp',
    '/textures/particles-gold.webp',
    '/textures/particles-magenta.webp',
    '/textures/particles-teal.webp',
  ],
  overlays: [
    '/overlays/glow-dust.webp',
    '/overlays/glow-dust-dark.webp',
    '/overlays/glow-dust-mobile.webp',
  ],
  gradients: [
    '/gradients/hero-gradient-fallback.webp',
    '/gradients/hero-gradient-fallback-dark.webp',
    '/gradients/hero-gradient-soft.webp',
  ],
  waves: ['/waves/smh-wave-mask.svg'],
};

const optionalGroups = {
  animated: [
    '/textures/particles-gold-animated.webm',
    '/textures/particles-magenta-animated.webm',
    '/textures/particles-teal-animated.webm',
  ],
};

function statBytes(p: string) {
  try {
    const s = fs.statSync(p);
    return s.size;
  } catch {
    return 0;
  }
}

export async function GET() {
  const report: Record<string, any> = {};
  const optionalReport: Record<string, any> = {};
  const missing: string[] = [];
  const optionalMissing: string[] = [];
  const optionalSizes: Record<string, number> = {};
  const placeholders: string[] = [];

  for (const [key, arr] of Object.entries(groups)) {
    const details = arr.map((rel) => {
      const full = path.join(ROOT, 'public', rel.replace(/^\/+/, ''));
      const size = statBytes(full);
      if (size <= 0) missing.push(rel);
      return { name: path.basename(rel), size };
    });
    report[key] = { ok: details.every(d => d.size > 0), count: details.length, byExt: details };
  }

  for (const [key, arr] of Object.entries(optionalGroups)) {
    const details = arr.map((rel) => {
      const full = path.join(ROOT, 'public', rel.replace(/^\/+/, ''));
      const size = statBytes(full);
      if (size <= 0) optionalMissing.push(rel);
      optionalSizes[rel] = size;
      if (size > 0 && size < 2048) {
        placeholders.push(rel);
      }
      return { name: path.basename(rel), size };
    });
    optionalReport[key] = {
      ok: details.every(d => d.size > 0),
      count: details.length,
      byExt: details,
    };
  }

  const goldSize = optionalSizes['/textures/particles-gold-animated.webm'] ?? 0;
  const magentaSize = optionalSizes['/textures/particles-magenta-animated.webm'] ?? 0;
  const tealSize = optionalSizes['/textures/particles-teal-animated.webm'] ?? 0;

  return NextResponse.json({
    ok: missing.length === 0,
    report,
    optionalReport,
    missing,
    optionalMissing,
    hasGoldWebm: goldSize > 2048,
    hasMagentaWebm: magentaSize > 2048,
    hasTealWebm: tealSize > 2048,
    placeholders,
  });
}
