/* Simple procedural film-grain generator (desktop/mobile + dark variants).
   Generates subtle Gaussian noise + vignette, saves .webp via sharp.
*/
import { createCanvas } from "canvas";
import sharp from "sharp";
import fs from "fs";
import path from "path";

type Out = { w:number; h:number; name:string; dark?:boolean };
const outs:Out[] = [
  { w:2048, h:2048, name:"film-grain-desktop.webp" },
  { w:1024, h:1024, name:"film-grain-mobile.webp" },
  { w:2048, h:2048, name:"film-grain-dark.webp", dark:true },
  { w:1024, h:1024, name:"film-grain-mobile-dark.webp", dark:true },
];

function clamp(v:number, a=0, b=255){ return Math.max(a, Math.min(b, v)); }

function renderGrain(w:number, h:number, dark=false){
  const cnv = createCanvas(w, h);
  const ctx = cnv.getContext("2d");

  // Base (mid grey)
  ctx.fillStyle = dark ? "rgb(18,18,22)" : "rgb(28,28,34)";
  ctx.fillRect(0,0,w,h);

  // Grain – salt/pepper with small gaussian-ish distribution
  const img = ctx.createImageData(w, h);
  const data = img.data;
  for(let i=0;i<w*h;i++){
    const n = Math.random();                        // 0..1 noise
    const g = Math.floor((n*n)*90);                 // compress for subtlety
    const base = dark ? 18 : 28;
    const val = clamp(base + (Math.random()<0.5?-g:g));
    const idx = i*4;
    data[idx+0]=val; data[idx+1]=val; data[idx+2]=val; data[idx+3]=255;
  }
  ctx.putImageData(img,0,0);

  // Vignette
  const grad = ctx.createRadialGradient(w*0.5,h*0.55, Math.min(w,h)*0.08, w*0.5,h*0.55, Math.max(w,h)*0.65);
  grad.addColorStop(0, "rgba(0,0,0,0.0)");
  grad.addColorStop(1, dark ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.35)");
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,w,h);

  return cnv;
}

async function saveWebp(cnv: any, outPath:string){
  const buf = cnv.toBuffer("image/png");
  const webp = await sharp(buf).webp({ quality: 85 }).toBuffer();
  fs.mkdirSync(path.dirname(outPath), { recursive:true });
  fs.writeFileSync(outPath, webp);
}

(async ()=>{
  const base = path.resolve(process.cwd(), "public/textures");
  for(const o of outs){
    const cnv = renderGrain(o.w,o.h, !!o.dark);
    await saveWebp(cnv, path.join(base, o.name));
    console.log("wrote", o.name);
  }
})();
