import Link from 'next/link';
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Check,
  Package,
  Store,
  Wallet,
} from 'lucide-react';

export const metadata = {
  title: 'Mulai Berjualan — Sokudo',
  description:
    'Buka toko gratis di Sokudo, kelola produk, dan jangkau lebih banyak pembeli.',
};

const benefits = [
  {
    icon: Wallet,
    title: 'Buka toko gratis',
    text: 'Tanpa biaya pendaftaran. Komisi platform 5% hanya dari transaksi yang berhasil.',
  },
  {
    icon: Package,
    title: 'Kelola produk mudah',
    text: 'Atur stok, harga, dan deskripsi produk dari satu dashboard.',
  },
  {
    icon: BarChart3,
    title: 'Pantau performa',
    text: 'Lihat pesanan, pendapatan, dan produk yang paling diminati.',
  },
  {
    icon: BadgeCheck,
    title: 'Kepercayaan pembeli',
    text: 'Badge toko terverifikasi membantu meningkatkan konversi.',
  },
];

const steps = [
  {
    title: 'Daftar akun seller',
    text: 'Isi data diri dan informasi toko. Proses pendaftaran kurang dari 5 menit.',
  },
  {
    title: 'Verifikasi toko',
    text: 'Unggah dokumen usaha. Tim kami memeriksa agar pembeli merasa aman.',
  },
  {
    title: 'Unggah produk dan jualan',
    text: 'Tambahkan produk pertama, atur stok, lalu mulai menerima pesanan.',
  },
];

const lessons = [
  {
    title: 'Menulis judul dan deskripsi yang dicari pembeli',
    duration: '12 menit',
  },
  {
    title: 'Memotret produk dengan HP saja',
    duration: '15 menit',
  },
  {
    title: 'Mengatur harga dan ongkir agar tetap untung',
    duration: '10 menit',
  },
  {
    title: 'Menangani komplain tanpa kehilangan pelanggan',
    duration: '14 menit',
  },
];

export default function SellerPage() {
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
        <span className="text-ink-muted">Mulai berjualan</span>
      </nav>

      <section className="mt-8 bg-ink text-paper">
        <div className="grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary-300">
              Untuk calon seller
            </p>
            <h1 className="mt-4 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[0.94] tracking-[-0.045em]">
              Toko kamu, pembeli kami.
            </h1>
            <p className="mt-4 max-w-[48ch] text-[14px] leading-relaxed text-paper/60">
              Buka toko gratis, unggah produk, dan jangkau pembeli dari seluruh
              Indonesia. Katalog, checkout, dan pelacakan pesanan sudah kami
              siapkan.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-2 bg-paper px-5 py-3 text-[13px] font-semibold text-ink transition-colors hover:bg-white active:scale-[0.98]"
              >
                Daftar sebagai seller
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="#edukasi"
                className="inline-flex items-center gap-2 border-b border-paper/30 pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-paper hover:text-paper"
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Pelajari dulu
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-px bg-paper/10 lg:col-span-5">
            {[
              ['5%', 'Komisi transaksi'],
              ['Rp0', 'Biaya pendaftaran'],
              ['1–2 hari', 'Verifikasi toko'],
              ['24/7', 'Akses dashboard'],
            ].map(([value, label]) => (
              <div key={label} className="bg-ink p-4">
                <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-paper/40">
                  {label}
                </dt>
                <dd className="num mt-1.5 text-xl font-semibold text-paper">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
          Kenapa berjualan di Sokudo
        </h2>
        <div className="mt-5 grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="py-6 sm:px-5 sm:first:pl-0 lg:first:pl-0"
              >
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
                <h3 className="mt-4 text-sm font-semibold">{benefit.title}</h3>
                <p className="mt-1.5 max-w-[30ch] text-[12.5px] leading-relaxed text-ink-muted">
                  {benefit.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
            Mulai dalam tiga langkah
          </h2>
          <p className="mt-2 max-w-[36ch] text-[13px] leading-relaxed text-ink-muted">
            Dari pendaftaran sampai pesanan pertama, semua bisa diselesaikan
            dalam hitungan hari.
          </p>
        </div>
        <ol className="lg:col-span-8">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex items-start gap-4 border-t border-line py-5 last:border-b"
            >
              <span className="num shrink-0 text-[10px] text-ink-soft">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-[14px] font-semibold">{step.title}</p>
                <p className="mt-1 max-w-[52ch] text-[12.5px] leading-relaxed text-ink-muted">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="edukasi" className="mt-12 scroll-mt-40 border-t border-line pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
              Pusat edukasi seller
            </h2>
            <p className="mt-1.5 text-[13px] text-ink-muted">
              Materi singkat yang bisa langsung dipraktikkan.
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            4 materi
          </span>
        </div>

        <div className="mt-5 divide-y divide-line border-y border-line">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.title}
              className="group flex items-center gap-4 py-4"
            >
              <span className="num w-5 shrink-0 text-[10px] text-ink-soft">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-medium">{lesson.title}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
                  {lesson.duration} · Video + checklist
                </p>
              </div>
              <BookOpen
                className="h-4 w-4 shrink-0 text-ink-soft transition-colors group-hover:text-ink"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-primary-600 px-6 py-10 text-white sm:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
              Siap membuka toko pertamamu?
            </h2>
            <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-white/75">
              Daftar gratis hari ini. Tim kami membantu proses verifikasi sampai
              toko kamu siap menerima pesanan.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/65">
              {['Tanpa biaya awal', 'Dashboard penjualan', 'Dukungan seller'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="h-3 w-3" aria-hidden="true" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
          <Link
            href="/auth/register"
            className="group inline-flex shrink-0 items-center gap-2 bg-paper px-5 py-3 text-[13px] font-semibold text-ink transition-colors hover:bg-white active:scale-[0.98]"
          >
            Daftar sekarang
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
