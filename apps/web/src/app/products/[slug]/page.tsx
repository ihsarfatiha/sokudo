import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BadgeCheck,
  ChevronRight,
  MapPin,
  MessageCircle,
  Package,
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
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <nav
        className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Beranda
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link
          href={`/products?category=${product.categorySlug}`}
          className="transition-colors hover:text-ink"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="line-clamp-1 text-ink-muted">{product.title}</span>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <ProductVisual
            slug={product.slug}
            categorySlug={product.categorySlug}
            discount={discount}
            className="aspect-square w-full sm:aspect-[5/4]"
            iconClassName="h-[22%] w-[22%]"
          />

          <dl className="mt-4 grid grid-cols-3 divide-x divide-line border-y border-line">
            {[
              ['Stok', `${product.stock} unit`],
              ['Kondisi', 'Baru'],
              ['Pengiriman', '1–4 hari'],
            ].map(([label, value]) => (
              <div key={label} className="px-3 py-3 first:pl-0">
                <dt className="label-mono">{label}</dt>
                <dd className="num mt-1 text-[12px] font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            <span>{product.category}</span>
            {product.badges.map((badge) => (
              <span key={badge} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <span className="text-ink-muted">{badge}</span>
              </span>
            ))}
            {product.isFlashSale && (
              <span className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <span className="text-primary-700">Flash sale</span>
              </span>
            )}
          </div>

          <h1 className="mt-3 text-balance text-3xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-muted">
            <StarRating rating={product.rating} size="md" />
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <span className="num">
              {product.sold.toLocaleString('id-ID')} terjual
            </span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <span className="num">Stok {product.stock}</span>
          </div>

          <div className="mt-6 border-y border-line py-5">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="num text-3xl font-semibold tracking-[-0.02em] text-ink">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="num text-sm text-ink-soft line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="num rounded-sm bg-primary-50 px-1.5 py-0.5 text-[11px] font-semibold text-primary-700">
                    Hemat {discount}%
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
              Harga termasuk pajak · Belum termasuk ongkir
            </p>
          </div>

          <div className="mt-6">
            <p className="label-mono mb-2">Jumlah</p>
            <AddToCartButton product={product} />
          </div>

          <ul className="mt-6 divide-y divide-line border-t border-line">
            {[
              { icon: ShieldCheck, label: 'Pembeli terlindungi' },
              { icon: Truck, label: 'Gratis ongkir minimal Rp300.000' },
              { icon: Package, label: 'Pengembalian dalam 7 hari' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 py-2.5 text-[12px] text-ink-muted"
                >
                  <Icon
                    className="h-4 w-4 shrink-0 text-ink-soft"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {item.label}
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-center gap-4 border border-line bg-surface p-4">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-base font-bold text-paper"
              aria-hidden="true"
            >
              {product.store.name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-semibold">
                  {product.store.name}
                </p>
                <BadgeCheck
                  className="h-3.5 w-3.5 shrink-0 text-primary-600"
                  strokeWidth={1.75}
                  aria-label="Terverifikasi"
                />
              </div>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-ink-soft">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {product.store.city}
                <span aria-hidden="true">·</span>
                <span className="num">★ {product.store.rating.toFixed(1)}</span>
              </p>
            </div>
            <button type="button" className="btn-secondary shrink-0 !px-3 !py-2 !text-[11px]">
              <Store className="h-3.5 w-3.5" aria-hidden="true" />
              Kunjungi
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-lg font-bold tracking-[-0.02em]">
            Deskripsi produk
          </h2>
          <p className="mt-3 max-w-[68ch] text-[14px] leading-relaxed text-ink-muted">
            {product.description}
          </p>

          <h3 className="mt-8 text-sm font-semibold">Spesifikasi</h3>
          <dl className="mt-3 divide-y divide-line border-t border-line text-[13px]">
            {[
              ['Kategori', product.category],
              ['Toko', product.store.name],
              ['Stok tersedia', `${product.stock} unit`],
              ['Berat', 'Estimasi 500 gram'],
              ['Kondisi', 'Baru'],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[130px_1fr] gap-3 py-2.5">
                <dt className="text-ink-soft">{label}</dt>
                <dd className="font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold tracking-[-0.02em]">
              Ulasan pembeli
            </h2>
            <span className="num text-sm font-semibold">
              ★ {product.rating.toFixed(1)}
            </span>
          </div>
          <div className="mt-3 divide-y divide-line border-t border-line">
            {sampleReviews.map((review) => (
              <div key={review.name} className="py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[13px] font-semibold">{review.name}</p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
                    {review.date}
                  </span>
                </div>
                <StarRating rating={review.rating} showValue={false} />
                <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
          <button type="button" className="btn-secondary mt-4 w-full !py-2.5 !text-[12px]">
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Lihat semua ulasan
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14 border-t border-line pt-10">
          <h2 className="text-lg font-bold tracking-[-0.02em]">
            Produk serupa dari {product.category}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
