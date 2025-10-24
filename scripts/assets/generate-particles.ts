/* Animated champagne particles – renders frames with Canvas then encodes WebM.
   Also exports static preview .webp for each color.
*/
import { Canvas, createCanvas } from "canvas";
import sharp from "sharp";
import WebMWriter from "webm-writer";
import fs from "fs";
import path from "path";

const globalWithWindow = globalThis as typeof globalThis & {
  window?: { atob?: (value: string) => string; document?: { createElement: (tag: string) => Canvas } };
  HTMLCanvasElement?: typeof Canvas;
  document?: { createElement: (tag: string) => Canvas };
};
if (!globalWithWindow.window) {
  globalWithWindow.window = {};
}
if (typeof globalWithWindow.window.atob !== "function") {
  globalWithWindow.window.atob = (value: string) => Buffer.from(value, "base64").toString("binary");
}
if (!globalWithWindow.document) {
  globalWithWindow.document = {
    createElement: (tag: string) => {
      if (tag !== "canvas") {
        throw new Error(`Unsupported element creation: ${tag}`);
      }
      return createCanvas(1, 1) as unknown as Canvas;
    },
  };
}
if (!globalWithWindow.window.document) {
  globalWithWindow.window.document = globalWithWindow.document;
}
if (!globalWithWindow.HTMLCanvasElement) {
  globalWithWindow.HTMLCanvasElement = Canvas as unknown as typeof globalWithWindow.HTMLCanvasElement;
}

type Swatch = { key:"gold"|"magenta"|"teal"; color:string };
const swatches:Swatch[] = [
  { key:"gold",   color:"#E3BF49" },
  { key:"magenta",color:"#E4117F" },
  { key:"teal",   color:"#15C1B6" }
];

const W = 1280, H = 720;          // decent HD-ish
const SECS = 6, FPS = 20;         // gentle loop but build-friendly
const BUBBLES = 110;              // density

function rand(a:number,b:number){ return a + Math.random()*(b-a); }

function drawFrame(ctx:CanvasRenderingContext2D, t:number, sw:Swatch){
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0,0,W,H);

  // faint glow
  const g = ctx.createRadialGradient(W*0.5,H*0.6,10, W*0.5,H*0.6, Math.max(W,H)*0.9);
  g.addColorStop(0, "rgba(255,255,255,0.03)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

  // particle orbits
  for(let i=0;i<BUBBLES;i++){
    const r = rand(2, 12);
    const angle = (i*137.5 + t*30) * (Math.PI/180); // quasi-golden angle drift
    const radius = rand(60, Math.min(W,H)*0.45);
    const cx = W*0.5 + Math.cos(angle) * radius * rand(0.9,1.1);
    const cy = H*0.65 + Math.sin(angle*0.8) * radius * rand(0.8,1.1) - t*8; // gentle rise
    const alpha = 0.15 + 0.35*Math.abs(Math.sin(t*0.8 + i*0.19));
    ctx.fillStyle = `${sw.color}55`;
    ctx.strokeStyle = `${sw.color}${Math.floor(alpha*255).toString(16).padStart(2,"0")}`;
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
    // tiny spec highlight
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath(); ctx.arc(cx-r*0.2, cy-r*0.2, Math.max(0.7,r*0.15), 0, Math.PI*2); ctx.fill();
  }
}

async function renderAll(){
  const texturesDir = path.resolve("public/textures");
  fs.mkdirSync(texturesDir,{recursive:true});

  for(const sw of swatches){
    const cnv = createCanvas(W,H);
    const ctx = cnv.getContext("2d") as unknown as CanvasRenderingContext2D;
    const writer: any = new WebMWriter({
      quality: 0.92,
      frameRate: FPS,
      transparent: true,
      alpha: true
    });

    const total = Math.floor(SECS*FPS);
    for(let f=0; f<total; f++){
      const t = f/FPS;
      drawFrame(ctx, t, sw);
      const png = cnv.toBuffer("image/png");
      const sharpFrame = sharp(png);
      const webpFrame = await sharpFrame.clone().webp({ quality: 78, alphaQuality: 78 }).toBuffer();
      const alphaWebp = await sharpFrame
        .clone()
        .ensureAlpha()
        .extractChannel(3)
        .toColourspace("b-w")
        .webp({ quality: 78 })
        .toBuffer();
      const dataUrl = `data:image/webp;base64,${webpFrame.toString("base64")}`;
      const alphaUrl = `data:image/webp;base64,${alphaWebp.toString("base64")}`;
      writer.addFrame(dataUrl, alphaUrl);
      if(f===Math.floor(total/2)){
        // mid-loop static preview
        fs.writeFileSync(path.join(texturesDir, `particles-${sw.key}.webp`), webpFrame);
      }
    }
    const webmResult = await writer.complete();
    const webmBuffer = Buffer.isBuffer(webmResult)
      ? webmResult
      : Buffer.from(await webmResult.arrayBuffer());
    fs.writeFileSync(path.join(texturesDir, `particles-${sw.key}-animated.webm`), webmBuffer);
    console.log("wrote particles for", sw.key);
  }
}

renderAll();
