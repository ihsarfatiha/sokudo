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
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <nav
        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Beranda
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink-muted">Keamanan</span>
      </nav>

      <section className="mt-8 grid grid-cols-1 gap-10 border-b border-line pb-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h1 className="text-balance text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            Belanja tenang, data tetap aman.
          </h1>
        </div>
        <div className="lg:col-span-5 lg:pt-2">
          <p className="max-w-[50ch] text-[14px] leading-relaxed text-ink-muted">
            Keamanan adalah tanggung jawab bersama. Kami menjaga sistem, dan
            kamu membantu menjaga akun dengan kebiasaan yang aman.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="label-mono">Perlindungan dari kami</h2>
        <div className="mt-4 grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {protections.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="py-5 sm:px-5 sm:first:pl-0">
                <div className="flex items-baseline justify-between">
                  <Icon
                    className="h-4 w-4 text-ink-soft"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="num text-[10px] text-ink-soft">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-3 text-[13px] font-semibold">{item.title}</h3>
                <p className="mt-1 max-w-[30ch] text-[12px] leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-[-0.02em]">
            <Smartphone
              className="h-4 w-4 text-ink-soft"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Tips menjaga akun
          </h2>
          <ul className="mt-4 divide-y divide-line border-t border-line">
            {tips.map((tip, index) => (
              <li
                key={tip}
                className="flex items-start gap-3 py-3.5 text-[13px] leading-relaxed text-ink-muted"
              >
                <span className="num mt-0.5 w-4 shrink-0 text-[10px] text-ink-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-5">
          <div className="border-l-2 border-red-700 bg-red-50 px-5 py-4">
            <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-red-900">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              Melaporkan penipuan
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-red-900/80">
              Jika kamu menerima permintaan mencurigakan atau mengalami
              penipuan, segera hubungi kami dengan menyertakan tangkapan layar
              dan nomor pesanan.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex text-[12px] font-semibold text-red-900 underline underline-offset-4"
            >
              Laporkan sekarang
            </Link>
          </div>

          <div className="mt-4 border border-line bg-surface px-5 py-4">
            <p className="text-[13px] font-semibold">Kami tidak pernah meminta</p>
            <ul className="mt-2.5 space-y-1.5">
              {[
                'Kode OTP atau PIN',
                'Kata sandi akun',
                'Transfer ke rekening pribadi',
                'Unduhan aplikasi tidak resmi',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12px] text-ink-muted"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-soft"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
