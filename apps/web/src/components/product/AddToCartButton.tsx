'use client';

import { useState } from 'react';
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  product: Product;
  variant?: 'icon' | 'full';
  className?: string;
}

export function AddToCartButton({
  product,
  variant = 'full',
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const soldOut = product.stock <= 0;

  function handleAdd() {
    if (soldOut) return;
    addItem(product, variant === 'full' ? quantity : 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleAdd}
        disabled={soldOut}
        aria-label={`Tambah ${product.title} ke keranjang`}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-surface/90 text-ink-muted backdrop-blur-sm transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40',
          added && 'border-emerald-700 bg-emerald-700 text-white',
          className
        )}
      >
        {added ? (
          <Check className="h-4 w-4" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
      </button>
    );
  }

  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row', className)}>
      <div className="inline-flex h-11 items-center border border-line bg-surface">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-full w-10 items-center justify-center text-ink-muted transition-colors hover:bg-ink/[0.05] hover:text-ink"
          aria-label="Kurangi jumlah"
        >
          <Minus className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <span className="num w-10 border-x border-line text-center text-[13px] font-medium">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() =>
            setQuantity((q) => Math.min(Math.max(1, product.stock), q + 1))
          }
          className="flex h-full w-10 items-center justify-center text-ink-muted transition-colors hover:bg-ink/[0.05] hover:text-ink"
          aria-label="Tambah jumlah"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={soldOut}
        className={cn(
          'btn-primary flex-1',
          added && 'border-emerald-800 bg-emerald-700 hover:bg-emerald-800'
        )}
      >
        {added ? (
          <>
            <Check className="h-4 w-4" aria-hidden="true" />
            Masuk ke keranjang
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            {soldOut ? 'Stok habis' : 'Tambah ke keranjang'}
          </>
        )}
      </button>
    </div>
  );
}
