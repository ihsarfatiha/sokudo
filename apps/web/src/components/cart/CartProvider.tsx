'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { CartLine, Product } from '@/lib/types';

const STORAGE_KEY = 'sokudo-cart-v1';
const FREE_SHIPPING_MIN = 300000;
const FLAT_SHIPPING = 15000;

interface CartContextValue {
  items: CartLine[];
  ready: boolean;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartLine[]);
    } catch {
      // ignore corrupted storage
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage may be unavailable
    }
  }, [items, ready]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((line) => line.productId === product.id);
      const max = Math.max(1, product.stock);
      if (existing) {
        return prev.map((line) =>
          line.productId === product.id
            ? {
                ...line,
                quantity: Math.min(max, line.quantity + quantity),
              }
            : line
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          quantity: Math.min(max, Math.max(1, quantity)),
          categorySlug: product.categorySlug,
          storeName: product.store.name,
          stock: product.stock,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((line) => line.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((line) =>
          line.productId === productId
            ? {
                ...line,
                quantity: Math.min(
                  Math.max(1, line.stock),
                  Math.max(0, quantity)
                ),
              }
            : line
        )
        .filter((line) => line.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce(
      (sum, line) => sum + line.price * line.quantity,
      0
    );
    const itemCount = items.reduce((sum, line) => sum + line.quantity, 0);
    const shippingFee =
      subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : FLAT_SHIPPING;

    return {
      items,
      ready,
      itemCount,
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
      addItem,
      removeItem,
      setQuantity,
      clear,
    };
  }, [items, ready, addItem, removeItem, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

export { FREE_SHIPPING_MIN, FLAT_SHIPPING };
