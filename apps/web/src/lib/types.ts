export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface StoreInfo {
  id: string;
  name: string;
  slug: string;
  city: string;
  rating: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  stock: number;
  rating: number;
  sold: number;
  category: string;
  categorySlug: string;
  store: StoreInfo;
  emoji: string;
  gradient: [string, string];
  badges: string[];
  isFlashSale?: boolean;
  isFeatured?: boolean;
}

export interface CartLine {
  productId: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  categorySlug: string;
  storeName: string;
  stock: number;
}

export interface OrderPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    recipientName: string;
    phoneNumber: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  items: Array<{ productId: string; quantity: number }>;
  notes?: string;
  courier?: string;
  paymentMethod?: string;
}

export interface CreatedOrder {
  orderNumber: string;
  totalAmount: number;
  status: string;
  demo?: boolean;
}
