import { OrderStatus } from '@marketplace/types';

/**
 * Generates a human-friendly order reference number.
 * Example: "ORD-20261008-8A3F9C"
 */
export function generateOrderNumber(prefix = 'ORD'): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${dateStr}-${randomChars}`;
}

export interface OrderItemCalculationInput {
  price: number;
  quantity: number;
}

export interface OrderTotalsCalculation {
  subtotal: number;
  shippingCost: number;
  serviceFee: number;
  discountAmount: number;
  grandTotal: number;
}

/**
 * Calculates subtotal, fees, and grand total for an order.
 */
export function calculateOrderTotals(
  items: OrderItemCalculationInput[],
  shippingCost = 0,
  serviceFee = 1000, // Default IDR 1.000 platform/escrow fee
  discountAmount = 0
): OrderTotalsCalculation {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const safeDiscount = Math.min(discountAmount, subtotal);
  const grandTotal = Math.max(0, subtotal + shippingCost + serviceFee - safeDiscount);

  return {
    subtotal,
    shippingCost,
    serviceFee,
    discountAmount: safeDiscount,
    grandTotal,
  };
}

/**
 * Allowed transitions for order state machine.
 */
const VALID_ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING_PAYMENT]: [
    OrderStatus.PAID,
    OrderStatus.CANCELLED,
  ],
  [OrderStatus.PAID]: [
    OrderStatus.PROCESSING,
    OrderStatus.CANCELLED,
    OrderStatus.REFUNDED,
  ],
  [OrderStatus.PROCESSING]: [
    OrderStatus.SHIPPED,
    OrderStatus.CANCELLED,
  ],
  [OrderStatus.SHIPPED]: [
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,
  ],
  [OrderStatus.DELIVERED]: [
    OrderStatus.COMPLETED,
    OrderStatus.REFUNDED,
  ],
  [OrderStatus.COMPLETED]: [
    OrderStatus.REFUNDED,
  ],
  [OrderStatus.CANCELLED]: [],
  [OrderStatus.REFUNDED]: [],
};

/**
 * Checks whether an order can transition from its current status to a target status.
 */
export function canTransitionOrderStatus(
  currentStatus: OrderStatus,
  targetStatus: OrderStatus
): boolean {
  const allowed = VALID_ORDER_TRANSITIONS[currentStatus];
  if (!allowed) return false;
  return allowed.includes(targetStatus);
}
