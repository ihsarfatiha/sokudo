import { Suspense } from 'react';
import { OrderSuccess } from '@/components/checkout/OrderSuccess';

export const metadata = {
  title: 'Pesanan Berhasil — Sokudo',
};

export default function OrderSuccessPage() {
  return (
    <div className="bg-gray-50/60">
      <div className="container-page py-10 sm:py-14">
        <Suspense
          fallback={
            <div className="card mx-auto max-w-2xl px-6 py-16 text-center text-sm text-gray-500">
              Memuat detail pesanan...
            </div>
          }
        >
          <OrderSuccess />
        </Suspense>
      </div>
    </div>
  );
}
