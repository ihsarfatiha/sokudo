/**
 * User roles in the marketplace system.
 */
export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

/**
 * User account status.
 */
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

/**
 * Store / Seller account verification and operational status.
 */
export enum StoreStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
}

/**
 * Product listing status.
 */
export enum ProductStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

/**
 * Order fulfillment workflow status.
 */
export enum OrderStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

/**
 * Payment transaction status.
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
  REFUNDED = 'REFUNDED',
}

/**
 * Supported payment gateway providers.
 */
export enum PaymentProvider {
  MIDTRANS = 'MIDTRANS',
  XENDIT = 'XENDIT',
  MANUAL_TRANSFER = 'MANUAL_TRANSFER',
}

/**
 * Payment method channels.
 */
export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  VIRTUAL_ACCOUNT = 'VIRTUAL_ACCOUNT',
  EWALLET = 'EWALLET',
  QRIS = 'QRIS',
  CREDIT_CARD = 'CREDIT_CARD',
}

/**
 * Shipping package status.
 */
export enum ShippingStatus {
  PENDING = 'PENDING',
  READY_TO_SHIP = 'READY_TO_SHIP',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED',
}

/**
 * Supported Indonesian logistics couriers.
 */
export enum ShippingCourier {
  JNE = 'JNE',
  JNT = 'JNT',
  SICEPAT = 'SICEPAT',
  ANTERAJA = 'ANTERAJA',
  GOSEND = 'GOSEND',
  GRABEXPRESS = 'GRABEXPRESS',
}
