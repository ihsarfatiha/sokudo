import Link from 'next/link';
import {
  AlertTriangle,
  Check,
  Fingerprint,
  KeyRound,
  Lock,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

export const metadata = {
  title: 'Keamanan — Sokudo',
  description:
    'Cara Sokudo melindungi akun dan transaksi, serta tips menjaga keamanan belanja online.',
};

const protections = [
  {
    icon: Lock,
    title: 'Enkripsi data',
    text: 'Kata sandi disimpan dalam bentuk hash dan komunikasi data menggunakan koneksi terenkripsi.',
  },
  {
    icon: KeyRound,
    title: 'Akses berbasis peran',
    text: 'Pembeli, penjual, dan admin memiliki hak akses berbeda. Data hanya dibuka sesuai kebutuhan.',
  },
  {
    icon: Fingerprint,
    title: 'Verifikasi toko',
    text: 'Dokumen usaha diperiksa sebelum toko dapat menerima pesanan.',
  },
  {
    icon: ShieldCheck,
    title: 'Pemantauan transaksi',
    text: 'Aktivitas mencurigakan ditinjau untuk mencegah penipuan dan penyalahgunaan.',
  },
];

const tips = [
  'Jangan pernah membagikan kode OTP atau kata sandi kepada siapa pun, termasuk yang mengaku pihak Sokudo.',
  'Periksa nama toko, rating, dan ulasan sebelum membeli produk bernilai besar.',
  'Gunakan kata sandi yang unik dan aktifkan verifikasi dua langkah bila tersedia.',
  'Lakukan pembayaran hanya melalui metode resmi di halaman checkout.',
  'Simpan bukti pembayaran dan nomor pesanan sampai paket diterima.',
  'Waspadai tautan atau file dari pengirim tidak dikenal yang meminta data akun.',
];

export default function SecurityPage() {
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
            <span className="font-medium text-gray-900">Keamanan</span>
          </nav>

          <div className="mt-6 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">Keamanan</p>
              <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Belanja tenang, data tetap aman.
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-[50ch] text-sm leading-relaxed text-gray-600">
                Keamanan adalah tanggung jawab bersama. Kami menjaga sistem, dan
                kamu membantu menjaga akun dengan kebiasaan yang aman.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page py-10 lg:py-12">
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Perlindungan</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Yang kami lakukan untuk kamu
              </h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {protections.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card card-hover p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="card p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900">
                <Smartphone className="h-4 w-4 text-primary-600" aria-hidden="true" />
                Tips menjaga akun
              </h2>
              <ul className="mt-4 divide-y divide-gray-100">
                {tips.map((tip, index) => (
                  <li
                    key={tip}
                    className="flex items-start gap-3 py-3 text-sm leading-relaxed text-gray-600 first:pt-0 last:pb-0"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 text-[10px] font-bold text-primary-600">
                      {index + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-xl border-l-4 border-red-500 bg-red-50 px-5 py-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-red-700">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                Melaporkan penipuan
              </p>
              <p className="mt-2 text-xs leading-relaxed text-red-800">
                Jika kamu menerima permintaan mencurigakan atau mengalami
                penipuan, segera hubungi kami dengan menyertakan tangkapan layar
                dan nomor pesanan.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex text-xs font-semibold text-red-800 underline underline-offset-4"
              >
                Laporkan sekarang
              </Link>
            </div>

            <div className="card mt-4 p-5">
              <p className="text-sm font-semibold text-gray-900">
                Kami tidak pernah meminta
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  'Kode OTP atau PIN',
                  'Kata sandi akun',
                  'Transfer ke rekening pribadi',
                  'Unduhan aplikasi tidak resmi',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-gray-600"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
