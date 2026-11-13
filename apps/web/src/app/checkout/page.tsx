import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export const metadata = {
  title: 'Checkout — Sokudo',
};

export default function CheckoutPage() {
  return (
    <div className="bg-gray-50/60">
      <div className="container-page py-7 lg:py-9">
        <nav
          className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-primary-600">
            Beranda
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href="/cart" className="transition-colors hover:text-primary-600">
            Keranjang
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-medium text-gray-900">Checkout</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Checkout
            </h1>
            <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-gray-600">
              Lengkapi data pengiriman dan pilih metode pembayaran. Pesanan dari
              beberapa toko tetap satu pembayaran.
            </p>
          </div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Checkout aman
          </p>
        </div>

        <div className="mt-6">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
