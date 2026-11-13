import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Flame,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Zap,
} from 'lucide-react';
import { getCategories, getProducts } from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductVisual } from '@/components/product/ProductVisual';
import { FlashSaleCountdown } from '@/components/home/FlashSaleCountdown';
import { formatCurrency } from '@/lib/utils';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({ sort: 'popular', limit: 8 }),
    getCategories(),
  ]);

  const flashSale = products.filter((product) => product.isFlashSale).slice(0, 3);
  const featured = products.slice(0, 8);
  const heroItems = products.slice(0, 2);
  const heroTotal = heroItems.reduce((sum, item) => sum + item.price, 0);
  const heroStores = new Set(heroItems.map((item) => item.store.id)).size;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-primary-50 via-white to-indigo-50">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-page relative grid grid-cols-1 items-center gap-12 py-12 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-3 py-1 text-xs font-semibold text-primary-700 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Marketplace multi-vendor · {categories.length} kategori
            </p>

            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.4rem]">
              Belanja dari banyak toko,{' '}
              <span className="text-primary-600">bayar sekali.</span>
            </h1>

            <p className="mt-5 max-w-[46ch] text-pretty text-base leading-relaxed text-gray-600">
              Elektronik, fashion, kopi, sampai perlengkapan rumah dari seller
              terverifikasi. Satu keranjang, satu pembayaran, satu pelacakan.
            </p>

            <form
              action="/products"
              role="search"
              className="group mt-7 flex max-w-xl items-center rounded-xl border border-gray-200 bg-white p-1.5 shadow-soft transition-shadow duration-300 focus-within:border-primary-300 focus-within:shadow-lift"
            >
              <Search
                className="ml-2.5 h-5 w-5 shrink-0 text-gray-400 transition-colors group-focus-within:text-primary-600"
                aria-hidden="true"
              />
              <input
                type="search"
                name="q"
                placeholder="Cari produk, toko, atau kategori"
                aria-label="Cari produk, toko, atau kategori"
                className="w-full bg-transparent px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-primary shrink-0 !rounded-lg !px-5 active:scale-95"
              >
                Cari
              </button>
            </form>

            <dl className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-primary-600" aria-hidden="true" />
                <dt className="sr-only">Toko</dt>
                <dd className="font-medium">7 toko terverifikasi</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-primary-600" aria-hidden="true" />
                <dt className="sr-only">Ongkir</dt>
                <dd className="font-medium">Gratis ongkir ≥ Rp300.000</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="h-4 w-4 text-primary-600" aria-hidden="true" />
                <dt className="sr-only">Pengembalian</dt>
                <dd className="font-medium">Pengembalian 7 hari</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto mt-6 max-w-md pb-6 sm:mt-4 sm:pb-0">
              <div className="absolute -right-1 -top-12 z-10 rounded-xl border border-emerald-200 bg-white px-3 py-2 shadow-soft">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <Truck className="h-3.5 w-3.5" aria-hidden="true" />
                  Gratis ongkir
                </p>
                <p className="mt-0.5 text-[10px] text-gray-500">
                  Pesanan ≥ Rp300.000
                </p>
              </div>

              <div className="absolute -bottom-6 -left-1 z-10 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-soft">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-900">
                  <ShieldCheck
                    className="h-3.5 w-3.5 text-primary-600"
                    aria-hidden="true"
                  />
                  Pembayaran aman
                </p>
                <p className="mt-0.5 text-[10px] text-gray-500">
                  Transfer · QRIS · COD
                </p>
              </div>

              <div className="card overflow-hidden p-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <p className="text-sm font-semibold text-gray-900">
                    Ringkasan pesanan
                  </p>
                  <span className="badge-primary">
                    {heroStores} toko
                  </span>
                </div>

                <ul className="divide-y divide-gray-100">
                  {heroItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 py-3">
                      <ProductVisual
                        emoji={item.emoji}
                        gradient={item.gradient}
                        className="h-11 w-11 shrink-0 rounded-lg"
                        emojiClassName="text-xl"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-gray-900">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-gray-500">
                          {item.store.name}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-semibold tabular-nums text-gray-900">
                        {formatCurrency(item.price)}
                      </span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-1 space-y-1.5 border-t border-dashed border-gray-200 pt-3 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums">{formatCurrency(heroTotal)}</dd>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <dt>Ongkir</dt>
                    <dd className="font-medium text-emerald-600">Gratis</dd>
                  </div>
                  <div className="flex justify-between pt-1 text-sm font-bold text-gray-900">
                    <dt>Total</dt>
                    <dd className="tabular-nums">{formatCurrency(heroTotal)}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2 text-[11px] text-primary-800">
                  <Zap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Satu checkout untuk semua toko
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-gray-100 bg-white">
        <div className="container-page grid grid-cols-2 divide-x divide-gray-100 py-6 sm:grid-cols-4">
          {[
            {
              icon: BadgeCheck,
              title: 'Seller terverifikasi',
              text: 'Dokumen diperiksa admin',
            },
            {
              icon: Truck,
              title: 'Pengiriman terlacak',
              text: 'Status sampai diterima',
            },
            {
              icon: ShieldCheck,
              title: 'Pembayaran aman',
              text: 'Transfer, QRIS, dan COD',
            },
            {
              icon: RotateCcw,
              title: 'Pengembalian mudah',
              text: 'Ajukan dalam 7 hari',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-3 px-3 py-2 first:pl-0 sm:px-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-500">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Kategori</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Mau cari apa hari ini?
            </h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            Lihat semua produk
            <ChevronRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group card flex items-center gap-3 p-4 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11"
                aria-hidden="true"
              >
                {category.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold leading-tight text-gray-900 transition-colors group-hover:text-primary-700 sm:text-sm">
                  {category.name}
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-gray-500">
                  {category.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash sale */}
      {flashSale.length > 0 && (
        <section id="flash-sale" className="border-y border-gray-100 bg-gray-50 py-12 lg:py-14">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600">
                  <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                  Flash sale
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Harga turun, stok terbatas
                </h2>
                <p className="mt-1.5 text-sm text-gray-600">
                  Promo berakhir hari ini. Selama stok masih ada.
                </p>
              </div>
              <div className="flex items-end gap-3">
                <div>
                  <p className="mb-1.5 text-[11px] font-medium text-gray-500">
                    Berakhir dalam
                  </p>
                  <FlashSaleCountdown />
                </div>
              </div>
            </div>

            <div className="-mx-4 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
              {flashSale.map((product, index) => (
                <div
                  key={product.id}
                  className="w-[210px] shrink-0 snap-start sm:w-auto"
                >
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured */}
      <section className="container-page py-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Pilihan</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Produk yang lagi banyak dicari
            </h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            Semua produk
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Seller CTA */}
      <section className="container-page pb-14">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-indigo-600 px-6 py-10 text-white sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-sky-300/20 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
                <Store className="h-3.5 w-3.5" aria-hidden="true" />
                Untuk seller
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Toko kamu, pembeli kami.
              </h2>
              <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-primary-50/90">
                Buka toko gratis, unggah produk, dan jangkau pembeli dari
                seluruh Indonesia. Komisi 5% hanya dari transaksi berhasil.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary-700 shadow-soft transition-[transform,background-color] duration-200 hover:bg-primary-50 active:scale-[0.98]"
              >
                Daftar sebagai seller
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/seller"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Pelajari dulu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
