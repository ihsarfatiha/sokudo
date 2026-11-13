import Link from 'next/link';
import {
  ChevronRight,
  CreditCard,
  Mail,
  MessageCircle,
  PackageCheck,
  RotateCcw,
  Search,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { FaqAccordion } from '@/components/help/FaqAccordion';

export const metadata = {
  title: 'Pusat Bantuan — Sokudo',
  description:
    'Panduan cara belanja, pengiriman, pembayaran, dan pengembalian di Sokudo.',
};

const topics = [
  {
    id: 'cara-belanja',
    icon: ShoppingBag,
    title: 'Cara belanja',
    description: 'Dari mencari produk sampai pesanan dibuat.',
    steps: [
      'Cari produk lewat kolom pencarian atau pilih kategori di beranda.',
      'Buka detail produk, pilih jumlah, lalu tambahkan ke keranjang.',
      'Buka keranjang, periksa item, dan lanjut ke checkout.',
      'Isi data pembeli, alamat, kurir, dan metode pembayaran.',
      'Klik Buat pesanan dan simpan nomor pesanan yang muncul.',
    ],
  },
  {
    id: 'pengiriman',
    icon: Truck,
    title: 'Pengiriman',
    description: 'Ongkir, kurir, dan estimasi waktu.',
    steps: [
      'Ongkir gratis untuk subtotal minimal Rp300.000. Di bawah itu dikenakan tarif flat Rp15.000.',
      'Pilihan kurir tersedia di halaman checkout: JNE, J&T, SiCepat, dan GoSend.',
      'Estimasi tiba mengikuti layanan kurir yang dipilih, umumnya 1–4 hari kerja.',
      'Nomor resi dikirim setelah penjual menyerahkan paket ke kurir.',
    ],
  },
  {
    id: 'pembayaran',
    icon: CreditCard,
    title: 'Pembayaran',
    description: 'Metode dan batas waktu pembayaran.',
    steps: [
      'Metode yang tersedia: transfer bank, QRIS, dan COD.',
      'Selesaikan pembayaran dalam 24 jam agar pesanan tidak dibatalkan otomatis.',
      'Simpan bukti pembayaran sampai pesanan berstatus dibayar.',
      'Jangan pernah mengirim kode OTP atau kata sandi kepada siapa pun.',
    ],
  },
  {
    id: 'pengembalian',
    icon: RotateCcw,
    title: 'Pengembalian',
    description: 'Cara mengajukan pengembalian atau refund.',
    steps: [
      'Ajukan pengembalian maksimal 7 hari setelah pesanan diterima.',
      'Sertakan foto produk, kemasan, dan label pengiriman sebagai bukti.',
      'Penjual akan merespons, dan admin dapat memediasi jika tidak ada kesepakatan.',
      'Refund diproses ke metode pembayaran awal setelah disetujui.',
    ],
  },
];

const faqs = [
  {
    question: 'Apakah harus punya akun untuk checkout?',
    answer:
      'Tidak. Kamu bisa checkout sebagai tamu dengan mengisi nama, email, dan nomor WhatsApp. Akun berguna untuk menyimpan alamat dan melihat riwayat pesanan.',
  },
  {
    question: 'Bagaimana cara melacak pesanan?',
    answer:
      'Buka halaman Lacak Pesanan, masukkan nomor pesanan yang kamu terima setelah checkout, lalu klik Lacak.',
  },
  {
    question: 'Kenapa ongkir saya berbeda dari perkiraan?',
    answer:
      'Ongkir mengikuti kurir dan tujuan. Gratis ongkir hanya berlaku bila subtotal mencapai Rp300.000 sebelum ongkir.',
  },
  {
    question: 'Apakah produk bisa digabung dari beberapa toko?',
    answer:
      'Bisa. Keranjang dapat berisi produk dari beberapa toko, dan checkout membuat satu pesanan dengan ringkasan per item.',
  },
  {
    question: 'Bagaimana cara menghubungi penjual?',
    answer:
      'Gunakan tombol di halaman produk atau hubungi tim bantuan kami melalui halaman Kontak.',
  },
];

export default function HelpPage() {
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
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-gray-900">Pusat bantuan</span>
          </nav>

          <div className="mt-6 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">Pusat bantuan</p>
              <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Ada yang bisa kami bantu?
              </h1>
              <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-gray-600">
                Panduan singkat seputar belanja, pengiriman, pembayaran, dan
                pengembalian. Kalau belum terjawab, kirim pesan ke tim kami.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form
                action="/products"
                role="search"
                className="group flex items-center rounded-xl border border-gray-200 bg-white p-1.5 shadow-soft transition-shadow duration-300 focus-within:border-primary-300 focus-within:shadow-lift"
              >
                <Search
                  className="ml-2.5 h-4 w-4 shrink-0 text-gray-400 transition-colors group-focus-within:text-primary-600"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  name="q"
                  placeholder="Cari produk atau topik bantuan"
                  aria-label="Cari produk atau topik bantuan"
                  className="w-full bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
                <button type="submit" className="btn-primary shrink-0 !px-4 !py-2">
                  Cari
                </button>
              </form>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <a
                  key={topic.id}
                  href={`#${topic.id}`}
                  className="group flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700 hover:shadow-soft"
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
                  <span className="truncate">{topic.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container-page py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="card p-5 sm:p-6">
              <h2 className="text-lg font-bold tracking-tight text-gray-900">
                Panduan
              </h2>
              <div className="mt-4 space-y-8">
                {topics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <section
                      key={topic.id}
                      id={topic.id}
                      className="scroll-mt-36 border-t border-gray-100 pt-5 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {topic.title}
                          </h3>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {topic.description}
                          </p>
                        </div>
                      </div>
                      <ol className="mt-4 space-y-2.5">
                        {topic.steps.map((step, index) => (
                          <li
                            key={step}
                            className="flex items-start gap-3 text-sm leading-relaxed text-gray-600"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </section>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card p-5 sm:p-6">
              <h2 className="text-lg font-bold tracking-tight text-gray-900">
                Pertanyaan umum
              </h2>
              <div className="mt-2">
                <FaqAccordion faqs={faqs} />
              </div>
            </div>

            <div className="card mt-4 p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <PackageCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                Masih butuh bantuan?
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                Tim kami membalas lewat email dalam 1×24 jam kerja.
              </p>
              <Link href="/contact" className="btn-secondary mt-4 w-full !py-2.5 !text-xs">
                Hubungi kami
              </Link>
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {[
                {
                  icon: MessageCircle,
                  title: 'Chat bantuan',
                  text: 'Senin–Sabtu, 08.00–20.00 WIB',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  text: 'halo@sokudo.id',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.title}
                    className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{item.title}</p>
                      <p className="mt-0.5 text-[11px] text-gray-500">{item.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
