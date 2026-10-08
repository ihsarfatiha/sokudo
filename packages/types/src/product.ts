import { ProductStatus } from './enums.js';
import { ICategory } from './category.js';
import { IStore } from './store.js';

/**
 * Product Image interface.
 */
export interface IProductImage {
  id: string;
  productId: string;
  url: string;
  isPrimary: boolean;
  displayOrder: number;
}

/**
 * Product Variant interface (SKU, price, stock, specific attributes like size/color).
 */
export interface IProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  weight: number; // in grams
  attributes?: Record<string, string>; // e.g. { "Warna": "Hitam", "Ukuran": "L" }
  imageUrl?: string;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Core Product entity interface.
 */
export interface IProduct {
  id: string;
  storeId: string;
  store?: IStore;
  categoryId: string;
  category?: ICategory;
  name: string;
  slug: string;
  description: string;
  price: number; // Min or base price in IDR
  compareAtPrice?: number | null;
  stock: number; // Aggregated stock
  weight: number; // Base weight in grams (used for shipping rate calculation)
  status: ProductStatus;
  images: IProductImage[];
  variants: IProductVariant[];
  rating: number;
  reviewCount: number;
  soldCount: number;
  viewCount?: number;
  isFeatured?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * DTO for creating a product variant.
 */
export interface CreateProductVariantDto {
  sku: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  weight: number;
  attributes?: Record<string, string>;
  imageUrl?: string;
}

/**
 * DTO for creating a new product.
 */
export interface CreateProductDto {
  name: string;
  categoryId: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  weight: number;
  images: Array<{
    url: string;
    isPrimary: boolean;
    displayOrder: number;
  }>;
  variants?: CreateProductVariantDto[];
  status?: ProductStatus;
}

/**
 * DTO for updating an existing product.
 */
export interface UpdateProductDto extends Partial<CreateProductDto> {
  id?: string;
}

/**
 * Filter parameters for querying catalog products.
 */
export interface ProductFilterDto {
  storeId?: string;
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
  sortBy?: 'price_asc' | 'price_desc' | 'popular' | 'latest' | 'rating';
  page?: number;
  limit?: number;
}
