'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AlertCircle, Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import { API_URL } from '@/lib/api';

export function LoginForm() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: form.get('email'),
          password: form.get('password'),
        }),
      });
      if (!res.ok) throw new Error('invalid');
      const json = await res.json();
      const token = json?.data?.accessToken ?? json?.accessToken;
      if (token && typeof window !== 'undefined') {
        window.localStorage.setItem('sokudo-token', token);
      }
      router.push('/');
    } catch {
      setError('Email atau password salah, atau API belum berjalan.');
      setNotice(
        'Mode demo: login membutuhkan API dan PostgreSQL. Kamu tetap bisa belanja dan checkout sebagai tamu.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          Password
        </span>
        <span className="relative block">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={6}
            autoComplete="current-password"
            placeholder="••••••••"
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

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <label className="flex items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500/30"
          />
          Ingat saya
        </label>
        <Link
          href="/help"
          className="font-semibold text-primary-600 underline-offset-4 hover:underline"
        >
          Lupa password?
        </Link>
      </div>

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
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Masuk
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <p className="rounded-lg bg-gray-50 px-3 py-2 text-[11px] leading-relaxed text-gray-500">
        Demo: daftar akun dulu jika database sudah berjalan.
      </p>
    </form>
  );
}
