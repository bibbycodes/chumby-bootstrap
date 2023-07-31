import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {PrintfulClient} from "../lib/printful-client/printful-client";
import {ConfigModule, ConfigService} from "@nestjs/config"; // Import the ProductsService

@Module({
  controllers: [ProductsController],
  imports: [ConfigModule],
  providers: [ProductsService, ConfigService, PrintfulClient], // Register the ProductsService
})
export class ProductsModule {}
