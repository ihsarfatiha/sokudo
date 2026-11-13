'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Star } from 'lucide-react';
import { ProductVisual } from './ProductVisual';
import { AddToCartButton } from './AddToCartButton';
import type { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const reduce = useReducedMotion();
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.035, 0.21),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="card group relative flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative overflow-hidden">
        <Link
          href={`/products/${product.slug}`}
          className="block"
          aria-label={product.title}
        >
          <ProductVisual
            emoji={product.emoji}
            gradient={product.gradient}
            discount={discount}
            className="aspect-square w-full"
            emojiClassName="text-[4.5rem]"
          />
        </Link>

        <div className="absolute right-2.5 top-2.5 translate-y-0 opacity-100 transition-[opacity,transform] duration-200 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
          <AddToCartButton product={product} variant="icon" />
        </div>

        {product.isFlashSale && (
          <span className="absolute bottom-2.5 right-2.5 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950 shadow-sm">
            Flash sale
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[11px] font-medium uppercase tracking-wide text-gray-400">
            {product.category}
          </p>
          <span className="inline-flex shrink-0 items-center gap-0.5 text-[11px] font-medium text-gray-500">
            <Star
              className="h-3 w-3 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <Link href={`/products/${product.slug}`} className="mt-1.5">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary-700">
            {product.title}
          </h3>
        </Link>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="price text-[15px]">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] text-gray-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2.5 text-[11px] text-gray-500">
          <span className="truncate">{product.store.name}</span>
          <span className="shrink-0 tabular-nums">
            {product.sold.toLocaleString('id-ID')} terjual
          </span>
        </div>
      </div>
    </motion.article>
  );
}
