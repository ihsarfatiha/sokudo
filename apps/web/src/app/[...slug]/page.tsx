import Link from 'next/link';
import { ArrowUpRight, Home, PackageSearch } from 'lucide-react';
import { categories } from '@/lib/catalog';

interface PlaceholderPageProps {
  params: { slug: string[] };
}

export default function PlaceholderPage({ params }: PlaceholderPageProps) {
  const path = `/${(params.slug ?? []).join('/')}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
        {path}
      </p>
      <h1 className="mt-4 text-3xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-4xl">
        Halaman ini belum tersedia.
      </h1>
      <p className="mt-4 max-w-[48ch] text-[13.5px] leading-relaxed text-ink-muted">
        Bagian ini di luar cakupan demo. Yang sudah berjalan: storefront,
        katalog, keranjang, checkout, pelacakan pesanan, dan panel admin.
      </p>

      <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
        <Link href="/products" className="btn-primary">
          <PackageSearch className="h-4 w-4" aria-hidden="true" />
          Jelajahi produk
        </Link>
        <Link href="/" className="btn-secondary">
          <Home className="h-4 w-4" aria-hidden="true" />
          Beranda
        </Link>
      </div>

      <div className="mt-12">
        <p className="label-mono">Kategori populer</p>
        <ul className="mt-3 grid grid-cols-2 border-t border-line sm:grid-cols-3">
          {categories.slice(0, 6).map((category, index) => (
            <li key={category.slug}>
              <Link
                href={`/products?category=${category.slug}`}
                className="group flex items-center gap-2.5 border-b border-line py-3 pr-3 transition-colors hover:bg-surface"
              >
                <span className="num text-[9px] text-ink-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-[12.5px] font-medium">
                  {category.name}
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-ink-soft opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
