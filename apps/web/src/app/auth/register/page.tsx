import Link from 'next/link';
import { AuthShell } from '@/components/auth/AuthShell';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Daftar — Sokudo',
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Buat akun baru"
      subtitle="Gratis, tanpa biaya bulanan. Butuh waktu kurang dari satu menit."
      footer={
        <p>
          Sudah punya akun?{' '}
          <Link
            href="/auth/login"
            className="font-semibold text-primary-600 underline-offset-4 hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
