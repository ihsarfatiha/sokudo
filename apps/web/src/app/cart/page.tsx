import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CartView } from '@/components/cart/CartView';

export const metadata = {
  title: 'Keranjang — Sokudo',
};

export default function CartPage() {
  return (
    <div className="bg-gray-50/60">
      <div className="container-page py-7 lg:py-9">
        <nav
          className="flex items-center gap-1.5 text-xs text-gray-500"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-primary-600">
            Beranda
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-medium text-gray-900">Keranjang</span>
        </nav>

        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Keranjang belanja
          </h1>
          <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-gray-600">
            Periksa jumlah produk sebelum melanjutkan ke pembayaran.
          </p>
        </div>

        <div className="mt-6">
          <CartView />
        </div>
      </div>
    </div>
  );
}
