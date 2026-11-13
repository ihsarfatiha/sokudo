import Link from 'next/link';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Kebijakan Privasi — Sokudo',
  description:
    'Penjelasan bagaimana Sokudo mengumpulkan, menggunakan, dan melindungi data pribadi pengguna.',
};

const sections = [
  {
    id: 'data-yang-dikumpulkan',
    title: 'Data yang kami kumpulkan',
    body: [
      'Data akun: nama, alamat email, nomor telepon, dan kata sandi yang disimpan dalam bentuk hash.',
      'Data transaksi: alamat pengiriman, isi pesanan, metode pembayaran, dan riwayat pesanan.',
      'Data teknis: jenis perangkat, browser, alamat IP, dan halaman yang dikunjungi untuk menjaga keamanan layanan.',
    ],
  },
  {
    id: 'cara-kami-menggunakan-data',
    title: 'Cara kami menggunakan data',
    body: [
      'Memproses pesanan, menghitung ongkir, dan mengirim pembaruan status pesanan.',
      'Menyediakan bantuan pelanggan ketika ada kendala transaksi.',
      'Meningkatkan kualitas katalog, pencarian, dan rekomendasi produk.',
      'Mencegah penipuan, penyalahgunaan akun, dan aktivitas yang melanggar ketentuan.',
    ],
  },
  {
    id: 'berbagi-data',
    title: 'Berbagi data dengan pihak lain',
    body: [
      'Data pengiriman dibagikan kepada kurir atau mitra logistik hanya sebatas yang dibutuhkan untuk mengantar pesanan.',
      'Penyedia pembayaran menerima data transaksi sesuai kebutuhan pemrosesan pembayaran.',
      'Kami tidak menjual data pribadi kepada pihak ketiga untuk tujuan iklan.',
    ],
  },
  {
    id: 'penyimpanan',
    title: 'Penyimpanan dan keamanan',
    body: [
      'Data disimpan selama akun aktif atau selama diperlukan untuk memenuhi kewajiban hukum dan penyelesaian sengketa.',
      'Akses ke data dibatasi berdasarkan peran. Kata sandi tidak pernah disimpan dalam bentuk teks asli.',
      'Meskipun kami menerapkan langkah keamanan yang wajar, tidak ada sistem yang sepenuhnya bebas risiko.',
    ],
  },
  {
    id: 'hak-pengguna',
    title: 'Hak pengguna',
    body: [
      'Kamu dapat meminta akses, koreksi, atau penghapusan data pribadi dengan menghubungi kami.',
      'Kamu dapat berhenti menerima email promosi melalui tautan berhenti berlangganan di setiap email.',
      'Permintaan yang sah akan diproses dalam waktu yang wajar setelah verifikasi identitas.',
    ],
  },
  {
    id: 'perubahan',
    title: 'Perubahan kebijakan',
    body: [
      'Kebijakan ini dapat diperbarui seiring pertumbuhan layanan. Versi terbaru selalu tersedia di halaman ini.',
      'Perubahan penting akan diumumkan melalui email atau pemberitahuan di aplikasi.',
    ],
  },
];

export default function PrivacyPage() {
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
        <span className="text-ink-muted">Kebijakan privasi</span>
      </nav>

      <header className="mt-8 grid grid-cols-1 gap-6 border-b border-line pb-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-2">
            <Lock
              className="h-4 w-4 text-ink-soft"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="label-mono">Dokumen legal</p>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            Kebijakan privasi
          </h1>
          <p className="mt-3 max-w-[58ch] text-[13.5px] leading-relaxed text-ink-muted">
            Kami menghargai privasi kamu. Dokumen ini menjelaskan data apa yang
            dikumpulkan Sokudo, mengapa data itu dibutuhkan, dan bagaimana kamu
            bisa mengendalikannya.
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Terakhir diperbarui
          </p>
          <p className="num mt-1 text-[13px]">1 Januari 2026</p>
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr] lg:gap-14">
        <nav
          className="h-fit lg:sticky lg:top-40"
          aria-label="Daftar bagian"
        >
          <p className="label-mono">Isi dokumen</p>
          <ol className="mt-3 space-y-1.5 border-t border-line pt-3">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex items-baseline gap-2 text-[12px] leading-relaxed text-ink-muted transition-colors hover:text-ink"
                >
                  <span className="num text-[10px] text-ink-soft">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-[68ch]">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-40 border-t border-line py-6 first:border-t-0 first:pt-0"
            >
              <div className="flex items-baseline gap-3">
                <span className="num text-[10px] text-ink-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="text-[16px] font-bold tracking-[-0.015em]">
                  {section.title}
                </h2>
              </div>
              <ul className="mt-3 space-y-2 pl-7">
                {section.body.map((item) => (
                  <li
                    key={item}
                    className="text-[13px] leading-relaxed text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="mt-6 flex flex-col gap-4 border border-line bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <p className="text-[13px] font-semibold">
                  Ada pertanyaan tentang data kamu?
                </p>
                <p className="mt-0.5 text-[12px] text-ink-muted">
                  Hubungi tim privasi untuk permintaan akses atau penghapusan.
                </p>
              </div>
            </div>
            <a
              href="mailto:privasi@sokudo.id"
              className="btn-secondary shrink-0 !px-3.5 !py-2 !text-[12px]"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              privasi@sokudo.id
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
