import {Module} from '@nestjs/common';
import {GenerationsService} from "./generations.service";
import {StabilityClient} from "../lib/image_generation/stability/stability-client";
import {GenerationsController} from "./generations.controller";
import {ConfigModule} from "@nestjs/config";
import {ImageModel} from 'src/db/image/image.model';
import {S3Wrapper} from "../lib/aws/s3-wrapper";
import {MongooseModule} from '@nestjs/mongoose';
import {ImageSchema, Image} from "../db/image/image.schema";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{name: Image.name, schema: ImageSchema}]),
  ],
  controllers: [GenerationsController],
  providers: [GenerationsService, StabilityClient, S3Wrapper, ImageModel],
})
export class GenerationsModule {
}
