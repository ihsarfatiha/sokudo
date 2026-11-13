'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { API_URL } from '@/lib/api';

export function RegisterForm() {
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
    const password = String(form.get('password') ?? '');
    const confirm = String(form.get('confirm') ?? '');

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
        <span className="mb-1.5 block text-[12px] font-medium text-ink-muted">
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
          <span className="mb-1.5 block text-[12px] font-medium text-ink-muted">
            Password
          </span>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Min. 6 karakter"
            className="input-field"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-ink-muted">
            Konfirmasi password
          </span>
          <input
            name="confirm"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Ulangi password"
            className="input-field"
          />
        </label>
      </div>

      <label className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-muted">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-3.5 w-3.5 rounded-none border-line text-primary-600 focus:ring-primary-600/20"
        />
        Saya setuju dengan Syarat dan Ketentuan serta Kebijakan Privasi Sokudo.
      </label>

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
        {loading ? 'Memproses' : 'Buat akun'}
      </button>
    </form>
  );
}
