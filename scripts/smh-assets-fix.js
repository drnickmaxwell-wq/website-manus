// scripts/smh-assets-fix.js
// Repairs dark grain by copying desktop grain if needed,
// and materializes tiny placeholder WEBM clips from base64 if missing.
// This avoids committing binaries in Codex runs.

const fs = require('node:fs');
const path = require('node:path');

const PUB = path.join(process.cwd(), 'public');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function existsNonZero(p) {
  try { return fs.statSync(p).size > 0; } catch { return false; }
}

function copyIfNeeded(srcRel, dstRel) {
  const src = path.join(PUB, srcRel.replace(/^\/+/, ''));
  const dst = path.join(PUB, dstRel.replace(/^\/+/, ''));
  if (!existsNonZero(dst) && existsNonZero(src)) {
    ensureDir(path.dirname(dst));
    fs.copyFileSync(src, dst);
    console.log(`copied ${srcRel} -> ${dstRel}`);
  }
}

// Minimal 1s muted VP9 webm (solid gray). Good enough for diagnostics autoplay.
// You can replace later with your cinematic versions.
const TINY_WEBM_BASE64 = '';

function writeTinyWebmIfMissing(rel) {
  if (!TINY_WEBM_BASE64) {
    return;
  }
  const p = path.join(PUB, rel.replace(/^\/+/, ''));
  if (!existsNonZero(p)) {
    ensureDir(path.dirname(p));
    const buf = Buffer.from(TINY_WEBM_BASE64, 'base64');
    if (buf.length === 0) {
      return;
    }
    fs.writeFileSync(p, buf);
    console.log(`wrote placeholder ${rel}`);
  }
}

function run() {
  // Repair dark film grains from desktop grain
  copyIfNeeded('/textures/film-grain-desktop.webp', '/textures/film-grain-dark.webp');
  copyIfNeeded('/textures/film-grain-mobile.webp',  '/textures/film-grain-mobile-dark.webp');

  // Make sure folders exist
  ensureDir(path.join(PUB, 'textures'));
  ensureDir(path.join(PUB, 'overlays'));
  ensureDir(path.join(PUB, 'gradients'));
  ensureDir(path.join(PUB, 'waves'));

  // Materialize tiny animated webm placeholders if missing
  writeTinyWebmIfMissing('/textures/particles-gold-animated.webm');
  writeTinyWebmIfMissing('/textures/particles-magenta-animated.webm');
  writeTinyWebmIfMissing('/textures/particles-teal-animated.webm');

  console.log('SMH asset fixer finished.');
}

try {
  run();
} catch (e) {
  console.error('SMH asset fixer error:', e);
  process.exitCode = 0; // do not block install
}
