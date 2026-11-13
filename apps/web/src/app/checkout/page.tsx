import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export const metadata = {
  title: 'Checkout — Sokudo',
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <nav
        className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Beranda
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href="/cart" className="transition-colors hover:text-ink">
          Keranjang
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-ink-muted">Checkout</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-ink-muted">
            Lengkapi data pengiriman dan pilih metode pembayaran. Pesanan dari
            beberapa toko tetap satu pembayaran.
          </p>
        </div>
        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-800">
          <ShieldCheck
            className="h-3.5 w-3.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          Checkout aman
        </p>
      </div>

      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
