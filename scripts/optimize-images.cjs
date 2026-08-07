const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const publicDirectory = path.resolve(__dirname, '..', 'public');
const sourceExtensions = new Set(['.jpg', '.jpeg', '.png', '.bmp', '.tif', '.tiff', '.gif', '.webp']);

async function collectImages(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectImages(entryPath);
    return sourceExtensions.has(path.extname(entry.name).toLowerCase()) ? [entryPath] : [];
  }));
  return files.flat();
}

async function main() {
  const webpOnly = process.argv.includes('--webp-only');
  const beforeIndex = process.argv.indexOf('--before');
  const before = beforeIndex === -1 ? undefined : new Date(process.argv[beforeIndex + 1]);
  const files = (await collectImages(publicDirectory)).filter((file) =>
    webpOnly ? path.extname(file).toLowerCase() === '.webp' : path.extname(file).toLowerCase() !== '.webp',
  );
  const selectedFiles = before
    ? (await Promise.all(files.map(async (file) => ((await fs.stat(file)).mtime < before ? file : undefined)))).filter(Boolean)
    : files;
  let originalBytes = 0;
  let optimizedBytes = 0;

  for (const inputPath of selectedFiles) {
    const outputPath = inputPath.replace(/\.[^.]+$/, '.webp');
    const input = await fs.readFile(inputPath);
    const metadata = await sharp(input, { animated: true }).metadata();
    const image = sharp(input, { animated: metadata.pages > 1 }).rotate();
    const output = await image.webp({
      quality: metadata.hasAlpha ? 88 : 82,
      effort: 4,
      smartSubsample: true,
      lossless: false,
    }).toBuffer();
    await fs.writeFile(outputPath, output);
    originalBytes += input.length;
    optimizedBytes += (await fs.stat(outputPath)).size;
    if (path.resolve(inputPath) !== path.resolve(outputPath)) await fs.unlink(inputPath);
  }

  console.log(JSON.stringify({ files: selectedFiles.length, originalBytes, optimizedBytes }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
