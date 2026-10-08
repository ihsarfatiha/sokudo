import { OrderStatus, PaymentMethod, PaymentProvider } from './enums.js';
import { IAddress } from './address.js';
import { IUser } from './user.js';
import { IStore } from './store.js';
import { IPayment } from './payment.js';
import { IShipping } from './shipping.js';

/**
 * Single item line in an order.
 */
export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage?: string;
  variantId?: string | null;
  variantName?: string | null;
  sku?: string;
  price: number; // Unit price at order time in IDR
  quantity: number;
  subtotal: number;
  notes?: string;
}

/**
 * Order entity interface.
 */
export interface IOrder {
  id: string;
  orderNumber: string; // Human readable, e.g. "ORD-20261008-0012"
  userId: string;
  user?: IUser;
  storeId: string;
  store?: IStore;
  status: OrderStatus;
  items: IOrderItem[];
  subtotal: number; // Sum of items subtotal in IDR
  shippingCost: number; // Courier shipping cost in IDR
  serviceFee: number; // Platform fee / escrow fee in IDR
  discountAmount?: number;
  grandTotal: number; // subtotal + shippingCost + serviceFee - discountAmount
  shippingAddress: IAddress;
  paymentId?: string;
  payment?: IPayment;
  shipping?: IShipping;
  cancelReason?: string;
  notes?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Store-specific order package payload within a multi-store checkout.
 */
export interface StoreCheckoutGroupDto {
  storeId: string;
  courier: string;
  service: string;
  shippingCost: number;
  notes?: string;
}

/**
 * DTO for executing checkout from cart.
 */
export interface CheckoutDto {
  shippingAddressId: string;
  storeCheckouts: StoreCheckoutGroupDto[];
  paymentProvider: PaymentProvider;
  paymentMethod: PaymentMethod;
}

/**
 * DTO for querying order list with filters.
 */
export interface OrderFilterDto {
  userId?: string;
  storeId?: string;
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

/**
 * DTO for cancelling an order.
 */
export interface CancelOrderDto {
  orderId: string;
  reason: string;
}

/**
 * DTO for updating order status.
 */
export interface UpdateOrderStatusDto {
  status: OrderStatus;
  notes?: string;
}
