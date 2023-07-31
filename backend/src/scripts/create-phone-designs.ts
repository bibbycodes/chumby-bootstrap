import {colorSchemes} from "../lib/products/colors";
import {generatePhoneCase} from "../lib/products/product-generator";
import * as path from "path";
import * as fs from "fs";
import {PNGStream} from "canvas";
// https://s3.eu-west-1.amazonaws.com/chumi.generations/blue-lion.png


const fileNames = [
  "blue-lion.png",
  "hamster.png",
  "panda.png",
  "cat.png",
  "lion.png",
  "tiger.png",
  "dog-sunglasses.png",
  "mouse.png",
  "dog.png",
  "panda-lolipop.png",
]


const createPhoneCaseDesigns = async (filenames: string[]): Promise<void> => {
  const promises: Promise<void>[] = [];

  for (const fileName of filenames.slice(0,1)) {
    for (const colorSchemeName of Object.keys(colorSchemes)) {
      const dirName = fileName.split('.')[0];
      const colorScheme = colorSchemes[colorSchemeName];
      const params = {
        height: 2190,
        width: 1080,
        scale: 0.72,
        colors: colorScheme, // Replace with your color object
        imageUri: `https://s3.eu-west-1.amazonaws.com/chumi.generations/${fileName}`,
        textConfig: {
          text: '' +
            'FUMBIES',
          fontSize: 20,
          font: 'borsok',
        }
      };

      const filePath = path.join(__dirname, `../designs/phone_cases/${dirName}/${dirName}-${colorSchemeName}.png`);
      const dirname = path.dirname(filePath);

      if (!fs.existsSync(dirname)) {
        await fs.promises.mkdir(dirname, { recursive: true });
      }

      const out = fs.createWriteStream(filePath);
      const pngStream = await generatePhoneCase(params) as PNGStream;
      const finishPromise = new Promise<void>((resolve, reject) => {
        out.on('finish', () => {
          console.log(`Canvas saved as PNG: '${filePath}'`);
          resolve();
        });

        out.on('error', (err) => {
          reject(err);
        });
      });

      pngStream.pipe(out);
      promises.push(finishPromise);
    }
  }

  // Wait for all the file-writing operations to complete before resolving the overall function.
  await Promise.all(promises);
};

createPhoneCaseDesigns(fileNames)
  .then(() => {
    console.log('All phone case designs created successfully.');
  })
  .catch((err) => {
    console.error('Error creating phone case designs:', err);
  });
