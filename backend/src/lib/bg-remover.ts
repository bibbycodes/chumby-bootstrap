import imglyRemoveBackground, {ImageSource} from "@imgly/background-removal"

export class BackgroundRemover {
  static async removeBackground(image: ImageSource): Promise<Buffer> {
    const imageWithoutBackground = await imglyRemoveBackground(image)
    const imageBuffer = await imageWithoutBackground.arrayBuffer()
    return Buffer.from(imageBuffer)
  }
}
