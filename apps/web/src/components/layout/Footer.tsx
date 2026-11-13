import Link from 'next/link';

const footerLinks = {
  marketplace: {
    title: 'Sokudo',
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
      { label: 'Cara Belanja', href: '/help#cara-belanja' },
      { label: 'Pengiriman', href: '/help#pengiriman' },
      { label: 'Pembayaran', href: '/help#pembayaran' },
      { label: 'Pengembalian', href: '/help#pengembalian' },
      { label: 'Promo', href: '/products' },
    ],
  },
  jual: {
    title: 'Jual',
    links: [
      { label: 'Mulai Berjualan', href: '/seller' },
      { label: 'Pusat Edukasi Seller', href: '/seller#edukasi' },
      { label: 'Kebijakan Seller', href: '/terms#seller' },
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
    <footer className="mt-20 bg-ink text-paper">
      <div className="mx-auto max-w-8xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-baseline gap-2">
              <span
                className="h-2.5 w-2.5 translate-y-[-2px] bg-primary-500"
                aria-hidden="true"
              />
              <span className="text-[22px] font-extrabold leading-none tracking-[-0.05em] text-paper">
                sokudo
              </span>
            </Link>
            <p className="mt-4 max-w-[34ch] text-[13px] leading-relaxed text-paper/55">
              Marketplace multi-vendor dari toko-toko terverifikasi di
              Indonesia. Satu checkout untuk semua pesanan.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/40">
              Jakarta · halo@sokudo.id
            </p>
          </div>

          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-paper/40">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-paper/70 underline-offset-4 transition-colors hover:text-paper hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/10 pt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Sokudo. Hak cipta dilindungi.</p>
          <p>Pembayaran aman · Pengiriman terlacak</p>
        </div>
      </div>
    </footer>
  );
}
