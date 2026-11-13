import Link from 'next/link';
import { Banknote, Clock, Mail, MessageCircle, Truck } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Hubungi Kami — Sokudo',
  description:
    'Hubungi tim Sokudo untuk pertanyaan pesanan, pembayaran, atau kerja sama seller.',
};

const channels = [
  {
    icon: Mail,
    title: 'Email',
    value: 'halo@sokudo.id',
    href: 'mailto:halo@sokudo.id',
    note: 'Balasan dalam 1×24 jam kerja',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+62 811-0000-1111',
    href: 'https://wa.me/6281100001111',
    note: 'Senin–Sabtu, 08.00–20.00 WIB',
  },
  {
    icon: Banknote,
    title: 'Telepon',
    value: '021-555-0123',
    href: 'tel:+62215550123',
    note: 'Senin–Jumat, 09.00–17.00 WIB',
  },
  {
    icon: Truck,
    title: 'Kantor',
    value: 'Jakarta Selatan, Indonesia',
    href: 'https://maps.google.com/?q=Jakarta+Selatan',
    note: 'Kunjungan dengan perjanjian',
  },
];

export default function ContactPage() {
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
        <span className="text-ink-muted">Hubungi kami</span>
      </nav>

      <div className="mt-6 border-b border-line pb-6">
        <h1 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
          Hubungi kami
        </h1>
        <p className="mt-2 max-w-[56ch] text-[13px] leading-relaxed text-ink-muted">
          Ada pertanyaan soal pesanan, pembayaran, atau ingin bekerja sama
          sebagai seller? Kirim pesan atau hubungi kanal di samping.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
        <div>
          <h2 className="label-mono">Kirim pesan</h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>

        <aside>
          <h2 className="label-mono">Kanal resmi</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.title}>
                  <a
                    href={channel.href}
                    className="group flex items-start gap-3 py-3.5 transition-colors hover:text-ink"
                  >
                    <Icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
                        {channel.title}
                      </p>
                      <p className="mt-0.5 truncate text-[13px] font-medium">
                        {channel.value}
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink-soft">
                        {channel.note}
                      </p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 border-l-2 border-amber-600 bg-amber-50 px-4 py-3">
            <p className="flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-900">
              <Clock className="h-3 w-3" aria-hidden="true" />
              Sebelum menghubungi
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-amber-900/80">
              Sertakan nomor pesanan agar kami bisa memeriksa lebih cepat.
              Panduan singkat juga tersedia di{' '}
              <Link href="/help" className="font-semibold underline">
                Pusat Bantuan
              </Link>
              .
            </p>
          </div>

          <div className="mt-6 border border-line bg-surface px-4 py-3">
            <p className="text-[12.5px] font-semibold">Jam operasional</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
              Senin–Jumat 09.00–17.00 · Sabtu 08.00–20.00 WIB
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
