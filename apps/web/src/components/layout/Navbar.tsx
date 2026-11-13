'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CartBadge from './CartBadge';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  Store,
  User,
  X,
} from 'lucide-react';
import { categories } from '@/lib/catalog';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? 'shadow-soft' : ''
      }`}
    >
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="container-page flex items-center justify-between gap-4 py-1.5 text-xs text-gray-600">
          <p className="flex min-w-0 items-center gap-1.5">
            <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 sm:block" />
            <span className="truncate">
              Gratis ongkir untuk pesanan di atas Rp300.000
            </span>
          </p>
          <nav className="hidden items-center gap-4 sm:flex" aria-label="Navigasi sekunder">
            <Link
              href="/seller"
              className="link-underline transition-colors hover:text-primary-600"
            >
              Jual di Sokudo
            </Link>
            <Link
              href="/help"
              className="link-underline transition-colors hover:text-primary-600"
            >
              Bantuan
            </Link>
            <Link
              href="/orders"
              className="link-underline transition-colors hover:text-primary-600"
            >
              Lacak pesanan
            </Link>
          </nav>
        </div>
      </div>

      <div className="container-page">
        <div className="flex h-16 items-center gap-3 sm:gap-5">
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Sokudo, beranda">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white shadow-soft">
              <ShoppingBag className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
              Sokudo<span className="text-primary-600">.</span>
            </span>
          </Link>

          <form
            action="/products"
            role="search"
            className="group relative hidden flex-1 md:block"
          >
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary-600"
              aria-hidden="true"
            />
            <input
              type="search"
              name="q"
              placeholder="Cari produk, toko, atau kategori"
              aria-label="Cari produk, toko, atau kategori"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-24 text-sm text-gray-900 placeholder:text-gray-400 transition-[border-color,background-color,box-shadow] duration-200 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/10"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-primary-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-700 active:scale-95"
            >
              Cari
            </button>
          </form>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link
              href="/cart"
              className="relative rounded-lg p-2 text-gray-600 transition-[background-color,transform,color] duration-200 hover:bg-gray-100 hover:text-gray-900 active:scale-95"
              aria-label="Keranjang belanja"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              <CartBadge />
            </Link>

            <Link
              href="/auth/login"
              className="btn-secondary hidden !px-3.5 !py-2 sm:inline-flex"
            >
              <User className="h-4 w-4" aria-hidden="true" />
              Masuk
            </Link>

            <Link
              href="/auth/register"
              className="btn-primary hidden !px-3.5 !py-2 sm:inline-flex"
            >
              Daftar
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-lg p-2 text-gray-600 transition-[background-color,transform] duration-200 hover:bg-gray-100 hover:text-gray-900 active:scale-95 md:hidden"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={reduce ? false : { rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {menuOpen ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <div className="pb-3 md:hidden">
          <form action="/products" role="search" className="group relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary-600"
              aria-hidden="true"
            />
            <input
              type="search"
              name="q"
              placeholder="Cari produk..."
              aria-label="Cari produk"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-[border-color,background-color,box-shadow] duration-200 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/10"
            />
          </form>
        </div>
      </div>

      <div className="hidden border-t border-gray-100 md:block">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-1 py-1.5">
            <Link
              href="/products"
              className="flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              Semua Produk
            </Link>
            <span className="mx-1 h-4 w-px bg-gray-200" aria-hidden="true" />
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary-600"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-gray-200 bg-white md:hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } },
              }}
              className="container-page space-y-1 py-3"
            >
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-2 pb-2"
              >
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn-secondary w-full"
                >
                  <User className="h-4 w-4" aria-hidden="true" />
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full"
                >
                  Daftar
                </Link>
              </motion.div>

              {categories.map((category) => (
                <motion.div key={category.slug} variants={itemVariants}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <span aria-hidden="true">{category.icon}</span>
                      {category.name}
                    </span>
                    <ChevronDown
                      className="h-4 w-4 -rotate-90 text-gray-300"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="pt-2">
                <Link
                  href="/seller"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2.5 text-sm font-semibold text-primary-700"
                >
                  <Store className="h-4 w-4" aria-hidden="true" />
                  Mulai berjualan
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};
