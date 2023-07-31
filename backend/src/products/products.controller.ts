import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import {GetSyncedProductResponse, SyncProduct, SyncVariant} from "../lib/printful-client/types"; // Import the ProductsService

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get(':productId')
  async getProduct(@Param('productId', ParseIntPipe) productId: number): Promise<{
    sync_product: SyncProduct;
    sync_variants: SyncVariant[];
  } | null> {
    return this.productService.getSyncedProduct(productId);
  }
}
