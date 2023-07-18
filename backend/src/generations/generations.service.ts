import {Injectable} from '@nestjs/common';
import {Creatures, sittingChumbyPrompt} from "../lib/image_generation/prompt_library/chumby";
import {typeToBaseImagePath} from "../lib/image_generation/stability/stability-helpers";
import {Artifact, ImageToImageRequest} from "../lib/image_generation/stability/stability-types";
import {StabilityClient} from "../lib/image_generation/stability/stability-client";
import {S3Wrapper} from "../lib/aws/s3-wrapper";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Image, ImageDocument} from "../db/image/image.schema";
import { v4 as uuid } from 'uuid';
import {ConfigService} from "@nestjs/config";
import * as mongoose from "mongoose"; // Import UUID generator

@Injectable()
export class GenerationsService {
  constructor(
    private readonly stabilityClient: StabilityClient,
    private readonly s3Wrapper: S3Wrapper,
    private readonly configService: ConfigService,
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async generateSittingChumby(creature: Creatures, apparel: string[]): Promise<any> {
    const textPrompts = sittingChumbyPrompt(creature, apparel)
    const baseImagePath =  typeToBaseImagePath.sittingChumby
    const request: ImageToImageRequest = {
      text_prompts: textPrompts,
      init_image: baseImagePath,
      init_image_mode: 'IMAGE_STRENGTH',
      image_strength: 0.27,
      steps: 50,
    };

    const engineId = 'stable-diffusion-xl-beta-v2-2-2';
    const response =  await this.stabilityClient.image2image(request, engineId, baseImagePath); // Return the generated images or any other desired result
    const bucketName = this.configService.get('AWS_S3_BUCKET_NAME')

    const artifact: Artifact = response.artifacts[0]; // Assuming the generated image is the first artifact
    const imageBuffer = Buffer.from(artifact.base64, 'base64');

    // Upload the generated image to AWS S3
    const key = `${uuid()}.png`;
    const imageUrl = await this.s3Wrapper.uploadFile(bucketName, key, imageBuffer);

    // Save the image details in the images table
    const userId = new mongoose.Types.ObjectId(); // Hardcoded user ID
    const image = {
      userId,
      url: imageUrl,
      bucketName,
      key,
      region: this.configService.get('AWS_REGION'),
    };

    const savedImage = await this.imageModel.create(image);

    return { generatedImage: imageUrl, savedImage };
  }
}
