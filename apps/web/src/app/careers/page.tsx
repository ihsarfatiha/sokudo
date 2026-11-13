import Link from 'next/link';
import {
  ArrowRight,
  Coffee,
  GraduationCap,
  HeartPulse,
  Laptop,
  MapPin,
  Mail,
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
    <div className="bg-gray-50/60">
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-primary-50 via-white to-indigo-50">
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative py-10 lg:py-14">
          <nav
            className="flex items-center gap-1.5 text-xs text-gray-500"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-primary-600">
              Beranda
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-gray-900">Karir</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="eyebrow">Karir di Sokudo</p>
            <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Bangun marketplace yang bikin penjual kecil ikut tumbuh.
            </h1>
            <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-gray-600">
              Kami tim kecil yang suka menyelesaikan masalah nyata. Kalau kamu
              suka produk yang rapi, data yang jelas, dan dampak yang terasa,
              mungkin kita cocok.
            </p>
          </div>
        </div>
      </section>

      <div className="container-page py-10 lg:py-12">
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Benefit</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Kenapa bergabung
              </h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div key={perk.title} className="card card-hover p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-gray-900">
                    {perk.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                    {perk.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Lowongan</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Posisi terbuka
              </h2>
            </div>
            <span className="badge-primary">{roles.length} posisi</span>
          </div>

          <ul className="mt-5 space-y-3">
            {roles.map((role) => (
              <li
                key={role.title}
                className="card card-hover flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {role.title}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
                    <span className="font-medium uppercase tracking-wide text-primary-600">
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
                  className="btn-secondary shrink-0 !px-3.5 !py-2 !text-xs"
                >
                  Lamar
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <div className="card mt-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Tidak menemukan posisi yang cocok?
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-600">
                  Kirim CV dan portofolio ke karir@sokudo.id dengan subjek
                  &quot;Open Application&quot;.
                </p>
              </div>
            </div>
            <a
              href="mailto:karir@sokudo.id?subject=Open%20Application"
              className="btn-secondary shrink-0 !px-3.5 !py-2 !text-xs"
            >
              Kirim lamaran
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
