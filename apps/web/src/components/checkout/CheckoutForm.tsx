'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Check,
  CreditCard,
  Loader2,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Wallet,
} from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { ProductVisual } from '@/components/product/ProductVisual';
import { styleForLine } from '@/lib/product-style';
import { submitOrder } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

const couriers = [
  { value: 'jne-reg', label: 'JNE REG — 2-3 hari' },
  { value: 'jnt-express', label: 'J&T Express — 2-4 hari' },
  { value: 'sicepat-best', label: 'SiCepat BEST — 1-2 hari' },
  { value: 'gosend', label: 'GoSend Same Day — hari ini' },
];

const paymentMethods = [
  { value: 'transfer', label: 'Transfer bank', note: 'BCA, BNI, Mandiri', icon: Wallet },
  { value: 'qris', label: 'QRIS', note: 'Semua e-wallet', icon: CreditCard },
  { value: 'cod', label: 'Bayar di tempat', note: 'COD kurir', icon: ShoppingBag },
];

export function CheckoutForm() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { items, subtotal, shippingFee, total, ready, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState('transfer');

  if (!ready) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="card h-96 animate-pulse bg-gray-50" />
        <div className="card h-72 animate-pulse bg-gray-50" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center px-6 py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
          <ShoppingBag className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-lg font-bold text-gray-900">
          Tidak ada produk untuk di-checkout
        </h2>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-gray-600">
          Keranjang kamu kosong. Pilih produk dulu sebelum melanjutkan
          pembayaran.
        </p>
        <Link href="/products" className="btn-primary mt-6">
          Lihat produk
        </Link>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      customer: {
        name: String(form.get('name') ?? ''),
        email: String(form.get('email') ?? ''),
        phone: String(form.get('phone') ?? ''),
      },
      address: {
        recipientName: String(form.get('name') ?? ''),
        phoneNumber: String(form.get('phone') ?? ''),
        street: String(form.get('street') ?? ''),
        city: String(form.get('city') ?? ''),
        province: String(form.get('province') ?? ''),
        postalCode: String(form.get('postalCode') ?? ''),
      },
      items: items.map((line) => ({
        productId: line.productId,
        quantity: line.quantity,
      })),
      notes: String(form.get('notes') ?? ''),
      courier: String(form.get('courier') ?? 'jne-reg'),
      paymentMethod: payment,
    };

    try {
      const order = await submitOrder(payload, total);
      clear();
      const params = new URLSearchParams({
        order: order.orderNumber,
        total: String(order.totalAmount),
      });
      if (order.demo) params.set('demo', '1');
      router.push(`/orders/success?${params.toString()}`);
    } catch {
      setError('Pesanan gagal dibuat. Periksa koneksi lalu coba lagi.');
      setLoading(false);
    }
  }

  const fieldLabel = 'mb-1.5 block text-xs font-semibold text-gray-700';

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]"
    >
      <div className="space-y-4">
        <section className="card p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
              01
            </span>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Informasi pembeli
              </h2>
              <p className="text-[11px] text-gray-500">
                Dipakai untuk konfirmasi pesanan.
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={fieldLabel}>Nama lengkap</span>
              <input
                name="name"
                required
                autoComplete="name"
                placeholder="Nama penerima"
                className="input-field"
              />
            </label>
            <label className="block">
              <span className={fieldLabel}>Nomor WhatsApp</span>
              <input
                name="phone"
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="08xxxxxxxxxx"
                className="input-field"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className={fieldLabel}>Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="nama@email.com"
                className="input-field"
              />
            </label>
          </div>
        </section>

        <section className="card p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
              02
            </span>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Alamat pengiriman
              </h2>
              <p className="text-[11px] text-gray-500">
                Pastikan alamat lengkap agar kurir mudah menemukan.
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className={fieldLabel}>Alamat lengkap</span>
              <input
                name="street"
                required
                autoComplete="street-address"
                placeholder="Jalan, nomor rumah, RT/RW, kelurahan"
                className="input-field"
              />
            </label>
            <label className="block">
              <span className={fieldLabel}>Kota / Kabupaten</span>
              <input
                name="city"
                required
                autoComplete="address-level2"
                placeholder="Jakarta Selatan"
                className="input-field"
              />
            </label>
            <label className="block">
              <span className={fieldLabel}>Provinsi</span>
              <input
                name="province"
                required
                autoComplete="address-level1"
                placeholder="DKI Jakarta"
                className="input-field"
              />
            </label>
            <label className="block">
              <span className={fieldLabel}>Kode pos</span>
              <input
                name="postalCode"
                required
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="12345"
                className="input-field"
              />
            </label>
            <label className="block">
              <span className={fieldLabel}>Kurir</span>
              <select name="courier" className="input-field">
                {couriers.map((courier) => (
                  <option key={courier.value} value={courier.value}>
                    {courier.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className={fieldLabel}>
                Catatan untuk penjual{' '}
                <span className="font-normal text-gray-400">(opsional)</span>
              </span>
              <textarea
                name="notes"
                rows={3}
                placeholder="Contoh: tolong bubble wrap tambahan"
                className="input-field resize-none"
              />
            </label>
          </div>
        </section>

        <section className="card p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
              03
            </span>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Metode pembayaran
              </h2>
              <p className="text-[11px] text-gray-500">
                Instruksi dikirim setelah pesanan dibuat.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const selected = payment === method.value;
              return (
                <motion.button
                  key={method.value}
                  type="button"
                  onClick={() => setPayment(method.value)}
                  aria-pressed={selected}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  className={`relative flex items-start gap-2.5 rounded-lg border p-3 text-left transition-[border-color,background-color,box-shadow] duration-200 ${
                    selected
                      ? 'border-primary-600 bg-primary-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-primary-200 hover:bg-gray-50'
                  }`}
                >
                  <Icon
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      selected ? 'text-primary-600' : 'text-gray-400'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-gray-900">
                      {method.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-gray-500">
                      {method.note}
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {selected && (
                      <motion.span
                        key="check"
                        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                        className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-white"
                      >
                        <Check className="h-2.5 w-2.5" aria-hidden="true" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </section>
      </div>

      <aside className="h-fit lg:sticky lg:top-36">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Pesanan kamu
            </h2>
            <span className="text-xs text-gray-500">{items.length} produk</span>
          </div>

          <ul className="max-h-72 divide-y divide-gray-100 overflow-y-auto px-5">
            {items.map((line) => {
              const style = styleForLine(line.slug, line.categorySlug);
              return (
                <li key={line.productId} className="flex items-center gap-3 py-3">
                  <ProductVisual
                    emoji={style.emoji}
                    gradient={style.gradient}
                    className="h-12 w-12 shrink-0 rounded-lg"
                    emojiClassName="text-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900">
                      {line.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-500 tabular-nums">
                      {line.quantity} × {formatCurrency(line.price)}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold tabular-nums text-gray-900">
                    {formatCurrency(line.price * line.quantity)}
                  </span>
                </li>
              );
            })}
          </ul>

          <dl className="space-y-2.5 border-t border-gray-100 px-5 py-4 text-sm">
            <div className="flex items-baseline justify-between text-gray-500">
              <dt>Subtotal</dt>
              <dd className="tabular-nums text-gray-900">
                {formatCurrency(subtotal)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between text-gray-500">
              <dt className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" aria-hidden="true" />
                Ongkir
              </dt>
              <dd className="tabular-nums">
                {shippingFee === 0 ? (
                  <span className="font-medium text-emerald-600">Gratis</span>
                ) : (
                  <span className="text-gray-900">
                    {formatCurrency(shippingFee)}
                  </span>
                )}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-gray-100 pt-3">
              <dt className="font-semibold text-gray-900">Total bayar</dt>
              <dd className="text-lg font-bold tabular-nums text-gray-900">
                {formatCurrency(total)}
              </dd>
            </div>
          </dl>

          <div className="border-t border-gray-100 px-5 py-4">
            {error && (
              <p
                role="alert"
                className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs leading-relaxed text-red-700"
              >
                {error}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={reduce || loading ? undefined : { scale: 0.99 }}
              className="btn-primary w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Memproses pesanan
                </>
              ) : (
                <>
                  Buat pesanan
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </motion.button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
              <ShieldCheck
                className="h-3.5 w-3.5 text-emerald-600"
                aria-hidden="true"
              />
              Data kamu tidak dibagikan ke pihak ketiga
            </p>
          </div>
        </div>
      </aside>
    </form>
  );
}
