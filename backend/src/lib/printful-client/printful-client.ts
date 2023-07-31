import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {GetSyncedProductResponse, Product} from "./types";
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrintfulClient {
  private BASE_URL = 'https://api.printful.com';
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get('PRINTFUL_API_TOKEN');
    console.log(this.apiKey)
  }

  private async makeRequest<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    data?: any
  ): Promise<T> {
    const url = `${this.BASE_URL}${endpoint}`;
    console.log({url})
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    };

    const response: AxiosResponse<T> =
      method === 'GET'
        ? await axios.get(url, config)
        : await axios.post(url, data, config);
    
    console.log(response)
    return response.data;
  }

  public async getSyncedProduct(product_id: number): Promise<GetSyncedProductResponse> {
    const endpoint = `/store/products/${product_id}`;
    return this.makeRequest<GetSyncedProductResponse>('GET', endpoint);
  }

  public async createProduct(productData: Product): Promise<any> {
    const endpoint = '/store/products';
    return this.makeRequest<any>('POST', endpoint, productData);
  }
}
