import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  size = 'sm',
  showValue = true,
  className,
}: StarRatingProps) {
  const icon = size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5';

  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = rating >= index + 0.5;
          return (
            <Star
              key={index}
              className={cn(
                icon,
                filled
                  ? 'fill-amber-500 text-amber-500'
                  : 'fill-transparent text-line'
              )}
              strokeWidth={1.5}
            />
          );
        })}
      </span>
      {showValue && (
        <span className="num text-[11px] font-medium text-ink-muted">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
