'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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
import { styleForLine } from '@/lib/product-style';
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
  const reduce = useReducedMotion();

  if (!ready) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="card h-64 animate-pulse bg-gray-50" />
        <div className="card h-72 animate-pulse bg-gray-50" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center px-6 py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
          <ShoppingBag className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-lg font-bold text-gray-900">
          Keranjang masih kosong
        </h2>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-gray-600">
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        {remaining > 0 ? (
          <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3">
            <Truck
              className="mt-0.5 h-4 w-4 shrink-0 text-primary-600"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-primary-900">
                Tambah{' '}
                <span className="font-semibold tabular-nums">
                  {formatCurrency(remaining)}
                </span>{' '}
                lagi untuk gratis ongkir.
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-primary-100">
                <div
                  className="h-full rounded-full bg-primary-600 transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700">
            <Truck className="h-4 w-4 shrink-0" aria-hidden="true" />
            Selamat, pesanan ini sudah gratis ongkir.
          </div>
        )}

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Produk di keranjang
            </h2>
            <span className="text-xs text-gray-500">{items.length} produk</span>
          </div>

          <ul className="divide-y divide-gray-100">
            <AnimatePresence initial={false}>
              {items.map((line) => {
                const style = styleForLine(line.slug, line.categorySlug);
                return (
                  <motion.li
                    key={line.productId}
                    layout={!reduce}
                    exit={
                      reduce
                        ? { opacity: 0 }
                        : { opacity: 0, x: -16, transition: { duration: 0.18 } }
                    }
                    className="flex gap-3 p-4 sm:gap-4"
                  >
                    <Link
                      href={`/products/${line.slug}`}
                      className="shrink-0"
                      aria-label={line.title}
                    >
                      <ProductVisual
                        emoji={style.emoji}
                        gradient={style.gradient}
                        className="h-20 w-20 rounded-lg sm:h-24 sm:w-24"
                        emojiClassName="text-3xl sm:text-4xl"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/products/${line.slug}`}
                            className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 underline-offset-4 hover:text-primary-700 hover:underline"
                          >
                            {line.title}
                          </Link>
                          <p className="mt-0.5 truncate text-[11px] text-gray-500">
                            {line.storeName}
                          </p>
                        </div>
                        <motion.button
                          type="button"
                          onClick={() => removeItem(line.productId)}
                          whileTap={reduce ? undefined : { scale: 0.88 }}
                          className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label={`Hapus ${line.title}`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </motion.button>
                      </div>

                      <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-2.5">
                        <div className="inline-flex h-8 items-center overflow-hidden rounded-lg border border-gray-300 bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(line.productId, line.quantity - 1)
                            }
                            className="flex h-full w-8 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-90"
                            aria-label="Kurangi jumlah"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="flex w-8 justify-center overflow-hidden border-x border-gray-200 text-xs font-semibold tabular-nums text-gray-900">
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span
                                key={line.quantity}
                                initial={reduce ? false : { y: 6, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={reduce ? { opacity: 0 } : { y: -6, opacity: 0 }}
                                transition={{ duration: 0.14 }}
                              >
                                {line.quantity}
                              </motion.span>
                            </AnimatePresence>
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(line.productId, line.quantity + 1)
                            }
                            className="flex h-full w-8 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-90"
                            aria-label="Tambah jumlah"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold tabular-nums text-gray-900">
                            {formatCurrency(line.price * line.quantity)}
                          </p>
                          <p className="text-[11px] text-gray-400 tabular-nums">
                            {formatCurrency(line.price)} / item
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        <Link
          href="/products"
          className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Lanjut belanja
        </Link>
      </div>

      <aside className="h-fit lg:sticky lg:top-36">
        <div className="card overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Ringkasan belanja
            </h2>
          </div>

          <dl className="space-y-2.5 px-5 py-4 text-sm">
            <div className="flex items-baseline justify-between text-gray-500">
              <dt>Subtotal</dt>
              <dd className="tabular-nums text-gray-900">
                {formatCurrency(subtotal)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between text-gray-500">
              <dt>Ongkos kirim</dt>
              <dd className="tabular-nums">
                {shippingFee === 0 ? (
                  <span className="font-medium text-emerald-600">Gratis</span>
                ) : (
                  <span className="text-gray-900">
                    {formatCurrency(shippingFee)}
                  </span>
                )}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-gray-100 pt-3">
              <dt className="font-semibold text-gray-900">Total</dt>
              <dd className="text-lg font-bold tabular-nums text-gray-900">
                {formatCurrency(total)}
              </dd>
            </div>
          </dl>

          <div className="border-t border-gray-100 px-5 py-4">
            <Link href="/checkout" className="btn-primary w-full">
              Lanjut ke checkout
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
              <ShieldCheck
                className="h-3.5 w-3.5 text-emerald-600"
                aria-hidden="true"
              />
              Transaksi aman dan terlindungi
            </p>
          </div>
        </div>

        <p className="mt-3 rounded-lg bg-gray-50 px-3 py-2.5 text-center text-[11px] leading-relaxed text-gray-500">
          Gratis ongkir untuk pesanan di atas Rp300.000 sebelum ongkir.
        </p>
      </aside>
    </div>
  );
}
