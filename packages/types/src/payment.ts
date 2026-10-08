import { PaymentStatus, PaymentProvider, PaymentMethod } from './enums.js';

/**
 * Payment record interface.
 */
export interface IPayment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  provider: PaymentProvider;
  method: PaymentMethod;
  status: PaymentStatus;
  externalTransactionId?: string;
  paymentUrl?: string; // Snap redirect URL / checkout URL
  vaNumber?: string;
  qrCodeUrl?: string;
  metadata?: Record<string, any>;
  paidAt?: string | Date | null;
  expiresAt?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * DTO to initialize a payment for an order.
 */
export interface CreatePaymentDto {
  orderId: string;
  provider: PaymentProvider;
  method: PaymentMethod;
}

/**
 * Standardized payment gateway webhook payload (Midtrans / Xendit).
 */
export interface PaymentWebhookPayload {
  orderId: string;
  transactionId: string;
  statusCode: string;
  grossAmount: string | number;
  paymentType: string;
  transactionStatus: string;
  fraudStatus?: string;
  signatureKey?: string;
  rawPayload?: Record<string, any>;
}

/**
 * Payment status check response.
 */
export interface PaymentStatusResponseDto {
  paymentId: string;
  orderId: string;
  status: PaymentStatus;
  paidAt?: string | Date | null;
  paymentUrl?: string;
  vaNumber?: string;
}
