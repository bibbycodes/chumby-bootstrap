import {mintCream, purplePink, skyPink} from "./colors";

const {createCanvas, loadImage} = require('canvas')
const fs = require('fs');

export interface PhoneCaseColors {
  backgroundColor: string;
  borderColor: string;
  innerCircleColor: string;
}

export interface PhoneCaseParams {
  height: number;
  width: number;
  scale: number;
  colors: PhoneCaseColors;
  imageUri: string;
}

async function generatePhoneCase(phoneCaseParams: PhoneCaseParams) {
  console.log('Entered function');
  const {
    height,
    width,
    scale,
    colors,
    imageUri
  } = phoneCaseParams;

  const canvas1 = createCanvas(width, height);
  const context1 = canvas1.getContext("2d");

  const canvas2 = createCanvas(width, height);
  const context2 = canvas2.getContext("2d");

  const canvas3 = createCanvas(width, height);
  const context3 = canvas3.getContext("2d");
  context3.fillStyle = colors.backgroundColor;
  context3.fillRect(0, 0, canvas3.width, canvas3.height);

  console.log('Initialized canvases and contexts');

  const centerX = canvas1.width / 2;
  const centerY = canvas1.height / 2;
  const radius = (Math.min(canvas1.width, canvas1.height) / 3.2) * scale;

  console.log('Preloading image');
  const img = await loadImage(imageUri);
  console.log('Image loaded');

  const hRatio = (canvas1.width / img.width) * scale;
  const vRatio = (canvas1.height / img.height) * scale;
  const ratio = Math.min(hRatio, vRatio);
  const yOffset = 50 * scale;
  const centerShift_x = ((canvas1.width - img.width * ratio) / 2);
  const centerShift_y = ((canvas1.height - img.height * ratio) / 2) + yOffset;

  console.log('Drawing image on canvas1');
  context1.drawImage(img, 0, 0, img.width, img.height,
    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

  console.log('Creating circle on canvas2');
  context2.fillStyle = colors.innerCircleColor;
  context2.beginPath();
  context2.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context2.fill();

  context2.globalCompositeOperation = 'source-atop';
  context2.drawImage(canvas1, 0, 0);

  console.log('Drawing canvas2 on canvas3');
  context3.drawImage(canvas2, 0, 0);

  context3.lineWidth = 30 * scale;
  context3.strokeStyle = colors.borderColor;
  context3.beginPath();
  context3.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context3.stroke();

  console.log('Creating output file');
  const out = fs.createWriteStream(__dirname + '/output.png');
  const stream = canvas3.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('The PNG file was created.'));
}

const params = {
  height: 1062,
  width: 523,
  scale: 1,
  colors: skyPink,
  imageUri: 'https://s3.eu-west-1.amazonaws.com/chumi.generations/da9ae4a0-457b-4543-8832-62e0c4c79aae.png'
}

generatePhoneCase(params).catch(console.error);
