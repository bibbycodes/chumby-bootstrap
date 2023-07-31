import * as fs from 'fs';
import * as path from "path";

export function createDirectoryIfNotExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// function writeFileWithDirectories(filePath: string, data: string): void {
//   const dirname = path.dirname(filePath);
//
//   if (!fs.existsSync(dirname)) {
//     fs.mkdirSync(dirname, { recursive: true });
//   }
//
//   fs.writeFileSync(filePath, data);
// }

export async function writeFileWithDirectories(filePath: string, data: string): Promise<void> {
  const dirname = path.dirname(filePath);

  if (!fs.existsSync(dirname)) {
    await fs.promises.mkdir(dirname, { recursive: true });
  }

  const writeStream = fs.createWriteStream(filePath);
  writeStream.write(data);
  writeStream.end();

  return new Promise<void>((resolve, reject) => {
    writeStream.on('finish', () => {
      resolve();
    });

    writeStream.on('error', (err) => {
      reject(err);
    });
  });
}


export function findFileInDir(directory: string, fileName: string, extensions: string[]): string | null {

  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const result = findFileInDir(filePath, fileName, extensions);
      if (result) return result;
    } else {
      for (const ext of extensions) {
        if (path.basename(filePath, `.${ext}`) === fileName && path.extname(filePath).substring(1) === ext) {
          return filePath;
        }
      }
    }
  }

  return null;
}
