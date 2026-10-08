// Genera miniaturas .webp (ancho máximo 640 px) para la galería de productos.
// Uso: node scripts/make-thumbs.mjs
// Las miniaturas se guardan junto a cada carpeta, en un subdirectorio "thumbs/".
import { chromium } from "playwright";
import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOTS = ["public/images/products"];
const MAX_WIDTH = 640;
const EXTENSIONS = /\.(webp|jpe?g|png)$/i;

async function collect(dir) {
  const found = [];
  let entries = [];
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return found; }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "thumbs") found.push(...(await collect(full)));
    else if (entry.isFile() && EXTENSIONS.test(entry.name)) found.push(full);
  }
  return found;
}

const files = (await Promise.all(ROOTS.map(collect))).flat();
const browser = await chromium.launch().catch(() => chromium.launch({ channel: "msedge" }));
const page = await browser.newPage();
let created = 0;

for (const file of files) {
  const target = path.join(path.dirname(file), "thumbs", path.basename(file).replace(EXTENSIONS, ".webp"));
  const [source, existing] = await Promise.all([stat(file), stat(target).catch(() => null)]);
  if (existing && existing.mtimeMs >= source.mtimeMs) continue;
  const mime = file.endsWith(".png") ? "image/png" : /\.jpe?g$/i.test(file) ? "image/jpeg" : "image/webp";
  const dataUrl = `data:${mime};base64,${(await readFile(file)).toString("base64")}`;
  const output = await page.evaluate(async ({ dataUrl, maxWidth }) => {
    const image = new Image();
    image.src = dataUrl;
    await image.decode();
    const scale = Math.min(1, maxWidth / image.naturalWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    const context = canvas.getContext("2d");
    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", 0.82);
  }, { dataUrl, maxWidth: MAX_WIDTH });
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(output.split(",")[1], "base64"));
  created += 1;
}

await browser.close();
console.log(`Miniaturas generadas: ${created} de ${files.length} imágenes.`);
