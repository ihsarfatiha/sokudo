'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Loader2, Package, Search, Truck, Undo2 } from 'lucide-react';
import { API_URL } from '@/lib/api';

interface TrackedOrder {
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt?: string;
  itemCount?: number;
  demo?: boolean;
}

const statusLabel: Record<string, string> = {
  PENDING_PAYMENT: 'Menunggu pembayaran',
  PAID: 'Pembayaran diterima',
  PROCESSING: 'Sedang diproses',
  SHIPPED: 'Dikirim',
  DELIVERED: 'Diterima',
  COMPLETED: 'Selesai',
  CANCELLED: 'Dibatalkan',
};

export function OrderTracker() {
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const value = orderNumber.trim();
    if (!value) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/orders/${encodeURIComponent(value)}`);
      if (!res.ok) throw new Error('not found');
      const json = await res.json();
      const data = json?.data ?? json;
      setResult({
        orderNumber: data.orderNumber,
        status: data.status,
        totalAmount: Number(data.totalAmount),
        createdAt: data.createdAt,
        itemCount: data.items?.length,
        demo: false,
      });
    } catch {
      setError(
        'Pesanan tidak ditemukan. Periksa kembali nomor pesanan, atau jalankan API dan database untuk melacak pesanan sungguhan.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <form onSubmit={handleSubmit} className="card flex flex-col gap-2 p-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              value={orderNumber}
              onChange={(event) => setOrderNumber(event.target.value)}
              placeholder="Contoh: SKD-20260101-1234"
              aria-label="Nomor pesanan"
              className="input-field pl-10"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary shrink-0">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Package className="h-4 w-4" aria-hidden="true" />
            )}
            Lacak
          </button>
        </form>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800"
          >
            {error}
          </p>
        )}

        {result && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="card mt-4 overflow-hidden"
          >
            <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-3.5">
              <CheckCircle2
                className="h-4 w-4 text-emerald-600"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold text-gray-900 tabular-nums">
                {result.orderNumber}
              </p>
            </div>
            <dl className="divide-y divide-gray-100 text-sm">
              <div className="flex items-baseline justify-between px-5 py-3">
                <dt className="text-gray-500">Status</dt>
                <dd>
                  <span className="badge-success">
                    {statusLabel[result.status] ?? result.status}
                  </span>
                </dd>
              </div>
              {result.createdAt && (
                <div className="flex items-baseline justify-between px-5 py-3">
                  <dt className="text-gray-500">Dibuat</dt>
                  <dd className="text-xs tabular-nums text-gray-900">
                    {new Date(result.createdAt).toLocaleString('id-ID')}
                  </dd>
                </div>
              )}
              {typeof result.itemCount === 'number' && (
                <div className="flex items-baseline justify-between px-5 py-3">
                  <dt className="text-gray-500">Jumlah item</dt>
                  <dd className="tabular-nums text-gray-900">
                    {result.itemCount}
                  </dd>
                </div>
              )}
            </dl>
          </motion.div>
        )}

        <p className="mt-4 text-xs text-gray-500">
          Nomor pesanan ada di email konfirmasi dan halaman setelah checkout.
        </p>
      </div>

      <aside className="h-fit">
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-900">Butuh bantuan?</h2>
          <ul className="mt-3 divide-y divide-gray-100 border-t border-gray-100">
            {[
              {
                icon: Package,
                text: 'Pesanan diproses maksimal 1×24 jam setelah pembayaran diterima.',
              },
              {
                icon: Truck,
                text: 'Nomor resi dikirim lewat email dan muncul di halaman pesanan.',
              },
              {
                icon: Undo2,
                text: 'Pesanan tidak bergerak lebih dari 3 hari? Hubungi tim support.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.text}
                  className="flex items-start gap-2.5 py-3 text-xs leading-relaxed text-gray-600"
                >
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {item.text}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
