import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  ShieldCheck,
  Store,
  Truck,
  Users,
} from 'lucide-react';

export const metadata = {
  title: 'Tentang Kami — Sokudo',
  description:
    'Sokudo adalah marketplace multi-vendor yang menghubungkan pembeli dengan toko-toko terpercaya di Indonesia.',
};

const stats = [
  { label: 'Toko terverifikasi', value: '7' },
  { label: 'Produk pilihan', value: '18' },
  { label: 'Kategori', value: '8' },
  { label: 'Kota terjangkau', value: '6' },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Kepercayaan dulu',
    description:
      'Setiap toko melewati proses verifikasi. Pembayaran dan pengiriman tercatat agar pembeli dan penjual sama-sama tenang.',
  },
  {
    icon: HeartHandshake,
    title: 'Transparan',
    description:
      'Harga, ongkir, dan status pesanan ditampilkan apa adanya. Tidak ada biaya tersembunyi saat checkout.',
  },
  {
    icon: Users,
    title: 'Tumbuh bersama',
    description:
      'Kami membangun alat yang membantu seller kecil naik kelas: katalog rapi, laporan penjualan, dan panduan berjualan.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-50/60">
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-primary-50 via-white to-indigo-50">
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative py-10 lg:py-14">
          <nav
            className="flex items-center gap-1.5 text-xs text-gray-500"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-primary-600">
              Beranda
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-gray-900">Tentang kami</span>
          </nav>

          <div className="mt-6 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">Tentang Sokudo</p>
              <h1 className="mt-3 max-w-[20ch] text-balance text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Satu tempat belanja dari banyak toko terpercaya.
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-[52ch] text-sm leading-relaxed text-gray-600">
                Sokudo lahir dari ide sederhana: pembeli seharusnya bisa
                menemukan produk dari banyak toko tanpa berpindah aplikasi, dan
                penjual kecil seharusnya punya akses ke pembeli yang lebih luas.
                Kami menyatukan keduanya dalam satu checkout.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/products" className="btn-primary">
                  Jelajahi produk
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/seller" className="btn-secondary">
                  <Store className="h-4 w-4" aria-hidden="true" />
                  Mulai berjualan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card card-hover p-4 text-center sm:p-5"
            >
              <p className="text-2xl font-extrabold tracking-tight text-primary-600 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card p-5 sm:p-7">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Misi kami
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-600">
              <p>
                Membuat perdagangan online terasa adil dan mudah, baik untuk
                pembeli maupun penjual. Pengalaman belanja yang baik dimulai
                dari informasi yang jelas, harga yang wajar, dan perlindungan
                saat ada masalah.
              </p>
              <p>
                Di sisi lain, seller mendapat alat untuk mengelola produk,
                memantau pesanan, dan memahami performa toko. Admin platform
                memastikan setiap toko memenuhi standar sebelum berjualan.
              </p>
            </div>
          </div>

          <div className="card p-5 sm:p-7">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Yang kami jaga setiap hari
            </h2>
            <ul className="mt-4 divide-y divide-gray-100">
              {[
                {
                  icon: BadgeCheck,
                  title: 'Seller terverifikasi',
                  text: 'Toko lolos pemeriksaan dokumen sebelum tampil di katalog.',
                },
                {
                  icon: Truck,
                  title: 'Pengiriman terlacak',
                  text: 'Status pesanan diperbarui dari diproses sampai diterima.',
                },
                {
                  icon: Users,
                  title: 'Dukungan nyata',
                  text: 'Tim bantuan membantu menyelesaikan kendala pesanan.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-600">
                        {item.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Prinsip</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Nilai yang kami pegang
              </h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="card card-hover p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-indigo-600 px-6 py-9 text-white sm:px-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Siap mulai belanja atau berjualan?
              </h2>
              <p className="mt-1.5 max-w-[48ch] text-sm text-primary-50/85">
                Ribuan produk dari toko terverifikasi, satu keranjang, satu
                pembayaran.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-primary-700 shadow-soft transition-[transform,background-color] duration-200 hover:bg-primary-50 active:scale-[0.98]"
              >
                Lihat produk
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Hubungi kami
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
