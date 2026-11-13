import Link from 'next/link';
import { PackageSearch } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="label-mono">Galat 404</p>
      <h1 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-5xl">
        Halaman tidak ada.
      </h1>
      <p className="mt-4 max-w-[44ch] text-[14px] leading-relaxed text-ink-muted">
        Tautan yang kamu buka mungkin sudah dipindahkan atau produknya sudah
        tidak dijual lagi.
      </p>

      <div className="mt-8 flex w-full gap-3 border-t border-line pt-6">
        <Link href="/products" className="btn-primary">
          Lihat semua produk
        </Link>
        <Link href="/" className="btn-secondary">
          Beranda
        </Link>
      </div>

      <PackageSearch
        className="mt-10 h-6 w-6 text-ink-soft"
        strokeWidth={1.25}
        aria-hidden="true"
      />
    </div>
  );
}
