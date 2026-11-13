import Link from 'next/link';
import { ArrowRight, Home, PackageSearch } from 'lucide-react';
import { categories } from '@/lib/catalog';

interface PlaceholderPageProps {
  params: { slug: string[] };
}

export default function PlaceholderPage({ params }: PlaceholderPageProps) {
  const path = `/${(params.slug ?? []).join('/')}`;

  return (
    <div className="bg-gray-50/60">
      <div className="container-page py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="card px-6 py-10 text-center sm:px-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <PackageSearch className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary-600">
              {path}
            </p>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Halaman ini belum tersedia
            </h1>
            <p className="mx-auto mt-2 max-w-[48ch] text-sm leading-relaxed text-gray-600">
              Bagian ini di luar cakupan demo. Yang sudah berjalan: storefront,
              katalog, keranjang, checkout, pelacakan pesanan, dan panel admin.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/products" className="btn-primary">
                <PackageSearch className="h-4 w-4" aria-hidden="true" />
                Jelajahi produk
              </Link>
              <Link href="/" className="btn-secondary">
                <Home className="h-4 w-4" aria-hidden="true" />
                Beranda
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <p className="eyebrow">Kategori populer</p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="group card card-hover flex items-center gap-3 p-3.5"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-lg transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    >
                      {category.icon}
                    </span>
                    <span className="flex-1 text-sm font-medium text-gray-900 transition-colors group-hover:text-primary-700">
                      {category.name}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-gray-300 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-primary-600"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
