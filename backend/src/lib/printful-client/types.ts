export interface FileOption {
  id: string;
  type: string;
  title: string;
  additional_price: string;
  options?: Option[];
}

export interface Option {
  id: string;
  title: string;
  type: string;
  values: { [key: string]: string };
  additional_price: string;
  additional_price_breakdown: { [key: string]: string };
}

export interface Technique {
  key: string;
  display_name: string;
  is_default: boolean;
}

export interface Variant {
  id: number;
  product_id: number;
  name: string;
  size: string;
  color: string;
  color_code: string;
  color_code2: string;
  image: string;
  price: string;
  in_stock: boolean;
  availability_regions: { [key: string]: string };
  availability_status: { region: string; status: string }[];
  material: { name: string; percentage: number }[];
}

export interface Product {
  id: number;
  main_category_id: number;
  type: string;
  type_name: string;
  title: string;
  brand: string;
  model: string;
  image: string;
  variant_count: number;
  currency: string;
  files: FileOption[];
  options: Option[];
  is_discontinued: boolean;
  avg_fulfillment_time: number;
  description: string;
  techniques: Technique[];
  origin_country: string;
}

export interface SyncVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  is_ignored: boolean;
  sku: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: {
    type: string;
    id: number;
    url: string;
    options: {
      id: string;
      value: string;
    }[];
    hash: string;
    filename: string;
    mime_type: string;
    size: number;
    width: number;
    height: number;
    dpi: number;
    status: string;
    created: number;
    thumbnail_url: string;
    preview_url: string;
    visible: boolean;
    is_temporary: boolean;
  }[];
  options: {
    id: string;
    value: string;
  }[];
  main_category_id: number;
  warehouse_product_variant_id: number;
}

export interface SyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface GetSyncedProductResponse {
  code: number;
  result: {
    sync_product: SyncProduct;
    sync_variants: SyncVariant[];
  };
}
