'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Minus, Plus, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { useToast } from '@/components/ui/Toast';
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
  const { push } = useToast();
  const reduce = useReducedMotion();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const soldOut = product.stock <= 0;

  function handleAdd() {
    if (soldOut) return;
    const amount = variant === 'full' ? quantity : 1;
    addItem(product, amount);
    setAdded(true);
    push({
      title: 'Ditambahkan ke keranjang',
      description: `${amount} × ${product.title}`,
      emoji: product.emoji,
      gradient: product.gradient,
      href: '/cart',
      hrefLabel: 'Lihat keranjang',
    });
    window.setTimeout(() => setAdded(false), 1600);
  }

  if (variant === 'icon') {
    return (
      <motion.button
        type="button"
        onClick={handleAdd}
        disabled={soldOut}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        aria-label={`Tambah ${product.title} ke keranjang`}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md ring-1 ring-black/5 backdrop-blur transition-colors duration-200 hover:bg-primary-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40',
          added && 'bg-emerald-600 text-white hover:bg-emerald-600',
          className
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={added ? 'added' : 'idle'}
            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.14 }}
          >
            {added ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    );
  }

  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row', className)}>
      <div className="inline-flex h-11 items-center overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
        <motion.button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          whileTap={reduce ? undefined : { scale: 0.9 }}
          className="flex h-full w-10 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          aria-label="Kurangi jumlah"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </motion.button>
        <span className="flex w-10 justify-center overflow-hidden border-x border-gray-200 text-sm font-semibold tabular-nums text-gray-900">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={quantity}
              initial={reduce ? false : { y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: -8, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              {quantity}
            </motion.span>
          </AnimatePresence>
        </span>
        <motion.button
          type="button"
          onClick={() =>
            setQuantity((q) => Math.min(Math.max(1, product.stock), q + 1))
          }
          whileTap={reduce ? undefined : { scale: 0.9 }}
          className="flex h-full w-10 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          aria-label="Tambah jumlah"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      </div>

      <motion.button
        type="button"
        onClick={handleAdd}
        disabled={soldOut}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        className={cn(
          'btn-primary flex-1',
          added && '!bg-emerald-600 hover:!bg-emerald-700'
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={added ? 'added' : 'idle'}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="inline-flex items-center gap-2"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Ditambahkan
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                {soldOut ? 'Stok habis' : 'Tambah ke keranjang'}
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
