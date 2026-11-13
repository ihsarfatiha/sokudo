'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { categories } from '@/lib/catalog';
import { useCart } from '@/components/cart/CartProvider';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="bg-ink text-paper">
        <div className="mx-auto flex max-w-8xl items-center justify-between gap-4 px-4 py-1.5 sm:px-6 lg:px-8">
          <p className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-paper/65">
            Gratis ongkir di atas Rp300.000
          </p>
          <nav className="hidden items-center gap-5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/65 sm:flex">
            <Link href="/seller" className="transition-colors hover:text-paper">
              Jual di Sokudo
            </Link>
            <Link
              href="/help"
              className="hidden transition-colors hover:text-paper sm:inline"
            >
              Bantuan
            </Link>
            <Link
              href="/orders"
              className="transition-colors hover:text-paper"
            >
              Lacak pesanan
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[70px] items-center gap-5">
          <Link
            href="/"
            className="flex shrink-0 items-baseline gap-2"
            aria-label="Sokudo — beranda"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 translate-y-[-2px] bg-primary-600"
              aria-hidden="true"
            />
            <span className="text-[22px] font-extrabold leading-none tracking-[-0.05em] text-ink">
              sokudo
            </span>
          </Link>

          <form action="/products" className="hidden flex-1 md:block" role="search">
            <div className="group relative mx-auto max-w-xl">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
                aria-hidden="true"
              />
              <input
                type="search"
                name="q"
                placeholder="Cari produk, toko, atau kategori"
                aria-label="Cari produk"
                className="h-10 w-full rounded-sm border border-line bg-surface pl-9 pr-20 text-sm text-ink placeholder:text-ink-soft transition-colors focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-primary-600/15"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 h-8 rounded-sm bg-ink px-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-paper transition-colors hover:bg-ink/85"
              >
                Cari
              </button>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link href="/auth/login" className="btn-ghost hidden sm:inline-flex">
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="btn-primary hidden !px-4 !py-2.5 !text-[13px] sm:inline-flex"
            >
              Daftar
            </Link>

            <Link
              href="/cart"
              className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-sm border border-transparent text-ink transition-colors hover:border-line hover:bg-surface"
              aria-label={`Keranjang belanja, ${itemCount} item`}
            >
              <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="num absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-sm bg-primary-600 px-1 text-[10px] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-sm text-ink transition-colors hover:bg-surface md:hidden"
              aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        <form action="/products" className="pb-3 md:hidden" role="search">
          <div className="relative">
            <input
              type="search"
              name="q"
              placeholder="Cari produk"
              aria-label="Cari produk"
              className="input-field pl-9"
            />
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              aria-hidden="true"
            />
          </div>
        </form>
      </div>

      <div className="hidden border-t border-line md:block">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-2.5">
            <Link
              href="/products"
              className="label-mono transition-colors hover:text-ink"
            >
              Semua produk
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="text-[13px] text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-line bg-paper md:hidden">
          <div className="mx-auto max-w-8xl px-4 py-2 sm:px-6">
            <div className="flex items-center justify-between border-b border-line py-3">
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-ink"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Masuk
              </Link>
              <Link
                href="/auth/register"
                className="btn-primary !px-4 !py-2 !text-[13px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Daftar
              </Link>
            </div>
            <nav className="divide-y divide-line">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products?category=${category.slug}`}
                  className="flex items-center justify-between py-3 text-sm text-ink-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                  <span className="ml-4 truncate font-mono text-[9px] uppercase tracking-[0.1em] text-ink-soft">
                    {category.description}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-line py-3">
              <Link
                href="/seller"
                className="text-sm font-semibold text-ink"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mulai berjualan
              </Link>
              <Link
                href="/help"
                className="text-sm text-ink-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bantuan
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
