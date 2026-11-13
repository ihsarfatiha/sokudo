import Link from 'next/link';
import { BadgeCheck, ShieldCheck, ShoppingBag, Truck, UserRound } from 'lucide-react';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const points = [
  { icon: ShieldCheck, text: 'Pembayaran diproses dengan enkripsi' },
  { icon: Truck, text: 'Gratis ongkir untuk pesanan di atas Rp300.000' },
  { icon: UserRound, text: 'Satu akun untuk semua toko' },
];

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="container-page py-10 lg:py-14">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-indigo-600 p-10 text-white lg:flex">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-sky-300/20 blur-2xl"
            aria-hidden="true"
          />

          <Link href="/" className="relative flex items-center gap-2" aria-label="Sokudo, beranda">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-white/25">
              <ShoppingBag className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="text-xl font-bold tracking-tight">Sokudo.</span>
          </Link>

          <div className="relative max-w-[30ch]">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Akun Sokudo
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight">
              Satu akun, semua toko.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-50/85">
              Simpan alamat, lacak pesanan, dan kelola riwayat belanja dari
              berbagai penjual dalam satu tempat.
            </p>
          </div>

          <ul className="relative space-y-3 border-t border-white/15 pt-6">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <li
                  key={point.text}
                  className="flex items-center gap-2.5 text-xs text-primary-50/85"
                >
                  <Icon className="h-4 w-4 shrink-0 text-white/70" aria-hidden="true" />
                  {point.text}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <Link href="/" className="flex items-center gap-2 lg:hidden" aria-label="Sokudo, beranda">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              <ShoppingBag className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Sokudo<span className="text-primary-600">.</span>
            </span>
          </Link>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 lg:mt-0">
            {title}
          </h1>
          <p className="mt-1.5 max-w-[42ch] text-sm leading-relaxed text-gray-600">
            {subtitle}
          </p>

          <div className="mt-7">{children}</div>

          <div className="mt-7 border-t border-gray-100 pt-5 text-sm text-gray-600">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
