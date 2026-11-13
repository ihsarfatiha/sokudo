'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCart } from '@/components/cart/CartProvider';

export default function CartBadge() {
  const { itemCount, ready } = useCart();
  const reduce = useReducedMotion();
  const count = ready ? itemCount : 0;

  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center overflow-hidden rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={count}
          initial={reduce ? false : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 26 }}
          aria-hidden="true"
        >
          {count}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{count} item di keranjang</span>
    </span>
  );
}
