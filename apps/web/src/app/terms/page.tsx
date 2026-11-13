import Link from 'next/link';
import { FileText } from 'lucide-react';

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
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <nav
        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Beranda
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink-muted">Syarat dan ketentuan</span>
      </nav>

      <header className="mt-8 grid grid-cols-1 gap-6 border-b border-line pb-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-2">
            <FileText
              className="h-4 w-4 text-ink-soft"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="label-mono">Dokumen legal</p>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            Syarat dan ketentuan
          </h1>
          <p className="mt-3 max-w-[58ch] text-[13.5px] leading-relaxed text-ink-muted">
            Berlaku untuk pembeli dan penjual di platform Sokudo. Dengan
            menggunakan layanan, kamu menyetujui ketentuan di bawah ini.
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Terakhir diperbarui
          </p>
          <p className="num mt-1 text-[13px]">{updated}</p>
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr] lg:gap-14">
        <nav className="h-fit lg:sticky lg:top-40" aria-label="Daftar bagian">
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

          <p className="mt-6 border-t border-line pt-5 text-[12.5px] leading-relaxed text-ink-muted">
            Ada pertanyaan soal ketentuan ini? Kirim email ke{' '}
            <a
              href="mailto:legal@sokudo.id"
              className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              legal@sokudo.id
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
