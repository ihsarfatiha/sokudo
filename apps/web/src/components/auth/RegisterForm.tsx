'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AlertCircle, Check, Eye, EyeOff, Loader2, UserPlus } from 'lucide-react';
import { API_URL } from '@/lib/api';

export function RegisterForm() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const matches = confirm.length > 0 && password === confirm;
  const mismatch = confirm.length > 0 && password !== confirm;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    const form = new FormData(event.currentTarget);

    if (password !== confirm) {
      setError('Konfirmasi password tidak sama.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          phone: form.get('phone'),
          password,
        }),
      });
      if (!res.ok) throw new Error('failed');
      const json = await res.json();
      const token = json?.data?.accessToken ?? json?.accessToken;
      if (token && typeof window !== 'undefined') {
        window.localStorage.setItem('sokudo-token', token);
      }
      router.push('/');
    } catch {
      setError('Pendaftaran gagal. API dan PostgreSQL mungkin belum berjalan.');
      setNotice(
        'Mode demo: pendaftaran membutuhkan API dan PostgreSQL. Kamu tetap bisa menjelajah dan checkout sebagai tamu.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-gray-700">
          Nama lengkap
        </span>
        <input
          name="name"
          required
          autoComplete="name"
          placeholder="Nama kamu"
          className="input-field"
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="nama@email.com"
            className="input-field"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">
            Nomor WhatsApp
          </span>
          <input
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder="08xxxxxxxxxx"
            className="input-field"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">
            Password
          </span>
          <span className="relative block">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="Min. 6 karakter"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input-field pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 active:scale-90"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={showPassword ? 'hide' : 'show'}
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.14 }}
                  className="block"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-gray-700">
            Konfirmasi password
          </span>
          <span className="relative block">
            <input
              name="confirm"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="Ulangi password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              className="input-field pr-9"
            />
            <AnimatePresence initial={false}>
              {matches && (
                <motion.span
                  key="match"
                  initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                  className="pointer-events-none absolute right-2.5 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-500 text-white"
                >
                  <Check className="h-2.5 w-2.5" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          {mismatch && (
            <span className="mt-1 block text-[11px] text-amber-700">
              Password belum sama.
            </span>
          )}
        </label>
      </div>

      <label className="flex items-start gap-2 text-xs leading-relaxed text-gray-600">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500/30"
        />
        Saya setuju dengan Syarat dan Ketentuan serta Kebijakan Privasi Sokudo.
      </label>

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            key="error"
            role="alert"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-relaxed text-red-700"
          >
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
        {notice && (
          <motion.p
            key="notice"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-800"
          >
            {notice}
          </motion.p>
        )}
      </AnimatePresence>

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
                Memproses
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                Buat akun
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </form>
  );
}
