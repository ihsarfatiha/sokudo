import { IProduct, IProductVariant } from './product.js';
import { IStore } from './store.js';

/**
 * Cart Item entity interface.
 */
export interface ICartItem {
  id: string;
  cartId: string;
  productId: string;
  product?: IProduct;
  variantId?: string | null;
  variant?: IProductVariant | null;
  storeId: string;
  store?: IStore;
  quantity: number;
  price: number; // Unit price at the time item is added/viewed
  notes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * User shopping cart.
 */
export interface ICart {
  id: string;
  userId: string;
  items: ICartItem[];
  totalPrice: number;
  totalQuantity: number;
}

/**
 * Cart items grouped by seller store (essential for multi-vendor checkout and shipping calculations).
 */
export interface IStoreGroupedCart {
  storeId: string;
  storeName: string;
  storeSlug: string;
  storeCity?: string;
  storePostalCode?: string;
  items: ICartItem[];
  subtotal: number;
  totalWeight: number; // grams
}

/**
 * DTO for adding an item to the cart.
 */
export interface AddToCartDto {
  productId: string;
  variantId?: string | null;
  quantity: number;
  notes?: string;
}

/**
 * DTO for updating cart item quantity or notes.
 */
export interface UpdateCartItemDto {
  quantity: number;
  notes?: string;
}
