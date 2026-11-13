import Link from 'next/link';
import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Masuk — Sokudo',
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Masuk ke Sokudo"
      subtitle="Lihat pesanan, simpan alamat, dan lanjutkan belanja dari mana saja."
      footer={
        <p>
          Belum punya akun?{' '}
          <Link
            href="/auth/register"
            className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            Daftar gratis
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
