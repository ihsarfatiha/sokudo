import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { OrderTracker } from '@/components/orders/OrderTracker';

export const metadata = {
  title: 'Lacak Pesanan — Sokudo',
};

export default function OrdersPage() {
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
          <span className="font-medium text-gray-900">Lacak pesanan</span>
        </nav>

        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Pesanan saya
          </h1>
          <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-gray-600">
            Masukkan nomor pesanan untuk melihat status pengiriman terbaru.
          </p>
        </div>

        <div className="mt-6">
          <OrderTracker />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="card p-5">
            <p className="text-sm font-semibold text-gray-900">
              Riwayat pesanan ada di akun
            </p>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              Masuk untuk melihat semua pesanan, alamat tersimpan, dan status
              pengiriman tanpa mengetik nomor pesanan.
            </p>
            <Link
              href="/auth/login"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              Masuk ke akun
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="card p-5">
            <p className="text-sm font-semibold text-gray-900">
              Nomor pesanan hilang?
            </p>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              Cek email konfirmasi atau hubungi tim bantuan dengan menyertakan
              email dan tanggal transaksi.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              Hubungi bantuan
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
