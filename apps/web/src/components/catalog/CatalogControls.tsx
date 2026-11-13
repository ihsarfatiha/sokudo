'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDownUp, Search } from 'lucide-react';
import { categories } from '@/lib/catalog';
import { cn } from '@/lib/utils';

interface CatalogControlsProps {
  q: string;
  category: string;
  sort: string;
  total: number;
}

const sortOptions = [
  { value: 'popular', label: 'Paling populer' },
  { value: 'latest', label: 'Terbaru' },
  { value: 'price-asc', label: 'Harga terendah' },
  { value: 'price-desc', label: 'Harga tertinggi' },
  { value: 'rating', label: 'Rating tertinggi' },
];

export function CatalogControls({
  q,
  category,
  sort,
  total,
}: CatalogControlsProps) {
  const router = useRouter();
  const [term, setTerm] = useState(q);

  function buildUrl(next: { q?: string; category?: string; sort?: string }) {
    const params = new URLSearchParams();
    const nextQ = next.q ?? term;
    const nextCategory = next.category ?? category;
    const nextSort = next.sort ?? sort;
    if (nextQ) params.set('q', nextQ);
    if (nextCategory && nextCategory !== 'semua') {
      params.set('category', nextCategory);
    }
    if (nextSort && nextSort !== 'popular') params.set('sort', nextSort);
    const qs = params.toString();
    return `/products${qs ? `?${qs}` : ''}`;
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    router.push(buildUrl({ q: term }));
  }

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={submit} className="relative flex-1 sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
            aria-hidden="true"
          />
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Cari produk atau toko"
            aria-label="Cari produk atau toko"
            className="input-field pl-9"
          />
        </form>

        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft sm:inline">
            {total} produk
          </span>
          <div className="relative">
            <ArrowDownUp
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-soft"
              aria-hidden="true"
            />
            <select
              value={sort}
              onChange={(event) =>
                router.push(buildUrl({ sort: event.target.value }))
              }
              className="input-field appearance-none py-2 pl-8 pr-8 font-mono text-[11px] uppercase tracking-[0.06em]"
              aria-label="Urutkan produk"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1">
        {[{ slug: 'semua', name: 'Semua' }, ...categories].map((item) => {
          const active =
            item.slug === 'semua'
              ? !category || category === 'semua'
              : category === item.slug;

          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => router.push(buildUrl({ category: item.slug }))}
              className={cn(
                'border-b-2 pb-2 pt-1 text-[13px] font-medium transition-colors',
                active
                  ? 'border-ink text-ink'
                  : 'border-transparent text-ink-muted hover:border-line hover:text-ink'
              )}
              aria-pressed={active}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
