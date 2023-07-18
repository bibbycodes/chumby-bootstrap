import FormData from 'form-data';
import {GenerationResponse, ImageToImageRequest} from "./stability-types";
import axios, {AxiosResponse} from "axios";
import * as fs from "fs";
import {createFormDataForImageToImage} from "./stability-helpers";
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";
import * as path from "path";

@Injectable()
export class StabilityClient {
  private readonly baseUrl: string;
  private readonly apiKey: string

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('STABILITY_API_KEY')
    this.baseUrl = 'https://api.stability.ai/v1/generation/'
  }


  async image2image(request: ImageToImageRequest, engineId: string, baseImagePath: string): Promise<GenerationResponse> {
    const url = `${this.baseUrl}${engineId}/image-to-image`
    const formData = createFormDataForImageToImage(request);
    return this.makeRequest(url, formData);
  }

  makeAuthHeader(): string {
    return `Bearer ${this.apiKey}`;
  }

  async makeRequest(url: string, formData: FormData): Promise<GenerationResponse> {
    try {
      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Accept: 'application/json',
            Authorization: this.makeAuthHeader()
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`Non-200 response: ${response.statusText}`);
      }

      const generationResponse = (response.data) as GenerationResponse as GenerationResponse;
      
      console.log(generationResponse)

      generationResponse.artifacts.forEach((image, index) => {
        fs.writeFileSync(
          path.join(__dirname, '..',
           `v1_img2img_${index}.png`),
           Buffer.from(image.base64, 'base64')
         );
      });

      return generationResponse;
    } catch (error) {
      console.error('Error generating images:', error.message);
    }
  }
}
