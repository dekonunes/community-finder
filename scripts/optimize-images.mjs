import sharp from "sharp";
import { readdir, stat, mkdir } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const QUALITY = 80;
const MAX_WIDTH = 400;
const INPUT_DIRS = ["public/providers", "public/products"];
const OUTPUT_DIR = "public/optimized";

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch {}
}

async function optimizeImage(inputPath, outputDir) {
  const ext = extname(inputPath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return;

  const name = basename(inputPath, ext);
  const outputPath = join(outputDir, `${name}.webp`);

  try {
    const info = await sharp(inputPath).metadata();
    const width = info.width > MAX_WIDTH ? MAX_WIDTH : info.width;

    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const inputStat = await stat(inputPath);
    const outputStat = await stat(outputPath);
    const saved = ((1 - outputStat.size / inputStat.size) * 100).toFixed(0);
    console.log(
      `  ${basename(inputPath)} → ${basename(outputPath)} (${saved}% smaller)`
    );
  } catch (err) {
    console.error(`  Failed: ${inputPath} — ${err.message}`);
  }
}

async function processDir(inputDir) {
  const subDir = inputDir.replace("public/", "");
  const outputDir = join(OUTPUT_DIR, subDir);
  await ensureDir(outputDir);

  let files;
  try {
    files = await readdir(inputDir);
  } catch {
    return;
  }

  console.log(`\nProcessing ${inputDir}/`);
  for (const file of files) {
    await optimizeImage(join(inputDir, file), outputDir);
  }
}

console.log("Optimizing images...");
for (const dir of INPUT_DIRS) {
  await processDir(dir);
}
console.log("\nDone! Optimized images saved to public/optimized/");
