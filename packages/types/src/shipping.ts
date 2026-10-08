import { ShippingStatus, ShippingCourier } from './enums.js';
import { IAddress } from './address.js';

/**
 * Available shipping rate option from courier calculation.
 */
export interface IShippingRate {
  courier: ShippingCourier | string;
  service: string; // e.g. "REG", "OKE", "YES", "SIUNT"
  serviceName: string; // e.g. "Layanan Reguler"
  cost: number; // in IDR
  etd: string; // Estimated time of delivery, e.g. "1-2 hari"
  description?: string;
}

/**
 * Active shipment details for an order.
 */
export interface IShipping {
  id: string;
  orderId: string;
  storeId: string;
  courier: ShippingCourier | string;
  service: string;
  trackingNumber?: string | null; // Waybill / Nomor Resi
  status: ShippingStatus;
  shippingCost: number;
  weight: number; // grams
  originAddress: IAddress;
  destinationAddress: IAddress;
  shippedAt?: string | Date | null;
  deliveredAt?: string | Date | null;
  history?: Array<{
    status: string;
    description: string;
    timestamp: string | Date;
  }>;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * DTO for querying available shipping courier rates.
 */
export interface CalculateShippingRateDto {
  storeId: string;
  originPostalCode: string;
  destinationPostalCode: string;
  weight: number; // grams
  couriers?: Array<ShippingCourier | string>;
}

/**
 * DTO for updating order shipment tracking number (resi).
 */
export interface UpdateShippingTrackingDto {
  trackingNumber: string;
  courier?: string;
}
