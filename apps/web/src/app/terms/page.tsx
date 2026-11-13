import Link from 'next/link';
import { FileText, Mail } from 'lucide-react';

export const metadata = {
  title: 'Syarat & Ketentuan — Sokudo',
  description:
    'Syarat dan ketentuan penggunaan platform Sokudo untuk pembeli dan penjual.',
};

const updated = '1 Januari 2026';

const sections = [
  {
    id: 'akun',
    title: 'Akun pengguna',
    body: [
      'Pengguna wajib memberikan informasi yang benar dan menjaga kerahasiaan kata sandi.',
      'Satu akun tidak boleh digunakan untuk menyamar sebagai pihak lain atau melakukan tindakan yang merugikan pengguna lain.',
      'Sokudo dapat menangguhkan akun yang melanggar ketentuan setelah melalui proses pemeriksaan.',
    ],
  },
  {
    id: 'transaksi',
    title: 'Transaksi dan pembayaran',
    body: [
      'Harga yang ditampilkan adalah harga dari penjual dan belum termasuk ongkir kecuali dinyatakan lain.',
      'Pesanan dianggap sah setelah pembayaran diterima atau metode pembayaran dipilih dan dikonfirmasi.',
      'Pembayaran yang belum diselesaikan dalam batas waktu dapat dibatalkan secara otomatis.',
    ],
  },
  {
    id: 'pengiriman',
    title: 'Pengiriman',
    body: [
      'Estimasi pengiriman bergantung pada kurir dan lokasi tujuan.',
      'Penjual wajib mengirim pesanan sesuai deskripsi dan waktu yang wajar.',
      'Pembeli wajib memberikan alamat yang lengkap dan dapat dihubungi.',
    ],
  },
  {
    id: 'pengembalian',
    title: 'Pengembalian dan sengketa',
    body: [
      'Permintaan pengembalian dapat diajukan untuk produk yang tidak sesuai, rusak, atau tidak diterima.',
      'Pembeli perlu menyertakan bukti pendukung seperti foto produk dan kemasan.',
      'Sokudo dapat memediasi sengketa dan mengambil keputusan berdasarkan bukti dari kedua pihak.',
    ],
  },
  {
    id: 'seller',
    title: 'Kewajiban penjual',
    body: [
      'Penjual wajib memiliki izin usaha yang sah dan mematuhi hukum yang berlaku.',
      'Penjual dilarang menjual produk palsu, ilegal, berbahaya, atau melanggar hak kekayaan intelektual.',
      'Penjual bertanggung jawab atas keakuratan deskripsi, stok, dan harga produk.',
      'Komisi platform sebesar 5% dari nilai transaksi berlaku kecuali disepakati lain secara tertulis.',
    ],
  },
  {
    id: 'larangan',
    title: 'Larangan penggunaan',
    body: [
      'Dilarang menggunakan platform untuk penipuan, spam, atau manipulasi ulasan.',
      'Dilarang mengakses sistem secara tidak sah atau mengganggu layanan.',
      'Pelanggaran dapat berujung pada penangguhan akun dan pelaporan kepada pihak berwenang.',
    ],
  },
  {
    id: 'perubahan',
    title: 'Perubahan ketentuan',
    body: [
      'Sokudo dapat memperbarui ketentuan ini sewaktu-waktu. Versi terbaru berlaku setelah dipublikasikan.',
      'Dengan terus menggunakan layanan setelah pembaruan, kamu dianggap menyetujui ketentuan yang berlaku.',
    ],
  },
];

export default function TermsPage() {
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
            <span className="font-medium text-gray-900">
              Syarat dan ketentuan
            </span>
          </nav>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Dokumen legal
              </p>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Syarat dan ketentuan
              </h1>
              <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-gray-600">
                Berlaku untuk pembeli dan penjual di platform Sokudo. Dengan
                menggunakan layanan, kamu menyetujui ketentuan di bawah ini.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Terakhir diperbarui
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">{updated}</p>
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

            <p className="mt-4 flex flex-wrap items-center gap-1.5 text-xs leading-relaxed text-gray-600">
              Ada pertanyaan soal ketentuan ini? Kirim email ke
              <a
                href="mailto:legal@sokudo.id"
                className="inline-flex items-center gap-1 font-semibold text-primary-600 underline-offset-4 hover:underline"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                legal@sokudo.id
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
