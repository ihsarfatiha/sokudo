import { cn } from '@/lib/utils';

interface ProductVisualProps {
  emoji: string;
  gradient: [string, string];
  className?: string;
  emojiClassName?: string;
  discount?: number;
  label?: string;
}

/**
 * Product tile: gradient plate with the product emoji.
 * Motion comes from the parent's `group` hover.
 */
export function ProductVisual({
  emoji,
  gradient,
  className,
  emojiClassName = 'text-6xl',
  discount,
  label,
}: ProductVisualProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
      }}
      aria-hidden="true"
    >
      <span className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
      <span className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-black/20 blur-2xl" />
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_45%)]" />

      <span
        className={cn(
          'relative select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-out group-hover:scale-110',
          emojiClassName
        )}
      >
        {emoji}
      </span>

      {typeof discount === 'number' && discount > 0 && (
        <span className="absolute left-2.5 top-2.5 rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
          -{discount}%
        </span>
      )}

      {label && (
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-700 backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
