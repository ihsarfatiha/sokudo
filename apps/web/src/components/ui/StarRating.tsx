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
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-gray-100 text-gray-200'
              )}
              strokeWidth={1.5}
            />
          );
        })}
      </span>
      {showValue && (
        <span className="text-xs font-medium tabular-nums text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
