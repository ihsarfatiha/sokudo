import Link from 'next/link';
import { ArrowRight, PackageSearch } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-gray-50/60">
      <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
        <div className="card w-full max-w-lg px-6 py-12 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <PackageSearch className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Galat 404
          </p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Halaman tidak ditemukan
          </h1>
          <p className="mx-auto mt-2 max-w-[44ch] text-sm leading-relaxed text-gray-600">
            Tautan yang kamu buka mungkin sudah dipindahkan atau produknya sudah
            tidak dijual lagi.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/products" className="btn-primary">
              Lihat semua produk
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/" className="btn-secondary">
              Kembali ke beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
