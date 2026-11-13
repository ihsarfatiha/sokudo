import Link from 'next/link';
import {
  ChevronDown,
  CreditCard,
  Mail,
  MessageCircle,
  PackageCheck,
  RotateCcw,
  Search,
  ShoppingBag,
  Truck,
} from 'lucide-react';

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
      'Gunakan tombol Kunjungi di halaman produk atau hubungi tim bantuan kami melalui halaman Kontak.',
  },
];

export default function HelpPage() {
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
        <span className="text-ink-muted">Pusat bantuan</span>
      </nav>

      <section className="mt-8 grid grid-cols-1 gap-10 border-b border-line pb-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h1 className="text-balance text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            Ada yang bisa kami bantu?
          </h1>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-relaxed text-ink-muted">
            Panduan singkat seputar belanja, pengiriman, pembayaran, dan
            pengembalian. Kalau belum terjawab, kirim pesan ke tim kami.
          </p>
        </div>

        <div className="lg:col-span-5 lg:pt-2">
          <form action="/products" role="search" className="flex items-stretch border border-ink/80 bg-surface">
            <Search
              className="ml-4 h-4 w-4 shrink-0 self-center text-ink-soft"
              aria-hidden="true"
            />
            <input
              type="search"
              name="q"
              placeholder="Cari produk atau topik bantuan"
              aria-label="Cari produk atau topik bantuan"
              className="w-full bg-transparent px-3 py-3 text-sm text-ink placeholder:text-ink-soft focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-ink px-5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ink/85 active:scale-[0.99]"
            >
              Cari
            </button>
          </form>

          <div className="mt-5 grid grid-cols-2 divide-x divide-line border-y border-line">
            {topics.map((topic, index) => (
              <a
                key={topic.id}
                href={`#${topic.id}`}
                className="group flex items-center gap-2.5 border-b border-line py-3 pr-3 transition-colors hover:bg-surface even:pl-3 even:pr-0"
              >
                <span className="num text-[9px] text-ink-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[12.5px] font-medium group-hover:underline">
                  {topic.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-xl font-bold tracking-[-0.02em]">Panduan</h2>
          <div className="mt-4 space-y-8">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <section
                  key={topic.id}
                  id={topic.id}
                  className="scroll-mt-40 border-t border-line pt-5"
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
                        {topic.title}
                      </h3>
                      <p className="mt-0.5 text-[12px] text-ink-muted">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                  <ol className="mt-4 space-y-2.5">
                    {topic.steps.map((step, index) => (
                      <li
                        key={step}
                        className="flex items-start gap-3 text-[13px] leading-relaxed text-ink-muted"
                      >
                        <span className="num mt-0.5 w-4 shrink-0 text-[10px] text-ink-soft">
                          {String(index + 1).padStart(2, '0')}
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

        <div className="lg:col-span-5">
          <h2 className="text-xl font-bold tracking-[-0.02em]">
            Pertanyaan umum
          </h2>
          <div className="mt-4 divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[13px] font-semibold leading-snug">
                  {faq.question}
                  <ChevronDown
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-2.5 max-w-[54ch] text-[12.5px] leading-relaxed text-ink-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 border border-line bg-surface px-5 py-4">
            <h3 className="flex items-center gap-2 text-[13px] font-semibold">
              <PackageCheck
                className="h-4 w-4 text-emerald-700"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              Masih butuh bantuan?
            </h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
              Tim kami membalas lewat email dalam 1×24 jam kerja.
            </p>
            <Link
              href="/contact"
              className="btn-secondary mt-4 w-full !py-2.5 !text-[12px]"
            >
              Hubungi kami
            </Link>
          </div>

          <ul className="mt-6 divide-y divide-line border-t border-line">
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
                <li key={item.title} className="flex items-start gap-3 py-3.5">
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-[12.5px] font-medium">{item.title}</p>
                    <p className="text-[11px] text-ink-soft">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
