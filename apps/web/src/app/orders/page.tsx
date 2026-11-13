import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { OrderTracker } from '@/components/orders/OrderTracker';

export const metadata = {
  title: 'Lacak Pesanan — Sokudo',
};

export default function OrdersPage() {
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
        <span className="text-ink-muted">Lacak pesanan</span>
      </nav>

      <div className="mt-6 border-b border-line pb-6">
        <h1 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
          Pesanan saya
        </h1>
        <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-ink-muted">
          Masukkan nomor pesanan untuk melihat status pengiriman terbaru.
        </p>
      </div>

      <div className="mt-8">
        <OrderTracker />
      </div>

      <div className="mt-12 grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="py-5 sm:pr-8">
          <p className="text-[13px] font-semibold">Riwayat pesanan ada di akun</p>
          <p className="mt-1 max-w-[42ch] text-[12.5px] leading-relaxed text-ink-muted">
            Masuk untuk melihat semua pesanan, alamat tersimpan, dan status
            pengiriman tanpa mengetik nomor pesanan.
          </p>
          <Link
            href="/auth/login"
            className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            Masuk ke akun
          </Link>
        </div>
        <div className="py-5 sm:pl-8">
          <p className="text-[13px] font-semibold">Nomor pesanan hilang?</p>
          <p className="mt-1 max-w-[42ch] text-[12.5px] leading-relaxed text-ink-muted">
            Cek email konfirmasi atau hubungi tim bantuan dengan menyertakan
            email dan tanggal transaksi.
          </p>
          <Link
            href="/contact"
            className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            Hubungi bantuan
          </Link>
        </div>
      </div>
    </div>
  );
}
