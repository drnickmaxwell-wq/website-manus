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

  for (const [key, arr] of Object.entries(groups)) {
    const details = arr.map((rel) => {
      const full = path.join(ROOT, 'public', rel.replace(/^\/+/, ''));
      const size = statBytes(full);
      if (size <= 0) missing.push(rel);
      return { name: path.basename(rel), size };
    });
    report[key] = { ok: details.every(d => d.size > 0), count: details.length, byExt: details };
  }

  const animatedPresence: Record<string, boolean> = {};

  for (const [key, arr] of Object.entries(optionalGroups)) {
    const details = arr.map((rel) => {
      const full = path.join(ROOT, 'public', rel.replace(/^\/+/, ''));
      const size = statBytes(full);
      if (size <= 0) optionalMissing.push(rel);
      const name = path.basename(rel).replace('-animated.webm', '').replace('particles-', '');
      if (key === 'animated') {
        animatedPresence[name] = size > 0;
      }
      return { name: path.basename(rel), size };
    });
    optionalReport[key] = {
      ok: details.every(d => d.size > 0),
      count: details.length,
      byExt: details,
    };
  }

  return NextResponse.json({
    ok: missing.length === 0,
    report,
    optionalReport,
    missing,
    optionalMissing,
    animatedPresence,
  });
}
