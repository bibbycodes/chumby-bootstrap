import * as fs from 'fs-extra';
import * as path from 'path';

async function copyAssets() {
  const sourceDir = path.resolve(__dirname, 'src/lib/image_generation/base_images');
  const destDir = path.resolve(__dirname, 'dist/lib/image_generation/base_images');

  await fs.ensureDir(destDir);

  // Copy the PNG files to the destination directory
  await fs.copy(sourceDir, destDir);

  console.log('Assets copied successfully!');
}

copyAssets();
