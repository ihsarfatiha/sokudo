import Link from 'next/link';
import { ChevronRight, PackageSearch } from 'lucide-react';
import { getProducts } from '@/lib/api';
import { CatalogControls } from '@/components/catalog/CatalogControls';
import { ProductCard } from '@/components/product/ProductCard';

interface CatalogPageProps {
  searchParams: {
    q?: string;
    category?: string;
    sort?: string;
  };
}

export const metadata = {
  title: 'Semua Produk — Sokudo',
  description: 'Jelajahi produk dari seller terverifikasi di Sokudo.',
};

export default async function ProductsPage({ searchParams }: CatalogPageProps) {
  const q = searchParams.q?.trim() ?? '';
  const category = searchParams.category ?? 'semua';
  const sort = searchParams.sort ?? 'popular';

  const products = await getProducts({ q, category, sort });

  return (
    <div className="bg-gray-50/60">
      <div className="border-b border-gray-100 bg-white">
        <div className="container-page py-7 lg:py-9">
          <nav
            className="flex items-center gap-1.5 text-xs text-gray-500"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-primary-600">
              Beranda
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-gray-900">Semua produk</span>
          </nav>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {q ? `Hasil untuk “${q}”` : 'Semua produk'}
              </h1>
              <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-gray-600">
                {q
                  ? 'Menampilkan produk yang paling relevan dengan pencarian kamu.'
                  : 'Dari toko terverifikasi di seluruh Indonesia. Harga sudah termasuk pajak, belum ongkir.'}
              </p>
            </div>
            <span className="badge-primary">{products.length} produk</span>
          </div>
        </div>
      </div>

      <div className="container-page py-7">
        <div className="card p-4 sm:p-5">
          <CatalogControls
            q={q}
            category={category}
            sort={sort}
            total={products.length}
          />
        </div>

        <div className="mt-6">
          {products.length === 0 ? (
            <div className="card flex flex-col items-center justify-center px-6 py-20 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <PackageSearch className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-gray-900">
                Produk tidak ditemukan
              </h2>
              <p className="mt-1 max-w-sm text-sm leading-relaxed text-gray-600">
                Coba kata kunci lain atau pilih kategori yang berbeda.
              </p>
              <Link href="/products" className="btn-secondary mt-6">
                Reset filter
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
