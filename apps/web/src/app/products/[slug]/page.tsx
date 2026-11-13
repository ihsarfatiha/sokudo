import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BadgeCheck,
  ChevronRight,
  MapPin,
  Package,
  RotateCcw,
  ShieldCheck,
  Store,
  Truck,
} from 'lucide-react';
import { getProduct, getProducts } from '@/lib/api';
import { ProductVisual } from '@/components/product/ProductVisual';
import { ProductCard } from '@/components/product/ProductCard';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { StarRating } from '@/components/ui/StarRating';
import { formatCurrency } from '@/lib/utils';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);
  if (!product) return { title: 'Produk tidak ditemukan — Sokudo' };
  return {
    title: `${product.title} — Sokudo`,
    description: product.description.slice(0, 160),
  };
}

const sampleReviews = [
  {
    name: 'Rani P.',
    rating: 5,
    date: '2 minggu lalu',
    comment:
      'Barang sesuai deskripsi, packing rapi, dan pengiriman cepat. Recommended.',
  },
  {
    name: 'Dimas A.',
    rating: 4,
    date: '1 bulan lalu',
    comment:
      'Kualitas bagus untuk harga segini. Seller responsif saat ditanya.',
  },
  {
    name: 'Sinta M.',
    rating: 5,
    date: '1 bulan lalu',
    comment: 'Sudah repeat order, selalu memuaskan. Terima kasih Sokudo.',
  },
];

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const related = (await getProducts({ category: product.categorySlug, limit: 5 }))
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="bg-gray-50/60">
      <div className="container-page py-6 lg:py-8">
        <nav
          className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-primary-600">
            Beranda
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link
            href={`/products?category=${product.categorySlug}`}
            className="transition-colors hover:text-primary-600"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="line-clamp-1 font-medium text-gray-900">
            {product.title}
          </span>
        </nav>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="card overflow-hidden">
              <div className="group">
                <ProductVisual
                  emoji={product.emoji}
                  gradient={product.gradient}
                  discount={discount}
                  className="aspect-square w-full sm:aspect-[5/4]"
                  emojiClassName="text-[9rem] sm:text-[11rem]"
                />
              </div>

              <dl className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 bg-white">
                {[
                  ['Stok', `${product.stock} unit`],
                  ['Kondisi', 'Baru'],
                  ['Pengiriman', '1–4 hari'],
                ].map(([label, value]) => (
                  <div key={label} className="px-4 py-3">
                    <dt className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-semibold text-gray-900">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: 'Pembeli terlindungi' },
                { icon: Truck, label: 'Gratis ongkir ≥ Rp300.000' },
                { icon: RotateCcw, label: 'Pengembalian 7 hari' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-600"
                  >
                    <Icon
                      className="h-4 w-4 shrink-0 text-primary-600"
                      aria-hidden="true"
                    />
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge-primary">{product.category}</span>
                {product.badges.map((badge) => (
                  <span key={badge} className="badge-success">
                    <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                    {badge}
                  </span>
                ))}
                {product.isFlashSale && (
                  <span className="badge-danger">Flash sale</span>
                )}
              </div>

              <h1 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                <StarRating rating={product.rating} size="md" />
                <span className="h-3 w-px bg-gray-200" aria-hidden="true" />
                <span className="tabular-nums">
                  {product.sold.toLocaleString('id-ID')} terjual
                </span>
                <span className="h-3 w-px bg-gray-200" aria-hidden="true" />
                <span className="tabular-nums">Stok {product.stock}</span>
              </div>

              <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-3xl font-bold tracking-tight text-gray-900 tabular-nums">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through tabular-nums">
                        {formatCurrency(product.originalPrice)}
                      </span>
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">
                        Hemat {discount}%
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                  Harga termasuk pajak · Belum termasuk ongkir
                </p>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold text-gray-700">
                    Jumlah
                  </p>
                  <AddToCartButton product={product} />
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                  <Package className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Sisa {product.stock} unit — dikirim dari {product.store.city}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-indigo-600 text-base font-bold text-white"
                  aria-hidden="true"
                >
                  {product.store.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {product.store.name}
                    </p>
                    <BadgeCheck
                      className="h-3.5 w-3.5 shrink-0 text-primary-600"
                      strokeWidth={1.75}
                      aria-label="Terverifikasi"
                    />
                  </div>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {product.store.city}
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      ★ {product.store.rating.toFixed(1)}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/products?category=${product.categorySlug}`}
                  className="btn-secondary shrink-0 !px-3 !py-2 !text-xs"
                >
                  <Store className="h-3.5 w-3.5" aria-hidden="true" />
                  Toko
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Description + reviews */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="card p-5 sm:p-6">
              <h2 className="text-lg font-bold tracking-tight text-gray-900">
                Deskripsi produk
              </h2>
              <p className="mt-2.5 max-w-[68ch] text-sm leading-relaxed text-gray-600">
                {product.description}
              </p>

              <h3 className="mt-6 text-sm font-semibold text-gray-900">
                Spesifikasi
              </h3>
              <dl className="mt-3 divide-y divide-gray-100 border-t border-gray-100 text-sm">
                {[
                  ['Kategori', product.category],
                  ['Toko', product.store.name],
                  ['Stok tersedia', `${product.stock} unit`],
                  ['Berat', 'Estimasi 500 gram'],
                  ['Kondisi', 'Baru'],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[130px_1fr] gap-3 py-2.5">
                    <dt className="text-gray-500">{label}</dt>
                    <dd className="font-medium text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card p-5 sm:p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-bold tracking-tight text-gray-900">
                  Ulasan pembeli
                </h2>
                <StarRating rating={product.rating} size="md" />
              </div>
              <div className="mt-2 divide-y divide-gray-100">
                {sampleReviews.map((review) => (
                  <div key={review.name} className="py-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {review.name}
                      </p>
                      <span className="text-[11px] text-gray-400">
                        {review.date}
                      </span>
                    </div>
                    <div className="mt-0.5">
                      <StarRating rating={review.rating} showValue={false} />
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn-secondary mt-2 w-full !py-2.5 !text-xs"
              >
                Lihat semua ulasan
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Produk serupa dari {product.category}
              </h2>
              <Link
                href={`/products?category=${product.categorySlug}`}
                className="group inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                Lihat kategori
                <ChevronRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((item, index) => (
                <ProductCard key={item.id} product={item} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
