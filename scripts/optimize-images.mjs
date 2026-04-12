import sharp from "sharp";
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const QUALITY = 80;
const MAX_WIDTH = 400;
const INPUT_DIRS = ["public/providers", "public/products"];

async function optimizeImage(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const dir = join(inputPath, "..");
  const name = basename(inputPath, ext);
  const tmpPath = join(dir, `${name}.tmp.webp`);
  const outputPath = join(dir, `${name}.webp`);

  try {
    const info = await sharp(inputPath).metadata();
    const width = info.width > MAX_WIDTH ? MAX_WIDTH : info.width;

    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(tmpPath);

    const inputStat = await stat(inputPath);
    const outputStat = await stat(tmpPath);
    const saved = ((1 - outputStat.size / inputStat.size) * 100).toFixed(0);

    await unlink(inputPath);
    await rename(tmpPath, outputPath);

    console.log(
      `  ${basename(inputPath)} → ${basename(outputPath)} (${saved}% smaller)`
    );
  } catch (err) {
    console.error(`  Failed: ${inputPath} — ${err.message}`);
  }
}

async function processDir(inputDir) {
  let files;
  try {
    files = await readdir(inputDir);
  } catch {
    return;
  }

  const toConvert = files.filter((f) => {
    const ext = extname(f).toLowerCase();
    return [".jpg", ".jpeg", ".png"].includes(ext);
  });

  if (toConvert.length === 0) {
    console.log(`\n${inputDir}/ — all images already webp`);
    return;
  }

  console.log(`\nProcessing ${inputDir}/`);
  for (const file of toConvert) {
    await optimizeImage(join(inputDir, file));
  }
}

console.log("Optimizing images...");
for (const dir of INPUT_DIRS) {
  await processDir(dir);
}
console.log("\nDone!");
