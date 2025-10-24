#!/usr/bin/env node
/**
 * Generate local placeholder assets for development without committing binaries.
 * - Animated particles: tiny valid WebM clips (~1s of muted drift).
 * - GLB model: minimal scene so <model-viewer> wiring works.
 */

import { promises as fs } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");
const WEBM_THRESHOLD = 2048;

const WEBM_PLACEHOLDER = new Uint8Array([
  26, 69, 223, 163, 16, 0, 0, 31, 66, 134, 129, 1, 66, 247, 129, 1,
  66, 242, 129, 4, 66, 243, 129, 8, 66, 130, 132, 119, 101, 98, 109, 66,
  135, 129, 2, 66, 133, 129, 2, 24, 83, 128, 103, 8, 0, 0, 3, 203,
  17, 77, 155, 116, 16, 0, 0, 63, 77, 187, 16, 0, 0, 15, 83, 171,
  132, 28, 83, 187, 107, 83, 172, 133, 0, 0, 0, 3, 176, 77, 187, 16,
  0, 0, 15, 83, 171, 132, 21, 73, 169, 102, 83, 172, 133, 0, 0, 0,
  0, 71, 77, 187, 16, 0, 0, 15, 83, 171, 132, 22, 84, 174, 107, 83,
  172, 133, 0, 0, 0, 0, 131, 21, 73, 169, 102, 16, 0, 0, 52, 42,
  215, 177, 131, 15, 66, 64, 77, 128, 142, 119, 101, 98, 109, 45, 119, 114,
  105, 116, 101, 114, 45, 106, 115, 87, 65, 142, 119, 101, 98, 109, 45, 119,
  114, 105, 116, 101, 114, 45, 106, 115, 68, 137, 136, 64, 143, 63, 255, 255,
  255, 255, 253, 22, 84, 174, 107, 16, 0, 0, 50, 174, 16, 0, 0, 45,
  215, 129, 1, 115, 197, 129, 1, 156, 129, 0, 34, 181, 156, 131, 117, 110,
  100, 134, 133, 86, 95, 86, 80, 56, 37, 134, 136, 131, 86, 80, 56, 131,
  129, 1, 224, 16, 0, 0, 6, 176, 129, 0, 186, 129, 0, 31, 67, 182,
  117, 16, 0, 2, 235, 231, 129, 0, 163, 16, 0, 0, 26, 129, 0, 0,
  128, 48, 1, 0, 157, 1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164,
  0, 3, 112, 0, 0, 0, 0, 163, 16, 0, 0, 26, 129, 0, 42, 128,
  48, 1, 0, 157, 1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0,
  3, 112, 0, 0, 0, 0, 163, 16, 0, 0, 26, 129, 0, 83, 128, 48,
  1, 0, 157, 1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3,
  112, 0, 0, 0, 0, 163, 16, 0, 0, 26, 129, 0, 125, 128, 48, 1,
  0, 157, 1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3, 112,
  0, 0, 0, 0, 163, 16, 0, 0, 26, 129, 0, 167, 128, 48, 1, 0,
  157, 1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3, 112, 0,
  0, 0, 0, 163, 16, 0, 0, 26, 129, 0, 208, 128, 48, 1, 0, 157,
  1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3, 112, 0, 0,
  0, 0, 163, 16, 0, 0, 26, 129, 0, 250, 128, 48, 1, 0, 157, 1,
  42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3, 112, 0, 0, 0,
  0, 163, 16, 0, 0, 26, 129, 1, 36, 128, 48, 1, 0, 157, 1, 42,
  1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3, 112, 0, 0, 0, 0,
  163, 16, 0, 0, 26, 129, 1, 77, 128, 48, 1, 0, 157, 1, 42, 1,
  0, 1, 0, 14, 192, 254, 37, 164, 0, 3, 112, 0, 0, 0, 0, 163,
  16, 0, 0, 26, 129, 1, 119, 128, 48, 1, 0, 157, 1, 42, 1, 0,
  1, 0, 14, 192, 254, 37, 164, 0, 3, 112, 0, 0, 0, 0, 163, 16,
  0, 0, 26, 129, 1, 161, 128, 48, 1, 0, 157, 1, 42, 1, 0, 1,
  0, 14, 192, 254, 37, 164, 0, 3, 112, 0, 0, 0, 0, 163, 16, 0,
  0, 26, 129, 1, 202, 128, 48, 1, 0, 157, 1, 42, 1, 0, 1, 0,
  14, 192, 254, 37, 164, 0, 3, 112, 0, 0, 0, 0, 163, 16, 0, 0,
  26, 129, 1, 244, 128, 48, 1, 0, 157, 1, 42, 1, 0, 1, 0, 14,
  192, 254, 37, 164, 0, 3, 112, 0, 0, 0, 0, 163, 16, 0, 0, 26,
  129, 2, 30, 128, 48, 1, 0, 157, 1, 42, 1, 0, 1, 0, 14, 192,
  254, 37, 164, 0, 3, 112, 0, 0, 0, 0, 163, 16, 0, 0, 26, 129,
  2, 71, 128, 48, 1, 0, 157, 1, 42, 1, 0, 1, 0, 14, 192, 254,
  37, 164, 0, 3, 112, 0, 0, 0, 0, 163, 16, 0, 0, 26, 129, 2,
  113, 128, 48, 1, 0, 157, 1, 42, 1, 0, 1, 0, 14, 192, 254, 37,
  164, 0, 3, 112, 0, 0, 0, 0, 163, 16, 0, 0, 26, 129, 2, 155,
  128, 48, 1, 0, 157, 1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164,
  0, 3, 112, 0, 0, 0, 0, 163, 16, 0, 0, 26, 129, 2, 196, 128,
  48, 1, 0, 157, 1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0,
  3, 112, 0, 0, 0, 0, 163, 16, 0, 0, 26, 129, 2, 238, 128, 48,
  1, 0, 157, 1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3,
  112, 0, 0, 0, 0, 163, 16, 0, 0, 26, 129, 3, 24, 128, 48, 1,
  0, 157, 1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3, 112,
  0, 0, 0, 0, 163, 16, 0, 0, 26, 129, 3, 65, 128, 48, 1, 0,
  157, 1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3, 112, 0,
  0, 0, 0, 163, 16, 0, 0, 26, 129, 3, 107, 128, 48, 1, 0, 157,
  1, 42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3, 112, 0, 0,
  0, 0, 163, 16, 0, 0, 26, 129, 3, 149, 128, 48, 1, 0, 157, 1,
  42, 1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3, 112, 0, 0, 0,
  0, 163, 16, 0, 0, 26, 129, 3, 190, 128, 48, 1, 0, 157, 1, 42,
  1, 0, 1, 0, 14, 192, 254, 37, 164, 0, 3, 112, 0, 0, 0, 0,
  28, 83, 187, 107, 16, 0, 0, 19, 187, 16, 0, 0, 14, 179, 129, 0,
  183, 16, 0, 0, 6, 247, 129, 1, 241, 129, 189,
]);

const WEBM_TARGETS = [
  "/textures/particles-gold-animated.webm",
  "/textures/particles-magenta-animated.webm",
  "/textures/particles-teal-animated.webm",
];

function buildPlaceholderGlb() {
  const json = JSON.stringify({
    asset: { version: "2.0", generator: "smh placeholder" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ name: "PlaceholderNode" }],
    extras: {
      note: "For wire-up only. Replace with production mesh when ready.",
    },
  });

  const jsonBytes = Buffer.from(json, "utf8");
  const paddedLength = Math.ceil(jsonBytes.length / 4) * 4;
  const buffer = Buffer.alloc(12 + 8 + paddedLength, 0);
  buffer.write("glTF", 0, 4, "ascii");
  buffer.writeUInt32LE(2, 4);
  buffer.writeUInt32LE(buffer.length, 8);
  buffer.writeUInt32LE(paddedLength, 12);
  buffer.write("JSON", 16, 4, "ascii");
  jsonBytes.copy(buffer, 20);
  return buffer;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writePlaceholder(targetPath, data, threshold) {
  let action = "written";
  try {
    const stats = await fs.stat(targetPath);
    if (stats.size > threshold) {
      return { action: "kept", size: stats.size };
    }
  } catch {
    // file missing — will be created
  }

  await ensureDir(dirname(targetPath));
  await fs.writeFile(targetPath, data);
  return { action, size: data.length };
}

async function main() {
  const summary = [];

  for (const rel of WEBM_TARGETS) {
    const full = join(PUBLIC_DIR, rel.replace(/^\/+/, ""));
    const result = await writePlaceholder(full, WEBM_PLACEHOLDER, WEBM_THRESHOLD);
    summary.push({ rel, ...result });
  }

  const glbTarget = join(PUBLIC_DIR, "models", "example.glb");
  const glbBuffer = buildPlaceholderGlb();
  const glbResult = await writePlaceholder(glbTarget, glbBuffer, 4096);
  summary.push({ rel: "/models/example.glb", ...glbResult });

  console.log("Placeholder generation complete:\n");
  for (const item of summary) {
    const verb = item.action === "kept" ? "kept" : "wrote";
    console.log(`• ${verb} ${item.rel} (${item.size} bytes)`);
  }
}

main().catch((error) => {
  console.error("Failed to generate placeholders:", error);
  process.exitCode = 1;
});
