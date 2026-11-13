import Link from 'next/link';
import { Mail, MapPin, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';

const footerLinks = [
  {
    title: 'Sokudo',
    links: [
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Karir', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Kebijakan Privasi', href: '/privacy' },
      { label: 'Syarat & Ketentuan', href: '/terms' },
    ],
  },
  {
    title: 'Beli',
    links: [
      { label: 'Cara Belanja', href: '/help#cara-belanja' },
      { label: 'Pengiriman', href: '/help#pengiriman' },
      { label: 'Pembayaran', href: '/help#pembayaran' },
      { label: 'Pengembalian', href: '/help#pengembalian' },
      { label: 'Promo', href: '/#flash-sale' },
    ],
  },
  {
    title: 'Jual',
    links: [
      { label: 'Mulai Berjualan', href: '/seller' },
      { label: 'Pusat Edukasi Seller', href: '/seller#edukasi' },
      { label: 'Kebijakan Seller', href: '/terms#seller' },
      { label: 'Lacak Pesanan', href: '/orders' },
    ],
  },
  {
    title: 'Bantuan',
    links: [
      { label: 'Pusat Bantuan', href: '/help' },
      { label: 'Hubungi Kami', href: '/contact' },
      { label: 'Keamanan', href: '/security' },
      { label: 'Status Pengiriman', href: '/orders' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container-page py-12 sm:py-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="Sokudo, beranda">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
                <ShoppingBag className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Sokudo<span className="text-primary-600">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-gray-600">
              Marketplace multi-vendor dari toko terverifikasi di Indonesia.
              Satu keranjang, satu checkout.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" aria-hidden="true" />
                Jakarta Selatan, Indonesia
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" aria-hidden="true" />
                halo@sokudo.id
              </li>
            </ul>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-gray-600 transition-colors hover:text-primary-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Pembayaran aman
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-primary-600" aria-hidden="true" />
              Pengiriman terlacak
            </span>
          </div>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Sokudo. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
