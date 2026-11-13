'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CreditCard,
  Loader2,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Wallet,
} from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { ProductVisual } from '@/components/product/ProductVisual';
import { submitOrder } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

const couriers = [
  { value: 'jne-reg', label: 'JNE REG — 2-3 hari' },
  { value: 'jnt-express', label: 'J&T Express — 2-4 hari' },
  { value: 'sicepat-best', label: 'SiCepat BEST — 1-2 hari' },
  { value: 'gosend', label: 'GoSend Same Day — hari ini' },
];

const paymentMethods = [
  { value: 'transfer', label: 'Transfer bank', icon: Wallet },
  { value: 'qris', label: 'QRIS', icon: CreditCard },
  { value: 'cod', label: 'Bayar di tempat', icon: ShoppingBag },
];

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, shippingFee, total, ready, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState('transfer');

  if (!ready) {
    return (
      <div className="border border-line bg-surface px-6 py-16 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
        Memuat checkout
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-line bg-surface px-6 py-20 text-center">
        <ShoppingBag
          className="h-8 w-8 text-ink-soft"
          strokeWidth={1.25}
          aria-hidden="true"
        />
        <h2 className="mt-4 text-lg font-bold tracking-[-0.02em]">
          Tidak ada produk untuk di-checkout
        </h2>
        <p className="mt-1.5 max-w-[38ch] text-[13px] leading-relaxed text-ink-muted">
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

  const fieldLabel = 'mb-1.5 block text-[12px] font-medium text-ink-muted';

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] lg:gap-12"
    >
      <div>
        <section className="border-t border-ink pt-5">
          <div className="flex items-baseline gap-3">
            <span className="num text-[11px] text-ink-soft">01</span>
            <h2 className="text-[15px] font-semibold tracking-[-0.01em]">
              Informasi pembeli
            </h2>
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

        <section className="mt-8 border-t border-ink pt-5">
          <div className="flex items-baseline gap-3">
            <span className="num text-[11px] text-ink-soft">02</span>
            <h2 className="text-[15px] font-semibold tracking-[-0.01em]">
              Alamat pengiriman
            </h2>
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
                <span className="text-ink-soft">(opsional)</span>
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

        <section className="mt-8 border-t border-ink pt-5">
          <div className="flex items-baseline gap-3">
            <span className="num text-[11px] text-ink-soft">03</span>
            <h2 className="text-[15px] font-semibold tracking-[-0.01em]">
              Metode pembayaran
            </h2>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const selected = payment === method.value;
              return (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => setPayment(method.value)}
                  aria-pressed={selected}
                  className={`flex items-center gap-2.5 border px-3.5 py-3 text-left text-[13px] font-medium transition-[border-color,background-color,transform] duration-150 active:scale-[0.99] ${
                    selected
                      ? 'border-ink bg-ink text-paper'
                      : 'border-line bg-surface text-ink-muted hover:border-ink/40 hover:text-ink'
                  }`}
                >
                  <Icon
                    className="h-4 w-4 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {method.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
            Instruksi pembayaran dikirim setelah pesanan dibuat
          </p>
        </section>
      </div>

      <aside className="h-fit lg:sticky lg:top-40">
        <div className="border border-line bg-surface">
          <div className="flex items-baseline justify-between border-b border-line px-5 py-4">
            <h2 className="text-[13px] font-semibold">Pesanan kamu</h2>
            <span className="num text-[11px] text-ink-soft">
              {items.length} item
            </span>
          </div>

          <ul className="divide-y divide-line px-5">
            {items.map((line) => (
              <li key={line.productId} className="flex items-center gap-3 py-3">
                <ProductVisual
                  slug={line.slug}
                  categorySlug={line.categorySlug}
                  className="h-12 w-12 shrink-0"
                  iconClassName="h-5 w-5"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium">
                    {line.title}
                  </p>
                  <p className="num mt-0.5 text-[11px] text-ink-soft">
                    {line.quantity} × {formatCurrency(line.price)}
                  </p>
                </div>
                <span className="num text-[12px] font-semibold">
                  {formatCurrency(line.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="space-y-2.5 border-t border-line px-5 py-4 text-[13px]">
            <div className="flex items-baseline justify-between text-ink-muted">
              <dt>Subtotal</dt>
              <dd className="num text-ink">{formatCurrency(subtotal)}</dd>
            </div>
            <div className="flex items-baseline justify-between text-ink-muted">
              <dt className="flex items-center gap-1.5">
                <Truck
                  className="h-3.5 w-3.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                Ongkir
              </dt>
              <dd className="num text-ink">
                {shippingFee === 0 ? (
                  <span className="text-emerald-800">Gratis</span>
                ) : (
                  formatCurrency(shippingFee)
                )}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-dashed border-line pt-3">
              <dt className="text-sm font-semibold">Total bayar</dt>
              <dd className="num text-base font-semibold">
                {formatCurrency(total)}
              </dd>
            </div>
          </dl>

          <div className="border-t border-line px-5 py-4">
            {error && (
              <p
                role="alert"
                className="mb-3 border-l-2 border-red-600 bg-red-50 px-3 py-2 text-[12px] leading-relaxed text-red-800"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Memproses
                </>
              ) : (
                <>
                  Buat pesanan
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-ink-soft">
              <ShieldCheck
                className="h-3.5 w-3.5 text-emerald-700"
                strokeWidth={1.5}
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
