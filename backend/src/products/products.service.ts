import {Injectable} from '@nestjs/common';
import {SyncProduct, SyncVariant} from "../lib/printful-client/types";
import {PrintfulClient} from "../lib/printful-client/printful-client";

@Injectable()
export class ProductsService {
  constructor(private readonly printfulClient: PrintfulClient) {
  }

  async getSyncedProduct(productId: number): Promise<{
    sync_product: SyncProduct;
    sync_variants: SyncVariant[];
  } | null> {
    try {
      const productData = await this.printfulClient.getSyncedProduct(productId);
      return productData.result;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  }
}
