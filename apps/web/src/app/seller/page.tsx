import Link from 'next/link';
import {
  ArrowRight,
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
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-indigo-700 text-white">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-page relative py-10 lg:py-16">
          <nav
            className="flex items-center gap-1.5 text-xs text-primary-100/80"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Beranda
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-white">Mulai berjualan</span>
          </nav>

          <div className="mt-7 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90">
                <Store className="h-3.5 w-3.5" aria-hidden="true" />
                Untuk calon seller
              </p>
              <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Toko kamu, pembeli kami.
              </h1>
              <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-primary-50/85">
                Buka toko gratis, unggah produk, dan jangkau pembeli dari seluruh
                Indonesia. Katalog, checkout, dan pelacakan pesanan sudah kami
                siapkan.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary-700 shadow-soft transition-[transform,background-color] duration-200 hover:bg-primary-50 active:scale-[0.98]"
                >
                  Daftar sebagai seller
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#edukasi"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Pelajari dulu
                </Link>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 lg:col-span-5">
              {[
                ['5%', 'Komisi transaksi'],
                ['Rp0', 'Biaya pendaftaran'],
                ['1–2 hari', 'Verifikasi toko'],
                ['24/7', 'Akses dashboard'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur"
                >
                  <dt className="text-[10px] font-medium uppercase tracking-wide text-primary-100/80">
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-xl font-bold text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="container-page py-10 lg:py-14">
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Keuntungan</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Kenapa berjualan di Sokudo
              </h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="card card-hover p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Langkah</p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Mulai dalam tiga langkah
            </h2>
            <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-gray-600">
              Dari pendaftaran sampai pesanan pertama, semua bisa diselesaikan
              dalam hitungan hari.
            </p>
          </div>
          <ol className="space-y-3 lg:col-span-8">
            {steps.map((step, index) => (
              <li key={step.title} className="card card-hover flex items-start gap-4 p-4 sm:p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {step.title}
                  </p>
                  <p className="mt-0.5 max-w-[52ch] text-xs leading-relaxed text-gray-600">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="edukasi" className="mt-10 scroll-mt-36">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Edukasi</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Pusat edukasi seller
              </h2>
              <p className="mt-1.5 text-sm text-gray-600">
                Materi singkat yang bisa langsung dipraktikkan.
              </p>
            </div>
            <span className="badge-primary">4 materi</span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.title}
                className="group card card-hover flex items-center gap-4 p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {lesson.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    {lesson.duration} · Video + checklist
                  </p>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-gray-300 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-primary-600"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-indigo-600 px-6 py-9 text-white sm:px-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Siap membuka toko pertamamu?
              </h2>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-primary-50/85">
                Daftar gratis hari ini. Tim kami membantu proses verifikasi
                sampai toko kamu siap menerima pesanan.
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-primary-50/85">
                {['Tanpa biaya awal', 'Dashboard penjualan', 'Dukungan seller'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
            <Link
              href="/auth/register"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary-700 shadow-soft transition-[transform,background-color] duration-200 hover:bg-primary-50 active:scale-[0.98]"
            >
              Daftar sekarang
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
