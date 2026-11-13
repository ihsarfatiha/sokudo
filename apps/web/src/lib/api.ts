import {
  categories as demoCategories,
  filterDemoProducts,
  findDemoProduct,
} from './catalog';
import type {
  Category,
  CreatedOrder,
  OrderPayload,
  Product,
} from './types';

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  'http://localhost:4000/api'
).replace(/\/$/, '');

const categoryStyles: Record<
  string,
  { emoji: string; gradient: [string, string] }
> = {
  elektronik: { emoji: '💻', gradient: ['#1e3a8a', '#3b82f6'] },
  'fashion-pria': { emoji: '👔', gradient: ['#7c2d12', '#ea580c'] },
  'fashion-wanita': { emoji: '👗', gradient: ['#831843', '#ec4899'] },
  kesehatan: { emoji: '💊', gradient: ['#854d0e', '#facc15'] },
  'makanan-minuman': { emoji: '☕', gradient: ['#3f2d20', '#a16207'] },
  'peralatan-rumah': { emoji: '🏠', gradient: ['#581c87', '#a855f7'] },
  olahraga: { emoji: '🏋️', gradient: ['#14532d', '#22c55e'] },
  otomotif: { emoji: '🏍️', gradient: ['#0c4a6e', '#0ea5e9'] },
};

function styleFor(categorySlug: string) {
  return (
    categoryStyles[categorySlug] ?? {
      emoji: '🛍️',
      gradient: ['#1e293b', '#64748b'] as [string, string],
    }
  );
}

/** Accepts both the NestJS DTO and a raw Prisma product. */
function normalizeProduct(raw: any): Product {
  const categorySlug = String(
    raw.categorySlug ?? raw.category?.slug ?? 'elektronik'
  );
  const style = styleFor(categorySlug);

  return {
    id: String(raw.id),
    slug: String(raw.slug),
    title: String(raw.title ?? raw.name ?? 'Produk'),
    description: String(raw.description ?? ''),
    price: Number(raw.price ?? 0),
    originalPrice:
      raw.originalPrice != null ? Number(raw.originalPrice) : null,
    stock: Number(raw.stock ?? 0),
    rating: Number(raw.rating ?? 4.7),
    sold: Number(raw.sold ?? raw.soldCount ?? 0),
    category: String(
      raw.category?.name ?? raw.categoryName ?? 'Elektronik'
    ),
    categorySlug,
    store: raw.store ?? {
      id: String(raw.seller?.id ?? ''),
      name: String(raw.seller?.storeName ?? 'Sokudo Store'),
      slug: String(raw.seller?.storeSlug ?? 'sokudo-store'),
      city: String(raw.seller?.city ?? 'Jakarta'),
      rating: 4.7,
    },
    emoji: raw.emoji ?? style.emoji,
    gradient: raw.gradient ?? style.gradient,
    badges: Array.isArray(raw.badges) ? raw.badges : [],
    isFlashSale: Boolean(raw.isFlashSale),
    isFeatured: Boolean(raw.isFeatured),
  };
}

async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${API_URL}${path}`, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
      next: { revalidate: 30 },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? json) as T;
  } catch {
    return null;
  }
}

export interface ProductQuery {
  q?: string;
  category?: string;
  sort?: string;
  limit?: number;
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (query.q) params.set('search', query.q);
  if (query.category && query.category !== 'semua') {
    params.set('category', query.category);
  }
  if (query.sort) params.set('sort', query.sort);
  if (query.limit) params.set('limit', String(query.limit));

  const data = await apiGet<Product[] | { data: Product[] }>(
    `/products${params.size ? `?${params.toString()}` : ''}`
  );

  const list = Array.isArray(data) ? data : data?.data;
  if (list && list.length > 0) {
    return list.map(normalizeProduct);
  }

  return filterDemoProducts(query);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const data = await apiGet<Product>(`/products/${encodeURIComponent(slug)}`);
  if (data) return normalizeProduct(data);
  return findDemoProduct(slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await apiGet<Category[]>('/categories');
  if (Array.isArray(data) && data.length > 0) return data;
  return demoCategories;
}

export async function submitOrder(
  payload: OrderPayload,
  fallbackTotal: number
): Promise<CreatedOrder> {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const order = json?.data ?? json;
    return {
      orderNumber: order.orderNumber,
      totalAmount: Number(order.totalAmount ?? fallbackTotal),
      status: order.status ?? 'PENDING_PAYMENT',
      demo: false,
    };
  } catch {
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    return {
      orderNumber: `SKD-DEMO-${suffix}`,
      totalAmount: fallbackTotal,
      status: 'PENDING_PAYMENT',
      demo: true,
    };
  }
}

export { API_URL };
