import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const roots = [
  { key: "textures", dir: "public/textures", exts: [".webp", ".webm"] },
  { key: "overlays", dir: "public/overlays", exts: [".webp"] },
  { key: "gradients", dir: "public/gradients", exts: [".webp"] },
  { key: "waves", dir: "public/waves", exts: [".svg"] },
];

async function listDir(dir: string) {
  try {
    const abs = path.join(process.cwd(), dir);
    const entries = await fs.readdir(abs);
    const files = await Promise.all(
      entries.map(async (name) => {
        const fp = path.join(abs, name);
        const st = await fs.stat(fp);
        return { name, size: st.size, isFile: st.isFile() };
      })
    );
    return { ok: true, files };
  } catch (e: any) {
    return { ok: false, error: e?.message || String(e) };
  }
}

export async function GET() {
  const report: Record<string, any> = {};
  for (const r of roots) {
    const info = await listDir(r.dir);
    if (!info.ok) {
      report[r.key] = { ok: false, error: info.error };
      continue;
    }
    const files = (info.files || []).filter((f: any) => f.isFile);
    const byExt = r.exts.reduce((acc, ext) => {
      acc[ext] = files.filter((f: any) => f.name.endsWith(ext)).map((f: any) => ({ name: f.name, size: f.size }));
      return acc;
    }, {} as Record<string, { name: string; size: number }[]>);
    report[r.key] = { ok: true, count: files.length, byExt };
  }

  // Quick presence checks (key files we expect)
  const expected = [
    "/textures/film-grain-desktop.webp",
    "/textures/particles-gold-animated.webm",
    "/textures/particles-magenta-animated.webm",
    "/textures/particles-teal-animated.webm",
    "/overlays/glow-dust.webp",
    "/gradients/hero-gradient-fallback.webp",
    "/waves/smh-wave-mask.svg",
  ];

  const missing: string[] = [];
  for (const p of expected) {
    try {
      const abs = path.join(process.cwd(), "public", p.replace(/^\//, ""));
      const st = await fs.stat(abs);
      if (!st.isFile() || st.size <= 0) missing.push(p);
    } catch {
      missing.push(p);
    }
  }

  return NextResponse.json({ ok: true, report, expected, missing });
}
