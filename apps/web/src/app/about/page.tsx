import Link from 'next/link';
import {
  ArrowUpRight,
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
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <nav
        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Beranda
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink-muted">Tentang kami</span>
      </nav>

      <section className="mt-8 grid grid-cols-1 gap-10 border-b border-line pb-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h1 className="text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            Satu tempat belanja dari banyak toko terpercaya.
          </h1>
        </div>
        <div className="lg:col-span-5 lg:pt-2">
          <p className="max-w-[52ch] text-[14px] leading-relaxed text-ink-muted">
            Sokudo lahir dari ide sederhana: pembeli seharusnya bisa menemukan
            produk dari banyak toko tanpa berpindah aplikasi, dan penjual kecil
            seharusnya punya akses ke pembeli yang lebih luas. Kami menyatukan
            keduanya dalam satu checkout.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary !py-2.5 !text-[13px]">
              Jelajahi produk
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/seller" className="btn-secondary !py-2.5 !text-[13px]">
              <Store className="h-4 w-4" aria-hidden="true" />
              Mulai berjualan
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-2 border-t border-line sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-b border-line py-6 pr-4 sm:px-5 sm:first:pl-0"
          >
            <p className="num text-3xl font-semibold tracking-[-0.03em]">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[12px] text-ink-muted">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h2 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
            Misi kami
          </h2>
          <div className="mt-4 max-w-[62ch] space-y-3 text-[14px] leading-relaxed text-ink-muted">
            <p>
              Membuat perdagangan online terasa adil dan mudah, baik untuk
              pembeli maupun penjual. Pengalaman belanja yang baik dimulai dari
              informasi yang jelas, harga yang wajar, dan perlindungan saat ada
              masalah.
            </p>
            <p>
              Di sisi lain, seller mendapat alat untuk mengelola produk,
              memantau pesanan, dan memahami performa toko. Admin platform
              memastikan setiap toko memenuhi standar sebelum berjualan.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <h2 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
            Yang kami jaga setiap hari
          </h2>
          <ul className="mt-4 divide-y divide-line border-t border-line">
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
                <li key={item.title} className="flex items-start gap-3 py-4">
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-[13px] font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-muted">
                      {item.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
          Nilai yang kami pegang
        </h2>
        <div className="mt-5 grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="py-6 sm:px-6 sm:first:pl-0">
                <div className="flex items-baseline justify-between">
                  <Icon
                    className="h-5 w-5 text-ink-soft"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="num text-[10px] text-ink-soft">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold">{value.title}</h3>
                <p className="mt-1.5 max-w-[34ch] text-[12.5px] leading-relaxed text-ink-muted">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
