'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';
import { useCart, FREE_SHIPPING_MIN } from '@/components/cart/CartProvider';
import { ProductVisual } from '@/components/product/ProductVisual';
import { formatCurrency } from '@/lib/utils';

export function CartView() {
  const {
    items,
    subtotal,
    shippingFee,
    total,
    removeItem,
    setQuantity,
    ready,
  } = useCart();

  if (!ready) {
    return (
      <div className="border border-line bg-surface px-6 py-16 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
        Memuat keranjang
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-line bg-surface px-6 py-20 text-center">
        <ShoppingBag
          className="h-8 w-8 text-ink-soft"
          strokeWidth={1.25}
          aria-hidden="true"
        />
        <h2 className="mt-4 text-lg font-bold tracking-[-0.02em]">
          Keranjang masih kosong
        </h2>
        <p className="mt-1.5 max-w-[38ch] text-[13px] leading-relaxed text-ink-muted">
          Belum ada produk di keranjang. Mulai dari kategori atau cari langsung
          produk yang kamu butuhkan.
        </p>
        <Link href="/products" className="btn-primary mt-6">
          Mulai belanja
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const remaining = Math.max(0, FREE_SHIPPING_MIN - subtotal);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_MIN) * 100));

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
      <div>
        {remaining > 0 && (
          <div className="mb-6 border border-line bg-surface px-4 py-3.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-[13px] text-ink-muted">
                Tambah{' '}
                <span className="num font-semibold text-ink">
                  {formatCurrency(remaining)}
                </span>{' '}
                lagi untuk gratis ongkir
              </p>
              <span className="num text-[11px] text-ink-soft">
                {progress}%
              </span>
            </div>
            <div className="mt-2.5 h-1 w-full overflow-hidden bg-line">
              <div
                className="h-full bg-primary-600 transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-baseline justify-between border-b border-line pb-2.5">
          <h2 className="label-mono">Produk</h2>
          <span className="num text-[11px] text-ink-soft">
            {items.length} item
          </span>
        </div>

        <ul className="divide-y divide-line">
          {items.map((line) => (
            <li key={line.productId} className="flex gap-4 py-5 sm:gap-5">
              <Link
                href={`/products/${line.slug}`}
                className="shrink-0"
                aria-label={line.title}
              >
                <ProductVisual
                  slug={line.slug}
                  categorySlug={line.categorySlug}
                  className="h-24 w-24 sm:h-28 sm:w-28"
                  iconClassName="h-8 w-8"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/products/${line.slug}`}
                      className="line-clamp-2 text-[13.5px] font-semibold leading-snug underline-offset-4 hover:underline"
                    >
                      {line.title}
                    </Link>
                    <p className="mt-0.5 truncate text-[11px] text-ink-soft">
                      {line.storeName}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.productId)}
                    className="shrink-0 rounded-sm p-1.5 text-ink-soft transition-colors hover:bg-red-50 hover:text-red-700"
                    aria-label={`Hapus ${line.title}`}
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                  <div className="inline-flex h-8 items-center border border-line bg-surface">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(line.productId, line.quantity - 1)
                      }
                      className="flex h-full w-8 items-center justify-center text-ink-muted transition-colors hover:bg-ink/[0.05] hover:text-ink"
                      aria-label="Kurangi jumlah"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="num w-8 border-x border-line text-center text-[12px] font-medium">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(line.productId, line.quantity + 1)
                      }
                      className="flex h-full w-8 items-center justify-center text-ink-muted transition-colors hover:bg-ink/[0.05] hover:text-ink"
                      aria-label="Tambah jumlah"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="num text-sm font-semibold">
                      {formatCurrency(line.price * line.quantity)}
                    </p>
                    <p className="num text-[11px] text-ink-soft">
                      {formatCurrency(line.price)} / item
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Lanjut belanja
        </Link>
      </div>

      <aside className="h-fit lg:sticky lg:top-40">
        <div className="border border-line bg-surface">
          <div className="border-b border-line px-5 py-4">
            <h2 className="text-[13px] font-semibold">Ringkasan belanja</h2>
          </div>

          <dl className="space-y-2.5 px-5 py-4 text-[13px]">
            <div className="flex items-baseline justify-between text-ink-muted">
              <dt>Subtotal</dt>
              <dd className="num text-ink">{formatCurrency(subtotal)}</dd>
            </div>
            <div className="flex items-baseline justify-between text-ink-muted">
              <dt>Ongkos kirim</dt>
              <dd className="num text-ink">
                {shippingFee === 0 ? (
                  <span className="text-emerald-800">Gratis</span>
                ) : (
                  formatCurrency(shippingFee)
                )}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-dashed border-line pt-3">
              <dt className="text-sm font-semibold">Total</dt>
              <dd className="num text-base font-semibold">
                {formatCurrency(total)}
              </dd>
            </div>
          </dl>

          <div className="border-t border-line px-5 py-4">
            <Link href="/checkout" className="btn-primary w-full">
              Lanjut ke checkout
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-ink-soft">
              <ShieldCheck
                className="h-3.5 w-3.5 text-emerald-700"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              Transaksi aman dan terlindungi
            </p>
          </div>
        </div>

        <p className="mt-3 flex items-start gap-1.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-ink-soft">
          <Truck
            className="mt-0.5 h-3.5 w-3.5 shrink-0"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          Gratis ongkir untuk pesanan di atas Rp300.000
        </p>
      </aside>
    </div>
  );
}
