import {Body, Controller, Post} from '@nestjs/common';
import {GenerationsService} from "./generations.service";
import {Creatures} from "../lib/image_generation/prompt_library/chumby";

@Controller('generations')
export class GenerationsController {
  constructor(private readonly generationsService: GenerationsService) {}

  @Post('sitting-chumby')
  async generateImageToImage(
    @Body() all: any,
    // @Body('creature') creature: Creatures,
    // @Body('apparel') apparel: string[]
  ): Promise<any> {
    console.log(all)
    return await this.generationsService.generateSittingChumby(all.creature, all.apparel);
  }
}
