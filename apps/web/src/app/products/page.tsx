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
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <nav
        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Beranda
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-ink-muted">Semua produk</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            {q ? 'Hasil pencarian' : 'Semua produk'}
          </h1>
          <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-ink-muted">
            {q
              ? `Menampilkan produk yang cocok dengan “${q}”.`
              : 'Dari toko terverifikasi di seluruh Indonesia. Harga sudah termasuk pajak, belum ongkir.'}
          </p>
        </div>
        <p className="num text-[13px] text-ink-soft">
          {products.length} produk
        </p>
      </div>

      <div className="mt-6">
        <CatalogControls
          q={q}
          category={category}
          sort={sort}
          total={products.length}
        />
      </div>

      <div className="mt-8">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-line bg-surface px-6 py-20 text-center">
            <PackageSearch
              className="h-8 w-8 text-ink-soft"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <h2 className="mt-4 text-lg font-bold">Produk tidak ditemukan</h2>
            <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-ink-muted">
              Coba kata kunci lain atau pilih kategori yang berbeda.
            </p>
            <Link href="/products" className="btn-secondary mt-6">
              Reset filter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
