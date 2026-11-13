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
    <div className="bg-gray-50/60">
      <div className="border-b border-gray-100 bg-white">
        <div className="container-page py-8 lg:py-10">
          <nav
            className="flex items-center gap-1.5 text-xs text-gray-500"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-primary-600">
              Beranda
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-gray-900">Kebijakan privasi</span>
          </nav>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                Dokumen legal
              </p>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Kebijakan privasi
              </h1>
              <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-gray-600">
                Kami menghargai privasi kamu. Dokumen ini menjelaskan data apa
                yang dikumpulkan Sokudo, mengapa data itu dibutuhkan, dan
                bagaimana kamu bisa mengendalikannya.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Terakhir diperbarui
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                1 Januari 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
          <nav
            className="card h-fit p-4 lg:sticky lg:top-36"
            aria-label="Daftar bagian"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Isi dokumen
            </p>
            <ol className="mt-3 space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex items-baseline gap-2 rounded-md px-2 py-1.5 text-xs leading-relaxed text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
                  >
                    <span className="text-[10px] font-semibold text-gray-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-[70ch]">
            <div className="card p-5 sm:p-7">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-36 border-t border-gray-100 py-6 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-bold text-primary-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-base font-bold tracking-tight text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="mt-3 space-y-2 pl-7">
                    {section.body.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-relaxed text-gray-600"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="card mt-4 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Ada pertanyaan tentang data kamu?
                  </p>
                  <p className="mt-0.5 text-xs text-gray-600">
                    Hubungi tim privasi untuk permintaan akses atau penghapusan.
                  </p>
                </div>
              </div>
              <a
                href="mailto:privasi@sokudo.id"
                className="btn-secondary shrink-0 !px-3.5 !py-2 !text-xs"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                privasi@sokudo.id
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
