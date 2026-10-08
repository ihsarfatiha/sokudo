import { StoreStatus } from './enums.js';
import { IAddress } from './address.js';
import { IUser } from './user.js';

/**
 * Store / Seller entity interface.
 */
export interface IStore {
  id: string;
  userId: string;
  user?: IUser;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  status: StoreStatus;
  rating: number;
  reviewCount: number;
  productCount?: number;
  addressId?: string;
  address?: IAddress;
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  balance?: number; // Seller wallet balance in IDR
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * DTO for opening/registering a new store.
 */
export interface CreateStoreDto {
  name: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  address: {
    street: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
    phone: string;
  };
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
}

/**
 * DTO for updating store details.
 */
export interface UpdateStoreDto {
  name?: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  status?: StoreStatus;
}

/**
 * Seller dashboard performance metrics.
 */
export interface StoreMetricsDto {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalProducts: number;
  averageRating: number;
  currentBalance: number;
}
