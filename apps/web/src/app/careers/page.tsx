import Link from 'next/link';
import {
  ArrowUpRight,
  Coffee,
  GraduationCap,
  HeartPulse,
  Laptop,
  MapPin,
} from 'lucide-react';

export const metadata = {
  title: 'Karir — Sokudo',
  description:
    'Bergabung dengan tim Sokudo dan bantu membangun marketplace yang adil untuk pembeli dan penjual.',
};

const perks = [
  {
    icon: Laptop,
    title: 'Remote friendly',
    text: 'Kerja dari mana saja dengan jam yang fleksibel.',
  },
  {
    icon: HeartPulse,
    title: 'Asuransi kesehatan',
    text: 'Coverage untuk kamu dan keluarga inti.',
  },
  {
    icon: GraduationCap,
    title: 'Budget belajar',
    text: 'Kursus, buku, dan konferensi tiap tahun.',
  },
  {
    icon: Coffee,
    title: 'Hari recharge',
    text: 'Libur tambahan setiap kuartal.',
  },
];

const roles = [
  {
    title: 'Frontend Engineer',
    department: 'Engineering',
    location: 'Jakarta / Remote',
    type: 'Full-time',
  },
  {
    title: 'Backend Engineer (NestJS)',
    department: 'Engineering',
    location: 'Jakarta / Remote',
    type: 'Full-time',
  },
  {
    title: 'Product Designer',
    department: 'Product',
    location: 'Jakarta',
    type: 'Full-time',
  },
  {
    title: 'Seller Success Specialist',
    department: 'Operations',
    location: 'Bandung',
    type: 'Full-time',
  },
  {
    title: 'Customer Support',
    department: 'Operations',
    location: 'Remote',
    type: 'Part-time',
  },
];

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <nav
        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Beranda
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink-muted">Karir</span>
      </nav>

      <section className="mt-8 border-b border-line pb-10">
        <p className="label-mono">Karir di Sokudo</p>
        <h1 className="mt-4 max-w-[24ch] text-balance text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
          Bangun marketplace yang bikin penjual kecil ikut tumbuh.
        </h1>
        <p className="mt-4 max-w-[56ch] text-[14px] leading-relaxed text-ink-muted">
          Kami tim kecil yang suka menyelesaikan masalah nyata. Kalau kamu suka
          produk yang rapi, data yang jelas, dan dampak yang terasa, mungkin
          kita cocok.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="label-mono">Kenapa bergabung</h2>
        <div className="mt-4 grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div key={perk.title} className="py-5 sm:px-5 sm:first:pl-0">
                <div className="flex items-baseline justify-between">
                  <Icon
                    className="h-4 w-4 text-ink-soft"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="num text-[10px] text-ink-soft">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-3 text-[13px] font-semibold">{perk.title}</h3>
                <p className="mt-1 max-w-[30ch] text-[12px] leading-relaxed text-ink-muted">
                  {perk.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-3">
          <h2 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
            Posisi terbuka
          </h2>
          <p className="num text-[11px] text-ink-soft">
            {roles.length} posisi
          </p>
        </div>

        <ul className="divide-y divide-line">
          {roles.map((role) => (
            <li
              key={role.title}
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-[14px] font-semibold">{role.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-soft">
                  <span className="font-mono uppercase tracking-[0.1em] text-ink-muted">
                    {role.department}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {role.location}
                  </span>
                  <span>{role.type}</span>
                </div>
              </div>
              <a
                href={`mailto:karir@sokudo.id?subject=${encodeURIComponent(
                  `Lamaran ${role.title}`
                )}`}
                className="btn-secondary shrink-0 !px-3.5 !py-2 !text-[12px]"
              >
                Lamar
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[12.5px] leading-relaxed text-ink-muted">
          Tidak menemukan posisi yang cocok? Kirim CV dan portofolio ke{' '}
          <a
            href="mailto:karir@sokudo.id"
            className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            karir@sokudo.id
          </a>{' '}
          dengan subjek &quot;Open Application&quot;.
        </p>
      </section>
    </div>
  );
}
