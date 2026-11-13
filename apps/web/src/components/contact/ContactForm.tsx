'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

const topics = [
  'Pertanyaan pesanan',
  'Pengiriman',
  'Pembayaran / refund',
  'Masalah akun',
  'Kerja sama seller',
  'Lainnya',
];

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  }

  if (sent) {
    return (
      <div className="border border-line bg-surface p-8">
        <CheckCircle2
          className="h-6 w-6 text-emerald-700"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h3 className="mt-4 text-lg font-bold tracking-[-0.02em]">
          Pesan terkirim
        </h3>
        <p className="mt-2 max-w-[46ch] text-[13px] leading-relaxed text-ink-muted">
          Tim bantuan membalas lewat email dalam 1×24 jam kerja. Sertakan nomor
          pesanan jika pertanyaanmu soal transaksi.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-secondary mt-6 !py-2.5 !text-[12px]"
        >
          Kirim pesan lain
        </button>
      </div>
    );
  }

  const labelClass = 'mb-1.5 block text-[12px] font-medium text-ink-muted';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Nama lengkap</span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Nama kamu"
            className="input-field"
          />
        </label>
        <label className="block">
          <span className={labelClass}>Email</span>
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

      <label className="block">
        <span className={labelClass}>Topik</span>
        <select name="topic" className="input-field">
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelClass}>
          Nomor pesanan <span className="text-ink-soft">(opsional)</span>
        </span>
        <input
          name="orderNumber"
          placeholder="Contoh: SKD-20260101-1234"
          className="input-field"
        />
      </label>

      <label className="block">
        <span className={labelClass}>Pesan</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Ceritakan kendala atau pertanyaan kamu"
          className="input-field resize-none"
        />
      </label>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {loading ? 'Mengirim' : 'Kirim pesan'}
      </button>
    </form>
  );
}
