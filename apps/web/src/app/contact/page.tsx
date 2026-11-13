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
            <span className="font-medium text-gray-900">Hubungi kami</span>
          </nav>

          <div className="mt-5">
            <p className="eyebrow">Hubungi kami</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Ada yang bisa kami bantu?
            </h1>
            <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-gray-600">
              Ada pertanyaan soal pesanan, pembayaran, atau ingin bekerja sama
              sebagai seller? Kirim pesan atau hubungi kanal di samping.
            </p>
          </div>
        </div>
      </div>

      <div className="container-page py-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Kirim pesan
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Isi formulir di bawah, tim kami akan membalas lewat email.
            </p>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>

          <aside>
            <div className="card p-5">
              <h2 className="text-lg font-bold tracking-tight text-gray-900">
                Kanal resmi
              </h2>
              <ul className="mt-3 divide-y divide-gray-100">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <li key={channel.title}>
                      <a
                        href={channel.href}
                        className="group flex items-start gap-3 py-3.5 transition-colors first:pt-0 last:pb-0 hover:text-primary-700"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            {channel.title}
                          </p>
                          <p className="mt-0.5 truncate text-sm font-semibold text-gray-900 group-hover:text-primary-700">
                            {channel.value}
                          </p>
                          <p className="mt-0.5 text-[11px] text-gray-500">
                            {channel.note}
                          </p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Sebelum menghubungi
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-amber-800">
                Sertakan nomor pesanan agar kami bisa memeriksa lebih cepat.
                Panduan singkat juga tersedia di{' '}
                <Link href="/help" className="font-semibold underline underline-offset-2">
                  Pusat Bantuan
                </Link>
                .
              </p>
            </div>

            <div className="card mt-4 p-4">
              <p className="text-sm font-semibold text-gray-900">
                Jam operasional
              </p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                Senin–Jumat 09.00–17.00 · Sabtu 08.00–20.00 WIB
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
