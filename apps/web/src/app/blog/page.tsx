import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';

export const metadata = {
  title: 'Blog — Sokudo',
  description:
    'Tips belanja, panduan seller, dan kabar terbaru dari Sokudo.',
};

const featured = {
  tag: 'Panduan seller',
  title: 'Cara menyiapkan foto produk yang membuat orang berhenti scrolling',
  excerpt:
    'Foto yang baik bukan soal kamera mahal. Ini lima hal sederhana yang bisa langsung kamu terapkan minggu ini.',
  readTime: '6 menit',
  date: '8 Nov 2026',
  tint: '#e7dfd3',
  index: '01',
};

const posts = [
  {
    tag: 'Tips belanja',
    title: 'Cek stok dan ongkir sebelum checkout: ini urutannya',
    excerpt:
      'Supaya tidak kaget di halaman pembayaran, biasakan membaca ringkasan belanja dengan urutan ini.',
    readTime: '4 menit',
    date: '2 Nov 2026',
    tint: '#e1e7e0',
    index: '02',
  },
  {
    tag: 'Seller story',
    title: 'Dari toko kecil di Bandung ke 1.200 pesanan per bulan',
    excerpt:
      'Rahma bercerita soal konsistensi foto, jam balas chat, dan cara menjaga rating tetap tinggi.',
    readTime: '7 menit',
    date: '27 Okt 2026',
    tint: '#eae0d7',
    index: '03',
  },
  {
    tag: 'Panduan',
    title: 'Apa yang harus dilakukan kalau paket datang rusak',
    excerpt:
      'Dokumentasikan, laporkan, dan ajukan pengembalian. Panduan langkah demi langkah berikut.',
    readTime: '5 menit',
    date: '19 Okt 2026',
    tint: '#ede3ce',
    index: '04',
  },
  {
    tag: 'Produk',
    title: 'Cara kerja gratis ongkir Rp300 ribu di Sokudo',
    excerpt:
      'Batas dihitung dari subtotal sebelum ongkir. Ini contoh perhitungan lengkapnya.',
    readTime: '3 menit',
    date: '11 Okt 2026',
    tint: '#e9e6dd',
    index: '05',
  },
];

const categories = [
  'Semua',
  'Tips belanja',
  'Panduan seller',
  'Seller story',
  'Pengumuman',
];

export default function BlogPage() {
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
        <span className="text-ink-muted">Blog</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            Blog Sokudo
          </h1>
          <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-ink-muted">
            Tips belanja, panduan berjualan, dan cerita dari seller yang tumbuh
            bersama kami.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {categories.map((category, index) => (
            <span
              key={category}
              className={`border-b-2 pb-1.5 text-[12.5px] font-medium ${
                index === 0
                  ? 'border-ink text-ink'
                  : 'border-transparent text-ink-muted'
              }`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <Link
        href="/blog"
        className="group mt-8 grid grid-cols-1 border-b border-line pb-8 lg:grid-cols-12 lg:gap-10"
      >
        <div
          className="relative flex min-h-[200px] items-end justify-between border border-line p-5 lg:col-span-6"
          style={{ backgroundColor: featured.tint }}
        >
          <span className="pointer-events-none absolute inset-0 grain opacity-[0.14] mix-blend-multiply" />
          <span className="relative font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">
            Artikel unggulan
          </span>
          <span className="num relative text-6xl font-semibold leading-none tracking-[-0.06em] text-ink/25">
            {featured.index}
          </span>
        </div>

        <div className="flex flex-col justify-center pt-5 lg:col-span-6 lg:pt-0">
          <span className="label-mono">{featured.tag}</span>
          <h2 className="mt-3 max-w-[24ch] text-balance text-2xl font-bold leading-[1.15] tracking-[-0.025em] group-hover:underline group-hover:underline-offset-4 sm:text-3xl">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-[52ch] text-[13px] leading-relaxed text-ink-muted">
            {featured.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
            <span className="num">{featured.date}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {featured.readTime}
            </span>
            <span className="ml-auto inline-flex items-center gap-1 text-ink">
              Baca artikel
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <Link key={post.title} href="/blog" className="group flex flex-col">
            <div
              className="relative flex aspect-[4/3] items-end justify-between border border-line p-4"
              style={{ backgroundColor: post.tint }}
            >
              <span className="pointer-events-none absolute inset-0 grain opacity-[0.14] mix-blend-multiply" />
              <span className="relative font-mono text-[9px] uppercase tracking-[0.12em] text-ink/45">
                {post.tag}
              </span>
              <span className="num relative text-4xl font-semibold leading-none tracking-[-0.05em] text-ink/20">
                {post.index}
              </span>
            </div>

            <h3 className="mt-3 line-clamp-2 text-[14px] font-semibold leading-snug underline-offset-4 group-hover:underline">
              {post.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-ink-muted">
              {post.excerpt}
            </p>
            <p className="mt-auto flex items-center gap-3 pt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-soft">
              <span className="num">{post.date}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {post.readTime}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
