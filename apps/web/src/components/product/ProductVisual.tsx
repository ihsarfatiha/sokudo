import { getProductArt } from '@/lib/product-art';
import { cn } from '@/lib/utils';

interface ProductVisualProps {
  slug: string;
  categorySlug?: string;
  className?: string;
  iconClassName?: string;
  discount?: number;
  label?: string;
}

/**
 * Flat catalog plate: tinted paper, fine ring, one line drawing.
 * Replaces the old emoji-on-gradient tile.
 */
export function ProductVisual({
  slug,
  categorySlug,
  className,
  iconClassName = 'h-1/3 w-1/3',
  discount,
  label,
}: ProductVisualProps) {
  const { icon: Icon, tint } = getProductArt(slug, categorySlug);

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden border border-line/70',
        className
      )}
      style={{ backgroundColor: tint }}
      aria-hidden="true"
    >
      <span className="pointer-events-none absolute inset-0 grain opacity-[0.16] mix-blend-multiply" />

      <svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute inset-0 h-full w-full text-ink/[0.07]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="100" cy="100" r="64" />
        <circle cx="100" cy="100" r="88" />
        <path d="M100 12v18M100 170v18M12 100h18M170 100h18" />
      </svg>

      <Icon
        className={cn('relative text-ink/45 transition-transform duration-500 ease-out group-hover:-translate-y-1', iconClassName)}
        strokeWidth={1.1}
      />

      {typeof discount === 'number' && discount > 0 && (
        <span className="absolute left-3 top-3 rounded-sm bg-ink px-1.5 py-1 font-mono text-[10px] font-semibold tracking-[0.04em] text-paper">
          −{discount}%
        </span>
      )}

      {label && (
        <span className="absolute bottom-3 left-3 rounded-sm bg-surface/95 px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-ink-muted">
          {label}
        </span>
      )}
    </div>
  );
}
