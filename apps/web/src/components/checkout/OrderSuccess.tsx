'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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
  const reduce = useReducedMotion();
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
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <motion.span
          initial={reduce ? false : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 340, damping: 22 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60"
        >
          <Check className="h-8 w-8" strokeWidth={2.4} aria-hidden="true" />
        </motion.span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Pesanan berhasil dibuat
        </h1>
        <p className="mx-auto mt-2.5 max-w-[46ch] text-sm leading-relaxed text-gray-600">
          Terima kasih. Instruksi pembayaran dikirim ke email yang kamu isi saat
          checkout.
        </p>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="card mt-7 overflow-hidden"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-gray-200 px-5 py-4">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Nomor pesanan
          </span>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-wide text-gray-900 tabular-nums">
              {orderNumber}
            </span>
            <motion.button
              type="button"
              onClick={copyOrder}
              whileTap={reduce ? undefined : { scale: 0.88 }}
              className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="Salin nomor pesanan"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'copied' : 'copy'}
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="text-sm text-gray-500">Total pembayaran</span>
          <span className="text-lg font-bold tabular-nums text-gray-900">
            {formatCurrency(total)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-3">
          <span className="text-[11px] text-gray-500">
            {copied ? 'Nomor disalin' : 'Simpan nomor ini'}
          </span>
          <span className="badge-warning">Menunggu pembayaran</span>
        </div>
      </motion.div>

      {demo && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
          Mode demo: API dan PostgreSQL belum tersambung, jadi pesanan ini hanya
          disimulasikan di browser. Jalankan API dan database untuk menyimpan
          pesanan sungguhan.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/products" className="btn-secondary">
          Lanjut belanja
        </Link>
        <Link href="/orders" className="btn-primary">
          <Truck className="h-4 w-4" aria-hidden="true" />
          Lacak pesanan
        </Link>
      </div>

      <div className="card mt-8 p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-gray-900">Setelah ini</h2>
        <ol className="mt-3 space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const active = index === 0;
            return (
              <li key={step.title} className="flex items-start gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    active
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-semibold ${
                      active ? 'text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                    {step.description}
                  </p>
                </div>
                <span className="text-xs font-medium text-gray-300 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <Link
        href="/"
        className="mx-auto mt-6 flex w-fit items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-primary-600"
      >
        <Home className="h-4 w-4" aria-hidden="true" />
        Kembali ke beranda
      </Link>
    </div>
  );
}
