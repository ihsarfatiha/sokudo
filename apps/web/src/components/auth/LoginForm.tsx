'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { API_URL } from '@/lib/api';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

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
        <span className="mb-1.5 block text-[12px] font-medium text-ink-muted">
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
        <span className="mb-1.5 block text-[12px] font-medium text-ink-muted">
          Password
        </span>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="current-password"
          placeholder="••••••••"
          className="input-field"
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[12px]">
        <label className="flex items-center gap-2 text-ink-muted">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded-none border-line text-primary-600 focus:ring-primary-600/20"
          />
          Ingat saya
        </label>
        <Link
          href="/help"
          className="font-medium text-primary-700 underline-offset-4 hover:underline"
        >
          Lupa password?
        </Link>
      </div>

      {error && (
        <p
          role="alert"
          className="border-l-2 border-red-600 bg-red-50 px-3 py-2 text-[12px] leading-relaxed text-red-800"
        >
          {error}
        </p>
      )}
      {notice && (
        <p className="border-l-2 border-amber-600 bg-amber-50 px-3 py-2 text-[12px] leading-relaxed text-amber-900">
          {notice}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {loading ? 'Memproses' : 'Masuk'}
      </button>

      <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-ink-soft">
        Demo: daftar akun dulu jika database sudah berjalan
      </p>
    </form>
  );
}
