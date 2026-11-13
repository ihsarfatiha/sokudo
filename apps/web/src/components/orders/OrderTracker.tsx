'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  Loader2,
  Package,
  Search,
  Truck,
  Undo2,
} from 'lucide-react';
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
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px] lg:gap-12">
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              aria-hidden="true"
            />
            <input
              value={orderNumber}
              onChange={(event) => setOrderNumber(event.target.value)}
              placeholder="Contoh: SKD-20260101-1234"
              aria-label="Nomor pesanan"
              className="input-field pl-9"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
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
            className="mt-4 border-l-2 border-amber-600 bg-amber-50 px-4 py-3 text-[12.5px] leading-relaxed text-amber-900"
          >
            {error}
          </p>
        )}

        {result && (
          <div className="mt-6 border border-line bg-surface">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
              <CheckCircle2
                className="h-4 w-4 text-emerald-700"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <p className="num text-[13px] font-semibold">
                {result.orderNumber}
              </p>
            </div>
            <dl className="divide-y divide-line text-[13px]">
              <div className="flex items-baseline justify-between px-5 py-3">
                <dt className="text-ink-muted">Status</dt>
                <dd className="font-medium text-emerald-800">
                  {statusLabel[result.status] ?? result.status}
                </dd>
              </div>
              {result.createdAt && (
                <div className="flex items-baseline justify-between px-5 py-3">
                  <dt className="text-ink-muted">Dibuat</dt>
                  <dd className="num text-[12px]">
                    {new Date(result.createdAt).toLocaleString('id-ID')}
                  </dd>
                </div>
              )}
              {typeof result.itemCount === 'number' && (
                <div className="flex items-baseline justify-between px-5 py-3">
                  <dt className="text-ink-muted">Jumlah item</dt>
                  <dd className="num">{result.itemCount}</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
          Nomor pesanan ada di email konfirmasi dan halaman setelah checkout
        </p>
      </div>

      <aside className="h-fit">
        <h2 className="label-mono">Butuh bantuan?</h2>
        <ul className="mt-3 divide-y divide-line border-t border-line">
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
                className="flex items-start gap-2.5 py-3 text-[12.5px] leading-relaxed text-ink-muted"
              >
                <Icon
                  className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {item.text}
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
