import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { getCategories, getProducts } from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductVisual } from '@/components/product/ProductVisual';
import { formatCurrency } from '@/lib/utils';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({ sort: 'popular', limit: 8 }),
    getCategories(),
  ]);

  const flashSale = products.filter((product) => product.isFlashSale).slice(0, 3);
  const receiptItems = products.slice(0, 2);
  const receiptTotal = receiptItems.reduce((sum, item) => sum + item.price, 0);
  const receiptStores = new Set(receiptItems.map((item) => item.store.id)).size;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14 py-12 lg:grid-cols-12 lg:gap-10 lg:py-20">
            <div className="lg:col-span-7 lg:pr-8">
              <p className="label-mono">
                Marketplace multi-vendor · {categories.length} kategori
              </p>

              <h1 className="mt-5 text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.94] tracking-[-0.045em]">
                Banyak toko.
                <br />
                Satu checkout.
              </h1>

              <p className="mt-6 max-w-[46ch] text-pretty text-[15px] leading-relaxed text-ink-muted">
                Belanja elektronik, fashion, kopi, sampai perlengkapan rumah dari
                seller terverifikasi. Satu keranjang, satu pembayaran, satu
                pelacakan.
              </p>

              <form
                action="/products"
                role="search"
                className="mt-8 flex max-w-xl items-stretch border border-ink/80 bg-surface"
              >
                <Search
                  className="ml-4 h-4 w-4 shrink-0 self-center text-ink-soft"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  name="q"
                  placeholder="Cari produk atau toko"
                  aria-label="Cari produk atau toko"
                  className="w-full bg-transparent px-3 py-3.5 text-sm text-ink placeholder:text-ink-soft focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-ink px-6 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ink/85 active:scale-[0.99]"
                >
                  Cari
                </button>
              </form>

              <dl className="mt-8 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-5">
                <div>
                  <dt className="label-mono">Toko</dt>
                  <dd className="num mt-1.5 text-[13px] font-semibold">
                    7 terverifikasi
                  </dd>
                </div>
                <div>
                  <dt className="label-mono">Gratis ongkir</dt>
                  <dd className="num mt-1.5 text-[13px] font-semibold">
                    ≥ Rp300.000
                  </dd>
                </div>
                <div>
                  <dt className="label-mono">Pengembalian</dt>
                  <dd className="num mt-1.5 text-[13px] font-semibold">
                    7 hari
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-[360px] lg:mt-4">
                <div
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm bg-primary-600"
                  aria-hidden="true"
                />
                <div className="relative rotate-[-1.2deg] rounded-sm border border-line bg-surface p-6 shadow-lift">
                  <div className="flex items-baseline justify-between border-b border-dashed border-line pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                      Ringkasan pesanan
                    </span>
                    <span className="num text-[10px] text-ink-soft">
                      #SKD-4471
                    </span>
                  </div>

                  <ul className="divide-y divide-line/70">
                    {receiptItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start justify-between gap-4 py-3"
                      >
                        <span className="line-clamp-2 text-[12px] leading-snug text-ink-muted">
                          {item.title}
                        </span>
                        <span className="num shrink-0 text-[12px] font-medium">
                          {formatCurrency(item.price)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <dl className="space-y-1.5 border-t border-dashed border-line pt-3 text-[12px]">
                    <div className="flex justify-between text-ink-muted">
                      <dt>Subtotal</dt>
                      <dd className="num">{formatCurrency(receiptTotal)}</dd>
                    </div>
                    <div className="flex justify-between text-ink-muted">
                      <dt>Ongkir</dt>
                      <dd className="num">Gratis</dd>
                    </div>
                    <div className="flex items-baseline justify-between pt-2 text-[13px] font-semibold">
                      <dt>Total</dt>
                      <dd className="num text-base">
                        {formatCurrency(receiptTotal)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
                      {receiptStores} toko · 1 pembayaran
                    </span>
                    <span className="rounded-sm border border-emerald-700/40 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
                      Lunas
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft lg:text-left">
                Contoh ringkasan checkout lintas toko
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
            Kategori
          </h2>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Semua produk
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 border-t border-line sm:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group flex items-center gap-3 border-b border-line py-4 pr-4 transition-colors hover:bg-surface sm:px-4"
            >
              <span className="num text-[10px] text-ink-soft">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 text-sm font-medium text-ink">
                {category.name}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-ink-soft opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>

      {/* Flash sale */}
      {flashSale.length > 0 && (
        <section className="mx-auto max-w-8xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="bg-ink text-paper">
            <div className="flex flex-col gap-4 px-6 py-7 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary-300">
                  Flash sale · berakhir 23.59
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-paper sm:text-3xl">
                  Harga turun malam ini.
                </h2>
              </div>
              <Link
                href="/products"
                className="group inline-flex w-fit items-center gap-1.5 border-b border-paper/30 pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-paper hover:text-paper"
              >
                Lihat semua
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 divide-y divide-paper/10 border-t border-paper/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {flashSale.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-paper/[0.04] sm:px-8"
                >
                  <ProductVisual
                    slug={product.slug}
                    categorySlug={product.categorySlug}
                    className="h-16 w-16 shrink-0"
                    iconClassName="h-6 w-6"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-paper">
                      {product.title}
                    </p>
                    <p className="mt-1 flex items-baseline gap-2">
                      <span className="num text-sm font-semibold text-primary-200">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="num text-[11px] text-paper/40 line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.12em] text-paper/40">
                      {product.store.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured products */}
      <section className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
              Produk pilihan
            </h2>
            <p className="mt-1 text-[13px] text-ink-muted">
              Paling banyak dicari minggu ini.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Semua produk
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            {
              title: 'Pembayaran aman',
              description:
                'Transaksi diproses dengan enkripsi dan perlindungan pembeli.',
            },
            {
              title: 'Pengiriman terlacak',
              description:
                'Status pesanan diperbarui dari diproses sampai diterima.',
            },
            {
              title: 'Bantuan nyata',
              description:
                'Tim kami membantu menyelesaikan kendala pesanan lewat chat dan email.',
            },
          ].map((item, index) => (
            <div key={item.title} className="py-6 sm:px-6 sm:first:pl-0">
              <p className="num text-[10px] text-ink-soft">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-sm font-semibold">{item.title}</h3>
              <p className="mt-1 max-w-[32ch] text-[13px] leading-relaxed text-ink-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA seller */}
      <section className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 bg-primary-600 px-6 py-10 text-white sm:px-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
              Untuk seller
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              Toko kamu, pembeli kami.
            </h2>
            <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-white/75">
              Buka toko gratis, unggah produk, dan jangkau pembeli dari seluruh
              Indonesia. Kami menyiapkan katalog, checkout, dan pelacakannya.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/seller"
              className="group inline-flex items-center gap-2 bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white active:scale-[0.98]"
            >
              Buka toko gratis
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
