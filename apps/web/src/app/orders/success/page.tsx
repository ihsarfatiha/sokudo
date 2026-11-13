import { Suspense } from 'react';
import { OrderSuccess } from '@/components/checkout/OrderSuccess';

export const metadata = {
  title: 'Pesanan Berhasil — Sokudo',
};

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto max-w-8xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Suspense
        fallback={
          <div className="mx-auto max-w-2xl border border-line bg-surface px-6 py-16 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
            Memuat detail pesanan
          </div>
        }
      >
        <OrderSuccess />
      </Suspense>
    </div>
  );
}
