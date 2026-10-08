import Link from 'next/link';

const footerLinks = {
  marketplace: {
    title: 'Marketplace',
    links: [
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Karir', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Kebijakan Privasi', href: '/privacy' },
      { label: 'Syarat & Ketentuan', href: '/terms' },
    ],
  },
  beli: {
    title: 'Beli',
    links: [
      { label: 'Cara Belanja', href: '/help/how-to-buy' },
      { label: 'Pengiriman', href: '/help/shipping' },
      { label: 'Pembayaran', href: '/help/payment' },
      { label: 'Pengembalian', href: '/help/return' },
      { label: 'Promo', href: '/promo' },
    ],
  },
  jual: {
    title: 'Jual',
    links: [
      { label: 'Mulai Berjualan', href: '/seller' },
      { label: 'Pusat Edukasi Seller', href: '/seller/education' },
      { label: 'Kebijakan Seller', href: '/seller/policy' },
    ],
  },
  bantuan: {
    title: 'Bantuan',
    links: [
      { label: 'Pusat Bantuan', href: '/help' },
      { label: 'Hubungi Kami', href: '/contact' },
      { label: 'Keamanan', href: '/security' },
    ],
  },
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-lg font-bold text-primary-600">Marketplace</h2>
              <p className="mt-1 text-sm text-gray-500">
                Platform belanja online terpercaya
              </p>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Marketplace. Hak cipta dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
