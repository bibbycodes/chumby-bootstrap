import {CanvasRenderingContext2D, createCanvas, loadImage, PNGStream, registerFont} from 'canvas';
import {findFileInDir} from "../../scripts/utils/fs-utils";

export interface TextConfig {
  text: string;
  font: string;
  fontSize: number;
  color?: string;
}

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
  textConfig?: TextConfig;
}

export async function generatePhoneCase(phoneCaseParams: PhoneCaseParams): Promise<PNGStream> {
  const {
    height,
    width,
    scale,
    colors,
    imageUri,
    textConfig
  } = phoneCaseParams;

  if (textConfig) {
    const fontFilePath = findFileInDir(`${__dirname}/fonts`, textConfig.font, ['ttf', 'otf']);
    if (!fontFilePath) throw new Error(`Font file not found for ${textConfig.font}`);
    registerFont(fontFilePath, {family: 'Borsok'});
  }

  const canvas1 = createCanvas(width, height);

  const canvas2 = createCanvas(width, height);
  const context2 = canvas2.getContext("2d");

  const canvas3 = createCanvas(width, height);
  const context3 = canvas3.getContext("2d");
  
  const imageYOffsetValue = 178
  const imageSizeFactor = 1.26
  const borderThickness = 76 * scale;
  const fontSize = textConfig.fontSize * 10 * scale;
  const radius = (Math.min(canvas1.width, canvas1.height) / 3.2) * scale;
  const distanceFromCenterToBottomOfCircle = radius + borderThickness;
  const distanceBetweenTextAndImage = fontSize * 0.4
  const commonVerticalOffset = (textConfig ?  (fontSize + distanceBetweenTextAndImage) / 2 : 0) * -1;

  const centerX = canvas1.width / 2;
  const centerY = (canvas1.height / 2) + commonVerticalOffset;
  const circleCanvas = createCanvas(width, height);
  const circleContext = circleCanvas.getContext("2d");

  circleContext.fillStyle = colors.borderColor;
  circleContext.beginPath();
  circleContext.arc(centerX, centerY, radius + borderThickness, 0, 2 * Math.PI, false);
  circleContext.fill();
  circleContext.fillStyle = colors.innerCircleColor;
  circleContext.beginPath();
  circleContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  circleContext.fill();

  context3.fillStyle = colors.backgroundColor;
  context3.fillRect(0, 0, canvas3.width, canvas3.height);
  context3.drawImage(circleCanvas, 0, 0);

  const img = await loadImage(imageUri);
  const hRatio = (canvas2.width / img.width) * scale;
  const vRatio = (canvas2.height / img.height) * scale;
  const ratio = Math.min(hRatio, vRatio) * imageSizeFactor;
  const yOffset = imageYOffsetValue * scale;
  const centerShift_x = ((canvas2.width - img.width * ratio) / 2);
  const centerShift_y = ((canvas2.height - img.height * ratio) / 2) + yOffset + commonVerticalOffset;

  context2.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  context2.globalCompositeOperation = 'destination-in';
  context2.drawImage(circleCanvas, 0, 0);
  context3.drawImage(canvas2, 0, 0);

  if (textConfig) {
    context3.font = `${fontSize}px Borsok`; // Combining font size and family
    context3.textAlign = 'center';
    context3.fillStyle = textConfig?.color ?? colors.borderColor;
    const textX = centerX;
    const textY = centerY + distanceFromCenterToBottomOfCircle + distanceBetweenTextAndImage + (fontSize / 2) ;
    context3.fillText(textConfig.text, textX, textY);
  }

  return canvas3.createPNGStream();
}

function measureText(context: CanvasRenderingContext2D, text: string): { width: number, height: number } {
  const metrics = context.measureText(text);
  const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  return {
    width: metrics.width,
    height: height
  };
}

