'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, Copy, Home, Package, ShoppingBag, Truck } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

const steps = [
  {
    icon: Package,
    title: 'Pesanan diterima',
    description: 'Penjual menyiapkan produk kamu',
  },
  {
    icon: Truck,
    title: 'Dikirim',
    description: 'Paket diserahkan ke kurir dan bisa dilacak',
  },
  {
    icon: ShoppingBag,
    title: 'Diterima',
    description: 'Paket sampai di alamat tujuan',
  },
];

export function OrderSuccess() {
  const params = useSearchParams();
  const orderNumber = params.get('order') ?? 'SKD-DEMO-0000';
  const total = Number(params.get('total') ?? 0);
  const demo = params.get('demo') === '1';
  const [copied, setCopied] = useState(false);

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="label-mono">Pesanan dibuat</p>
      <h1 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-5xl">
        Terima kasih.
      </h1>
      <p className="mt-4 max-w-[48ch] text-[14px] leading-relaxed text-ink-muted">
        Pesanan kamu sudah masuk ke penjual. Instruksi pembayaran dikirim ke
        email yang kamu isi saat checkout.
      </p>

      <div className="mt-8 border border-line bg-surface">
        <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-line px-5 py-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            Nomor pesanan
          </span>
          <div className="flex items-center gap-2">
            <span className="num text-[15px] font-semibold tracking-[0.02em]">
              {orderNumber}
            </span>
            <button
              type="button"
              onClick={copyOrder}
              className="rounded-sm p-1 text-ink-soft transition-colors hover:bg-ink/[0.06] hover:text-ink"
              aria-label="Salin nomor pesanan"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-700" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {total > 0 && (
          <div className="flex items-baseline justify-between px-5 py-4">
            <span className="text-[13px] text-ink-muted">Total pembayaran</span>
            <span className="num text-lg font-semibold">
              {formatCurrency(total)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-line px-5 py-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
            {copied ? 'Nomor disalin' : 'Simpan nomor ini'}
          </span>
          <span className="rounded-sm border border-emerald-700/40 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
            Menunggu bayar
          </span>
        </div>
      </div>

      {demo && (
        <p className="mt-4 border-l-2 border-amber-600 bg-amber-50 px-4 py-3 text-[12px] leading-relaxed text-amber-900">
          Mode demo: API dan PostgreSQL belum tersambung, jadi pesanan ini hanya
          disimulasikan di browser. Jalankan API dan database untuk menyimpan
          pesanan sungguhan.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/products" className="btn-secondary">
          Lanjut belanja
        </Link>
        <Link href="/" className="btn-primary">
          <Home className="h-4 w-4" aria-hidden="true" />
          Kembali ke beranda
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="label-mono">Setelah ini</h2>
        <ol className="mt-3 divide-y divide-line border-t border-line">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const active = index === 0;
            return (
              <li key={step.title} className="flex items-start gap-3 py-4">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center border ${
                    active
                      ? 'border-ink bg-ink text-paper'
                      : 'border-line text-ink-soft'
                  }`}
                >
                  <Icon
                    className="h-3.5 w-3.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0">
                  <p
                    className={`text-[13px] font-semibold ${
                      active ? 'text-ink' : 'text-ink-muted'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </div>
                <span className="num ml-auto shrink-0 text-[10px] text-ink-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
