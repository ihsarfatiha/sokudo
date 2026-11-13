import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CartView } from '@/components/cart/CartView';

export const metadata = {
  title: 'Keranjang — Sokudo',
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <nav
        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Beranda
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-ink-muted">Keranjang</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            Keranjang
          </h1>
          <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-ink-muted">
            Periksa jumlah dan varian produk sebelum melanjutkan ke pembayaran.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
