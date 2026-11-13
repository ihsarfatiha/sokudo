export type UserRole = "admin" | "seller" | "buyer";
export type UserStatus = "active" | "suspended" | "pending";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
  totalOrders: number;
  phone?: string;
  avatarUrl?: string;
}

export type StoreApprovalStatus = "approved" | "pending" | "rejected" | "suspended";

export interface SellerStore {
  id: string;
  sellerName: string;
  sellerEmail: string;
  storeName: string;
  storeSlug: string;
  category: string;
  status: StoreApprovalStatus;
  rating: number;
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  registeredAt: string;
  documents?: {
    businessNumber: string;
    taxId: string;
    idCardVerified: boolean;
  };
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  storeName: string;
  sellerId: string;
  itemsCount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  createdAt: string;
  shippingAddress: string;
}

export type TransactionType =
  | "order_payment"
  | "seller_payout"
  | "platform_commission"
  | "refund";

export type TransactionStatus = "completed" | "pending" | "failed";

export interface FinancialTransaction {
  id: string;
  transactionId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  date: string;
  storeName?: string;
  description: string;
  referenceId: string;
}

export type DisputeStatus =
  | "open"
  | "under_review"
  | "resolved_refunded"
  | "resolved_dismissed";

export type DisputePriority = "high" | "medium" | "low";

export interface AdminDispute {
  id: string;
  disputeNumber: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  sellerName: string;
  storeName: string;
  reason: string;
  amount: number;
  status: DisputeStatus;
  priority: DisputePriority;
  createdAt: string;
  customerNote: string;
  sellerResponse?: string;
  resolutionNote?: string;
}

export interface DashboardMetrics {
  totalRevenue: number;
  revenueGrowth: number;
  platformCommission: number;
  commissionGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  activeUsers: number;
  usersGrowth: number;
  pendingSellerApprovals: number;
  activeDisputes: number;
}
