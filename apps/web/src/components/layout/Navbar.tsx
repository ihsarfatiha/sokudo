'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Store,
  ChevronDown,
} from 'lucide-react';

const categories = [
  'Elektronik',
  'Fashion Pria',
  'Fashion Wanita',
  'Kesehatan',
  'Makanan & Minuman',
  'Peralatan Rumah',
  'Olahraga',
  'Otomotif',
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      {/* Top bar */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-gray-600 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/seller" className="flex items-center gap-1 hover:text-primary-600">
              <Store className="h-3.5 w-3.5" />
              Mulai Berjualan
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/help" className="hover:text-primary-600">Bantuan</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary-600">Marketplace</h1>
          </Link>

          {/* Search bar */}
          <div className="hidden flex-1 md:block">
            <div className="relative mx-4 max-w-2xl">
              <input
                type="text"
                placeholder="Cari produk, toko, atau kategori..."
                className={`w-full rounded-lg border bg-gray-50 py-2.5 pl-10 pr-4 text-sm transition-all ${isSearchFocused ? 'border-primary-500 bg-white ring-2 ring-primary-500/20' : 'border-gray-300 hover:border-gray-400'}`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                0
              </span>
            </Link>

            <Link
              href="/auth/login"
              className="btn-secondary hidden sm:inline-flex"
            >
              <User className="mr-1.5 h-4 w-4" />
              Masuk
            </Link>

            <Link
              href="/auth/register"
              className="btn-primary hidden sm:inline-flex"
            >
              Daftar
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari produk..."
              className="input-field pl-10"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="hidden border-t border-gray-100 md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto py-2">
            <Link
              href="/products"
              className="flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-600"
            >
              Semua Kategori
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            <div className="mx-1 h-4 w-px bg-gray-300" />
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary-600"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link href="/auth/login" className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Masuk
            </Link>
            <Link href="/auth/register" className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Daftar
            </Link>
            <hr className="my-2" />
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                {cat}
              </Link>
            ))}
            <hr className="my-2" />
            <Link href="/seller" className="block rounded-lg px-3 py-2 text-sm text-primary-600 hover:bg-primary-50">
              Mulai Berjualan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
