import {Body, Controller, Post} from '@nestjs/common';
import {GenerationsService} from "./generations.service";
import {Creatures} from "../lib/image_generation/prompt_library/chumby";

@Controller('generations')
export class GenerationsController {
  constructor(private readonly generationsService: GenerationsService) {}

  @Post('sitting-chumby')
  async generateImageToImage(
    @Body('creature') creature: Creatures,
    @Body('apparel') apparel: string[]
  ): Promise<any> {
    return await this.generationsService.generateSittingChumby(creature, apparel);
  }
}
