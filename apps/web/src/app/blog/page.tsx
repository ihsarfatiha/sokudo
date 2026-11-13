import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

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
  emoji: '📸',
  gradient: ['#1e3a8a', '#3b82f6'] as [string, string],
};

const posts = [
  {
    tag: 'Tips belanja',
    title: 'Cek stok dan ongkir sebelum checkout: ini urutannya',
    excerpt:
      'Supaya tidak kaget di halaman pembayaran, biasakan membaca ringkasan belanja dengan urutan ini.',
    readTime: '4 menit',
    date: '2 Nov 2026',
    emoji: '🛒',
    gradient: ['#7c2d12', '#ea580c'] as [string, string],
  },
  {
    tag: 'Seller story',
    title: 'Dari toko kecil di Bandung ke 1.200 pesanan per bulan',
    excerpt:
      'Rahma bercerita soal konsistensi foto, jam balas chat, dan cara menjaga rating tetap tinggi.',
    readTime: '7 menit',
    date: '27 Okt 2026',
    emoji: '🏪',
    gradient: ['#831843', '#ec4899'] as [string, string],
  },
  {
    tag: 'Panduan',
    title: 'Apa yang harus dilakukan kalau paket datang rusak',
    excerpt:
      'Dokumentasikan, laporkan, dan ajukan pengembalian. Panduan langkah demi langkah berikut.',
    readTime: '5 menit',
    date: '19 Okt 2026',
    emoji: '📦',
    gradient: ['#14532d', '#22c55e'] as [string, string],
  },
  {
    tag: 'Produk',
    title: 'Cara kerja gratis ongkir Rp300 ribu di Sokudo',
    excerpt:
      'Batas dihitung dari subtotal sebelum ongkir. Ini contoh perhitungan lengkapnya.',
    readTime: '3 menit',
    date: '11 Okt 2026',
    emoji: '🚚',
    gradient: ['#581c87', '#a855f7'] as [string, string],
  },
];

const topics = ['Tips belanja', 'Panduan seller', 'Seller story', 'Pengumuman'];

export default function BlogPage() {
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
            <span className="font-medium text-gray-900">Blog</span>
          </nav>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Blog</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Cerita dan tips dari Sokudo
              </h1>
              <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-gray-600">
                Tips belanja, panduan berjualan, dan cerita dari seller yang
                tumbuh bersama kami.
              </p>
            </div>

            <ul className="flex flex-wrap items-center gap-2">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-page py-8 lg:py-10">
        <Link
          href="/blog"
          className="group card card-hover grid grid-cols-1 overflow-hidden lg:grid-cols-12"
        >
          <div
            className="relative flex min-h-[220px] items-center justify-center overflow-hidden lg:col-span-6"
            style={{
              backgroundImage: `linear-gradient(135deg, ${featured.gradient[0]}, ${featured.gradient[1]})`,
            }}
          >
            <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
            <span
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_45%)]"
              aria-hidden="true"
            />
            <span className="relative select-none text-[6rem] drop-shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-out group-hover:scale-110">
              {featured.emoji}
            </span>
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-700 backdrop-blur">
              Artikel unggulan
            </span>
          </div>

          <div className="flex flex-col justify-center p-5 sm:p-7 lg:col-span-6">
            <span className="badge-primary w-fit">{featured.tag}</span>
            <h2 className="mt-3 max-w-[26ch] text-balance text-xl font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-primary-700 sm:text-2xl">
              {featured.title}
            </h2>
            <p className="mt-2.5 max-w-[52ch] text-sm leading-relaxed text-gray-600">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500">
              <span>{featured.date}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {featured.readTime}
              </span>
              <span className="ml-auto inline-flex items-center gap-1 font-semibold text-primary-600">
                Baca artikel
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.title}
              href="/blog"
              className="group card card-hover flex flex-col overflow-hidden"
            >
              <div
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})`,
                }}
              >
                <span className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
                <span
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_45%)]"
                  aria-hidden="true"
                />
                <span className="relative select-none text-5xl drop-shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-out group-hover:scale-110">
                  {post.emoji}
                </span>
                <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-700 backdrop-blur">
                  {post.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary-700">
                  {post.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>
                <p className="mt-auto flex items-center gap-3 pt-3 text-[11px] text-gray-500">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {post.readTime}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
