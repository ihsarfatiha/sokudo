import Link from 'next/link';
import { ProductVisual } from './ProductVisual';
import { AddToCartButton } from './AddToCartButton';
import type { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <article className="group flex flex-col">
      <div className="relative">
        <Link
          href={`/products/${product.slug}`}
          className="block overflow-hidden"
          aria-label={product.title}
        >
          <ProductVisual
            slug={product.slug}
            categorySlug={product.categorySlug}
            discount={discount}
            className="aspect-[4/5] w-full"
            iconClassName="h-[26%] w-[26%]"
          />
        </Link>

        <div className="absolute right-2.5 top-2.5">
          <AddToCartButton product={product} variant="icon" />
        </div>

        {product.badges[0] && (
          <span className="absolute bottom-2.5 left-2.5 rounded-sm bg-surface/95 px-1.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-ink-muted">
            {product.badges[0]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <div className="flex items-baseline justify-between gap-2">
          <p className="label-mono truncate">{product.category}</p>
          <span className="num shrink-0 text-[11px] text-ink-soft">
            <span className="text-amber-700">★</span> {product.rating.toFixed(1)}
          </span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-[13.5px] font-semibold leading-snug text-ink underline-offset-4 group-hover:underline">
            {product.title}
          </h3>
        </Link>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="num text-sm font-semibold text-ink">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="num text-[11px] text-ink-soft line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-[11px] text-ink-soft">
          <span className="truncate">{product.store.name}</span>
          <span className="num shrink-0">
            {product.sold.toLocaleString('id-ID')} terjual
          </span>
        </div>
      </div>
    </article>
  );
}
