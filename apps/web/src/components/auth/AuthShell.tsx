import Link from 'next/link';
import { ShieldCheck, Truck, UserRound } from 'lucide-react';

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
    <div className="mx-auto max-w-8xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid grid-cols-1 border border-line bg-surface lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-ink p-10 text-paper lg:flex">
          <Link href="/" className="flex items-baseline gap-2">
            <span
              className="h-2.5 w-2.5 translate-y-[-2px] bg-primary-500"
              aria-hidden="true"
            />
            <span className="text-xl font-extrabold leading-none tracking-[-0.05em]">
              sokudo
            </span>
          </Link>

          <div className="max-w-[30ch]">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40">
              Akun Sokudo
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.02] tracking-[-0.04em]">
              Satu akun, semua toko.
            </h2>
            <p className="mt-4 text-[13px] leading-relaxed text-paper/55">
              Simpan alamat, lacak pesanan, dan kelola riwayat belanja dari
              berbagai penjual dalam satu tempat.
            </p>
          </div>

          <ul className="space-y-3 border-t border-paper/10 pt-6">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <li
                  key={point.text}
                  className="flex items-center gap-2.5 text-[12px] text-paper/60"
                >
                  <Icon
                    className="h-4 w-4 shrink-0 text-paper/40"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {point.text}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <Link href="/" className="flex items-baseline gap-2 lg:hidden">
            <span
              className="h-2.5 w-2.5 translate-y-[-2px] bg-primary-600"
              aria-hidden="true"
            />
            <span className="text-lg font-extrabold leading-none tracking-[-0.05em]">
              sokudo
            </span>
          </Link>

          <h1 className="mt-6 text-2xl font-extrabold tracking-[-0.03em] lg:mt-0">
            {title}
          </h1>
          <p className="mt-1.5 max-w-[42ch] text-[13px] leading-relaxed text-ink-muted">
            {subtitle}
          </p>

          <div className="mt-7">{children}</div>

          <div className="mt-7 border-t border-line pt-5 text-[13px] text-ink-muted">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
