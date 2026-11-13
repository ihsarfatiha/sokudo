'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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
  const reduce = useReducedMotion();
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

  const labelClass = 'mb-1.5 block text-xs font-semibold text-gray-700';

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div
          key="success"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="card px-6 py-10 text-center"
        >
          <motion.span
            initial={reduce ? false : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 340, damping: 22, delay: 0.05 }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60"
          >
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          </motion.span>
          <h3 className="mt-4 text-lg font-bold text-gray-900">Pesan terkirim</h3>
          <p className="mx-auto mt-1.5 max-w-[46ch] text-sm leading-relaxed text-gray-600">
            Tim bantuan membalas lewat email dalam 1×24 jam kerja. Sertakan
            nomor pesanan jika pertanyaanmu soal transaksi.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="btn-secondary mt-6 !py-2.5 !text-xs"
          >
            Kirim pesan lain
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={false}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
          className="card space-y-4 p-5 sm:p-6"
        >
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
              Nomor pesanan{' '}
              <span className="font-normal text-gray-400">(opsional)</span>
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

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={reduce || loading ? undefined : { scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="btn-primary w-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={loading ? 'loading' : 'idle'}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Mengirim
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Kirim pesan
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
